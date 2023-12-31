import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DiskIoChart({ diskIo }) {
  const [diskIoHistory, setDiskIoHistory] = useState([]);

  useEffect(() => {
    if (!diskIo || !diskIo['disk0']) return;
    setDiskIoHistory(prevHistory => [...prevHistory, diskIo.disk0]);
  }, [diskIo]);

  const data = {
    labels: diskIoHistory.map((_, index) => index.toString()),
    datasets: [
      {
        label: 'Read Bytes',
        data: diskIoHistory.map(io => io['readBytes']),
        borderColor: '#1e992a',
        backgroundColor: '#1e992a',
      },
      {
        label: 'Write Bytes',
        data: diskIoHistory.map(io => io['writeBytes']),
        borderColor: '#36a2eb',
        backgroundColor: '#36a2eb',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Disk I/O (Bytes)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Intervals',
        },
      },
    },
  };

  const dataTwo = {
    labels: diskIoHistory.map((_, index) => index.toString()),
    datasets: [
      {
        label: 'Read time',
        data: diskIoHistory.map(io => io['readTime']),
        borderColor: '#1e992a',
        backgroundColor: '#1e992a',
      },
      {
        label: 'Write time',
        data: diskIoHistory.map(io => io['writeTime']),
        borderColor: '#36a2eb',
        backgroundColor: '#36a2eb',
      },
    ],
  };

  const optionsTwo = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Time (milliseconds)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Intervals',
        },
      },
    },
  };

  const dataThree = {
    labels: diskIoHistory.map((_, index) => index.toString()),
    datasets: [
      {
        label: 'Read count',
        data: diskIoHistory.map(io => io['readCount']),
        borderColor: '#1e992a',
        backgroundColor: '#1e992a',
      },
      {
        label: 'Write count',
        data: diskIoHistory.map(io => io['writeCount']),
        borderColor: '#36a2eb',
        backgroundColor: '#36a2eb',
      },
    ],
  };

  const optionsThree = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Total count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Intervals',
        },
      },
    },
  };

  return (
    <div>
      <div className="bg-gray-800 rounded-md my-3 h-56 p-4 w-full">
        <Line data={data} options={options} />
      </div>
      <div className="bg-gray-800 rounded-md my-3 h-60 p-4 w-full">
        <Line data={dataTwo} options={optionsTwo} />
      </div>
      <div className="bg-gray-800 rounded-md my-3 h-60 p-4 w-full">
        <Line data={dataThree} options={optionsThree} />
      </div>
    </div>
  );
}
