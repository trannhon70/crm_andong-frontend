import { FC, Fragment } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Link } from "react-router-dom";


const OperationHistory:FC = () => {

    const dataBreadcrumb = [
        {
            title: 'Quản lý cuộc hẹn',
        },
        {
            type: 'separator',
        },
        {
            title: <Link to={'/danh-sach-dang-ky-hen'} >Danh sách đăng ký hẹn</Link>,
        },
        {
            type: 'separator',
        },
        {
            title: 'lịch sử thao tác',
        },
       
    ];
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
    </Fragment>
}

export default OperationHistory