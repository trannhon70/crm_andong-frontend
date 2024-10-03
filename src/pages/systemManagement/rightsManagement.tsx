import type { GetProps, TableProps } from 'antd';
import { Button, Input, Tag } from 'antd';
import { FC, Fragment, useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import Loading from '../../components/loading';
import PopconfirmComponent from '../../components/popconfirmComponent';
import TableComponent from "../../components/tableComponent";
import { fetchGetPaging } from '../../features/rolesSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { rolesAPI } from '../../apis/roles.api';
import { toast } from 'react-toastify';
const moment = require('moment');

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

const RightsManagement: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navige = useNavigate()
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(50)
  const [search] = useState<string>('')
  const { data, total,loading } = useSelector((state: RootState) => state.roles);

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    dispatch(fetchGetPaging({ pageSize, pageIndex, search : value }));
  };


  useEffect(() => {
    dispatch(fetchGetPaging({ pageSize, pageIndex, search }));
  }, [dispatch, pageSize,pageIndex ])

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
      title: 'Tên Quyền',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Người dùng hiện tại',
      key: 'users',
      dataIndex: 'users',
      render(value, record, index) {
        return <Fragment>
            {
              value.map((item : any, index:number)=>{
                return <Fragment  key={index}><Tag className='text-base' style={{textTransform:'capitalize'}}  color='gold-inverse' >{item.fullName}</Tag > | </Fragment>
              })
            }
        </Fragment>
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
              title ={<>Xóa quyền {record.name}</>} 
              description= 'Bạn có chắc chắn muốn xóa tác vụ này không?'
              value={value}
              deleteRole={deleteRole}
            />
            <HiPencilSquare onClick={() => onClickEdit(value)} className='cursor-pointer text-green-700 ' color='primary' size={25} />
          </div>
        },
      },
  ];

  const onClickCreate = () => {
    navige('/quan-ly-quyen/them-moi');
  }

  const onChangePage = (page: number, pageSize:number) => {
    setPageIndex(page)
    setPageSize(pageSize)
  }

  const deleteRole = async (id: any) => {
      try {
          const result = await rolesAPI.deleteRole(id)
          if(result.data.statusCode === 1){
            toast.success('Xóa thành công!')
            dispatch(fetchGetPaging({ pageSize, pageIndex, search }));
          }
      } catch (error) {
        console.log(error);
        
      }
  }

  const onClickEdit = (id: number)=>{
      navige(`/quan-ly-quyen/cap-nhat/${id}`)
  }

  return (
    <Fragment>
      <BreadcrumbComponent items={dataBreadcrumb} />
      <div className='mt-2 pb-2 flex justify-between ' >
        <Search className='w-[250px]' placeholder="Nhập tên quyền" onSearch={onSearch} enterButton />
        <Button onClick={onClickCreate} type="primary">Thêm mới</Button>
      </div>
      {
        loading === 'succeeded' ? <TableComponent columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} /> : <Loading />
      }
    </Fragment>
  );
}

export default RightsManagement;
