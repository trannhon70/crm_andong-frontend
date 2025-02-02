import moment from "moment";
import { FC, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { RootState } from "../../../redux/store";
import ComponentExportData from "./componentExportData";
import ModalSearch from "./modalSearch";
import { useTranslation } from "react-i18next";

const ExportPatientData: FC = () => {
    const { data } = useSelector((state: RootState) => state.patient)
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(200)
    const [check, setCheck] = useState({
        name: true, gender: false, yearOld: false, phone: false, content: false, department: false, diseases: false, city: false,
        district: false, code: false, appointmentTime: false, reminderTime: false, note: false, status: false, doctor: false, user: false, treatment: false,
        created_at: false,
    })
    const { t } = useTranslation(['BCCTDVKH', 'DSDangKyHen'])

    const dataBreadcrumb = [
        {
            title: t("BCCTDVKH:quan_ly_cuoc_hen_benh_nhan"),
        },
        {
            type: 'separator',
        },
        {
            title: t("BCCTDVKH:xuat_du_lieu_benh_nhan"),
        },

    ];

    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className="flex  justify-between " >
            <ComponentExportData setCheck={setCheck} check={check} />
            <ModalSearch pageIndex={pageIndex} pageSize={pageSize} />
        </div>
        <div className="rounded border-lime-700 border mt-3 min-h-[50vh] max-h-[70vh] overflow-auto">
            <table style={{outline:"none"}} className="w-full" contentEditable="true">
                <tbody>
                    {data.length > 0 &&
                        data.map((item: any, index: number) => (
                            <tr key={index + 1} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                                {check.name && <td className="border p-1">{item?.name}</td>}
                                {check.gender && <td className="border p-1">{item?.gender}</td>}
                                {check.yearOld && <td className="border p-1">{item?.yearOld}</td>}
                                {check.phone && <td className="border p-1">{item?.phone}</td>}
                                {check.content && <td className="border p-1">{item?.content}</td>}
                                {check.department && <td className="border p-1">{item?.department?.name}</td>}
                                {check.diseases && <td className="border p-1">{item?.diseases?.name}</td>}
                                {check.city && <td className="border p-1">{item?.city?.name}</td>}
                                {check.district && <td className="border p-1">{item?.district?.name}</td>}
                                {check.code && <td className="border p-1">{item?.code}</td>}
                                {check.appointmentTime && (
                                    <td className="border p-1">
                                        {moment(item?.appointmentTime * 1000).format("DD-MM-YYYY HH:mm:ss")}
                                    </td>
                                )}
                                {check.reminderTime && (
                                    <td className="border p-1">
                                        {moment(item?.reminderTime * 1000).format("DD-MM-YYYY HH:mm:ss")}
                                    </td>
                                )}
                                {check.note && <td className="border p-1">{item?.note}</td>}
                                {check.status && <td className="border p-1">{item?.status}</td>}
                                {check.doctor && <td className="border p-1">{item?.doctor?.name}</td>}
                                {check.user && <td className="border p-1">{item?.user?.fullName}</td>}
                                {check.treatment && <td className="border p-1">{item?.treatment}</td>}
                                {check.created_at && (
                                    <td className="border p-1">
                                        {moment(item?.created_at * 1000).format("DD-MM-YYYY HH:mm:ss")}
                                    </td>
                                )}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    </Fragment>
}

export default ExportPatientData