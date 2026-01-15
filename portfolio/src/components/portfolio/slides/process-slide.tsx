import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProcessSlideProps {
  children?: ReactNode;
  className?: string;
  /** 슬라이드 제목 */
  heading?: string;
  /** 접근 방식 설명 (불릿 리스트) */
  approach?: string[];
}

/**
 * 과정 슬라이드 컴포넌트
 * 다이어그램이 중심. 최소한의 텍스트.
 */
export function ProcessSlide({
  children,
  className,
  heading,
  approach,
}: ProcessSlideProps) {
  const hasApproach = approach && approach.length > 0;

  return (
    <div
      className={cn(
        "flex flex-col",
        "w-full h-full p-6 md:p-12",
        className
      )}
    >
      {heading && (
        <h2 className="text-sm md:text-base font-medium text-accent uppercase tracking-widest mb-4 md:mb-6 flex-shrink-0">
          {heading}
        </h2>
      )}

      {/* 접근 방식 설명 */}
      {hasApproach && (
        <ul className="mb-4 md:mb-6 space-y-1.5 max-w-2xl flex-shrink-0">
          {approach.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-foreground/70">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 다이어그램 영역 - 남은 공간 전체 사용 */}
      {children && (
        <div className="flex-1 min-h-0 flex items-center justify-center overflow-auto">
          {children}
        </div>
      )}
    </div>
  );
}

export type { ProcessSlideProps };
