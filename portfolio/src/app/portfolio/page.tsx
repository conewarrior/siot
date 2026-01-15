"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { SideNavigation } from "@/components/portfolio/side-navigation";
import { PortfolioMenuBar } from "@/components/portfolio/portfolio-menu-bar";
import { CoverSlide } from "@/components/portfolio/slides/cover-slide";
import { ProblemSlide } from "@/components/portfolio/slides/problem-slide";
import { ProcessSlide } from "@/components/portfolio/slides/process-slide";
import { OutcomeSlide } from "@/components/portfolio/slides/outcome-slide";
import { ProfileSlide } from "@/components/portfolio/slides/profile-slide";
import { ContactSlide } from "@/components/portfolio/slides/contact-slide";
import type { PortfolioSection } from "@/lib/portfolio-mdx";

// API에서 받아오는 슬라이드 타입 (serializedContent 포함)
interface ClientPortfolioSlide {
  type: "cover" | "problem" | "process" | "outcome" | "reflection" | "profile" | "contact";
  title: string;
  content: string;
  serializedContent: MDXRemoteSerializeResult | null;
}

// API에서 받아오는 섹션 타입
interface ClientPortfolioSection extends Omit<PortfolioSection, "slides"> {
  slides: ClientPortfolioSlide[];
}

// CRO 분석 다이어그램
import { DataPipeline } from "@/components/portfolio/diagrams/cro/data-pipeline";
import { CROMetricsChart } from "@/components/portfolio/diagrams/cro/metrics-chart";

// UI Flow 다이어그램
import { AsIsFlow, ToBeFlow, FeatureConsolidation } from "@/components/portfolio/diagrams/ui-flow";

// 라벨링 툴 다이어그램
import { ActionFlow, ShortcutUsageChart, SpeedMetrics, ToolbarComparison } from "@/components/portfolio/diagrams/labeling-tool";

// 디자인 시스템 다이어그램
import { ColorScale, TokenStructure, SpecTemplate, ResultsDashboard } from "@/components/portfolio/diagrams/design-system";

// 비즈니스 임팩트 컴포넌트
import {
  CROBusinessImpact,
  LabelingBusinessImpact,
  DesignSystemBusinessImpact,
  UIFlowBusinessImpact,
} from "@/components/portfolio/diagrams/shared";

// 회고 데이터 타입
import type { ReflectionItem } from "@/components/portfolio/slides/outcome-slide";
import type { MetaInfo, ProjectPreview } from "@/components/portfolio/slides/cover-slide";
import type { Skill } from "@/components/portfolio/slides/profile-slide";
import type { ContactLink } from "@/components/portfolio/slides/contact-slide";

// 프로젝트별 회고 데이터
const REFLECTION_DATA: Record<string, { strengths: ReflectionItem[]; improvements: ReflectionItem[] }> = {
  "project-1-cro-analysis": {
    strengths: [
      { text: "자동화로 반복 작업 제거" },
      { text: "데이터 기반 의사결정 문화 정착" },
    ],
    improvements: [
      { text: "초기 설계 시 확장성 고려 부족 → 다른 랜딩페이지 적용 시 커스터마이징 필요" },
      { text: "비개발자가 대시보드 설정 변경하기 어려움 → 관리 UI 필요성 체감" },
      { text: "패턴 인식 정확도 검증 프로세스 미흡 → 휴리스틱과 실제 결과 비교 필요" },
    ],
  },
  "project-2-labeling-tool": {
    strengths: [
      { text: "사용자 관찰 기반 핵심 문제 도출" },
      { text: "단축키 재설계로 작업 효율 대폭 개선" },
      { text: "단계별 개선으로 사용자 적응 부담 최소화" },
    ],
    improvements: [
      { text: "초기에 정량적 측정 기준을 더 명확히 했으면 개선 효과 증명이 수월했을 것" },
      { text: "파워유저 vs 신규유저 요구사항 균형 맞추기 어려웠음" },
    ],
  },
  "project-3-design-system": {
    strengths: [
      { text: "WCAG 기준을 적용해 명도 대비 충족 여부를 객관화" },
      { text: "개발팀과 네이밍 규칙을 사전 합의하여 토큰 싱크 비용 최소화" },
      { text: "히스토리 템플릿으로 컴포넌트 변경 이력 추적 가능" },
    ],
    improvements: [
      { text: "신규 입사자 온보딩 문서가 부족해 구두 설명에 의존" },
      { text: "기존 피그마 파일 마이그레이션에 예상보다 2주 추가 소요" },
      { text: "스토리북 연동 시 디자인 토큰 업데이트 자동화 미구현" },
    ],
  },
  "project-4-ui-flow": {
    strengths: [
      { text: "복잡한 플로우를 시각화해 문제점을 팀 전체가 공유" },
      { text: "5단계 → 2단계 단순화로 UX 개선 효과 명확히 입증" },
      { text: "기능 통합 시 사용자 피드백 반영 프로세스 수립" },
    ],
    improvements: [
      { text: "레거시 기능 제거 시 기존 사용자 불만 대응 준비 부족" },
      { text: "A/B 테스트 없이 전면 적용해 롤백 리스크 존재" },
    ],
  },
};

// 프로젝트별 Cover 메타 정보
const COVER_META: Record<string, MetaInfo> = {
  "project-1-cro-analysis": {
    company: "지피터스",
    period: "2024.12 - 2025.01",
    role: "UX 리서치 · 데이터 분석",
  },
  "project-2-labeling-tool": {
    company: "라벨러스",
    period: "2024.06 - 2024.09",
    role: "UX 디자인 · 사용성 개선",
  },
  "project-3-design-system": {
    company: "데이원컴퍼니 (패스트캠퍼스)",
    period: "2023.12 - 2024.03",
    role: "디자인 시스템 설계",
  },
  "project-4-ui-flow": {
    company: "라인웍스",
    period: "2023.06 - 2023.09",
    role: "UX 설계 · IA 개선",
  },
};

// 프로젝트별 콘텐츠 데이터 (개요, 문제 배경, 접근 방식)
const PROJECT_CONTENT: Record<string, {
  description: string;
  problemContext: string[];
  approaches: Record<string, string[]>;
}> = {
  "project-1-cro-analysis": {
    description: "광고 캠페인 데이터를 자동으로 수집·분석하여 마케팅팀이 데이터 기반 의사결정을 빠르게 내릴 수 있도록 지원하는 분석 시스템을 구축했습니다.",
    problemContext: [
      "마케팅팀이 120개 이상의 광고 캠페인 성과를 수동으로 분석하느라 주당 8시간 이상 소요",
      "GA4, Beusable 등 여러 툴에서 데이터를 수집해 엑셀로 취합하는 반복 작업",
      "데이터 취합에 시간을 쓰느라 정작 인사이트 도출에 집중하지 못하는 상황",
    ],
    approaches: {
      "해결 과정": [
        "Beusable 히트맵과 GA4 전환 데이터를 API로 자동 수집",
        "BigQuery에 통합 저장 후 Looker Studio로 실시간 대시보드 구축",
        "캠페인별 성과를 한눈에 비교할 수 있는 뷰 설계",
      ],
    },
  },
  "project-2-labeling-tool": {
    description: "AI 학습 데이터 라벨링 작업자들의 반복 동작을 분석하여, 단축키와 UI를 재설계해 작업 효율을 48% 향상시켰습니다.",
    problemContext: [
      "라벨링 작업자들이 하루 8시간 동안 수천 건의 이미지를 처리",
      "클래스 선택에만 전체 작업 시간의 47%가 소요되는 병목 발견",
      "기존 단축키가 직관적이지 않아 대부분 마우스 클릭에 의존",
    ],
    approaches: {
      "리서치": [
        "작업자 5명을 대상으로 1주일간 행동 관찰 및 로그 분석",
        "각 작업 단계별 소요 시간 측정으로 병목 지점 파악",
        "파워유저와 신규유저의 작업 패턴 차이 분석",
      ],
      "솔루션": [
        "자주 쓰는 도구에 직관적인 단축키(B, P, V, Z) 할당",
        "툴바에 단축키 힌트를 직접 노출해 학습 곡선 완화",
        "플로팅 툴바로 마우스 이동 거리 최소화",
      ],
    },
  },
  "project-3-design-system": {
    description: "디자인-개발 간 소통 비용을 줄이기 위해 체계적인 컬러 토큰과 컴포넌트 명세 규칙을 정립하고, Figma Variables로 일원화했습니다.",
    problemContext: [
      "같은 색상에 여러 이름이 혼용되어 개발자가 어떤 값을 써야 할지 혼란",
      "컴포넌트 스펙 전달 시 구두 설명에 의존해 누락과 오해 발생",
      "디자인 변경 이력이 관리되지 않아 '왜 바뀌었는지' 추적 불가",
    ],
    approaches: {
      "컬러 시스템": [
        "WCAG 접근성 기준을 충족하는 10단계 컬러 스케일 정의",
        "Gray, Blue, Green, Red, Yellow 5개 팔레트 구축",
        "각 단계별 명도 대비를 계산해 용도별 가이드 제공",
      ],
      "토큰 네이밍": [
        "위치 기반(header-bg) → 용도 기반(color.bg.structural) 전환",
        "개발팀과 네이밍 규칙 사전 협의로 싱크 비용 제거",
        "Structural, Interactive, Overlay, Indicator 4개 카테고리로 분류",
      ],
      "명세 규칙": [
        "컴포넌트별 Properties 패널에 토큰명 직접 기재",
        "변경 히스토리를 템플릿화해 버전별 이력 추적 가능",
        "All States 섹션으로 상태별 스타일 한눈에 확인",
      ],
    },
  },
  "project-4-ui-flow": {
    description: "분산된 사내 시스템 기능들을 통합하고 뎁스를 줄여, PM들이 원하는 기능에 빠르게 도달할 수 있도록 IA를 재설계했습니다.",
    problemContext: [
      "같은 기능에 도달하는 경로가 3~4개로 사용자 혼란 유발",
      "HR 관련 기능이 3개 메뉴에 분산되어 탐색 비용 증가",
      "자주 쓰는 결재 기능이 5단계 깊이에 위치해 접근성 저하",
    ],
    approaches: {
      "AS-IS 분석": [
        "전체 메뉴 구조를 플로우차트로 시각화해 문제점 공유",
        "중복 진입점, 깊은 뎁스, 정보 과부하 지점 식별",
        "사용자 인터뷰로 실제 불편 사항 수집",
      ],
      "TO-BE 설계": [
        "Overview 통합 화면으로 주요 기능 한곳에 모음",
        "카테고리 기반 최상단 위계로 뎁스 2단계로 축소",
        "7개 진입점을 3개로 정리해 일관된 동선 확보",
      ],
    },
  },
};

// 포트폴리오 인트로 데이터
const PORTFOLIO_INTRO = {
  intro: [
    "사용자 경험과 비즈니스 목표를 연결하는 디자인을 만듭니다.",
    "데이터 기반의 의사결정과 체계적인 시스템으로 일관된 경험을 구축합니다.",
  ],
  projects: [
    { title: "CRO 자동화", highlight: "분석 70% 단축", color: "#F97316" },
    { title: "라벨링 UX", highlight: "작업 48% 단축", color: "#EC4899" },
    { title: "디자인 시스템", highlight: "협업 20% 단축", color: "#7C3AED" },
    { title: "UI Flow", highlight: "단계 60% 축소", color: "#2563EB" },
  ] as ProjectPreview[],
};

// About 프로필 데이터
const PROFILE_DATA = {
  name: "김한솔",
  role: "Product Designer & Developer",
  skills: [
    {
      icon: "chart" as const,
      title: "UX 리서치 및 데이터 분석",
      description: "사용자 행동 데이터를 기반으로 의사결정",
    },
    {
      icon: "palette" as const,
      title: "디자인 시스템 설계",
      description: "체계적인 토큰과 컴포넌트 구조화",
    },
    {
      icon: "code" as const,
      title: "프론트엔드 개발",
      description: "React / Next.js로 직접 구현",
    },
    {
      icon: "figma" as const,
      title: "Figma 고급 활용",
      description: "Variables, Auto Layout, Dev Mode",
    },
  ] as Skill[],
  philosophy: [
    "데이터와 사용자 피드백을 기반으로 의사결정을 내립니다.",
    "재사용 가능한 시스템을 만들어 효율성을 높입니다.",
  ],
};

// Contact 연락처 데이터
const CONTACT_DATA = {
  heading: "Thank You",
  subtext: "새로운 프로젝트, 협업 제안, 또는 단순한 대화도 환영합니다.",
  links: [
    {
      type: "email" as const,
      label: "kimhansol307@gmail.com",
      href: "mailto:kimhansol307@gmail.com",
    },
    {
      type: "github" as const,
      label: "conewarrior/siot-claude-toolkit",
      href: "https://github.com/conewarrior/siot-claude-toolkit",
    },
  ] as ContactLink[],
  message: "이 포트폴리오는 Next.js와 MDX로 제작되었습니다.",
};

// 클라이언트에서 사용할 플랫 슬라이드 타입
interface FlatSlide {
  sectionIndex: number;
  sectionSlug: string;
  sectionTitle: string;
  sectionColor: string;
  sectionTextColor: string;
  slideIndex: number; // 섹션 내 슬라이드 인덱스
  slide: ClientPortfolioSlide;
  globalIndex: number;
}

interface PortfolioClientProps {
  sections: ClientPortfolioSection[];
}

function PortfolioClient({ sections }: PortfolioClientProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 현재 슬라이드 상태
  const [currentGlobalIndex, setCurrentGlobalIndex] = useState(0);

  // 모든 섹션의 슬라이드를 flat하게 펼치기
  const flatSlides = useMemo<FlatSlide[]>(() => {
    const slides: FlatSlide[] = [];
    let globalIndex = 0;

    sections.forEach((section, sectionIndex) => {
      section.slides.forEach((slide, slideIndex) => {
        slides.push({
          sectionIndex,
          sectionSlug: section.slug,
          sectionTitle: section.title,
          sectionColor: section.color,
          sectionTextColor: section.textColor,
          slideIndex,
          slide,
          globalIndex: globalIndex++,
        });
      });
    });

    return slides;
  }, [sections]);

  // 현재 슬라이드 정보
  const currentSlide = flatSlides[currentGlobalIndex];
  const currentSectionIndex = currentSlide?.sectionIndex ?? 0;
  const currentSlideInSection = currentSlide?.slideIndex ?? 0;

  // 사이드 내비게이션용 섹션 목록 (totalSlides 포함)
  const navSections = useMemo(() => {
    return sections.map((section) => ({
      id: section.slug,
      title: section.title,
      color: section.color,
      textColor: section.textColor,
      totalSlides: section.slides.length,
    }));
  }, [sections]);

  // 현재 섹션의 총 슬라이드 수
  const currentSectionTotalSlides = sections[currentSectionIndex]?.slides.length ?? 1;

  // Intersection Observer로 현재 슬라이드 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const globalIndex = Number(
              (entry.target as HTMLElement).dataset.globalIndex
            );
            if (!isNaN(globalIndex)) {
              setCurrentGlobalIndex(globalIndex);
            }
          }
        });
      },
      { threshold: 0.5, root: canvasRef.current }
    );

    slideRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [flatSlides]);

  // 섹션으로 이동
  const goToSection = useCallback(
    (sectionIndex: number) => {
      const canvas = canvasRef.current;
      const slideIndex = flatSlides.findIndex(
        (s) => s.sectionIndex === sectionIndex
      );
      if (slideIndex !== -1 && slideRefs.current[slideIndex] && canvas) {
        const targetSlide = slideRefs.current[slideIndex];
        if (!targetSlide) return;

        canvas.style.scrollSnapType = "none";
        targetSlide.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          canvas.style.scrollSnapType = "y mandatory";
        }, 500);
      }
    },
    [flatSlides]
  );

  // 섹션별 다이어그램 컴포넌트 매핑
  const getSlideDiagram = (sectionSlug: string, slideType: string, slideTitle: string) => {
    // CRO 분석 프로젝트
    if (sectionSlug === "project-1-cro-analysis") {
      if (slideType === "problem") {
        return <CROBusinessImpact />;
      }
      if (slideType === "process") {
        return <DataPipeline />;
      }
      if (slideType === "outcome") {
        return <CROMetricsChart />;
      }
    }
    // 라벨링 툴 프로젝트
    if (sectionSlug === "project-2-labeling-tool") {
      if (slideType === "problem") {
        return <LabelingBusinessImpact />;
      }
      if (slideType === "process" && slideTitle === "리서치") {
        return <ActionFlow />;
      }
      if (slideType === "process" && slideTitle === "솔루션") {
        return <ToolbarComparison />;
      }
      if (slideType === "outcome") {
        return (
          <div className="flex flex-col gap-8">
            <ShortcutUsageChart />
            <SpeedMetrics />
          </div>
        );
      }
    }
    // 디자인 시스템 프로젝트
    if (sectionSlug === "project-3-design-system") {
      if (slideType === "problem") {
        return <DesignSystemBusinessImpact />;
      }
      if (slideType === "process" && slideTitle === "컬러 시스템") {
        return <ColorScale showDarkModeComparison={false} />;
      }
      if (slideType === "process" && slideTitle === "토큰 네이밍") {
        return <TokenStructure />;
      }
      if (slideType === "process" && slideTitle === "명세 규칙") {
        return <SpecTemplate />;
      }
      if (slideType === "outcome") {
        return <ResultsDashboard />;
      }
    }
    // UI Flow 개선 프로젝트
    if (sectionSlug === "project-4-ui-flow") {
      if (slideType === "problem") {
        return <UIFlowBusinessImpact />;
      }
      if (slideType === "process" && slideTitle === "AS-IS 분석") {
        return <AsIsFlow />;
      }
      if (slideType === "process" && slideTitle === "TO-BE 설계") {
        return <ToBeFlow />;
      }
      if (slideType === "outcome") {
        return <FeatureConsolidation />;
      }
    }
    return null;
  };

  // 슬라이드 렌더링 - 다이어그램 중심, MDX 텍스트 제거
  const renderSlide = (flatSlide: FlatSlide) => {
    const { slide, sectionTitle, sectionSlug, sectionColor } = flatSlide;
    const diagram = getSlideDiagram(sectionSlug, slide.type, slide.title);

    // 프로젝트별 콘텐츠 가져오기
    const projectContent = PROJECT_CONTENT[sectionSlug];

    switch (slide.type) {
      case "cover":
        // 커버: 프로젝트명(sectionTitle)을 크게, 슬라이드 title은 서브타이틀
        const coverMeta = COVER_META[sectionSlug];
        const isPortfolioCover = sectionSlug === "cover";
        return (
          <CoverSlide
            name={isPortfolioCover ? "김한솔" : sectionTitle}
            title={isPortfolioCover ? "Product Designer & Developer" : slide.title}
            description={isPortfolioCover ? undefined : projectContent?.description}
            meta={coverMeta}
            accentColor={sectionColor}
            intro={isPortfolioCover ? PORTFOLIO_INTRO.intro : undefined}
            projects={isPortfolioCover ? PORTFOLIO_INTRO.projects : undefined}
          />
        );
      case "problem":
        // 문제: 컨텍스트 + 다이어그램
        return (
          <ProblemSlide heading={slide.title} context={projectContent?.problemContext}>
            {diagram}
          </ProblemSlide>
        );
      case "process":
        // 과정: 접근 방식 + 다이어그램
        const approachKey = slide.title; // 슬라이드 타이틀을 키로 사용
        const approachItems = projectContent?.approaches[approachKey];
        return (
          <ProcessSlide heading={slide.title} approach={approachItems}>
            {diagram}
          </ProcessSlide>
        );
      case "outcome":
        // 결과: 다이어그램 + 회고 (하단에 컴팩트하게)
        const outcomeReflection = REFLECTION_DATA[sectionSlug];
        return (
          <OutcomeSlide
            heading={slide.title}
            strengths={outcomeReflection?.strengths}
            improvements={outcomeReflection?.improvements}
            accentColor={sectionColor}
          >
            {diagram}
          </OutcomeSlide>
        );
      case "profile":
        // 프로필: About 슬라이드
        return (
          <ProfileSlide
            name={PROFILE_DATA.name}
            role={PROFILE_DATA.role}
            skills={PROFILE_DATA.skills}
            philosophy={PROFILE_DATA.philosophy}
            accentColor={sectionColor}
          />
        );
      case "contact":
        // 연락처: Thank You 슬라이드
        return (
          <ContactSlide
            heading={CONTACT_DATA.heading}
            subtext={CONTACT_DATA.subtext}
            links={CONTACT_DATA.links}
            message={CONTACT_DATA.message}
            accentColor={sectionColor}
          />
        );
      default:
        return (
          <CoverSlide name={sectionTitle} title={slide.title} />
        );
    }
  };

  if (flatSlides.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted">포트폴리오 콘텐츠가 없습니다.</p>
      </div>
    );
  }

  // 페이지 스크롤 없이 화면 안에 모든 요소 배치
  return (
    <div className="h-screen overflow-hidden px-4 py-2">
      {/* 가운데 정렬 컨테이너 - 헤더(64px) + 패딩(16px) + 여유(60px) = 140px */}
      <div className="mx-auto flex h-[calc(100vh-140px)] max-w-[1400px] gap-3">
        {/* 좌측 사이드 네비게이션 - 전체 높이에 맞춤 */}
        <SideNavigation
          sections={navSections}
          currentIndex={currentSectionIndex}
          currentSlideInSection={currentSlideInSection}
          onSelect={goToSection}
          className="hidden w-[160px] flex-shrink-0 md:flex"
        />

        {/* 오른쪽 영역: 메뉴바 + 메인 캔버스 */}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {/* 포트폴리오 메뉴바 (독립 카드) */}
          <PortfolioMenuBar
            sectionName={currentSlide?.sectionTitle ?? ""}
            sectionColor={currentSlide?.sectionColor ?? "#000000"}
            currentSlideInSection={currentSlideInSection + 1}
            totalSlidesInSection={currentSectionTotalSlides}
          />

          {/* 메인 캔버스 (독립 카드) - 남은 공간 전체 사용 */}
          <div
            ref={canvasRef}
            className="min-w-0 flex-1 overflow-y-scroll overflow-x-hidden rounded-xl border border-border bg-background snap-y snap-mandatory"
          >
            {flatSlides.map((flatSlide, index) => (
              <div
                key={`${flatSlide.sectionSlug}-${flatSlide.slideIndex}`}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                data-global-index={flatSlide.globalIndex}
                className="flex h-full w-full snap-start items-center justify-center overflow-hidden"
              >
                {renderSlide(flatSlide)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [sections, setSections] = useState<ClientPortfolioSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSections(data.sections || []);
        setLoading(false);
      })
      .catch(() => {
        setError("포트폴리오를 불러오는 데 실패했습니다.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="text-sm text-muted">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-lg text-foreground">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return <PortfolioClient sections={sections} />;
}
