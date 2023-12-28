export default function FlexRowGrid({ children }) {
  return <div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 5xl:grid-cols-4 gap-3 mt-3">{children}</div>;
}
