"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DataPipelineProps {
  className?: string;
}

// 노드 데이터 정의
const nodes = [
  {
    id: "beusable",
    label: "Beusable",
    sublabel: "히트맵 데이터",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6 md:w-8 md:h-8"
      >
        {/* 히트맵 그리드 */}
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <rect x="6" y="6" width="4" height="4" fill="currentColor" opacity="0.9" />
        <rect x="10" y="6" width="4" height="4" fill="currentColor" opacity="0.6" />
        <rect x="14" y="6" width="4" height="4" fill="currentColor" opacity="0.3" />
        <rect x="6" y="10" width="4" height="4" fill="currentColor" opacity="0.7" />
        <rect x="10" y="10" width="4" height="4" fill="currentColor" opacity="0.8" />
        <rect x="14" y="10" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="6" y="14" width="4" height="4" fill="currentColor" opacity="0.2" />
        <rect x="10" y="14" width="4" height="4" fill="currentColor" opacity="0.5" />
        <rect x="14" y="14" width="4" height="4" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "ga4",
    label: "GA4",
    sublabel: "전환 데이터",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6 md:w-8 md:h-8"
      >
        {/* 차트 아이콘 */}
        <path d="M3 3v18h18" />
        <path d="M7 16l4-4 4 2 5-6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="16" r="1.5" fill="currentColor" />
        <circle cx="11" cy="12" r="1.5" fill="currentColor" />
        <circle cx="15" cy="14" r="1.5" fill="currentColor" />
        <circle cx="20" cy="8" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "collector",
    label: "수집 엔진",
    sublabel: "API 연동",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6 md:w-8 md:h-8"
      >
        {/* 수집 엔진 - 화살표 모음 */}
        <path d="M12 2v6" strokeLinecap="round" />
        <path d="M9 5l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="6" y="10" width="12" height="8" rx="2" />
        <path d="M10 14h4" strokeLinecap="round" />
        <path d="M12 20v2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "database",
    label: "통합 DB",
    sublabel: "BigQuery",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6 md:w-8 md:h-8"
      >
        {/* 데이터베이스 */}
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
  },
  {
    id: "dashboard",
    label: "분석 대시보드",
    sublabel: "Looker Studio",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6 md:w-8 md:h-8"
      >
        {/* 대시보드 */}
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <rect x="5" y="6" width="5" height="4" rx="1" fill="currentColor" opacity="0.3" />
        <rect x="12" y="6" width="7" height="2" rx="0.5" fill="currentColor" opacity="0.5" />
        <rect x="12" y="10" width="5" height="2" rx="0.5" fill="currentColor" opacity="0.3" />
        <path d="M8 21l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// 이징 함수 (cubic-bezier)
const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// 노드 등장 애니메이션
const getNodeAnimation = (i: number) => ({
  initial: { opacity: 0, y: 20, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.15,
      ease: easeOut,
    },
  },
});

// 화살표 등장 애니메이션
const getArrowAnimation = (i: number) => ({
  initial: { opacity: 0, scaleX: 0 },
  animate: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.4,
      delay: 0.5 + i * 0.15,
      ease: easeOut,
    },
  },
});

// 데이터 입자 애니메이션 설정
const getParticleAnimation = (i: number) => ({
  x: ["0%", "100%"],
  opacity: [0, 1, 1, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    delay: i * 0.3,
    ease: "linear" as const,
  },
});

/**
 * CRO 데이터 파이프라인 다이어그램
 * Beusable + GA4 데이터가 통합되어 분석 대시보드로 흐르는 과정을 시각화
 */
export function DataPipeline({ className }: DataPipelineProps) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto",
        "py-8 px-4 md:px-8",
        className
      )}
    >
      {/* 모바일: 세로 레이아웃, 데스크톱: 가로 레이아웃 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 min-w-fit">
        {nodes.map((node, index) => (
          <div key={node.id} className="flex flex-col md:flex-row items-center">
            {/* 노드 */}
            <motion.div
              {...getNodeAnimation(index)}
              className={cn(
                "relative flex flex-col items-center justify-center",
                "w-28 h-24 md:w-32 md:h-28",
                "rounded-xl",
                "bg-white",
                "border-2 border-neutral-200",
                "shadow-sm",
                "transition-shadow hover:shadow-md",
                // 데이터 소스 노드 (Beusable, GA4)에 살짝 다른 스타일
                (node.id === "beusable" || node.id === "ga4") && "border-accent/40"
              )}
            >
              {/* 아이콘 */}
              <div className="text-accent mb-2">
                {node.icon}
              </div>

              {/* 레이블 */}
              <span className="text-xs md:text-sm font-semibold text-foreground">
                {node.label}
              </span>

              {/* 서브레이블 */}
              <span className="text-[10px] md:text-xs text-muted mt-0.5">
                {node.sublabel}
              </span>
            </motion.div>

            {/* 화살표 (마지막 노드 제외) */}
            {index < nodes.length - 1 && (
              <motion.div
                {...getArrowAnimation(index)}
                className={cn(
                  "relative",
                  // 모바일: 세로 화살표, 데스크톱: 가로 화살표
                  "h-8 w-8 md:h-6 md:w-16 lg:w-20",
                  "flex items-center justify-center",
                  "origin-left"
                )}
              >
                {/* 가로 화살표 (데스크톱) */}
                <div className="hidden md:block relative w-full h-full">
                  {/* 화살표 라인 */}
                  <div className="absolute top-1/2 left-0 right-2 h-0.5 bg-gradient-to-r from-accent/60 to-accent -translate-y-1/2" />

                  {/* 화살표 머리 */}
                  <svg
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-accent"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path d="M2 6l8-4v8z" />
                  </svg>

                  {/* 데이터 입자 애니메이션 */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={getParticleAnimation(i)}
                        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-sm shadow-accent/50"
                        style={{ left: 0 }}
                      />
                    ))}
                  </div>
                </div>

                {/* 세로 화살표 (모바일) */}
                <div className="md:hidden relative w-full h-full">
                  {/* 화살표 라인 */}
                  <div className="absolute left-1/2 top-0 bottom-2 w-0.5 bg-gradient-to-b from-accent/60 to-accent -translate-x-1/2" />

                  {/* 화살표 머리 */}
                  <svg
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 text-accent rotate-90"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path d="M2 6l8-4v8z" />
                  </svg>

                  {/* 데이터 입자 애니메이션 (세로) */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        animate={{
                          y: ["0%", "100%"],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "linear",
                        }}
                        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-sm shadow-accent/50"
                        style={{ top: 0 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* 범례 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-8 text-xs md:text-sm text-muted"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded border-2 border-accent/40 bg-white" />
          <span>데이터 소스</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded border-2 border-neutral-200 bg-white" />
          <span>처리/저장</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <div className="w-4 h-0.5 bg-accent/60" />
            <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-transparent border-l-accent" />
          </div>
          <span>데이터 흐름</span>
        </div>
      </motion.div>
    </div>
  );
}

export type { DataPipelineProps };
