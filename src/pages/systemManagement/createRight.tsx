import { Alert, Button, Checkbox, CheckboxProps, Input } from 'antd';
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import BreadcrumbComponent from "../../components/breadcrumbComponent";

const dataBreadcrumb = [
    {
        title: 'Quản lý hệ thống',
    },
    {
        type: 'separator',
    },
    {
        href: '/quan-ly-quyen',
        title: 'Quản lý quyền',
    },
    {
        type: 'separator',
    },
    {
        title: 'Thêm quyền',
    },
];

const CreateRight: FC = () => {
    const [form, setForm] = useState<any[]>([
        {
            home: false
        },
        {
            QLBN: false,
            ds: {
                DSDKH: false,
                action_DSDKH: {
                    create: false,
                    update: false,
                    delete: false,
                    see: false
                },
                CHTKBN: false,
                LLTVBN: false,
                BCCTDVKH: false,
                BCXHHT: false,
                BCDHTC: false,
                XDLBN: false,
                SSDLTCN: false,
            }
        },
        {
            TKKTC: false,
            ds: {
                CTDLM: false,
                CDDABVM: false,
                action_CDDABVM: {
                    create: false,
                    update: false,
                    delete: false,
                },
                CTDLDT: false,
                CDDABVDT: false,
                action_CDDABVDT: {
                    create: false,
                    update: false,
                    delete: false,
                }
            }
        },
        {
            BCDL:false,
            ds: {
                BCTH: false,
                GT: false,
                TUOI: false,
                LBN: false,
                NTT: false,
                TTNV: false,
                BSLT: false,
                DVKH: false,
            }
        }
    ])
    const [name, setName] = useState<string>('')
    const [nameErr, setNameErr] = useState<'' | 'error' | 'warning' | undefined>('');

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        setNameErr('')
    }

    const onclickCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if(name === '') {
            return (
                setNameErr('error'),
                toast.error('Tên quyền không được bỏ trống!')
            )
        }
    }

    const onChangeHome: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[] ) =>
            {
                const updatedForm = [...prevForm]; 
                updatedForm[0].home = checked;
                return updatedForm; 
            }
        );
    }

    // Quản lý bệnh nhân
    const onChangeQLBN: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = checked;
            updatedForm[1].ds.DSDKH = checked; 
            updatedForm[1].ds.CHTKBN = checked; 
            updatedForm[1].ds.LLTVBN = checked; 
            updatedForm[1].ds.BCCTDVKH = checked; 
            updatedForm[1].ds.BCXHHT = checked; 
            updatedForm[1].ds.BCDHTC = checked; 
            updatedForm[1].ds.XDLBN = checked; 
            updatedForm[1].ds.SSDLTCN = checked; 
            updatedForm[1].ds.action_DSDKH.create = checked; 
            updatedForm[1].ds.action_DSDKH.update = checked; 
            updatedForm[1].ds.action_DSDKH.delete = checked; 
            updatedForm[1].ds.action_DSDKH.see = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSDKH: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = checked; 
            updatedForm[1].ds.action_DSDKH.create = checked; 
            updatedForm[1].ds.action_DSDKH.update = checked; 
            updatedForm[1].ds.action_DSDKH.delete = checked; 
            updatedForm[1].ds.action_DSDKH.see = checked; 
            return updatedForm; 
        });

    }

    const onChangeDSDKHCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = true; 
            updatedForm[1].ds.action_DSDKH.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSDKHUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = true;
            updatedForm[1].ds.action_DSDKH.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSDKHDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = true;
            updatedForm[1].ds.action_DSDKH.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSDKHSee: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = true;
            updatedForm[1].ds.action_DSDKH.see = checked; 
            return updatedForm; 
        });
    }

    const onChangeCHTKBN: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.CHTKBN = checked; 
            return updatedForm; 
        });
    }

    const onChangeLLTVBN: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.LLTVBN = checked; 
            return updatedForm; 
        });
    }

    const onChangeBCCTDVKH: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.BCCTDVKH = checked; 
            return updatedForm; 
        });
    }

    const onChangeBCXHHT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.BCXHHT = checked; 
            return updatedForm; 
        });
    }

    const onChangeBCDHTC: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.BCDHTC = checked; 
            return updatedForm; 
        });
    }

    const onChangeXDLBN: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.XDLBN = checked; 
            return updatedForm; 
        });
    }

    const onChangeSSDLTCN: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.SSDLTCN = checked; 
            return updatedForm; 
        });
    }

    // Thống kê khách truy cập

    const onChangeTKKTC: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[2].TKKTC = checked; 
            updatedForm[2].ds.CTDLM = checked; 
            updatedForm[2].ds.CDDABVM = checked; 
            updatedForm[2].ds.action_CDDABVM.create = checked; 
            updatedForm[2].ds.action_CDDABVM.update = checked; 
            updatedForm[2].ds.action_CDDABVM.delete = checked; 
            updatedForm[2].ds.CTDLDT = checked; 
            updatedForm[2].ds.CDDABVDT = checked; 
            updatedForm[2].ds.action_CDDABVDT.create = checked; 
            updatedForm[2].ds.action_CDDABVDT.update = checked; 
            updatedForm[2].ds.action_CDDABVDT.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeCTDLM: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[2].TKKTC = true; 
            updatedForm[2].ds.CTDLM = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDDABVM: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[2].TKKTC = true; 
            updatedForm[2].ds.CDDABVM = checked; 
            updatedForm[2].ds.action_CDDABVM.create = checked; 
            updatedForm[2].ds.action_CDDABVM.update = checked; 
            updatedForm[2].ds.action_CDDABVM.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeActionCDDABVMCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[2].TKKTC = true; 
            updatedForm[2].ds.CDDABVM = true; 
            updatedForm[2].ds.action_CDDABVM.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeActionCDDABVMUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[2].TKKTC = true; 
            updatedForm[2].ds.CDDABVM = true; 
            updatedForm[2].ds.action_CDDABVM.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeActionCDDABVMDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[2].TKKTC = true; 
            updatedForm[2].ds.CDDABVM = true; 
            updatedForm[2].ds.action_CDDABVM.delete = checked; 
            return updatedForm; 
        });
    }

    //
    const onChangeCTDLDT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[2].TKKTC = true; 
            updatedForm[2].ds.CTDLDT = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDDABVDT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[2].TKKTC = true; 
            updatedForm[2].ds.CDDABVDT = checked; 
            updatedForm[2].ds.action_CDDABVDT.create = checked; 
            updatedForm[2].ds.action_CDDABVDT.update = checked; 
            updatedForm[2].ds.action_CDDABVDT.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeActionCDDABVDTCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[2].TKKTC = true; 
            updatedForm[2].ds.CDDABVDT = true; 
            updatedForm[2].ds.action_CDDABVDT.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeActionCDDABVDTUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[2].TKKTC = true; 
            updatedForm[2].ds.CDDABVDT = true; 
            updatedForm[2].ds.action_CDDABVDT.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeActionCDDABVDTDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[2].TKKTC = true; 
            updatedForm[2].ds.CDDABVDT = true; 
            updatedForm[2].ds.action_CDDABVDT.delete = checked; 
            return updatedForm; 
        });
    }

    console.log(form);
    
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <Alert className="mt-2" message={
            <div>
                <div>Gợi ý:</div>
                <ul style={{ listStyle: 'inside' }} >
                    <li>Hãy cẩn thận khi phân bổ quyền cho mục "Quản lý hệ thống". Những người không quen với hệ thống có thể tùy ý thiết lập hệ thống, gây ra sự cố nghiêm trọng và khiến hệ thống không thể sử dụng được.</li>
                    <li>Cột "Nhật ký hệ thống" liên quan đến dữ liệu vận hành quan trọng của hệ thống và yêu cầu phân bổ quyền cẩn thận.</li>
                </ul>
            </div>
        } type="warning" />
        <table className="border-collapse border border-slate-400 mt-2">
            <thead>
                <tr>
                    <th colSpan={4} className="border border-slate-300 text-lg ">Cài đặt quyền</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={1} className="text-right">Tên quyền :</td>
                    <td colSpan={3} className="">
                        <Input status={nameErr} onChange={handleChangeName} className="w-[300px]" placeholder="Nhập tên quyền" />
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]" >
                    <td colSpan={1} rowSpan={50} className="border border-slate-300 text-right">Chi tiết quyền:</td>
                </tr>
                <tr>
                    <td  colSpan={4} className="border border-slate-300">
                        <Button color="primary" variant="solid"> Chọn tất cả </Button>
                        <Button className="ml-2" color="danger" variant="outlined" > Bỏ chọn </Button>
                        <Button className="ml-2" color="primary" variant="outlined"> Trở lại </Button>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td  colSpan={4} className="border border-slate-300 ..."> <Checkbox onChange={onChangeHome} checked={form[0].home} >Trang đầu</Checkbox></td>
                </tr>
                <tr >
                    <td rowSpan={9}  className="border border-slate-300 ...">
                    <Checkbox onChange={onChangeQLBN} 
                    checked={form[1].QLBN} 
                    >Quản lý bệnh nhân</Checkbox></td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeDSDKH} checked={form[1].ds.DSDKH} >Danh sách đăng ký hẹn</Checkbox>
                    </td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeDSDKHCreate} checked={form[1].ds.action_DSDKH.create} >Thêm mới</Checkbox>
                        <Checkbox onChange={onChangeDSDKHUpdate} checked={form[1].ds.action_DSDKH.update} >Cập nhật</Checkbox>
                        <Checkbox onChange={onChangeDSDKHDelete} checked={form[1].ds.action_DSDKH.delete}>Xóa</Checkbox>
                        <Checkbox onChange={onChangeDSDKHSee} checked={form[1].ds.action_DSDKH.see}>Xem</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeCHTKBN} checked={form[1].ds.CHTKBN} >Cuộc hẹn tìm kiếm bệnh nhân</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeLLTVBN} checked={form[1].ds.LLTVBN} >Lặp lại truy vấn bệnh nhân</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeBCCTDVKH} checked={form[1].ds.BCCTDVKH} >Báo cáo chi tiết dịch vụ khách hàng</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeBCXHHT} checked={form[1].ds.BCXHHT}>báo cáo xu hướng hàng tháng</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeBCDHTC} checked={form[1].ds.BCDHTC}>Báo cáo đồ họa tùy chỉnh</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeXDLBN} checked={form[1].ds.XDLBN}>Xuất dữ liệu bệnh nhân</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeSSDLTCN} checked={form[1].ds.SSDLTCN} >So sánh dữ liệu theo chiều ngang</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]" >
                    <td rowSpan={5}  className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeTKKTC} checked={form[2].TKKTC} >Thống kê khách truy cập</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeCTDLM} checked={form[2].ds.CTDLM}  >Chi tiết dữ liệu (mạng)</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td  className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeCDDABVM} checked={form[2].ds.CDDABVM} >Cài đặt dự án bệnh viện (mạng)</Checkbox>
                    </td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeActionCDDABVMCreate} checked={form[2].ds.action_CDDABVM.create} >Thêm mới</Checkbox>
                        <Checkbox onChange={onChangeActionCDDABVMUpdate} checked={form[2].ds.action_CDDABVM.update}>Cập nhật</Checkbox>
                        <Checkbox onChange={onChangeActionCDDABVMDelete} checked={form[2].ds.action_CDDABVM.delete}>Xóa</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeCTDLDT} checked={form[2].ds.CTDLDT}>Chi tiết dữ liệu (số điện thoại)</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeCDDABVDT} checked={form[2].ds.CDDABVDT} >Cài đặt dự án bệnh viện (điện thoại)</Checkbox>
                    </td>
                    <td className="border border-slate-300 ..." >
                    <Checkbox onChange={onChangeActionCDDABVDTCreate} checked={form[2].ds.action_CDDABVDT.create} >Thêm mới</Checkbox>
                        <Checkbox onChange={onChangeActionCDDABVDTUpdate} checked={form[2].ds.action_CDDABVDT.update}>Cập nhật</Checkbox>
                        <Checkbox onChange={onChangeActionCDDABVDTDelete} checked={form[2].ds.action_CDDABVDT.delete}>Xóa</Checkbox>
                    </td>
                </tr>

                <tr>
                    <td rowSpan={9}  className="border border-slate-300 ..." ><Checkbox >Báo cáo dữ liệu</Checkbox></td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox >Báo cáo tổng hợp</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox >giới tính</Checkbox></td>
                    
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox >tuổi</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox >Loại bệnh nhân</Checkbox></td>
                    
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox >nguồn truyền thông</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox >tình trạng nhập viện</Checkbox></td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox >Bác sĩ lễ tân</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox >dịch vụ khách hàng</Checkbox></td>
                </tr>


                <tr className="bg-[#f2f2f2]">
                    <td rowSpan={6}  className="border border-slate-300 ..." ><Checkbox >cài đặt</Checkbox></td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." ><Checkbox >Cài đặt bác sĩ</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox >Thêm mới</Checkbox>
                        <Checkbox >Cập nhật</Checkbox>
                        <Checkbox >Xóa</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox >thiết lập bệnh tật</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox >Thêm mới</Checkbox>
                        <Checkbox >Cập nhật</Checkbox>
                        <Checkbox >Xóa</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." ><Checkbox >Cài đặt loại điều trị y tế</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox >Thêm mới</Checkbox>
                        <Checkbox >Cập nhật</Checkbox>
                        <Checkbox >Xóa</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox >Cài đặt khoa bệnh viện</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox >Thêm mới</Checkbox>
                        <Checkbox >Cập nhật</Checkbox>
                        <Checkbox >Xóa</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." ><Checkbox >Cài đặt công cụ tìm kiếm</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox >Thêm mới</Checkbox>
                        <Checkbox >Cập nhật</Checkbox>
                        <Checkbox >Xóa</Checkbox>
                    </td>
                </tr>


                <tr >
                    <td rowSpan={4}  className="border border-slate-300 ..." ><Checkbox >thông tin của tôi</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox >Sửa đổi thông tin của tôi</Checkbox></td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox >Thay đổi mật khẩu</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox >Cài đặt tùy chọn</Checkbox></td>
                </tr>


                <tr className="bg-[#f2f2f2]">
                    <td rowSpan={5}  className="border border-slate-300 ..." ><Checkbox >Quản lý hệ thống</Checkbox></td>
                </tr>
                <tr>
                    <td  className="border border-slate-300 ..." ><Checkbox >quản lý con người</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox >Thêm mới</Checkbox>
                        <Checkbox >Cập nhật</Checkbox>
                        <Checkbox >Xóa</Checkbox>
                        <Checkbox >Xem</Checkbox>
                        <Checkbox >Đóng</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox >Quản lý quyền</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox >Thêm mới</Checkbox>
                        <Checkbox >Cập nhật</Checkbox>
                        <Checkbox >Xóa</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." ><Checkbox >Danh sách bệnh viện</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox >Thêm mới</Checkbox>
                        <Checkbox >Cập nhật</Checkbox>
                        <Checkbox >Xóa</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox >Quản lý thông báo</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox >Thêm mới</Checkbox>
                        <Checkbox >Cập nhật</Checkbox>
                        <Checkbox >Xóa</Checkbox>
                        <Checkbox >Đóng</Checkbox>
                    </td>
                </tr>

                <tr>
                    <td rowSpan={3}  className="border border-slate-300 ..." ><Checkbox >Lịch sử thao tác</Checkbox></td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." ><Checkbox >Nhật ký hoạt động</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox >Xóa</Checkbox>
                        <Checkbox >Xem</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox >Nhật ký lỗi đăng nhập</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox >Xóa</Checkbox>
                    </td>
                </tr>
            </tbody>
            
        </table>
        <div className="flex items-center justify-center mt-2 " >
            <Button onClick={onclickCreate} color="primary" variant="solid" >Thêm mới</Button>
        </div>
    </Fragment>
}

export default CreateRight