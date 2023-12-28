import SubSectionTitle from '@/components/Layout/SubSectionTitle';
import ItemWrapper from '@/components/Layout/ItemWrapper';
import Process from '@/components/Process';

export default function Connections({ network }) {
  return (
    <div className="h-fit">
      <SubSectionTitle>Connections</SubSectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-6 5xl:grid-cols-8 gap-3 mt-3">
        {network['connections']?.length > 0 &&
          network['connections'].map((connection, index) => (
            <ItemWrapper key={connection['fd'] + ' ' + index}>
              <Process pid={connection['pid']} />
              <p className="flex justify-between">
                <span className="font-light">Status</span>
                <span className="font-mono font-semibold">{connection['status']}</span>
              </p>
              <p className="flex flex-col my-2">
                <span className="font-light">Local IP</span>
                <span className="font-mono ml-2 text-sm text-green-500">{connection['localaddr']['ip']}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-light">Local Port</span>
                <span className="font-mono">{connection['localaddr']['port']}</span>
              </p>
              <p className="flex flex-col my-2">
                <span className="font-light">Remote IP</span>
                <span className="font-mono ml-2 text-sm text-blue-500">{connection['remoteaddr']['ip']}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-light">Remote Port</span>
                <span className="font-mono">{connection['remoteaddr']['port']}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-light">Process ID</span>
                <span className="font-mono">{connection['pid']}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-light">FD</span>
                <span className="font-mono">{connection['fd']}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-light">Family</span>
                <span className="font-mono">{connection['family']}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-light">type</span>
                <span className="font-mono">{connection['type']}</span>
              </p>
            </ItemWrapper>
          ))}
      </div>
    </div>
  );
}
