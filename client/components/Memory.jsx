import SectionTitle from '@/components/Layout/SectionTitle';
import SectionSubtitle from '@/components/Layout/SectionSubtitle';
import ItemWrapper from '@/components/Layout/ItemWrapper';
import FourColGridWrapper from '@/components/Layout/FourColGridWrapper';
import { bytesToGb } from '@/helpers/conversions';
import MemoryChart from '@/components/MemoryChart';

export default function Memory({ memory, nextUpdateIn }) {
  return (
    <div className="bg-gray-950 p-12 rounded-md">
      <SectionTitle>Memory</SectionTitle>
      <SectionSubtitle>Monitor your Memory usage.</SectionSubtitle>
      <p>
        Next update in <span className={nextUpdateIn < 10 ? 'text-green-400' : ''}>{nextUpdateIn}</span>
      </p>
      <FourColGridWrapper>
        <ItemWrapper>
          <h5 className="text-sm font-light mb-1">Total</h5>
          <p className="font-mono font-xl">{memory['memory_usage']?.['total']} bytes</p>
          <p className="font-mono">{bytesToGb(memory['memory_usage']?.['total'])} GB</p>
        </ItemWrapper>
        <ItemWrapper>
          <h5 className="text-sm font-light mb-1">Available</h5>
          <p className="font-mono font-xl">{memory['memory_usage']?.['available']} bytes</p>
          <p className="font-mono">{bytesToGb(memory['memory_usage']?.['available'], true)} GB</p>
        </ItemWrapper>
        <ItemWrapper>
          <h5 className="text-sm font-light mb-1">Used</h5>
          <p className="font-mono font-xl">{memory['memory_usage']?.['used']} bytes</p>
          <div className="flex gap-6">
            <p className="font-mono">{bytesToGb(memory['memory_usage']?.['used'], true)} GB</p>
            <p className="font-mono">{memory['memory_usage']?.['usedPercent']?.toString().slice(0, 6)}%</p>
          </div>
        </ItemWrapper>
        <ItemWrapper>
          <h5 className="text-sm font-light mb-1">Free</h5>
          <p className="font-mono font-xl">{memory['memory_usage']?.['free']} bytes</p>
          <p className="font-mono">{bytesToGb(memory['memory_usage']?.['free']).toString().slice(0, 10)} GB</p>
        </ItemWrapper>
        <ItemWrapper>
          <h5 className="text-sm font-light mb-1">Active</h5>
          <p className="font-mono font-xl">{memory['memory_usage']?.['active']} bytes</p>
          <p className="font-mono">{bytesToGb(memory['memory_usage']?.['active']).toString().slice(0, 10)} GB</p>
        </ItemWrapper>
        <ItemWrapper>
          <h5 className="text-sm font-light mb-1">Inactive</h5>
          <p className="font-mono font-xl">{memory['memory_usage']?.['inactive']}</p>
          <p className="font-mono">{bytesToGb(memory['memory_usage']?.['inactive']).toString().slice(0, 10)} GB</p>
        </ItemWrapper>
        <ItemWrapper>
          <h5 className="text-sm font-light mb-1">Wired</h5>
          <p className="font-mono font-xl">{memory['memory_usage']?.['wired']} bytes</p>
          <p className="font-mono">{bytesToGb(memory['memory_usage']?.['wired']).toString().slice(0, 10)} GB</p>
        </ItemWrapper>
      </FourColGridWrapper>
      <MemoryChart memory={memory} />
    </div>
  );
}
