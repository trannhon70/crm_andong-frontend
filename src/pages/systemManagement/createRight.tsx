import { Alert, Button, Checkbox, CheckboxProps, Input } from 'antd';
import { FC, Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { rolesAPI } from '../../apis/roles.api';
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchGetById } from '../../features/rolesSlice';



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
        },
        {
            CD:false,
            ds:{
                CDBS: false,
                action_CDBS:{
                    create: false,
                    update: false,
                    delete: false,
                },
                TLBT:false,
                action_TLBT:{
                    create: false,
                    update: false,
                    delete: false,
                },
                CDLDTYT:false,
                action_CDLDTYT:{
                    create: false,
                    update: false,
                    delete: false,
                },
                CDKBV:false,
                action_CDKBV:{
                    create: false,
                    update: false,
                    delete: false,
                },
                CDCCTK:false,
                action_CDCCTK:{
                    create: false,
                    update: false,
                    delete: false,
                }
            }
        },
        {
            TTCT: false,
            ds:{
                SDTTCT: false,
                TDMK: false,
                CDTC: false,
            }
        },
        {
            QLHT: false,
            ds:{
                QLCN: false,
                action_QLCN: {
                    create: false,
                    update: false,
                    delete: false,
                    see: false,
                    close: false,
                },
                QLQ: false,
                action_QLQ: {
                    create: false,
                    update: false,
                    delete: false,
                    
                },
                DSBV: false,
                action_DSBV: {
                    create: false,
                    update: false,
                    delete: false,
                },
                QLTB: false,
                action_QLTB: {
                    create: false,
                    update: false,
                    delete: false,
                    close: false,
                },
            }
        },
        {
            LSTT: false,
            ds:{ 
                NKHD: false,
                action_NKHD: {
                    delete: false,
                    see: false,
                },
                NKLDN: false,
                action_NKLDN: {
                    delete: false,
                }
            }
        }
    ])
    const [name, setName] = useState<string>('')
    const [nameErr, setNameErr] = useState<'' | 'error' | 'warning' | undefined>('');
    const navige = useNavigate()
    let { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { role } = useSelector((state: RootState) => state.roles);
    
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
            title: <>{id ? 'Cập nhật': 'Thêm quyền'}</>,
        },
    ];

    useEffect(() =>{ 
        if(id){
            dispatch(fetchGetById(Number(id)))
           
        }
    
    }, [id])

    useEffect(() => {
        if(role.menu){
            setName(role.name);
            setForm(JSON.parse(role.menu))
        }
    }, [role.menu])

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        setNameErr('')
    }

    const onclickCreate = async(e: React.FormEvent) => {
        e.preventDefault();
        if(name === '') {
            return (
                setNameErr('error'),
                toast.error('Tên quyền không được bỏ trống!')
            )
        }
        try {
            const body = {
                name: name,
                menu: JSON.stringify(form)
            }
            const result = await rolesAPI.create(body)
            if(result.data.statusCode === 1){
                toast.success('Thêm mới thành công!');
                navige('/quan-ly-quyen')
            }
            console.log(result, 'ress');
        } catch (error: any) {
            if(error.response.data.message === "Tên quyền đã được đăng ký, vui lòng đăng ký tên khác!"){
                toast.error("Tên quyền đã được đăng ký, vui lòng đăng ký tên khác!")
            }
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

    //báo cáo dữ liệu
    const onChangeBCDL: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = checked; 
            updatedForm[3].ds.BCTH = checked; 
            updatedForm[3].ds.GT = checked; 
            updatedForm[3].ds.TUOI = checked; 
            updatedForm[3].ds.LBN = checked; 
            updatedForm[3].ds.NTT = checked; 
            updatedForm[3].ds.TTNV = checked; 
            updatedForm[3].ds.BSLT = checked; 
            updatedForm[3].ds.DVKH = checked; 
            return updatedForm; 
        });
    }

    const onChangeBCTH: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.BCTH = checked; 
            return updatedForm; 
        });
    }

    const onChangeGT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.GT = checked; 
            return updatedForm; 
        });
    }

    const onChangeTUOI: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.TUOI = checked; 
            return updatedForm; 
        });
    }

    const onChangeLBN: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.LBN = checked; 
            return updatedForm; 
        });
    }

    const onChangeNTT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.NTT = checked; 
            return updatedForm; 
        });
    }

    const onChangeTTNV: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.TTNV = checked; 
            return updatedForm; 
        });
    }

    const onChangeBSLT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.BSLT = checked; 
            return updatedForm; 
        });
    }

    const onChangeDVKH: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.DVKH = checked; 
            return updatedForm; 
        });
    }

    //cài đặt

    const onChangeCD: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = checked; 
            updatedForm[4].ds.CDBS = checked; 
            updatedForm[4].ds.action_CDBS.create = checked; 
            updatedForm[4].ds.action_CDBS.update = checked; 
            updatedForm[4].ds.action_CDBS.delete = checked; 

            updatedForm[4].ds.TLBT = checked; 
            updatedForm[4].ds.action_TLBT.create = checked; 
            updatedForm[4].ds.action_TLBT.update = checked; 
            updatedForm[4].ds.action_TLBT.delete = checked;

            updatedForm[4].ds.CDLDTYT = checked; 
            updatedForm[4].ds.action_CDLDTYT.create = checked; 
            updatedForm[4].ds.action_CDLDTYT.update = checked; 
            updatedForm[4].ds.action_CDLDTYT.delete = checked;

            updatedForm[4].ds.CDKBV = checked; 
            updatedForm[4].ds.action_CDKBV.create = checked; 
            updatedForm[4].ds.action_CDKBV.update = checked; 
            updatedForm[4].ds.action_CDKBV.delete = checked;

            updatedForm[4].ds.CDCCTK = checked; 
            updatedForm[4].ds.action_CDCCTK.create = checked; 
            updatedForm[4].ds.action_CDCCTK.update = checked; 
            updatedForm[4].ds.action_CDCCTK.delete = checked;
            return updatedForm; 
        });
    }

    const onChangeCDBS: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDBS = checked; 
            updatedForm[4].ds.action_CDBS.create = checked; 
            updatedForm[4].ds.action_CDBS.update = checked; 
            updatedForm[4].ds.action_CDBS.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDBSCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDBS = true; 
            updatedForm[4].ds.action_CDBS.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDBSUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDBS = true; 
            updatedForm[4].ds.action_CDBS.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDBSDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDBS = true; 
            updatedForm[4].ds.action_CDBS.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeTLBT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.TLBT = checked; 
            updatedForm[4].ds.action_TLBT.create = checked; 
            updatedForm[4].ds.action_TLBT.update = checked; 
            updatedForm[4].ds.action_TLBT.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeTLBTCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.TLBT = true; 
            updatedForm[4].ds.action_TLBT.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeTLBTUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.TLBT = true; 
            updatedForm[4].ds.action_TLBT.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeTLBTDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.TLBT = true; 
            updatedForm[4].ds.action_TLBT.delete = checked; 
            return updatedForm; 
        });
    }

    //
    const onChangeCDLDTYT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDLDTYT = checked; 
            updatedForm[4].ds.action_CDLDTYT.create = checked; 
            updatedForm[4].ds.action_CDLDTYT.update = checked; 
            updatedForm[4].ds.action_CDLDTYT.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDLDTYTCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDLDTYT = true; 
            updatedForm[4].ds.action_CDLDTYT.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDLDTYTUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDLDTYT = true; 
            updatedForm[4].ds.action_CDLDTYT.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDLDTYTDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDLDTYT = true; 
            updatedForm[4].ds.action_CDLDTYT.delete = checked; 
            return updatedForm; 
        });
    }

    //

    const onChangeCDKBV: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDKBV = checked; 
            updatedForm[4].ds.action_CDKBV.create = checked; 
            updatedForm[4].ds.action_CDKBV.update = checked; 
            updatedForm[4].ds.action_CDKBV.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDKBVCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDKBV = true; 
            updatedForm[4].ds.action_CDKBV.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDKBVUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDKBV = true; 
            updatedForm[4].ds.action_CDKBV.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDKBVDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDKBV = true; 
            updatedForm[4].ds.action_CDKBV.delete = checked; 
            return updatedForm; 
        });
    }

    //

    const onChangeCDCCTK: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDCCTK = checked; 
            updatedForm[4].ds.action_CDCCTK.create = checked; 
            updatedForm[4].ds.action_CDCCTK.update = checked; 
            updatedForm[4].ds.action_CDCCTK.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDCCTKCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDCCTK = true; 
            updatedForm[4].ds.action_CDCCTK.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDCCTKUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDCCTK = true; 
            updatedForm[4].ds.action_CDCCTK.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDCCTKDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDCCTK = true; 
            updatedForm[4].ds.action_CDCCTK.delete = checked; 
            return updatedForm; 
        });
    }

    //thông tin cá nhân

    const onChangeTTCT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[5].TTCT = checked; 
            updatedForm[5].ds.SDTTCT = checked; 
            updatedForm[5].ds.TDMK = checked; 
            updatedForm[5].ds.CDTC = checked; 
            return updatedForm; 
        });
    }

    const onChangeSDTTCT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[5].TTCT = true; 
            updatedForm[5].ds.SDTTCT = checked; 
            return updatedForm; 
        });
    }

    const onChangeTDMK: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[5].TTCT = true; 
            updatedForm[5].ds.TDMK = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDTC: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[5].TTCT = true; 
            updatedForm[5].ds.CDTC = checked; 
            return updatedForm; 
        });
    }

    //Quản lý hệ thống

    const onChangeQLHT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = checked; 
            updatedForm[6].ds.QLCN = checked; 
            updatedForm[6].ds.action_QLCN.create = checked; 
            updatedForm[6].ds.action_QLCN.update = checked; 
            updatedForm[6].ds.action_QLCN.delete = checked; 
            updatedForm[6].ds.action_QLCN.see = checked; 
            updatedForm[6].ds.action_QLCN.close = checked; 

            updatedForm[6].ds.QLQ = checked; 
            updatedForm[6].ds.action_QLQ.create = checked; 
            updatedForm[6].ds.action_QLQ.update = checked; 
            updatedForm[6].ds.action_QLQ.delete = checked;

            updatedForm[6].ds.DSBV = checked; 
            updatedForm[6].ds.action_DSBV.create = checked; 
            updatedForm[6].ds.action_DSBV.update = checked; 
            updatedForm[6].ds.action_DSBV.delete = checked;

            updatedForm[6].ds.QLTB = checked; 
            updatedForm[6].ds.action_QLTB.create = checked; 
            updatedForm[6].ds.action_QLTB.update = checked; 
            updatedForm[6].ds.action_QLTB.delete = checked;
            updatedForm[6].ds.action_QLTB.close = checked;

            
            return updatedForm; 
        });
    }

    const onChangeQLCN: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLCN = checked; 
            updatedForm[6].ds.action_QLCN.create = checked; 
            updatedForm[6].ds.action_QLCN.update = checked; 
            updatedForm[6].ds.action_QLCN.delete = checked; 
            updatedForm[6].ds.action_QLCN.see = checked; 
            updatedForm[6].ds.action_QLCN.close = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLCNCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLCN = true; 
            updatedForm[6].ds.action_QLCN.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLCNUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLCN = true; 
            updatedForm[6].ds.action_QLCN.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLCNDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLCN = true; 
            updatedForm[6].ds.action_QLCN.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLCNSee: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLCN = true; 
            updatedForm[6].ds.action_QLCN.see = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLCNClose: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLCN = true; 
            updatedForm[6].ds.action_QLCN.close = checked; 
            return updatedForm; 
        });
    }

    //
    const onChangeQLQ: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLQ = checked; 
            updatedForm[6].ds.action_QLQ.create = checked; 
            updatedForm[6].ds.action_QLQ.update = checked; 
            updatedForm[6].ds.action_QLQ.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLQCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLQ = true; 
            updatedForm[6].ds.action_QLQ.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLQUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLQ = true; 
            updatedForm[6].ds.action_QLQ.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLQDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLQ = true; 
            updatedForm[6].ds.action_QLQ.delete = checked; 
            return updatedForm; 
        });
    }

    //

    const onChangeDSBV: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.DSBV = checked; 
            updatedForm[6].ds.action_DSBV.create = checked; 
            updatedForm[6].ds.action_DSBV.update = checked; 
            updatedForm[6].ds.action_DSBV.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSBVCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.DSBV = true; 
            updatedForm[6].ds.action_DSBV.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSBVUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.DSBV = true; 
            updatedForm[6].ds.action_DSBV.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSBVDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.DSBV = true; 
            updatedForm[6].ds.action_DSBV.delete = checked; 
            return updatedForm; 
        });
    }

    //

    const onChangeQLTB: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLTB = checked; 
            updatedForm[6].ds.action_QLTB.create = checked; 
            updatedForm[6].ds.action_QLTB.update = checked; 
            updatedForm[6].ds.action_QLTB.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLTBCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLTB = true; 
            updatedForm[6].ds.action_QLTB.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLTBUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLTB = true; 
            updatedForm[6].ds.action_QLTB.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLTBDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLTB = true; 
            updatedForm[6].ds.action_QLTB.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLTBClose: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLTB = true; 
            updatedForm[6].ds.action_QLTB.close = checked; 
            return updatedForm; 
        });
    }

    // lịch sử thao tác
    const onChangeLSTT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[7].LSTT = checked; 
            updatedForm[7].ds.NKHD = checked; 
            updatedForm[7].ds.action_NKHD.delete = checked; 
            updatedForm[7].ds.action_NKHD.see = checked; 
            
            updatedForm[7].ds.NKLDN = checked; 
            updatedForm[7].ds.action_NKLDN.delete = checked; 
            
            return updatedForm; 
        });
    }

    const onChangeNKHD: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[7].LSTT = true; 
            updatedForm[7].ds.NKHD = checked; 
            updatedForm[7].ds.action_NKHD.delete = checked; 
            updatedForm[7].ds.action_NKHD.see = checked; 
            return updatedForm; 
        });
    }

    const onChangeNKHDDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[7].LSTT = true; 
            updatedForm[7].ds.NKHD = true; 
            updatedForm[7].ds.action_NKHD.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeNKHDSee: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[7].LSTT = true; 
            updatedForm[7].ds.NKHD = true; 
            updatedForm[7].ds.action_NKHD.see = checked; 
            return updatedForm; 
        });
    }

    //
    const onChangeNKLDN: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[7].LSTT = true; 
            updatedForm[7].ds.NKLDN = checked; 
            updatedForm[7].ds.action_NKLDN.delete = checked; 
            updatedForm[7].ds.action_NKLDN.see = checked; 
            return updatedForm; 
        });
    }

    const onChangeNKLDNDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[7].LSTT = true; 
            updatedForm[7].ds.NKLDN = true; 
            updatedForm[7].ds.action_NKLDN.delete = checked; 
            return updatedForm; 
        });
    }

    const onClickSelectAll = () => {
        setForm([
            {
                home: true
            },
            {
                QLBN: true,
                ds: {
                    DSDKH: true,
                    action_DSDKH: {
                        create: true,
                        update: true,
                        delete: true,
                        see: true
                    },
                    CHTKBN: true,
                    LLTVBN: true,
                    BCCTDVKH: true,
                    BCXHHT: true,
                    BCDHTC: true,
                    XDLBN: true,
                    SSDLTCN: true,
                }
            },
            {
                TKKTC: true,
                ds: {
                    CTDLM: true,
                    CDDABVM: true,
                    action_CDDABVM: {
                        create: true,
                        update: true,
                        delete: true,
                    },
                    CTDLDT: true,
                    CDDABVDT: true,
                    action_CDDABVDT: {
                        create: true,
                        update: true,
                        delete: true,
                    }
                }
            },
            {
                BCDL:true,
                ds: {
                    BCTH: true,
                    GT: true,
                    TUOI: true,
                    LBN: true,
                    NTT: true,
                    TTNV: true,
                    BSLT: true,
                    DVKH: true,
                }
            },
            {
                CD:true,
                ds:{
                    CDBS: true,
                    action_CDBS:{
                        create: true,
                        update: true,
                        delete: true,
                    },
                    TLBT:true,
                    action_TLBT:{
                        create: true,
                        update: true,
                        delete: true,
                    },
                    CDLDTYT:true,
                    action_CDLDTYT:{
                        create: true,
                        update: true,
                        delete: true,
                    },
                    CDKBV:true,
                    action_CDKBV:{
                        create: true,
                        update: true,
                        delete: true,
                    },
                    CDCCTK:true,
                    action_CDCCTK:{
                        create: true,
                        update: true,
                        delete: true,
                    }
                }
            },
            {
                TTCT: true,
                ds:{
                    SDTTCT: true,
                    TDMK: true,
                    CDTC: true,
                }
            },
            {
                QLHT: true,
                ds:{
                    QLCN: true,
                    action_QLCN: {
                        create: true,
                        update: true,
                        delete: true,
                        see: true,
                        close: true,
                    },
                    QLQ: true,
                    action_QLQ: {
                        create: true,
                        update: true,
                        delete: true,
                        
                    },
                    DSBV: true,
                    action_DSBV: {
                        create: true,
                        update: true,
                        delete: true,
                    },
                    QLTB: true,
                    action_QLTB: {
                        create: true,
                        update: true,
                        delete: true,
                        close: true,
                    },
                }
            },
            {
                LSTT: true,
                ds:{ 
                    NKHD: true,
                    action_NKHD: {
                        delete: true,
                        see: true,
                    },
                    NKLDN: true,
                    action_NKLDN: {
                        delete: true,
                    }
                }
            }
        ])
    }

    const onClickUnselect = () => {
        setForm([
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
            },
            {
                CD:false,
                ds:{
                    CDBS: false,
                    action_CDBS:{
                        create: false,
                        update: false,
                        delete: false,
                    },
                    TLBT:false,
                    action_TLBT:{
                        create: false,
                        update: false,
                        delete: false,
                    },
                    CDLDTYT:false,
                    action_CDLDTYT:{
                        create: false,
                        update: false,
                        delete: false,
                    },
                    CDKBV:false,
                    action_CDKBV:{
                        create: false,
                        update: false,
                        delete: false,
                    },
                    CDCCTK:false,
                    action_CDCCTK:{
                        create: false,
                        update: false,
                        delete: false,
                    }
                }
            },
            {
                TTCT: false,
                ds:{
                    SDTTCT: false,
                    TDMK: false,
                    CDTC: false,
                }
            },
            {
                QLHT: false,
                ds:{
                    QLCN: false,
                    action_QLCN: {
                        create: false,
                        update: false,
                        delete: false,
                        see: false,
                        close: false,
                    },
                    QLQ: false,
                    action_QLQ: {
                        create: false,
                        update: false,
                        delete: false,
                        
                    },
                    DSBV: false,
                    action_DSBV: {
                        create: false,
                        update: false,
                        delete: false,
                    },
                    QLTB: false,
                    action_QLTB: {
                        create: false,
                        update: false,
                        delete: false,
                        close: false,
                    },
                }
            },
            {
                LSTT: false,
                ds:{ 
                    NKHD: false,
                    action_NKHD: {
                        delete: false,
                        see: false,
                    },
                    NKLDN: false,
                    action_NKLDN: {
                        delete: false,
                    }
                }
            }
        ])
    }

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
                        <Input status={nameErr} value={name} onChange={handleChangeName} className="w-[300px]" placeholder="Nhập tên quyền" />
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]" >
                    <td colSpan={1} rowSpan={50} className="border border-slate-300 text-right">Chi tiết quyền:</td>
                </tr>
                <tr>
                    <td  colSpan={4} className="border border-slate-300">
                        <Button onClick={onClickSelectAll} color="primary" variant="solid"> Chọn tất cả </Button>
                        <Button onClick={onClickUnselect} className="ml-2" color="danger" variant="outlined" > Bỏ chọn </Button>
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
                    <td rowSpan={9}  className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeBCDL} checked={form[3].BCDL} >Báo cáo dữ liệu</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeBCTH} checked={form[3].ds.BCTH}>Báo cáo tổng hợp</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeGT} checked={form[3].ds.GT}>giới tính</Checkbox>
                    </td>
                    
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeTUOI} checked={form[3].ds.TUOI}>tuổi</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeLBN} checked={form[3].ds.LBN}>Loại bệnh nhân</Checkbox></td>
                    
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeNTT} checked={form[3].ds.NTT}>nguồn truyền thông</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeTTNV} checked={form[3].ds.TTNV}>tình trạng nhập viện</Checkbox></td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeBSLT} checked={form[3].ds.BSLT}>Bác sĩ lễ tân</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeDVKH} checked={form[3].ds.DVKH}>dịch vụ khách hàng</Checkbox></td>
                </tr>


                <tr className="bg-[#f2f2f2]">
                    <td rowSpan={6}  className="border border-slate-300 ..." ><Checkbox onChange={onChangeCD} checked={form[4].CD}>cài đặt</Checkbox></td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeCDBS} checked={form[4].ds.CDBS}>Cài đặt bác sĩ</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeCDBSCreate} checked={form[4].ds.action_CDBS.create} >Thêm mới</Checkbox>
                        <Checkbox onChange={onChangeCDBSUpdate} checked={form[4].ds.action_CDBS.update}>Cập nhật</Checkbox>
                        <Checkbox onChange={onChangeCDBSDelete} checked={form[4].ds.action_CDBS.delete}>Xóa</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeTLBT} checked={form[4].ds.TLBT}>thiết lập bệnh tật</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeTLBTCreate} checked={form[4].ds.action_TLBT.create} >Thêm mới</Checkbox>
                        <Checkbox onChange={onChangeTLBTUpdate} checked={form[4].ds.action_TLBT.update}>Cập nhật</Checkbox>
                        <Checkbox onChange={onChangeTLBTDelete} checked={form[4].ds.action_TLBT.delete}>Xóa</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeCDLDTYT} checked={form[4].ds.CDLDTYT}>Cài đặt loại điều trị y tế</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeCDLDTYTCreate} checked={form[4].ds.action_CDLDTYT.create} >Thêm mới</Checkbox>
                        <Checkbox onChange={onChangeCDLDTYTUpdate} checked={form[4].ds.action_CDLDTYT.update}>Cập nhật</Checkbox>
                        <Checkbox onChange={onChangeCDLDTYTDelete} checked={form[4].ds.action_CDLDTYT.delete}>Xóa</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeCDKBV} checked={form[4].ds.CDKBV}>Cài đặt khoa bệnh viện</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                    <Checkbox onChange={onChangeCDKBVCreate} checked={form[4].ds.action_CDKBV.create} >Thêm mới</Checkbox>
                        <Checkbox onChange={onChangeCDKBVUpdate} checked={form[4].ds.action_CDKBV.update}>Cập nhật</Checkbox>
                        <Checkbox onChange={onChangeCDKBVDelete} checked={form[4].ds.action_CDKBV.delete}>Xóa</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeCDCCTK} checked={form[4].ds.CDCCTK}>Cài đặt công cụ tìm kiếm</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                    <Checkbox onChange={onChangeCDCCTKCreate} checked={form[4].ds.action_CDCCTK.create} >Thêm mới</Checkbox>
                        <Checkbox onChange={onChangeCDCCTKUpdate} checked={form[4].ds.action_CDCCTK.update}>Cập nhật</Checkbox>
                        <Checkbox onChange={onChangeCDCCTKDelete} checked={form[4].ds.action_CDCCTK.delete}>Xóa</Checkbox>
                    </td>
                </tr>


                <tr >
                    <td rowSpan={4}  className="border border-slate-300 ..." ><Checkbox onChange={onChangeTTCT} checked={form[5].TTCT}>thông tin của tôi</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeSDTTCT} checked={form[5].ds.SDTTCT}>Sửa đổi thông tin của tôi</Checkbox></td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeTDMK} checked={form[5].ds.TDMK}>Thay đổi mật khẩu</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeCDTC} checked={form[5].ds.CDTC}>Cài đặt tùy chọn</Checkbox></td>
                </tr>


                <tr className="bg-[#f2f2f2]">
                    <td rowSpan={5}  className="border border-slate-300 ..." ><Checkbox onChange={onChangeQLHT} checked={form[6].QLHT}>Quản lý hệ thống</Checkbox></td>
                </tr>
                <tr>
                    <td  className="border border-slate-300 ..." ><Checkbox  onChange={onChangeQLCN} checked={form[6].ds.QLCN}>quản lý con người</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeQLCNCreate} checked={form[6].ds.action_QLCN.create}>Thêm mới</Checkbox>
                        <Checkbox onChange={onChangeQLCNUpdate} checked={form[6].ds.action_QLCN.update}>Cập nhật</Checkbox>
                        <Checkbox onChange={onChangeQLCNDelete} checked={form[6].ds.action_QLCN.delete}>Xóa</Checkbox>
                        <Checkbox onChange={onChangeQLCNSee} checked={form[6].ds.action_QLCN.see}>Xem</Checkbox>
                        <Checkbox onChange={onChangeQLCNClose} checked={form[6].ds.action_QLCN.close}>Đóng</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeQLQ} checked={form[6].ds.QLQ}>Quản lý quyền</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeQLQCreate} checked={form[6].ds.action_QLQ.create}>Thêm mới</Checkbox>
                        <Checkbox onChange={onChangeQLQUpdate} checked={form[6].ds.action_QLQ.update}>Cập nhật</Checkbox>
                        <Checkbox onChange={onChangeQLQDelete} checked={form[6].ds.action_QLQ.delete}>Xóa</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeDSBV} checked={form[6].ds.DSBV}>Danh sách bệnh viện</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeDSBVCreate} checked={form[6].ds.action_DSBV.create}>Thêm mới</Checkbox>
                        <Checkbox onChange={onChangeDSBVUpdate} checked={form[6].ds.action_DSBV.update}>Cập nhật</Checkbox>
                        <Checkbox onChange={onChangeDSBVDelete} checked={form[6].ds.action_DSBV.delete}>Xóa</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeQLTB} checked={form[6].ds.QLTB}>Quản lý thông báo</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeQLTBCreate} checked={form[6].ds.action_QLTB.create}>Thêm mới</Checkbox>
                        <Checkbox onChange={onChangeQLTBUpdate} checked={form[6].ds.action_QLTB.update}>Cập nhật</Checkbox>
                        <Checkbox onChange={onChangeQLTBDelete} checked={form[6].ds.action_QLTB.delete}>Xóa</Checkbox>
                        <Checkbox onChange={onChangeQLTBClose} checked={form[6].ds.action_QLTB.close}>Đóng</Checkbox>
                    </td>
                </tr>

                <tr>
                    <td rowSpan={3}  className="border border-slate-300 ..." ><Checkbox onChange={onChangeLSTT} checked={form[7].LSTT} >Lịch sử thao tác</Checkbox></td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeNKHD} checked={form[7].ds.NKHD}>Nhật ký hoạt động</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeNKHDDelete} checked={form[7].ds.action_NKHD.delete}>Xóa</Checkbox>
                        <Checkbox onChange={onChangeNKHDSee} checked={form[7].ds.action_NKHD.see}>Xem</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeNKLDN} checked={form[7].ds.NKLDN}>Nhật ký lỗi đăng nhập</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeNKLDNDelete} checked={form[7].ds.action_NKLDN.delete}>Xóa</Checkbox>
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