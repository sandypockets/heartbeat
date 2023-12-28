import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { bytesToGb } from '@/helpers/conversions';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function MemoryChart({ memory }) {
  const [memoryHistory, setMemoryHistory] = useState([]);

  useEffect(() => {
    if (memory['averages'] === undefined) return;
    setMemoryHistory(prevHistory => [...prevHistory, memory['averages']]);
  }, [memory['averages']]);

  const data = {
    labels: memoryHistory.map((_, index) => index.toString()),
    datasets: [
      {
        label: 'Current',
        data: memoryHistory.map(averages => bytesToGb(averages.current_usage)),
        borderColor: '#1e992a',
        backgroundColor: '#1e992a',
      },
      {
        label: '5 min avg',
        data: memoryHistory.map(averages => bytesToGb(averages.avg_5min)),
        borderColor: '#2750ae',
        backgroundColor: '#2750ae',
      },
      {
        label: '10 min avg',
        data: memoryHistory.map(averages => bytesToGb(averages?.avg_10min)),
        borderColor: '#40378e',
        backgroundColor: '#40378e',
      },
      {
        label: '15 min avg',
        data: memoryHistory.map(averages => bytesToGb(averages?.avg_15min)),
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
        max: bytesToGb(memory['memory_usage']?.['total']),
        title: {
          display: true,
          text: 'Memory Usage (GB)',
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
    <div className="bg-gray-800 rounded-md my-3 p-4 h-96 w-full">
      <Line data={data} options={options} />
    </div>
  );
}
