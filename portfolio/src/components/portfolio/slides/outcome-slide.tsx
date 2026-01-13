import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  /** 슬라이드 제목 */
  heading?: string;
  /** 결과 요약 문구 */
  summary?: string;
  /** 핵심 지표들 */
  metrics?: Metric[];
}

/**
 * 결과/지표 슬라이드 컴포넌트
 * 프로젝트의 성과와 핵심 지표를 표시하는 슬라이드. 숫자 강조 레이아웃.
 *
 * @example
 * <OutcomeSlide
 *   heading="결과"
 *   summary="사용자 경험 개선으로 핵심 지표 달성"
 *   metrics={[
 *     { label: "이탈률", value: "32%", change: "-18%p", positive: true },
 *     { label: "전환율", value: "4.2%", change: "+1.8%p", positive: true },
 *     { label: "NPS", value: "72", change: "+15", positive: true },
 *   ]}
 * />
 */
export function OutcomeSlide({
  children,
  backgroundColor,
  textColor,
  className,
  heading,
  summary,
  metrics,
}: OutcomeSlideProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center",
        "w-full h-full p-12",
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

      {summary && (
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-10 max-w-3xl">
          {summary}
        </p>
      )}

      {children ? (
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
                <span className="text-4xl md:text-5xl font-bold tabular-nums">
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
