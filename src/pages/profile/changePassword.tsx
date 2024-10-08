import { Alert, Breadcrumb, Button, Form, Input } from "antd";
import { FC, Fragment } from "react";
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { userAPI } from "../../apis/user.api";
import { toast } from "react-toastify";

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
const ChangePassword: FC = () => {
    const [form] = Form.useForm();
    const {id } = useSelector((state: RootState) => state.users.entities);

    console.log(id);
    

    const dataBreadcrumb = [
        {
            title: 'Trang chủ',
        },
        {
            type: 'separator',
        },
        {
            title: 'Thay đổi mật khẩu',
        },

    ];

    const onFinish = async (values: any) => {
        try {
            const result = await userAPI.resetPassword(id, values)
            if(result?.data?.error?.message === "Mật khẩu gốc không đúng"){
                toast.warning('Mật khẩu gốc không đúng!');
            }
            if(result?.data?.statusCode === 1){
                toast.success('Cập nhật thành công!');
           }
        } catch (error) {
            console.log(error);
            
        }
        

    }
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <Alert className="mt-2" message={
            <div>
                <div>Mẹo sửa đổi:</div>
                <ul style={{ listStyle: 'inside' }} >
                    <li>Bạn phải nhập đúng mật khẩu ban đầu và mật khẩu mới ít nhất 6 chữ số 2 lần</li>
                    <li>Mật khẩu mới của bạn sẽ có hiệu lực ngay sau khi sửa đổi thành công và bạn nên sử dụng mật khẩu mới này ở bất cứ nơi nào cần có mật khẩu cá nhân của bạn</li>

                </ul>
            </div>
        } type="warning" />

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
                    name="password"
                    label="Mật khẩu gốc"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!', whitespace: true }]}
                >
                    <Input.Password />
                </Form.Item>
                

                <Form.Item
                    name="passwordnew"
                    label="Mật khẩu mới"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu mới của bạn!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Nhập lại mật khẩu mới"
                    dependencies={['passwordNew']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng xác nhận mật khẩu mới của bạn!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('passwordnew') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu mới bạn nhập không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </Fragment>
}

export default ChangePassword