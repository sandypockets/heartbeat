import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DisksChart({ labels, usedData, freeData }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Used GB',
        data: usedData,
        backgroundColor: '#DA18187F',
      },
      {
        label: 'Free GB',
        data: freeData,
        backgroundColor: '#1BCC767F',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Partition Disk Usage (GB)',
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-3 rounded-md my-3 h-72">
      <Bar data={data} options={options} />
    </div>
  );
}
