import { FC, Fragment } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Button, Form, Input } from "antd";

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
const CreateAppointmentRegistrationList: FC = () => {
    const [form] = Form.useForm();

    const dataBreadcrumb = [
        {

            title: 'Quản lý cuộc hẹn bệnh nhân',
        },
        {
            type: 'separator',
        },
        {
            href: '/danh-sach-dang-ky-hen',
            title: 'Danh sách đăng ký hẹn',
        },
        {
            type: 'separator',
        },
        {
            title: 'Thêm mới',
        },
    ];

    const onFinish = async (values: any) => {
        console.log(values);


    }
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className="flex items-center justify-center mt-5 " >
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                size="middle"
                variant="filled"
                className="flex w-[100%] "
            >
                <div className="w-[50%]" >
                <Form.Item name="departmentId" label="Chuyên khoa" rules={[
                    { required: true, message: 'Vui lòng chọn chuyên khoa của bạn!', }
                ]}>
                    <Input />

                </Form.Item>
                </div>
                <div className="w-[50%]">
                <Form.Item
                    name="name"
                    label="Tên bệnh"
                    rules={[{ required: true, message: 'Vui lòng nhập tên bệnh của bạn!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Thêm mới
                    </Button>
                </Form.Item>
                </div>
                


                
            </Form>
        </div>
    </Fragment>
}

export default CreateAppointmentRegistrationList