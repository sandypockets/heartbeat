import { useEffect, useState } from 'react';
import queryNextApi from '@/helpers/queryNextApi';

export default function Process({ pid }) {
  const [process, setProcess] = useState({});

  useEffect(() => {
    const params = `?pid=${pid}`;
    queryNextApi('process', params).then(data => setProcess(data));
  }, [pid]);

  return (
    <div>
      <ul>
        <li>Process name: {process['name']}</li>
        <li>ID: {process['pid']}</li>
        <li>
          <span>Command line process:</span>
          <p className="break-words overflow-scroll h-24">{process['cmdline']}</p>
        </li>
      </ul>
    </div>
  );
}
