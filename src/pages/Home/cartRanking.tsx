import { Alert, Badge, Col, Row } from "antd";
import { FC, Fragment } from "react";
import BrankingHome from "../../components/brankingHome";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CartRanking: FC = () => {
    const { DanhSachXepHang, ThongKeDangKy } = useSelector((state: RootState) => state.dashboard);

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
                                Tổng Cộng: <strong>{ThongKeDangKy?.TKDangKy?.currentDate?.tong || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Đã đến: <strong>{ThongKeDangKy?.TKDangKy?.currentDate?.daden || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Chưa đến: <strong>{ThongKeDangKy?.TKDangKy?.currentDate?.chuaden || 0}</strong>
                            </Col>
                        </Row>
                        <Row justify="start" className=" gap-2  p-2">
                            <Col span={4}>
                                Hôm qua:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>{ThongKeDangKy?.TKDangKy?.yesterday?.tong || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Đã đến: <strong>{ThongKeDangKy?.TKDangKy?.yesterday?.daden || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Chưa đến: <strong>{ThongKeDangKy?.TKDangKy?.yesterday?.chuaden || 0}</strong>
                            </Col>
                        </Row>
                        <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                            <Col span={4}>
                                Tháng này:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>{ThongKeDangKy?.TKDangKy?.thisMonth?.tong || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Đã đến: <strong>{ThongKeDangKy?.TKDangKy?.thisMonth?.daden || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Chưa đến: <strong>{ThongKeDangKy?.TKDangKy?.thisMonth?.chuaden || 0}</strong>
                            </Col>
                        </Row>
                        <Row justify="start" className=" gap-2  p-2">
                            <Col span={4}>
                                Hằng năm:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>{ThongKeDangKy?.TKDangKy?.yearly?.tong || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Đã đến: <strong>{ThongKeDangKy?.TKDangKy?.yearly?.daden || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Chưa đến: <strong>{ThongKeDangKy?.TKDangKy?.yearly?.chuaden || 0}</strong>
                            </Col>
                        </Row>
                        <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                            <Col span={4}>
                                Tháng trước:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>{ThongKeDangKy?.TKDangKy?.lastMonth?.tong || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Đã đến: <strong>{ThongKeDangKy?.TKDangKy?.lastMonth?.daden || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Chưa đến: <strong>{ThongKeDangKy?.TKDangKy?.lastMonth?.chuaden || 0}</strong>
                            </Col>
                        </Row>
                    </Col>

                </Badge.Ribbon>
            </Col>
            <BrankingHome color="pink" text="Danh sách xếp hạng thăm khám tháng này" data={DanhSachXepHang?.DSXHThamKhamThangNay?.result} />
            <BrankingHome color="red" text="Danh sách xếp hạng đặt chỗ trong tháng này" data={DanhSachXepHang?.DSXHDatChoThangNay
                ?.result} />

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
                                Tổng Cộng: <strong>{ThongKeDangKy?.TKCuocHenChuaQuyetDinh?.currentDate?.tong || 0}</strong>
                            </Col>

                        </Row>
                        <Row justify="start" className=" gap-2  p-2">
                            <Col span={4}>
                                Hôm qua:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>{ThongKeDangKy?.TKCuocHenChuaQuyetDinh?.yesterday?.tong || 0}</strong>
                            </Col>

                        </Row>
                        <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                            <Col span={4}>
                                Tháng này:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>{ThongKeDangKy?.TKCuocHenChuaQuyetDinh?.thisMonth?.tong || 0}</strong>
                            </Col>

                        </Row>
                        <Row justify="start" className=" gap-2  p-2">
                            <Col span={4}>
                                Hằng năm:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>{ThongKeDangKy?.TKCuocHenChuaQuyetDinh?.yearly?.tong || 0}</strong>
                            </Col>

                        </Row>
                        <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                            <Col span={4}>
                                Tháng trước:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                Tổng Cộng: <strong>{ThongKeDangKy?.TKCuocHenChuaQuyetDinh?.lastMonth?.tong || 0}</strong>
                            </Col>

                        </Row>
                    </Col>

                </Badge.Ribbon>
            </Col>
            <BrankingHome color="cyan" text="Danh sách xếp hạng thăm khám tháng trước" data={DanhSachXepHang?.DSXHThamKhamThangTruoc
                ?.result} />
            <BrankingHome color="green" text="Danh sách xếp hạng đặt chỗ trong tháng trước" data={DanhSachXepHang?.DSXHDatChoThangTruoc
                ?.result} />

        </Row>

    </Fragment>
}

export default CartRanking