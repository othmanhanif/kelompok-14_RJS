import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineChart = ({ data }) => {
  const labels = data.map(item => item.bulan);     // ['2025-01', '2025-02', ...]
  const values = data.map(item => item.rusak);     // [1, 3, 2, ...]

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Kerusakan',
        data: values,
        fill: false,
        borderColor: '#34d399',
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
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
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '250px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
