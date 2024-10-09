import { FC, Fragment } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";


const CreateAppointmentRegistrationList:FC = () => {

    const dataBreadcrumb = [
        {
           
            title: 'Quản lý cuộc hẹn bệnh nhân',
        },
        {
            type: 'separator',
        },
        {
            href: '/danh-sach-dang-ky-hen',
            title: 'Danh sách đăng ký hẹn',
        },
        {
            type: 'separator',
        },
        {
            title: 'Thêm mới',
        },
    ];
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        dasdsa
    </Fragment>
}

export default CreateAppointmentRegistrationList