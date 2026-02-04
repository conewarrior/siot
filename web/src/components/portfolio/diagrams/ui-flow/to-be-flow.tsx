"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// 파랑 계열 액센트 컬러
const BLUE_ACCENT = "#2563EB";
const BLUE_LIGHT = "#60A5FA";

interface ToBeFlowProps {
  className?: string;
}

// 개선된 플로우 노드 타입
interface FlowNode {
  id: string;
  label: string;
  isEntryPoint?: boolean;
  isOverview?: boolean;
  children?: FlowNode[];
}

// 개선된 User Flow 구조 (35단계, 2-depth 메뉴)
const toBeFlow: FlowNode[] = [
  {
    id: "entry",
    label: "인트라넷 홈",
    isEntryPoint: true,
    children: [
      {
        id: "overview",
        label: "Overview",
        isOverview: true,
        children: [
          { id: "dashboard", label: "대시보드" },
          { id: "quick-links", label: "퀵 링크" },
          { id: "notifications", label: "알림 센터" },
        ],
      },
      {
        id: "hr",
        label: "인사",
        children: [
          { id: "hr-attendance", label: "근태관리" },
          { id: "hr-vacation", label: "휴가신청" },
          { id: "hr-org", label: "조직도" },
        ],
      },
      {
        id: "work",
        label: "업무",
        children: [
          { id: "work-approval", label: "전자결재" },
          { id: "work-project", label: "프로젝트" },
          { id: "work-meeting", label: "회의실" },
        ],
      },
    ],
  },
];

// 개선 지표 데이터
const improvements = [
  { metric: "메뉴 뎁스", before: "4단계", after: "2단계", improved: true },
  { metric: "진입점", before: "7개", after: "3개", improved: true },
  { metric: "총 단계", before: "87단계", after: "35단계", improved: true },
];

// 아이콘 컴포넌트들
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 111.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
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

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

// 카테고리별 아이콘 매핑
function getCategoryIcon(id: string, className?: string) {
  switch (id) {
    case "entry":
      return <HomeIcon className={className} />;
    case "overview":
      return <GridIcon className={className} />;
    case "hr":
      return <UsersIcon className={className} />;
    case "work":
      return <BriefcaseIcon className={className} />;
    default:
      return null;
  }
}

// 이징 함수
const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// 카테고리 카드 컴포넌트
interface CategoryCardProps {
  node: FlowNode;
  index: number;
  isInView: boolean;
}

function CategoryCard({ node, index, isInView }: CategoryCardProps) {
  const baseDelay = 0.3 + index * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: baseDelay, duration: 0.4, ease: easeOut }}
      className={cn(
        "relative flex flex-col",
        "bg-white rounded-xl overflow-hidden",
        "border-2 shadow-sm",
        "hover:shadow-md transition-shadow duration-300",
        node.isOverview
          ? "border-blue-300 ring-2 ring-blue-100"
          : "border-neutral-200"
      )}
    >
      {/* 개선 체크 배지 */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: baseDelay + 0.3, duration: 0.2 }}
        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center"
      >
        <CheckIcon className="w-3 h-3" />
      </motion.div>

      {/* 헤더 */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2",
          node.isOverview
            ? "bg-gradient-to-r from-blue-50 to-blue-100"
            : "bg-neutral-50"
        )}
      >
        <div
          className={cn(
            "w-6 h-6 rounded-lg flex items-center justify-center",
            node.isOverview ? "bg-blue-500 text-white" : "bg-neutral-200 text-neutral-600"
          )}
        >
          {getCategoryIcon(node.id, "w-3.5 h-3.5")}
        </div>
        <span
          className={cn(
            "text-sm font-bold",
            node.isOverview ? "text-blue-600" : "text-neutral-700"
          )}
        >
          {node.label}
        </span>
        {node.isOverview && (
          <span className="ml-auto text-[10px] font-medium text-blue-500 bg-blue-100 px-1.5 py-0.5 rounded">
            통합
          </span>
        )}
      </div>

      {/* 하위 메뉴 */}
      {node.children && (
        <div className="px-3 py-2 space-y-1.5">
          {node.children.map((child, childIndex) => (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: baseDelay + 0.15 + childIndex * 0.05,
                duration: 0.3,
                ease: easeOut,
              }}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-lg",
                "text-xs",
                node.isOverview
                  ? "bg-blue-50 text-blue-700"
                  : "bg-neutral-50 text-neutral-600"
              )}
            >
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  node.isOverview ? "bg-blue-400" : "bg-neutral-300"
                )}
              />
              <span>{child.label}</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// 플로우 다이어그램 컴포넌트
interface FlowDiagramProps {
  isInView: boolean;
}

function FlowDiagram({ isInView }: FlowDiagramProps) {
  const root = toBeFlow[0];
  const categories = root.children || [];

  return (
    <div className="relative flex flex-col items-center gap-4">
      {/* 진입점 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.1, duration: 0.4, ease: easeOut }}
        className={cn(
          "flex items-center gap-3 px-5 py-3",
          "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
          "rounded-xl shadow-lg shadow-blue-200",
          "border-2 border-blue-400"
        )}
      >
        <HomeIcon className="w-5 h-5" />
        <span className="font-bold">{root.label}</span>
        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
          진입점 1개
        </span>
      </motion.div>

      {/* 연결선 */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="w-0.5 h-8 bg-gradient-to-b from-blue-400 to-blue-200 origin-top"
      />

      {/* 카테고리 그리드 (2단계 메뉴) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            node={category}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>

      {/* 깊이 표시 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 flex flex-col items-center"
      >
        <div className="hidden md:flex flex-col items-center gap-1 text-[10px] text-neutral-400">
          <span className="font-semibold text-blue-500">1</span>
          <div className="w-px h-8 bg-neutral-200" />
          <span className="font-semibold text-blue-500">2</span>
          <span className="text-neutral-300 mt-1">단계</span>
        </div>
      </motion.div>
    </div>
  );
}

// 개선 지표 카드
interface ImprovementMetricProps {
  metric: typeof improvements[0];
  index: number;
  isInView: boolean;
}

function ImprovementMetric({ metric, index, isInView }: ImprovementMetricProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 1 + index * 0.1, duration: 0.4, ease: easeOut }}
      className={cn(
        "flex flex-col items-center gap-1 px-4 py-3",
        "bg-white rounded-xl",
        "border border-neutral-200"
      )}
    >
      <span className="text-[10px] text-neutral-500 font-medium">
        {metric.metric}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono text-neutral-400 line-through">
          {metric.before}
        </span>
        <span className="text-neutral-300">→</span>
        <span className="text-lg font-mono font-bold text-blue-600">
          {metric.after}
        </span>
      </div>
      {metric.improved && (
        <div className="flex items-center gap-1 mt-1">
          <div className="w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center">
            <CheckIcon className="w-2 h-2 text-white" />
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">개선</span>
        </div>
      )}
    </motion.div>
  );
}

/**
 * 인트라넷 TO-BE User Flow 다이어그램
 *
 * - 개선 후 35단계로 축소된 User Flow
 * - 2-depth 메뉴 구조
 * - 3개의 진입점으로 통합
 * - Overview 화면 강조
 * - 반응형 대응
 */
export function ToBeFlow({ className }: ToBeFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className={cn("w-full py-6 px-4 md:px-8", className)}
    >
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 mb-3">
          <span
            className="px-2.5 py-1 text-xs font-bold text-white rounded-lg"
            style={{ backgroundColor: BLUE_ACCENT }}
          >
            TO-BE
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            개선된 User Flow
          </h3>
        </div>
        <p className="text-sm text-muted">
          카테고리 최상단 위계 + Overview 통합 화면
        </p>
      </motion.div>

      {/* 플로우 다이어그램 */}
      <div className="relative mb-8">
        <FlowDiagram isInView={isInView} />
      </div>

      {/* 개선 지표 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.3 }}
        className="mb-6"
      >
        <h4 className="text-sm font-semibold text-center text-neutral-500 mb-4">
          개선 지표
        </h4>
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
          {improvements.map((metric, index) => (
            <ImprovementMetric
              key={metric.metric}
              metric={metric}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </motion.div>

      {/* 범례 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.3, duration: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs text-muted"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-lg"
            style={{ backgroundColor: BLUE_ACCENT }}
          />
          <span>진입점</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-lg border-2 border-blue-300 bg-blue-50" />
          <span>Overview 통합</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center">
            <CheckIcon className="w-2.5 h-2.5" />
          </div>
          <span>개선 완료</span>
        </div>
      </motion.div>

      {/* 핵심 개선 요약 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="mt-8 p-4 rounded-xl max-w-md mx-auto"
        style={{
          background: `linear-gradient(to right, ${BLUE_ACCENT}08, ${BLUE_LIGHT}15)`,
          border: `1px solid ${BLUE_ACCENT}20`,
        }}
      >
        <div className="text-center">
          <p className="text-xs font-semibold mb-2" style={{ color: BLUE_ACCENT }}>
            핵심 개선
          </p>
          <div className="flex items-center justify-center gap-4">
            <div>
              <span className="text-lg font-mono text-neutral-400 line-through">
                87단계
              </span>
            </div>
            <span className="text-blue-500 font-bold">→</span>
            <div>
              <span
                className="text-2xl font-mono font-bold"
                style={{ color: BLUE_ACCENT }}
              >
                35단계
              </span>
            </div>
          </div>
          <p className="mt-2 text-sm font-semibold text-emerald-600">
            60% 단계 축소
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export type { ToBeFlowProps };
