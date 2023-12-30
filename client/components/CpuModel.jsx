export default function CpuModel({ cpuModel }) {
  return (
    <div className="bg-gray-800 p-5 rounded-md">
      <div className="flex flex-col gap-3">
        <p className="flex justify-between text-xl">
          <span>Vendor</span>
          <span className="font-mono text-md">{cpuModel['vendorId']}</span>
        </p>
        <p className="flex justify-between">
          <span>Model</span>
          <span className="font-mono text-md"> {cpuModel['model']}</span>{' '}
        </p>
        <p className="flex justify-between">
          <span>Cores</span>
          <span className="font-mono text-md"> {cpuModel['cores']}</span>{' '}
        </p>
        <p className="flex justify-between">
          <span>Model name</span>
          <span className="font-mono text-md"> {cpuModel['modelName']}</span>{' '}
        </p>
        <p className="flex justify-between">
          <span>Mhz</span>
          <span className="font-mono text-md"> {cpuModel['mhz']}</span>{' '}
        </p>
        <p className="flex justify-between">
          <span>Cache size</span>
          <span className="font-mono text-md"> {cpuModel['cacheSize']}</span>{' '}
        </p>
      </div>
    </div>
  );
}
