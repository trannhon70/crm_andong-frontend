import { FC, Fragment, useEffect } from "react"
import BreadcrumbComponent from "../../../components/breadcrumbComponent"
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Select } from "antd";
import { toast } from "react-toastify";
import { departmentAPI } from "../../../apis/department.api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getByIdDepartment } from "../../../features/departmentSlice";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const CreateDepartment: FC = () =>{
    let { id } = useParams();
    const [form] = Form.useForm();
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();
    const { department } = useSelector((state: RootState) => state.department);
    const navige = useNavigate()

    useEffect(()=>{
        
        if(id){
            dispatch(getByIdDepartment(Number(id)))
        }
    }, [id, dispatch])

    useEffect(() => {
        if(department.id){
            form.setFieldValue('name', department.name)
            
        }
    }, [department.id])

    const dataBreadcrumb = [
        {
            title: 'Cài đặt',
        },
        {
            type: 'separator',
        },
        {
            href: '/quan-ly-khoa',
            title: 'Quản lý khoa',
        },
        {
            type: 'separator',
        },
        {
            title: <>{id ? 'Cập nhật' : 'Thêm mới'}</>,
        },
    ];

    const onFinish = async(values: any) => {
        console.log(values)
        const body = {
            name: values.name,
            hospitalId: hospitalId
        }

        if(id){
            const update = await departmentAPI.updateDepartment(Number(id), body)
            if(update.data.statusCode === 1){
                toast.success('Cập nhật thành công!')
                navige('/quan-ly-khoa')
            }
        }else {
            try {
                const result = await departmentAPI.createDepartment(body);
                if(result.data.statusCode === 1){
                    toast.success('Thêm mới thành công!')
                    form.resetFields();
                }
            } catch (error) {
                console.log(error);
                
            }
        }
    }
    return <Fragment>
       <BreadcrumbComponent items={dataBreadcrumb} />
       <div className="flex items-center justify-center mt-5 " >
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                style={{ maxWidth: 1000, width: 500 }}
                scrollToFirstError
                size="middle"
            >
                
                <Form.Item
                    name="name"
                    label="Tên khoa"
                    rules={[{ required: true, message: 'Vui lòng nhập tên khoa của bạn!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
               

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      {id ? 'Cập nhật' : 'Thêm mới'} 
                    </Button>
                </Form.Item>
            </Form>
            </div>
    </Fragment>
}

export default CreateDepartment