import { FC, Fragment, useEffect, useState } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Button, GetProps, Input, Select, TableProps, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import useMenuData from "../../../hooks/useMenuData";
import moment from "moment";
import PopconfirmComponent from "../../../components/popconfirmComponent";
import { HiPencilSquare } from "react-icons/hi2";
import TableComponent from "../../../components/tableComponent";
import NotHospital from "../../../components/notHospital";
import Loading from "../../../components/loading";
import { getPagingMedia } from "../../../features/mediaSlice";
import { toast } from "react-toastify";
import { mediaAPI } from "../../../apis/media.api";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const SearchEngine: FC = () => {
    const navige = useNavigate()
    const { data, total, loading } = useSelector((state: RootState) => state.media);
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(50)
    const [search,setSearch] = useState<string>('')
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();
    const menu = useMenuData();

    console.log(menu, 'menu');
    


    useEffect(() => {
        if(hospitalId){
             dispatch(getPagingMedia({ pageSize, pageIndex, search, hospitalId : Number(hospitalId) }))
        }
        
    }, [dispatch,hospitalId, pageIndex, pageSize])

    const dataBreadcrumb = [
        {
            href: '/cong-cu-tim-kiem',
            title: 'Cài đặt',
        },
        {
            type: 'separator',
        },
        {
            title: 'Công cụ tìm kiếm',
        },
    ];

    const onClickCreate = () => {
        // dispatch(setDisease({}))
        navige('/cong-cu-tim-kiem/them-moi');
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setSearch(value);
        dispatch(getPagingMedia({ pageSize, pageIndex, search: value, hospitalId : Number(hospitalId) }))
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
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
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
                        menu?.[4].ds?.action_CDCCTK.delete === true ?
                        <PopconfirmComponent
                        title={<>Xóa {record.name}</>}
                        description='Bạn có chắc chắn muốn xóa bệnh này không?'
                        value={value}
                      deleteRole={deleteDesease}
                    /> : null
                    }
                   
                    
                    {
                         menu?.[4].ds?.action_CDCCTK.update === true ?
                         <HiPencilSquare
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


    const deleteDesease = async(value: number) =>{ 
       try {
            const result = await mediaAPI.deleteMedia(value)
            if(result.data.statusCode === 1){
                toast.success('Xóa thành công!')
                dispatch(getPagingMedia({ pageSize, pageIndex, search, hospitalId : Number(hospitalId) }))
           }
       } catch (error) {
            console.log(error);
       }
        
    }

    const onClickEdit = (id: number) => {
        navige(`/cong-cu-tim-kiem/cap-nhat/${id}`);
    }
    return <Fragment>
 {
            hospitalId ? 
        <Fragment>
         <BreadcrumbComponent items={dataBreadcrumb} />
         <div className='mt-2 pb-2 flex justify-between ' >
            <div className="flex gap-3" >
                <Search className='w-[250px]' placeholder="Nhập tên "  onSearch={onSearch} enterButton />
            </div>
            {
                menu?.[4].ds?.action_CDCCTK.create === true ?<Button onClick={onClickCreate} type="primary">Thêm mới</Button> : null
            }
            
        </div>
        {
            loading === 'succeeded' ? <TableComponent rowKey={true} columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} /> : <Loading />
        }
         </Fragment> : <NotHospital /> }
    </Fragment>
}

export default SearchEngine