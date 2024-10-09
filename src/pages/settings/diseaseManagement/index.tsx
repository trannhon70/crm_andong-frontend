import { FC, Fragment, useEffect, useState } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Button, GetProps, Input, Select, TableProps, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import TableComponent from "../../../components/tableComponent";
import moment from "moment";
import PopconfirmComponent from "../../../components/popconfirmComponent";
import { HiPencilSquare } from "react-icons/hi2";
import Loading from "../../../components/loading";
import { getPagingDisease, setDisease } from "../../../features/diseaseSlice";
import { diseaseAPI } from "../../../apis/disease.api";
import { toast } from "react-toastify";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const DiseaseManagement: FC = () => {
    const navige = useNavigate()
    const { data, total, loading } = useSelector((state: RootState) => state.disease);
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(50)
    const [search,setSearch] = useState<string>('')
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();

    const [isshow, setIsshow] = useState<any>('')
    
    
    useEffect(() => {
        if(hospitalId){
            dispatch(getPagingDisease({ pageSize, pageIndex, search, hospitalId : Number(hospitalId),isshow }))
        }
        
    }, [dispatch,hospitalId, pageIndex, pageSize, isshow])
    const dataBreadcrumb = [
        {
            href: '/thiet-lap-benh-tat',
            title: 'Cài đặt',
        },
        {
            type: 'separator',
        },
        {
            title: 'Thiết lập bệnh',
        },
    ];

    const onClickCreate = () => {
        dispatch(setDisease({}))
        navige('/thiet-lap-benh-tat/them-moi');
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setSearch(value);
        dispatch(getPagingDisease({ pageSize, pageIndex, search: value, hospitalId : Number(hospitalId),isshow }))
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
            title: 'Khoa',
            dataIndex: 'department',
            key: 'department',
            render(value, record, index) {
              
                return <div style={{textTransform:'capitalize'}} className="" >{value.name}</div>;
            },
        },
        {
            title: 'Bệnh viện',
            key: 'hospital',
            dataIndex: 'hospital',
            render(value, record, index) {
               
                return <div style={{textTransform:'capitalize'}} className="" >{value.name}</div>;
            },
        },
        {
            title: 'Người tạo',
            key: 'user',
            dataIndex: 'user',
            render(value, record, index) {
                
                return <div style={{textTransform:'capitalize'}} className="" >{value.fullName}</div>;
            },
        },
        {
            title: 'Tình trạng',
            key: 'isshow',
            dataIndex: 'isshow',
            render(value, record, index) {
                if (value === true) {
                    return <Tag color="success" >Hoạt động</Tag>
                }
                return <Tag color="red" >không hoạt động</Tag>
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
                    <PopconfirmComponent
                        title={<>Xóa bệnh {record.name}</>}
                        description='Bạn có chắc chắn muốn xóa bệnh này không?'
                        value={value}
                      deleteRole={deleteDesease}
                    />
                    
                    
                    <HiPencilSquare
                        onClick={() => onClickEdit(value)} 
                        className='cursor-pointer text-green-700 ' color='primary' size={25} />
                </div>
            },
        },
    ];

    const onChangePage = (page: number, pageSize: number) => {
        setPageIndex(page)
        setPageSize(pageSize)
    }

    const handleChangeTinhTrang= (e:any) => {
        if(e ===  undefined){
            setIsshow('')
        }else {
            setIsshow(e)
        }
    }

    const deleteDesease = async(value: any) =>{ 
       try {
            const result = await diseaseAPI.deleteDisease(value)
            if(result.data.statusCode === 1){
                toast.success('Xóa thành công!')
                dispatch(getPagingDisease({ pageSize, pageIndex, search, hospitalId : Number(hospitalId),isshow }))
           }
       } catch (error) {
            console.log(error);
       }
        
    }

    const onClickEdit = (id: number) => {
        navige(`/thiet-lap-benh-tat/cap-nhat/${id}`);
    }
    return <Fragment>
         <BreadcrumbComponent items={dataBreadcrumb} />
         <div className='mt-2 pb-2 flex justify-between ' >
            <div className="flex gap-3" >
                <Select
                    onChange={handleChangeTinhTrang}
                    showSearch
                    allowClear
                    style={{ width: 200 }}
                    placeholder="Tình trạng"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                        {
                            value: '1',
                            label: 'Hoạt động',
                        },
                        {
                            value: '0',
                            label: 'Không hoạt động',
                        },
                       
                    ]}
                />
                 
                <Search className='w-[250px]' placeholder="Nhập tên quyền"  onSearch={onSearch} enterButton />
            </div>
            <Button onClick={onClickCreate} type="primary">Thêm mới</Button>
        </div>
        {
            loading === 'succeeded' ? <TableComponent rowKey={true} columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} /> : <Loading />
        }
    </Fragment>
}

export default DiseaseManagement