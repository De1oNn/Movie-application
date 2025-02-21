export default function Skeleton({ height = "20px", width = "100%" }) {
  return (
    <div
      className="bg-gray-300 animate-pulse rounded-md"
      style={{ height, width }}
    ></div>
  );
}
