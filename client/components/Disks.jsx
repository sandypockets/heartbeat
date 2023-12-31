import SectionTitle from '@/components/Layout/SectionTitle';
import SectionSubtitle from '@/components/Layout/SectionSubtitle';
import FourColGridWrapper from '@/components/Layout/FourColGridWrapper';
import ItemWrapper from '@/components/Layout/ItemWrapper';
import { bytesToGb } from '@/helpers/conversions';
import DisksChart from '@/components/DisksChart';

export default function Disks({ disks }) {
  const diskLabels = disks?.length > 0 && disks?.map(disk => disk.path);
  const usedData = disks?.length > 0 && disks?.map(disk => bytesToGb(disk['used'], true));
  const freeData = disks?.length > 0 && disks?.map(disk => bytesToGb(disk['free'], true));

  return (
    <div className="bg-gray-900 p-6 sm:p-12 rounded-md h-full">
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
        <ItemWrapper>
          <div className="flex flex-col items-end">
            <div>
              <span className="text-3xl mr-1">{disks?.length}</span>
              <span>disks</span>
            </div>
            <div>
              <span className="text-3xl mr-1">{bytesToGb(disks[0]?.total, true)}</span>
              <span>GB</span>
            </div>
          </div>
        </ItemWrapper>
        <DisksChart labels={diskLabels} usedData={usedData} freeData={freeData} />
      </FourColGridWrapper>
    </div>
  );
}
