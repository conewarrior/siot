import { cn } from "@/lib/utils";

interface GridProps {
  children: React.ReactNode;
  cols?: "4-8" | "6-6" | "5-7" | "8-4" | "3-9" | "full";
  gap?: "sm" | "md" | "lg";
  align?: "start" | "center" | "end";
  className?: string;
}

const colsClass = {
  "4-8":
    "grid-cols-12 [&>*:first-child]:col-span-4 [&>*:last-child]:col-span-8",
  "6-6":
    "grid-cols-12 [&>*:first-child]:col-span-6 [&>*:last-child]:col-span-6",
  "5-7":
    "grid-cols-12 [&>*:first-child]:col-span-5 [&>*:last-child]:col-span-7",
  "8-4":
    "grid-cols-12 [&>*:first-child]:col-span-8 [&>*:last-child]:col-span-4",
  "3-9":
    "grid-cols-12 [&>*:first-child]:col-span-3 [&>*:last-child]:col-span-9",
  full: "grid-cols-1",
};

const gapClass = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

const alignClass = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
};

export function Grid({
  children,
  cols = "6-6",
  gap = "md",
  align = "start",
  className,
}: GridProps) {
  return (
    <div
      className={cn(
        "grid",
        colsClass[cols],
        gapClass[gap],
        alignClass[align],
        className
      )}
    >
      {children}
    </div>
  );
}

interface GridItemProps {
  children: React.ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
}

const spanClass = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
} as const;

export function GridItem({ children, span = 6, className }: GridItemProps) {
  return (
    <div className={cn(spanClass[span], className)}>
      {children}
    </div>
  );
}
