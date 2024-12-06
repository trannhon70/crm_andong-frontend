import { Button, DatePicker, Form, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCity, fetchDistrictbyIdCity, getAllByIdHospital, getAllDoctor, getAllMedia, getByIdDepartment, getXuatDuLieuBenhNhan } from '../../../features/patientSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { STATUS } from '../../../utils';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const { RangePicker } = DatePicker;
interface IProps{
    pageIndex?: number,
    pageSize?: number
}
const ModalSearch: FC<IProps> = (props) => {
    const {pageIndex, pageSize} = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const hospitalId = localStorage.getItem('hospitalId')
    const { patient } = useSelector((state: RootState) => state);

    useEffect(() => {
        dispatch(fetchCity())
        if (hospitalId) {
            dispatch(getAllDoctor(Number(hospitalId)))
            dispatch(getAllByIdHospital(Number(hospitalId)))
            dispatch(getAllMedia(Number(hospitalId)));
        }
    }, [hospitalId, dispatch])

    const showModal = () => {
      setIsModalOpen(true);
    };
  
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const onFinish = (values: any) => {
        const query = {
            hospitalId: Number(hospitalId),
            pageSize: pageSize,
            pageIndex: pageIndex,
            created_at: values.created_at ? JSON.stringify([dayjs(values.created_at?.[0]).unix(), dayjs(values.created_at?.[1]).unix()]) : '' ,
            appointmentTime:values.appointmentTime ? JSON.stringify([dayjs(values.appointmentTime?.[0]).unix(), dayjs(values.appointmentTime?.[1]).unix()]): '' ,
            doctorId : values.doctorId || '',
            status : values.status || '',
            departmentId : values.departmentId || '',
            diseasesId : values.diseasesId || '',
            cityId : values.cityId || '',
            districtId : values.districtId || '',
        }
        dispatch(getXuatDuLieuBenhNhan(query))
        
        // setIsModalOpen(false);
    }

    const handleChangeDiseases = (e: any) => {
        dispatch(getByIdDepartment({ hospitalId, departmentId: e }))
        form.setFieldsValue({ diseasesId: undefined });
    }

    const handleChangeCity = (e: number) => {
        dispatch(fetchDistrictbyIdCity( e ))
        form.setFieldsValue({ districtId: undefined });
    }

    const onclickClose = (event: any) => {
        event.preventDefault();
        setIsModalOpen(false);
    }
    return <Fragment>
       <Button type="primary" onClick={showModal}>
        Tìm kiếm
      </Button>
      <Modal title="Tìm kiếm" open={isModalOpen}  onCancel={handleCancel} footer={false} >
      <Form
                form={form}
                {...layout}
                name="search_form"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                 variant="filled"
                 size="middle"
            >
               
                <Form.Item name="created_at" label="Thời gian thêm">
                    <RangePicker className='w-[100%]' />
                </Form.Item>
                <Form.Item name="appointmentTime" label="Thời gian hẹn">
                    <RangePicker className='w-[100%]' />
                </Form.Item>
                <Form.Item name="doctorId" label="Bác sĩ">
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder="---Lựa chọn---"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient.doctor.length > 0 && patient?.doctor?.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    />
                </Form.Item>
                <Form.Item name="status" label="Tình trạng cuộc hẹn">
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder="---Lựa chọn---"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={STATUS()}
                    />
                </Form.Item>
                <Form.Item name="departmentId" label="Khoa">
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder="---Lựa chọn---"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient?.department?.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                        onChange={handleChangeDiseases}
                    />
                </Form.Item>
                <Form.Item name="diseasesId" label="Bệnh">
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder="---Lựa chọn---"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient?.diseasses?.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    />
                </Form.Item>
                <Form.Item name="cityId" label="Tỉnh/TP">
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder="---Lựa chọn---"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient?.city?.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                        onChange={handleChangeCity}
                    />
                </Form.Item>
                <Form.Item name="districtId" label="Quận/huyện">
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder="---Lựa chọn---"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient?.district?.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    />
                </Form.Item>
                
                <Form.Item {...tailLayout}>
                    <div className='flex items-center justify-end gap-1' >
                        <Button type="primary" htmlType="submit" variant='solid' color='primary' >Tìm Kiếm</Button>
                        <Button onClick={onclickClose} variant='solid' color='danger' >Thoát</Button>
                    </div>
                </Form.Item>
            </Form>
      </Modal>
    </Fragment>
}

export default ModalSearch