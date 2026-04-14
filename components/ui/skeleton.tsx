"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-muted",
      className
    )}
  />
);

export const AuctionCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-white border border-border">
    <Skeleton className="aspect-[4/3] w-full" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  </div>
);

export const PageHeaderSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-10 w-64" />
    <Skeleton className="h-4 w-48" />
  </div>
);
