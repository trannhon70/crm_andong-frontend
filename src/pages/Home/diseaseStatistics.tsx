import { Alert, Badge, Col, Row } from "antd";
import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const DiseaseStatistics: FC = () => {
    const ThongKeBenh = useSelector((state: RootState) => state.dashboard.ThongKeBenh);
    return <Fragment>
        <Row className="mt-3" >
            <Alert className=" text-base font-semibold " message="Thống kê Bệnh " type="success" />

        </Row>
        <Row justify="start" className="mt-3 gap-3 " wrap>
        {
                ThongKeBenh?.length > 0 && ThongKeBenh?.map((item: any, index: number) => {
                    return <Col key={item.name} xs={24} sm={24} md={11} lg={7} xl={6} xxl={4}  >
                    <Badge.Ribbon color="red" text={item.name}>
                        <Col span={24} className="rounded border-green-700 border  ">
                            <Row justify="start" className=" gap-2 mt-7 bg-slate-200 p-2">
                                <Col span={7}>
                                    Hôm nay:
                                </Col>
                               
                                <Col span={8} className="flex gap-1" >
                                    Dự kiến: <strong>{item.currentDate.dukien}</strong>
                                </Col>
                                <Col span={5} className="flex gap-1" >
                                    Đến: <strong>{item.currentDate.den}</strong>
                                </Col>
                            </Row>
                            <Row justify="start" className=" gap-2  p-2">
                                <Col span={7}>
                                    Hôm qua:
                                </Col>
                               
                                <Col span={8} className="flex gap-1" >
                                    Dự kiến: <strong>{item.yesterday.dukien}</strong>
                                </Col>
                                <Col span={5} className="flex gap-1" >
                                    Đến: <strong>{item.yesterday.den}</strong>
                                </Col>
                            </Row>
                            <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                                <Col span={7}>
                                    Tháng này:
                                </Col>
                                
                                <Col span={8} className="flex gap-1" >
                                    Dự kiến: <strong>{item.thisMonth.dukien}</strong>
                                </Col>
                                <Col span={5} className="flex gap-1" >
                                    Đến: <strong>{item.thisMonth.den}</strong>
                                </Col>
                            </Row>
                            <Row justify="start" className=" gap-2  p-2">
                                <Col span={7  }>
                                Tháng trước:
                                </Col>
                                
                                <Col span={8} className="flex gap-1" >
                                    Dự kiến: <strong>{item.lastMonth.dukien}</strong>
                                </Col>
                                <Col span={5} className="flex gap-1" >
                                    Đến: <strong>{item.lastMonth.den}</strong>
                                </Col>
                            </Row>
                        </Col>
                    </Badge.Ribbon>
                </Col>
                })
            }
            
        </Row>
    </Fragment>
}

export default DiseaseStatistics