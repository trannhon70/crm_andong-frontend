import type { GetProps, TableProps } from 'antd';
import { Button, Input } from 'antd';
import { FC, Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import TableComponent from "../../components/tableComponent";
const dataBreadcrumb = [
    {
        href: '/quan-ly-quyen',
        title: 'Quản lý hệ thống',
    },
    {
        type: 'separator',
    },
    {
        title: 'Quản lý quyền',
    },
];

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const columns: TableProps<any>['columns'] = [
    {
      title: 'Chọn',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'STT',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Tên Quyền',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Người dùng hiện tại',
      key: 'tags',
      dataIndex: 'tags',
     
    },
    {
      title: 'Thời gian tạo',
      key: 'action',
     
    },
    {
        title: 'Thao tác',
        key: 'tags',
        dataIndex: 'tags',
       
      },
  ];

  const data: any[] = [
   
  ];


const RightsManagement: FC = () => {
    const navige = useNavigate()
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    const onClickCreate = () => {
        navige('/quan-ly-quyen/them-moi');
    }
    return (
        <Fragment>
            <BreadcrumbComponent items={dataBreadcrumb} />
            <div className='mt-2 pb-2 flex justify-between ' >
                <Search className='w-[250px]' placeholder="Nhập tên quyền" onSearch={onSearch} enterButton />
                <Button onClick={onClickCreate} type="primary">Thêm mới</Button>
            </div>
            <TableComponent columns={columns} data={data} />
        </Fragment>
    );
}

export default RightsManagement;
