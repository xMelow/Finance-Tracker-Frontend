import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import { ChartData } from "../../types/chartData";
import { getTotalMonthSpending } from "../../services/api";
import { Bar } from 'react-chartjs-2';
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
    const [data, setData] = useState<ChartData[]>([]);

    useEffect(() => {
        getTotalMonthSpending()
              .then(setData)
              .catch((err) => console.error("Error fetching data for charts: " + err.message));
    }, []);

    const chartData = {
        labels: data.map(item => item.month),
        datasets: [
            {
                label: 'Amount: €',
                data: data.map(item => item.total),
                backgroundColor: 'rgba(34, 197, 94, 0.5)',
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 2,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
        legend: {
            labels: {
            color: '#ffffff',
            },
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

    return (
        <>
            <Header></Header>
            <div className={styles.chartPage}>
                <h2 className={styles.title}>Chart Overview</h2>

                <div className={styles.chart}>
                    <Bar data={chartData} options={chartOptions}/>
                </div>
            </div>
       </>
    )
}