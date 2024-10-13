import { FC, Fragment, useEffect } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Button, Form, Input, Select, GetProps, DatePicker, Space, InputNumber } from "antd";
import { GENDER } from "../../../utils";
import type { DatePickerProps, } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { IPatient } from "../../../interface/patient";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchCity, fetchDistrictbyIdCity, getAllByIdHospital, getByIdDepartment } from "../../../features/patientSlice";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

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


const CreateAppointmentRegistrationList: FC = () => {
    const [form] = Form.useForm();
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();
    const { hospital,roles, patient } = useSelector((state: RootState) => state);

    useEffect(() => {
        dispatch(fetchCity())
      }, [dispatch]);

      useEffect(()=>{
        if(hospitalId){
            dispatch(getAllByIdHospital(Number(hospitalId)))
        }
      },[hospitalId, dispatch])
      
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

    const onFinish = async (body: IPatient) => {
       
        const dataRef = {
            name: body.name,
            gender: body.gender,
            yearOld: body.yearOld,
            phone: body.phone,
            content: body.content,
            diseasesId: body.diseasesId,
            departmentId: body.departmentId,
            mediaId: body.mediaId,
            city: body.city,
            district: body.district,
            code: body.code,
            appointmentTime:dayjs( body.appointmentTime).unix(),
            reminderTime: dayjs( body.reminderTime).unix(),
            note: body.note,
            editregistrationTime: dayjs( body.editregistrationTime).unix(),
            status: body.status,
            doctorId: body.doctorId,
            hospitalId: hospitalId,
            chat: body.chat,
            treatment: body.treatment,
            record: body.record,
        }

        console.log(dataRef)
    }

    const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
        console.log('onOk: ', value);
    };

    const handleChangeCity = (e:any)=> {
        dispatch(fetchDistrictbyIdCity(e))
        form.setFieldsValue({ district: undefined });
    }

    const handleChangeDepartment = (e: any)=>{
        dispatch(getByIdDepartment({hospitalId,departmentId:e}))
        form.setFieldsValue({ diseasesId: undefined });
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
                        <InputNumber style={{ width: '100%' }} />

                    </Form.Item>
                    <Form.Item name="content" label="Nội dung tư vấn" >
                        <Input.TextArea rows={3} />

                    </Form.Item>
                    <Form.Item name="departmentId" label="Chọn khoa" rules={[
                        { required: true, message: 'Khoa không được bỏ trống!', }
                    ]}>
                        <Select
                            style={{textTransform:'uppercase'}}
                            showSearch
                            placeholder="Chọn khoa"
                            filterOption={(input, option) =>
                                typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                              }
                            options={patient.department.map((item:any)=>{
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
                            options={patient.diseasses.map((item:any)=>{
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
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={GENDER}
                        />

                    </Form.Item>
                    <Form.Item name="city" label="Tỉnh/TP" rules={[
                        { required: true, message: 'Tỉnh/TP không được bỏ trống!', }
                    ]}>
                        <Select
                            showSearch
                            placeholder="--chọn tỉnh/thành phố--"
                            filterOption={(input, option) =>
                                typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                              }
                            options={patient.loading === 'succeeded' && patient.city.map((item : any)=>{
                                return {
                                    value: item.id,
                                    label: item.full_name
                                }
                            }) }
                            onChange={handleChangeCity}
                        />

                    </Form.Item>
                    <Form.Item name="district" label="Quận/huyện" >
                        <Select

                            showSearch
                            placeholder="--chọn quận/huyện--"
                            filterOption={(input, option) =>
                                typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                              }
                            options={patient.district.map((item:any)=>{
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
                            options={GENDER}
                        />

                    </Form.Item>
                    <Form.Item name="doctorId" label="Bác sĩ tiếp bệnh" >
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
                    <Form.Item name="record" label="Nội dung tiếp nhận" >
                        <Input.TextArea rows={3} />

                    </Form.Item>

                    <div className="text-xl font-bold text-slate-600 mb-3 " > 
                    Hồ sơ thăm khám qua điện thoại :   </div>
                    <Form.Item name="chat" label="Nhập hồ sơ thăm khám" >
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