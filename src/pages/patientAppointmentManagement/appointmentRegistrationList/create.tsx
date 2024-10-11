import { FC, Fragment } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Button, Form, Input, Select, GetProps, DatePicker, Space } from "antd";
import { GENDER } from "../../../utils";
import type { DatePickerProps, } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;

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
            span: 22,
            offset: 2,
        },
    },
};

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
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

    const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
        console.log('onOk: ', value);
    };
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
                <div className="w-[50%] border-solid border-2 border-indigo-600 p-3 rounded-l  " >
                    <div className="text-xl font-bold text-slate-600 mb-3 " > Thông tin cơ bản :   </div>
                    <Form.Item name="name" label="Họ và tên" rules={[
                        { required: true, message: 'Họ và tên không được bỏ trống!', }
                    ]}>
                        <Input />

                    </Form.Item>
                    <Form.Item name="gender" label="Giới tính" rules={[
                        { required: true, message: 'Giới tính không được bỏ trống!', }
                    ]}>
                        <Select
                            showSearch
                            placeholder="Chọn giới tính"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={GENDER}
                        />

                    </Form.Item>
                    <Form.Item name="yearOld" label="Nhập tuổi" rules={[
                        { required: true, message: 'Tuổi không được bỏ trống!', }
                    ]}>
                        <Input type="number" />

                    </Form.Item>
                    <Form.Item name="phone" label="Nhập số điện thoại" rules={[
                        { required: true, message: 'Số điện thoại không được bỏ trống!', }
                    ]}>
                        <Input type="number" />

                    </Form.Item>
                    <Form.Item name="content" label="Nội dung tư vấn" >
                        <Input.TextArea rows={3} />

                    </Form.Item>
                    <Form.Item name="departmentId" label="Chọn khoa" rules={[
                        { required: true, message: 'Khoa không được bỏ trống!', }
                    ]}>
                        <Select
                            showSearch
                            placeholder="Chọn khoa"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={GENDER}
                        />

                    </Form.Item>
                    <Form.Item name="diseasesId" label="Chọn bệnh" rules={[
                        { required: true, message: 'Bệnh không được bỏ trống!', }
                    ]}>
                        <Select
                            showSearch
                            placeholder="Chọn bệnh"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={GENDER}
                        />

                    </Form.Item>
                    <Form.Item name="mediaId" label="Nguồn đến" rules={[
                        { required: true, message: 'Nguồn đến không được bỏ trống!', }
                    ]}>
                        <Select
                            showSearch
                            placeholder="Nguồn đến"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={GENDER}
                        />

                    </Form.Item>
                    <Form.Item name="city" label="Khu vực" rules={[
                        { required: true, message: 'Khu vực không được bỏ trống!', }
                    ]}>
                        <Select
                            showSearch
                            placeholder="Khu vực"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={GENDER}
                        />

                    </Form.Item>
                    <Form.Item name="code" label="Mã chuyên gia" rules={[
                        { required: true, message: 'Mã chuyên gia không được bỏ trống!', }
                    ]}>
                        <Input />
                    </Form.Item>

                    <Form.List name="treatment">
                        {(fields, { add, remove }, { errors }) => (
                            <>

                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...formItemLayout}
                                        label={`${index === 0 ? 'Mục điều trị' : ''} `}
                                        required={false}
                                        key={field.key}
                                        colon={index === 0 ? true : false}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            noStyle
                                        >
                                            <Input placeholder="" style={{ width: '60%' }} />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: '60%' }}
                                        icon={<PlusOutlined />}
                                    >
                                        Thêm mục điều trị
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </div>
                {/* right */}
                <div className="w-[50%] border-solid border-2 border-indigo-600 p-3 rounded-r ">


                    <Form.Item name="appointmentTime" label="Thời gian hẹn" rules={[
                        { required: true, message: 'Thời gian hẹn không được bỏ trống!', }
                    ]}>
                        <DatePicker
                            placeholder="Chọn thời gian hẹn"
                            showTime
                            onChange={(value, dateString) => {
                                console.log('Selected Time: ', value);
                                console.log('Formatted Selected Time: ', dateString);
                            }}
                            onOk={onOk}
                        />

                    </Form.Item>
                    <Form.Item name="reminderTime" label="Thời gian nhắc hẹn" rules={[
                        { required: true, message: 'Thời gian nhắc hẹn không được bỏ trống!', }
                    ]}>
                        <DatePicker
                            placeholder="Chọn thời gian nhắc hẹn"
                            showTime
                            onChange={(value, dateString) => {
                                console.log('Selected Time: ', value);
                                console.log('Formatted Selected Time: ', dateString);
                            }}
                            onOk={onOk}
                        />

                    </Form.Item>
                    <Form.Item name="note" label="Ghi chú" >
                        <Input.TextArea rows={3} />

                    </Form.Item>


                    <div className="text-xl font-bold text-slate-600 mb-3 " > Đến khám chưa :   </div>
                    <Form.Item name="reminderTime" label="Sửa đổi thời gian đăng ký" >
                        <DatePicker
                            placeholder="Chọn thời gian sửa đổi"
                            showTime
                            onChange={(value, dateString) => {
                                console.log('Selected Time: ', value);
                                console.log('Formatted Selected Time: ', dateString);
                            }}
                            onOk={onOk}
                        />

                    </Form.Item>
                    <Form.Item name="city" label="Trạng thái" >
                        <Select
                            showSearch
                            placeholder="Trạng thái"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={GENDER}
                        />

                    </Form.Item>
                    <Form.Item name="city" label="Bác sĩ tiếp bệnh" >
                        <Select
                            showSearch
                            placeholder="---Lựa chọn---"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={GENDER}
                        />

                    </Form.Item>
                    <div className="text-xl font-bold text-slate-600 mb-3 " > Hồ sơ tiếp nhận :   </div>
                    <Form.Item name="note" label="Nội dung tiếp nhận" >
                        <Input.TextArea rows={3} />

                    </Form.Item>

                    <div className="text-xl font-bold text-slate-600 mb-3 " > 
                    Hồ sơ thăm khám qua điện thoại :   </div>
                    <Form.Item name="note" label="Nhập hồ sơ thăm khám" >
                        <Input.TextArea rows={3} />

                    </Form.Item>
                    <Form.Item  {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Thêm mới
                        </Button>
                        <Button className="ml-2" danger type="dashed" htmlType="submit">
                            Quay lại
                        </Button>
                    </Form.Item>
                </div>




            </Form>
        </div>
    </Fragment>
}

export default CreateAppointmentRegistrationList