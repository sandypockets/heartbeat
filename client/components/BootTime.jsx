export default function BootTime({ bootTime }) {
  const readableBootTime = new Date(bootTime * 1000).toLocaleString();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h3 className="text-2xl font-bold">Boot time</h3>
        <p className="text-xl font-bold">{readableBootTime}</p>
      </div>
    </div>
  );
}
