import { Alert, Badge, Col, Row } from "antd";
import { FC, Fragment } from "react";

const DiseaseStatistics: FC = () => {
    return <Fragment>
        <Row className="mt-3" >
            <Alert className=" text-base font-semibold " message="Thống kê Bệnh " type="success" />

        </Row>
        <Row justify="start" className="mt-3 gap-3 " wrap>
            <Col xs={24} sm={24} md={11} lg={10} xl={7} xxl={5}  >
                <Badge.Ribbon text="Facebook2">
                    <Col span={24} className="rounded border-green-700 border  ">
                        <Row justify="start" className=" gap-2 mt-7 bg-slate-200 p-2">
                            <Col span={6}>
                                Hôm nay:
                            </Col>
                            <Col span={5} className="flex gap-1" >
                                khoản: <strong>10</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Dự kiến: <strong>10</strong>
                            </Col>
                            <Col span={5} className="flex gap-1" >
                                Đến: <strong>10</strong>
                            </Col>
                        </Row>
                        <Row justify="start" className=" gap-2  p-2">
                            <Col span={6}>
                                Hôm qua:
                            </Col>
                            <Col span={5} className="flex gap-1" >
                                khoản: <strong>10</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Dự kiến: <strong>10</strong>
                            </Col>
                            <Col span={5} className="flex gap-1" >
                                Đến: <strong>10</strong>
                            </Col>
                        </Row>
                        <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                            <Col span={6}>
                                Tháng này:
                            </Col>
                            <Col span={5} className="flex gap-1" >
                                khoản: <strong>10</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Dự kiến: <strong>10</strong>
                            </Col>
                            <Col span={5} className="flex gap-1" >
                                Đến: <strong>10</strong>
                            </Col>
                        </Row>
                    </Col>
                </Badge.Ribbon>
            </Col>
            
        </Row>
    </Fragment>
}

export default DiseaseStatistics