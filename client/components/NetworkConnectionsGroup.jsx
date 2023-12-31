import SectionTitle from '@/components/Layout/SectionTitle';
import SectionSubtitle from '@/components/Layout/SectionSubtitle';
import Network from '@/components/Network';
import Connections from '@/components/Connections';

export default function NetworkConnectionsGroup({ network }) {
  return (
    <div className="flex flex-col gap-x-6 bg-gray-900 p-6 sm:p-12 rounded-md">
      <div>
        <SectionTitle>Network</SectionTitle>
        <SectionSubtitle>Monitor your Network usage.</SectionSubtitle>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-1 gap-4 lg:gap-6">
        <Network network={network} />
        <Connections network={network} />
      </div>
    </div>
  );
}
