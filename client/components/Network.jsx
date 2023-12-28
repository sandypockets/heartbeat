import SubSectionTitle from '@/components/Layout/SubSectionTitle';
import ItemWrapper from '@/components/Layout/ItemWrapper';

export default function Network({ network }) {
  return (
    <div className="h-fit mt-4">
      <SubSectionTitle>Input Output by Interface</SubSectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 5xl:grid-cols-7 gap-3 mt-3">
        {network['io_usage']?.length > 0 &&
          network['io_usage'].map((io, index) => (
            <div key={io['interface'] + '-' + index}>
              <ItemWrapper>
                <h5 className="text-3xl font-light font-mono">{io['name']}</h5>
                <p className="flex justify-between">
                  <span className="font-light">Bytes Sent</span>
                  <span className="font-mono">{io['bytesSent']}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-light">Bytes Received</span>
                  <span className="font-mono">{io['bytesRecv']}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-light">Packets Sent</span>
                  <span className="font-mono">{io['packetsSent']}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-light">Packets Received</span>
                  <span className="font-mono">{io['packetsRecv']}</span>
                </p>
                <div>
                  {network['interfaces']?.length > 0 &&
                    network['interfaces'].map(interfaceItem => {
                      if (interfaceItem['name'] === io['name']) {
                        return (
                          <div key={interfaceItem['name']} className="mt-3 border-t border-white pt-3">
                            <p className="flex justify-between">
                              <span className="font-light">MTU</span>
                              <span className="font-mono">{interfaceItem['mtu']}</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="font-light">MAC Address</span>
                              <span className="font-mono">{interfaceItem['hardwareaddr'] ? interfaceItem['hardwareaddr'] : 'null'}</span>
                            </p>
                            <ul>
                              <span className="font-light">Flags</span>
                              {interfaceItem['flags']?.length > 0 ? (
                                interfaceItem['flags'].map((flag, index) => (
                                  <li key={flag + '-' + index} className="font-mono list-disc ml-6">
                                    {flag}
                                  </li>
                                ))
                              ) : (
                                <li className="font-mono list-disc ml-6">null</li>
                              )}
                            </ul>
                            <ul>
                              <span className="font-light">Addresses</span>
                              {interfaceItem['addrs']?.length > 0 ? (
                                interfaceItem['addrs'].map((address, index) => (
                                  <li key={address + '-' + index} className="font-mono list-disc ml-6 text-sm">
                                    {address['addr']}
                                  </li>
                                ))
                              ) : (
                                <li className="font-mono list-disc ml-6 text-sm">null</li>
                              )}
                            </ul>
                          </div>
                        );
                      }
                    })}
                </div>
              </ItemWrapper>
            </div>
          ))}
      </div>
    </div>
  );
}
