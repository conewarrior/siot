"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// 보라 계열 액센트 컬러
const VIOLET_ACCENT = "#7C3AED";
const VIOLET_LIGHT = "#A78BFA";

// 토큰 카테고리 정의
interface TokenCategory {
  id: string;
  name: string;
  nameKo: string;
  color: string;
  asIsTokens: string[];
  toBeTokens: {
    group: string;
    description: string;
    items: string[];
  };
}

const tokenCategories: TokenCategory[] = [
  {
    id: "structural",
    name: "Structural",
    nameKo: "구조적",
    color: "#7C3AED",
    asIsTokens: ["header-bg", "sidebar-bg", "footer-text", "card-bg"],
    toBeTokens: {
      group: "color.bg",
      description: "structural",
      items: ["base", "elevated", "sunken", "card"],
    },
  },
  {
    id: "interactive",
    name: "Interactive",
    nameKo: "상호작용",
    color: "#06B6D4",
    asIsTokens: ["btn-primary", "link-color", "btn-hover", "input-focus"],
    toBeTokens: {
      group: "color.interactive",
      description: "action",
      items: ["primary", "secondary", "hover", "focus"],
    },
  },
  {
    id: "overlay",
    name: "Overlay",
    nameKo: "오버레이",
    color: "#F59E0B",
    asIsTokens: ["modal-bg", "tooltip-bg", "dropdown-shadow", "popup-border"],
    toBeTokens: {
      group: "color.overlay",
      description: "layer",
      items: ["backdrop", "surface", "border", "shadow"],
    },
  },
  {
    id: "indicator",
    name: "Indicator",
    nameKo: "인디케이터",
    color: "#10B981",
    asIsTokens: ["error-red", "success-green", "warning-bg", "info-border"],
    toBeTokens: {
      group: "color.indicator",
      description: "status",
      items: ["error", "success", "warning", "info"],
    },
  },
];

// 아이콘 컴포넌트들
function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SemanticIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
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
      <polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 111.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
    </svg>
  );
}

// 이징 함수
const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// AS-IS 토큰 아이템
interface AsIsTokenItemProps {
  token: string;
  delay: number;
  isInView: boolean;
}

function AsIsTokenItem({ token, delay, isInView }: AsIsTokenItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.3, ease: easeOut }}
      className={cn(
        "px-2 py-1 rounded",
        "bg-neutral-100 border border-neutral-200",
        "text-xs font-mono text-neutral-600",
        "truncate"
      )}
    >
      {token}
    </motion.div>
  );
}

// TO-BE 트리 구조
interface ToBeTreeProps {
  data: TokenCategory["toBeTokens"];
  color: string;
  delay: number;
  isInView: boolean;
}

function ToBeTree({ data, color, delay, isInView }: ToBeTreeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.4, ease: easeOut }}
      className="flex flex-col"
    >
      {/* Group 레벨 */}
      <div className="flex items-center gap-1.5">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span
          className="text-xs font-mono font-semibold"
          style={{ color }}
        >
          {data.group}
        </span>
      </div>

      {/* Description 레벨 */}
      <div className="flex items-center ml-3 mt-1">
        <div
          className="w-px h-4"
          style={{ backgroundColor: `${color}40` }}
        />
        <div className="flex items-center gap-1 ml-2">
          <div
            className="w-1.5 h-1.5 rounded-full opacity-60"
            style={{ backgroundColor: color }}
          />
          <span className="text-[10px] font-mono text-neutral-500">
            .{data.description}
          </span>
        </div>
      </div>

      {/* Items 레벨 */}
      <div className="flex flex-wrap gap-1 ml-6 mt-1">
        {data.items.map((item, idx) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: delay + 0.1 + idx * 0.05, duration: 0.2 }}
            className={cn(
              "px-1.5 py-0.5 rounded",
              "text-[10px] font-mono text-white"
            )}
            style={{ backgroundColor: color }}
          >
            .{item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// 카테고리 비교 카드
interface CategoryCompareCardProps {
  category: TokenCategory;
  index: number;
  isInView: boolean;
}

function CategoryCompareCard({
  category,
  index,
  isInView,
}: CategoryCompareCardProps) {
  const baseDelay = 0.2 + index * 0.15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: baseDelay, duration: 0.4, ease: easeOut }}
      className={cn(
        "relative flex flex-col",
        "bg-white rounded-xl overflow-hidden",
        "border-2 shadow-sm",
        "hover:shadow-md transition-shadow duration-300"
      )}
      style={{ borderColor: `${category.color}30` }}
    >
      {/* 헤더 */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{
          background: `linear-gradient(to right, ${category.color}08, ${category.color}15)`,
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <span
            className="text-sm font-bold"
            style={{ color: category.color }}
          >
            {category.name}
          </span>
        </div>
        <span className="text-[10px] text-neutral-400">
          {category.nameKo}
        </span>
      </div>

      {/* 비교 영역 */}
      <div className="flex-1 grid grid-cols-[1fr,auto,1fr] gap-2 p-3 min-h-0">
        {/* AS-IS */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1 mb-2">
            <LocationIcon className="w-3 h-3 text-neutral-400" />
            <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wide">
              AS-IS
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {category.asIsTokens.map((token, idx) => (
              <AsIsTokenItem
                key={token}
                token={token}
                delay={baseDelay + 0.1 + idx * 0.05}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* 화살표 */}
        <div className="flex items-center justify-center px-1">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: baseDelay + 0.3, duration: 0.3 }}
          >
            <ArrowRightIcon
              className="w-5 h-5"
              style={{ color: category.color }}
            />
          </motion.div>
        </div>

        {/* TO-BE */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1 mb-2">
            <SemanticIcon className="w-3 h-3" style={{ color: category.color }} />
            <span
              className="text-[10px] font-semibold uppercase tracking-wide"
              style={{ color: category.color }}
            >
              TO-BE
            </span>
          </div>
          <ToBeTree
            data={category.toBeTokens}
            color={category.color}
            delay={baseDelay + 0.2}
            isInView={isInView}
          />
        </div>
      </div>

      {/* 개선 체크 배지 */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: baseDelay + 0.5, duration: 0.2 }}
        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
        style={{ backgroundColor: category.color }}
      >
        <CheckIcon className="w-3 h-3 text-white" />
      </motion.div>
    </motion.div>
  );
}

// 계층 구조 설명 다이어그램
interface HierarchyDiagramProps {
  isInView: boolean;
}

function HierarchyDiagram({ isInView }: HierarchyDiagramProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.8, duration: 0.5, ease: easeOut }}
      className={cn(
        "relative flex flex-col items-center",
        "bg-white rounded-xl p-4",
        "border border-violet-200 shadow-sm"
      )}
    >
      <h4 className="text-sm font-bold text-foreground mb-4">
        Semantic Token 계층 구조
      </h4>

      {/* 계층 트리 시각화 */}
      <div className="flex flex-col items-start w-full max-w-xs">
        {/* Group */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <div
            className="px-3 py-1.5 rounded-lg text-sm font-mono font-bold text-white"
            style={{ backgroundColor: VIOLET_ACCENT }}
          >
            Group
          </div>
          <span className="text-xs text-neutral-400">color.bg</span>
        </motion.div>

        {/* 연결선 + Description */}
        <div className="flex items-stretch ml-4 mt-1">
          <div
            className="w-0.5 bg-violet-200"
            style={{ minHeight: "24px" }}
          />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.3 }}
            className="flex items-center gap-2 ml-3"
          >
            <div
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold text-white"
              style={{ backgroundColor: VIOLET_LIGHT }}
            >
              Description
            </div>
            <span className="text-xs text-neutral-400">.structural</span>
          </motion.div>
        </div>

        {/* 연결선 + Item */}
        <div className="flex items-stretch ml-4">
          <div
            className="w-0.5 bg-violet-200"
            style={{ minHeight: "24px" }}
          />
          <div className="flex items-stretch ml-6 mt-1">
            <div
              className="w-0.5 bg-violet-100"
              style={{ minHeight: "24px" }}
            />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.3 }}
              className="flex items-center gap-2 ml-3"
            >
              <div className="px-2 py-0.5 rounded text-[11px] font-mono font-medium text-violet-700 bg-violet-100 border border-violet-200">
                Item
              </div>
              <span className="text-xs text-neutral-400">.base, .elevated...</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 전체 예시 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.3 }}
        className="mt-4 px-4 py-2 bg-neutral-50 rounded-lg border border-neutral-200"
      >
        <code className="text-sm font-mono">
          <span style={{ color: VIOLET_ACCENT }}>color.bg</span>
          <span className="text-neutral-400">.</span>
          <span style={{ color: VIOLET_LIGHT }}>structural</span>
          <span className="text-neutral-400">.</span>
          <span className="text-violet-600">base</span>
        </code>
      </motion.div>
    </motion.div>
  );
}

interface TokenStructureProps {
  className?: string;
}

/**
 * 디자인 시스템 토큰 네이밍 구조 다이어그램
 *
 * - AS-IS (위치 기반) vs TO-BE (Semantic) 비교
 * - Group -> Description -> Item 계층 구조
 * - 4가지 분류: Structural, Interactive, Overlay, Indicator
 * - 진입 애니메이션
 */
export function TokenStructure({ className }: TokenStructureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className={cn(
        "w-full py-6 px-4 md:px-8",
        className
      )}
    >
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          토큰 네이밍 구조 개선
        </h3>
        <p className="text-sm text-muted">
          위치 기반에서 용도 기반(Semantic)으로 전환
        </p>
      </motion.div>

      {/* 비교 방식 안내 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex items-center justify-center gap-6 mb-6"
      >
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <LocationIcon className="w-4 h-4" />
          <span>위치 기반</span>
          <span className="text-neutral-300">(AS-IS)</span>
        </div>
        <div className="w-8 h-px bg-neutral-200" />
        <div className="flex items-center gap-2 text-xs" style={{ color: VIOLET_ACCENT }}>
          <SemanticIcon className="w-4 h-4" />
          <span className="font-medium">용도 기반</span>
          <span className="text-violet-400">(TO-BE)</span>
        </div>
      </motion.div>

      {/* 카테고리별 비교 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {tokenCategories.map((category, index) => (
          <CategoryCompareCard
            key={category.id}
            category={category}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>

      {/* 계층 구조 설명 */}
      <HierarchyDiagram isInView={isInView} />

      {/* 범례 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.3, duration: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-muted"
      >
        {tokenCategories.map((category) => (
          <div key={category.id} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span>{category.name}</span>
          </div>
        ))}
      </motion.div>

      {/* 핵심 개선 포인트 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="mt-6 p-4 rounded-xl max-w-lg mx-auto"
        style={{
          background: `linear-gradient(to right, ${VIOLET_ACCENT}08, ${VIOLET_LIGHT}08)`,
          border: `1px solid ${VIOLET_ACCENT}20`,
        }}
      >
        <div className="text-center">
          <p
            className="text-xs font-semibold mb-2"
            style={{ color: VIOLET_ACCENT }}
          >
            핵심 개선
          </p>
          <div className="space-y-1 text-sm text-neutral-600">
            <p>
              <span className="font-medium text-neutral-800">위치</span>가 아닌{" "}
              <span className="font-bold" style={{ color: VIOLET_ACCENT }}>
                용도
              </span>
              로 토큰 의미 전달
            </p>
            <p className="text-xs text-neutral-500">
              header-bg → color.bg.structural.base
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export type { TokenStructureProps };
