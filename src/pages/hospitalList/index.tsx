import { FC, Fragment, useEffect, useState } from "react";
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import { Button, Input, Tag } from "antd";
import type { GetProps, TableProps } from 'antd';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import TableComponent from "../../components/tableComponent";
import PopconfirmComponent from "../../components/popconfirmComponent";
import { HiPencilSquare } from "react-icons/hi2";
import moment from "moment";
import { fetchGetPaging } from "../../features/hospitalSlice";
import Loading from "../../components/loading";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const dataBreadcrumb = [
  {
    href: '/danh-sach-benh-vien',
    title: 'Quản lý hệ thống',
  },
  {
    type: 'separator',
  },
  {
    title: 'Danh sách bệnh viện',
  },
];
const HospitalList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navige = useNavigate()
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(50)
  const [search] = useState<string>('')
  const { data, total, loading } = useSelector((state: RootState) => state.hospital);

  useEffect(() => {
    dispatch(fetchGetPaging({ pageSize, pageIndex, search }));
  }, [dispatch, pageSize, pageIndex])

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    dispatch(fetchGetPaging({ pageSize, pageIndex, search : value }));
  };

  const onClickCreate = () => {
    navige('/danh-sach-benh-vien/them-moi');
    // dispatch(setRoleData({}))
  }

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
      title: 'Tên bệnh viện',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Người tạo',
      key: 'author',
      dataIndex: 'author',

    },
    {
      title: 'Thời gian tạo',
      key: 'created_at',
      dataIndex: 'created_at',
      render(value, record, index) {
        return <Fragment>{moment(value.created_at).format('DD-MM-YYYY hh:ss')}</Fragment>
      },
    },
    // {
    //   title: 'Thao tác',
    //   key: 'id',
    //   dataIndex: 'id',
    //   render(value, record, index) {
    //     return <div className='flex gap-4 ' >
    //       {/* <PopconfirmComponent 
    //               title ={<>Xóa quyền {record.name}</>} 
    //               description= 'Bạn có chắc chắn muốn xóa tác vụ này không?'
    //               value={value}
    //             //   deleteRole={deleteRole}
    //             /> */}
    //       <HiPencilSquare
    //         onClick={() => onClickEdit(value)}
    //         className='cursor-pointer text-green-700 ' color='primary' size={25} />
    //     </div>
    //   },
    // },
  ];

  const onChangePage = (page: number, pageSize: number) => {
    setPageIndex(page)
    setPageSize(pageSize)
  }

  const onClickEdit = (id: number) => {
    console.log(id, 'id');
    
  }
  return <Fragment>
    <BreadcrumbComponent items={dataBreadcrumb} />
    <div className='mt-2 pb-2 flex justify-between ' >
      <Search className='w-[250px]' placeholder="Nhập tên quyền" onSearch={onSearch} enterButton />
      {/* <Button onClick={onClickCreate} type="primary">Thêm mới</Button> */}
    </div>
    {
      loading === 'succeeded' ? <TableComponent columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} /> : <Loading />
    }
  </Fragment>
}

export default HospitalList