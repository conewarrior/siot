"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { SlideContainer } from "@/components/portfolio/slide-container";
import { SideNavigation } from "@/components/portfolio/side-navigation";
import { NavigationArrows } from "@/components/portfolio/navigation-arrows";
import { PageIndicator } from "@/components/portfolio/page-indicator";
import { KeyboardNavigation } from "@/components/portfolio/keyboard-navigation";
import { SlideTransition } from "@/components/portfolio/slide-transition";
import { SectionEntry } from "@/components/portfolio/section-entry";
import { StaggeredContent } from "@/components/portfolio/staggered-content";
import type { PortfolioSection, PortfolioSlide } from "@/lib/portfolio-mdx";

// 클라이언트에서 사용할 플랫 슬라이드 타입
interface FlatSlide {
  sectionIndex: number;
  sectionSlug: string;
  sectionTitle: string;
  sectionColor: string;
  sectionTextColor: string;
  slideIndex: number; // 섹션 내 슬라이드 인덱스
  slide: PortfolioSlide;
  content: string;
}

// 슬라이드 상태 타입
interface SlideState {
  currentSlide: number;
  direction: "left" | "right";
}

// 섹션 데이터를 props로 받아서 클라이언트에서 렌더링
interface PortfolioClientProps {
  sections: PortfolioSection[];
}

function PortfolioClient({ sections }: PortfolioClientProps) {
  // 모든 섹션의 슬라이드를 flat하게 펼치기
  const flatSlides = useMemo<FlatSlide[]>(() => {
    const slides: FlatSlide[] = [];

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
          content: section.content,
        });
      });
    });

    return slides;
  }, [sections]);

  // 슬라이드 상태 (현재 슬라이드와 방향을 함께 관리)
  const [slideState, setSlideState] = useState<SlideState>({
    currentSlide: 0,
    direction: "right",
  });

  // 섹션 진입 알림 상태
  const [sectionEntryState, setSectionEntryState] = useState<{
    isVisible: boolean;
    sectionName: string;
  }>({ isVisible: false, sectionName: "" });

  // 현재 슬라이드 정보
  const currentFlatSlide = flatSlides[slideState.currentSlide];
  const currentSectionIndex = currentFlatSlide?.sectionIndex ?? 0;

  // 섹션 진입 알림 타이머 ref
  const sectionEntryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 섹션 진입 알림 표시 함수
  const showSectionEntry = useCallback((sectionName: string) => {
    // 기존 타이머 정리
    if (sectionEntryTimerRef.current) {
      clearTimeout(sectionEntryTimerRef.current);
    }
    setSectionEntryState({ isVisible: true, sectionName });
    // 2초 후 알림 숨기기
    sectionEntryTimerRef.current = setTimeout(() => {
      setSectionEntryState((prev) => ({ ...prev, isVisible: false }));
    }, 2000);
  }, []);

  // 타이머 정리 effect
  useEffect(() => {
    return () => {
      if (sectionEntryTimerRef.current) {
        clearTimeout(sectionEntryTimerRef.current);
      }
    };
  }, []);

  // 슬라이드 이동 함수 - 섹션 변경 감지 포함
  const goToSlide = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= flatSlides.length) return;

    const currentSectionIdx = flatSlides[slideState.currentSlide]?.sectionIndex;
    const newSectionIdx = flatSlides[newIndex]?.sectionIndex;

    // 섹션이 변경되면 알림 표시
    if (currentSectionIdx !== undefined && newSectionIdx !== undefined && currentSectionIdx !== newSectionIdx) {
      showSectionEntry(flatSlides[newIndex].sectionTitle);
    }

    setSlideState({
      currentSlide: newIndex,
      direction: newIndex > slideState.currentSlide ? "right" : "left",
    });
  }, [flatSlides, slideState.currentSlide, showSectionEntry]);

  // 다음/이전 슬라이드 이동
  const goNext = useCallback(() => {
    goToSlide(slideState.currentSlide + 1);
  }, [goToSlide, slideState.currentSlide]);

  const goPrev = useCallback(() => {
    goToSlide(slideState.currentSlide - 1);
  }, [goToSlide, slideState.currentSlide]);

  // 네비게이션 상태
  const hasNext = slideState.currentSlide < flatSlides.length - 1;
  const hasPrev = slideState.currentSlide > 0;

  // 사이드 내비게이션용 섹션 목록
  const navSections = useMemo(() => {
    return sections.map((section) => ({
      id: section.slug,
      title: section.title,
      color: section.color,
      textColor: section.textColor,
    }));
  }, [sections]);

  // 섹션 인덱스로 이동 (해당 섹션의 첫 번째 슬라이드로)
  const goToSection = useCallback((sectionIndex: number) => {
    // 해당 섹션의 첫 번째 슬라이드 인덱스 찾기
    const slideIndex = flatSlides.findIndex(
      (s) => s.sectionIndex === sectionIndex
    );
    if (slideIndex !== -1) {
      goToSlide(slideIndex);
    }
  }, [flatSlides, goToSlide]);

  // 슬라이드가 없는 경우
  if (flatSlides.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted">포트폴리오 콘텐츠가 없습니다.</p>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* 키보드 내비게이션 */}
      <KeyboardNavigation onPrev={goPrev} onNext={goNext} />

      {/* 섹션 진입 알림 */}
      <SectionEntry
        sectionName={sectionEntryState.sectionName}
        isVisible={sectionEntryState.isVisible}
        currentIndex={currentSectionIndex + 1}
        totalCount={sections.length}
      />

      {/* 좌측 사이드 내비게이션 */}
      <SideNavigation
        sections={navSections}
        currentIndex={currentSectionIndex}
        onSelect={goToSection}
      />

      {/* 메인 슬라이드 영역 */}
      <div className="relative flex w-full max-w-5xl items-center justify-center px-4 md:px-20">
        <SlideContainer>
          <SlideTransition
            direction={slideState.direction}
            slideKey={slideState.currentSlide}
          >
            <div className="flex h-full w-full flex-col items-center justify-center p-8 md:p-12">
              <StaggeredContent
                className="items-center text-center"
                delay={0.1}
                staggerDelay={0.08}
              >
                {/* 슬라이드 타입 배지 */}
                <span
                  className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: currentFlatSlide.sectionColor,
                    color: currentFlatSlide.sectionTextColor,
                  }}
                >
                  {currentFlatSlide.slide.type.toUpperCase()}
                </span>

                {/* 슬라이드 제목 */}
                <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                  {currentFlatSlide.slide.title}
                </h1>

                {/* 섹션 제목 (cover가 아닐 때만) */}
                {currentFlatSlide.slide.type !== "cover" && (
                  <p className="text-lg text-muted">
                    {currentFlatSlide.sectionTitle}
                  </p>
                )}

                {/* 섹션 설명 (cover 슬라이드일 때만) */}
                {currentFlatSlide.slide.type === "cover" && currentFlatSlide.slideIndex === 0 && (
                  <p className="mt-4 max-w-md text-sm text-muted-foreground">
                    {sections[currentFlatSlide.sectionIndex]?.title}
                  </p>
                )}
              </StaggeredContent>
            </div>
          </SlideTransition>
        </SlideContainer>
      </div>

      {/* 좌우 화살표 내비게이션 */}
      <NavigationArrows
        onPrev={goPrev}
        onNext={goNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />

      {/* 페이지 인디케이터 */}
      <PageIndicator
        current={slideState.currentSlide + 1}
        total={flatSlides.length}
        sectionName={currentFlatSlide.sectionTitle}
      />
    </main>
  );
}

// 서버에서 데이터를 가져와서 클라이언트 컴포넌트로 전달
// Next.js App Router에서는 page.tsx가 기본적으로 서버 컴포넌트지만,
// "use client"를 사용하면 클라이언트 컴포넌트가 됨
// 따라서 데이터 fetching을 위한 wrapper가 필요

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
