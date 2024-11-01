import { FC, Fragment, useEffect } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getByIdPatient } from "../../../features/patientSlice";
import { Button, Form, Tag } from "antd";
import moment from "moment";

const AppointmentRegistrationListHistory: FC = () => {
    const navige = useNavigate()
    let { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { patient } = useSelector((state: RootState) => state.patient);

    useEffect(() => {
        if (id) {
            dispatch(getByIdPatient(Number(id)))
        }
    }, [id, dispatch])

    const dataBreadcrumb = [
        {
            title: 'Quản lý cuộc hẹn',
        },
        {
            type: 'separator',
        },
        {
            title: <Link to={'/danh-sach-dang-ky-hen'}>Danh sách đăng ký hẹn</Link>,
        },
        {
            type: 'separator',
        },
        {
            title: 'Thông tin bệnh nhân',
        },

    ];

    const onClickPrev = () => {
        navige('/danh-sach-dang-ky-hen');
    }
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        {
            patient ?

                <div className="flex w-[100%] border-2 border-indigo-600  border-solid  rounded mt-2" >
                    <div className="border-r-2 w-[25%] border-indigo-600 ">
                        <div className="bg-indigo-600 text-center text-lg text-white p-1 border-b-2 border-indigo-600 " >
                            Thông tin cơ bản
                        </div>
                        <div className="" >
                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " >  Họ và tên:</div> <span className="text-red-500" >{patient?.name}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >  Giới tính:</div> <span className="text-red-500" >{patient?.gender}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " >  Tuổi: </div> <span className="text-red-500" >{patient?.yearOld}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >   Điện thoại: </div> <span className="text-red-500" >{patient?.phone}</span>
                            </div>

                           

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " >   khoa: </div> <span className="text-red-500" >{patient?.department?.name}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >
                                    Bệnh: </div> <span className="text-red-500" >{patient?.diseases?.name}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200  flex gap-1 " >
                                <div className="w-[40%] text-right " >   Nguồn đến: </div> <span className="text-red-500" >{patient?.media?.name}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >
                                    Tỉnh/TP: </div> <span className="text-red-500" >{patient?.city?.name}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " >   Quận/huyện: </div> <span className="text-red-500" >{patient?.district?.name}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >
                                    Mã chuyên gia: </div> <span className="text-red-500" >{patient?.code}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " >   Mục điều trị: </div> <div className="text-red-500 flex gap-1 " >{patient?.treatment && JSON.parse(patient?.treatment)?.map((item: any, index: number) => {
                                    return <Tag color="cyan" key={index} >
                                        {item}
                                    </Tag>
                                })}</div>
                            </div>
                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >
                                    Thời gian hẹn: </div> <span className="text-red-500" >{moment(patient?.appointmentTime * 1000).format('DD-MM-YYYY HH:mm:ss')}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " >   Thời gian nhắc hẹn: </div> <span className="text-red-500" >{moment(patient?.reminderTime * 1000).format('DD-MM-YYYY HH:mm:ss')}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >
                                Ghi chú: </div> <span className="text-red-500" >{patient?.note}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " >   Sửa đổi thời gian đăng ký: </div> <span className="text-red-500" >{moment(patient?.editregistrationTime * 1000).format('DD-MM-YYYY HH:mm:ss')}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >
                                Trạng thái: </div> <span className="text-red-500" >{patient?.status}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " >   Bác sĩ tiếp bệnh: </div> <span className="text-red-500" >{patient?.doctor?.name}</span>
                            </div>

                            <div className=" text-base text-black p-1  flex gap-1 " >
                                <div className="w-[40%] text-right " >
                                Ngươi thêm: </div> <span className="text-red-500" >{patient?.user?.fullName}</span>
                            </div>

                            <div className=" text-base text-black p-1 bg-slate-200 flex gap-1 " >
                                <div className="w-[40%] text-right " >   Phòng: </div> <span className="text-red-500" >{patient?.user?.role?.name}</span>
                            </div>

                        </div>
                    </div>
                    <div className="border-r-2 w-[25%] border-indigo-600  ">
                        <div className="bg-indigo-600 text-center text-lg text-white p-1 border-b-2 border-indigo-600 " >
                            Lịch sử trò chuyện
                        </div>
                        <div className="text-base text-black p-1" >
                            {patient?.content}
                        </div>
                    </div>
                    <div className="border-r-2 w-[25%] border-indigo-600  ">
                        <div className="bg-indigo-600 text-center text-lg text-white p-1 border-b-2 border-indigo-600 " >
                            Hồ sơ thăm lại
                        </div>
                        <div className="p-1" >
                        {
                            patient?.chatPatients?.map((item: any, index: number) => {
                                return <div key={index} className="flex gap-2 mt-1" >
                                <div>
                                    {moment(item.created_at* 1000).format('DD-MM-YYYY HH:mm:ss')}
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
                        </div>
                    </div>
                    <div className=" w-[25%]  ">
                        <div className="bg-indigo-600 text-center text-lg text-white p-1 border-b-2 border-indigo-600 " >
                            Bình luận
                        </div>
                        <div className="text-base text-black p-1" >
                            {patient?.note}
                        </div>
                    </div>
                </div>
                : ''}

            <div className="mt-2" >
                <Button onClick={onClickPrev} variant="outlined" color="danger" > Quay lại </Button>
            </div>
    </Fragment>
}

export default AppointmentRegistrationListHistory;