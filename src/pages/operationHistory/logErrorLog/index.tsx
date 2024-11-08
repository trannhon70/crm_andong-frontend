import { FC, Fragment, useEffect, useState } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { GetProps, Input, TableProps } from "antd";
import TableComponent from "../../../components/tableComponent";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import Loading from "../../../components/loading";
import { getPagingHistoryLogin } from "../../../features/historyLoginSlice";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;


const LogErrorLog: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(50)
    const { data, total, loading } = useSelector((state: RootState) => state.historyLogin);

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        dispatch(getPagingHistoryLogin({ pageSize, pageIndex, search : value, action: 'ERROR' }));
    };

    useEffect(() => {
        dispatch(getPagingHistoryLogin({ pageSize, pageIndex, search : '', action: 'ERROR' }))
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
            title: 'Nhật ký lỗi đăng nhập',
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
            title: 'email',
            key: 'email',
            dataIndex: 'email',

        },
        {
            title: 'password',
            key: 'password',
            dataIndex: 'password',

        },
        {
            title: 'Lỗi',
            key: 'error',
            dataIndex: 'error',

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
       
    ];

    const onChangePage = (page: number, pageSize: number) => {
        setPageIndex(page)
        setPageSize(pageSize)
    }
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className='mt-2 pb-2 flex justify-between ' >
            <Search className='w-[250px]' placeholder="Nhập Ip" onSearch={onSearch} enterButton />
        </div>
        {
            loading === 'succeeded' ? <TableComponent columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} /> : <Loading />
        }
    </Fragment>
}


export default LogErrorLog