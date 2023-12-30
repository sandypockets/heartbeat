export default function Uptime({ uptime }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h3 className="text-2xl font-bold">Uptime since boot</h3>
        <p className="text-xl font-bold">
          <span className="pr-1">{uptime}</span>
          <span className="text-xs">sec</span>
        </p>
      </div>
    </div>
  );
}
