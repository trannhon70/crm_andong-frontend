import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllByIdHospital, getAllDoctor, getAllMedia, getByIdDepartment } from '../../../features/patientSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { SATUS } from '../../../utils';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const { RangePicker } = DatePicker;
interface IProps {

}
const ModalSearch: FC<IProps> = (props) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const hospitalId = localStorage.getItem('hospitalId')
    const { patient } = useSelector((state: RootState) => state);

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        // Lấy query string từ URL
        const queryParams = new URLSearchParams(location.search);
        const createdAtString  = queryParams.get('created_at')
        const appointmentTimeString  = queryParams.get('appointmentTime')
        let created_at = null;
        let appointmentTime = null

        if (createdAtString ) {
            try {
                created_at = JSON.parse(createdAtString);
            } catch (error) {
                console.error("Không thể phân tích cú pháp created_at:", error);
            }
        }
        if (appointmentTimeString) {
            try {
                appointmentTime = JSON.parse(appointmentTimeString);
            } catch (error) {
                console.error("Không thể phân tích cú pháp appointmentTime:", error);
            }
        }
        if(Number(queryParams.get('departmentId'))){
            dispatch(getByIdDepartment({ hospitalId, departmentId: Number(queryParams.get('departmentId')) }))
        }
        
        // Cập nhật state `form` từ query string
        form.setFieldValue('search', queryParams.get('search'));
        if(created_at){
            form.setFieldValue('created_at', [dayjs(created_at?.[0] * 1000), dayjs(created_at?.[1] * 1000)]);
        }
        if(appointmentTime){
            form.setFieldValue('appointmentTime', [dayjs(appointmentTime?.[0] * 1000), dayjs(appointmentTime?.[1] * 1000)]);
        }
        form.setFieldValue('doctorId', Number(queryParams.get('doctorId'))|| '');
        form.setFieldValue('status', queryParams.get('status') || '');
        form.setFieldValue('departmentId', Number(queryParams.get('departmentId')) || '');
        form.setFieldValue('diseasesId', Number(queryParams.get('diseasesId')) || '');
        form.setFieldValue('mediaId', Number(queryParams.get('mediaId')) || '');
        
    }, [location.search]);

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

    const handleChangeDiseases = (e: any) => {
        dispatch(getByIdDepartment({ hospitalId, departmentId: e }))
        form.setFieldsValue({ diseasesId: undefined });
    }


    const onFinish = (values: any) => {
        const dataRef = {
            search : values.search || '',
            created_at: values.created_at ? JSON.stringify([dayjs(values.created_at?.[0]).unix(), dayjs(values.created_at?.[1]).unix()]) : '' ,
            appointmentTime:values.appointmentTime ? JSON.stringify([dayjs(values.appointmentTime?.[0]).unix(), dayjs(values.appointmentTime?.[1]).unix()]): '' ,
            doctorId : values.doctorId || '',
            status : values.status || '',
            departmentId : values.departmentId || '',
            diseasesId : values.diseasesId || '',
            mediaId : values.mediaId || '',
        }

        const queryParams = new URLSearchParams(dataRef).toString() ;
        navigate(`/danh-sach-dang-ky-hen?${queryParams}`);
        setIsModalOpen(false);
    }

    const onclickClose = (event: any) => {
        event.preventDefault();
        setIsModalOpen(false);
    }




    return <>

        <Button type="primary" variant="dashed" color="primary" onClick={showModal}>
            Tìm kiếm
        </Button>
        <Modal title="Tìm kiếm nâng cao " open={isModalOpen} footer={false} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                {...layout}
                name="search_form"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                 variant="filled"
                 size="middle"
            >
                <Form.Item name="search" label="Từ khóa" >
                    <Input size='middle' placeholder='họ tên, số điện thoại, mã chuyên gia' />
                </Form.Item>
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
                        options={patient.doctor.length > 0 && patient.doctor.map((item: any) => {
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
                        options={SATUS}
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
                        options={patient?.department.map((item: any) => {
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
                        options={patient.diseasses.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    />
                </Form.Item>
                <Form.Item name="mediaId" label=" Nguồn đến">
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder="---Lựa chọn---"
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
                <Form.Item {...tailLayout}>
                    <div className='flex items-center justify-end gap-1' >
                        <Button type="primary" htmlType="submit" variant='solid' color='primary' >Tìm Kiếm</Button>
                        <Button onClick={onclickClose} variant='solid' color='danger' >Thoát</Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>

    </>
}

export default ModalSearch;