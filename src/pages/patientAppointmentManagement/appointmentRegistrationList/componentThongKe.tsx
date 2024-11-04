import { Tag } from "antd";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getThongKeAll, getThongKeNgayHienTai } from "../../../features/patientSlice";


const ComponentThongKe: FC = () => {
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();
    const { thongKeTheoNgayHienTai, thongkeAll } = useSelector((state: RootState) => state.patient);

    useEffect(() => {
        if(hospitalId){
            dispatch(getThongKeNgayHienTai(Number(hospitalId)))
            dispatch(getThongKeAll(Number(hospitalId)))
        }
        
    }, [dispatch, hospitalId])

    return <div className="flex items-center justify-between w-[100%] bg-slate-200 p-1 " >
        <div className="flex gap-2 " >
            <Tag color="#2db7f5">Thống kê </Tag>
            <div>Tổng cộng: <strong>{thongkeAll?.total}</strong> </div>
            <div>Đã đến: <strong>{thongkeAll?.daden}</strong> </div>
            <div>Chưa đến: <strong>{thongkeAll?.chuaden}</strong> </div>
        </div>

        <div className="flex gap-2 ">
            <Tag color="#f50">Dữ liệu hôm nay </Tag>
            <div>Tổng cộng: <strong>{thongKeTheoNgayHienTai?.total}</strong> </div>
            <div>Đã đến: <strong>{thongKeTheoNgayHienTai?.daden}</strong> </div>
            <div>Chưa đến: <strong>{thongKeTheoNgayHienTai?.chuaden}</strong> </div>
        </div>
    </div>
}

export default ComponentThongKe;