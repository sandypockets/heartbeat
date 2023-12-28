import Process from '@/components/Process';
import SectionTitle from '@/components/Layout/SectionTitle';
import SectionSubtitle from '@/components/Layout/SectionSubtitle';
import SubSectionTitle from '@/components/Layout/SubSectionTitle';
import ItemWrapper from '@/components/Layout/ItemWrapper';
import FlexRowGrid from '@/components/Layout/FlexRowGrid';

export default function Network({ network }) {
  return (
    <div className="w-full">
      <SectionTitle>Network</SectionTitle>
      <SectionSubtitle>Monitor your Network usage.</SectionSubtitle>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="grid col-span-1 h-fit">
          <SubSectionTitle>Input Output</SubSectionTitle>
          <FlexRowGrid>
            {network['io_usage']?.length > 0 &&
              network['io_usage'].map(io => (
                <ItemWrapper key={io['interface']}>
                  <p>Interface: {io['name']}</p>
                  <p>Bytes Sent: {io['bytesSent']}</p>
                  <p>Bytes Received: {io['bytesRecv']}</p>
                  <p>Packets Sent: {io['packetsSent']}</p>
                  <p>Packets Received: {io['packetsRecv']}</p>
                </ItemWrapper>
              ))}
          </FlexRowGrid>
        </div>
        <div className="grid col-span-1 h-fit">
          <SubSectionTitle>Interfaces</SubSectionTitle>
          <FlexRowGrid>
            {network['interfaces']?.length > 0 &&
              network['interfaces'].map(interfaceItem => (
                <ItemWrapper key={interfaceItem['name']}>
                  <p>Interface: {interfaceItem['name']}</p>
                  <p>MTU: {interfaceItem['mtu']}</p>
                  <p>MAC Address: {interfaceItem['hardwareaddr']}</p>
                  <ul>Flags: {interfaceItem['flags']?.length > 0 && interfaceItem['flags'].map(flag => <li>{flag}</li>)}</ul>
                  <ul>
                    Addresses:{' '}
                    {interfaceItem['addrs']?.length > 0 ? interfaceItem['addrs'].map(address => <li>{address['addr']}</li>) : <li>None</li>}
                  </ul>
                </ItemWrapper>
              ))}
          </FlexRowGrid>
        </div>
        <div className="grid col-span-1 h-fit">
          <SubSectionTitle>Connections</SubSectionTitle>
          <FlexRowGrid>
            {network['connections']?.length > 0 &&
              network['connections'].map((connection, index) => (
                <ItemWrapper key={connection['fd'] + ' ' + index}>
                  <p>FD: {connection['fd']}</p>
                  <p>Family: {connection['family']}</p>
                  <p>type: {connection['type']}</p>
                  <p>Local IP: {connection['localaddr']['ip']}</p>
                  <p>Local Port: {connection['localaddr']['port']}</p>
                  <p>Remote IP: {connection['remoteaddr']['ip']}</p>
                  <p>Remote Port: {connection['remoteaddr']['port']}</p>
                  <p>Status: {connection['status']}</p>
                  <p>UIDs: {connection['uids']}</p>
                  <p>Process ID: {connection['pid']}</p>
                  <Process pid={connection['pid']} />
                </ItemWrapper>
              ))}
          </FlexRowGrid>
        </div>
      </div>
    </div>
  );
}
