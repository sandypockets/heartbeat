export default function ItemWrapper({ children, bg = 'bg-gray-800' }) {
  return <div className={`w-60 p-2 rounded-md ${bg}`}>{children}</div>;
}
