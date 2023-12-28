import SectionTitle from '@/components/Layout/SectionTitle';
import SectionSubtitle from '@/components/Layout/SectionSubtitle';
import ItemWrapper from '@/components/Layout/ItemWrapper';
import FlexRowGrid from '@/components/Layout/FlexRowGrid';
import { bytesToGb } from '@/helpers/conversions';

export default function Memory({ memory }) {
  return (
    <div>
      <SectionTitle>Memory</SectionTitle>
      <SectionSubtitle>Monitor your Memory usage.</SectionSubtitle>
      <FlexRowGrid>
        <ItemWrapper>
          <h5 className="text-xl font-semibold mb-1">Total</h5>
          <p className="font-mono">{memory['total']} bytes</p>
          <p className="font-mono">{bytesToGb(memory['total'])} GB</p>
        </ItemWrapper>
        <ItemWrapper>
          <h5 className="text-xl font-semibold mb-1">Available</h5>
          <p className="font-mono">{memory['available']} bytes</p>
          <p className="font-mono">{bytesToGb(memory['available'], true)} GB</p>
        </ItemWrapper>
        <ItemWrapper>
          <h5 className="text-xl font-semibold mb-1">Used</h5>
          <p className="font-mono">{memory['used']} bytes</p>
          <div className="flex gap-6">
            <p className="font-mono">{bytesToGb(memory['used'], true)} GB</p>
            <p className="font-mono">{memory['usedPercent']?.toString().slice(0, 6)}%</p>
          </div>
        </ItemWrapper>
        <ItemWrapper>
          <h5 className="text-xl font-semibold mb-1">Free</h5>
          <p className="font-mono">{memory['free']} bytes</p>
          <p className="font-mono">{bytesToGb(memory['free']).toString().slice(0, 10)} GB</p>
        </ItemWrapper>
        <ItemWrapper>
          <h5 className="text-xl font-semibold mb-1">Active</h5>
          <p className="font-mono">{memory['active']} bytes</p>
          <p className="font-mono">{bytesToGb(memory['active']).toString().slice(0, 10)} GB</p>
        </ItemWrapper>
        <ItemWrapper>
          <h5 className="text-xl font-semibold mb-1">Inactive</h5>
          <p className="font-mono">{memory['inactive']}</p>
          <p className="font-mono">{bytesToGb(memory['inactive']).toString().slice(0, 10)} GB</p>
        </ItemWrapper>
        <ItemWrapper>
          <h5 className="text-xl font-semibold mb-1">Wired</h5>
          <p className="font-mono">{memory['wired']} bytes</p>
          <p className="font-mono">{bytesToGb(memory['wired']).toString().slice(0, 10)} GB</p>
        </ItemWrapper>
      </FlexRowGrid>
    </div>
  );
}
