import { Alert, Badge, Col, Row } from "antd";
import { FC, Fragment } from "react";
import BrankingHome from "../../components/brankingHome";

const CartRanking: FC = () => {
    return <Fragment>
        <Row justify="start" className="mt-3 gap-3 ">
            <Col span={8} xs={24} sm={24} md={24} lg={20} xl={12} xxl={8}  >
                <Badge.Ribbon text="Thống kê đăng ký">
                    <Col span={24} className="rounded border-green-700 border  ">
                        <Row justify="start" className=" gap-2 mt-7 bg-slate-200 p-2">
                            <Col span={4}>
                                Hôm nay:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>10</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Đã đến: <strong>10</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Chưa đến: <strong>10</strong>
                            </Col>
                        </Row>
                        <Row justify="start" className=" gap-2  p-2">
                            <Col span={4}>
                                Hôm qua:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>10</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Đã đến: <strong>10</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Chưa đến: <strong>10</strong>
                            </Col>
                        </Row>
                        <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                            <Col span={4}>
                                Tháng này:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>10</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Đã đến: <strong>10</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Chưa đến: <strong>10</strong>
                            </Col>
                        </Row>
                        <Row justify="start" className=" gap-2  p-2">
                            <Col span={4}>
                                Hằng năm:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>10</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Đã đến: <strong>10</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Chưa đến: <strong>10</strong>
                            </Col>
                        </Row>
                        <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                            <Col span={4}>
                                Tháng trước:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>10</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Đã đến: <strong>10</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Chưa đến: <strong>10</strong>
                            </Col>
                        </Row>
                    </Col>

                </Badge.Ribbon>
            </Col>
            <BrankingHome color="pink" text="Danh sách xếp hạng thăm khám tháng này" data={[]} />
            <BrankingHome color="red" text="Danh sách xếp hạng đặt chỗ trong tháng này" />
            
        </Row>
        <Row justify="start" className="mt-3 gap-3 ">
            <Col span={8} xs={24} sm={24} md={24} lg={20} xl={12} xxl={8}  >
                <Badge.Ribbon color="volcano" text="Thống kê các cuộc hẹn chưa quyết định">
                    <Col span={24} className="rounded border-green-700 border  ">
                        <Row justify="start" className=" gap-2 mt-7 bg-slate-200 p-2">
                            <Col span={4}>
                                Hôm nay:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>10</strong>
                            </Col>
                           
                        </Row>
                        <Row justify="start" className=" gap-2  p-2">
                            <Col span={4}>
                                Hôm qua:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>10</strong>
                            </Col>
                           
                        </Row>
                        <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                            <Col span={4}>
                                Tháng này:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>10</strong>
                            </Col>
                           
                        </Row>
                        <Row justify="start" className=" gap-2  p-2">
                            <Col span={4}>
                                Hằng năm:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>10</strong>
                            </Col>
                          
                        </Row>
                        <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                            <Col span={4}>
                                Tháng trước:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>10</strong>
                            </Col>
                           
                        </Row>
                    </Col>

                </Badge.Ribbon>
            </Col>
            <BrankingHome color="cyan" text="Danh sách xếp hạng thăm khám tháng trước" data={[]} />
            <BrankingHome color="green" text="Danh sách xếp hạng đặt chỗ trong tháng trước" />
            
        </Row>
       
    </Fragment>
}

export default CartRanking