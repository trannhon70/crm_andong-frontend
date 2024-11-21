import { FC, Fragment } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";


const SummaryReport: FC = () => {

    const dataBreadcrumb = [
        {
            title: 'Báo cáo dữ liệu',
        },
        {
            type: 'separator',
        },
        {
           
            title: 'Báo cáo tổng hợp ',
        },
       
    ];
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
    </Fragment>
}


export default SummaryReport