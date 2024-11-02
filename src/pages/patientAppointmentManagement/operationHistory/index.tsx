import { FC, Fragment, useEffect } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Link, useParams } from "react-router-dom";
import { getAllHistoryPatiant } from "../../../features/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import moment from "moment";


const OperationHistory:FC = () => {
    let { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { history } = useSelector((state: RootState) => state.patient);
    useEffect(() =>{ 
        if(id){
            dispatch(getAllHistoryPatiant(Number(id)))
        }
    }, [id, dispatch])

    const columns: TableProps<any>['columns'] = [
        {
          title: 'Thao tác',
          dataIndex: 'action',
          key: 'action',
          render: (value) =>{
            if(value === 'THÊM'){
                return <Tag color="#87d068">{value}</Tag>
            }
            if(value === 'CẬP NHẬT'){
                return <Tag color="#108ee9">{value}</Tag>
            } else {
                return <Tag color="#f50">{value}</Tag>
            } 
          },
          width: 100,
          fixed: 'left',
        },
        {
          title: 'Thời gian thao tác',
          dataIndex: 'created_at',
          key: 'created_at',
          render: (value) =>{
            return <>{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</>
          },
          width: 150,
        },
        {
            title: 'Người thay đổi',
            dataIndex: 'user',
            key: 'user',
            render: (value) =>{
                return <>{value?.fullName}</>
              },
              width: 150,
          },
        {
          title: 'Họ và tên',
          dataIndex: 'name',
          key: 'name',
          width: 150,
        },
        {
          title: 'Giới tính',
          key: 'gender',
          dataIndex: 'gender',
          width: 150,
          
        },
        {
          title: 'Điện thoại',
          key: 'phone',
          dataIndex: 'phone',
          width: 150,
         
        },
        {
            title: 'Mã chuyên gia',
            key: 'code',
            dataIndex: 'code',
            width: 120,
          },
          {
            title: 'khoa',
            key: 'department',
            dataIndex: 'department',
            render: (value) =>{
                return <>{value?.name}</>
              },
              width: 120,
          },
          {
            title: 'Bệnh',
            key: 'diseases',
            dataIndex: 'diseases',
            render: (value) =>{
                return <>{value?.name}</>
              },
              width: 150,
          },
          {
            title: 'Nguồn đến',
            key: 'media',
            dataIndex: 'media',
            render: (value) =>{
                return <>{value?.name}</>
              },
              width: 150,
          },
          {
            title: 'tỉnh/TP',
            key: 'city',
            dataIndex: 'city',
            render: (value) =>{
                return <>{value?.name}</>
              },
              width: 150,
          },
          {
            title: 'tỉnh/TP',
            key: 'district',
            dataIndex: 'district',
            render: (value) =>{
                return <>{value?.name}</>
              },
              width: 150,
          },
          {
            title: 'Thời gian hẹn',
            key: 'appointmentTime',
            dataIndex: 'appointmentTime',
            render: (value) =>{
                return <>{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</>
              },
              width: 150,
          },
          {
            title: 'Thời gian nhắc hẹn',
            key: 'reminderTime',
            dataIndex: 'reminderTime',
            render: (value) =>{
                return <>{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</>
              },
              width: 150,
          },
          {
            title: 'Bác sĩ',
            key: 'doctor',
            dataIndex: 'doctor',
            render: (value) =>{
                return <>{value?.name}</>
              },
              width: 150,
          },
          {
            title: 'Tình trạng cuộc hẹn',
            key: 'status',
            dataIndex: 'status',
            render: (value) =>{
                return <>{value}</>
              },
              width: 150,
          },
      ];

    

    const dataBreadcrumb = [
        {
            title: 'Quản lý cuộc hẹn',
        },
        {
            type: 'separator',
        },
        {
            title: <Link to={'/danh-sach-dang-ky-hen'} >Danh sách đăng ký hẹn</Link>,
        },
        {
            type: 'separator',
        },
        {
            title: 'lịch sử thao tác',
        },
       
    ];
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className="mt-2" >
            <Table<any> rowKey="id" size="small" columns={columns} dataSource={history.length > 0 ? history : []} pagination={false} scroll={{ x: 'max-content' }} />
        </div>
    </Fragment>
}

export default OperationHistory