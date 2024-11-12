import React, { FC, Fragment, useEffect } from "react";
import { Space, Table, Tag } from 'antd';
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getThongKechiTietDichVuKhachHang } from "../../../features/hospitalSlice";

const { Column, ColumnGroup } = Table;

interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    tags: string[];
}

const data: DataType[] = [
    
];

const CustomerServiceDetailReport: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {TKDVKH} = useSelector((state: RootState) => state.hospital);

    useEffect(() => {
        dispatch(getThongKechiTietDichVuKhachHang())
    }, [dispatch])
    const dataBreadcrumb = [
        {
            title: 'Quản lý cuộc hẹn bệnh nhân',
        },
       
        {
            type: 'separator',
        },
        {
            title: 'Báo cáo chi tiết dịch vụ khách hàng',
        },
       
    ];
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        
    {
        TKDVKH.length > 0 && TKDVKH.map((item: any, index: number) => {
            return (
                <Fragment key={`${item.name}-${index}`}>  {/* Combined key for uniqueness */}
                    <div className="flex items-center justify-center text-lg text-red-600 p-2" style={{ textTransform: 'capitalize' }}>
                        {item.name}
                    </div>
                    <Table<DataType> dataSource={item.users.user || []} bordered size="middle" pagination={false}>
                        {/* ColumnGroup needs a unique key */}
                        <ColumnGroup title="" key={`fullName-${item.name}`}>
                            <Column title="Tư vấn viên" dataIndex="fullName" key="fullName" />
                        </ColumnGroup>
                        <ColumnGroup title="Hôm nay" key={`today-${item.name}`}>
                            <Column title="Tổng cộng" dataIndex="today" key="today-total" render={(value) => <>{value.total}</>} />
                            <Column title="Đã đến" dataIndex="today" key="today-arrived" render={(value) => <>{value.totalArrived}</>} />
                            <Column title="Chưa đến" dataIndex="today" key="today-notArrived" render={(value) => <>{value.totalNotArrived}</>} />
                        </ColumnGroup>
                        <ColumnGroup title="Hôm qua" key={`yesterday-${item.name}`}>
                            <Column title="Tổng cộng" dataIndex="yesterday" key="yesterday-total" render={(value) => <>{value.total}</>} />
                            <Column title="Đã đến" dataIndex="yesterday" key="yesterday-arrived" render={(value) => <>{value.totalArrived}</>} />
                            <Column title="Chưa đến" dataIndex="yesterday" key="yesterday-notArrived" render={(value) => <>{value.totalNotArrived}</>} />
                        </ColumnGroup>
                        <ColumnGroup title="Tháng này" key={`thisMonth-${item.name}`}>
                            <Column title="Tổng cộng" dataIndex="thisMonth" key="thisMonth-total" render={(value) => <>{value.total}</>} />
                            <Column title="Đã đến" dataIndex="thisMonth" key="thisMonth-arrived" render={(value) => <>{value.totalArrived}</>} />
                            <Column title="Chưa đến" dataIndex="thisMonth" key="thisMonth-notArrived" render={(value) => <>{value.totalNotArrived}</>} />
                        </ColumnGroup>
                        <ColumnGroup title="Tháng trước" key={`lastMonth-${item.name}`}>
                            <Column title="Tổng cộng" dataIndex="lastMonth" key="lastMonth-total" render={(value) => <>{value.total}</>} />
                            <Column title="Đã đến" dataIndex="lastMonth" key="lastMonth-arrived" render={(value) => <>{value.totalArrived}</>} />
                            <Column title="Chưa đến" dataIndex="lastMonth" key="lastMonth-notArrived" render={(value) => <>{value.totalNotArrived}</>} />
                        </ColumnGroup>
                    </Table>
                </Fragment>
            );
        })
    }
    

        
    </Fragment>
}

export default CustomerServiceDetailReport