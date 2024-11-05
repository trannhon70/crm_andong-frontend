import { useEffect, useState } from "react";
import { getAllHospital, getByIdHospital } from "../../features/hospitalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Select } from "antd";
const { Option } = Select;

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { hospital } = useSelector((state: RootState) => state.hospital);
    
    const hospitalId =localStorage.getItem('hospitalId');
    const [nameSelect, setNameSelect] = useState<string | undefined>('')
    
    useEffect(() => {
        dispatch(getAllHospital());
    }, [dispatch]);

    const onChangeHospital = (value: string) => {
        dispatch(getByIdHospital(Number(value)));
        localStorage.setItem('hospitalId', value);
        const selectName= hospital.filter((item : any)=> item.id === value)
        setNameSelect(selectName[0]?.name);  
    };

    useEffect(() => {
        if(hospitalId && hospital.length > 0){
            const selectName= hospital.filter((item : any)=> item.id === Number(hospitalId))
            setNameSelect(selectName[0]?.name);  
        }
    }, [hospitalId, hospital])

    return (
        <div>
            {hospital.length > 0 && (
                <Select
                    placeholder="Vui lòng chọn bệnh viện"
                    allowClear
                    onChange={onChangeHospital}
                    className="min-w-[200px]"
                    value={nameSelect || undefined}  
                >
                    {hospital.map((item: any) => (
                        <Option key={item.id} value={item.id}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            )}
        </div>
    );
};

export default Home;
