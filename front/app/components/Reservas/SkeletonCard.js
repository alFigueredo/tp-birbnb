export default function SkeletonCard() {
  return (
    <div className="animate-pulse mx-auto w-full bg-white rounded-xl shadow p-6 space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-4 mt-2 bg-gray-200 rounded w-1/4" />
      <div className="h-4 mt-2 ml-auto bg-gray-200 rounded w-1/4" />
    </div>
  );
}
