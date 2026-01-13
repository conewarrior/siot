import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FeatureConsolidation } from "@/components/portfolio/diagrams/ui-flow";

interface Metric {
  /** 지표 레이블 */
  label: string;
  /** 지표 값 */
  value: string;
  /** 변화량 (선택) */
  change?: string;
  /** 긍정적 변화 여부 */
  positive?: boolean;
}

interface OutcomeSlideProps {
  children?: ReactNode;
  className?: string;
  /** 슬라이드 제목 */
  heading?: string;
  /** 결과 요약 문구 */
  summary?: string;
  /** 핵심 지표들 */
  metrics?: Metric[];
  /** 다이어그램 컴포넌트 이름 */
  diagram?: "FeatureConsolidation";
}

/**
 * 결과/지표 슬라이드 컴포넌트
 * 프로젝트의 성과와 핵심 지표를 표시하는 슬라이드. 숫자 강조 레이아웃.
 */
// 다이어그램 컴포넌트 매핑
const diagramComponents = {
  FeatureConsolidation,
};

export function OutcomeSlide({
  children,
  className,
  heading,
  summary,
  metrics,
  diagram,
}: OutcomeSlideProps) {
  // 다이어그램 컴포넌트 렌더링
  const DiagramComponent = diagram ? diagramComponents[diagram] : null;
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

      {summary && (
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-10 max-w-3xl text-foreground">
          {summary}
        </p>
      )}

      {DiagramComponent ? (
        <div className="flex-1 overflow-auto">
          <DiagramComponent />
        </div>
      ) : children ? (
        <div className="flex-1">{children}</div>
      ) : metrics && metrics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={cn(
                "p-6 rounded-lg",
                "bg-secondary/50 border border-border"
              )}
            >
              {/* 지표 레이블 */}
              <p className="text-sm text-muted font-medium mb-2">
                {metric.label}
              </p>

              {/* 지표 값 */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl md:text-5xl font-bold tabular-nums text-foreground">
                  {metric.value}
                </span>

                {/* 변화량 */}
                {metric.change && (
                  <span
                    className={cn(
                      "text-lg font-medium",
                      metric.positive ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {metric.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export type { OutcomeSlideProps, Metric };
