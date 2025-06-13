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

const LineChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'],
    datasets: [
      {
        label: 'Kerusakan',
        data: [1, 3, 2, 5, 4],
        fill: false,
        borderColor: '#34d399',
        tension: 0.3,
        pointRadius: 3, // lebih kecil
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
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
