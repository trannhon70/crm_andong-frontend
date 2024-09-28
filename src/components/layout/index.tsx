import {
    FileOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, MenuProps, theme } from 'antd';
import React, { useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import HeaderComponent from '../header';

const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}



const LayoutComponent: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const user = { role: 'admin' };

    const items: MenuItem[] = [
        getItem(<Link to={'/'}>Trang chủ</Link>, '1', <IoHomeOutline />),
        getItem(<div>Quản lý cuộc hẹn bệnh nhân</div>, 'sub1', <UserOutlined />, [
            getItem(<Link to={'/danh-sach-dang-ky-hen'}>Danh sách đăng ký hẹn</Link>, '3'),
            getItem(<Link to={'/tim-kiem-benh-nhan'}>Tìm kiếm bệnh nhân</Link>, '4'),
            getItem(<Link to={'/tim-kiem-benh-nhan'}>Lặp lại truy vấn bệnh nhân</Link>, '5'),
            getItem(<Link to={'/tim-kiem-benh-nhan'}>Đăng ký tự phục vụ</Link>, '5'),
        ]),
        getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        ...(user.role === 'user' ? [getItem('Files', '9', <FileOutlined />)] : []),
    ];

    return (
        <Layout style={{ height: '100vh' }} >
            <Sider width={300} trigger={null} collapsible collapsed={collapsed}  >
                <div className="p-2">
                    <img className='w-[100%] ' src={logo} alt="..." />
                </div>
                <Menu
                    className='mt-3'
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={items}
                />
            </Sider>
            <Layout>
                <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />

                <Content
                    style={{
                        margin: '10px 10px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default LayoutComponent