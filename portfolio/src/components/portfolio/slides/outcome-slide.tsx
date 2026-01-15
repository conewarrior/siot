import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FeatureConsolidation } from "@/components/portfolio/diagrams/ui-flow";
import { Body, Caption } from "@/components/portfolio/typography";

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

interface ReflectionItem {
  text: string;
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
  /** 잘한 점 (회고) */
  strengths?: ReflectionItem[];
  /** 개선할 점 (회고) */
  improvements?: ReflectionItem[];
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
  strengths,
  improvements,
}: OutcomeSlideProps) {
  // 다이어그램 컴포넌트 렌더링
  const DiagramComponent = diagram ? diagramComponents[diagram] : null;
  const hasReflection = (strengths && strengths.length > 0) || (improvements && improvements.length > 0);

  return (
    <div
      className={cn(
        "flex flex-col justify-center",
        "w-full p-12",
        className
      )}
    >
      {/* OUTCOME 라벨 */}
      {heading && (
        <Caption className="text-accent uppercase tracking-widest mb-4">
          {heading}
        </Caption>
      )}

      {/* 요약 문구 */}
      {summary && (
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-10 max-w-3xl text-foreground">
          {summary}
        </p>
      )}

      {/* 상단 - 핵심 성과 수치 (플랫한 스타일) */}
      {metrics && metrics.length > 0 && (
        <div className="flex flex-wrap gap-8 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col">
              {/* 큰 숫자 */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-accent tabular-nums">
                  {metric.value}
                </span>
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
              {/* 설명 */}
              <Caption>{metric.label}</Caption>
            </div>
          ))}
        </div>
      )}

      {/* 중단 - 다이어그램/이미지 영역 */}
      {DiagramComponent ? (
        <div className="flex-1 overflow-auto [&_img]:object-contain [&_img]:max-h-[300px]">
          <DiagramComponent />
        </div>
      ) : children ? (
        <div className="flex-1 [&_img]:object-contain [&_img]:max-h-[300px]">
          {children}
        </div>
      ) : null}

      {/* 하단 - 회고 영역 (카드 없이 2컬럼 텍스트) */}
      {hasReflection && (
        <div className="grid grid-cols-2 gap-8 mt-6">
          {/* 잘한 점 */}
          {strengths && strengths.length > 0 && (
            <div>
              <Caption className="text-foreground mb-3">잘한 점</Caption>
              <ul className="space-y-2">
                {strengths.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    <Body>{item.text}</Body>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 개선할 점 */}
          {improvements && improvements.length > 0 && (
            <div>
              <Caption className="text-foreground mb-3">개선할 점</Caption>
              <ul className="space-y-2">
                {improvements.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                    <Body>{item.text}</Body>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export type { OutcomeSlideProps, Metric, ReflectionItem };
