"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { SideNavigation } from "@/components/portfolio/side-navigation";
import { PageIndicator } from "@/components/portfolio/page-indicator";
import { CoverSlide } from "@/components/portfolio/slides/cover-slide";
import { ProblemSlide } from "@/components/portfolio/slides/problem-slide";
import { ProcessSlide } from "@/components/portfolio/slides/process-slide";
import { OutcomeSlide } from "@/components/portfolio/slides/outcome-slide";
import { ReflectionSlide } from "@/components/portfolio/slides/reflection-slide";
import type { PortfolioSection, PortfolioSlide } from "@/lib/portfolio-mdx";

// 클라이언트에서 사용할 플랫 슬라이드 타입
interface FlatSlide {
  sectionIndex: number;
  sectionSlug: string;
  sectionTitle: string;
  sectionColor: string;
  sectionTextColor: string;
  slideIndex: number;
  slide: PortfolioSlide;
  globalIndex: number;
}

// 섹션 데이터를 props로 받아서 클라이언트에서 렌더링
interface PortfolioClientProps {
  sections: PortfolioSection[];
}

function PortfolioClient({ sections }: PortfolioClientProps) {
  const containerRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);

  // 현재 섹션 인덱스 및 진행률 상태
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

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

  // 사이드 내비게이션용 섹션 목록
  const navSections = useMemo(() => {
    return sections.map((section) => ({
      id: section.slug,
      title: section.title,
      color: section.color,
      textColor: section.textColor,
    }));
  }, [sections]);

  // Intersection Observer로 현재 섹션 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = Number(
              (entry.target as HTMLElement).dataset.sectionIndex
            );
            if (!isNaN(sectionIndex)) {
              setCurrentSectionIndex(sectionIndex);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // 모든 슬라이드 요소 관찰
    slideRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [flatSlides]);

  // 스크롤 진행률 계산
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    setOverallProgress(progress);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 섹션 인덱스로 이동 (해당 섹션의 첫 번째 슬라이드로)
  const goToSection = useCallback(
    (sectionIndex: number) => {
      const container = containerRef.current;
      const slideIndex = flatSlides.findIndex(
        (s) => s.sectionIndex === sectionIndex
      );
      if (slideIndex !== -1 && slideRefs.current[slideIndex] && container) {
        const targetSlide = slideRefs.current[slideIndex];
        if (!targetSlide) return;

        // 스냅 임시 비활성화 후 스크롤
        container.style.scrollSnapType = "none";
        targetSlide.scrollIntoView({ behavior: "smooth" });

        // 스크롤 완료 후 스냅 재활성화
        setTimeout(() => {
          container.style.scrollSnapType = "y mandatory";
        }, 500);
      }
    },
    [flatSlides]
  );

  // 슬라이드 타입에 따른 컴포넌트 렌더링
  const renderSlide = (flatSlide: FlatSlide) => {
    const { slide, sectionColor, sectionTextColor, sectionTitle } = flatSlide;
    const commonProps = {
      backgroundColor: sectionColor,
      textColor: sectionTextColor,
    };

    switch (slide.type) {
      case "cover":
        return (
          <CoverSlide
            {...commonProps}
            name={slide.title}
            title={sectionTitle}
          />
        );
      case "problem":
        return <ProblemSlide {...commonProps} heading={slide.title} />;
      case "process":
        return <ProcessSlide {...commonProps} heading={slide.title} />;
      case "outcome":
        return <OutcomeSlide {...commonProps} heading={slide.title} />;
      case "reflection":
        return <ReflectionSlide {...commonProps} heading={slide.title} />;
      default:
        return (
          <CoverSlide {...commonProps} name={slide.title} title={sectionTitle} />
        );
    }
  };

  // 슬라이드가 없는 경우
  if (flatSlides.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted">포트폴리오 콘텐츠가 없습니다.</p>
      </main>
    );
  }

  return (
    <main
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
      role="main"
      aria-label="포트폴리오 슬라이드"
    >
      {/* 좌측 사이드 내비게이션 */}
      <SideNavigation
        sections={navSections}
        currentIndex={currentSectionIndex}
        onSelect={goToSection}
      />

      {/* 슬라이드 렌더링 */}
      {flatSlides.map((flatSlide, index) => (
        <section
          key={`${flatSlide.sectionSlug}-${flatSlide.slideIndex}`}
          ref={(el) => {
            slideRefs.current[index] = el;
          }}
          data-section-index={flatSlide.sectionIndex}
          className="h-screen w-full snap-start"
          aria-label={`${flatSlide.sectionTitle} - ${flatSlide.slide.title}`}
        >
          {renderSlide(flatSlide)}
        </section>
      ))}

      {/* 페이지 인디케이터 */}
      <PageIndicator progress={overallProgress} />
    </main>
  );
}

// 서버에서 데이터를 가져와서 클라이언트 컴포넌트로 전달
export default function PortfolioPage() {
  const [sections, setSections] = useState<PortfolioSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API route를 통해 데이터 fetch
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
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="text-sm text-muted">로딩 중...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-lg text-foreground">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            다시 시도
          </button>
        </div>
      </main>
    );
  }

  return <PortfolioClient sections={sections} />;
}
