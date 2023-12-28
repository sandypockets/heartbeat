import { useState, useEffect } from 'react';
import queryNextApi from '@/helpers/queryNextApi';
import Cpu from '@/components/Cpu';
import Memory from '@/components/Memory';
import Network from '@/components/Network';
import Disks from '@/components/Disks';

export default function Home() {
  const [cpu, setCpu] = useState({});
  const [memory, setMemory] = useState({});
  const [disks, setDisks] = useState({});
  const [network, setNetwork] = useState({});
  const [nextUpdateIn, setNextUpdateIn] = useState(30);

  function tick() {
    if (nextUpdateIn > 1) {
      setNextUpdateIn(nextUpdateIn - 1);
    } else {
      setNextUpdateIn(30);
    }
  }

  useEffect(() => {
    queryNextApi('cpu').then(data => setCpu(data));
    queryNextApi('memory').then(data => setMemory(data['memory_usage']));
    queryNextApi('disk').then(data => setDisks(data['disk_usage']));
    queryNextApi('network').then(data => setNetwork(data));

    const interval = setInterval(async () => {
      const data = await queryNextApi('cpu');
      setCpu(data);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  }, [nextUpdateIn]);

  return (
    <main className="min-h-screen p-6 xl:p-24">
      <div className="mb-12">
        <h1 className="text-6xl font-bold mb-1">Heartbeat</h1>
        <span className="text-2xl">Keep a pulse on your machine's health</span>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">
          <div className="flex flex-col gap-6">
            <Cpu cpu={cpu} nextUpdate={nextUpdateIn} />
            <Memory memory={memory} />
          </div>
          <Disks disks={disks} />
        </div>
        <Network network={network} />
      </div>
    </main>
  );
}
