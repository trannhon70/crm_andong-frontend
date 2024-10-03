import type { PopconfirmProps } from 'antd';
import { Popconfirm } from 'antd';
import { FC } from 'react';
import { MdDelete } from 'react-icons/md';

interface IPopconfirm {
    title?:any
    description?:any
    value?: any
    deleteRole?: (value: any) => void;
}
const PopconfirmComponent: FC<IPopconfirm> = (props) => {
    const {title, description, value, deleteRole} = props
    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        if (deleteRole) {
            deleteRole(value); // Ensure deleteRole is called safely
          }
      };
      
      const cancel: PopconfirmProps['onCancel'] = (e) => {
      };
    return <Popconfirm
    title={title}
    description={description}
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
     <MdDelete  className='cursor-pointer' color='red' size={25} />
  </Popconfirm>
}

export default PopconfirmComponent