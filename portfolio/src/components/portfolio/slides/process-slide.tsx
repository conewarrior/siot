import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProcessStep {
  /** 단계 번호 또는 레이블 */
  label?: string;
  /** 단계 제목 */
  title: string;
  /** 단계 설명 */
  description?: string;
}

interface ProcessSlideProps {
  children?: ReactNode;
  className?: string;
  /** 슬라이드 제목 */
  heading?: string;
  /** 프로세스 단계들 */
  steps?: ProcessStep[];
  /** 레이아웃 방향 */
  layout?: "horizontal" | "vertical";
}

/**
 * 과정 슬라이드 컴포넌트
 * 프로젝트 진행 과정이나 방법론을 단계별로 나열하는 슬라이드.
 */
export function ProcessSlide({
  children,
  className,
  heading,
  steps,
  layout = "horizontal",
}: ProcessSlideProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center",
        "w-full p-12",
        className
      )}
    >
      {heading && (
        <h2 className="text-sm md:text-base font-medium text-accent uppercase tracking-widest mb-8">
          {heading}
        </h2>
      )}

      {children ? (
        <div className="flex-1">{children}</div>
      ) : steps && steps.length > 0 ? (
        <div
          className={cn(
            "flex gap-6 md:gap-8",
            layout === "horizontal"
              ? "flex-row flex-wrap"
              : "flex-col"
          )}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "flex-1 min-w-[200px]",
                layout === "horizontal" && "max-w-sm"
              )}
            >
              {/* 단계 번호/레이블 */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl md:text-4xl font-bold text-accent/30">
                  {step.label || String(index + 1).padStart(2, "0")}
                </span>
                {layout === "horizontal" && index < steps.length - 1 && (
                  <div className="hidden md:block flex-1 h-px bg-border" />
                )}
              </div>

              {/* 단계 제목 */}
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">
                {step.title}
              </h3>

              {/* 단계 설명 */}
              {step.description && (
                <p className="text-base text-muted leading-relaxed">
                  {step.description}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export type { ProcessSlideProps, ProcessStep };
