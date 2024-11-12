import {
    UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, MenuProps, theme } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaHistory } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";
import { IoHomeOutline, IoSettings } from "react-icons/io5";
import { SiMicrosoftaccess } from "react-icons/si";
import { TbReport, TbWebhook } from "react-icons/tb";
import { VscServerEnvironment } from "react-icons/vsc";
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import HeaderComponent from '../header';
import { useLocation } from 'react-router-dom';
import useMenuData from '../../hooks/useMenuData';

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

const sub7 = [
    '/nhat-ky-hoat-dong', '/nhat-ky-loi-dang-nhap'
]

const sub6 = [
    '/quan-ly-con-nguoi', '/quan-ly-quyen', '/danh-sach-benh-vien'
]

const sub5 = [
    '/thiet-lap-bac-si', '/thiet-lap-benh-tat', '/quan-ly-khoa', '/cong-cu-tim-kiem'
]

const sub1 = [
    '/danh-sach-dang-ky-hen', '/bao-cao-chi-tiet-dich-vu-khach-hang', '/bao-cao-xu-huong-hang-thang', '/xuat-du-lieu-benh-nhan'
]

const LayoutComponent: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const menu = useMenuData(); 
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const {t } = useTranslation(['home'])

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                console.log('aaa');
                
                // window.location.reload(); 
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);


    useLayoutEffect(() => {
        if (sub7.includes(location.pathname)) {
            setOpenKeys(['sub7']); 
        } 
        if (sub6.includes(location.pathname)) {
            setOpenKeys(['sub6']); 
        } 
        if (sub5.includes(location.pathname)) {
            setOpenKeys(['sub5']); 
        } 

        if (sub1.includes(location.pathname)) {
            setOpenKeys(['sub1']); 
        } 
       
    }, [location.pathname, sub7])
    
    const items: MenuItem[] = [
        getItem(<Link to={'/'}>{t("home:menu_left.home")}</Link>, '/', <IoHomeOutline size={20} />),
        
        ...(menu?.[1]?.QLBN === true ? [ getItem(<div>{t("home:menu_left.Patient_Appointment_Management")}</div>, 'sub1', <UserOutlined size={20}/>, [
            menu?.[1]?.ds?.DSDKH === true ? getItem(<Link to={'/danh-sach-dang-ky-hen'}>{t("home:menu_left.Appointment_registration_list")}</Link>, '/danh-sach-dang-ky-hen'): null,
            menu?.[1]?.ds?.CHTKBN === true ? getItem(<Link to={'/tim-kiem-benh-nhan'}>Tìm kiếm bệnh nhân</Link>, '4') : null,
            menu?.[1]?.ds?.LLTVBN === true ? getItem(<Link to={'/tim-kiem-benh-nhan'}>Lặp lại truy vấn bệnh nhân</Link>, '5') : null,
            menu?.[1]?.ds?.BCCTDVKH === true ?getItem(<Link to={'/bao-cao-chi-tiet-dich-vu-khach-hang'}>Báo cáo chi tiết dịch vụ khách hàng</Link>, '/bao-cao-chi-tiet-dich-vu-khach-hang'): null,
            menu?.[1]?.ds?.BCXHHT === true ?getItem(<Link to={'/bao-cao-xu-huong-hang-thang'}>Báo cáo xu hướng hàng tháng</Link>, '/bao-cao-xu-huong-hang-thang'): null,
            menu?.[1]?.ds?.BCDHTC === true ?getItem(<Link to={'/'}>Báo cáo đồ họa tùy chỉnh</Link>, '8'): null,
            menu?.[1]?.ds?.XDLBN === true ?getItem(<Link to={'/xuat-du-lieu-benh-nhan'}>Xuất dữ liệu bệnh nhân</Link>, '/xuat-du-lieu-benh-nhan'): null,
            menu?.[1]?.ds?.SSDLTCN === true ?getItem(<Link to={'/'}>So sánh dữ liệu theo chiều ngang</Link>, '10'): null,
        ]),] : []),
        ...(menu?.[2]?.TKKTC === true ? [getItem('Thống kê khách truy cập', 'sub2', <SiMicrosoftaccess  size={20}/>, [
            menu?.[2]?.ds.CTDLM === true ? getItem('Chi tiết dữ liệu (mạng)', '11') : null, 
            menu?.[2]?.ds.CDDABVM === true ? getItem('Cài đặt dự án bệnh viện (mạng)', '12') : null,
            menu?.[2]?.ds.CTDLDT === true ? getItem('Chi tiết dữ liệu (số điện thoại)', '13') : null,
            menu?.[2]?.ds.CDDABVDT === true ? getItem('Cài đặt dự án bệnh viện (điện thoại)', '14') : null,
        ]),] : []),
        // getItem('Quản lý đăng ký trang web', 'sub3', <TbWebhook size={20}/>, [
        //     getItem('Danh sách đăng ký trang web', '12'), 
        //     getItem('Cài đặt đăng ký trang web', '13'),
        
        // ]),
        ...(menu?.[3]?.BCDL === true ? [getItem('Báo cáo dữ liệu', 'sub4', <TbReport size={20}/>, [
            menu?.[3]?.ds.BCTH === true ?getItem('Báo cáo tổng hợp', '15') : null, 
            menu?.[3]?.ds.GT === true ? getItem('Giới tính', '16') : null,
            menu?.[3]?.ds.TUOI === true ? getItem('Tuổi', '17') : null,
            menu?.[3]?.ds.LBN === true ? getItem('Loại bệnh nhân', '18') : null,
            menu?.[3]?.ds.NTT === true ? getItem('Nguồn truyền thông', '19') : null,
            menu?.[3]?.ds.TTNV === true ? getItem('tình trạng nhập viện', '20') : null,
            menu?.[3]?.ds.BSLT === true ? getItem('Bác sĩ lễ tân', '21') : null,
            menu?.[3]?.ds.DVKH === true ? getItem('dịch vụ khách hàng', '22') : null,
        
        ]),] : []), 
        ...(menu?.[4]?.CD === true ? [getItem('Cài đặt', 'sub5', <IoSettings size={20}/>, [
            menu?.[4]?.ds.CDBS === true ? getItem(<Link to={'/thiet-lap-bac-si'}>Cài đặt bác sĩ</Link>, '/thiet-lap-bac-si') : null, 
            menu?.[4]?.ds.TLBT === true ? getItem(<Link to={'/thiet-lap-benh-tat'} >thiết lập bệnh tật</Link>, '/thiet-lap-benh-tat') : null,
            menu?.[4]?.ds.CDLDTYT === true ? getItem('Cài đặt loại điều trị y tế', '25') : null,
            menu?.[4]?.ds.CDKBV === true ? getItem(<Link to={'/quan-ly-khoa'}>Cài đặt khoa bệnh viện</Link>, '/quan-ly-khoa') : null,
            menu?.[4]?.ds.CDCCTK === true ? getItem( <Link to={'/cong-cu-tim-kiem'} >Cài đặt công cụ tìm kiếm</Link> , '/cong-cu-tim-kiem') : null,
        
        ]),] : []),
        
        ...(menu?.[6]?.QLHT === true ? [getItem('Quản lý hệ thống', 'sub6', <GrSystem size={20}/>, [
            menu?.[6]?.ds.QLCN === true ? getItem(<Link to={'/quan-ly-con-nguoi'}>quản lý con người</Link>, '/quan-ly-con-nguoi') : null, 
            menu?.[6]?.ds.QLQ === true ? getItem(<Link to={'/quan-ly-quyen'}>Quản lý quyền</Link>, '/quan-ly-quyen') : null,
            menu?.[6]?.ds.DSBV === true ? getItem(<Link to={'/danh-sach-benh-vien'}>Danh sách bệnh viện</Link>, '/danh-sach-benh-vien') : null,
            menu?.[6]?.ds.QLTB === true ? getItem('Quản lý thông báo', '31') : null,
        ]),] : []),
        ...(menu?.[7]?.LSTT === true ? [getItem('Lịch sử thao tác', 'sub7', <FaHistory size={20}/>, [
            menu?.[7]?.ds.NKHD === true ?  getItem(<Link to={'/nhat-ky-hoat-dong'}>Nhật ký hoạt động</Link>, '/nhat-ky-hoat-dong') : null, 
            menu?.[7]?.ds.NKLDN === true ?  getItem(<Link to={'/nhat-ky-loi-dang-nhap'}>Nhật ký lỗi đăng nhập</Link>, '/nhat-ky-loi-dang-nhap') : null,
        ]),] : []),
        // getItem('Đăng ký tự phục vụ', 'sub8', <VscServerEnvironment size={20}/>, [
        //     getItem('Danh sách đăng ký', '34'), 
        // ]),
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
                    selectedKeys={[location.pathname]}
                    openKeys={openKeys} // Use openKeys instead of defaultOpenKeys
                    onOpenChange={setOpenKeys} // Update openKeys on change
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