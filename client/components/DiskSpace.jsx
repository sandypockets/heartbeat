import { bytesToGb } from '@/helpers/conversions';

export default function DiskSpace({ disk }) {
  let diskWarn = false;
  const lowPercent = 10;

  if (disk && disk['free'] < (disk['total'] * lowPercent) / 100) {
    diskWarn = true;
  }

  return (
    <div className="flex justify-between">
      <h3 className="text-2xl font-bold">Free space</h3>
      <div className="text-xl font-bold">
        {diskWarn ? (
          <p className="flex flex-col text-right">
            <span>Less than {lowPercent}% of disk space remaining</span>
            <span className="text-red-500">
              {disk && bytesToGb(disk['free'])} / {bytesToGb(disk['total'], true)} GB
            </span>
          </p>
        ) : (
          <p>{disk && bytesToGb(disk['free'])} GB</p>
        )}
      </div>
    </div>
  );
}
