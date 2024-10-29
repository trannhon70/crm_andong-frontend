import type { PaginationProps } from 'antd';
import { Pagination, Table } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { FC, Fragment, useState } from 'react';

type TableProps = {
  columns?: any;
  data?: any;
  total?: number;
  rowKey?: boolean;
  pageIndex?: number;
  pageSize?: number;
  onChangePage?: any;
  scroll?: any
};

const TableComponent: FC<TableProps> = (props) => {
  const { columns, data, total, rowKey = false, pageIndex, pageSize, onChangePage ,scroll} = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); 

  
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('Selected Row Keys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> | undefined = rowKey
  ? {
      selectedRowKeys,
      onChange: onSelectChange,
    }
  : undefined;


  const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;

  return (
    <Fragment>
      <Table<any>
        columns={columns}
        dataSource={data}
        pagination={false}
        rowSelection={rowSelection}
        rowKey={(record) => record.id} 
        size='small'
        scroll={scroll}
        bordered
      />
      <Pagination
        className="mt-2"
        size="default"
        align="end" 
        showSizeChanger
        current={pageIndex}
        pageSize={pageSize}
        total={total}
        showTotal={showTotal}
        onChange={onChangePage}
        pageSizeOptions={[ 50, 100, 200]}
      />
    </Fragment>
  );
};

export default TableComponent;
