"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, ChevronLeft, ChevronRight, Download, ArrowRight, Mail, Globe, Github, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextRotate } from "@/components/text-rotate";

// PDF 뷰어 (클라이언트에서만 로드)
const PDFPageViewer = dynamic(() => import("@/components/portfolio/pdf-page-viewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
    </div>
  ),
});

// ============================================================================
// 타입 정의
// ============================================================================

type SlideLayout =
  | "pdf"             // PDF 페이지 렌더링
  | "cover"           // 커버: 중앙 정렬, 마일스톤
  | "problem"         // 문제정의: 6:6 그리드
  | "process"         // 과정: 4:8 그리드
  | "metric"          // 메트릭: 숫자 카드 그리드
  | "comparison"      // 비교: Before/After
  | "full-visual"     // 전체 시각자료
  | "text-heavy"      // 텍스트 중심
  | "intro"           // 인트로 전용
  | "outro"           // 아웃트로 전용
  // 새 레이아웃 (포트폴리오 가이드 기반)
  | "ds-cover"        // DS 커버: 이미지 좌측 + 제목/타임라인/성과 우측
  | "ratio-1-1"       // 1:1 비율
  | "ratio-1-2"       // 1:2 비율
  | "ratio-1-3"       // 1:3 비율
  | "split";          // 상하 분리

interface MetricItem {
  value: string;
  label: string;
  change?: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface Achievement {
  category: string;
  items: string[];
}

// 타임라인 아이템 (DS 커버용)
interface TimelineItem {
  title: string;
  desc: string;
}

// 성과 아이템 (DS 커버용)
interface AchievementItem {
  title: string;
  items: string[];
}

// 좌측 콘텐츠 (ratio 레이아웃용)
interface LeftContent {
  type: "table" | "list" | "principles";
  headers?: string[];
  rows?: string[][];
  items?: { title: string; desc: string }[];
}

// 우측 콘텐츠 (ratio 레이아웃용)
interface RightContent {
  type: "before-after" | "flowchart" | "steps" | "tree" | "image";
  before?: { image?: string; label?: string; items?: string[] };
  after?: { image?: string; label?: string; items?: string[] };
  steps?: { number?: string; title: string; desc?: string }[];
  treeData?: Record<string, unknown>;
  image?: string;
  direction?: "horizontal" | "vertical"; // 플로우차트 방향
}

interface SlideData {
  id: string;
  layout: SlideLayout;
  title: string;
  pdfPage?: number;           // PDF 페이지 번호 (layout: "pdf"일 때 사용)
  subtitle?: string;
  tagline?: string;           // 짧은 한 줄 문구
  description?: string;       // 설명 텍스트
  bullets?: string[];
  metrics?: MetricItem[];     // 메트릭 카드용
  steps?: ProcessStep[];      // 프로세스 단계
  beforeAfter?: {             // 비교용
    before: string[];
    after: string[];
  };
  quote?: string;             // 인용구
  achievements?: Achievement[]; // 주요 성과 (카테고리별)
  visualPlaceholder?: {
    type: "image" | "diagram" | "chart" | "screenshot" | "flowchart" | "code";
    description: string;
    aspectRatio?: "16:9" | "4:3" | "1:1" | "auto";
  };
  // DS 커버 전용
  timeline?: TimelineItem[];
  achievementGrid?: AchievementItem[];
  heroImage?: string;
  // Ratio 레이아웃 전용
  leftContent?: LeftContent;
  rightContent?: RightContent;
  // Split 레이아웃 전용
  topLeft?: { title: string; items: string[] };
  topRight?: { title: string; items: string[] };
  bottomFlow?: { nodes: string[] };
}

interface SectionData {
  id: string;
  title: string;
  color?: string;  // 섹션별 테마 색상
  slides: SlideData[];
}

// ============================================================================
// 색상 팔레트
// ============================================================================

const COLORS = {
  primary: "#327039",        // Forest Fern
  primaryDark: "#133020",    // Tilled Earth
  bg: "#F8EDD9",             // Alabaster Hay
  green100: "#E8F5E9",
  green200: "#C8E6C9",
  white: "#FFFFFF",
};

// ============================================================================
// 섹션 & 슬라이드 데이터 (PDF 기반)
// ============================================================================

const SECTIONS: SectionData[] = [
  // Intro (1장) - PDF 1페이지
  {
    id: "intro",
    title: "Intro",
    color: "#91011B",  // Dark red
    slides: [
      { id: "intro-1", layout: "pdf", title: "김한솔", pdfPage: 1 },
    ],
  },
  // Lead-in Paywall (5장) - PDF 2-6페이지
  {
    id: "lead-in-paywall",
    title: "Lead-in Paywall",
    color: "#334eac",  // Blue (디자인 프로젝트)
    slides: [
      { id: "paywall-1", layout: "pdf", title: "Paywall 개요", pdfPage: 2 },
      { id: "paywall-2", layout: "pdf", title: "가설 세우기", pdfPage: 3 },
      { id: "paywall-3", layout: "pdf", title: "테스트 설계", pdfPage: 4 },
      { id: "paywall-4", layout: "pdf", title: "테스트 적용", pdfPage: 5 },
      { id: "paywall-5", layout: "pdf", title: "결과 및 회고", pdfPage: 6 },
    ],
  },
  // CRO Experiments (7장) - PDF 7-13페이지
  {
    id: "cro-experiments",
    title: "CRO Experiments",
    // color 미지정 → 기본 그린 사용
    slides: [
      { id: "cro-1", layout: "pdf", title: "CRO 개요", pdfPage: 7 },
      { id: "cro-2", layout: "pdf", title: "랜딩페이지 제작", pdfPage: 8 },
      { id: "cro-3", layout: "pdf", title: "데이터 수집 자동화", pdfPage: 9 },
      { id: "cro-4", layout: "pdf", title: "리포트 구조", pdfPage: 10 },
      { id: "cro-5", layout: "pdf", title: "분석 적용", pdfPage: 11 },
      { id: "cro-6", layout: "pdf", title: "개선 결과", pdfPage: 12 },
      { id: "cro-7", layout: "pdf", title: "정성 데이터", pdfPage: 13 },
    ],
  },
  // Design System (7장) - PDF 14-20페이지
  {
    id: "design-system",
    title: "Design System",
    color: "#DD5C36",  // Cherry Grove (Coral)
    slides: [
      { id: "ds-1", layout: "pdf", title: "디자인 시스템 개요", pdfPage: 14 },
      { id: "ds-2", layout: "pdf", title: "문제 정의", pdfPage: 15 },
      { id: "ds-3", layout: "pdf", title: "솔루션 개요", pdfPage: 16 },
      { id: "ds-4", layout: "pdf", title: "설치 방법", pdfPage: 17 },
      { id: "ds-5", layout: "pdf", title: "강제성 부여", pdfPage: 18 },
      { id: "ds-6", layout: "pdf", title: "자동 업데이트", pdfPage: 19 },
      { id: "ds-7", layout: "pdf", title: "문서 사이트", pdfPage: 20 },
    ],
  },
  // Outro (1장) - PDF 21페이지
  {
    id: "outro",
    title: "Outro",
    color: "#91011B",  // Dark red (Intro와 동일)
    slides: [
      { id: "outro-1", layout: "pdf", title: "Thank You", pdfPage: 21 },
    ],
  },
];
// ============================================================================
// 상단 네비게이션 컴포넌트
// ============================================================================

interface TopNavProps {
  sections: SectionData[];
  currentSectionIndex: number;
  currentSlideIndex: number;
  flatIndex: number;
  totalFlatSlides: number;
  onSelectSection: (index: number) => void;
  onNavigate: (index: number) => void;
  onDownload?: () => void;
}

function TopNav({ sections, currentSectionIndex, currentSlideIndex, flatIndex, totalFlatSlides, onSelectSection, onNavigate, onDownload }: TopNavProps) {
  return (
    <nav className="flex items-center justify-between w-full" aria-label="섹션 내비게이션">
      <div className="flex items-center gap-6">
        {/* 워드마크 - 고정 너비로 메뉴 위치 안정화 */}
        <Link
          href="/"
          className="w-[220px] flex-shrink-0 px-3 py-1.5 font-serif text-sm tracking-tight hover:opacity-70 transition-opacity flex items-center gap-1"
          style={{ color: COLORS.primaryDark }}
        >
          <span>hansol makes it</span>
          <span
            className="inline-flex text-white px-2 py-1 rounded-md text-sm font-medium"
            style={{ backgroundColor: "#F97316" }}
          >
            <TextRotate
              texts={["pop", "snappy", "flow", "simple", "click", "yesterday", "right"]}
              mainClassName="overflow-hidden"
              staggerFrom="last"
              staggerDuration={0.02}
              rotationInterval={2500}
              transition={{ type: "spring", damping: 20, stiffness: 400 }}
            />
          </span>
        </Link>

        {/* 섹션 탭 */}
        <div className="flex items-center gap-1">
        {sections.map((section, index) => {
          const isActive = currentSectionIndex === index;
          const hasMultipleSlides = section.slides.length > 1;
          const sectionColor = section.color || COLORS.primary;  // 섹션별 색상 또는 기본 그린
          return (
            <motion.button
              key={section.id}
              onClick={() => onSelectSection(index)}
              className={cn(
                "relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              )}
              style={{
                backgroundColor: isActive ? sectionColor : "transparent",
                color: isActive ? COLORS.white : COLORS.primaryDark,
              }}
              whileHover={{
                scale: isActive ? 1 : 1.02,
                backgroundColor: isActive ? sectionColor : COLORS.green100,
              }}
              whileTap={{ scale: 0.98 }}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{section.title}</span>
              {/* 닷 인디케이터 - 활성 섹션에서만 버튼 안에 펼쳐짐 */}
              <AnimatePresence>
                {isActive && hasMultipleSlides && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex items-center gap-1 overflow-hidden"
                  >
                    {Array.from({ length: section.slides.length }).map((_, slideIdx) => (
                      <motion.div
                        key={slideIdx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: slideIdx * 0.03 }}
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: slideIdx === currentSlideIndex
                            ? COLORS.white
                            : "rgba(255,255,255,0.4)",
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
        </div>
      </div>

      {/* 우측: 슬라이드 컨트롤 + PDF 버튼 */}
      <div className="flex items-center gap-3">
        {/* 슬라이드 컨트롤 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate(flatIndex - 1)}
            disabled={flatIndex === 0}
            className="p-1.5 rounded-md border transition-colors hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ borderColor: COLORS.green200 }}
            aria-label="이전 슬라이드"
          >
            <ChevronLeft className="w-4 h-4" style={{ color: COLORS.primaryDark }} />
          </button>
          <span
            className="text-sm tabular-nums min-w-[3.5rem] text-center font-medium"
            style={{ color: COLORS.primaryDark }}
          >
            {flatIndex + 1} / {totalFlatSlides}
          </span>
          <button
            onClick={() => onNavigate(flatIndex + 1)}
            disabled={flatIndex === totalFlatSlides - 1}
            className="p-1.5 rounded-md border transition-colors hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ borderColor: COLORS.green200 }}
            aria-label="다음 슬라이드"
          >
            <ChevronRight className="w-4 h-4" style={{ color: COLORS.primaryDark }} />
          </button>
        </div>

        {/* 다운로드 버튼 */}
        <button
          onClick={onDownload}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border transition-colors hover:bg-neutral-100"
          style={{
            color: COLORS.primaryDark,
            borderColor: COLORS.green200,
          }}
        >
          <Download className="w-3.5 h-3.5" />
          <span>PDF</span>
        </button>
      </div>
    </nav>
  );
}


// ============================================================================
// 레이아웃별 슬라이드 컴포넌트
// ============================================================================

interface SlideProps {
  slide: SlideData;
  sectionTitle: string;
}

// 공통 섹션 라벨 (섹션명 + 슬라이드 유형을 같은 줄에)
function SectionLabel({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: COLORS.primary }}>
      <span className="tracking-wide uppercase">{title}</span>
      {subtitle && (
        <>
          <span className="opacity-40">·</span>
          <span>{subtitle}</span>
        </>
      )}
    </div>
  );
}

// 공통 시각자료 플레이스홀더
function VisualPlaceholder({ visual }: { visual: NonNullable<SlideData["visualPlaceholder"]> }) {
  return (
    <div
      className={cn(
        "w-full border-2 border-dashed flex flex-col items-center justify-center p-8",
        visual.aspectRatio === "16:9" && "aspect-video",
        visual.aspectRatio === "4:3" && "aspect-[4/3]",
        visual.aspectRatio === "1:1" && "aspect-square"
      )}
      style={{
        borderColor: COLORS.primary,
        opacity: 0.3,
      }}
    >
      <div className="text-xs font-medium mb-2" style={{ color: COLORS.primary }}>
        [{visual.type.toUpperCase()}]
      </div>
      <p className="text-center text-sm" style={{ color: COLORS.primaryDark }}>
        {visual.description}
      </p>
    </div>
  );
}

// 메트릭 카드
function MetricCard({ metric }: { metric: MetricItem }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold mb-1" style={{ color: COLORS.primaryDark }}>
        {metric.value}
      </div>
      <div className="text-sm font-medium mb-1" style={{ color: COLORS.primary }}>
        {metric.label}
      </div>
      {metric.change && (
        <div className="text-xs opacity-70" style={{ color: COLORS.primaryDark }}>
          {metric.change}
        </div>
      )}
    </div>
  );
}

// 프로세스 스텝
function ProcessStepCard({ step, isLast }: { step: ProcessStep; isLast: boolean }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
        style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
      >
        {step.number}
      </div>
      <div className="flex-1 pt-1">
        <div className="font-semibold text-base mb-1" style={{ color: COLORS.primaryDark }}>
          {step.title}
        </div>
        <div className="text-base opacity-80" style={{ color: COLORS.primaryDark }}>
          {step.description}
        </div>
      </div>
      {!isLast && (
        <ArrowRight className="flex-shrink-0 w-5 h-5 mt-2 opacity-40" style={{ color: COLORS.primary }} />
      )}
    </div>
  );
}

// ============================================================================
// 인트로 레이아웃: 중앙 정렬, 이름 + 한 줄 소개 + 프로젝트 목록
// ============================================================================
function IntroSlide({ slide }: SlideProps) {
  return (
    <div className="h-full w-full flex items-center justify-center px-16 py-12">
      <div className="max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold mb-4"
          style={{ color: COLORS.primaryDark }}
        >
          {slide.title}
        </motion.h1>
        {slide.tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg mb-6 leading-relaxed"
            style={{ color: COLORS.primary, opacity: 0.8 }}
          >
            {slide.tagline}
          </motion.p>
        )}
        {slide.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base mb-10 leading-relaxed"
            style={{ color: COLORS.primaryDark, opacity: 0.8 }}
          >
            {slide.description}
          </motion.p>
        )}
        {slide.bullets && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 text-left max-w-xl mx-auto"
          >
            {slide.bullets.map((bullet, i) => (
              <div
                key={i}
                className="flex items-start gap-3"
              >
                <span className="text-sm font-medium mt-0.5" style={{ color: COLORS.primary }}>
                  {i + 1}.
                </span>
                <span className="text-base" style={{ color: COLORS.primaryDark }}>{bullet}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 커버 레이아웃: 타임라인 로드맵 + 주요 성과
// ============================================================================
function CoverSlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-16 py-10 overflow-y-auto">
      <SectionLabel title={sectionTitle} />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold mt-3 mb-2 whitespace-pre-line leading-tight"
        style={{ color: COLORS.primaryDark }}
      >
        {slide.title}
      </motion.h1>

      {slide.tagline && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg mb-8 leading-relaxed"
          style={{ color: COLORS.primary, opacity: 0.8 }}
        >
          {slide.tagline}
        </motion.p>
      )}

      <div className="flex-1 grid grid-cols-2 gap-12 min-h-0">
        {/* 좌측: 로드맵 타임라인 */}
        {slide.steps && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3
              className="text-sm font-medium mb-4 tracking-wide"
              style={{ color: "#E07A5F" }}
            >
              로드맵
            </h3>
            <div className="relative">
              {/* 세로 라인 */}
              <div
                className="absolute left-[3px] top-2 bottom-2 w-px"
                style={{ backgroundColor: COLORS.green200 }}
              />
              <div className="space-y-5">
                {slide.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    {/* 점 */}
                    <div
                      className="w-[7px] h-[7px] rounded-full flex-shrink-0 mt-1.5 relative z-10"
                      style={{ backgroundColor: "#E07A5F" }}
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-xs font-medium mb-0.5"
                        style={{ color: COLORS.primary }}
                      >
                        {step.number}
                      </div>
                      <div
                        className="font-semibold text-base mb-0.5"
                        style={{ color: COLORS.primaryDark }}
                      >
                        {step.title}
                      </div>
                      <div
                        className="text-base opacity-80 leading-relaxed"
                        style={{ color: COLORS.primaryDark }}
                      >
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 우측: 주요 성과 */}
        {slide.achievements && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3
              className="text-sm font-medium mb-4 tracking-wide"
              style={{ color: "#E07A5F" }}
            >
              주요 성과
            </h3>
            <div className="space-y-5">
              {slide.achievements.map((achievement, i) => (
                <div key={i} className="flex gap-4">
                  {/* 카테고리 라벨 */}
                  <div
                    className="w-24 flex-shrink-0 text-xs font-medium pt-0.5"
                    style={{ color: COLORS.primary }}
                  >
                    {achievement.category}
                  </div>
                  {/* 항목 리스트 */}
                  <div className="flex-1 space-y-1.5">
                    {achievement.items.map((item, j) => (
                      <div
                        key={j}
                        className="text-base leading-relaxed"
                        style={{ color: COLORS.primaryDark }}
                        dangerouslySetInnerHTML={{
                          __html: item.replace(
                            /\*\*(.*?)\*\*/g,
                            `<span style="color: #E07A5F; font-weight: 500;">$1</span>`
                          )
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 문제정의 레이아웃: 6:6 그리드, Before/After 또는 문제+원인
// ============================================================================
function ProblemSlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-16 py-10">
      <div className="mb-4">
        <SectionLabel title={sectionTitle} subtitle={slide.subtitle} />
      </div>

      <h2
        className="text-2xl font-semibold mb-2"
        style={{ color: COLORS.primaryDark }}
      >
        {slide.title}
      </h2>

      {slide.description && (
        <p className="text-lg mb-8 max-w-2xl leading-relaxed" style={{ color: COLORS.primaryDark, opacity: 0.8 }}>
          {slide.description}
        </p>
      )}

      {/* Before/After 6:6 그리드 */}
      {slide.beforeAfter && (
        <div className="flex-1 grid grid-cols-2 gap-12 min-h-0">
          {/* Before */}
          <div className="flex flex-col">
            <div
              className="text-sm font-medium mb-4"
              style={{ color: "#991B1B" }}
            >
              Problem
            </div>
            <ul className="space-y-3">
              {slide.beforeAfter.before.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base" style={{ color: COLORS.primaryDark, opacity: 0.8 }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-red-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After (원인/인사이트) */}
          <div className="flex flex-col">
            <div
              className="text-sm font-medium mb-4"
              style={{ color: COLORS.primary }}
            >
              Insight
            </div>
            <ul className="space-y-3">
              {slide.beforeAfter.after.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base" style={{ color: COLORS.primaryDark }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.primary }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 프로세스 레이아웃: 4:8 그리드 (좌측 설명 + 우측 시각자료/단계)
// ============================================================================
function ProcessSlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-16 py-10">
      <div className="mb-4">
        <SectionLabel title={sectionTitle} subtitle={slide.subtitle} />
      </div>

      <h2 className="text-2xl font-semibold mb-2" style={{ color: COLORS.primaryDark }}>
        {slide.title}
      </h2>

      {slide.description && (
        <p className="text-lg mb-6 max-w-3xl leading-relaxed" style={{ color: COLORS.primaryDark, opacity: 0.8 }}>
          {slide.description}
        </p>
      )}

      {/* 4:8 그리드 */}
      <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
        {/* 좌측 4컬럼: 단계 또는 불릿 */}
        <div className="col-span-5 flex flex-col justify-center">
          {slide.steps ? (
            <div className="space-y-4">
              {slide.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                    style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
                  >
                    {step.number}
                  </div>
                  <div className="pt-0.5">
                    <div className="font-semibold text-base" style={{ color: COLORS.primaryDark }}>
                      {step.title}
                    </div>
                    <div className="text-base opacity-80" style={{ color: COLORS.primaryDark }}>
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : slide.bullets ? (
            <ul className="space-y-3">
              {slide.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-base" style={{ color: COLORS.primaryDark }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.primary }} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {/* 메트릭이 있으면 하단에 표시 */}
          {slide.metrics && (
            <div className="mt-6 space-y-4">
              {slide.metrics.map((metric, i) => (
                <MetricCard key={i} metric={metric} />
              ))}
            </div>
          )}
        </div>

        {/* 우측 8컬럼: 시각자료 */}
        <div className="col-span-7 flex items-center justify-center">
          {slide.visualPlaceholder ? (
            <VisualPlaceholder visual={slide.visualPlaceholder} />
          ) : slide.quote ? (
            <div
              className="text-center italic text-lg leading-relaxed border-l-2 pl-6"
              style={{ borderLeftColor: COLORS.primary, color: COLORS.primaryDark, opacity: 0.9 }}
            >
              "{slide.quote}"
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 비교 레이아웃: Before/After 세로 분할
// ============================================================================
function ComparisonSlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-16 py-10">
      <div className="mb-4">
        <SectionLabel title={sectionTitle} subtitle={slide.subtitle} />
      </div>

      <h2 className="text-2xl font-semibold mb-2" style={{ color: COLORS.primaryDark }}>
        {slide.title}
      </h2>

      {slide.description && (
        <p className="text-lg mb-6 max-w-2xl leading-relaxed" style={{ color: COLORS.primaryDark, opacity: 0.8 }}>
          {slide.description}
        </p>
      )}

      {/* Before/After 세로 분할 */}
      {slide.beforeAfter && (
        <div className="flex-1 grid grid-cols-2 gap-12 min-h-0">
          {/* Before */}
          <div className="flex flex-col">
            <div className="font-medium text-sm mb-4" style={{ color: "#991B1B" }}>
              Before
            </div>
            <ul className="space-y-2">
              {slide.beforeAfter.before.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-base font-mono" style={{ color: COLORS.primaryDark, opacity: 0.8 }}>
                  <span className="opacity-40">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="flex flex-col">
            <div className="font-medium text-sm mb-4" style={{ color: COLORS.primary }}>
              After
            </div>
            <ul className="space-y-2">
              {slide.beforeAfter.after.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-base font-mono" style={{ color: COLORS.primaryDark }}>
                  <span className="opacity-40">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 메트릭 */}
      {slide.metrics && (
        <div className="mt-6 flex gap-6">
          {slide.metrics.map((metric, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-bold" style={{ color: COLORS.primary }}>{metric.value}</span>
              <span className="text-sm" style={{ color: COLORS.primaryDark }}>{metric.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 메트릭 레이아웃: 숫자 카드 그리드 + 불릿
// ============================================================================
function MetricSlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-16 py-10">
      <div className="mb-4">
        <SectionLabel title={sectionTitle} subtitle={slide.subtitle} />
      </div>

      <h2 className="text-2xl font-semibold mb-2" style={{ color: COLORS.primaryDark }}>
        {slide.title}
      </h2>

      {slide.description && (
        <p className="text-lg mb-8 max-w-2xl leading-relaxed" style={{ color: COLORS.primaryDark, opacity: 0.8 }}>
          {slide.description}
        </p>
      )}

      {/* 메트릭 카드 그리드 */}
      {slide.metrics && (
        <div className={cn(
          "grid gap-4 mb-8",
          slide.metrics.length <= 3 ? "grid-cols-3" : "grid-cols-4"
        )}>
          {slide.metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} />
          ))}
        </div>
      )}

      {/* 불릿 */}
      {slide.bullets && (
        <div className="flex-1">
          <ul className="space-y-2">
            {slide.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-base" style={{ color: COLORS.primaryDark }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.primary }} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 인용구 */}
      {slide.quote && (
        <div
          className="mt-auto text-center italic text-lg leading-relaxed border-l-2 pl-6"
          style={{ borderLeftColor: COLORS.primary, color: COLORS.primaryDark, opacity: 0.9 }}
        >
          "{slide.quote}"
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 텍스트 중심 레이아웃: 전체 너비 텍스트 + 인용구
// ============================================================================
function TextHeavySlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-16 py-10">
      <div className="mb-4">
        <SectionLabel title={sectionTitle} subtitle={slide.subtitle} />
      </div>

      <h2 className="text-2xl font-semibold mb-2" style={{ color: COLORS.primaryDark }}>
        {slide.title}
      </h2>

      {slide.description && (
        <p className="text-lg mb-8 max-w-3xl leading-relaxed" style={{ color: COLORS.primaryDark, opacity: 0.8 }}>
          {slide.description}
        </p>
      )}

      {/* 인용구 (상단) */}
      {slide.quote && (
        <div
          className="mb-8 pl-6 border-l-2 max-w-2xl"
          style={{
            borderLeftColor: COLORS.primary,
            color: COLORS.primaryDark
          }}
        >
          <p className="italic text-lg">"{slide.quote}"</p>
        </div>
      )}

      {/* 불릿 리스트 (2열) */}
      {slide.bullets && (
        <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-4 content-start">
          {slide.bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-3 text-base" style={{ color: COLORS.primaryDark }}>
              <span
                className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS.primary }}
              />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      )}

      {/* 메트릭 */}
      {slide.metrics && (
        <div className="mt-auto flex gap-8">
          {slide.metrics.map((metric, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold" style={{ color: COLORS.primary }}>{metric.value}</div>
              <div className="text-sm" style={{ color: COLORS.primaryDark }}>{metric.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 전체 시각자료 레이아웃: 상단 텍스트 + 하단 시각자료/단계
// ============================================================================
function FullVisualSlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-16 py-10">
      <div className="mb-4">
        <SectionLabel title={sectionTitle} subtitle={slide.subtitle} />
      </div>

      <h2 className="text-2xl font-semibold mb-2" style={{ color: COLORS.primaryDark }}>
        {slide.title}
      </h2>

      {slide.tagline && (
        <p className="text-lg mb-6 leading-relaxed" style={{ color: COLORS.primary, opacity: 0.8 }}>
          {slide.tagline}
        </p>
      )}

      {/* 4단계 가로 배치 */}
      {slide.steps && (
        <div className="grid grid-cols-4 gap-8 mb-6">
          {slide.steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="h-full">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium mb-2"
                  style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
                >
                  {step.number}
                </div>
                <div className="font-semibold text-base mb-1" style={{ color: COLORS.primaryDark }}>
                  {step.title}
                </div>
                <div className="text-base opacity-80" style={{ color: COLORS.primaryDark }}>
                  {step.description}
                </div>
              </div>
              {i < slide.steps!.length - 1 && (
                <ArrowRight
                  className="absolute -right-4 top-4 w-4 h-4"
                  style={{ color: COLORS.primary, opacity: 0.4 }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* 시각자료 */}
      {slide.visualPlaceholder && (
        <div className="flex-1 min-h-0">
          <VisualPlaceholder visual={slide.visualPlaceholder} />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 아웃트로 레이아웃: 중앙 정렬 연락처
// ============================================================================
function OutroSlide({ slide }: SlideProps) {
  return (
    <div className="h-full w-full flex items-center justify-center px-16 py-12">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold mb-3"
          style={{ color: COLORS.primaryDark }}
        >
          {slide.title}
        </motion.h1>

        {slide.tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg mb-4 leading-relaxed"
            style={{ color: COLORS.primary, opacity: 0.8 }}
          >
            {slide.tagline}
          </motion.p>
        )}

        {slide.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base mb-10 leading-relaxed max-w-lg mx-auto"
            style={{ color: COLORS.primaryDark, opacity: 0.8 }}
          >
            {slide.description}
          </motion.p>
        )}

        {slide.bullets && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            {slide.bullets.map((contact, i) => {
              const [label, value] = contact.includes(":")
                ? contact.split(":").map(s => s.trim())
                : ["", contact];
              const Icon = contact.includes("@") ? Mail
                : contact.includes("github") ? Github
                : Globe;

              return (
                <a
                  key={i}
                  href={contact.includes("@") ? `mailto:${value}` : `https://${value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-opacity hover:opacity-70"
                  style={{ color: COLORS.primaryDark }}
                >
                  <Icon className="w-5 h-5" style={{ color: COLORS.primary }} />
                  <span>{value || contact}</span>
                </a>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// DS 커버 레이아웃: 좌측 이미지 + 우측 제목/타임라인/성과
// ============================================================================
function DSCoverSlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex px-12 py-10 gap-8">
      {/* 좌측: 대표 이미지 */}
      <div className="w-1/2 flex items-center justify-center">
        {slide.heroImage ? (
          <img
            src={slide.heroImage}
            alt="프로젝트 대표 이미지"
            className="rounded-lg shadow-lg max-h-full object-contain"
          />
        ) : (
          <div
            className="w-full aspect-video rounded-lg border-2 border-dashed flex items-center justify-center"
            style={{ borderColor: COLORS.primary, opacity: 0.3 }}
          >
            <span style={{ color: COLORS.primary }}>대표 이미지</span>
          </div>
        )}
      </div>

      {/* 우측: 제목 + 타임라인 + 성과 */}
      <div className="w-1/2 flex flex-col">
        {/* Label */}
        <span
          className="text-xs font-medium tracking-wide"
          style={{ color: COLORS.primary }}
        >
          {slide.subtitle || `2026 · ${sectionTitle}`}
        </span>

        {/* Display Title */}
        <h1
          className="text-4xl font-bold mt-2 mb-4 leading-tight"
          style={{ color: COLORS.primaryDark }}
        >
          {slide.title}
        </h1>

        {/* Description */}
        {slide.description && (
          <p
            className="text-lg mb-6 leading-relaxed"
            style={{ color: COLORS.primaryDark, opacity: 0.8 }}
          >
            {slide.description}
          </p>
        )}

        {/* Timeline 2열 */}
        {slide.timeline && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
            {slide.timeline.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: COLORS.primary }}
                />
                <div>
                  <div className="font-medium text-sm" style={{ color: COLORS.primaryDark }}>
                    {item.title}
                  </div>
                  <div className="text-xs opacity-70" style={{ color: COLORS.primaryDark }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements 2×2 */}
        {slide.achievementGrid && (
          <div className="grid grid-cols-2 gap-4 mt-auto">
            {slide.achievementGrid.map((a, i) => (
              <div key={i}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span style={{ color: COLORS.primary }}>▸</span>
                  <span className="font-semibold text-sm" style={{ color: COLORS.primaryDark }}>
                    {a.title}
                  </span>
                </div>
                {a.items.map((item, j) => (
                  <div key={j} className="text-xs opacity-70 ml-4" style={{ color: COLORS.primaryDark }}>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Ratio 1:1 레이아웃
// ============================================================================
function Ratio11Slide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-12 py-10">
      <SectionLabel title={sectionTitle} subtitle={slide.subtitle} />
      <h2 className="text-2xl font-semibold mt-2 mb-4" style={{ color: COLORS.primaryDark }}>
        {slide.title}
      </h2>

      <div className="flex-1 grid grid-cols-2 gap-8 min-h-0">
        {/* 좌측 콘텐츠 */}
        <div className="flex flex-col justify-center">
          {slide.leftContent?.type === "table" && slide.leftContent.headers && slide.leftContent.rows && (
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {slide.leftContent.headers.map((h, i) => (
                    <th
                      key={i}
                      className="text-left py-2 pr-4 border-b"
                      style={{
                        color: i === 0 ? COLORS.primary : COLORS.primaryDark,
                        borderColor: `${COLORS.primaryDark}20`,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slide.leftContent.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="py-2 pr-4 border-b"
                        style={{
                          color: j === 0 ? COLORS.primary : COLORS.primaryDark,
                          borderColor: `${COLORS.primaryDark}10`,
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {slide.bullets && (
            <ul className="space-y-3">
              {slide.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-base" style={{ color: COLORS.primaryDark }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.primary }} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 우측 콘텐츠 */}
        <div className="flex flex-col justify-center">
          {slide.rightContent?.type === "before-after" && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.green100 }}>
                <div className="text-sm font-medium mb-2" style={{ color: "#991B1B" }}>Before</div>
                {slide.rightContent.before?.image ? (
                  <img src={slide.rightContent.before.image} alt="Before" className="rounded" />
                ) : (
                  <div className="h-24 rounded border-2 border-dashed flex items-center justify-center" style={{ borderColor: COLORS.primary, opacity: 0.3 }}>
                    Before 이미지
                  </div>
                )}
              </div>
              <div className="text-center text-2xl" style={{ color: COLORS.primary }}>↓</div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.green100 }}>
                <div className="text-sm font-medium mb-2" style={{ color: COLORS.primary }}>After</div>
                {slide.rightContent.after?.image ? (
                  <img src={slide.rightContent.after.image} alt="After" className="rounded" />
                ) : (
                  <div className="h-24 rounded border-2 border-dashed flex items-center justify-center" style={{ borderColor: COLORS.primary, opacity: 0.3 }}>
                    After 이미지
                  </div>
                )}
              </div>
            </div>
          )}
          {slide.visualPlaceholder && <VisualPlaceholder visual={slide.visualPlaceholder} />}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Ratio 1:2 레이아웃
// ============================================================================
function Ratio12Slide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-12 py-10">
      <SectionLabel title={sectionTitle} subtitle={slide.subtitle} />
      <h2 className="text-2xl font-semibold mt-2 mb-4" style={{ color: COLORS.primaryDark }}>
        {slide.title}
      </h2>

      <div className="flex-1 grid grid-cols-3 gap-8 min-h-0">
        {/* 좌측 1/3: 원칙/요약 */}
        <div className="flex flex-col justify-center">
          {slide.leftContent?.type === "principles" && slide.leftContent.items && (
            <div className="space-y-4">
              {slide.leftContent.items.map((item, i) => (
                <div key={i} className="pb-3 border-b" style={{ borderColor: `${COLORS.primaryDark}20` }}>
                  <div className="font-semibold text-base mb-1" style={{ color: COLORS.primaryDark }}>
                    {item.title}
                  </div>
                  <div className="text-sm opacity-80" style={{ color: COLORS.primaryDark }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          )}
          {slide.bullets && (
            <ul className="space-y-3">
              {slide.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-base" style={{ color: COLORS.primaryDark }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.primary }} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 우측 2/3: 상세 비주얼 */}
        <div className="col-span-2 flex flex-col justify-center">
          {slide.rightContent?.type === "flowchart" && slide.rightContent.steps && (
            slide.rightContent.direction === "vertical" ? (
              // 수직 플로우차트
              <div className="flex flex-col items-center justify-center gap-2">
                {slide.rightContent.steps.map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className="px-4 py-3 rounded-lg text-center min-w-max"
                      style={{ backgroundColor: COLORS.green100 }}
                    >
                      <div className="font-medium text-sm" style={{ color: COLORS.primaryDark }}>
                        {step.title}
                      </div>
                      {step.desc && (
                        <div className="text-xs opacity-70 mt-1" style={{ color: COLORS.primaryDark }}>
                          {step.desc}
                        </div>
                      )}
                    </div>
                    {i < slide.rightContent!.steps!.length - 1 && (
                      <span style={{ color: COLORS.primary, fontSize: "20px" }}>↓</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // 수평 플로우차트 (기본)
              <div className="flex items-center justify-center gap-4">
                {slide.rightContent.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className="px-4 py-3 rounded-lg text-center"
                      style={{ backgroundColor: COLORS.green100 }}
                    >
                      {step.number && (
                        <div className="font-medium text-sm" style={{ color: COLORS.primary }}>
                          {step.number}
                        </div>
                      )}
                      <div className="font-medium text-sm" style={{ color: COLORS.primaryDark }}>
                        {step.title}
                      </div>
                      {step.desc && (
                        <div className="text-xs opacity-70 mt-1" style={{ color: COLORS.primaryDark }}>
                          {step.desc}
                        </div>
                      )}
                    </div>
                    {i < slide.rightContent!.steps!.length - 1 && (
                      <span style={{ color: COLORS.primary }}>→</span>
                    )}
                  </div>
                ))}
              </div>
            )
          )}
          {slide.visualPlaceholder && <VisualPlaceholder visual={slide.visualPlaceholder} />}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Ratio 1:3 레이아웃
// ============================================================================
function Ratio13Slide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-12 py-10">
      <SectionLabel title={sectionTitle} subtitle={slide.subtitle} />
      <h2 className="text-2xl font-semibold mt-2 mb-4" style={{ color: COLORS.primaryDark }}>
        {slide.title}
      </h2>

      <div className="flex-1 grid grid-cols-4 gap-8 min-h-0">
        {/* 좌측 1/4: 요약 */}
        <div className="flex flex-col justify-center">
          {slide.description && (
            <p className="text-base leading-relaxed" style={{ color: COLORS.primaryDark, opacity: 0.8 }}>
              {slide.description}
            </p>
          )}
        </div>

        {/* 우측 3/4: 6스텝 지그재그 */}
        <div className="col-span-3 flex flex-col justify-center">
          {slide.steps && (
            <div className="grid grid-cols-3 gap-4">
              {slide.steps.map((step, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: COLORS.green100 }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium mb-2"
                    style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
                  >
                    {step.number}
                  </div>
                  <div className="font-semibold text-sm mb-1" style={{ color: COLORS.primaryDark }}>
                    {step.title}
                  </div>
                  <div className="text-xs opacity-80 leading-relaxed" style={{ color: COLORS.primaryDark }}>
                    {step.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Split 레이아웃: 상단 1:1 + 하단 플로우
// ============================================================================
function SplitSlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-12 py-10">
      <SectionLabel title={sectionTitle} subtitle={slide.subtitle} />
      <h2 className="text-2xl font-semibold mt-2 mb-4" style={{ color: COLORS.primaryDark }}>
        {slide.title}
      </h2>

      {/* 상단 1:1 */}
      <div className="flex-1 grid grid-cols-2 gap-8 min-h-0">
        {/* 좌측 */}
        <div className="flex flex-col justify-center">
          {slide.topLeft && (
            <>
              <div className="text-sm font-medium mb-3" style={{ color: COLORS.primary }}>
                {slide.topLeft.title}
              </div>
              <ul className="space-y-2">
                {slide.topLeft.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-base" style={{ color: COLORS.primaryDark }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.primary }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* 우측 */}
        <div className="flex flex-col justify-center">
          {slide.topRight && (
            <>
              <div className="text-sm font-medium mb-3" style={{ color: COLORS.primary }}>
                {slide.topRight.title}
              </div>
              <ul className="space-y-2">
                {slide.topRight.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-base" style={{ color: COLORS.primaryDark }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.primary }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* 하단 플로우 */}
      {slide.bottomFlow && (
        <div
          className="mt-4 p-4 rounded-lg flex items-center justify-center gap-4"
          style={{ backgroundColor: COLORS.green100 }}
        >
          {slide.bottomFlow.nodes.map((node, i) => (
            <div key={i} className="flex items-center gap-4">
              <div
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: COLORS.white, color: COLORS.primaryDark }}
              >
                {node}
              </div>
              {i < slide.bottomFlow!.nodes.length - 1 && (
                <span style={{ color: COLORS.primary }}>→</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 슬라이드 라우터: layout에 따라 적절한 컴포넌트 선택
// ============================================================================
function Slide({ slide, sectionTitle }: SlideProps) {
  switch (slide.layout) {
    // PDF 레이아웃
    case "pdf":
      return (
        <div className="h-full w-full flex items-center justify-center p-8">
          <PDFPageViewer pdfUrl="/portfolio.pdf" pageNumber={slide.pdfPage || 1} />
        </div>
      );
    // 기존 레이아웃
    case "intro":
      return <IntroSlide slide={slide} sectionTitle={sectionTitle} />;
    case "cover":
      return <CoverSlide slide={slide} sectionTitle={sectionTitle} />;
    case "problem":
      return <ProblemSlide slide={slide} sectionTitle={sectionTitle} />;
    case "process":
      return <ProcessSlide slide={slide} sectionTitle={sectionTitle} />;
    case "comparison":
      return <ComparisonSlide slide={slide} sectionTitle={sectionTitle} />;
    case "metric":
      return <MetricSlide slide={slide} sectionTitle={sectionTitle} />;
    case "text-heavy":
      return <TextHeavySlide slide={slide} sectionTitle={sectionTitle} />;
    case "full-visual":
      return <FullVisualSlide slide={slide} sectionTitle={sectionTitle} />;
    case "outro":
      return <OutroSlide slide={slide} sectionTitle={sectionTitle} />;
    // 새 레이아웃 (포트폴리오 가이드 기반)
    case "ds-cover":
      return <DSCoverSlide slide={slide} sectionTitle={sectionTitle} />;
    case "ratio-1-1":
      return <Ratio11Slide slide={slide} sectionTitle={sectionTitle} />;
    case "ratio-1-2":
      return <Ratio12Slide slide={slide} sectionTitle={sectionTitle} />;
    case "ratio-1-3":
      return <Ratio13Slide slide={slide} sectionTitle={sectionTitle} />;
    case "split":
      return <SplitSlide slide={slide} sectionTitle={sectionTitle} />;
    default:
      // 기본 레이아웃
      return <ProcessSlide slide={slide} sectionTitle={sectionTitle} />;
  }
}

// ============================================================================
// 모바일 안내 모달
// ============================================================================

function MobileBlockModal() {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-white">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm rounded-2xl border p-6 shadow-xl"
        style={{
          backgroundColor: COLORS.white,
          borderColor: COLORS.green200,
        }}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: COLORS.green100 }}
          >
            <Monitor className="h-7 w-7" style={{ color: COLORS.primary }} />
          </div>
          <div>
            <h3
              className="text-xl font-semibold"
              style={{ color: COLORS.primaryDark }}
            >
              데스크탑에서 확인해주세요
            </h3>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: COLORS.primary }}
            >
              포트폴리오는 더 나은 경험을 위해<br />
              데스크탑 환경에 최적화되어 있습니다.
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="mt-2 w-full rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: COLORS.primary }}
          >
            홈으로 돌아가기
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// 메인 페이지 컴포넌트
// ============================================================================

export default function PortfolioPage() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [direction, setDirection] = useState(0); // -1: 왼쪽, 1: 오른쪽

  const currentSection = SECTIONS[currentSectionIndex];
  const currentSlide = currentSection.slides[currentSlideIndex];
  const totalSlides = currentSection.slides.length;

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 전체 슬라이드 인덱스 계산 (키보드 네비게이션용)
  const { flatIndex, totalFlatSlides } = useMemo(() => {
    let idx = 0;
    for (let i = 0; i < currentSectionIndex; i++) {
      idx += SECTIONS[i].slides.length;
    }
    idx += currentSlideIndex;

    const total = SECTIONS.reduce((acc, s) => acc + s.slides.length, 0);
    return { flatIndex: idx, totalFlatSlides: total };
  }, [currentSectionIndex, currentSlideIndex]);

  // 슬라이드 이동 함수
  const goToFlatIndex = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= totalFlatSlides) return;

    let accumulated = 0;
    for (let sIdx = 0; sIdx < SECTIONS.length; sIdx++) {
      const sectionSlideCount = SECTIONS[sIdx].slides.length;
      if (targetIndex < accumulated + sectionSlideCount) {
        const newSlideIndex = targetIndex - accumulated;
        setDirection(targetIndex > flatIndex ? 1 : -1);
        setCurrentSectionIndex(sIdx);
        setCurrentSlideIndex(newSlideIndex);
        return;
      }
      accumulated += sectionSlideCount;
    }
  }, [flatIndex, totalFlatSlides]);

  // 섹션 선택
  const handleSelectSection = useCallback((sectionIndex: number) => {
    let targetFlat = 0;
    for (let i = 0; i < sectionIndex; i++) {
      targetFlat += SECTIONS[i].slides.length;
    }
    goToFlatIndex(targetFlat);
  }, [goToFlatIndex]);

  // PDF 다운로드 핸들러
  const handleDownload = useCallback(() => {
    // TODO: PDF 다운로드 구현
    alert("PDF 다운로드 기능은 추후 구현 예정입니다.");
  }, []);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToFlatIndex(flatIndex + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToFlatIndex(flatIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flatIndex, goToFlatIndex]);

  // 스크롤(휠) 네비게이션
  const lastWheelTimeRef = useRef(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const WHEEL_THROTTLE = 600; // 600ms 쓰로틀

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // 페이지 바운스 방지

      const now = Date.now();
      if (now - lastWheelTimeRef.current < WHEEL_THROTTLE) return;
      if (isScrollingRef.current) return;

      if (Math.abs(e.deltaY) > 20) {
        lastWheelTimeRef.current = now;
        isScrollingRef.current = true;

        if (e.deltaY > 0) {
          goToFlatIndex(flatIndex + 1);
        } else {
          goToFlatIndex(flatIndex - 1);
        }

        // 애니메이션 완료 후 스크롤 허용
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 400);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [flatIndex, goToFlatIndex]);

  // 로딩 중
  if (isMobile === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
          style={{ borderColor: COLORS.primary, borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  // 모바일
  if (isMobile) {
    return <MobileBlockModal />;
  }

  // 슬라이드 애니메이션 variants (페이드)
  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white" style={{ overscrollBehavior: "none" }}>
      {/* 상단 네비게이션 */}
      <header className="flex-shrink-0 px-6 pt-4 pb-2">
        <TopNav
          sections={SECTIONS}
          currentSectionIndex={currentSectionIndex}
          currentSlideIndex={currentSlideIndex}
          flatIndex={flatIndex}
          totalFlatSlides={totalFlatSlides}
          onSelectSection={handleSelectSection}
          onNavigate={goToFlatIndex}
          onDownload={handleDownload}
        />
      </header>

      {/* 메인 슬라이드 영역 */}
      <main className="flex-1 min-h-0">
        <div className="h-full overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSectionIndex}-${currentSlideIndex}`}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Slide slide={currentSlide} sectionTitle={currentSection.title} />
            </motion.div>
          </AnimatePresence>

          {/* 좌우 화살표 버튼 */}
          {flatIndex > 0 && (
            <button
              onClick={() => goToFlatIndex(flatIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors hover:bg-black/5"
              aria-label="이전 슬라이드"
            >
              <ChevronLeft className="w-6 h-6" style={{ color: COLORS.primaryDark }} />
            </button>
          )}
          {flatIndex < totalFlatSlides - 1 && (
            <button
              onClick={() => goToFlatIndex(flatIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors hover:bg-black/5"
              aria-label="다음 슬라이드"
            >
              <ChevronRight className="w-6 h-6" style={{ color: COLORS.primaryDark }} />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
