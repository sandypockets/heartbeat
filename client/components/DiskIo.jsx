import SectionTitle from '@/components/Layout/SectionTitle';
import SectionSubtitle from '@/components/Layout/SectionSubtitle';
import DiskIoChart from '@/components/DiskIoChart';

export default function DiskIo({ diskIo }) {
  return (
    <div className="bg-gray-900 p-6 sm:p-12 rounded-md">
      <SectionTitle>Disk IO</SectionTitle>
      <SectionSubtitle>Get a clearer picture on read/write tasks</SectionSubtitle>
      <div className="bg-gray-950 rounded-md">
        <div>
          <DiskIoChart diskIo={diskIo} />
        </div>
      </div>
    </div>
  );
}
