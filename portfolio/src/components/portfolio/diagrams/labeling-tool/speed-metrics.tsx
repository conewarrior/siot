"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCountUp } from "../hooks";

// 핑크 액센트 컬러
const PINK = "#EC4899";
const PINK_LIGHT = "#F472B6";
const PINK_BG = "rgba(236, 72, 153, 0.1)";

interface SpeedMetricsProps {
  className?: string;
}

/**
 * 라벨링 툴 작업 속도 개선 지표 컴포넌트
 * - 작업속도 11.57% 향상
 * - 클래스 선택 속도 4.53초 → 3.12초
 * - 연간 절감액 4,200만원
 */
export function SpeedMetrics({ className }: SpeedMetricsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShouldAnimate(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // 카운트업 애니메이션
  const speedImprovement = useCountUp(11.57, 1500, shouldAnimate, 2);
  const beforeTime = useCountUp(4.53, 1200, shouldAnimate, 2);
  const afterTime = useCountUp(3.12, 1400, shouldAnimate, 2);
  const savings = useCountUp(4200, 1600, shouldAnimate, 0);

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {/* 메트릭 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 카드 1: 작업속도 향상 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
          className={cn(
            "rounded-2xl p-6 md:p-8",
            "bg-white border border-neutral-200",
            "shadow-sm hover:shadow-md transition-shadow duration-300"
          )}
        >
          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-4">
            작업 속도 향상
          </p>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-5xl md:text-6xl font-bold tabular-nums" style={{ color: PINK }}>
              +{speedImprovement}
            </span>
            <span className="text-2xl font-semibold" style={{ color: PINK }}>%</span>
          </div>
          <p className="text-sm text-neutral-500">
            전체 라벨링 작업 효율 개선
          </p>
        </motion.div>

        {/* 카드 2: 클래스 선택 시간 단축 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className={cn(
            "rounded-2xl p-6 md:p-8",
            "bg-white border border-neutral-200",
            "shadow-sm hover:shadow-md transition-shadow duration-300"
          )}
        >
          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-4">
            클래스 선택 시간
          </p>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl md:text-4xl font-semibold tabular-nums text-neutral-400 line-through">
              {beforeTime}초
            </span>
            <svg
              className="w-6 h-6 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke={PINK}
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="text-4xl md:text-5xl font-bold tabular-nums" style={{ color: PINK }}>
              {afterTime}초
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: PINK_BG, color: PINK }}
          >
            <span className="rotate-180">↓</span>
            <span>31% 단축</span>
          </motion.div>
        </motion.div>

        {/* 카드 3: 연간 절감액 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className={cn(
            "rounded-2xl p-6 md:p-8",
            "bg-white border border-neutral-200",
            "shadow-sm hover:shadow-md transition-shadow duration-300"
          )}
        >
          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-4">
            연간 절감 가능액
          </p>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-4xl md:text-5xl font-bold tabular-nums" style={{ color: PINK }}>
              {savings.toLocaleString()}
            </span>
            <span className="text-xl font-semibold text-neutral-600">만원</span>
          </div>
          <p className="text-sm text-neutral-500">
            인건비 기준 환산 (100명 기준)
          </p>
        </motion.div>
      </div>

      {/* 진행 바 시각화 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        className="mt-8 p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm"
      >
        <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-6">
          작업 시간 비교
        </p>
        <div className="space-y-4">
          {/* Before */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-400">Before</span>
              <span className="text-sm font-semibold tabular-nums text-neutral-600">4.53초</span>
            </div>
            <div className="h-4 bg-neutral-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={shouldAnimate ? { width: "100%" } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="h-full bg-neutral-300 rounded-full"
              />
            </div>
          </div>
          {/* After */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: PINK }}>After</span>
              <span className="text-sm font-semibold tabular-nums" style={{ color: PINK }}>3.12초</span>
            </div>
            <div className="h-4 bg-neutral-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={shouldAnimate ? { width: "68.9%" } : {}}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(to right, ${PINK}, ${PINK_LIGHT})` }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SpeedMetrics;
