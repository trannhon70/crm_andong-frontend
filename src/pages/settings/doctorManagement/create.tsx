import { FC, Fragment, useEffect } from "react"
import BreadcrumbComponent from "../../../components/breadcrumbComponent"
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Select } from "antd";
import { toast } from "react-toastify";
import { doctorAPI } from "../../../apis/doctor.api";
import { getByIdDoctor } from "../../../features/doctorSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";

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
const CreateDocTor:FC = () => {
    let { id } = useParams();
    const navige = useNavigate()
    const [form] = Form.useForm();
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();
    const { doctor} = useSelector((state: RootState) => state.doctor);

    useEffect(() =>{ 
        if(id){
            dispatch(getByIdDoctor(Number(id)))
        }
    }, [id, dispatch])

    useEffect(() => {
        if(doctor.id){
            form.setFieldValue('name', doctor.name)
            form.setFieldValue('doctor_office', doctor.doctor_office)
        }
    }, [doctor.id])


    const dataBreadcrumb = [
        {
            title: 'Cài đặt',
        },
        {
            type: 'separator',
        },
        {
            href: '/thiet-lap-bac-si',
            title: 'Quản lý bác sĩ',
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
            doctor_office: values.doctor_office,
            name: values.name,
            hospitalId: hospitalId
        }

        if(id){
            const update = await doctorAPI.updateDoctor(Number(id), body)
            if(update.data.statusCode === 1){
                toast.success('Cập nhật thành công!')
                navige('/thiet-lap-bac-si')
            }
        } else {
            try {
                const result = await doctorAPI.createdoctor(body);
                if(result.data.statusCode === 1){
                    toast.success('Thêm mới thành công!')
                    form.resetFields();
                }
            } catch (error) {
                console.log(error)
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
                    label="Tên bác sĩ"
                    rules={[{ required: true, message: 'Vui lòng nhập tên bác sĩ của bạn!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="doctor_office"
                    label="Phòng"
                    rules={[{ required: true, message: 'Vui lòng nhập phòng của bạn!', whitespace: true }]}
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

export default CreateDocTor