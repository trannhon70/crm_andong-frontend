import { FC, Fragment } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Alert, Button, GetProps, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const AppointmentRegistrationList: FC = () => {
    const navige = useNavigate()
    const dataBreadcrumb = [
        {
            title: 'Phòng khám an đông',
        },
        {
            type: 'separator',
        },
        {
            title: 'Danh sách đăng ký hẹn',
        },
       
    ];

    const onClickCreate = () => {
        navige('/danh-sach-dang-ky-hen/them-moi');
        // dispatch(setRoleData({}))
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
     
    };

    return <Fragment>
       <BreadcrumbComponent items={dataBreadcrumb} />
       <div className='mt-2 pb-2 flex justify-between ' >
            <div className="flex gap-3" >
                <Select
                    // onChange={handleChangeTinhTrang}
                    showSearch
                    allowClear
                    style={{ width: 200 }}
                    placeholder="Tình trạng"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                        {
                            value: '1',
                            label: 'Hoạt động',
                        },
                        {
                            value: '0',
                            label: 'Không hoạt động',
                        },
                       
                    ]}
                />
                 <Select
                    // onChange={handleChangeNgonNgu}
                    showSearch
                    allowClear
                    style={{ width: 200 }}
                    placeholder="Ngôn ngữ"
                    optionFilterProp="label"
                    // filterSort={(optionA, optionB) =>
                    //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    // }
                    // options={Languege}
                />
                <Search className='w-[250px]' placeholder="Nhập tên quyền"  onSearch={onSearch} enterButton />
            </div>
            <Button onClick={onClickCreate} type="primary">Thêm mới</Button>
        </div>
        
    </Fragment>
}

export default AppointmentRegistrationList