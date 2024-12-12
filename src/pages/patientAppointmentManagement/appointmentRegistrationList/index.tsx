import { Button, Dropdown, MenuProps, Popover, TableProps, Tag } from "antd";
import moment from "moment";
import { FC, Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck, FaFile, FaHistory } from "react-icons/fa";
import { HiPencilSquare, HiStar } from "react-icons/hi2";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { patiantAPI } from "../../../apis/patient.api";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import Loading from "../../../components/loading";
import NotHospital from "../../../components/notHospital";
import PopconfirmComponent from "../../../components/popconfirmComponent";
import TableComponent from "../../../components/tableComponent";
import { getPagingPatient, setPatient } from "../../../features/patientSlice";
import useClipboard from "../../../hooks/useClipboard";
import useMenuData from "../../../hooks/useMenuData";
import { AppDispatch, RootState } from "../../../redux/store";
import ComponentThongKe from "./componentThongKe";
import ModalSearch from "./modalSearch";
import ModalUpload from "./modalUpload";
import ExportExcel from "../../../components/exportExcel";
import ImportExcel from "../../../components/ImportExcel";


const scrollProps = {
    x: 'calc(700px + 50%)',
    y: 132 * 5
};

const AppointmentRegistrationList: FC = () => {
    const navige = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(25)
    const { data, total, loading } = useSelector((state: RootState) => state.patient);
    const {entities} = useSelector((state: RootState) => state.users)
    const hospitalId = localStorage.getItem('hospitalId')
    let dataFormat: any = []
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const menu = useMenuData();
    const {copyToClipboard} = useClipboard();
    const { t } = useTranslation(['DSDangKyHen']);

    const query = {
        pageSize: pageSize,
        pageIndex: pageIndex,
        hospitalId: Number(hospitalId),
        search: queryParams.get('search') || '',
        doctorId: Number(queryParams.get('doctorId')) || '',
        status: queryParams.get('status') || '',
        departmentId: Number(queryParams.get('departmentId')) || '',
        diseasesId: Number(queryParams.get('diseasesId')) || '',
        mediaId: Number(queryParams.get('mediaId')) || '',
        created_at: queryParams.get('created_at'),
        appointmentTime: queryParams.get('appointmentTime'),
        userId: menu?.[1].ds?.action_DSDKH.viewAllData === true ? '' : entities.id
    };
    
    
    useLayoutEffect(() => {
       if( hospitalId && menu?.[1].ds?.action_DSDKH.viewAllData !== undefined){
            dispatch(getPagingPatient(query))
       }
        
    }, [dispatch, pageSize, pageIndex, hospitalId, menu?.[1].ds?.action_DSDKH.viewAllData, entities.id, location.search])
   
    if (data.length > 0) {
        const formatDataWithSummary = (data: any) => {
            const formattedData: any = [];
            const groupedData = data?.reduce((acc: any, record: any) => {

                // const date = dayjs(record.created_at).format('YYYY-MM-DD');
                const date = moment(record.created_at * 1000).format('DD-MM-YYYY');
                if (!acc[date]) acc[date] = [];
                acc[date].push(record);
                return acc;
            }, {});

            Object.keys(groupedData).forEach((date) => {
                const records = groupedData[date];
                // Thêm hàng tổng kết cho ngày đó
                formattedData.push({
                    key: `${date}-summary`,
                    date,
                    name: `${t("DSDangKyHen:tong_so_ban_ghi_trong_ngay")} ${date} : ${records.length}`, // Hàng tổng kết
                    summary: true, // Dùng để phân biệt hàng tổng kết
                });
                // Thêm các bản ghi của ngày đó
                records.forEach((record: any) => {
                    formattedData.push({ ...record, key: record.id });
                });
            });

            return formattedData;
        };
        dataFormat = formatDataWithSummary(data);
    }

    // useLayoutEffect(() => {
       
    //     if( hospitalId || menu?.[1].ds?.action_DSDKH.viewAllData){
    //         setPageIndex(1);
    //         dispatch(getPagingPatient(query));
    //     }
        
    // }, [location.search, dispatch, pageSize, hospitalId, menu?.[1].ds?.action_DSDKH.viewAllData, entities.id]);


    const dataBreadcrumb = [
        {
            title: t("DSDangKyHen:quan_ly_cuoc_hen"),
        },
        {
            type: 'separator',
        },
        {
            title: t("DSDangKyHen:danh_sach_dang_ky_hen") ,
        },

    ];

    const historyMedical = (data: any) => {
        return <Fragment>
            {
                data.length > 0 && data.map((item: any, index: number) => {
                    return <div key={index} className="flex gap-2 mt-1" >
                        <div>
                            {moment(item.created_at * 1000).format('DD-MM-YYYY HH:mm:ss')}
                        </div>
                        <div>
                            <Tag color="gold" >{item.user.fullName}</Tag>
                        </div>
                        <div>
                            {item.name}
                        </div>
                    </div>
                })
            }

        </Fragment>
    }

    const className = (record: any) => {
        if (record?.status === 'ĐÃ ĐẾN') {
            return 'text-[#389e0d] '
        }
        if (record?.status === 'CHỜ ĐỢI') {
            return 'text-[#c41d7f]'
        }
        if (record?.status === 'KHÔNG XÁC ĐỊNH') {
            return 'text-[#cf1322]'
        }
        if (record?.status === 'CHƯA ĐẾN') {
            return 'text-[#1613cf]'
        }
    }

    const columns: TableProps<any>['columns'] = [
        // {
        //     title: 'STT',
        //     dataIndex: 'id',
        //     key: 'id',
        //     fixed: 'left',
        //     render(value, record, index) {
        //         return <Fragment>
        //             <div className={className(record)} style={{display:"flex", gap:"5px", alignItems:"center" }} >
        //             {index + 1}
        //             {
        //                record.status === 'ĐÃ ĐẾN' ? <FaCheck /> : ''

        //             }
        //             </div>
        //         </Fragment>
        //     },
        //     width: 50,
        //     className:''
        // },
        {
            title: t("DSDangKyHen:ho_va_ten") ,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 150,
            render(value, record, index) {
                const colSpan = record?.summary === true ? 9 : 1;
                return {
                    children: <div style={{ display: "flex", gap: "5px", alignItems: "center" }} className={record?.summary === true ? "bg-orange-400 text-base text-white p-1 " : className(record)}>{value}{record.status === 'ĐÃ ĐẾN' ? <FaCheck /> : ''}</div>,
                    props: { colSpan },
                };
            },
        },
        {
            title:t("DSDangKyHen:chi_phi") ,
            dataIndex: 'money',
            key: 'money',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)} >{value || 0}</div>,
                    props: { colSpan }
                }
            },
            width: 100,
        },
        {
            title:t("DSDangKyHen:gioi_tinh") ,
            dataIndex: 'gender',
            key: 'gender',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <Tag style={{ textTransform: "uppercase" }} color="processing" >{value}</Tag>,
                    props: { colSpan }
                }
            },
            width: 100,
        },
        {
            title: t("DSDangKyHen:tuoi") ,
            dataIndex: 'yearOld',
            key: 'yearOld',
            width: 50,
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)} >{value}</div>,
                    props: { colSpan }
                }
            },
        },
        {
            title: t("DSDangKyHen:so_dien_thoai") ,
            dataIndex: 'phone',
            key: 'phone',
            width: 120,
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)} >{value}</div>,
                    props: { colSpan }
                }
            },
        },
        {
            title:t("DSDangKyHen:ma_chuyen_gia") ,
            dataIndex: 'code',
            key: 'code',
            width: 120,
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)} >{value}</div>,
                    props: { colSpan }
                }
            },
        },
        {
            title: t("DSDangKyHen:khoa"),
            dataIndex: 'department',
            key: 'department',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)} style={{ textTransform: "uppercase" }} >{value?.name}</div>,
                    props: { colSpan }
                }
            },
            width: 150,
        },
        {
            title: t("DSDangKyHen:benh"),
            dataIndex: 'diseases',
            key: 'diseases',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)} style={{ textTransform: "uppercase" }} >{value?.name}</div>,
                    props: { colSpan }
                }
            },
            width: 250,
        },
        {
            title:t("DSDangKyHen:nguon_den") ,
            dataIndex: 'media',
            key: 'media',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)} style={{ textTransform: "uppercase" }} >{value?.name}</div>,
                    props: { colSpan }
                }
            },
            width: 120,
        },
        {
            title: t("DSDangKyHen:tinh/TP") ,
            dataIndex: 'city',
            key: 'city',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)} style={{ textTransform: "uppercase" }} >{value?.name}</div>,
                    props: { colSpan }
                }
            },
            width: 150,
        },
        {
            title: t("DSDangKyHen:quan/huyen"),
            dataIndex: 'district',
            key: 'district',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)} style={{ textTransform: "uppercase" }} >{value?.name}</div>,
                    props: { colSpan }
                }
            },
            width: 150,
        },


        {
            title:t("DSDangKyHen:thoi_gian_hen") ,
            key: 'appointmentTime',
            dataIndex: 'appointmentTime',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)}>{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</div >,
                    props: { colSpan }
                }
            },
            width: 150,
        },
        {
            title:t("DSDangKyHen:thoi_gian_nhac_hen"),
            key: 'reminderTime',
            dataIndex: 'reminderTime',
            width: 150,
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)}>{value !== 0 ? moment(value * 1000).format('DD-MM-YYYY HH:mm:ss') : ''}</div>,
                    props: { colSpan }
                }
            },
        },
        {
            title: t("DSDangKyHen:ghi_chu") ,
            dataIndex: 'note',
            key: 'note',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)}  title={value} // Hiển thị tooltip khi di chuột
                    onClick={() => copyToClipboard(value)}
                    style={{ cursor: "pointer", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", textDecoration: "underline", }} >{value}</div>,
                    props: { colSpan }
                }
            },
            width: 100,
        },
        {
            title: t("DSDangKyHen:sua_thoi_gian_dang_ky"),
            dataIndex: 'editregistrationTime',
            key: 'editregistrationTime',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)} >{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</div  >,
                    props: { colSpan }
                }
            },
            width: 160,
        },
        {
            title: t("DSDangKyHen:bac_si") ,
            dataIndex: 'doctor',
            key: 'doctor',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)} style={{ textTransform: "uppercase" }} >{value?.name}</div>,
                    props: { colSpan }
                }
            },
            width: 120,
        },
        {
            title: t("DSDangKyHen:trang_thai") ,
            dataIndex: 'status',
            key: 'status',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                const children = colSpan === 0 ? null : (() => {
                    if (value === 'CHỜ ĐỢI') {
                        return <Tag style={{ textTransform: "uppercase" }} color="magenta">{value}</Tag>;
                    } else if (value === 'ĐÃ ĐẾN') {
                        return <Tag style={{ textTransform: "uppercase" }} color="green">{value}</Tag>;
                    } else if (value === 'CHƯA ĐẾN') {
                        return <Tag style={{ textTransform: "uppercase" }} color="#1613cf">{value}</Tag>;
                    } else if (value === 'KHÔNG XÁC ĐỊNH') {
                        return <Tag style={{ textTransform: "uppercase" }} color="red">{value}</Tag>;
                    }
                    return null;
                })();

                return {
                    children,
                    props: { colSpan },
                };

            },
            width: 130,
        },
        {
            title:t("DSDangKyHen:nguoi_them") ,
            dataIndex: 'user',
            key: 'user',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)} style={{ textTransform: "uppercase" }} >{value?.fullName}</div>,
                    props: { colSpan }
                }
            },
            width: 120,
        },
        {
            title:t("DSDangKyHen:ho_so_tham_kham") ,
            dataIndex: 'chatPatients',
            key: 'chatPatients',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className="flex items-center justify-center cursor-pointer " >
                        {
                            value?.length > 0 ? <Popover content={historyMedical(value)} title="Lịch sử thăm khám">
                                <HiStar size={20} color="red" />
                            </Popover> : ''
                        }

                    </div>,
                    props: { colSpan }
                }
            },
            width: 130,
        },
        {
            title: t("DSDangKyHen:ngay_tao"),
            dataIndex: 'created_at',
            key: 'created_at',
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                return {
                    children: <div className={className(record)}>{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</div >,
                    props: { colSpan }
                }
            },
            width: 150,
        },
        {
            title: t("DSDangKyHen:thao_tac"),
            key: 'id',
            dataIndex: 'id',
            fixed: 'right',
            width: 80,
            render(value, record, index) {
                const colSpan = record?.summary === true ? 0 : 1;
                const items: MenuProps['items'] = [

                    {
                        key: '1',
                        label: (
                            <div onClick={() => onClickView(value)} className='flex items-center cursor-pointer'>
                                <FaFile className='text-fuchsia-500' size={20} />
                                <span className='ml-2'>{t("DSDangKyHen:xem_chi_tiet")}</span>
                            </div>
                        )
                    },
                    {
                        key: '2',
                        label: (
                            <div className='flex items-center cursor-pointer'>
                                <ModalUpload id={value} />
                            </div>
                        )
                    },
                    menu?.[1].ds?.action_DSDKH.see === true ?
                        {
                            key: '3',
                            label: (
                                <div onClick={() => { onClickHistory(value) }} className='flex items-center cursor-pointer'>
                                    <FaHistory className='cursor-pointer ' size={22} />
                                    <span className='ml-2'>{t("DSDangKyHen:lich_su_thao_tac")}</span>
                                </div>
                            )
                        } : null,
                    menu?.[1].ds?.action_DSDKH.update === true ?
                        {
                            key: '4',
                            label: (
                                <div onClick={() => onClickEdit(value)} className='flex items-center cursor-pointer'>
                                    <HiPencilSquare className='cursor-pointer text-green-700 ' color='primary' size={25} />
                                    <span className='ml-2'>{t("DSDangKyHen:cap_nhat")}</span>
                                </div>
                            )
                        } : null,
                    menu?.[1].ds?.action_DSDKH.delete === true ?
                        {
                            key: '5',
                            label: (
                                <div className='flex items-center cursor-pointer'>
                                    <PopconfirmComponent
                                        title={<>{t("DSDangKyHen:xoa")} {record.name}</>}
                                        description={t("DSDangKyHen:ban_co_chac_chan_muon_xoa_khach_hang_nay_không")}
                                        value={value}
                                        deleteRole={deletePatient}
                                        text={t("DSDangKyHen:xoa")}
                                    />
                                </div>
                            )
                        } : null,


                ];
                return {
                    children: <div className='flex items-center justify-center ' >
                        <Dropdown menu={{ items }}>
                            <IoSettingsSharp className='cursor-pointer ' size={23} />
                        </Dropdown>

                    </div>,
                    props: { colSpan }
                }
            },
        },
    ];


    const onClickHistory = (id: number) => {
        navige(`/danh-sach-dang-ky-hen/history/${id}`)
    }

    const onClickView = (id: number) => {
        navige(`/danh-sach-dang-ky-hen/view/${id}`);
    }

    const onClickCreate = () => {
        navige('/danh-sach-dang-ky-hen/them-moi');
        dispatch(setPatient({}))
    }

    const onClickEdit = (id: number) => {
        navige(`/danh-sach-dang-ky-hen/cap-nhat/${id}`);
    }

    const deletePatient = async (id: any) => {
        try {
            const result = await patiantAPI.deletePatiant(id)
            if (result.data.statusCode === 1) {
                toast.success('Xóa thành công!')
                dispatch(getPagingPatient(query))
            }
        } catch (error) {
            console.log(error);
            toast.warning('khách hàng đã có hố sơ thăm khám!')
        }
    }


    const onChangePage = (page: number, pageSize: number) => {
        setPageIndex(page)
        setPageSize(pageSize)
    }

    return <Fragment>
        
        {
            hospitalId ?
                <Fragment>
                    <BreadcrumbComponent items={dataBreadcrumb} />
                    <div className='mt-2 pb-2 flex justify-between gap-2 ' >
                        <ComponentThongKe />
                        <div className="flex gap-3 w-[20%] justify-end ">
                            <ImportExcel getPagingPatient = {getPagingPatient(query)} />
                            <ExportExcel csvData={[]} fileName="file_mau" headers={['Họ và tên', 'Giới tính', 'Nhập tuổi','Nhập số điện thoại','Nội dung tư vấn','Mã chuyên gia','Mục điều trị', 'Thời gian hẹn (dd/mm/yyyy)', 'Thời gian nhắc hẹn (dd/mm/yyyy)', 'Ghi chú', 'Sửa thời gian đăng ký (dd/mm/yyyy)', 'Trạng thái','Nội dung tiếp nhận','Nhập hồ sơ thăm khám']} />
                            <ModalSearch setPageIndex={setPageIndex} />
                            {
                                menu?.[1].ds?.action_DSDKH.create === true ? <Button size="middle" onClick={onClickCreate} type="primary">{t("DSDangKyHen:them_moi")}</Button> : ''
                            }

                        </div>

                    </div>
                    {
                        loading === 'succeeded' ? <TableComponent rowKey={false} columns={columns} data={dataFormat} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} scroll={scrollProps} /> : <Loading />
                    }
                </Fragment> : <NotHospital />}
    </Fragment>
}

export default AppointmentRegistrationList