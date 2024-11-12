import { FC, Fragment } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Button } from "antd";

const ExportPatientData: FC = () => {
    const dataBreadcrumb = [
        {
            title: 'Quản lý cuộc hẹn bệnh nhân',
        },
       
        {
            type: 'separator',
        },
        {
            title: 'Xuất dữ liệu bệnh nhân',
        },
       
    ];
    return <Fragment>
       <BreadcrumbComponent items={dataBreadcrumb} />
       <div className="flex items-center justify-between " >
            <div>
                sadsa
            </div>
            <Button variant="solid" color="primary" type="primary" >Tìm kiếm</Button>
       </div>
    </Fragment>
}

export default ExportPatientData