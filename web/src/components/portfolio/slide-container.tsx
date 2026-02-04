import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * 16:9 비율을 유지하는 슬라이드 컨테이너
 * 프레젠테이션 슬라이드나 비디오 형식의 콘텐츠를 감싸는 용도로 사용
 */
export function SlideContainer({ children, className }: SlideContainerProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-6xl mx-auto aspect-video",
        "border border-border rounded-lg",
        "bg-background overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
