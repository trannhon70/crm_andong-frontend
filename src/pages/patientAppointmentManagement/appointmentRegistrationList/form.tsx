import { Alert, Button, DatePicker, Form, GetProps, Input, InputNumber, Select, Tag } from "antd";
import { FC, Fragment } from "react";
import { GENDER, STATUS } from "../../../utils";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from "moment";
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
interface IProps {
    formItemLayout: any;
    tailFormItemLayout: any;
    form: any;
    onFinish: any;
    patient: any;
    handleChangeDepartment: any;
    handleChangeCity: any;
    id: number;
    onOk: any;
    error: any;
    setError: any;
    onClickPrev: any;
}
const FormCreateUser: FC<IProps> = (props) => {
    const { formItemLayout, tailFormItemLayout, form, onFinish, patient, handleChangeDepartment, handleChangeCity, id, onOk, error, setError, onClickPrev } = props
    return <Fragment>
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
                    <InputNumber style={{ width: '100%' }} />

                </Form.Item>
                <Form.Item name="phone" label="Nhập số điện thoại" rules={[
                    { required: true, message: 'Số điện thoại không được bỏ trống!', }
                ]}>
                    <Input style={{ width: '100%' }} />

                </Form.Item>
                <Form.Item name="content" label="Nội dung tư vấn" >
                    <Input.TextArea rows={3} />

                </Form.Item>
                <Form.Item name="departmentId" label="Chọn khoa" rules={[
                    { required: true, message: 'Khoa không được bỏ trống!', }
                ]}>
                    <Select

                        showSearch
                        placeholder="--Chọn khoa--"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient?.department.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}

                        onChange={handleChangeDepartment}
                    />

                </Form.Item>
                <Form.Item name="diseasesId" label="Chọn bệnh" rules={[
                    { required: true, message: 'Bệnh không được bỏ trống!', }
                ]}>
                    <Select
                        showSearch
                        placeholder="--Chọn bệnh--"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient.diseasses.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    />

                </Form.Item>
                <Form.Item name="mediaId" label="Nguồn đến" rules={[
                    { required: true, message: 'Nguồn đến không được bỏ trống!', }
                ]}>
                    <Select
                        showSearch
                        placeholder="Nguồn đến"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient.media.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    />

                </Form.Item>
                <Form.Item name="cityId" label="Tỉnh/TP" rules={[
                    { required: true, message: 'Tỉnh/TP không được bỏ trống!', }
                ]}>
                    <Select
                        showSearch
                        placeholder="--chọn tỉnh/thành phố--"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient.loading === 'succeeded' && patient.city.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                        onChange={handleChangeCity}
                    />

                </Form.Item>
                <Form.Item name="districtId" label="Quận/huyện" >
                    <Select

                        showSearch
                        placeholder="--chọn quận/huyện--"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient.district.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.full_name
                            }
                        })}
                    />

                </Form.Item>
                <Form.Item name="code" label="Mã chuyên gia" rules={[
                    { required: true, message: 'Mã chuyên gia không được bỏ trống!', }
                ]}>
                    <Input />
                </Form.Item>
                {
                    id ? <Form.List name="treatment">
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
                                        {fields?.length > 1 ? (
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
                    </Form.List> : ''
                }

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
                <Form.Item label="Lưu ý ">
                    <Alert message="Thời gian nhắc hẹn phải nhỏ hơn thời gian hẹn" type="warning" />
                </Form.Item>
                <Form.Item name="reminderTime" label="Thời gian nhắc hẹn" rules={!id ? [
                    { required: true, message: 'Thời gian nhắc hẹn không được bỏ trống!', }
                ] : []}
                    // validateStatus={error.reminderTime ? "error" : ""}
                    // help={error.reminderTime}
                >
                    <DatePicker
                        placeholder="Chọn thời gian nhắc hẹn"
                        showTime
                        onChange={(value, dateString) => {
                            console.log('Selected Time: ', value);
                            console.log('Formatted Selected Time: ', dateString);
                            setError({
                                ...error,
                                reminderTime: false
                            })
                        }}
                        onOk={onOk}
                    />

                </Form.Item>
                <Form.Item name="note" label="Ghi chú" >
                    <Input.TextArea rows={3} />

                </Form.Item>


                <div className="text-xl font-bold text-slate-600 mb-3 " > Đến khám chưa :   </div>
                <Form.Item name="editregistrationTime" label="Sửa đổi thời gian đăng ký" >
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
                <Form.Item name="status" label="Trạng thái" >
                    <Select
                        showSearch
                        placeholder="Trạng thái"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={STATUS}
                    />

                </Form.Item>
                <Form.Item label="Lưu ý ">
                    <Alert message="Khi bệnh nhân tới khám mới chọn bác sĩ tiếp bệnh" type="warning" />
                </Form.Item>

                <Form.Item name="doctorId" label="Bác sĩ tiếp bệnh" >
                    <Select
                        showSearch
                        placeholder="---Lựa chọn---"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient.doctor.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    />

                </Form.Item>
                {
                    id ? <Form.Item name="money" label="Chi phí" >
                    <InputNumber className="w-[100%]" />

                </Form.Item> : ''
                }

                {  id ?
                   patient.patient.status === 'ĐÃ ĐẾN' && <>
                        <div className="text-xl font-bold text-slate-600 mb-3 " > Hồ sơ tiếp nhận :   </div>
                        <Form.Item name="record" label="Nội dung tiếp nhận" >
                            <Input.TextArea rows={3} />

                        </Form.Item>
                    </> : ''
                }
                {
                    id ? <>
                        <div className="text-xl font-bold text-slate-600 mb-3 " >
                            Hồ sơ thăm khám qua điện thoại :   </div>

                        {patient?.patient?.chatPatients && patient?.patient?.chatPatients.length > 0 && <Form.Item label="Nội dung thăm khám" >

                            {
                                patient?.patient?.chatPatients.map((item: any, index: number) => {
                                    return <div key={index} className="flex gap-2 mt-2 " >
                                        <div>
                                            {moment(item.created_at * 1000).format('DD-MM-YYYY HH:mm:ss')}
                                        </div>
                                        <div>
                                            <Tag color="orange-inverse" >{item.user.fullName}</Tag>
                                        </div>
                                        <div>
                                            {item.name}
                                        </div>
                                    </div>
                                })
                            }
                        </Form.Item>}
                        <Form.Item name="chat" label="Nhập hồ sơ thăm khám" >
                            <Input.TextArea rows={3} />

                        </Form.Item>
                    </> : ''
                }


                <Form.Item  {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        {id ? 'Cập nhật' : 'Thêm mới'}
                    </Button>
                    <Button className="ml-2" danger type="dashed" onClick={onClickPrev} >
                        Quay lại
                    </Button>
                </Form.Item>
            </div>




        </Form>
    </Fragment>
}


export default FormCreateUser