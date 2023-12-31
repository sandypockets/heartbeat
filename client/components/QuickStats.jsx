import Uptime from '@/components/Uptime';
import SectionTitle from '@/components/Layout/SectionTitle';
import SectionSubtitle from '@/components/Layout/SectionSubtitle';
import BootTime from '@/components/BootTime';
import DiskSpace from '@/components/DiskSpace';
import Platform from '@/components/Platform';

export default function QuickStats({ uptime, disk, platform }) {
  return (
    <div className="bg-gray-900 p-6 sm:p-12 rounded-md">
      <SectionTitle>Your machine</SectionTitle>
      <div className="mt-3 flex flex-col gap-6 bg-gray-800 p-6 rounded-md">
        <BootTime bootTime={uptime['boot_time']} />
        <Uptime uptime={uptime['uptime']} />
        <DiskSpace disk={disk} />
        <Platform platform={platform} />
      </div>
    </div>
  );
}
