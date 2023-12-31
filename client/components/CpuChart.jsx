import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CpuChart({ cpu }) {
  const [cpuHistory, setCpuHistory] = useState([]);

  useEffect(() => {
    if (cpu.current_usage === undefined) return;
    setCpuHistory(prevHistory => [...prevHistory, cpu]);
  }, [cpu]);

  const data = {
    labels: cpuHistory.map((_, index) => index.toString()),
    datasets: [
      {
        label: 'Current',
        data: cpuHistory.map(cpu => cpu['current_usage']),
        borderColor: '#1e992a',
        backgroundColor: '#1e992a',
      },
      {
        label: '5 min avg',
        data: cpuHistory.map(cpu => cpu['avg_5min']),
        borderColor: '#2750ae',
        backgroundColor: '#2750ae',
      },
      {
        label: '10 min avg',
        data: cpuHistory.map(cpu => cpu['avg_10min']),
        borderColor: '#40378e',
        backgroundColor: '#40378e',
      },
      {
        label: '15 min avg',
        data: cpuHistory.map(cpu => cpu['avg_15min']),
        borderColor: '#446179',
        backgroundColor: '#446179',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'CPU Usage (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Intervals (30s)',
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-md my-3 h-full min-h-72 p-4 w-full">
      <Line data={data} options={options} />
    </div>
  );
}
