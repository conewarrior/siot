import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CoverSlideProps {
  children?: ReactNode;
  backgroundColor?: string;
  textColor?: string;
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
 *
 * @example
 * <CoverSlide
 *   name="김한솔"
 *   title="Product Designer"
 *   subtitle="사용자 중심의 경험을 설계합니다"
 * />
 *
 * @example
 * // children으로 커스텀 콘텐츠 사용
 * <CoverSlide backgroundColor="#1a1a2e" textColor="#ffffff">
 *   <h1>프로젝트 제목</h1>
 *   <p>2024</p>
 * </CoverSlide>
 */
export function CoverSlide({
  children,
  backgroundColor,
  textColor,
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
        "w-full h-full p-12",
        "text-center",
        className
      )}
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {children ? (
        children
      ) : hasDefaultContent ? (
        <div className="flex flex-col items-center gap-4">
          {name && (
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
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
