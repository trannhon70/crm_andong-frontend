import { useEffect, useState } from "react";
import { getAllHospital, getByIdHospital } from "../../features/hospitalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Badge, Card, Col, Row, Select } from "antd";
import CartRanking from "./cartRanking";
import CardChannel from "./cardChannel";
import ScienceStatistics from "./scienceStatistics";
import DiseaseStatistics from "./diseaseStatistics";
import Consultant from "./consultant";
import { getDanhSachXepHangThamKham, getThongKeDangKy } from "../../features/dashboardSlice";
const { Option } = Select;

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const  hospital  = useSelector((state: RootState) => state.hospital.hospital);
    const  users  = useSelector((state: RootState) => state.users);
    

    const hospitalId = localStorage.getItem('hospitalId');
    const [nameSelect, setNameSelect] = useState<string | undefined>('')
    const [dataHospital, setDataHospital] = useState<any>([])

    useEffect(() => {
        dispatch(getAllHospital());
        if(hospitalId){
            dispatch(getThongKeDangKy(Number(hospitalId)));
            dispatch(getDanhSachXepHangThamKham(Number(hospitalId)));
        }
        
    }, [dispatch, hospitalId]);

    const onChangeHospital = (value: string) => {
        dispatch(getByIdHospital(Number(value)));
        localStorage.setItem('hospitalId', value);
        const selectName = hospital.filter((item: any) => item.id === value)
        setNameSelect(selectName[0]?.name);
    };

    useEffect(() => {
        if (hospitalId && hospital.length > 0) {
            const selectName = hospital.filter((item: any) => item.id === Number(hospitalId))
            setNameSelect(selectName[0]?.name);
        }
    }, [hospitalId, hospital])

    useEffect(() => {
        if(users.entities.hospitalId){
            const check = JSON.parse(users.entities.hospitalId)
            const result = hospital.filter((item : any) => check.includes(item.id));
            setDataHospital(result)
        }
    }, [users.entities.hospitalId])

    return (
        <div>
            <div className="flex gap-2 items-center "  >
                <label htmlFor="">Chọn bệnh viện hoạt động : </label>
                {dataHospital.length > 0 && (
                    <Select
                        placeholder="Vui lòng chọn bệnh viện"
                        allowClear
                        onChange={onChangeHospital}
                        className="min-w-[200px]"
                        value={nameSelect || undefined}
                    >
                        {dataHospital.map((item: any) => (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <CartRanking />
            <CardChannel />
            <ScienceStatistics />
            <DiseaseStatistics />
            <Consultant />
          
        </div>
    );
};

export default Home;
