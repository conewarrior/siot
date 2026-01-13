"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// 핑크 계열 액센트 컬러
const PINK_ACCENT = "#EC4899";
const PINK_LIGHT = "#F472B6";

// 툴바 아이콘 컴포넌트들
function BoxSelectIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="4 2" />
    </svg>
  );
}

function PolygonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="12,2 22,8.5 18,21 6,21 2,8.5" />
    </svg>
  );
}

function MoveIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" />
    </svg>
  );
}

function UndoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 7v6h6M3 13c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9" />
    </svg>
  );
}

function HelpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

// AS-IS 툴바 아이템 (단축키 숨김)
interface AsIsToolItemProps {
  icon: React.ReactNode;
  isActive?: boolean;
}

function AsIsToolItem({ icon, isActive = false }: AsIsToolItemProps) {
  return (
    <div
      className={cn(
        "w-9 h-9 flex items-center justify-center rounded",
        "transition-colors duration-150",
        isActive
          ? "bg-neutral-300 text-neutral-700"
          : "text-neutral-500 hover:bg-neutral-200"
      )}
    >
      {icon}
    </div>
  );
}

// TO-BE 툴바 아이템 (단축키 노출)
interface ToBeToolItemProps {
  icon: React.ReactNode;
  shortcut: string;
  isActive?: boolean;
  tooltip?: string;
}

function ToBeToolItem({
  icon,
  shortcut,
  isActive = false,
  tooltip,
}: ToBeToolItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg",
        "transition-colors duration-150 cursor-pointer",
        isActive
          ? "bg-pink-100 text-pink-600"
          : "text-neutral-600 hover:bg-pink-50"
      )}
      title={tooltip}
    >
      {icon}
      <span
        className={cn(
          "text-[10px] font-mono font-medium",
          isActive ? "text-pink-500" : "text-neutral-400"
        )}
      >
        {shortcut}
      </span>
    </motion.div>
  );
}

// 개선 포인트 뱃지
interface ImprovementBadgeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

function ImprovementBadge({ children, className, delay = 0.5, style }: ImprovementBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className={cn(
        "absolute flex items-center gap-1 px-2 py-0.5 rounded-full",
        "text-[10px] font-medium text-white",
        "shadow-sm",
        className
      )}
      style={{ backgroundColor: PINK_ACCENT, ...style }}
    >
      <CheckIcon className="w-3 h-3" />
      {children}
    </motion.div>
  );
}

// AS-IS 툴바 패널
function AsIsToolbar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={cn(
        "absolute left-3 top-1/2 -translate-y-1/2",
        "flex flex-col gap-1 p-1.5",
        "bg-neutral-100 border border-neutral-200 rounded-lg",
        "shadow-sm"
      )}
    >
      <AsIsToolItem
        icon={<BoxSelectIcon className="w-5 h-5" />}
        isActive={true}
      />
      <AsIsToolItem icon={<PolygonIcon className="w-5 h-5" />} />
      <AsIsToolItem icon={<MoveIcon className="w-5 h-5" />} />
      <div className="h-px bg-neutral-200 my-1" />
      <AsIsToolItem icon={<UndoIcon className="w-5 h-5" />} />
    </motion.div>
  );
}

// TO-BE 플로팅 툴바
function ToBeToolbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 bottom-4",
        "flex items-center gap-1 px-2 py-1.5",
        "bg-white/95 backdrop-blur-sm border border-pink-200 rounded-xl",
        "shadow-lg shadow-pink-500/10"
      )}
    >
      <ToBeToolItem
        icon={<BoxSelectIcon className="w-5 h-5" />}
        shortcut="B"
        isActive={true}
        tooltip="박스 도구"
      />
      <ToBeToolItem
        icon={<PolygonIcon className="w-5 h-5" />}
        shortcut="P"
        tooltip="폴리곤 도구"
      />
      <ToBeToolItem
        icon={<MoveIcon className="w-5 h-5" />}
        shortcut="V"
        tooltip="이동 도구"
      />
      <div className="w-px h-8 bg-neutral-200 mx-1" />
      <ToBeToolItem
        icon={<UndoIcon className="w-5 h-5" />}
        shortcut="Z"
        tooltip="실행 취소"
      />
      <div className="w-px h-8 bg-neutral-200 mx-1" />
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-lg",
          "text-pink-500 hover:bg-pink-50 cursor-pointer"
        )}
        title="도움말"
      >
        <HelpIcon className="w-5 h-5" />
      </motion.div>
    </motion.div>
  );
}

// 미니 캔버스 목업
function MiniCanvas({ isAsIs = false }: { isAsIs?: boolean }) {
  return (
    <div
      className={cn(
        "relative w-full h-full",
        isAsIs ? "bg-neutral-50" : "bg-gradient-to-br from-pink-50 to-white"
      )}
    >
      {/* 그리드 패턴 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isAsIs
            ? "linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)"
            : `linear-gradient(to right, ${PINK_LIGHT}15 1px, transparent 1px), linear-gradient(to bottom, ${PINK_LIGHT}15 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* 샘플 라벨링 박스 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-16 h-12 border-2 rounded",
          isAsIs ? "border-neutral-400 bg-neutral-200/30" : "border-pink-400 bg-pink-200/30"
        )}
      />
    </div>
  );
}

// AS-IS 패널
function AsIsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative flex flex-col h-full",
        "bg-white rounded-xl overflow-hidden",
        "border border-neutral-200 shadow-sm"
      )}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-200 bg-neutral-50">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          AS-IS
        </span>
        <span className="text-[10px] text-neutral-400">기존 UI</span>
      </div>

      {/* 캔버스 영역 */}
      <div className="relative flex-1 min-h-0">
        <MiniCanvas isAsIs={true} />
        <AsIsToolbar />

        {/* 문제점 표시 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className={cn(
            "absolute right-2 top-2 px-2 py-1 rounded",
            "bg-neutral-500/80 text-white text-[9px]",
            "max-w-[100px] text-center"
          )}
        >
          단축키 찾기 어려움
        </motion.div>
      </div>
    </motion.div>
  );
}

// TO-BE 패널
function ToBePanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={cn(
        "relative flex flex-col h-full",
        "bg-white rounded-xl overflow-hidden",
        "border-2 shadow-md"
      )}
      style={{ borderColor: PINK_LIGHT }}
    >
      {/* 헤더 */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{
          borderColor: `${PINK_LIGHT}40`,
          background: `linear-gradient(to right, ${PINK_ACCENT}08, ${PINK_LIGHT}08)`,
        }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: PINK_ACCENT }}
        >
          TO-BE
        </span>
        <span className="text-[10px] text-pink-400">개선된 UI</span>
      </div>

      {/* 캔버스 영역 */}
      <div className="relative flex-1 min-h-0">
        <MiniCanvas isAsIs={false} />
        <ToBeToolbar />

        {/* 개선 포인트 뱃지들 */}
        <ImprovementBadge className="-top-1 -right-1" delay={0.5}>
          단축키 직접 노출
        </ImprovementBadge>
        <ImprovementBadge className="top-8 -right-1" delay={0.6}>
          플로팅 툴바
        </ImprovementBadge>
        <ImprovementBadge className="top-16 -right-1" delay={0.7}>
          도움말 버튼
        </ImprovementBadge>
      </div>
    </motion.div>
  );
}

interface ToolbarComparisonProps {
  className?: string;
}

/**
 * 라벨링 툴 AS-IS/TO-BE 툴바 비교 컴포넌트
 *
 * - AS-IS: 좌측 고정 툴바, 단축키 숨김
 * - TO-BE: 플로팅 툴바, 단축키 직접 노출, 도움말 버튼
 * - 반응형: 데스크탑 좌우 배치 / 모바일 상하 배치
 */
export function ToolbarComparison({ className }: ToolbarComparisonProps) {
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
          툴바 UI 개선
        </h3>
        <p className="text-sm text-muted">
          작업 효율을 높이는 인터페이스 재설계
        </p>
      </motion.div>

      {/* 비교 패널 컨테이너 */}
      <div
        className={cn(
          "grid gap-4 md:gap-6",
          "grid-cols-1 md:grid-cols-2",
          "h-[400px] md:h-[280px]"
        )}
      >
        <AsIsPanel />
        <ToBePanel />
      </div>

      {/* 범례 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex items-center justify-center gap-6 mt-4 text-xs text-muted"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-neutral-300" />
          <span>기존 (회색조)</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: PINK_ACCENT }}
          />
          <span>개선 (핑크 액센트)</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ToolbarComparison;
