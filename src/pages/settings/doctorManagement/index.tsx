import { FC, Fragment, useEffect, useState } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Button, GetProps, Input, Select, TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import TableComponent from "../../../components/tableComponent";
import PopconfirmComponent from "../../../components/popconfirmComponent";
import { HiPencilSquare } from "react-icons/hi2";
import Loading from "../../../components/loading";
import { getPagingDoctor } from "../../../features/doctorSlice";
import moment from "moment";
import { toast } from "react-toastify";
import { doctorAPI } from "../../../apis/doctor.api";
import NotHospital from "../../../components/notHospital";
import useMenuData from "../../../hooks/useMenuData";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const DoctorManagement: FC = () => {
    const navige = useNavigate()
    const { data, total, loading } = useSelector((state: RootState) => state.doctor);
    const dispatch = useDispatch<AppDispatch>();
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(50)
    const [search, setSearch] = useState<string>('')
    const hospitalId = localStorage.getItem('hospitalId')
    const menu = useMenuData()
    
    useEffect(() => {
        if (hospitalId) {
            dispatch(getPagingDoctor({ pageSize, pageIndex, search, hospitalId: Number(hospitalId) }))
        }

    }, [dispatch, hospitalId, pageIndex, pageSize])

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setSearch(value);
        dispatch(getPagingDoctor({ pageSize, pageIndex, search: value, hospitalId: Number(hospitalId) }))
    };


    const dataBreadcrumb = [
        {
            title: 'Cài đặt',
        },
        {
            type: 'separator',
        },
        {
            title: 'Thiết lập bác sĩ',
        },
    ];

    const onClickCreate = () => {
        // dispatch(setDisease({}))
        navige('/thiet-lap-bac-si/them-moi');
    }

    const columns: TableProps<any>['columns'] = [
        {
            title: 'STT',
            dataIndex: 'age',
            key: 'age',
            render(value, record, index) {
                return <Fragment>{index + 1}</Fragment>
            },
        },
        {
            title: 'Tên bác sĩ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phòng',
            dataIndex: 'doctor_office',
            key: 'doctor_office',
        },

        {
            title: 'Người tạo',
            key: 'user',
            dataIndex: 'user',
            render(value, record, index) {

                return <div style={{ textTransform: 'capitalize' }} className="" >{value.fullName}</div>;
            },
        },
        {
            title: 'bệnh viện',
            key: 'hospital',
            dataIndex: 'hospital',
            render(value, record, index) {

                return <div style={{ textTransform: 'capitalize' }} className="" >{value.name}</div>;
            },
        },
        {
            title: 'Thời gian tạo',
            key: 'created_at',
            dataIndex: 'created_at',
            render(value, record, index) {
                return <Fragment>{moment.unix(value).format('YYYY-MM-DD HH:mm:ss')}</Fragment>
            },
        },
        {
            title: 'Thao tác',
            key: 'id',
            dataIndex: 'id',
            render(value, record, index) {

                return <div className='flex gap-4 ' >
                    {
                         menu?.[4].ds?.action_CDBS.delete === true ?
                         <PopconfirmComponent
                        title={<>Xóa bác sĩ {record.name}</>}
                        description='Bạn có chắc chắn muốn xóa bác sĩ này không?'
                        value={value}
                        deleteRole={deleteDoctor}
                    /> : null
                    }
                    

                    {
                        menu?.[4].ds?.action_CDBS.update === true ? <HiPencilSquare
                        onClick={() => onClickEdit(value)}
                        className='cursor-pointer text-green-700 ' color='primary' size={25} /> : null
                    }
                   
                </div>
            },
        },
    ];

    const onChangePage = (page: number, pageSize: number) => {
        setPageIndex(page)
        setPageSize(pageSize)
    }

    const deleteDoctor = async (id: number) => {
        try {
            const result = await doctorAPI.deletedoctor(id)
            if (result.data.statusCode === 1) {
                toast.success('Xóa thành công!')
                dispatch(getPagingDoctor({ pageSize, pageIndex, search, hospitalId: Number(hospitalId) }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onClickEdit = (id: number) => {
        navige(`/thiet-lap-bac-si/cap-nhat/${id}`);
    }

    if (hospitalId === 'undefined') {
        return <NotHospital />
    }
    return <Fragment>
        {
            hospitalId ?
                <Fragment>
                    <BreadcrumbComponent items={dataBreadcrumb} />
                    <div className='mt-2 pb-2 flex justify-between ' >
                        <div className="flex gap-3" >
                            <Search className='w-[250px]' placeholder="Nhập tên " onSearch={onSearch} enterButton />
                        </div>
                        {
                            menu?.[4].ds?.action_CDBS.create === true ? <Button onClick={onClickCreate} type="primary">Thêm mới</Button> : null
                        }
                        
                    </div>
                    {
                        loading === 'succeeded' ? <TableComponent rowKey={true} columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} /> : <Loading />
                    }
                </Fragment> : <NotHospital />}
    </Fragment>
}

export default DoctorManagement