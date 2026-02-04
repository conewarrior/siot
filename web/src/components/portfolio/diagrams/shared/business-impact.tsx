"use client";

import { cn } from "@/lib/utils";

interface MetricProps {
  label: string;
  value: string;
  subtext?: string;
  accent?: boolean;
}

function Metric({ label, value, subtext, accent }: MetricProps) {
  return (
    <div className="text-center">
      <p className="text-sm text-muted uppercase tracking-wide mb-2">{label}</p>
      <p className={cn(
        "text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums",
        accent ? "text-accent" : "text-foreground"
      )}>
        {value}
      </p>
      {subtext && (
        <p className="text-sm text-muted mt-2">{subtext}</p>
      )}
    </div>
  );
}

interface BusinessImpactProps {
  metrics: MetricProps[];
  highlight?: string;
  className?: string;
}

export function BusinessImpact({ metrics, highlight, className }: BusinessImpactProps) {
  return (
    <div className={cn("flex flex-col items-center gap-12", className)}>
      {/* 핵심 메트릭 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-4xl">
        {metrics.map((metric, i) => (
          <Metric key={i} {...metric} />
        ))}
      </div>

      {/* 강조 문구 */}
      {highlight && (
        <div className="mt-4 p-6 rounded-xl bg-accent/10 border border-accent/20 max-w-2xl">
          <p className="text-lg md:text-xl text-center text-foreground">
            {highlight}
          </p>
        </div>
      )}
    </div>
  );
}

// 프로젝트별 비즈니스 임팩트 컴포넌트

export function CROBusinessImpact() {
  return (
    <BusinessImpact
      metrics={[
        { label: "분석 대상 캠페인", value: "120+", subtext: "광고 캠페인" },
        { label: "처리 데이터", value: "50M+", subtext: "클릭/노출 이벤트" },
        { label: "목표 ROAS 개선", value: "+15%", accent: true },
      ]}
      highlight="데이터 기반 의사결정으로 광고 효율 극대화"
    />
  );
}

export function LabelingBusinessImpact() {
  return (
    <BusinessImpact
      metrics={[
        { label: "연간 작업비", value: "4.2억", subtext: "전체 매출의 20%" },
        { label: "목표", value: "+10%", subtext: "작업속도 향상", accent: true },
        { label: "기대 절감액", value: "4,200만", subtext: "연간" },
      ]}
      highlight="작업속도 10% 향상 시 연 4,200만원 절감 가능"
    />
  );
}

export function DesignSystemBusinessImpact() {
  return (
    <BusinessImpact
      metrics={[
        { label: "디자인 시스템 도입 전", value: "0%", subtext: "토큰 일관성" },
        { label: "컴포넌트 수", value: "50+", subtext: "관리 대상" },
        { label: "목표 개발 효율", value: "+30%", accent: true },
      ]}
      highlight="체계적인 디자인 토큰으로 디자인-개발 협업 효율화"
    />
  );
}

export function UIFlowBusinessImpact() {
  return (
    <BusinessImpact
      metrics={[
        { label: "기존 기능 수", value: "12개", subtext: "분산된 UI" },
        { label: "사용자 혼란", value: "높음", subtext: "VOC 다수" },
        { label: "목표", value: "통합", accent: true, subtext: "일관된 UX" },
      ]}
      highlight="분산된 기능을 하나의 흐름으로 통합하여 사용성 개선"
    />
  );
}
