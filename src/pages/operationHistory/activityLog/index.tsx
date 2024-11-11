import { FC, Fragment, useEffect, useState } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { GetProps, Input, TableProps } from "antd";
import TableComponent from "../../../components/tableComponent";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import Loading from "../../../components/loading";
import { getPagingHistoryLogin } from "../../../features/historyLoginSlice";
import useMenuData from "../../../hooks/useMenuData";
import PopconfirmComponent from "../../../components/popconfirmComponent";
import { HiPencilSquare } from "react-icons/hi2";
import { historyLoginAPI } from "../../../apis/historyLogin.api";
import { toast } from "react-toastify";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;


const ActivityLog: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(50)
    const { data, total, loading } = useSelector((state: RootState) => state.historyLogin);
    const menu = useMenuData();

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        dispatch(getPagingHistoryLogin({ pageSize, pageIndex, search : value, action: 'SUCCESS' }));
    };

    useEffect(() => {
        dispatch(getPagingHistoryLogin({ pageSize, pageIndex, search : '', action: 'SUCCESS' }))
    }, [dispatch,pageSize, pageIndex])

    const dataBreadcrumb = [
        {
            href: '/nhat-ky-hoat-dong',
            title: 'Lịch sử thao tác',
        },
        {
            type: 'separator',
        },
        {
            title: 'Nhật ký hoạt động',
        },
    ];

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
            title: 'Hành động',
            dataIndex: 'name',
            key: 'name',
            render(value, record, index) {
                return <Fragment>Đăng nhập</Fragment>
            },
        },

        {
            title: 'Người dùng',
            key: 'fullName',
            dataIndex: 'fullName',

        },
        {
            title: 'Địa chỉ IP',
            key: 'ip',
            dataIndex: 'ip',

        },
        {
            title: 'Thời gian',
            key: 'created_at',
            dataIndex: 'created_at',
            render(value, record, index) {
                return <Fragment>{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</Fragment>
            },
        },

        {
            title: 'Thao tác',
            key: 'id',
            dataIndex: 'id',
            render(value, record, index) {

                return <div className='flex gap-4 ' >
                    {
                         menu?.[7].ds?.action_NKHD.delete === true ?  <PopconfirmComponent
                         title={<>Xóa lịch sử {record.ip}</>}
                         description='Bạn có chắc chắn muốn xóa lịch sử này không?'
                         value={value}
                         deleteRole={deleteHistoryLogin}
                     /> : null
                    }
                   
                </div>
            },
        },
       
    ];

    const deleteHistoryLogin = async (id: number) => {
        try {
            const result = await historyLoginAPI.deleteHistory(id)
            if (result.data.statusCode === 1) {
              toast.success('Xóa thành công!')
              dispatch(getPagingHistoryLogin({ pageSize, pageIndex, search : '', action: 'SUCCESS' }))
            }
          } catch (error) {
            console.log(error);
          }
        
    }

    const onChangePage = (page: number, pageSize: number) => {
        setPageIndex(page)
        setPageSize(pageSize)
    }


    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className='mt-2 pb-2 flex justify-between ' >
            <Search className='w-[250px]' placeholder="Nhập người dùng, địa chỉ ip" onSearch={onSearch} enterButton />
        </div>
        {
            loading === 'succeeded' ? <TableComponent columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage}  /> : <Loading />
        }
    </Fragment>
}

export default ActivityLog