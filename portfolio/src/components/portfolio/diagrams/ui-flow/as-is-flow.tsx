"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AsIsFlowProps {
  className?: string;
}

// 문제점 타입
type ProblemType =
  | "depth" // 깊은 뎁스
  | "scattered" // 분산된 기능
  | "duplicate" // 중복 진입점
  | "hierarchy" // 불명확한 위계
  | "overload"; // 정보 과부하

interface Problem {
  type: ProblemType;
  label: string;
  color: string;
}

const problemTypes: Record<ProblemType, Problem> = {
  depth: { type: "depth", label: "깊은 뎁스", color: "#EF4444" },
  scattered: { type: "scattered", label: "분산된 기능", color: "#F97316" },
  duplicate: { type: "duplicate", label: "중복 진입점", color: "#EAB308" },
  hierarchy: { type: "hierarchy", label: "불명확한 위계", color: "#8B5CF6" },
  overload: { type: "overload", label: "정보 과부하", color: "#EC4899" },
};

// 노드 타입
interface FlowNode {
  id: string;
  label: string;
  depth: number;
  x: number;
  y: number;
  problems?: ProblemType[];
  isEntry?: boolean;
  children?: string[];
}

// AS-IS 플로우 노드 데이터
const nodes: FlowNode[] = [
  // 진입점들 (중복 진입점 문제)
  { id: "home", label: "홈", depth: 0, x: 300, y: 30, isEntry: true, problems: ["overload"], children: ["menu1", "menu2", "menu3", "quick1", "quick2"] },
  { id: "bookmark", label: "즐겨찾기", depth: 0, x: 100, y: 30, isEntry: true, problems: ["duplicate"], children: ["hr-portal"] },
  { id: "search", label: "통합검색", depth: 0, x: 500, y: 30, isEntry: true, problems: ["duplicate"], children: ["hr-portal", "doc-list"] },

  // 1단계 메뉴
  { id: "menu1", label: "업무지원", depth: 1, x: 100, y: 120, problems: ["hierarchy"], children: ["submenu1-1", "submenu1-2"] },
  { id: "menu2", label: "인사관리", depth: 1, x: 300, y: 120, problems: ["hierarchy"], children: ["hr-portal", "submenu2-1"] },
  { id: "menu3", label: "커뮤니티", depth: 1, x: 500, y: 120, children: ["submenu3-1", "submenu3-2"] },
  { id: "quick1", label: "퀵메뉴1", depth: 1, x: 200, y: 120, problems: ["duplicate"], children: ["hr-portal"] },
  { id: "quick2", label: "퀵메뉴2", depth: 1, x: 400, y: 120, problems: ["duplicate"], children: ["doc-detail"] },

  // 2단계
  { id: "submenu1-1", label: "전자결재", depth: 2, x: 50, y: 210, children: ["doc-list"] },
  { id: "submenu1-2", label: "문서관리", depth: 2, x: 150, y: 210, problems: ["scattered"], children: ["doc-list"] },
  { id: "hr-portal", label: "HR 포털", depth: 2, x: 280, y: 210, problems: ["scattered"], children: ["hr-detail", "hr-apply"] },
  { id: "submenu2-1", label: "급여조회", depth: 2, x: 380, y: 210, children: ["pay-detail"] },
  { id: "submenu3-1", label: "게시판", depth: 2, x: 480, y: 210, children: ["board-detail"] },
  { id: "submenu3-2", label: "공지사항", depth: 2, x: 570, y: 210, problems: ["overload"], children: ["notice-detail"] },

  // 3단계
  { id: "doc-list", label: "문서목록", depth: 3, x: 100, y: 300, problems: ["scattered"], children: ["doc-detail"] },
  { id: "hr-detail", label: "인사정보", depth: 3, x: 240, y: 300, children: ["hr-edit"] },
  { id: "hr-apply", label: "신청하기", depth: 3, x: 340, y: 300, problems: ["depth"], children: ["apply-form"] },
  { id: "pay-detail", label: "급여상세", depth: 3, x: 430, y: 300, children: [] },
  { id: "board-detail", label: "게시글", depth: 3, x: 510, y: 300, children: [] },
  { id: "notice-detail", label: "공지상세", depth: 3, x: 590, y: 300, problems: ["overload"], children: [] },

  // 4단계 (깊은 뎁스)
  { id: "doc-detail", label: "문서상세", depth: 4, x: 100, y: 390, problems: ["depth"], children: ["doc-action"] },
  { id: "hr-edit", label: "정보수정", depth: 4, x: 240, y: 390, problems: ["depth"], children: [] },
  { id: "apply-form", label: "신청서작성", depth: 4, x: 340, y: 390, problems: ["depth"], children: ["apply-confirm"] },

  // 5단계
  { id: "doc-action", label: "결재처리", depth: 5, x: 100, y: 470, problems: ["depth"], children: [] },
  { id: "apply-confirm", label: "신청확인", depth: 5, x: 340, y: 470, problems: ["depth"], children: [] },
];

// 연결선 데이터 생성
interface Connection {
  from: string;
  to: string;
  isCrossing?: boolean;
}

const generateConnections = (): Connection[] => {
  const connections: Connection[] = [];
  nodes.forEach((node) => {
    if (node.children) {
      node.children.forEach((childId) => {
        const child = nodes.find((n) => n.id === childId);
        if (child) {
          // 크로스 연결 감지 (x 좌표가 크게 차이나면)
          const isCrossing = Math.abs(node.x - child.x) > 150;
          connections.push({ from: node.id, to: childId, isCrossing });
        }
      });
    }
  });
  return connections;
};

// 이징 함수
const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/**
 * 인트라넷 AS-IS User Flow 다이어그램
 * - 개선 전 복잡한 사용자 동선 시각화
 * - 5가지 문제점 표시 (깊은 뎁스, 분산된 기능, 중복 진입점, 불명확한 위계, 정보 과부하)
 * - 복잡한 연결선으로 카오스 표현
 * - 반응형 대응 (스크롤 가능)
 */
export function AsIsFlow({ className }: AsIsFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const connections = generateConnections();

  const getNodeById = (id: string) => nodes.find((n) => n.id === id);

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
        className="text-center mb-6"
      >
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          AS-IS User Flow
        </h3>
        <p className="text-sm text-muted">
          분산된 기능과 복잡한 동선으로 인한 사용성 문제
        </p>
      </motion.div>

      {/* 문제점 범례 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6 text-xs"
      >
        {Object.values(problemTypes).map((problem) => (
          <div key={problem.type} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: problem.color, backgroundColor: `${problem.color}20` }}
            >
              <svg viewBox="0 0 16 16" fill={problem.color} className="w-2 h-2">
                <path d="M8 1.5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V2a.5.5 0 01.5-.5zm0 8a.75.75 0 110 1.5.75.75 0 010-1.5z" />
              </svg>
            </div>
            <span className="text-muted">{problem.label}</span>
          </div>
        ))}
      </motion.div>

      {/* 플로우 다이어그램 */}
      <div className="relative min-h-[540px] min-w-[640px] mx-auto max-w-3xl">
        {/* 깊이 레이블 - 다이어그램 내부 좌측 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="hidden md:flex flex-col absolute left-0 top-[30px] text-[10px] text-muted gap-[54px] pointer-events-none z-10"
        >
          {["진입점", "1단계", "2단계", "3단계", "4단계", "5단계"].map((label, i) => (
            <div key={label} className={cn(
              "py-1 px-2 rounded",
              i >= 4 ? "bg-red-50 text-red-500 font-medium" : "bg-neutral-50"
            )}>
              {label}
            </div>
          ))}
        </motion.div>

        {/* SVG 연결선 레이어 */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 640 540"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* 화살표 마커 */}
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#94A3B8" />
            </marker>
            <marker
              id="arrowhead-cross"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#EF4444" opacity="0.6" />
            </marker>
          </defs>

          {/* 연결선 */}
          {connections.map((conn, index) => {
            const fromNode = getNodeById(conn.from);
            const toNode = getNodeById(conn.to);
            if (!fromNode || !toNode) return null;

            const startX = fromNode.x + 30;
            const startY = fromNode.y + 36;
            const endX = toNode.x + 30;
            const endY = toNode.y;

            // 베지어 곡선 컨트롤 포인트
            const midY = (startY + endY) / 2;
            const path = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;

            return (
              <motion.path
                key={`${conn.from}-${conn.to}`}
                d={path}
                fill="none"
                stroke={conn.isCrossing ? "#EF4444" : "#CBD5E1"}
                strokeWidth={conn.isCrossing ? 1.5 : 1}
                strokeOpacity={conn.isCrossing ? 0.5 : 0.4}
                strokeDasharray={conn.isCrossing ? "4 2" : undefined}
                markerEnd={conn.isCrossing ? "url(#arrowhead-cross)" : "url(#arrowhead)"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{
                  pathLength: { duration: 0.8, delay: 0.5 + index * 0.02, ease: easeOut },
                  opacity: { duration: 0.3, delay: 0.5 + index * 0.02 },
                }}
              />
            );
          })}
        </svg>

        {/* 노드 레이어 */}
        <div className="relative" style={{ height: 540 }}>
          {nodes.map((node, index) => {
            const hasProblems = node.problems && node.problems.length > 0;
            const primaryProblem = hasProblems ? problemTypes[node.problems![0]] : null;

            return (
              <motion.div
                key={node.id}
                className={cn(
                  "absolute",
                  "flex flex-col items-center justify-center",
                  "min-w-[60px] px-2 py-1.5",
                  "rounded-lg",
                  "text-xs font-medium",
                  "border-2 shadow-sm",
                  "transition-shadow duration-200",
                  node.isEntry
                    ? "bg-blue-50 border-blue-400 text-blue-700"
                    : hasProblems
                    ? "bg-white border-neutral-300 text-foreground"
                    : "bg-white border-neutral-200 text-muted"
                )}
                style={{
                  left: node.x,
                  top: node.y,
                  borderColor: hasProblems ? primaryProblem?.color : undefined,
                  boxShadow: hasProblems ? `0 2px 8px ${primaryProblem?.color}30` : undefined,
                }}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + node.depth * 0.15 + index * 0.02,
                  ease: easeOut,
                }}
              >
                {/* 문제점 배지들 */}
                {hasProblems && (
                  <div className="absolute -top-2 -right-2 flex gap-0.5">
                    {node.problems!.slice(0, 2).map((problemType, pIdx) => {
                      const problem = problemTypes[problemType];
                      return (
                        <motion.div
                          key={problemType}
                          className="w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: problem.color }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            delay: 0.8 + node.depth * 0.15 + pIdx * 0.1,
                            duration: 0.3,
                          }}
                        >
                          <svg viewBox="0 0 16 16" fill="white" className="w-2.5 h-2.5">
                            <path d="M8 1.5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V2a.5.5 0 01.5-.5zm0 8a.75.75 0 110 1.5.75.75 0 010-1.5z" />
                          </svg>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* 진입점 아이콘 */}
                {node.isEntry && (
                  <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg viewBox="0 0 16 16" fill="white" className="w-2 h-2">
                      <path d="M8 2a.75.75 0 01.75.75v9.69l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V2.75A.75.75 0 018 2z" />
                    </svg>
                  </div>
                )}

                {/* 깊이 뱃지 (4단계 이상) */}
                {node.depth >= 4 && (
                  <motion.div
                    className="absolute -top-2 -left-2 px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1 + index * 0.05, duration: 0.3 }}
                  >
                    Lv.{node.depth}
                  </motion.div>
                )}

                <span className="whitespace-nowrap">{node.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 통계 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3 max-w-2xl mx-auto"
      >
        {[
          { label: "최대 뎁스", value: "5단계", icon: "📉", color: "#EF4444" },
          { label: "분산된 기능", value: "8개", icon: "🔀", color: "#F97316" },
          { label: "중복 진입점", value: "5곳", icon: "🔄", color: "#EAB308" },
          { label: "불명확한 위계", value: "3개", icon: "❓", color: "#8B5CF6" },
          { label: "과부하 페이지", value: "3개", icon: "📊", color: "#EC4899" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="p-3 bg-white rounded-lg border border-neutral-200 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4 + i * 0.1, duration: 0.3 }}
          >
            <div className="text-lg mb-1">{stat.icon}</div>
            <div
              className="text-lg font-bold"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="text-[10px] text-muted mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* 문제점 요약 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl max-w-xl mx-auto"
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-red-700 mb-2">주요 문제점</h4>
            <ul className="text-xs text-red-600 space-y-1">
              <li>• 같은 기능에 도달하는 경로가 3~4개로 사용자 혼란 유발</li>
              <li>• HR 기능이 3개 메뉴에 분산되어 탐색 비용 증가</li>
              <li>• 자주 쓰는 기능(결재처리)이 5단계 깊이에 위치</li>
              <li>• 홈 화면에 모든 정보를 나열하여 인지 부하 가중</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export type { AsIsFlowProps };
