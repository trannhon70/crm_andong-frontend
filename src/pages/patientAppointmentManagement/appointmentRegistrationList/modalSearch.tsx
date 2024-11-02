import React, { useState, FC, useEffect } from 'react';
import { Button, Input, Modal, DatePicker, Select, GetProps, DatePickerProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getAllByIdHospital, getAllDoctor, getAllMedia, getByIdDepartment } from '../../../features/patientSlice';
import { SATUS } from '../../../utils';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;

interface IProps {

}
const ModalSearch: FC<IProps> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const hospitalId = localStorage.getItem('hospitalId')
    const { patient } = useSelector((state: RootState) => state);
    const [form, setform] = useState({
        search: '',
        created_at: [],
        appointmentTime: [],
        doctorId: '',
        departmentId:'',
        diseasesId: '',
        mediaId: '',
        status: '',
    })

    console.log(form, 'form');
    

    useEffect(() => {
       
        if (hospitalId) {
            dispatch(getAllDoctor(Number(hospitalId)))
            dispatch(getAllByIdHospital(Number(hospitalId)))
            dispatch(getAllMedia(Number(hospitalId)));
        }
    }, [hospitalId, dispatch])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChangeDepartment = (e: any) => {
        dispatch(getByIdDepartment({ hospitalId, departmentId: e }))
        setform((form) => ({
            ...form,
            departmentId: e,
            diseasesId: '',
        }));
    }

    const handleChangeSearch = (e: any) => {
        setform((prev: any) => ({
            ...prev,
            search: e.target.value
        }));
    }   

    const handleChangeDoctor = (e: any) => {
        setform((form)=>({
            ...form,
            doctorId: e
        }))
    }

    const handleChangeStatus = (e: any) => {
        setform((form)=>({
            ...form,
            status: e
        }))
    }

    const handleChangeDiseases = (e: any) => {
        setform((form)=>({
            ...form,
            diseasesId: e
        }))
    }

    const handleChangeMedia = (e: any) => {
        setform((form)=>({
            ...form,
            mediaId: e
        }))
    }


    return <>

        <Button type="primary" variant="dashed" color="primary" onClick={showModal}>
            Tìm kiếm
        </Button>
        <Modal title="Tìm kiếm nâng cao " open={isModalOpen} footer={false} onOk={handleOk} onCancel={handleCancel}>
            <div className='flex items-center gap-1 ' >
                <div className='w-[30%] text-right ' >
                    Từ khóa :
                </div>
                <div className='w-[70%]' >
                    <Input size='middle' onChange={handleChangeSearch} placeholder='họ tên, số điện thoại, mã chuyên gia' />
                </div>
            </div>
            <div className='flex items-center gap-1 mt-2 ' >
                <div className='w-[30%] text-right ' >
                    Thời gian thêm :
                </div>
                <div className='w-[70%]' >
                    <RangePicker className='w-[100%]' onChange={(value, dateString) => {
                        setform((form : any)=>(
                            {
                                ...form,
                                created_at: dateString
                            }
                        ))
                    }}
                     />
                </div>
            </div>
            <div className='flex items-center gap-1 mt-2 ' >
                <div className='w-[30%] text-right ' >
                    Thời gian hẹn :
                </div>
                <div className='w-[70%]' >
                    <RangePicker className='w-[100%]' onChange={(value, dateString) => {
                        setform((form : any)=>(
                            {
                                ...form,
                                appointmentTime: dateString
                            }
                        ))
                    }}
                     />
                </div>
            </div>
            <div className='flex items-center gap-1 mt-2 ' >
                <div className='w-[30%] text-right ' >
                    Bác sĩ :
                </div>
                <div className='w-[70%]' >
                    <Select
                        className='w-[100%]'
                        showSearch
                        placeholder="---Lựa chọn---"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient.doctor.length > 0 && patient.doctor.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                        onChange={handleChangeDoctor}
                    />
                </div>
            </div>
            <div className='flex items-center gap-1 mt-2 ' >
                <div className='w-[30%] text-right ' >
                    Tình trạng cuộc hẹn :
                </div>
                <div className='w-[70%]' >
                    <Select
                        style={{ width: "100%" }}
                        showSearch
                        placeholder="---Trạng thái---"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={SATUS}
                        onChange={handleChangeStatus}
                    />
                </div>
            </div>
            <div className='flex items-center gap-1 mt-2 ' >
                <div className='w-[30%] text-right ' >
                    Khoa :
                </div>
                <div className='w-[70%]' >
                    <Select
                        style={{ width: "100%" }}
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
                </div>
            </div>
            <div className='flex items-center gap-1 mt-2 ' >
                <div className='w-[30%] text-right ' >
                    Bệnh :
                </div>
                <div className='w-[70%]' >
                    <Select
                        style={{ width: "100%" }}
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
                        onChange={handleChangeDiseases}
                    />
                </div>
            </div>
            <div className='flex items-center gap-1 mt-2 ' >
                <div className='w-[30%] text-right ' >
                    Nguồn đến :
                </div>
                <div className='w-[70%]' >
                    <Select
                        style={{ width: "100%" }}
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
                        onChange={handleChangeMedia}
                    />
                </div>
            </div>
            <div className='flex items-center justify-end gap-1 mt-2 ' >
                <Button variant='solid' color='primary' >Tìm Kiếm</Button>
                <Button variant='solid' color='danger' >Thoát</Button>
            </div>
        </Modal>

    </>
}

export default ModalSearch;