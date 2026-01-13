import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProblemSlideProps {
  children?: ReactNode;
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
 */
export function ProblemSlide({
  children,
  className,
  heading,
  background,
  goal,
}: ProblemSlideProps) {
  const hasDefaultContent = background || goal;

  return (
    <div
      className={cn(
        "flex flex-col justify-center",
        "w-full p-12",
        className
      )}
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
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug text-foreground">
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
