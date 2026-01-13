import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CoverSlideProps {
  children?: ReactNode;
  className?: string;
  /** 이름 */
  name?: string;
  /** 직함 */
  title?: string;
  /** 간단 소개 */
  subtitle?: string;
}

/**
 * 커버 슬라이드 컴포넌트
 * 프레젠테이션의 첫 슬라이드로 사용. 중앙 정렬, 큰 타이틀 스타일.
 */
export function CoverSlide({
  children,
  className,
  name,
  title,
  subtitle,
}: CoverSlideProps) {
  const hasDefaultContent = name || title || subtitle;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "w-full p-12",
        "text-center",
        className
      )}
    >
      {children ? (
        children
      ) : hasDefaultContent ? (
        <div className="flex flex-col items-center gap-4">
          {name && (
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              {name}
            </h1>
          )}
          {title && (
            <p className="text-xl md:text-2xl lg:text-3xl text-muted font-medium">
              {title}
            </p>
          )}
          {subtitle && (
            <p className="text-base md:text-lg text-muted/80 max-w-md mt-2">
              {subtitle}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export type { CoverSlideProps };
