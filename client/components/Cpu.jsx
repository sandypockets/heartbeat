import SectionTitle from '@/components/Layout/SectionTitle';
import SectionSubtitle from '@/components/Layout/SectionSubtitle';
import ItemWrapper from '@/components/Layout/ItemWrapper';
import FourColGridWrapper from '@/components/Layout/FourColGridWrapper';
import CpuChart from '@/components/CpuChart';

export default function Cpu({ cpu, nextUpdateIn }) {
  return (
    <div className="w-full bg-gray-950 p-12 rounded-md">
      <SectionTitle>CPU</SectionTitle>
      <SectionSubtitle>Monitor your CPU usage.</SectionSubtitle>
      <p>
        Next update in <span className={nextUpdateIn < 10 ? 'text-green-400' : ''}>{nextUpdateIn}</span>
      </p>
      <FourColGridWrapper>
        <ItemWrapper bg="bg-green-800">
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
      </FourColGridWrapper>
      <CpuChart cpu={cpu} />
    </div>
  );
}
