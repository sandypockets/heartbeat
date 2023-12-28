import SectionTitle from '@/components/Layout/SectionTitle';
import SectionSubtitle from '@/components/Layout/SectionSubtitle';
import ItemWrapper from '@/components/Layout/ItemWrapper';
import FlexRowGrid from '@/components/Layout/FlexRowGrid';

export default function Cpu({ cpu, nextUpdate }) {
  return (
    <div>
      <SectionTitle>CPU</SectionTitle>
      <SectionSubtitle>Monitor your CPU usage.</SectionSubtitle>
      <span>Next update in {nextUpdate}</span>
      <FlexRowGrid>
        <ItemWrapper bg="bg-green-800">
          <h5 className="text-xl">Current</h5>
          <span className="font-mono text-sm">{cpu['current_usage']}%</span>
        </ItemWrapper>
        <ItemWrapper bg="bg-green-800">
          <h5 className="text-xl">5 min average</h5>
          <span className="font-mono text-sm">{cpu['avg_5min']}%</span>
        </ItemWrapper>
        <ItemWrapper bg="bg-green-800">
          <h5 className="text-xl">10 min average</h5>
          <span className="font-mono text-sm">{cpu['avg_10min']}%</span>
        </ItemWrapper>
        <ItemWrapper bg="bg-green-800">
          <h5 className="text-xl">15 min average</h5>
          <span className="font-mono text-sm">{cpu['avg_15min']}%</span>
        </ItemWrapper>
      </FlexRowGrid>
    </div>
  );
}
