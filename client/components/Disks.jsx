import SectionTitle from '@/components/Layout/SectionTitle';
import SectionSubtitle from '@/components/Layout/SectionSubtitle';
import FourColGridWrapper from '@/components/Layout/FourColGridWrapper';
import ItemWrapper from '@/components/Layout/ItemWrapper';
import { bytesToGb } from '@/helpers/conversions';
import DisksChart from '@/components/DisksChart';

export default function Disks({ disks }) {
  const diskLabels = disks.map(disk => disk.path);
  const usedData = disks.map(disk => bytesToGb(disk['used'], true));
  const freeData = disks.map(disk => bytesToGb(disk['free'], true));

  return (
    <div className="bg-gray-950 p-12 rounded-md">
      <SectionTitle>Disks</SectionTitle>
      <SectionSubtitle>Monitor disk usage across your machine</SectionSubtitle>
      <FourColGridWrapper>
        {disks?.length > 0 &&
          disks.map(disk => (
            <ItemWrapper key={disk['path']}>
              <ul>
                <li className="my-1 flex flex justify-between">
                  <span className="font-light">Path: </span>
                  <span className="ml-2 font-mono break-words overflow-hidden">{disk['path']}</span>
                </li>
                <li className="my-1 flex justify-between">
                  <span className="font-light">fstype</span>
                  <span className="ml-2 font-mono">{disk['fstype']}</span>
                </li>
                <li className="my-1 flex justify-between">
                  <span className="font-light">Total</span>
                  <span className="ml-2 font-mono">{bytesToGb(disk['total'], true)} GB</span>
                </li>
                <li className="my-1 flex justify-between">
                  <span className="font-light">Used</span>
                  <span className="ml-2 font-mono">{bytesToGb(disk['used'], true)} GB</span>
                </li>
                <li className="my-1 flex justify-between">
                  <span className="font-light">Free</span>
                  <span className="ml-2 font-mono">{bytesToGb(disk['free'], true)} GB</span>
                </li>
                <li className="my-1 flex justify-between">
                  <span className="font-light">Percent used</span>
                  <span className="ml-2 font-mono">{Math.floor(disk['usedPercent'])} %</span>
                </li>
              </ul>
            </ItemWrapper>
          ))}
      </FourColGridWrapper>
      <DisksChart labels={diskLabels} usedData={usedData} freeData={freeData} />
    </div>
  );
}
