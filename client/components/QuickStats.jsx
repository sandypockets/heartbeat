import Uptime from '@/components/Uptime';
import SectionTitle from '@/components/Layout/SectionTitle';
import SectionSubtitle from '@/components/Layout/SectionSubtitle';
import BootTime from '@/components/BootTime';
import DiskSpace from '@/components/DiskSpace';

export default function QuickStats({ uptime, disk }) {
  return (
    <div className="bg-gray-950 p-6 sm:p-12 rounded-md">
      <SectionTitle>Quick stats</SectionTitle>
      <SectionSubtitle>Health at a glance</SectionSubtitle>
      <div className="mt-12 flex flex-col gap-6">
        <BootTime bootTime={uptime['boot_time']} />
        <Uptime uptime={uptime['uptime']} />
        <DiskSpace disk={disk} />
      </div>
    </div>
  );
}
