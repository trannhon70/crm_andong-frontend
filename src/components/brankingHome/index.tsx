import { Badge, Col } from "antd";
import { FC, Fragment } from "react";
import { FaCrown } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";
import { IoStar } from "react-icons/io5";

interface IProps{
    color?: string,
    data?: any,
    text?: string
}

const BrankingHome:FC<IProps> = (props) => {
    const {color, data, text} = props
    return <Fragment>
        <Col span={5} xs={24} sm={12} md={12} lg={10} xl={8} xxl={5}>
                <Badge.Ribbon color={color} text={text}>
                    <Col span={24} className="rounded border-green-700 border  ">
                        <div className="mt-7 bg-slate-200" >
                                <div className="flex items-center justify-around p-2   font-medium " >
                                    <div><FaCrown color="red" size={20} /></div>
                                    <div>Lê Văn A</div>
                                    <div>89</div>
                                </div>
                                <div className="flex items-center justify-around p-2   font-medium " >
                                    <div><FaSun color="red" size={20} /></div>
                                    <div>Lê Văn A</div>
                                    <div>89</div>
                                </div>
                                <div className="flex items-center justify-around p-2   font-medium " >
                                    <div><BsMoonStarsFill color="red" size={20} /></div>
                                    <div>Lê Văn A</div>
                                    <div>89</div>
                                </div>
                                <div className="flex items-center justify-around p-2   font-medium " >
                                    <div><IoStar color="red" size={20} /></div>
                                    <div>Lê Văn A</div>
                                    <div>89</div>
                                </div>
                                <div className="flex items-center justify-around p-2   font-medium " >
                                    <div><IoStar color="red" size={20} /></div>
                                    <div>Lê Văn A</div>
                                    <div>89</div>
                                </div>
                                
                        </div>
                    </Col>
                </Badge.Ribbon>
            </Col>
    </Fragment>
}

export default BrankingHome