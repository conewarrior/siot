"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { SideNavigation } from "@/components/portfolio/side-navigation";
import { PortfolioMenuBar } from "@/components/portfolio/portfolio-menu-bar";
import { CoverSlide } from "@/components/portfolio/slides/cover-slide";
import { ProblemSlide } from "@/components/portfolio/slides/problem-slide";
import { ProcessSlide } from "@/components/portfolio/slides/process-slide";
import { OutcomeSlide } from "@/components/portfolio/slides/outcome-slide";
import { ReflectionSlide } from "@/components/portfolio/slides/reflection-slide";
import type { PortfolioSection, PortfolioSlide } from "@/lib/portfolio-mdx";

// CRO 분석 다이어그램
import { DataPipeline } from "@/components/portfolio/diagrams/cro/data-pipeline";
import { CROMetricsChart } from "@/components/portfolio/diagrams/cro/metrics-chart";

// UI Flow 다이어그램
import { AsIsFlow, ToBeFlow, FeatureConsolidation } from "@/components/portfolio/diagrams/ui-flow";

// 라벨링 툴 다이어그램
import { ActionFlow, ShortcutUsageChart, SpeedMetrics, ToolbarComparison } from "@/components/portfolio/diagrams/labeling-tool";

// 디자인 시스템 다이어그램
import { ColorScale, TokenStructure, SpecTemplate, ResultsDashboard } from "@/components/portfolio/diagrams/design-system";

// 클라이언트에서 사용할 플랫 슬라이드 타입
interface FlatSlide {
  sectionIndex: number;
  sectionSlug: string;
  sectionTitle: string;
  sectionColor: string;
  sectionTextColor: string;
  slideIndex: number; // 섹션 내 슬라이드 인덱스
  slide: PortfolioSlide;
  globalIndex: number;
}

interface PortfolioClientProps {
  sections: PortfolioSection[];
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
      if (slideType === "process") {
        return <DataPipeline />;
      }
      if (slideType === "outcome") {
        return <CROMetricsChart />;
      }
    }
    // 라벨링 툴 프로젝트
    if (sectionSlug === "project-2-labeling-tool") {
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

  // 슬라이드 렌더링 (배경색 없이)
  const renderSlide = (flatSlide: FlatSlide) => {
    const { slide, sectionTitle, sectionSlug } = flatSlide;
    const diagram = getSlideDiagram(sectionSlug, slide.type, slide.title);

    switch (slide.type) {
      case "cover":
        return <CoverSlide name={slide.title} title={sectionTitle} />;
      case "problem":
        return <ProblemSlide heading={slide.title} />;
      case "process":
        return <ProcessSlide heading={slide.title}>{diagram}</ProcessSlide>;
      case "outcome":
        return <OutcomeSlide heading={slide.title}>{diagram}</OutcomeSlide>;
      case "reflection":
        return <ReflectionSlide heading={slide.title} />;
      default:
        return <CoverSlide name={slide.title} title={sectionTitle} />;
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
        <div className="flex flex-1 flex-col gap-2">
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
            className="flex-1 overflow-y-scroll rounded-xl border border-gray-200 bg-white snap-y snap-mandatory"
          >
            {flatSlides.map((flatSlide, index) => (
              <div
                key={`${flatSlide.sectionSlug}-${flatSlide.slideIndex}`}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                data-global-index={flatSlide.globalIndex}
                className="flex h-full w-full snap-start items-center justify-center"
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
  const [sections, setSections] = useState<PortfolioSection[]>([]);
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
