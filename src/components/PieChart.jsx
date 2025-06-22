import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  // Pastikan data dalam bentuk: [{ label: 'Tersedia', value: 40 }, { label: 'Dipinjam', value: 30 }, ...]
  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);

  // Warna default, cukup hingga 5 kategori
  const backgroundColors = ['#4ade80', '#facc15', '#f87171', '#60a5fa', '#c084fc'];

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors.slice(0, values.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div style={{ width: '200px', height: '200px', margin: 'auto' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
