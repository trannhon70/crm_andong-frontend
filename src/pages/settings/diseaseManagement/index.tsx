import { FC, Fragment, useState } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Button, GetProps, Input, Select, TableProps, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import TableComponent from "../../../components/tableComponent";
import moment from "moment";
import PopconfirmComponent from "../../../components/popconfirmComponent";
import { HiPencilSquare } from "react-icons/hi2";
import Loading from "../../../components/loading";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const DiseaseManagement: FC = () => {
    const navige = useNavigate()
    const { data, total, loading } = useSelector((state: RootState) => state.users);
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(50)
    const [search,setSearch] = useState<string>('')
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
        navige('/thiet-lap-benh-tat/them-moi');
        // dispatch(setRoleData({}))
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
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
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ngôn ngữ',
            key: 'language',
            dataIndex: 'language',
            render(value, record, index) {
                if (value === 'vi') {
                    return <Tag  >Tiếng Việt</Tag>;
                }
                if (value === 'en') {
                    return <Tag color="error" >Tiếng Anh</Tag>;
                }
                return <Tag color="green" >Tiếng Trung</Tag>;
            },
        },
        {
            title: 'Phân quyền',
            key: 'role',
            dataIndex: 'role',
            render(value, record, index) {
                
                return <Tag color="processing" >{value?.name}</Tag>;
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
                return <Fragment>{moment(value.created_at).format('DD-MM-YYYY hh:ss')}</Fragment>
            },
        },
        {
            title: 'Thao tác',
            key: 'id',
            dataIndex: 'id',
            render(value, record, index) {
                
                return <div className='flex gap-4 ' >
                    <PopconfirmComponent
                        title={<>Xóa {record.fullName}</>}
                        description='Bạn có chắc chắn muốn xóa tài khoản này không?'
                        value={value}
                    //   deleteRole={deleteRole}
                    />
                    
                    
                    <HiPencilSquare
                        // onClick={() => onClickEdit(value)} 
                        className='cursor-pointer text-green-700 ' color='primary' size={25} />
                </div>
            },
        },
    ];

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