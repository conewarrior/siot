import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProblemSlideProps {
  children?: ReactNode;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  /** 슬라이드 제목 */
  heading?: string;
  /** 문제 배경 설명 */
  background?: string;
  /** 프로젝트 목표 */
  goal?: string;
}

/**
 * 문제 정의 슬라이드 컴포넌트
 * 프로젝트의 배경과 목표를 설명하는 슬라이드. 제목 + 본문 레이아웃.
 *
 * @example
 * <ProblemSlide
 *   heading="문제 정의"
 *   background="기존 시스템은 사용자 이탈률이 높았다"
 *   goal="이탈률 50% 감소"
 * />
 *
 * @example
 * // children으로 커스텀 콘텐츠 사용
 * <ProblemSlide heading="배경">
 *   <ul>
 *     <li>문제점 1</li>
 *     <li>문제점 2</li>
 *   </ul>
 * </ProblemSlide>
 */
export function ProblemSlide({
  children,
  backgroundColor,
  textColor,
  className,
  heading,
  background,
  goal,
}: ProblemSlideProps) {
  const hasDefaultContent = background || goal;

  return (
    <div
      className={cn(
        "h-full flex flex-col justify-center",
        "w-full p-12",
        className
      )}
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {heading && (
        <h2 className="text-sm md:text-base font-medium text-accent uppercase tracking-widest mb-6">
          {heading}
        </h2>
      )}

      {children ? (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </div>
      ) : hasDefaultContent ? (
        <div className="flex flex-col gap-8">
          {background && (
            <div>
              <h3 className="text-lg font-medium text-muted mb-2">배경</h3>
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug">
                {background}
              </p>
            </div>
          )}
          {goal && (
            <div>
              <h3 className="text-lg font-medium text-muted mb-2">목표</h3>
              <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-relaxed">
                {goal}
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export type { ProblemSlideProps };
