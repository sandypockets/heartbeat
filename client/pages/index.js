import { useState, useEffect } from 'react';
import queryNextApi from '@/helpers/queryNextApi';
import Cpu from '@/components/Cpu';
import Memory from '@/components/Memory';
import Disks from '@/components/Disks';
import Uptime from '@/components/Uptime';
import DiskIo from '@/components/DiskIo';
import NetworkConnectionsGroup from '@/components/NetworkConnectionsGroup';

export default function Home() {
  const [cpu, setCpu] = useState({});
  const [memory, setMemory] = useState({});
  const [disks, setDisks] = useState({});
  const [network, setNetwork] = useState({});
  const [nextUpdateIn, setNextUpdateIn] = useState(30);
  const [uptime, setUptime] = useState({});
  const [diskIo, setDiskIo] = useState({});

  function tick() {
    if (nextUpdateIn > 1) {
      setNextUpdateIn(nextUpdateIn - 1);
    } else {
      setNextUpdateIn(30);
    }
  }

  useEffect(() => {
    queryNextApi('cpu').then(data => setCpu(data));
    queryNextApi('memory').then(data => setMemory(data));
    queryNextApi('disk').then(data => setDisks(data['disk_usage']));
    queryNextApi('network').then(data => setNetwork(data));
    queryNextApi('uptime').then(data => setUptime(data));
    queryNextApi('diskio').then(data => setDiskIo(data));

    const interval = setInterval(async () => {
      const cpuData = await queryNextApi('cpu');
      setCpu(cpuData);
      const memoryData = await queryNextApi('memory');
      setMemory(memoryData);
      const uptimeData = await queryNextApi('uptime');
      setUptime(uptimeData);
      const diskIoData = await queryNextApi('diskio');
      setDiskIo(diskIoData);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  }, [nextUpdateIn]);

  return (
    <main className="w-screen min-h-screen p-6 xl:p-12 3xl:p-24">
      <div className="mb-12">
        <h1 className="text-6xl font-bold mb-1">Heartbeat</h1>
        <span className="text-2xl">Keep a pulse on your machine's health</span>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 3xl:grid-cols-3 gap-3">
        <Cpu cpu={cpu} nextUpdateIn={nextUpdateIn} />
        <DiskIo diskIo={diskIo} />
        <Memory memory={memory} nextUpdateIn={nextUpdateIn} />
        <Uptime uptime={uptime} />
        <div className="col-span-2">
          <Disks disks={disks} />
        </div>
      </div>
      <div className="mt-3">
        <NetworkConnectionsGroup network={network} />
      </div>
    </main>
  );
}
