export default function SkeletonInfo() {
  return (
    <div className="animate-pulse bg-stone-400 block lg:flex justify-center items-center py-10 mx-auto max-w-11/12 lg:max-w-5xl rounded-md">
      <div className="h-44 lg:h-88 w-full md:w-[480px] bg-gray-200 rounded" />
      <div className="p-5 w-80 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <button className="py-1.5 px-3 my-3 bg-neutral-200 rounded-md h-8 w-22" />
      </div>
    </div>
  );
}
