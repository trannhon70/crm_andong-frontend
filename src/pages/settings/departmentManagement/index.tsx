import { FC, Fragment, useEffect, useState } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Button, GetProps, Input, Select, TableProps, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import moment from "moment";
import TableComponent from "../../../components/tableComponent";
import Loading from "../../../components/loading";
import PopconfirmComponent from "../../../components/popconfirmComponent";
import { HiPencilSquare } from "react-icons/hi2";
import { getPagingDepartment, setDepartment } from "../../../features/departmentSlice";
import NotHospital from "../../../components/notHospital";
import { toast } from "react-toastify";
import { departmentAPI } from "../../../apis/department.api";
import useMenuData from "../../../hooks/useMenuData";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const DepartmentManagement: FC = () => {

    const navige = useNavigate()
    const { data, total, loading } = useSelector((state: RootState) => state.department);
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(50)
    const [search, setSearch] = useState<string>('')
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();
    const menu = useMenuData();
    

    useEffect(() => {
        if (hospitalId) {
            dispatch(getPagingDepartment({ pageSize, pageIndex, search, hospitalId: Number(hospitalId) }))
        }

    }, [dispatch, hospitalId, pageIndex, pageSize])


    const dataBreadcrumb = [
        {
            href: '/quan-ly-khoa',
            title: 'Cài đặt',
        },
        {
            type: 'separator',
        },
        {
            title: 'Quản lý khoa',
        },
    ];
    const onClickCreate = () => {
        dispatch(setDepartment({}))
        navige('/quan-ly-khoa/them-moi');
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setSearch(value);
        dispatch(getPagingDepartment({ pageSize, pageIndex, search: value, hospitalId: Number(hospitalId) }))
    };

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
            title: 'Tên Bệnh',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Bệnh viện',
            key: 'hospital',
            dataIndex: 'hospital',
            render(value, record, index) {

                return <div style={{ textTransform: 'capitalize' }} className="" >{value.name}</div>;
            },
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
                         menu?.[4].ds?.action_CDKBV.delete === true ?  <PopconfirmComponent
                         title={<>Xóa khoa {record.name}</>}
                         description='Bạn có chắc chắn muốn xóa khoa này không?'
                         value={value}
                         deleteRole={deleteDepartment}
                     /> : null
                    }
                   

                    {
                        menu?.[4].ds?.action_CDKBV.update === true ?  <HiPencilSquare
                        onClick={() => onClickEdit(value)}
                        className='cursor-pointer text-green-700 ' color='primary' size={25} /> : null
                    }
                    
                </div>
            },
        },
    ];

    const deleteDepartment = async (id: number) => {
        try {
            const result = await departmentAPI.deleteDepartment(id)
            if (result.data.statusCode === 1) {
                toast.success('Xóa thành công!')
                dispatch(getPagingDepartment({ pageSize, pageIndex, search, hospitalId: Number(hospitalId) }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onClickEdit = (id: number) => {
        navige(`/quan-ly-khoa/cap-nhat/${id}`);
    }
    const onChangePage = (page: number, pageSize: number) => {
        setPageIndex(page)
        setPageSize(pageSize)
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
                             menu?.[4].ds?.action_CDKBV.create === true ? <Button onClick={onClickCreate} type="primary">Thêm mới</Button> : null
                        }
                        
                    </div>
                    {
                        loading === 'succeeded' ? <TableComponent rowKey={true} columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} /> : <Loading />
                    }
                </Fragment> : <NotHospital />}
    </Fragment>
}

export default DepartmentManagement