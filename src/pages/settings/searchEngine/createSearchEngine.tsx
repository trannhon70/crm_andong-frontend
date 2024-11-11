import { FC, Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { mediaAPI } from "../../../apis/media.api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getByIdMedia } from "../../../features/mediaSlice";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const CreateSearchEngine: FC = () =>{
    let { id } = useParams();
    const [form] = Form.useForm();
    const hospitalId = localStorage.getItem('hospitalId')
    const navige = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const { media} = useSelector((state: RootState) => state.media);

    useEffect(() =>{ 
        if(id){
            dispatch(getByIdMedia(Number(id)))
        }
    }, [id, dispatch])

    useEffect(() => {
        if(media.id){
            form.setFieldValue('name', media.name)
        }
    }, [media.id])

    const dataBreadcrumb = [
        {
            title: 'Cài đặt',
        },
        {
            type: 'separator',
        },
        {
            href: '/cong-cu-tim-kiem',
            title: 'Công cụ tìm kiếm',
        },
        {
            type: 'separator',
        },
        {
            title: <>{id ? 'Cập nhật' : 'Thêm mới'}</>,
        },
    ];

    const onFinish = async(values: any) => {
        const body = {
            name: values.name,
            hospitalId: hospitalId
        }

        if(id){
            const update = await mediaAPI.updateMedia(Number(id), body)
            if(update.data.statusCode === 1){
                toast.success('Cập nhật thành công!')
                navige('/cong-cu-tim-kiem')
            }
        } else {
            try {
                const result = await mediaAPI.createMedia(body);
                if(result.data.statusCode === 1){
                    toast.success('Thêm mới thành công!')
                    form.resetFields();
                }
            } catch (error : any) {
                console.log(error)
                if(error.response.data.message === 'Media này đã tồn tại!'){
                    toast.warning('Media này đã tồn tại!')
                }
            }
        }
        
    }

    const onClickPrev = () =>{ 
        navige('/cong-cu-tim-kiem')
    }

    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className="flex items-center justify-center mt-5 " >
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                style={{ maxWidth: 1000, width: 500 }}
                scrollToFirstError
                size="middle"
            >
                
                <Form.Item
                    name="name"
                    label="Tên media"
                    rules={[{ required: true, message: 'Vui lòng nhập tên media của bạn!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                    {id ? 'Cập nhật' : 'Thêm mới'} 
                    </Button>
                    <Button className="ml-2" type="dashed" color="danger" variant="outlined"  onClick={onClickPrev} >Quay lại</Button>
                </Form.Item>
            </Form>
            </div>
    </Fragment>
}

export default CreateSearchEngine