import { FC, Fragment, useEffect } from "react";
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { hospitalAPI } from "../../apis/hospital.api";
import { toast } from "react-toastify";
import { getByIdHospital } from "../../features/hospitalSlice";

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
const CreateHospotal: FC = () => {
    let { id } = useParams();
    const [form] = Form.useForm();
    const navige = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const {  hospitalById } = useSelector((state: RootState) => state.hospital);

    useEffect(() =>{ 
        if(id){
            dispatch(getByIdHospital(Number(id)))
        }
    }, [id, dispatch])

    useEffect(() => {
        if(hospitalById.id){
            form.setFieldValue('name', hospitalById.name);
            form.setFieldValue('phone', hospitalById.phone);
        }
    }, [hospitalById.id])

    const dataBreadcrumb = [
        {
            title: 'Quản lý hệ thống',
        },
        {
            type: 'separator',
        },
        {
            href: '/danh-sach-benh-vien',
            title: 'Danh sách bệnh viện',
        },
        {
            type: 'separator',
        },
        {
            title: <>{id ? 'Cập nhật' : 'Thêm mới'}</>,
        },
    ];

    const onFinish = async (values: any) => {
        const body = {
            name: values.name,
            phone: values.phone
        }

        if (id) {
            const update = await hospitalAPI.updateHospital(Number(id), body)
            if(update.data.statusCode === 1){
                toast.success('Cập nhật thành công!')
                navige('/danh-sach-benh-vien')
            }
        } else {
            try {
                const result = await hospitalAPI.createHospital(body);
                if(result.data.statusCode === 1){
                    toast.success('Thêm mới thành công!')
                    form.resetFields();
                }
            } catch (error : any) {
                console.log(error)
                if(error.response.data.message === 'Tên Bệnh viện đã được đăng ký, vui lòng đăng ký tên khác!'){
                    toast.warning('Tên Bệnh viện đã được đăng ký, vui lòng đăng ký tên khác!')
                }
            }
        }

    }

    const onClickPrev = () => {
        navige('/danh-sach-benh-vien')
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
                    label="Tên bệnh viện"
                    rules={[{ required: true, message: 'Vui lòng nhập tên bệnh viện của bạn!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        {id ? 'Cập nhật' : 'Thêm mới'}
                    </Button>
                    <Button className="ml-2" type="dashed" color="danger" variant="outlined" onClick={onClickPrev} >Quay lại</Button>
                </Form.Item>
            </Form>
        </div>
    </Fragment>
}

export default CreateHospotal