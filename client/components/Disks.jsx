import SectionTitle from '@/components/Layout/SectionTitle';
import SectionSubtitle from '@/components/Layout/SectionSubtitle';
import FlexRowGrid from '@/components/Layout/FlexRowGrid';
import ItemWrapper from '@/components/Layout/ItemWrapper';
import { bytesToGb } from '@/helpers/conversions';

export default function Disks({ disks }) {
  return (
    <div>
      <SectionTitle>Disks</SectionTitle>
      <SectionSubtitle>Monitor disk usage across your machine</SectionSubtitle>
      <FlexRowGrid>
        {disks?.length > 0 &&
          disks.map(disk => (
            <ItemWrapper key={disk['path']}>
              <ul>
                <li>
                  <span>Path: </span>
                  <span className="ml-2 font-mono">{disk['path']}</span>
                </li>
                <li>
                  <span>fstype: </span>
                  <span className="ml-2 font-mono">{disk['fstype']}</span>
                </li>
                <li>
                  <span>Total: </span>
                  <span className="ml-2 font-mono">{bytesToGb(disk['total'], true)} GB</span>
                </li>
                <li>
                  <span>Used: </span>
                  <span className="ml-2 font-mono">{bytesToGb(disk['used'], true)} GB</span>
                </li>
                <li>
                  <span>Free: </span>
                  <span className="ml-2 font-mono">{bytesToGb(disk['free'], true)} GB</span>
                </li>
                <li>
                  <span>Percent used: </span>
                  <span className="ml-2 font-mono">{Math.floor(disk['usedPercent'])} %</span>
                </li>
              </ul>
            </ItemWrapper>
          ))}
      </FlexRowGrid>
    </div>
  );
}
