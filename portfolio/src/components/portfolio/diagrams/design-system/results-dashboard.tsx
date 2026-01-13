"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCountUp } from "../hooks";

// 보라 계열 액센트 컬러
const PURPLE = "#7C3AED";
const PURPLE_LIGHT = "#A78BFA";
const PURPLE_BG = "rgba(124, 58, 237, 0.1)";

/**
 * 아이콘 컴포넌트들
 */
function SpeedIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function ColorScaleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  );
}

function FigmaIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  );
}

function StorybookIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.34 1.1l-.14 2.76a.15.15 0 00.24.12l.9-.7.72.6a.15.15 0 00.24-.12l-.13-2.8L20.5.6c.84-.04 1.53.63 1.5 1.47L21.4 21c-.03.8-.67 1.44-1.47 1.47l-15.4.53c-.83.03-1.53-.6-1.53-1.43V2.47c0-.8.63-1.47 1.43-1.5l11.9-.4v.53zM14.86 9.32c0 .38 2.54.2 2.88-.07 0-2.56-1.38-3.9-3.9-3.9-2.53 0-3.94 1.37-3.94 3.43 0 3.55 4.79 3.62 4.79 5.56 0 .55-.25.87-.82.87-.74 0-1.04-.39-1.01-1.7 0-.3-2.94-.4-3.04 0-.22 3.2 1.77 4.13 4.08 4.13 2.22 0 3.95-1.18 3.95-3.32 0-3.8-4.87-3.7-4.87-5.6 0-.76.37-1.09.95-1.09.64 0 .93.24.93 1.7z" />
    </svg>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit?: string;
  prefix?: string;
  suffix?: string;
  description: string;
  delay?: number;
  shouldAnimate: boolean;
  decimals?: number;
}

/**
 * 개별 메트릭 카드 컴포넌트
 */
function MetricCard({
  icon,
  label,
  value,
  unit,
  prefix = "",
  suffix = "",
  description,
  delay = 0,
  shouldAnimate,
  decimals = 0,
}: MetricCardProps) {
  const animatedValue = useCountUp(value, 1500, shouldAnimate, decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay: delay / 1000 }}
      className={cn(
        "rounded-2xl p-6",
        "bg-white border border-neutral-200",
        "shadow-sm hover:shadow-md transition-shadow duration-300"
      )}
    >
      {/* 아이콘 + 레이블 */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: PURPLE_BG }}
        >
          <div className="w-5 h-5" style={{ color: PURPLE }}>
            {icon}
          </div>
        </div>
        <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
          {label}
        </p>
      </div>

      {/* 수치 */}
      <div className="flex items-baseline gap-1 mb-2">
        <span
          className="text-4xl md:text-5xl font-bold tabular-nums"
          style={{ color: PURPLE }}
        >
          {prefix}
          {animatedValue}
          {suffix}
        </span>
        {unit && (
          <span className="text-xl font-semibold text-neutral-600">{unit}</span>
        )}
      </div>

      {/* 설명 */}
      <p className="text-sm text-neutral-500">{description}</p>
    </motion.div>
  );
}

interface ResultsDashboardProps {
  className?: string;
}

/**
 * 디자인 시스템 결과 지표 대시보드 컴포넌트
 * - 작업속도 20% 단축
 * - 컬러 스케일 10단계 체계화
 * - Figma Variables 도입
 * - Storybook 연동
 */
export function ResultsDashboard({ className }: ResultsDashboardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShouldAnimate(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {/* 메트릭 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* 카드 1: 작업속도 단축 */}
        <MetricCard
          icon={<SpeedIcon className="w-full h-full" />}
          label="작업 속도"
          value={20}
          prefix="-"
          suffix="%"
          description="디자인-개발 협업 시간 단축"
          delay={0}
          shouldAnimate={shouldAnimate}
        />

        {/* 카드 2: 컬러 스케일 체계화 */}
        <MetricCard
          icon={<ColorScaleIcon className="w-full h-full" />}
          label="컬러 스케일"
          value={10}
          unit="단계"
          description="체계적인 색상 팔레트 구축"
          delay={100}
          shouldAnimate={shouldAnimate}
        />

        {/* 카드 3: Figma Variables */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className={cn(
            "rounded-2xl p-6",
            "bg-white border border-neutral-200",
            "shadow-sm hover:shadow-md transition-shadow duration-300"
          )}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: PURPLE_BG }}
            >
              <FigmaIcon className="w-5 h-5" style={{ color: PURPLE }} />
            </div>
            <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
              Variables
            </p>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span
              className="text-2xl md:text-3xl font-bold"
              style={{ color: PURPLE }}
            >
              Figma
            </span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
              className="px-2 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: PURPLE_BG, color: PURPLE }}
            >
              도입 완료
            </motion.span>
          </div>
          <p className="text-sm text-neutral-500">
            디자인 토큰 중앙 관리 체계
          </p>
        </motion.div>

        {/* 카드 4: Storybook 연동 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className={cn(
            "rounded-2xl p-6",
            "bg-white border border-neutral-200",
            "shadow-sm hover:shadow-md transition-shadow duration-300"
          )}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: PURPLE_BG }}
            >
              <StorybookIcon className="w-5 h-5" style={{ color: PURPLE }} />
            </div>
            <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
              Storybook
            </p>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span
              className="text-2xl md:text-3xl font-bold"
              style={{ color: PURPLE }}
            >
              Component
            </span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
              className="px-2 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: PURPLE_BG, color: PURPLE }}
            >
              연동
            </motion.span>
          </div>
          <p className="text-sm text-neutral-500">
            컴포넌트 문서화 및 테스트 환경
          </p>
        </motion.div>
      </div>

      {/* Before/After 비교 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        className="mt-6 p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm"
      >
        <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-6">
          팀 효율성 비교
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">
                Before
              </span>
              <span className="text-xs text-neutral-400">
                디자인 시스템 도입 전
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">디자인-개발 싱크</span>
                <span className="text-neutral-400">수동 업데이트</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={shouldAnimate ? { width: "100%" } : {}}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  className="h-full bg-neutral-300 rounded-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">컬러 일관성</span>
                <span className="text-neutral-400">불규칙</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={shouldAnimate ? { width: "60%" } : {}}
                  transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                  className="h-full bg-neutral-300 rounded-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">컴포넌트 재사용</span>
                <span className="text-neutral-400">낮음</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={shouldAnimate ? { width: "40%" } : {}}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  className="h-full bg-neutral-300 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* After */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium" style={{ color: PURPLE }}>
                After
              </span>
              <span className="text-xs" style={{ color: PURPLE_LIGHT }}>
                디자인 시스템 도입 후
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">디자인-개발 싱크</span>
                <span style={{ color: PURPLE }}>자동 동기화</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={shouldAnimate ? { width: "80%" } : {}}
                  transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${PURPLE}, ${PURPLE_LIGHT})`,
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">컬러 일관성</span>
                <span style={{ color: PURPLE }}>10단계 체계</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={shouldAnimate ? { width: "95%" } : {}}
                  transition={{ duration: 1, delay: 1.0, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${PURPLE}, ${PURPLE_LIGHT})`,
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">컴포넌트 재사용</span>
                <span style={{ color: PURPLE }}>높음</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={shouldAnimate ? { width: "90%" } : {}}
                  transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${PURPLE}, ${PURPLE_LIGHT})`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ResultsDashboard;
