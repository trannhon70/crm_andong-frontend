import { FC, Fragment } from "react";
import BreadcrumbComponent from "../../components/breadcrumbComponent";

const dataBreadcrumb = [
    {
        href: '',
        title: 'Quản lý hệ thống',
    },
    {
        type: 'separator',
    },
    {
        title: 'Quản lý quyền',
    },
];

const RightsManagement: FC = () => {
    return (
        <Fragment>
            <BreadcrumbComponent items={dataBreadcrumb} />
        </Fragment>
    );
}

export default RightsManagement;
