import { Tag } from "antd";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getThongKeAll, getThongKeNgayHienTai } from "../../../features/patientSlice";
import { useTranslation } from "react-i18next";


const ComponentThongKe: FC = () => {
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();
    const { thongKeTheoNgayHienTai, daden ,total, chuaden } = useSelector((state: RootState) => state.patient);
    const { t } = useTranslation(['DSDangKyHen']);

    useEffect(() => {
        if(hospitalId){
            dispatch(getThongKeNgayHienTai(Number(hospitalId)))
            dispatch(getThongKeAll(Number(hospitalId)))
        }
        
    }, [dispatch, hospitalId])

    return <div className="flex items-center justify-between w-[70%] bg-slate-200 p-1 " >
        <div className="flex gap-2 " >
            <Tag color="#2db7f5">{t("DSDangKyHen:thong_ke")} </Tag>
            <div>{t("DSDangKyHen:tong_cong")}: <strong>{total}</strong> </div>
            <div>{t("DSDangKyHen:da_den")}: <strong>{daden}</strong> </div>
            <div>{t("DSDangKyHen:chua_den")}: <strong>{chuaden}</strong> </div>
        </div>

        <div className="flex gap-2 ">
            <Tag color="#f50">{t("DSDangKyHen:du_lieu_hom_nay")} </Tag>
            <div>{t("DSDangKyHen:tong_cong")}: <strong>{thongKeTheoNgayHienTai?.total}</strong> </div>
            <div>{t("DSDangKyHen:da_den")}: <strong>{thongKeTheoNgayHienTai?.daden}</strong> </div>
            <div>{t("DSDangKyHen:chua_den")}: <strong>{thongKeTheoNgayHienTai?.chuaden}</strong> </div>
        </div>
    </div>
}

export default ComponentThongKe;