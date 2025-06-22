import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data }) => {
  // Ubah data dari API menjadi format Chart.js
  const labels = data.map(item => item.kategori);
  const values = data.map(item => item.jumlah);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Kerusakan',
        data: values,
        backgroundColor: '#60a5fa',
        borderRadius: 4,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '250px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
