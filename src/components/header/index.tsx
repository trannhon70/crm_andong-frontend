import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Badge, Button, Dropdown, Space, Tag } from "antd";
import { Header } from "antd/es/layout/layout";
import { Dispatch, FC, SetStateAction, useContext, useEffect } from "react";
import { CiLogout } from "react-icons/ci";
import { PiUserSwitchDuotone } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUserById, getAllUserOnline } from '../../features/usersSlice';
import ModalInvalidToken from '../modalInvalidToken';
import i18n from '../../i18n/i18n';
import { PiPasswordFill } from "react-icons/pi";
import { FaCheck } from 'react-icons/fa';
import { getByIdHospital } from '../../features/hospitalSlice';


interface IHeaderProps {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
}

const HeaderComponent: FC<IHeaderProps> = ({ collapsed, setCollapsed }) => {
    const { logout } = useContext(AuthContext);
    const dispatch = useDispatch<AppDispatch>();
    const hospitalId = localStorage.getItem('hospitalId')
    const  users = useSelector((state: RootState) => state.users);
    const hospital = useSelector((state: RootState) => state.hospital);
    
    useEffect(() => {
        dispatch(fetchUserById());
        dispatch(getAllUserOnline())
    }, [dispatch])

    useEffect(() => {
        if(hospitalId){
            dispatch(getByIdHospital(Number(hospitalId)));
        }
    }, [hospitalId])

    useEffect(() => {
        i18n.changeLanguage(users?.entities.language);
    },[users?.entities.language])

    const items: MenuProps['items'] = [
        {
            key: 'a',
            label: (
                <Link className='text-base' to='profile'>Thông tin cá nhân</Link>
            ),
            icon: <PiUserSwitchDuotone size={30} />,
        },

        {
            key: 'c',
            label: (
                <Link className='text-base' to='thay-doi-mat-khau'>Thay đổi mật khẩu</Link>
            ),
            icon: <PiPasswordFill  size={30} />,
        },

        {
            key: 'b',
            danger: true,
            label: <div onClick={logout} >Đăng xuất</div>,
            icon: <CiLogout size={30} />,
        },
    ];
    return <Header className='flex justify-between ' style={{ padding: 0, background: 'white' }}>
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
                fontSize: '16px',
                width: 64,
                height: 64,
            }}
        />
        <div className='flex items-center justify-between gap-3 pr-4 w-[100%] ' style={{textTransform:'capitalize'}} >
            <div >
                {
                    hospital.hospitalById?.id ? <Tag className='flex items-center gap-2 text-base ' icon={<FaCheck />} color='green-inverse' > <strong>{hospital.hospitalById?.name}</strong></Tag>  : ''
                }
                 
            </div>
            <div className='flex items-center gap-3 ' >
                <div>
                    <Badge color="green" text={<>online : {users.userOnline} người</>} />
                </div>
                {users?.entities?.fullName}
                <Dropdown menu={{ items }}>
                    <div onClick={(e) => e.preventDefault()}>
                        <Space>
                            <Avatar size={40} icon={<UserOutlined />} />
                        </Space>
                    </div>
                </Dropdown>
            </div>
            
        </div>
            <ModalInvalidToken />
    </Header>
}

export default HeaderComponent