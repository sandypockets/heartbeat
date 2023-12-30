import SectionTitle from '@/components/Layout/SectionTitle';
import SectionSubtitle from '@/components/Layout/SectionSubtitle';

export default function Uptime({ uptime }) {
  return (
    <div className="bg-gray-950 p-12 mb-6 rounded-md">
      <SectionTitle>Uptime</SectionTitle>
      <SectionSubtitle>Time since last boot</SectionSubtitle>
      <div className="bg-gray-950 p-6 rounded-md">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="text-2xl font-bold">Uptime</div>
            <div className="text-2xl font-bold">{uptime['uptime']}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
