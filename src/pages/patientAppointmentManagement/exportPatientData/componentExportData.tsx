import { FC, Fragment } from "react";
import { Button, Checkbox } from "antd";
import type { CheckboxProps } from 'antd';
import { useNavigate } from "react-router-dom";
interface IProps {
    check: any,
    setCheck: any
}
const ComponentExportData: FC<IProps> = (props) => {
    const {check, setCheck} = props;
    const navigate = useNavigate();

    const onChangeHVT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, name: e.target.checked }))
      };

      const onChangeGT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, gender: e.target.checked }))
      };

      const onChangeT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, yearOld: e.target.checked }))
      };

      const onChangeSDT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, phone: e.target.checked }))
      };

      const onChangeNDTV: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, content: e.target.checked }))
      };

      const onChangeKhoa: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, department: e.target.checked }))
      };
      const onChangeBenh: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, diseases: e.target.checked }))
      };

      const onChangeTinh: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, city: e.target.checked }))
      };

      const onChangeHuyen: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, district: e.target.checked }))
      };

      const onChangeMCG: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, code: e.target.checked }))
      };

      const onChangeTGH: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, appointmentTime: e.target.checked }))
      };

      const onChangeTGNH: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, reminderTime: e.target.checked }))
      };

      const onChangeGC: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, note: e.target.checked }))
      };

      const onChangeTT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, status: e.target.checked }))
      };

      const onChangeBS: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, doctor: e.target.checked }))
      };

      const onChangeNT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, user: e.target.checked }))
      };

      const onChangeMDT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, treatment: e.target.checked }))
      };

      const onChangeTGT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, created_at: e.target.checked }))
      };

      const onClickCheckAll = (e: React.MouseEvent<HTMLElement>)=> {
        e.preventDefault()
        setCheck((prevCheck : any) => {
            const allTrueCheck = Object.keys(prevCheck).reduce((acc : any, key) => {
                acc[key] = true;
                return acc;
            }, {} as typeof prevCheck);
            return allTrueCheck;
        });
      }

      const onClickComeBack = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setCheck((prevCheck : any) => {
            const allFalseCheck = Object.keys(prevCheck).reduce((acc : any, key) => {
                acc[key] = false;
                return acc;
            }, {} as typeof prevCheck);
            return allFalseCheck;
        });
        navigate(`/xuat-du-lieu-benh-nhan`);
      }
    return <Fragment>
        <div className="flex items-center gap-1 flex-wrap " >
                <div className="text-base text-red-500 font-bold " >Dữ liệu xuất :</div>
                <Checkbox onChange={onChangeHVT} checked={check.name}>Họ và tên</Checkbox>
                <Checkbox onChange={onChangeGT} checked={check.gender} >Giới tính</Checkbox>
                <Checkbox onChange={onChangeT} checked={check.yearOld}>Tuổi</Checkbox>
                <Checkbox onChange={onChangeSDT} checked={check.phone}>Số điện thoại</Checkbox>
                <Checkbox onChange={onChangeNDTV} checked={check.content}>Nội dung tư vấn</Checkbox>
                <Checkbox onChange={onChangeKhoa} checked={check.department}>Khoa</Checkbox>
                <Checkbox onChange={onChangeBenh} checked={check.diseases}>Bệnh</Checkbox>
                <Checkbox onChange={onChangeTinh} checked={check.city}>tỉnh/TP</Checkbox>
                <Checkbox onChange={onChangeHuyen} checked={check.district}>quận/huyện</Checkbox>
                <Checkbox onChange={onChangeMCG} checked={check.code}>Mã chuyên gia</Checkbox>
                <Checkbox onChange={onChangeTGH} checked={check.appointmentTime}>Thời gian hẹn</Checkbox>
                <Checkbox onChange={onChangeTGNH} checked={check.reminderTime}>Thời gian nhắc hẹn</Checkbox>
                <Checkbox onChange={onChangeGC} checked={check.note}>Ghi chú</Checkbox>
                <Checkbox onChange={onChangeTT} checked={check.status}>Trạng thái</Checkbox>
                <Checkbox onChange={onChangeBS} checked={check.doctor}>Bác sĩ</Checkbox>
                <Checkbox onChange={onChangeNT} checked={check.user}>Người tạo</Checkbox>
                <Checkbox onChange={onChangeMDT} checked={check.treatment}>Mục điều trị</Checkbox>
                <Checkbox onChange={onChangeTGT} checked={check.created_at}>Thời gian thêm</Checkbox>
                <Button onClick={onClickCheckAll} variant="dashed" color="primary" type="default" >Tất cả</Button>
                <Button onClick={onClickComeBack} variant="outlined" color="danger" type="primary" >Quay lại</Button>
            </div>
    </Fragment>
}

export default ComponentExportData