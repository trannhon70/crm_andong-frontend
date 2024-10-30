import { FC, Fragment, useEffect, useState } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Alert, Button, GetProps, Input, Popover, Select, TableProps, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../../components/tableComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import moment from "moment";
import PopconfirmComponent from "../../../components/popconfirmComponent";
import { HiPencilSquare } from "react-icons/hi2";
import Loading from "../../../components/loading";
import { getPagingPatient, setPatient } from "../../../features/patientSlice";
import { HiStar } from "react-icons/hi2";
import { FaFile } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { patiantAPI } from "../../../apis/patient.api";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const scrollProps = {
   x: 'calc(700px + 50%)'
  };

const AppointmentRegistrationList: FC = () => {
    const navige = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(50)
    const [search,setSearch] = useState<string>('')
    const { data, total, loading } = useSelector((state: RootState) => state.patient);
    const hospitalId = localStorage.getItem('hospitalId')

    useEffect(() => {
        dispatch(getPagingPatient({ pageSize, pageIndex, search ,hospitalId}))
    }, [dispatch, pageSize, pageIndex,hospitalId])

    const dataBreadcrumb = [
        {
            title: 'Quản lý cuộc hẹn',
        },
        {
            type: 'separator',
        },
        {
            title: 'Danh sách đăng ký hẹn',
        },
       
    ];

    const historyMedical = (data: any) => {
        console.log(data, 'data');
        
        return <Fragment>
            {
                data && data.map((item : any, index: number) => {
                    return<div key={index} className="flex gap-2 mt-1" >
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
            
        </Fragment>
    } 

    const columns: TableProps<any>['columns'] = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            render(value, record, index) {
                return <Fragment>{index + 1}</Fragment>
            },
            width: 50,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: 150,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            sorter: (a, b) => a.gender.localeCompare(b.gender),
            render(value, record, index) {
                
                return <Tag style={{textTransform:"uppercase"}} color="processing" >{value}</Tag>;
            },
            width: 100,
        },
        {
            title: 'Tuổi',
            dataIndex: 'yearOld',
            key: 'yearOld',
            sorter: (a, b) => a.yearOld - b.yearOld,
            width: 100,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a, b) => a.phone - b.phone,
            width: 150,
        },
        {
            title: 'Mã chuyên gia',
            dataIndex: 'code',
            key: 'code',
            width: 150,
            sorter: (a, b) => a.code.localeCompare(b.code),
        },
        {
            title: 'khoa',
            dataIndex: 'department',
            key: 'department',
            render(value, record, index) {
                return <div style={{textTransform:"uppercase"}} >{value.name}</div>
            },
            width: 150,
            sorter: (a, b) => a.department?.name.localeCompare(b.department?.name),
        },
        {
            title: 'Bệnh',
            dataIndex: 'diseases',
            key: 'diseases',
            render(value, record, index) {
                return <div style={{textTransform:"uppercase"}} >{value.name}</div>
            },
            width: 250,
            sorter: (a, b) => a.diseases?.name.localeCompare(b.diseases?.name),
        },
        {
            title: 'Nguồn đến',
            dataIndex: 'media',
            key: 'media',
            render(value, record, index) {
                return <div style={{textTransform:"uppercase"}} >{value.name}</div>
            },
            width: 150,
            sorter: (a, b) => a.media?.name.localeCompare(b.media?.name),
        },
        {
            title: 'tỉnh/TP',
            dataIndex: 'city',
            key: 'city',
            render(value, record, index) {
                return <div style={{textTransform:"uppercase"}} >{value.name}</div>
            },
            width: 150,
            sorter: (a, b) => a.city?.name.localeCompare(b.city?.name),
        },
        {
            title: 'Quận/huyện',
            dataIndex: 'district',
            key: 'district',
            render(value, record, index) {
                return <div style={{textTransform:"uppercase"}} >{value?.name}</div>
            },
            width: 150,
            sorter: (a, b) => a.district?.name.localeCompare(b.district?.name),
        },
       
       
        {
            title: 'Thời gian hẹn',
            key: 'appointmentTime',
            dataIndex: 'appointmentTime',
            render(value, record, index) {
                return <Fragment>{moment(value* 1000).format('DD-MM-YYYY hh:ss')}</Fragment>
            },
            width: 150,
            sorter: (a, b) => a.appointmentTime - b.appointmentTime,
        },
        {
            title: 'Thời gian nhắc hẹn',
            key: 'reminderTime',
            dataIndex: 'reminderTime',
            width: 150,
            render(value, record, index) {
                return <Fragment>{moment(value* 1000).format('DD-MM-YYYY hh:ss')}</Fragment>
            },
            sorter: (a, b) => a.reminderTime - b.reminderTime,
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            render(value, record, index) {
                return <div  >{value}</div>
            },
            width: 150,
        },
        {
            title: 'Sửa thời gian đăng ký',
            dataIndex: 'editregistrationTime',
            key: 'editregistrationTime',
            render(value, record, index) {
                return <Fragment>{moment(value* 1000).format('DD-MM-YYYY hh:ss')}</Fragment>
            },
            width: 150,
            sorter: (a, b) => a.editregistrationTime - b.editregistrationTime,
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'doctor',
            key: 'doctor',
            render(value, record, index) {
                return <div style={{textTransform:"uppercase"}} >{value?.name}</div>
            },
            width: 150,
            sorter: (a, b) => a.doctor?.name.localeCompare(b.doctor?.name),
        },
        {
            title: 'Tình trạng cuộc hẹn',
            dataIndex: 'status',
            key: 'status',
            render(value, record, index) {
                if(value == 'CHỜ ĐỢI'){
                    return <Tag style={{textTransform:"uppercase"}} color="magenta">{value}</Tag>
                } else if(value == 'ĐÃ ĐẾN'){
                    return <Tag style={{textTransform:"uppercase"}} color="green">{value}</Tag>
                }else if(value == 'CHƯA ĐẾN'){
                    return <Tag style={{textTransform:"uppercase"}} color="default">{value}</Tag>
                } else if(value == 'KHÔNG XÁC ĐỊNH'){
                    return <Tag style={{textTransform:"uppercase"}} color="red">{value}</Tag>
                } 
            },
            sorter: (a, b) => a.status.localeCompare(b.status),
            width: 150,
        },
        {
            title: 'Người thêm',
            dataIndex: 'user',
            key: 'user',
            render(value, record, index) {
                return <div style={{textTransform:"uppercase"}} >{value?.fullName}</div>
            },
            width: 150,
            sorter: (a, b) => a.user?.fullName.localeCompare(b.user?.fullName),
        },
        {
            title: 'Hồ sơ thăm khám',
            dataIndex: 'chatPatients',
            key: 'chatPatients',
            render(value, record, index) {
                return <div className="flex items-center justify-center cursor-pointer " >
                    <Popover content={historyMedical(value)} title="Lịch sử thăm khám">
                        <HiStar size={20} color="red" />
                    </Popover>
                </div>
            },
            width: 150,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            render(value, record, index) {
                return <Fragment>{moment(value* 1000).format('DD-MM-YYYY hh:ss')}</Fragment>
            },
            width: 150,
        },
        {
            title: 'Thao tác',
            key: 'id',
            dataIndex: 'id',
            fixed: 'right',
            width: 150,
            render(value, record, index) {
                
                return <div className='flex gap-2 items-center ' >
                    <PopconfirmComponent
                        title={<>Xóa {record.name}</>}
                        description='Bạn có chắc chắn muốn xóa khách hàng này không?'
                        value={value}
                      deleteRole={deletePatient}
                    />
                    
                    <FaFile className='cursor-pointer text-fuchsia-500 '  size={20} />
                    <FaCloudUploadAlt className='cursor-pointer text-orange-500'  size={25} />
                    <HiPencilSquare
                        onClick={() => onClickEdit(value)} 
                        className='cursor-pointer text-green-700 ' color='primary' size={25} />
                </div>
            },
        },
    ];

    const onClickCreate = () => {
        navige('/danh-sach-dang-ky-hen/them-moi');
        dispatch(setPatient({}))
    }

    const onClickEdit = (id: number) => {
        navige(`/danh-sach-dang-ky-hen/cap-nhat/${id}`);
    }

    const deletePatient = async (id : any) => {
        console.log(id, 'id');
        try {
            const result = await patiantAPI.deletePatiant(id)
            if(result.data.statusCode === 1){
                toast.success('Xóa thành công!')
                dispatch(getPagingPatient({ pageSize, pageIndex, search ,hospitalId}))
           }
        } catch (error) {
            console.log(error);
            
        }
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setSearch(value);
     dispatch(getPagingPatient({ pageSize, pageIndex, search:value ,hospitalId}))
    };

    const onChangePage = (page: number, pageSize: number) => {
        setPageIndex(page)
        setPageSize(pageSize)
    }

    return <Fragment>
       <BreadcrumbComponent items={dataBreadcrumb} />
       <div className='mt-2 pb-2 flex justify-between ' >
            <div className="flex gap-3" >
                <Select
                    // onChange={handleChangeTinhTrang}
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
                 <Select
                    // onChange={handleChangeNgonNgu}
                    showSearch
                    allowClear
                    style={{ width: 200 }}
                    placeholder="Ngôn ngữ"
                    optionFilterProp="label"
                    // filterSort={(optionA, optionB) =>
                    //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    // }
                    // options={Languege}
                />
                <Search className='w-[200px]' placeholder="Nhập họ và tên"  onSearch={onSearch} enterButton />
            </div>
            <Button onClick={onClickCreate} type="primary">Thêm mới</Button>
        </div>
        {
            loading === 'succeeded' ? <TableComponent rowKey={false} columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} scroll={scrollProps} /> : <Loading />
        }
        
    </Fragment>
}

export default AppointmentRegistrationList