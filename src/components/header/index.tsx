import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { Dispatch, FC, SetStateAction, useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { PiUserSwitchDuotone } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';



interface IHeaderProps {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
}

const HeaderComponent: FC<IHeaderProps> = ({ collapsed, setCollapsed }) => {
    const { logout } = useContext(AuthContext);
    
    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
                <Link className='text-base' to=''>Thông tin cá nhân</Link>
          ),
          icon: <PiUserSwitchDuotone size={30} />,
        },
        
        {
          key: '2',
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
        <div className='flex items-end gap-3 pr-4 ' >
        <Dropdown menu={{ items }}>
            <div onClick={(e) => e.preventDefault()}>
                <Space>
                    <Avatar size={40} icon={<UserOutlined />} />
                </Space>
            </div>
        </Dropdown>
        </div>

    </Header>
}

export default HeaderComponent