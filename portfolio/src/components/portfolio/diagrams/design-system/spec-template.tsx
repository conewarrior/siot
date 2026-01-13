"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// 보라 계열 액센트 컬러
const PURPLE_ACCENT = "#7C3AED";
const PURPLE_LIGHT = "#A78BFA";

// 어노테이션 아이콘 컴포넌트들
function SpacingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 6H3M21 18H3M12 6v12" />
      <path d="M8 10l4-4 4 4M8 14l4 4 4-4" />
    </svg>
  );
}

function ColorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  );
}

function RadiusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 16v-4a8 8 0 018-8h4" />
      <path d="M20 12h-4a4 4 0 00-4 4v4" />
    </svg>
  );
}

function SizeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 12h16M12 4v16" />
    </svg>
  );
}

function HistoryIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

// 어노테이션 라인 컴포넌트
interface AnnotationLineProps {
  direction: "horizontal" | "vertical";
  label: string;
  value: string;
  className?: string;
  delay?: number;
}

function AnnotationLine({
  direction,
  label,
  value,
  className,
  delay = 0,
}: AnnotationLineProps) {
  const isHorizontal = direction === "horizontal";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className={cn(
        "flex items-center gap-1",
        isHorizontal ? "flex-row" : "flex-col",
        className
      )}
    >
      {/* 시작 마커 */}
      <div
        className={cn(
          "bg-purple-500",
          isHorizontal ? "w-1.5 h-3" : "w-3 h-1.5"
        )}
      />

      {/* 라인 */}
      <div
        className={cn(
          "border-dashed",
          isHorizontal
            ? "flex-1 border-t border-purple-400"
            : "flex-1 border-l border-purple-400"
        )}
      />

      {/* 레이블 */}
      <div
        className={cn(
          "flex items-center gap-1 px-1.5 py-0.5 rounded",
          "bg-purple-500 text-white text-[9px] font-medium whitespace-nowrap"
        )}
      >
        <span className="opacity-70">{label}</span>
        <span className="font-mono">{value}</span>
      </div>

      {/* 라인 */}
      <div
        className={cn(
          "border-dashed",
          isHorizontal
            ? "flex-1 border-t border-purple-400"
            : "flex-1 border-l border-purple-400"
        )}
      />

      {/* 끝 마커 */}
      <div
        className={cn(
          "bg-purple-500",
          isHorizontal ? "w-1.5 h-3" : "w-3 h-1.5"
        )}
      />
    </motion.div>
  );
}

// 버튼 컴포넌트 시각화
interface ButtonPreviewProps {
  variant: "primary" | "secondary" | "ghost";
  size: "sm" | "md" | "lg";
  state: "default" | "hover" | "pressed" | "disabled";
  className?: string;
}

function ButtonPreview({
  variant,
  size,
  state,
  className,
}: ButtonPreviewProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantClasses = {
    primary: cn(
      "text-white",
      state === "default" && "bg-purple-600",
      state === "hover" && "bg-purple-500",
      state === "pressed" && "bg-purple-700",
      state === "disabled" && "bg-purple-300 cursor-not-allowed"
    ),
    secondary: cn(
      "border-2",
      state === "default" && "border-purple-600 text-purple-600 bg-transparent",
      state === "hover" && "border-purple-500 text-purple-500 bg-purple-50",
      state === "pressed" && "border-purple-700 text-purple-700 bg-purple-100",
      state === "disabled" &&
        "border-purple-300 text-purple-300 bg-transparent cursor-not-allowed"
    ),
    ghost: cn(
      state === "default" && "text-purple-600 bg-transparent",
      state === "hover" && "text-purple-500 bg-purple-50",
      state === "pressed" && "text-purple-700 bg-purple-100",
      state === "disabled" && "text-purple-300 bg-transparent cursor-not-allowed"
    ),
  };

  return (
    <motion.button
      whileHover={state !== "disabled" ? { scale: 1.02 } : {}}
      whileTap={state !== "disabled" ? { scale: 0.98 } : {}}
      className={cn(
        "rounded-lg font-medium transition-colors",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      disabled={state === "disabled"}
    >
      Button
    </motion.button>
  );
}

// 명세 정보 항목
interface SpecItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  token?: string;
  delay?: number;
}

function SpecItem({ icon, label, value, token, delay = 0 }: SpecItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-start gap-3 py-2 border-b border-purple-100 last:border-0"
    >
      <div className="w-5 h-5 text-purple-500 flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-neutral-500">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
        {token && (
          <code className="text-[10px] font-mono text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded mt-1 inline-block">
            {token}
          </code>
        )}
      </div>
    </motion.div>
  );
}

// 히스토리 항목
interface HistoryEntryProps {
  version: string;
  date: string;
  author: string;
  change: string;
  delay?: number;
}

function HistoryEntry({
  version,
  date,
  author,
  change,
  delay = 0,
}: HistoryEntryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-start gap-3 py-2"
    >
      {/* 타임라인 도트 */}
      <div className="flex flex-col items-center pt-1">
        <div className="w-2 h-2 rounded-full bg-purple-500" />
        <div className="w-0.5 flex-1 bg-purple-200 mt-1" />
      </div>

      {/* 내용 */}
      <div className="flex-1 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono font-semibold text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded">
            v{version}
          </span>
          <span className="text-[10px] text-neutral-400">{date}</span>
        </div>
        <p className="text-xs text-foreground">{change}</p>
        <p className="text-[10px] text-neutral-400 mt-0.5">by {author}</p>
      </div>
    </motion.div>
  );
}

// Properties 패널
function PropertiesPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="flex flex-col h-full"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-purple-200 bg-purple-50/50">
        <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
          Properties
        </span>
        <span className="text-[10px] text-purple-400">Auto Layout</span>
      </div>

      {/* 명세 목록 */}
      <div className="flex-1 p-3 overflow-y-auto">
        <SpecItem
          icon={<SizeIcon className="w-full h-full" />}
          label="Size"
          value="40px height (md)"
          token="--button-height-md"
          delay={0.4}
        />
        <SpecItem
          icon={<SpacingIcon className="w-full h-full" />}
          label="Padding"
          value="16px horizontal, 8px vertical"
          token="--space-4, --space-2"
          delay={0.5}
        />
        <SpecItem
          icon={<RadiusIcon className="w-full h-full" />}
          label="Border Radius"
          value="8px"
          token="--radius-lg"
          delay={0.6}
        />
        <SpecItem
          icon={<ColorIcon className="w-full h-full" />}
          label="Background"
          value="Purple 600"
          token="--color-primary"
          delay={0.7}
        />

        {/* 상태별 색상 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 pt-3 border-t border-purple-100"
        >
          <p className="text-[10px] font-semibold text-purple-600 uppercase tracking-wide mb-2">
            States
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { state: "Default", color: "#7C3AED" },
              { state: "Hover", color: "#8B5CF6" },
              { state: "Pressed", color: "#5B21B6" },
              { state: "Disabled", color: "#C4B5FD" },
            ].map((item) => (
              <div key={item.state} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded border border-neutral-200"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] text-neutral-600">
                  {item.state}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// 히스토리 패널
function HistoryPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="flex flex-col"
    >
      {/* 헤더 */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-purple-200 bg-purple-50/50">
        <HistoryIcon className="w-4 h-4 text-purple-500" />
        <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
          History
        </span>
      </div>

      {/* 히스토리 목록 */}
      <div className="p-3">
        <HistoryEntry
          version="2.1"
          date="2025-01-10"
          author="Designer A"
          change="Added disabled state colors"
          delay={0.5}
        />
        <HistoryEntry
          version="2.0"
          date="2024-12-15"
          author="Designer B"
          change="Increased border-radius from 4px to 8px"
          delay={0.6}
        />
        <HistoryEntry
          version="1.0"
          date="2024-11-01"
          author="Designer A"
          change="Initial button component spec"
          delay={0.7}
        />
      </div>
    </motion.div>
  );
}

// 컴포넌트 프리뷰 패널 (어노테이션 포함)
function ComponentPreviewPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-purple-200 bg-purple-50/50">
        <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
          Button / Primary / Medium
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-purple-400 bg-purple-100 px-1.5 py-0.5 rounded">
            Component
          </span>
        </div>
      </div>

      {/* 프리뷰 영역 */}
      <div className="relative flex-1 min-h-[160px] p-6 flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
        {/* 그리드 패턴 */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, ${PURPLE_LIGHT}10 1px, transparent 1px), linear-gradient(to bottom, ${PURPLE_LIGHT}10 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />

        {/* 버튼 + 어노테이션 */}
        <div className="relative">
          {/* 가로 어노테이션 (패딩) */}
          <div className="absolute -top-8 left-0 right-0">
            <AnnotationLine
              direction="horizontal"
              label="padding-x"
              value="16px"
              delay={0.5}
            />
          </div>

          {/* 세로 어노테이션 (높이) */}
          <div className="absolute -left-10 top-0 bottom-0 w-6">
            <AnnotationLine
              direction="vertical"
              label="h"
              value="40px"
              className="h-full"
              delay={0.6}
            />
          </div>

          {/* 버튼 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <ButtonPreview variant="primary" size="md" state="default" />
          </motion.div>

          {/* radius 표시 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute -bottom-6 -right-2 flex items-center gap-1"
          >
            <div className="w-4 h-4 border-2 border-purple-500 rounded-lg border-t-0 border-l-0" />
            <span className="text-[9px] font-mono text-purple-600 bg-purple-100 px-1 py-0.5 rounded">
              8px
            </span>
          </motion.div>
        </div>
      </div>

      {/* 버튼 상태 프리뷰 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="px-4 py-3 border-t border-purple-100 bg-neutral-50/50"
      >
        <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-wide mb-2">
          All States
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <ButtonPreview variant="primary" size="sm" state="default" />
          <ButtonPreview variant="primary" size="sm" state="hover" />
          <ButtonPreview variant="primary" size="sm" state="pressed" />
          <ButtonPreview variant="primary" size="sm" state="disabled" />
        </div>
      </motion.div>
    </motion.div>
  );
}

interface SpecTemplateProps {
  className?: string;
}

/**
 * 디자인 시스템 명세 템플릿 시각화 컴포넌트
 *
 * - 어노테이션 킷: 간격, 크기, 반경 등 시각적 표시
 * - 컴포넌트 명세: 버튼 예시로 Properties 패널 표시
 * - 히스토리: 변경 이력 타임라인
 * - Auto Layout + Properties 활용 예시
 */
export function SpecTemplate({ className }: SpecTemplateProps) {
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
          컴포넌트 명세 템플릿
        </h3>
        <p className="text-sm text-muted">
          디자인 토큰 + 어노테이션 + 히스토리 통합 관리
        </p>
      </motion.div>

      {/* 메인 카드 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className={cn(
          "rounded-2xl overflow-hidden",
          "bg-white border-2 shadow-lg",
          "shadow-purple-500/10"
        )}
        style={{ borderColor: PURPLE_LIGHT }}
      >
        {/* 상단 툴바 */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b"
          style={{
            borderColor: `${PURPLE_LIGHT}40`,
            background: `linear-gradient(to right, ${PURPLE_ACCENT}08, ${PURPLE_LIGHT}08)`,
          }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <span className="text-xs font-medium text-purple-700 ml-2">
              design-system / components / button.fig
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-purple-400 bg-purple-100 px-2 py-0.5 rounded">
              Edit Mode
            </span>
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[400px]">
          {/* 좌측: 컴포넌트 프리뷰 (3/5) */}
          <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-purple-100">
            <ComponentPreviewPanel />
          </div>

          {/* 우측: Properties + History (2/5) */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex-1 border-b border-purple-100">
              <PropertiesPanel />
            </div>
            <HistoryPanel />
          </div>
        </div>
      </motion.div>

      {/* 범례 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-4 text-xs text-muted"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: PURPLE_ACCENT }}
          />
          <span>어노테이션</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 border-t border-dashed border-purple-400" />
          <span>측정선</span>
        </div>
        <div className="flex items-center gap-2">
          <code className="text-[10px] font-mono text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
            token
          </code>
          <span>디자인 토큰</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SpecTemplate;
