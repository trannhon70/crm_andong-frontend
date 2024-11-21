import type { TableProps } from 'antd';
import { Table } from 'antd';
import { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { getBaoCaoTongHop } from "../../../features/dataReportSlice";
import { AppDispatch, RootState } from "../../../redux/store";

interface DataYear {
    key: string;
    year: number;
    total: number;
    daDen: number;
    chuaDen: number;
    tile: number;
}

interface DataMonths {
    key: string;
    year: number;
    total: number;
    daDen: number;
    chuaDen: number;
    tile: number;
}


const SummaryReport: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { resultMonth, resultYear, loading } = useSelector((state: RootState) => state.dataReport);
    const hospitalId = localStorage.getItem('hospitalId')

    useEffect(() => {
        if (hospitalId) {
            dispatch(getBaoCaoTongHop({ hospitalId: hospitalId }))
        }
    }, [dispatch, hospitalId])

    const dataBreadcrumb = [
        {
            title: 'Báo cáo dữ liệu',
        },
        {
            type: 'separator',
        },
        {

            title: 'Báo cáo tổng hợp theo thời gian hẹn ',
        },

    ];

    const columns: TableProps<DataYear>['columns'] = [
        {
            title: 'Năm',
            dataIndex: 'year',
            key: 'year',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tổng',
            dataIndex: 'total',
            key: 'total',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Đã đến',
            dataIndex: 'daDen',
            key: 'daDen',
        },
        {
            title: 'Chưa đến',
            dataIndex: 'chuaDen',
            key: 'chuaDen',
        },
        {
            title: 'Tỷ lệ',
            dataIndex: 'tile',
            key: 'tile',
            render(value, record, index) {
                return <>{value > 0 ? value.toFixed(2) : 0} %</>
            },
        },

    ];

    const columnsMonths: TableProps<DataMonths>['columns'] = [
        {
            title: 'Tháng',
            dataIndex: 'month',
            key: 'month',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tổng',
            dataIndex: 'total',
            key: 'total',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Đã đến',
            dataIndex: 'daDen',
            key: 'daDen',
        },
        {
            title: 'Chưa đến',
            dataIndex: 'chuaDen',
            key: 'chuaDen',
        },
        {
            title: 'Tỷ lệ',
            dataIndex: 'tile',
            key: 'tile',
            render(value, record, index) {
                return <>{value > 0 ? value.toFixed(2) : 0} %</>
            },
        },

    ];

    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className="mt-2 mb-2 font-bold text-lg text-lime-700 " >
            Thống kê theo năm (thống kê 3 năm gần nhất)
        </div>
        <Table<DataYear> columns={columns} dataSource={resultYear || []} size="middle" bordered pagination={false} />

        <div className="mt-2 mb-2 font-bold text-lg text-lime-700 " >
            Thống kê theo tháng (thống kê 12 tháng gần nhất)
        </div>
        <Table<DataMonths> columns={columnsMonths} dataSource={resultMonth || []} size="middle" bordered pagination={false} />
    </Fragment>
}


export default SummaryReport