import { FC, Fragment, useEffect } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Link, useParams } from "react-router-dom";
import { getAllHistoryPatiant } from "../../../features/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";


const OperationHistory:FC = () => {
    let { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { history } = useSelector((state: RootState) => state.patient);
    useEffect(() =>{ 
        if(id){
            dispatch(getAllHistoryPatiant(Number(id)))
        }
    }, [id, dispatch])

    

    const dataBreadcrumb = [
        {
            title: 'Quản lý cuộc hẹn',
        },
        {
            type: 'separator',
        },
        {
            title: <Link to={'/danh-sach-dang-ky-hen'} >Danh sách đăng ký hẹn</Link>,
        },
        {
            type: 'separator',
        },
        {
            title: 'lịch sử thao tác',
        },
       
    ];
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        
    </Fragment>
}

export default OperationHistory