import { Pagination, Table } from "antd";
import { FC, Fragment } from "react";
import type { PaginationProps } from 'antd';

type TableProps = {
    columns: any;
    data: any
}

const TableComponent: FC<TableProps> = (props) => {
    const {columns, data} = props

    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;
    return <Fragment>
        <Table<any>  columns={columns} dataSource={data} pagination={false} />
        <Pagination className="mt-2" 
            size="default" align="end" 
            showSizeChanger 
            defaultCurrent={1} 
            total={600} 
            showTotal={showTotal}
        />
    </Fragment>
}

export default TableComponent;