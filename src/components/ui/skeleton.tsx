import { cn } from "@/shared/utils/components";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-700", className)}
      {...props}
    />
  );
}

export { Skeleton };
