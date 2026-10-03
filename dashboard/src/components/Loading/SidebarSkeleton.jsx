import React from 'react';

const SidebarItemSkeleton = () => (
  <div className="flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl animate-pulse">
    {/* Icon Placeholder */}
    <div className="w-6 h-6 bg-gray-200 rounded-md shrink-0"></div>
    {/* Text Placeholder */}
    <div className="h-4 bg-gray-200 rounded w-24"></div>
  </div>
);

const SidebarSkeleton = () => {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Header Skeleton */}
      <div className="h-20 flex items-center justify-center border-b border-gray-100 mb-6">
         <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Navigation Items Skeleton */}
      <div className="space-y-2">
        <SidebarItemSkeleton />
        <SidebarItemSkeleton />
        <SidebarItemSkeleton />
        <SidebarItemSkeleton />
      </div>

      {/* Divider */}
      <div className="my-4 mx-4 h-px bg-gray-100"></div>

      {/* Secondary Items Skeleton */}
      <div className="space-y-2">
        <SidebarItemSkeleton />
        <SidebarItemSkeleton />
      </div>

      {/* Bottom Profile Skeleton */}
      <div className="mt-auto p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex flex-col gap-2">
            <div className="w-20 h-3 bg-gray-200 rounded"></div>
            <div className="w-16 h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
