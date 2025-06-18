import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import { ChartData } from "../../types/chartData";
import { getTotalCategorySpending, getTotalMonthSpending } from "../../services/api";
import { Bar, Pie } from 'react-chartjs-2';
import styles from "./charts.module.css"

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    ArcElement,
} from 'chart.js';
import { CategorySpending } from "../../types/categorySpending";

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
);

export default function ChartPage() {
    const [dataBarChart, setDataBarChart] = useState<ChartData[]>([]);
    const [dataPieChart, setDataPieCart] = useState<CategorySpending[]>([]);

    useEffect(() => {
        getTotalMonthSpending()
              .then(setDataBarChart)
              .catch((err) => console.error("Error fetching data for charts: " + err.message));
        
        getTotalCategorySpending()
            .then(setDataPieCart)
            .catch((err) => console.error("Error fetching data for pie chart: " + err.message))
    }, []);

    const chartDataBar = {
        labels: dataBarChart.map(item => item.month),
        datasets: [
            {
                label: 'Amount: €',
                data: dataBarChart.map(item => item.total),
                backgroundColor: 'rgba(34, 197, 94, 0.5)',
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 2,
            }
        ]
    };

    const chartDataPie = {
        labels: dataPieChart.map(item => item.category.name),
        datasets: [
            {
            label: 'Amount: €',
            data: dataPieChart.map(item => item.total),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',   
                'rgba(54, 162, 235, 0.6)',   
                'rgba(255, 206, 86, 0.6)',   
                'rgba(75, 192, 192, 0.6)',   
                'rgba(153, 102, 255, 0.6)',  
                'rgba(255, 159, 64, 0.6)',
            ],
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
            }
        ]
    };


    const chartOptionsBar = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                color: '#ffffff',
                }
            },
            title: {
                display: true,
                text: 'Monthly Expenses',
                color: '#ffffff',
                font: { size: 18 },
            },
        },
        scales: {
            x: {
                ticks: { color: '#ffffff' },
                grid: { color: '#333' },
            },
            y: {
                ticks: { color: '#ffffff' },
                grid: { color: '#333' },
            },
        },
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff',
                },
            },
            title: {
                display: true,
                text: 'Spending by Category',
                color: '#ffffff',
                font: { size: 18 },
            },
        },
    };


    return (
        <>
            <Header></Header>
            <div className={styles.chartPage}>
                <h2 className={styles.title}>Chart Overview</h2>

                <div className={styles.flexContainer}>
                    <div className={styles.chartBar}>
                        <Bar data={chartDataBar} options={chartOptionsBar}/>
                    </div>

                    <div className={styles.chartPie}>
                        <Pie data={chartDataPie} options={pieOptions} />
                    </div>
                </div>
            </div>
       </>
    )
}