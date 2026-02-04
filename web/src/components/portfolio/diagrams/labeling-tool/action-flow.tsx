"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ActionFlowProps {
  className?: string;
}

// 작업 단계 데이터
interface Step {
  id: string;
  label: string;
  beforeTime: string;
  afterTime: string;
  isBottleneck?: boolean;
  isImproved?: boolean;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: "load",
    label: "이미지 로드",
    beforeTime: "1.2초",
    afterTime: "0.8초",
    isImproved: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "class",
    label: "클래스 선택",
    beforeTime: "4.53초",
    afterTime: "1.24초",
    isBottleneck: true,
    isImproved: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h4" strokeLinecap="round" />
        <circle cx="17" cy="15" r="2" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "region",
    label: "영역 지정",
    beforeTime: "3.12초",
    afterTime: "2.45초",
    isImproved: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="4" y="4" width="16" height="16" rx="1" strokeDasharray="3 3" />
        <rect x="8" y="8" width="8" height="8" fill="currentColor" opacity="0.2" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
        <circle cx="16" cy="8" r="1.5" fill="currentColor" />
        <circle cx="8" cy="16" r="1.5" fill="currentColor" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "save",
    label: "저장",
    beforeTime: "0.65초",
    afterTime: "0.43초",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
        <polyline points="17,21 17,13 7,13 7,21" />
        <polyline points="7,3 7,8 15,8" />
      </svg>
    ),
  },
];

// 이징 함수
const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// 단계 카드 애니메이션
const getStepAnimation = (i: number) => ({
  initial: { opacity: 0, y: 30, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: easeOut,
    },
  },
});

// 화살표 애니메이션
const getArrowAnimation = (i: number) => ({
  initial: { opacity: 0, scaleX: 0 },
  animate: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.3,
      delay: 0.3 + i * 0.12,
      ease: easeOut,
    },
  },
});

/**
 * 라벨링 툴 작업 흐름 분석 다이어그램
 * - 작업 단계별 흐름도 (이미지 로드 -> 클래스 선택 -> 영역 지정 -> 저장)
 * - 병목 지점 표시 (빨간색 강조)
 * - 개선 포인트 강조 (초록색 체크)
 * - 반응형 대응 (수평/수직 플로우)
 */
export function ActionFlow({ className }: ActionFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className={cn(
        "w-full overflow-x-auto",
        "py-6 px-4 md:px-8",
        className
      )}
    >
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          작업 흐름 분석
        </h3>
        <p className="text-sm text-muted">
          라벨링 작업 단계별 소요 시간 비교
        </p>
      </motion.div>

      {/* 플로우 다이어그램 */}
      {/* 데스크톱: 수평 플로우 */}
      <div className="hidden md:flex items-center justify-center gap-0 min-w-fit">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* 단계 카드 */}
            <motion.div
              {...(isInView ? getStepAnimation(index) : { initial: { opacity: 0 } })}
              animate={isInView ? getStepAnimation(index).animate : {}}
              className={cn(
                "relative flex flex-col items-center",
                "w-36 lg:w-44 p-4",
                "rounded-xl",
                "bg-white",
                "border-2 transition-all duration-300",
                step.isBottleneck
                  ? "border-red-400 shadow-red-100 shadow-lg"
                  : "border-neutral-200 shadow-sm hover:shadow-md"
              )}
            >
              {/* 병목 지점 배지 */}
              {step.isBottleneck && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.12, duration: 0.3 }}
                  className="absolute -top-2 -right-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-semibold rounded-full"
                >
                  병목
                </motion.div>
              )}

              {/* 개선 체크 배지 */}
              {step.isImproved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.12, duration: 0.3 }}
                  className="absolute -top-2 -left-2 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 111.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                </motion.div>
              )}

              {/* 아이콘 */}
              <div className={cn(
                "mb-3",
                step.isBottleneck ? "text-red-500" : "text-pink-500"
              )}>
                {step.icon}
              </div>

              {/* 레이블 */}
              <span className="text-sm font-semibold text-foreground mb-3">
                {step.label}
              </span>

              {/* 시간 비교 */}
              <div className="w-full space-y-1.5">
                {/* Before */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Before</span>
                  <span className={cn(
                    "font-mono tabular-nums",
                    step.isBottleneck ? "text-red-500 font-semibold" : "text-neutral-500"
                  )}>
                    {step.beforeTime}
                  </span>
                </div>
                {/* After */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-500 font-medium">After</span>
                  <span className="font-mono tabular-nums text-emerald-600 font-semibold">
                    {step.afterTime}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 화살표 (마지막 제외) */}
            {index < steps.length - 1 && (
              <motion.div
                {...(isInView ? getArrowAnimation(index) : { initial: { opacity: 0 } })}
                animate={isInView ? getArrowAnimation(index).animate : {}}
                className="relative w-12 lg:w-16 h-6 flex items-center justify-center origin-left"
              >
                {/* 화살표 라인 */}
                <div className="absolute top-1/2 left-0 right-2 h-0.5 bg-gradient-to-r from-pink-300 to-pink-500 -translate-y-1/2" />
                {/* 화살표 머리 */}
                <svg
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-pink-500"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                >
                  <path d="M2 6l8-4v8z" />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* 모바일: 수직 플로우 */}
      <div className="flex md:hidden flex-col items-center gap-0">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            {/* 단계 카드 */}
            <motion.div
              {...(isInView ? getStepAnimation(index) : { initial: { opacity: 0 } })}
              animate={isInView ? getStepAnimation(index).animate : {}}
              className={cn(
                "relative flex items-center gap-4",
                "w-full max-w-xs p-4",
                "rounded-xl",
                "bg-white",
                "border-2 transition-all duration-300",
                step.isBottleneck
                  ? "border-red-400 shadow-red-100 shadow-lg"
                  : "border-neutral-200 shadow-sm"
              )}
            >
              {/* 병목 지점 배지 */}
              {step.isBottleneck && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.12, duration: 0.3 }}
                  className="absolute -top-2 right-4 px-2 py-0.5 bg-red-500 text-white text-[10px] font-semibold rounded-full"
                >
                  병목
                </motion.div>
              )}

              {/* 개선 체크 배지 */}
              {step.isImproved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.12, duration: 0.3 }}
                  className="absolute -top-2 left-4 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 111.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                </motion.div>
              )}

              {/* 아이콘 */}
              <div className={cn(
                "flex-shrink-0",
                step.isBottleneck ? "text-red-500" : "text-pink-500"
              )}>
                {step.icon}
              </div>

              {/* 콘텐츠 */}
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-foreground block mb-1.5">
                  {step.label}
                </span>
                <div className="flex items-center gap-3 text-xs">
                  <span className={cn(
                    "font-mono tabular-nums",
                    step.isBottleneck ? "text-red-500 line-through" : "text-neutral-400 line-through"
                  )}>
                    {step.beforeTime}
                  </span>
                  <span className="text-neutral-300">→</span>
                  <span className="font-mono tabular-nums text-emerald-600 font-semibold">
                    {step.afterTime}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 화살표 (마지막 제외) */}
            {index < steps.length - 1 && (
              <motion.div
                {...(isInView ? getArrowAnimation(index) : { initial: { opacity: 0 } })}
                animate={isInView ? getArrowAnimation(index).animate : {}}
                className="relative w-6 h-8 flex items-center justify-center origin-top"
              >
                {/* 화살표 라인 */}
                <div className="absolute left-1/2 top-0 bottom-2 w-0.5 bg-gradient-to-b from-pink-300 to-pink-500 -translate-x-1/2" />
                {/* 화살표 머리 */}
                <svg
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 text-pink-500 rotate-90"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                >
                  <path d="M2 6l8-4v8z" />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* 범례 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-8 text-xs text-muted"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded border-2 border-red-400 bg-white" />
          <span>병목 지점</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5">
              <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 111.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
            </svg>
          </div>
          <span>개선 완료</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <div className="w-4 h-0.5 bg-pink-400" />
            <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-transparent border-l-pink-500" />
          </div>
          <span>작업 흐름</span>
        </div>
      </motion.div>

      {/* 총 시간 비교 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-8 p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl max-w-md mx-auto"
      >
        <div className="text-center">
          <p className="text-xs text-neutral-500 mb-2">총 라벨링 시간</p>
          <div className="flex items-center justify-center gap-4">
            <div>
              <span className="text-lg font-mono text-neutral-400 line-through">9.5초</span>
              <span className="text-xs text-neutral-400 ml-1">/건</span>
            </div>
            <span className="text-pink-500 font-bold">→</span>
            <div>
              <span className="text-2xl font-mono font-bold text-pink-600">4.9초</span>
              <span className="text-xs text-neutral-500 ml-1">/건</span>
            </div>
          </div>
          <p className="mt-2 text-sm font-semibold text-emerald-600">48% 단축</p>
        </div>
      </motion.div>
    </div>
  );
}

export type { ActionFlowProps };
