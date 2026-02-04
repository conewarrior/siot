import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Body, Caption } from "@/components/portfolio/typography";

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
 * 상하 분리 레이아웃: 상단 접근 방식 요약, 하단 다이어그램/스크린샷
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
      {/* 라벨 */}
      {heading && (
        <Caption className="text-accent uppercase tracking-widest mb-4 flex-shrink-0">
          PROCESS: {heading}
        </Caption>
      )}

      {/* 상단 - 접근 방식 요약 */}
      {hasApproach && (
        <ul className="mb-6 md:mb-8 space-y-2 max-w-2xl flex-shrink-0">
          {approach.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
              <Body className="text-foreground/70">{item}</Body>
            </li>
          ))}
        </ul>
      )}

      {/* 하단 - 풀 너비 다이어그램/스크린샷 (잘림 방지) */}
      {children && (
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <div className="w-full max-h-full [&_img]:object-contain [&_img]:w-full [&_img]:h-auto [&_img]:max-h-[400px]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export type { ProcessSlideProps };
