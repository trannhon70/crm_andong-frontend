import { FC, Fragment, useEffect } from "react";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getBaoCaoXuHuongHangThang } from "../../../features/hospitalSlice";
import NotHospital from "../../../components/notHospital";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const CurrentTrendReport:FC = () => {
  
    const dispatch = useDispatch<AppDispatch>();
    const {BCXHHT} = useSelector((state: RootState) => state.hospital);
    const hospitalId = localStorage.getItem('hospitalId')

    useEffect(() => {
        if(hospitalId){
            dispatch(getBaoCaoXuHuongHangThang(Number(hospitalId)))
        }
        
    }, [dispatch,hospitalId])

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Thống kê biểu đồ danh sách hẹn theo tháng',
            font: {
              size: 20, // Kích thước chữ
            
            },
          },
        },
      };

      const labels = BCXHHT.map((item:any)=> `${item.month}/${item.year}`)
      
    //   const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4','Tháng 5', 'Tháng 6', 'tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
      
      
      const data = {
        labels,
        datasets: [
          {
              label: 'Tổng',
              data: BCXHHT.map((item : any) => item.total ),
              backgroundColor: 'rgba(245, 40, 145, 0.8)',
            },
          {
            label: 'Đã đến',
            data:BCXHHT.map((item : any) => item.totalDaDen ),
            backgroundColor: 'rgba(54, 156, 29, 0.8)',
          },
          {
            label: 'Chưa đến',
            data: BCXHHT.map((item : any) => item.totalChuaDen ),
            backgroundColor: 'rgba(238, 94, 38, 0.8)',
          },
          
        ],
      };
    return <Fragment>
        {
            hospitalId ?
        <Bar options={options} data={data} />
        : <NotHospital />}
    </Fragment>
}

export default CurrentTrendReport