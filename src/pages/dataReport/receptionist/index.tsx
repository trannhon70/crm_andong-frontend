import React, { FC, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Button, DatePicker, DatePickerProps, Select, Space, Table, TableProps } from "antd";
import { getDaysInQuarter, getMonthsInYear, TIME } from "../../../utils";
import dayjs from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';
import { getAllByIdHospital, getAllMedia } from "../../../features/patientSlice";
import NotHospital from "../../../components/notHospital";
import { getThongkeTheoBacSi, getThongkeTheoBenh } from "../../../features/dataReportSlice";
import 'dayjs/locale/vi';
dayjs.extend(isoWeek);

interface DataType {
    key: string;
    picker: string,
    timeType: string,
    month: string,
    year: string,
    day?: string,
    total: number,

}

const Receptionist: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const hospitalId = localStorage.getItem('hospitalId')
    const [picker, setPicker] = useState<any>('week');
    const [time, setTime] = useState<any>([]);
    const [timeType, setTimeType] = useState<string>('appointmentTime');
    const [status, setStatus] = useState<string>('');
    const [media, setMedia] = useState<string>('');

    const { patient, dataReport } = useSelector((state: RootState) => state);
    const currentWeek = dayjs();

    useEffect(() => {
        if (hospitalId) {
            dispatch(getAllMedia(Number(hospitalId)));
        }
    }, [dispatch, hospitalId])

    const dataBreadcrumb = [
        {
            title: 'Báo cáo dữ liệu',
        },
        {
            type: 'separator',
        },
        {
            title: 'Thống kê theo bác sĩ lễ tân ',
        },

    ];
    const onChangeTime = (e: any) => {
        setPicker(e)
    }
    const onChange: DatePickerProps['onChange'] = (date: any, dateString) => {

        if (picker === 'week') {
            if (typeof dateString === 'string') {
                const [year, week] = dateString.split('-');
                const parsedYear = parseInt(year, 10);
                const parsedWeek = parseInt(week.replace('th', ''), 10);
                const startOfWeek = dayjs().year(parsedYear).isoWeek(parsedWeek).startOf('isoWeek');
                const weekDaysArray = [];
                for (let i = -1; i < 6; i++) {
                    const day = startOfWeek.add(i, 'day').format('YYYY-MM-DD');
                    weekDaysArray.push(day);
                }
                setTime(weekDaysArray);
            }
        }
        if (picker === 'month') {
            const year = date.$y;
            const month = date.$M;
            const daysInMonth = dayjs(new Date(year, month)).daysInMonth();
            const daysArray = [];
            for (let day = 1; day <= daysInMonth; day++) {
                const fullDate = dayjs(new Date(year, month, day)).format('YYYY-MM-DD');
                daysArray.push(fullDate);
            }
            setTime(daysArray);
        }

        if (picker === 'quarter') {
            const year = date.$y;
            const month = date.$M;
            const days = getDaysInQuarter(year, month);
            setTime(days);
        }

        if (picker === 'year') {
            const year = date.$y;
            const months = getMonthsInYear(year);
            setTime(months);

        }
    }

    const convertTime = time?.map((item: any) => {
        const [year, month, day] = item.split('-');
        const date = dayjs(item);
        const startTimestamp = date.startOf('day').unix();
        const endTimestamp = date.endOf('day').unix();
        return {
            startTimestamp, endTimestamp, year, month, day
        }
    })

    const convertTimeYear = time?.map((item: any) => {
        const [year, month, day] = item.split('-');
        const date = dayjs(item);
        const startTimestamp = date.startOf('month').unix();
        const endTimestamp = date.endOf('month').unix();
        return {
            startTimestamp, endTimestamp, year, month, day
        }
    })

    const onChangeTimeType = (e: any) => {
        setTimeType(e);
    }

    const onChangeStatus = (e: any) => {
        setStatus(e)
    }

    const onChangeMedia = (e: any) => {
        setMedia(e);
    }



    const onClickSearch = () => {
        const body = {
            hospitalId: hospitalId,
            time: picker === 'year' ? convertTimeYear : convertTime,
            picker: picker,
            timeType: timeType,
            status: status,
            media: media,
        }
        dispatch(getThongkeTheoBacSi(body))
    }

    useEffect(() => {
        switch (picker) {
            case 'week':
                const defaultWeek = currentWeek.format('YYYY-ww');
                onChange(currentWeek, defaultWeek);
                dispatch(getThongkeTheoBacSi({ hospitalId, time: convertTime, picker,timeType, status, media }))
                break;

            case 'month':
                onChange(currentWeek, currentWeek.format('YYYY-MM'));
                break;

            case 'quarter':
                onChange(currentWeek, currentWeek.format('YYYY-Q'));
                break;

            case 'year':
                onChange(currentWeek, currentWeek.format('YYYY'));
                break;

            default:
                break;
        }

    }, [picker, hospitalId, time.length > 0])

    const dynamicColumns = Array.isArray(dataReport?.TKDoctor.doctor)
        ? dataReport.TKDoctor.doctor.map((group: any) => ({
            title: group?.name,
            key: group?.id, // Đảm bảo key duy nhất
            dataIndex: 'doctor',
            render: (value: any) => {
                if (Array.isArray(value)) {
                    const matchedItem = value.find((item: any) => item?.id === group?.id); // Tìm item phù hợp
                    return matchedItem ? (
                        <span key={group?.id} className="px-2 py-1 rounded-full bg-orange-500 text-white">
                            {matchedItem?.count || 0}
                        </span>
                    ) : (
                        0
                    );
                }
                return 0; // Nếu value không phải mảng
            },
        }))
        : [];

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Thời gian',
            dataIndex: 'year',
            key: 'year',
            render(value, record, index) {
                if (record.picker === 'year') {
                    return <>{record.month}/{record.year}</>
                } else {
                    return <>{record.day}/{record.month}/{record.year}</>
                }

            },
        },
        {
            title: 'Tổng số người',
            dataIndex: 'total',
            key: 'total',
            render(value, record, index) {
                if (Number(value) > 0) {
                    return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                } else {
                    return <>{value}</>
                }
            },
        },
        ...dynamicColumns,
    ];

    return <Fragment>
        {
            hospitalId ? <>
                <BreadcrumbComponent items={dataBreadcrumb} />
                <Space direction="horizontal" className="mb-2" >

                    <div>
                        <div >Chọn loại thời gian : </div>
                        <Select
                            className="w-[150px]"
                            showSearch
                            placeholder="--- Tùy Chọn ---"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            value={timeType}
                            options={[
                                { label: 'Thời gian hẹn', value: 'appointmentTime' },
                                { label: 'Thời gian tạo', value: 'created_at' }
                            ]}
                            onChange={onChangeTimeType}
                        />
                    </div>
                    <div>
                        <div >Chọn móc thời gian : </div>
                        <Select
                            className="w-[150px]"
                            allowClear
                            showSearch
                            placeholder="--- Tùy Chọn ---"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            value={picker}
                            options={TIME}
                            onChange={onChangeTime}
                        />
                    </div>
                    <div>
                        <div>Thời gian :</div>
                        <DatePicker allowClear={false} onChange={onChange} picker={picker} defaultValue={currentWeek} />
                    </div>
                    <div>
                        <div>Tình Trạng :</div>
                        <Select
                            className="w-[150px]"
                            allowClear
                            showSearch
                            placeholder="--- Tùy Chọn ---"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                { id: '2', value: 'ĐÃ ĐẾN', label: 'ĐÃ ĐẾN' },
                                { id: '3', value: 'CHƯA ĐẾN', label: 'CHƯA ĐẾN' }
                            ]}
                            onChange={onChangeStatus}
                        />
                    </div>
                    <div>
                        <div>Nguồn đến :</div>
                        <Select
                            className="w-[150px]"
                            allowClear
                            showSearch
                            placeholder="--- Tùy Chọn ---"
                            filterOption={(input, option) =>
                                typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                            }
                            options={patient.media.length > 0 && patient.media.map((item: any) => {
                                return {
                                    label: item.name,
                                    value: item.id
                                }
                            })}
                            onChange={onChangeMedia}
                        />
                    </div>

                    <Button onClick={onClickSearch} className="mt-5" type="primary" >Tìm kiếm</Button>
                </Space>
                <Table<DataType> columns={columns} dataSource={dataReport.TKDoctor.data || []} bordered pagination={false} />
            </> : <NotHospital />
        }
    </Fragment>
}

export default Receptionist