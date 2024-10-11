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
import { useTranslation } from 'react-i18next';
import { HiUserGroup } from "react-icons/hi";
import { SiMicrosoftaccess } from "react-icons/si";
import { TbWebhook } from "react-icons/tb";
import { TbReport } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { GrSystem } from "react-icons/gr";
import { FaHistory } from "react-icons/fa";
import { VscServerEnvironment } from "react-icons/vsc";

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

    const {t } = useTranslation(['home'])

    const user = { role: 'admin' };

    const items: MenuItem[] = [
        getItem(<Link to={'/'}>{t("home:menu_left.home")}</Link>, '1', <IoHomeOutline size={20} />),
        getItem(<div>{t("home:menu_left.Patient_Appointment_Management")}</div>, 'sub1', <UserOutlined size={20}/>, [
            getItem(<Link to={'/danh-sach-dang-ky-hen'}>{t("home:menu_left.Appointment_registration_list")}</Link>, '3'),
            getItem(<Link to={'/tim-kiem-benh-nhan'}>Tìm kiếm bệnh nhân</Link>, '4'),
            getItem(<Link to={'/tim-kiem-benh-nhan'}>Lặp lại truy vấn bệnh nhân</Link>, '5'),
            getItem(<Link to={'/tim-kiem-benh-nhan'}>Đăng ký tự phục vụ</Link>, '6'),
        ]),
        getItem('Thống kê khách truy cập', 'sub2', <SiMicrosoftaccess  size={20}/>, [
            getItem('Chi tiết dữ liệu (mạng)', '7'), 
            getItem('Cài đặt dự án bệnh viện (mạng)', '9'),
            getItem('Chi tiết dữ liệu (số điện thoại)', '10'),
            getItem('Cài đặt dự án bệnh viện (điện thoại)', '11'),
        ]),
        getItem('Quản lý đăng ký trang web', 'sub3', <TbWebhook size={20}/>, [
            getItem('Danh sách đăng ký trang web', '12'), 
            getItem('Cài đặt đăng ký trang web', '13'),
        
        ]),
        getItem('Báo cáo dữ liệu', 'sub4', <TbReport size={20}/>, [
            getItem('Báo cáo tổng hợp', '14'), 
            getItem('giới tính', '15'),
            getItem('tuổi', '16'),
            getItem('Loại bệnh nhân', '17'),
            getItem('Nguồn điều trị y tế', '18'),
            getItem('tình trạng nhập viện', '19'),
            getItem('Bác sĩ lễ tân', '20'),
            getItem('dịch vụ khách hàng', '21'),
        
        ]),
        getItem('Cài đặt', 'sub5', <IoSettings size={20}/>, [
            getItem(<Link to={'/thiet-lap-bac-si'}>Cài đặt bác sĩ</Link>, '22'), 
            getItem(<Link to={'/thiet-lap-benh-tat'} >thiết lập bệnh tật</Link>, '23'),
            getItem('Cài đặt loại điều trị y tế', '24'),
            getItem(<Link to={'/quan-ly-khoa'}>Cài đặt khoa bệnh viện</Link>, '25'),
            getItem('Cài đặt công cụ tìm kiếm', '26'),
            getItem('Thông báo SMS cho bệnh nhân', '27'),
        
        ]),
        
        getItem('Quản lý hệ thống', 'sub6', <GrSystem size={20}/>, [
            getItem(<Link to={'/quan-ly-con-nguoi'}>quản lý con người</Link>, '28'), 
            getItem(<Link to={'/quan-ly-quyen'}>Quản lý quyền</Link>, '29'),
            getItem(<Link to={'/danh-sach-benh-vien'}>Danh sách bệnh viện</Link>, '30'),
            getItem('Quản lý thông báo', '31'),
          
        
        ]),
        getItem('Lịch sử thao tác', 'sub7', <FaHistory size={20}/>, [
            getItem('Nhật ký hoạt động', '32'), 
            getItem('Nhật ký lỗi đăng nhập', '33'),
        ]),
        getItem('Đăng ký tự phục vụ', 'sub8', <VscServerEnvironment size={20}/>, [
            getItem('Danh sách đăng ký', '34'), 
        ]),
        ...(user.role === 'user' ? [getItem('Files', '9', <FileOutlined size={20}/>)] : []),
    ];

    return (
        <Layout style={{ height: '100vh' }} >
            <Sider  style={{overflow:'auto'}} width={300} trigger={null} collapsible collapsed={collapsed}  >
                <div className="p-2">
                    <img className='w-[100%] ' src={logo} alt="..." />
                </div>
                <Menu
                   
                    className='mt-3'
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    // selectedKeys={}
                    items={items}
                />
            </Sider>
            <Layout>
                <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />

                <Content
                    style={{
                        margin: '10px 10px',
                        padding: 10,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow:'auto'
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default LayoutComponent