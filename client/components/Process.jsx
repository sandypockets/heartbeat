import { useEffect, useState } from 'react';
import queryNextApi from '@/helpers/queryNextApi';

export default function Process({ pid }) {
  const [process, setProcess] = useState({});

  useEffect(() => {
    const params = `?pid=${pid}`;
    queryNextApi('process', params).then(data => setProcess(data));
  }, [pid]);

  return (
    <div className="my-2 border-b border-white pb-3 mb-3">
      <p className="flex justify-between font-mono">
        <span className="text-xl font-semibold">{process['name']}</span>
        <span className="text-2xl">{process['pid']}</span>
      </p>
      <p className="mt-3 font-mono break-words text-wrap whitespace-normal overflow-scroll">{process['cmdline']}</p>
    </div>
  );
}
