export default function ItemWrapper({ children, bg = 'bg-gray-700' }) {
  return <div className={`w-full h-full p-2 rounded-md ${bg}`}>{children}</div>;
}
