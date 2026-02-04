"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// 파랑 계열 액센트 컬러
const BLUE_ACCENT = "#2563EB";
const BLUE_LIGHT = "#3B82F6";

// 아이콘 컴포넌트들
function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function ReportIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ArrowRightIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function LayersIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

// Before 분산 기능 박스
interface FeatureBoxProps {
  icon: React.ReactNode;
  label: string;
  delay?: number;
  size?: "sm" | "md";
}

function FeatureBox({ icon, label, delay = 0, size = "md" }: FeatureBoxProps) {
  const sizeClasses = size === "sm"
    ? "w-16 h-14 md:w-20 md:h-16"
    : "w-20 h-16 md:w-24 md:h-20";
  const iconSize = size === "sm" ? "w-4 h-4 md:w-5 md:h-5" : "w-5 h-5 md:w-6 md:h-6";
  const textSize = size === "sm" ? "text-[9px] md:text-[10px]" : "text-[10px] md:text-xs";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        sizeClasses,
        "flex flex-col items-center justify-center gap-1",
        "bg-neutral-100 border border-neutral-200 rounded-lg",
        "text-neutral-600 shadow-sm"
      )}
    >
      <div className={iconSize}>{icon}</div>
      <span className={cn(textSize, "font-medium text-center leading-tight px-1")}>
        {label}
      </span>
    </motion.div>
  );
}

// After 통합 구조
function IntegratedStructure() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        "relative flex flex-col items-center justify-center",
        "w-full max-w-[200px] md:max-w-[240px] h-[140px] md:h-[160px]",
        "bg-gradient-to-br from-blue-50 to-white",
        "border-2 rounded-xl shadow-lg",
        "overflow-hidden"
      )}
      style={{ borderColor: BLUE_ACCENT }}
    >
      {/* 메인 아이콘 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 200 }}
        className={cn(
          "flex items-center justify-center",
          "w-12 h-12 md:w-14 md:h-14 rounded-full",
          "bg-blue-100"
        )}
      >
        <LayersIcon
          className="w-6 h-6 md:w-7 md:h-7"
          style={{ stroke: BLUE_ACCENT } as React.CSSProperties}
        />
      </motion.div>

      {/* 라벨 */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="mt-2 text-sm md:text-base font-semibold"
        style={{ color: BLUE_ACCENT }}
      >
        통합 미션 센터
      </motion.span>

      {/* 하위 모듈 표시 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className="flex items-center gap-1 mt-2"
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-300"
          />
        ))}
      </motion.div>

      {/* 체크 마크 뱃지 */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.8, type: "spring", stiffness: 300 }}
        className={cn(
          "absolute -top-1 -right-1",
          "flex items-center justify-center",
          "w-7 h-7 md:w-8 md:h-8 rounded-full",
          "bg-green-500 text-white shadow-md"
        )}
      >
        <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5" />
      </motion.div>
    </motion.div>
  );
}

// 통합 화살표 컴포넌트
function ConsolidationArrow() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="flex flex-col items-center justify-center px-2 md:px-4"
    >
      {/* 화살표 */}
      <motion.div
        initial={{ x: -10 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, delay: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
        className="hidden md:block"
      >
        <ArrowRightIcon
          className="w-8 h-8 md:w-10 md:h-10"
          style={{ stroke: BLUE_ACCENT } as React.CSSProperties}
        />
      </motion.div>

      {/* 모바일용 세로 화살표 */}
      <motion.div
        initial={{ y: -5 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, delay: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
        className="block md:hidden rotate-90"
      >
        <ArrowRightIcon
          className="w-6 h-6"
          style={{ stroke: BLUE_ACCENT } as React.CSSProperties}
        />
      </motion.div>
    </motion.div>
  );
}

// 단계 수 비교 뱃지
interface StepCountBadgeProps {
  count: string;
  label: string;
  isImproved?: boolean;
  delay?: number;
}

function StepCountBadge({ count, label, isImproved = false, delay = 0 }: StepCountBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "flex flex-col items-center justify-center",
        "px-3 py-2 md:px-4 md:py-2 rounded-lg",
        isImproved
          ? "bg-blue-100 text-blue-700"
          : "bg-neutral-100 text-neutral-600"
      )}
    >
      <span className={cn(
        "text-xl md:text-2xl font-bold",
        isImproved && "text-blue-600"
      )}>
        {count}
      </span>
      <span className="text-[10px] md:text-xs">{label}</span>
    </motion.div>
  );
}

// Before 패널
function BeforePanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col h-full",
        "bg-white rounded-xl overflow-hidden",
        "border border-neutral-200 shadow-sm"
      )}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-200 bg-neutral-50">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          Before
        </span>
        <span className="text-[10px] text-neutral-400">분산된 기능</span>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-3">
        {/* 분산된 기능 박스들 */}
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <FeatureBox
            icon={<SettingsIcon className="w-full h-full" />}
            label="미션 설정"
            delay={0.1}
            size="sm"
          />
          <FeatureBox
            icon={<DashboardIcon className="w-full h-full" />}
            label="대시보드"
            delay={0.15}
            size="sm"
          />
          <FeatureBox
            icon={<ReportIcon className="w-full h-full" />}
            label="성과 리포트"
            delay={0.2}
            size="sm"
          />
          <FeatureBox
            icon={<CalendarIcon className="w-full h-full" />}
            label="일정 관리"
            delay={0.25}
            size="sm"
          />
        </div>

        {/* 추가 분산 요소 */}
        <div className="flex gap-2">
          <FeatureBox
            icon={<UsersIcon className="w-full h-full" />}
            label="참여자 관리"
            delay={0.3}
            size="sm"
          />
        </div>

        {/* 문제점 표시 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full",
            "bg-red-50 text-red-600 text-[10px] md:text-xs"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          5개 메뉴 분산
        </motion.div>
      </div>
    </motion.div>
  );
}

// After 패널
function AfterPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={cn(
        "flex flex-col h-full",
        "bg-white rounded-xl overflow-hidden",
        "border-2 shadow-md"
      )}
      style={{ borderColor: BLUE_LIGHT }}
    >
      {/* 헤더 */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{
          borderColor: `${BLUE_LIGHT}40`,
          background: `linear-gradient(to right, ${BLUE_ACCENT}08, ${BLUE_LIGHT}08)`,
        }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: BLUE_ACCENT }}
        >
          After
        </span>
        <span className="text-[10px] text-blue-400">통합된 구조</span>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
        <IntegratedStructure />

        {/* 개선 포인트 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.3 }}
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full",
            "bg-green-50 text-green-600 text-[10px] md:text-xs"
          )}
        >
          <CheckCircleIcon className="w-3 h-3" />
          단일 진입점으로 통합
        </motion.div>
      </div>
    </motion.div>
  );
}

interface FeatureConsolidationProps {
  className?: string;
  beforeSteps?: string;
  afterSteps?: string;
}

/**
 * 인트라넷 기능 통폐합 비교 다이어그램
 *
 * - Before: 분산된 미션 설정, 대시보드 등 여러 메뉴
 * - After: 통합 미션 센터로 일원화
 * - 단계 수 비교 표시 (X단계 → 35단계)
 * - 반응형: 데스크탑 좌우 배치 / 모바일 상하 배치
 */
export function FeatureConsolidation({
  className,
  beforeSteps = "X",
  afterSteps = "35",
}: FeatureConsolidationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={cn("w-full", className)}
    >
      {/* 타이틀 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-center mb-6"
      >
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
          기능 통폐합
        </h3>
        <p className="text-sm text-muted">
          분산된 메뉴를 하나의 허브로 통합
        </p>
      </motion.div>

      {/* 단계 수 비교 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center justify-center gap-3 md:gap-4 mb-6"
      >
        <StepCountBadge count={beforeSteps} label="단계 (기존)" delay={0.3} />
        <ArrowRightIcon
          className="w-5 h-5 md:w-6 md:h-6 text-neutral-400"
        />
        <StepCountBadge count={afterSteps} label="단계 (개선)" isImproved delay={0.4} />
      </motion.div>

      {/* 비교 패널 컨테이너 */}
      <div
        className={cn(
          "flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4",
          "min-h-[500px] md:min-h-[320px]"
        )}
      >
        <div className="w-full md:w-[280px] h-[220px] md:h-[280px]">
          <BeforePanel />
        </div>

        <ConsolidationArrow />

        <div className="w-full md:w-[280px] h-[220px] md:h-[280px]">
          <AfterPanel />
        </div>
      </div>

      {/* 범례 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex items-center justify-center gap-6 mt-6 text-xs text-muted"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-neutral-300" />
          <span>기존 (분산)</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: BLUE_ACCENT }}
          />
          <span>개선 (통합)</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FeatureConsolidation;
