import type { PaginationProps } from 'antd';
import { Pagination, Table } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { FC, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const {t } = useTranslation(['setting'])
  
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


  const showTotal: PaginationProps['showTotal'] = (total) => `${t("setting:tong")} ${total} ${t("setting:muc")}`;

  return (
    <Fragment>
      <Table<any>
        columns={columns}
        dataSource={data.length > 0 ? data : [] }
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
        pageSizeOptions={[25, 50, 100, 200]}
      />
    </Fragment>
  );
};

export default TableComponent;
