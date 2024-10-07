import {
    Alert, Button, Form,
    Input,
    Select,
    Switch
} from "antd";
import { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import { getAllHospital } from "../../features/hospitalSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { Languege } from "../../utils";
import { getAllRole } from "../../features/rolesSlice";
import { userAPI } from "../../apis/user.api";
import { IUser } from "../../interface/users";
import { toast } from "react-toastify";
const { Option } = Select;



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

const CreatePeople: FC = () => {
    let { id } = useParams();
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const { hospital,roles } = useSelector((state: RootState) => state);
   
    
    const onFinish = async (values: any) => {
        const body = {
            email: values.email,
            fullName: values.fullName,
            hospitalId: JSON.stringify(values.hospitalId),
            isshow: values.isshow,
            language: values.language,
            roleId: values.roleId,
            password: values.password,
        } as IUser

        try {
            const result = await userAPI.create(body)
           if(result.data.statusCode === 1){
                toast.success('Thêm mới thành công!')
                form.resetFields();
           }
            
        } catch (error : any) {
            toast.error(`${error.response.data.message}`)
            
        }
    };


    const dataBreadcrumb = [
        {
            title: 'Quản lý hệ thống',
        },
        {
            type: 'separator',
        },
        {
            href: '/quan-ly-con-nguoi',
            title: 'Quản lý con người',
        },
        {
            type: 'separator',
        },
        {
            title: <>{id ? 'Cập nhật' : 'Thêm mới'}</>,
        },
    ];

    useEffect(() => {
        dispatch(getAllHospital());
        dispatch(getAllRole());
      }, [dispatch ])
    
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <Alert className="mt-2" message={
            <div>
                <div>Mẹo sửa đổi:</div>
                <ul style={{ listStyle: 'inside' }} >
                    <li><span className="text-red-600" >Mỗi mục</span> dữ liệu trên trang này cần phải được điền cẩn thận . Nếu điền sai có thể dẫn đến những hậu quả rất nghiêm trọng <span className="text-red-600">như mất dữ liệu, tài khoản không thể đăng nhập</span>, v.v. Nếu bạn có bất kỳ câu hỏi nào về việc điền, vui lòng tham khảo ý kiến ​​​​của nhà phát triển.</li>

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
                    name="fullName"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên của bạn!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'Email đầu vào không hợp lệ!',
                        },
                        {
                            required: true,
                            message: 'Vui lòng nhập E-mail của bạn!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu của bạn!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Nhập lại mật khẩu"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng xác nhận mật khẩu của bạn!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu mới bạn nhập không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="language" label="Ngôn ngữ" rules={[
                    { required: true, message: 'Vui lòng chọn ngôn ngữ của bạn!', }
                ]}>
                    <Select
                        placeholder="Vui lòng chọn ngôn ngữ hoạt động"
                        allowClear
                    >
                        {
                            Languege.map((item: any) => {
                                return <Option key={item.value} value={item.value}>{item.label}</Option>
                            })
                        }

                    </Select>
                </Form.Item>
                <Form.Item name="isshow" label="Hoạt động" valuePropName="checked" initialValue={false}>
                    <Switch />
                </Form.Item>
                <div className="text-xl text-red-800 font-bold " >Ủy quyền:</div>
                <Form.Item name="hospitalId" label="Bệnh viện" >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        //   defaultValue={['a10', 'c12']}
                        //   onChange={handleChange}
                        options={hospital.loading === 'succeeded' && hospital.hospital.map((item: any)=> {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    />
                </Form.Item>

                <Form.Item name="roleId" label="Chọn quyền" >
                    <Select
                        placeholder="Chọn quyền"
                        allowClear
                    >
                        {
                          roles.loading === 'succeeded' &&  roles.allRole.map((item: any) => {
                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                            })
                        }

                    </Select>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Thêm mới
                    </Button>
                </Form.Item>
            </Form>
        </div>

    </Fragment>
}

export default CreatePeople