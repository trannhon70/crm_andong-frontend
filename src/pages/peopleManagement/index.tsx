import { FC, Fragment } from "react";
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import { Button, GetProps, Input } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const dataBreadcrumb = [
    {
        href: '/quan-ly-con-nguoi',
        title: 'Quản lý hệ thống',
    },
    {
        type: 'separator',
    },
    {
        title: 'Quản lý con người',
    },
];

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const PeopleManagement: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navige = useNavigate()

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        // dispatch(fetchGetPaging({ pageSize, pageIndex, search : value }));
    };

    const onClickCreate = () => {
        navige('/quan-ly-con-nguoi/them-moi');
        // dispatch(setRoleData({}))
    }
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className='mt-2 pb-2 flex justify-between ' >
            <Search className='w-[250px]' placeholder="Nhập tên quyền" onSearch={onSearch} enterButton />
            <Button onClick={onClickCreate} type="primary">Thêm mới</Button>
        </div>
    </Fragment>
}

export default PeopleManagement