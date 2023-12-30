import SectionTitle from '@/components/Layout/SectionTitle';
import SectionSubtitle from '@/components/Layout/SectionSubtitle';
import ItemWrapper from '@/components/Layout/ItemWrapper';
import CpuChart from '@/components/CpuChart';
import CpuModel from '@/components/CpuModel';

export default function Cpu({ cpu, nextUpdateIn, cpuModel }) {
  function cpuUsageColor() {
    let cpuWarn = false;
    let cpuCaution = false;

    if (cpu && cpu['current_usage'] > 80) cpuWarn = true;
    if (cpu && cpu['current_usage'] > cpu['avg_5min']) cpuCaution = true;

    if (cpuWarn) return 'bg-red-800';
    if (cpuCaution) return 'bg-yellow-800';
    return 'bg-green-800';
  }

  return (
    <div className="bg-gray-950 p-6 sm:p-12 rounded-md">
      <SectionTitle>CPU</SectionTitle>
      <SectionSubtitle>Monitor your CPU usage.</SectionSubtitle>
      <p>
        Next update in <span className={nextUpdateIn < 10 ? 'text-green-400' : ''}>{nextUpdateIn}</span>
      </p>
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
          <ItemWrapper bg={cpuUsageColor()}>
            <h5 className="text-sm font-light">Current</h5>
            <span className="font-mono text-lg">{cpu['current_usage']?.toString().slice(0, 15)}%</span>
          </ItemWrapper>
          <ItemWrapper bg="bg-green-800">
            <h5 className="text-sm font-light">5 min average</h5>
            <span className="font-mono text-lg">{cpu['avg_5min']?.toString().slice(0, 15)}%</span>
          </ItemWrapper>
          <ItemWrapper bg="bg-green-800">
            <h5 className="text-sm font-light">10 min average</h5>
            <span className="font-mono text-lg">{cpu['avg_10min']?.toString().slice(0, 15)}%</span>
          </ItemWrapper>
          <ItemWrapper bg="bg-green-800">
            <h5 className="text-sm font-light">15 min average</h5>
            <span className="font-mono text-lg">{cpu['avg_15min']?.toString().slice(0, 15)}%</span>
          </ItemWrapper>
        </div>
        <CpuChart cpu={cpu} />
        <CpuModel cpuModel={cpuModel} />
      </div>
    </div>
  );
}
