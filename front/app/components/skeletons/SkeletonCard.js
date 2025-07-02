export default function SkeletonCard() {
  return (
    <div className="animate-pulse mx-auto bg-white rounded-xl shadow p-6 space-y-4">
      <div className="h-48 w-[320px] bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />
    </div>
  );
}
