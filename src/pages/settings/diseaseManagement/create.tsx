import { FC, Fragment, useEffect } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Button, Form, Input, Select, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllByIdHospital } from "../../../features/departmentSlice";
import { departmentAPI } from "../../../apis/department.api";
import { toast } from "react-toastify";
import { diseaseAPI } from "../../../apis/disease.api";
import { useNavigate, useParams } from "react-router-dom";
import { getByIdDisease } from "../../../features/diseaseSlice";




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


const CreateDiseaseManagement: FC =() => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const hospitalId = localStorage.getItem('hospitalId')
    const { department, disease } = useSelector((state: RootState) => state);
    let { id } = useParams();
    const navige = useNavigate()

    useEffect(() => {
        if(disease.disease.id){
            form.setFieldValue('name', disease.disease.name)
            form.setFieldValue('departmentId', disease.disease.departmentId)
        }
    }, [disease.disease.id])
    useEffect(() =>{ 
        if(id){
            dispatch(getByIdDisease(Number(id)))
        }
    }, [id, dispatch])

    useEffect(() => {
        if(hospitalId){
            dispatch(getAllByIdHospital(Number(hospitalId)))
        }
        
    }, [dispatch,hospitalId])

    const dataBreadcrumb = [
        {
            title: 'Cài đặt',
        },
        {
            type: 'separator',
        },
        {
            href: '/thiet-lap-benh-tat',
            title: 'Quản lý bệnh',
        },
        {
            type: 'separator',
        },
        {
            title: <>{id ? 'Cập nhật' : 'Thêm mới'}</>,
        },
    ];

    const onFinish = async(values: any) => {
        const body = {
            departmentId: values.departmentId,
            name: values.name,
            hospitalId: hospitalId
        }
        if(id){
            const update = await diseaseAPI.updateDisease(Number(id), body)
            if(update.data.statusCode === 1){
                toast.success('Cập nhật thành công!')
                navige('/thiet-lap-benh-tat')
            }
        }else {
            try {
                const result = await diseaseAPI.createdisease(body);
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
                <Form.Item name="departmentId" label="Chuyên khoa" rules={[
                    { required: true, message: 'Vui lòng chọn chuyên khoa của bạn!', }
                ]}>
                    <Select
                        style={{textTransform:'capitalize'}}
                        placeholder="Vui lòng chọn chuyên khoa hoạt động"
                        allowClear
                        options={department.loading==='succeeded' && department.dataAll.map((item: any,index:number)=> {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    >
                    </Select>
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Tên bệnh"
                    rules={[{ required: true, message: 'Vui lòng nhập tên bệnh của bạn!', whitespace: true }]}
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

export default CreateDiseaseManagement