import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between mb-6">
        <div>
          <Skeleton className="h-9 w-64 rounded-md" />

          <Skeleton className="mt-2 h-5 w-52 rounded-md" />
        </div>
        <div className="mb-6 flex gap-2">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="h-10 w-16 rounded-md" />
          ))}
        </div>
      </div>

      <Skeleton className="h-10 w-72 rounded-md" />

      <div className="mt-6 grid grid-cols-1 space-y-3 md:grid-cols-4 md:space-x-2 md:space-y-0">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-40 rounded-lg" />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 space-y-3 md:grid-cols-4 md:space-x-2 md:space-y-0">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-40 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
