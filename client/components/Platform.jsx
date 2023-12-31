export default function Platform({ platform }) {
  return (
    <div className="flex flex-col gap-8 mt-12">
      <p className="flex justify-between">
        <span className="text-2xl font-semibold">Hostname</span>
        <span className="font-mono">{platform['hostname']}</span>
      </p>
      <p className="flex justify-between">
        <span className="text-2xl font-semibold">Operating system</span>
        <span className="font-mono">{platform['os']}</span>
      </p>
      <p className="flex justify-between">
        <span className="text-2xl font-semibold">Platform</span>
        <span className="font-mono">{platform['platform']}</span>
      </p>
      <p className="flex justify-between">
        <span className="text-2xl font-semibold">Platform family</span>
        <span className="font-mono">{platform['platformFamily']}</span>
      </p>
      <p className="flex justify-between">
        <span className="text-2xl font-semibold">Platform version</span>
        <span className="font-mono">{platform['platformVersion']}</span>
      </p>
      <p className="flex justify-between">
        <span className="text-2xl font-semibold">Kernel version</span>
        <span className="font-mono">{platform['kernelVersion']}</span>
      </p>
      <p className="flex justify-between">
        <span className="text-2xl font-semibold">Kernel Arch</span>
        <span className="font-mono">{platform['kernelArch']}</span>
      </p>
      <p className="flex justify-between">
        <span className="text-2xl font-semibold">Host ID</span>
        <span className="font-mono">{platform['hostid']}</span>
      </p>
    </div>
  );
}
