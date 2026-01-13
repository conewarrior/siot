"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCountUp } from "../hooks";

interface ShortcutData {
  name: string;
  shortcut: string;
  before: number;
  after: number;
}

const shortcutData: ShortcutData[] = [
  { name: "Delete", shortcut: "Del", before: 45, after: 62 },
  { name: "Copy", shortcut: "Ctrl+C", before: 38, after: 55 },
  { name: "Undo", shortcut: "Ctrl+Z", before: 52, after: 68 },
  { name: "Zoom", shortcut: "Ctrl+Scroll", before: 28, after: 45 },
];

interface ShortcutBarProps {
  data: ShortcutData;
  index: number;
  shouldAnimate: boolean;
}

/**
 * 개별 단축키 막대 컴포넌트
 */
function ShortcutBar({ data, index, shouldAnimate }: ShortcutBarProps) {
  const delay = index * 0.15;
  const beforeCount = useCountUp(data.before, 1000, shouldAnimate);
  const afterCount = useCountUp(data.after, 1200, shouldAnimate);
  const improvement = Math.round(((data.after - data.before) / data.before) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={shouldAnimate ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="space-y-2"
    >
      {/* 단축키 레이블 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-neutral-800">{data.name}</span>
          <span className="rounded bg-neutral-100 px-2 py-0.5 font-mono text-xs text-neutral-500">
            {data.shortcut}
          </span>
        </div>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: delay + 0.6 }}
          className="text-sm font-semibold text-pink-500"
        >
          +{improvement}%
        </motion.span>
      </div>

      {/* Before/After 막대 */}
      <div className="space-y-1.5">
        {/* Before 막대 */}
        <div className="flex items-center gap-3">
          <span className="w-12 text-right text-xs text-neutral-400">Before</span>
          <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-neutral-100">
            <motion.div
              initial={{ width: 0 }}
              animate={shouldAnimate ? { width: `${data.before}%` } : {}}
              transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 rounded-md bg-neutral-300"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-xs font-medium tabular-nums text-neutral-500">
              {beforeCount}%
            </span>
          </div>
        </div>

        {/* After 막대 */}
        <div className="flex items-center gap-3">
          <span className="w-12 text-right text-xs font-medium text-pink-500">After</span>
          <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-pink-50">
            <motion.div
              initial={{ width: 0 }}
              animate={shouldAnimate ? { width: `${data.after}%` } : {}}
              transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 rounded-md bg-gradient-to-r from-pink-400 to-pink-500"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-xs font-semibold tabular-nums text-pink-600">
              {afterCount}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface ShortcutUsageChartProps {
  className?: string;
}

/**
 * 라벨링 툴 단축키 사용률 비교 차트
 * - 1차 vs 2차 단축키 사용빈도 비교 (33% 증가)
 * - Before/After 막대 차트
 * - 개별 단축키별 데이터 표시
 */
export function ShortcutUsageChart({ className }: ShortcutUsageChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShouldAnimate(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // 전체 평균 계산
  const avgBefore = Math.round(
    shortcutData.reduce((sum, d) => sum + d.before, 0) / shortcutData.length
  );
  const avgAfter = Math.round(
    shortcutData.reduce((sum, d) => sum + d.after, 0) / shortcutData.length
  );
  const totalImprovement = Math.round(((avgAfter - avgBefore) / avgBefore) * 100);

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {/* 차트 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h3 className="mb-2 text-2xl font-bold text-neutral-800 md:text-3xl">
          단축키 사용률 비교
        </h3>
        <p className="text-sm text-neutral-500 md:text-base">
          1차 vs 2차 인터페이스 개선 후 변화
        </p>
      </motion.div>

      {/* 메인 차트 영역 */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        {/* 전체 개선율 강조 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-pink-50 to-pink-100 px-6 py-4">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                평균 사용률
              </p>
              <p className="text-2xl font-bold tabular-nums text-neutral-400">
                {avgBefore}%
              </p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={shouldAnimate ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5, type: "spring" }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-white"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.div>
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-pink-500">
                개선 후
              </p>
              <p className="text-2xl font-bold tabular-nums text-pink-600">
                {avgAfter}%
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={shouldAnimate ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="ml-2 rounded-full bg-pink-500 px-3 py-1 text-sm font-bold text-white"
            >
              +{totalImprovement}%
            </motion.div>
          </div>
        </motion.div>

        {/* 개별 단축키 막대 차트 */}
        <div className="space-y-6">
          {shortcutData.map((data, index) => (
            <ShortcutBar
              key={data.name}
              data={data}
              index={index}
              shouldAnimate={shouldAnimate}
            />
          ))}
        </div>

        {/* 범례 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 flex items-center justify-center gap-6 border-t border-neutral-100 pt-6"
        >
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-neutral-300" />
            <span className="text-xs text-neutral-500">1차 (Before)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-gradient-to-r from-pink-400 to-pink-500" />
            <span className="text-xs text-neutral-500">2차 (After)</span>
          </div>
        </motion.div>
      </div>

      {/* 부가 정보 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="mt-4 text-center text-xs text-neutral-400"
      >
        * 사용자 로그 분석 기반, 100명 대상 2주간 측정 결과
      </motion.p>
    </div>
  );
}

export default ShortcutUsageChart;
