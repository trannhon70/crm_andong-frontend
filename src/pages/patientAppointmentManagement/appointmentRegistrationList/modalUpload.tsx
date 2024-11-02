import React, { useState, FC } from 'react';
import { Button, Modal, Space, Upload, message } from 'antd';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { patiantAPI } from '../../../apis/patient.api';
import { toast } from 'react-toastify';

interface IProps {
    id?: number
}

const ModalUpload: FC<IProps> = (props) => {
    const {id} = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (fileList.length > 0) {
            const formData = new FormData();
            
            fileList.forEach((file) => {
                if (file.originFileObj) {
                    formData.append('file', file.originFileObj); 
                }
            });
            try {
                const result = await patiantAPI.uploadPatient(formData, Number(id))
                if (result.data.statusCode === 1) {
                    toast.success('Lưu file thành công!')
                    setIsModalOpen(false); // Đóng modal
                    setFileList([]); // Xóa danh sách file
                }
                
            } catch (error) {
                console.log(error);
                toast.error('Lưu file không thành công!')
            }
        } else {
            message.warning("No files to save!");
        }
        // setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setFileList([]); // Xóa danh sách file khi đóng modal
    };

    const handleUploadChange = (info: { fileList: UploadFile[] }) => {
        setFileList(info.fileList); // Cập nhật danh sách file
    };

    return (
        <>
            <div onClick={showModal} className='flex justify-center items-center gap-1 ' >
                <FaCloudUploadAlt  className="cursor-pointer text-orange-500" size={25} />
                <span>Upload file</span>
            </div>

            <Modal
                title="Upload file"
                open={isModalOpen}
                footer={null}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <Upload
                        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture"
                        fileList={fileList}
                        onChange={handleUploadChange}
                        maxCount={1} // Số lượng file tối đa
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Space>
                <div className="flex justify-end items-center gap-2 mt-4">
                    <Button type="primary" onClick={handleOk}>Lưu</Button>
                    <Button onClick={handleCancel} danger type="dashed">Hủy</Button>
                </div>
            </Modal>
        </>
    );
};

export default ModalUpload;
