import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ['Laptop', 'Monitor', 'Printer', 'Scanner'],
    datasets: [
      {
        label: 'Kerusakan',
        data: [2, 5, 3, 4],
        backgroundColor: '#60a5fa',
        borderRadius: 4,
        barThickness: 30, // <-- mengecilkan bar
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // <-- agar bisa kontrol tinggi manual
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
