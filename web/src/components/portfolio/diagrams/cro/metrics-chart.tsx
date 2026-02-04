"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCountUp } from "../hooks";

interface MetricCardProps {
  label: string;
  before: number;
  after: number;
  unit: string;
  improvement: string;
  delay?: number;
  isPositiveDown?: boolean; // 값이 줄어드는 것이 긍정적인 경우 (시간 단축 등)
}

/**
 * 개별 메트릭 비교 카드 컴포넌트
 */
function MetricCard({
  label,
  before,
  after,
  unit,
  improvement,
  delay = 0,
  isPositiveDown = false,
}: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShouldAnimate(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  const beforeCount = useCountUp(before, 1200, shouldAnimate, 1);
  const afterCount = useCountUp(after, 1500, shouldAnimate, 1);

  // 막대 그래프 비율 계산 (before 기준 100%)
  const beforeWidth = 100;
  const afterWidth = (after / before) * 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "rounded-2xl p-6 md:p-8",
        "bg-white border border-neutral-200",
        "shadow-sm hover:shadow-md transition-shadow duration-300"
      )}
    >
      {/* 레이블 */}
      <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-6">
        {label}
      </p>

      {/* Before/After 비교 막대 */}
      <div className="space-y-4 mb-6">
        {/* Before */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-medium text-neutral-400">Before</span>
            <span className="text-lg font-semibold tabular-nums text-neutral-600">
              {beforeCount}
              <span className="text-sm font-normal text-neutral-400 ml-1">
                {unit}
              </span>
            </span>
          </div>
          <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={shouldAnimate ? { width: `${beforeWidth}%` } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="h-full bg-neutral-300 rounded-full"
            />
          </div>
        </div>

        {/* After */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-medium text-accent">After</span>
            <span className="text-lg font-semibold tabular-nums text-foreground">
              {afterCount}
              <span className="text-sm font-normal text-neutral-400 ml-1">
                {unit}
              </span>
            </span>
          </div>
          <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={shouldAnimate ? { width: `${afterWidth}%` } : {}}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
            />
          </div>
        </div>
      </div>

      {/* 개선 수치 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full",
          "bg-accent/10 text-accent font-semibold"
        )}
      >
        <span className={cn(
          "text-lg",
          isPositiveDown ? "rotate-180" : ""
        )}>
          {isPositiveDown ? "↓" : "↑"}
        </span>
        <span className="text-xl tabular-nums">{improvement}</span>
      </motion.div>
    </motion.div>
  );
}

interface CROMetricsChartProps {
  className?: string;
}

/**
 * CRO 결과 지표 비교 차트
 * - 분석 시간 70% 단축: 8시간 → 2.5시간
 * - 전환율 15% 향상
 */
export function CROMetricsChart({ className }: CROMetricsChartProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* 차트 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 md:mb-12"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          성과 지표
        </h3>
        <p className="text-muted text-sm md:text-base">
          AI 기반 CRO 분석 도입 전후 비교
        </p>
      </motion.div>

      {/* 메트릭 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <MetricCard
          label="분석 소요 시간"
          before={8}
          after={2.5}
          unit="시간"
          improvement="70% 단축"
          delay={0}
          isPositiveDown={true}
        />
        <MetricCard
          label="전환율"
          before={2.8}
          after={3.2}
          unit="%"
          improvement="15% 향상"
          delay={200}
          isPositiveDown={false}
        />
      </div>

      {/* 부가 정보 */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center text-xs text-neutral-400 mt-6"
      >
        * 2024년 12월 기준, 주간 평균 데이터
      </motion.p>
    </div>
  );
}

export default CROMetricsChart;
