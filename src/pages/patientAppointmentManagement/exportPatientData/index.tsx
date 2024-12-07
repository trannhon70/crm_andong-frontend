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
    const {t } = useTranslation(['BCCTDVKH','DSDangKyHen'])

    const dataBreadcrumb = [
        {
            title: t("BCCTDVKH:quan_ly_cuoc_hen_benh_nhan") ,
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
        <div className=" rounded border-lime-700  border mt-3 min-h-[50vh] max-h-[70vh] overflow-auto " >
            {
                data.length > 0 && data.map((item: any, index: number) => {
                    return <div key={index + 1} style={index % 2 === 0 ? { background: "white" } : { background: 'rgb(239 239 239)' }} className="flex items-center gap-4 text-sm p-1 flex-wrap " >
                        {check.name === true ? <div>
                            {item?.name}
                        </div> : ''}
                        {check.gender === true ? <div>
                            {item?.gender}
                        </div> : null}
                        {check.yearOld === true ? <div>
                            {item?.yearOld}
                        </div> : null}
                        {check.phone === true ? <div>
                            {item?.phone}
                        </div> : null}
                        {check.content === true ? <div>
                            {item?.content}
                        </div> : null}
                        {check.department === true ? <div>
                            {item?.department?.name}
                        </div> : null}
                        {check.diseases === true ? <div>
                            {item?.diseases?.name}
                        </div> : null}
                        {check.city === true ? <div>
                            {item?.city?.name}
                        </div> : null}
                        {check.district === true ? <div>
                            {item?.district?.name}
                        </div> : null}
                        {check.code === true ? <div>
                            {item?.code}
                        </div> : null}
                        {check.appointmentTime === true ? <div>
                            {moment(item?.appointmentTime * 1000).format('DD-MM-YYYY HH:mm:ss')}
                        </div> : null}
                        {check.reminderTime === true ? <div>
                            {moment(item?.reminderTime * 1000).format('DD-MM-YYYY HH:mm:ss')}
                        </div> : null}
                        {check.note === true ? <div>
                            {item?.note}
                        </div> : null}
                        {check.status === true ? <div>
                            {item?.status}
                        </div> : null}
                        {check.doctor === true ? <div>
                            {item?.doctor?.name}
                        </div> : null}
                        {check.user === true ? <div>
                            {item?.user?.fullName}
                        </div> : null}
                        {check.treatment === true ? <div>
                            {item?.treatment}
                        </div> : null}
                        {check.created_at === true ? <div>
                            {moment(item?.created_at * 1000).format('DD-MM-YYYY HH:mm:ss')}
                        </div> : null}
                    </div>
                })
            }

        </div>
    </Fragment>
}

export default ExportPatientData