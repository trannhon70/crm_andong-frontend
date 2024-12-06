import { FC, Fragment, useEffect } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getByIdPatient } from "../../../features/patientSlice";
import { Button, Form, Tag } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";

const AppointmentRegistrationListHistory: FC = () => {
    const navige = useNavigate()
    let { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { patient } = useSelector((state: RootState) => state.patient);
    const {t } = useTranslation(['DSDangKyHen'])

    useEffect(() => {
        if (id) {
            dispatch(getByIdPatient(Number(id)))
        }
    }, [id, dispatch])

    const dataBreadcrumb = [
        {
            title:t("DSDangKyHen:quan_ly_cuoc_hen") ,
        },
        {
            type: 'separator',
        },
        {
            title: <Link to={'/danh-sach-dang-ky-hen'}>{t("DSDangKyHen:danh_sach_dang_ky_hen")}</Link>,
        },
        {
            type: 'separator',
        },
        {
            title: t("DSDangKyHen:thong_tin_benh_nhan"),
        },

    ];

    const onClickPrev = () => {
        navige('/danh-sach-dang-ky-hen');
    }
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        {
            patient ?

                <div className="flex w-[100%] border-2 border-indigo-600  border-solid  rounded mt-2" >
                    <div className="border-r-2 w-[25%] border-indigo-600 ">
                        <div className="bg-indigo-600 text-center text-lg text-white p-1 border-b-2 border-indigo-600 " >
                           {t("DSDangKyHen:thong_tin_co_ban")}
                        </div>
                        <div className="" >
                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " >{t("DSDangKyHen:ho_va_ten")} :</div> <span className="text-red-500" >{patient?.name}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " > {t("DSDangKyHen:gioi_tinh")}  :</div> <span className="text-red-500" >{patient?.gender}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " > {t("DSDangKyHen:tuoi")} : </div> <span className="text-red-500" >{patient?.yearOld}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " > {t("DSDangKyHen:so_dien_thoai")}  : </div> <span className="text-red-500" >{patient?.phone}</span>
                            </div>

                           

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " >  {t("DSDangKyHen:khoa")} khoa: </div> <span className="text-red-500" >{patient?.department?.name}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >
                                  {t("DSDangKyHen:benh")} : </div> <span className="text-red-500" >{patient?.diseases?.name}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200  flex gap-1 " >
                                <div className="w-[40%] text-right " > {t("DSDangKyHen:nguon_den")} : </div> <span className="text-red-500" >{patient?.media?.name}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >
                                  {t("DSDangKyHen:tinh/TP")} : </div> <span className="text-red-500" >{patient?.city?.name}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " > {t("DSDangKyHen:quan/huyen")} : </div> <span className="text-red-500" >{patient?.district?.name}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >
                                  {t("DSDangKyHen:ma_chuyen_gia")} : </div> <span className="text-red-500" >{patient?.code}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " >  {t("DSDangKyHen:muc_dieu_tri")} : </div> <div className="text-red-500 flex gap-1 " >{patient?.treatment && JSON.parse(patient?.treatment)?.map((item: any, index: number) => {
                                    return <Tag color="cyan" key={index} >
                                        {item}
                                    </Tag>
                                })}</div>
                            </div>
                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >
                                  {t("DSDangKyHen:thoi_gian_hen")} : </div> <span className="text-red-500" >{moment(patient?.appointmentTime * 1000).format('DD-MM-YYYY HH:mm:ss')}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " > {t("DSDangKyHen:thoi_gian_nhac_hen")}  : </div> <span className="text-red-500" >{moment(patient?.reminderTime * 1000).format('DD-MM-YYYY HH:mm:ss')}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >
                               {t("DSDangKyHen:ghi_chu")}: </div> <span className="text-red-500" >{patient?.note}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " >  {t("DSDangKyHen:sua_thoi_gian_dang_ky")} : </div> <span className="text-red-500" >{moment(patient?.editregistrationTime * 1000).format('DD-MM-YYYY HH:mm:ss')}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >
                               {t("DSDangKyHen:trang_thai")} : </div> <span className="text-red-500" >{patient?.status}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " >  {t("DSDangKyHen:bac_si_tiep_benh")}  : </div> <span className="text-red-500" >{patient?.doctor?.name}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >
                               {t("DSDangKyHen:nguoi_them")} : </div> <span className="text-red-500" >{patient?.user?.fullName}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " > {t("DSDangKyHen:phong")}  : </div> <span className="text-red-500" >{patient?.user?.role?.name}</span>
                            </div>

                        </div>
                    </div>
                    <div className="border-r-2 w-[25%] border-indigo-600  ">
                        <div className="bg-indigo-600 text-center text-lg text-white p-1 border-b-2 border-indigo-600 " >
                             {t("DSDangKyHen:lich_su_tro_chuyen")}
                        </div>
                        <div className="text-base text-black p-1" >
                            {patient?.content}
                        </div>
                    </div>
                    <div className="border-r-2 w-[25%] border-indigo-600  ">
                        <div className="bg-indigo-600 text-center text-lg text-white p-1 border-b-2 border-indigo-600 " >
                             {t("DSDangKyHen:ho_so_tham_lai")}
                        </div>
                        <div className="p-1" >
                        {
                            patient?.chatPatients?.map((item: any, index: number) => {
                                return <div key={index} className="flex gap-2 mt-1" >
                                <div>
                                    {moment(item.created_at* 1000).format('DD-MM-YYYY HH:mm:ss')}
                                </div>
                                <div>
                                <Tag color="gold" >{item.user.fullName}</Tag> 
                                </div>
                                <div>
                                    {item.name}
                                </div>
                            </div>
                            })
                        }
                        </div>
                    </div>
                    <div className=" w-[25%]  ">
                        <div className="bg-indigo-600 text-center text-lg text-white p-1 border-b-2 border-indigo-600 " >
                             {t("DSDangKyHen:binh_luan")}
                        </div>
                        <div className="text-base text-black p-1" >
                            {patient?.note}
                        </div>
                    </div>
                </div>
                : ''}

            <div className="mt-2" >
                <Button onClick={onClickPrev} variant="outlined" color="danger" >  {t("DSDangKyHen:quay_lai")} </Button>
            </div>
    </Fragment>
}

export default AppointmentRegistrationListHistory;