import React, { FC, Fragment, useEffect } from 'react';
import type { FormProps } from 'antd';
import { Breadcrumb, Button, Form, Input, Select } from 'antd';
import { Languege } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { userAPI } from '../../apis/user.api';
import { toast } from 'react-toastify';
import { fetchUserById } from '../../features/usersSlice';

type FieldType = {
    email?: string;
    fullName?: string;
    language?: string;
};

const ProfileUser: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [form] = Form.useForm(); // Create a form instance


    const users = useSelector((state: RootState) => state.users.entities);
    

    useEffect(() => {
        // Ensure users has the properties before setting values
        if (users) {
            form.setFieldsValue({
                email: users.email,
                fullName: users.fullName, // Ensure fullName is also set
                language: users.language, // Ensure language is also set
            });
        }
    }, [users, form]); // Added `form` to the dependency array

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const body = {
            email: values.email,
            fullName: values.fullName,
            language: values.language,
        }

       try {
        const result = await userAPI.UpdateUserId(users.id, body)
        if(result.data.statusCode === 1){
            toast.success('Cập nhật thôn tin cá nhân thành công!')
            dispatch(fetchUserById());
        }
       } catch (error) {
        toast.error('Cập nhật thôn tin cá nhân không thành công!')
       }
        

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Fragment>
            <Breadcrumb
                separator=">"
                items={[
                    {
                        title: 'Home',
                    },
                    {
                        title: 'Thông tin cá nhân',
                        href: '',
                    },
                ]}
            />
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='mt-3'
                form={form}
            >
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Họ và tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Vui lòng nhập Họ và tên!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Ngôn ngữ"
                    name="language"
                    rules={[{ required: true, message: 'Vui lòng chọn ngôn ngữ!' }]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn ngôn ngữ" // Adjusted placeholder
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={Languege}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
};

export default ProfileUser;
