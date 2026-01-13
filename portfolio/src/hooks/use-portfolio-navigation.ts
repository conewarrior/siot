"use client";

import { useState, useCallback, useMemo } from "react";

export interface UsePortfolioNavigationOptions {
  totalSlides: number;
  initialSlide?: number;
}

export interface UsePortfolioNavigationReturn {
  currentSlide: number;
  goToSlide: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  progress: number;
}

export function usePortfolioNavigation({
  totalSlides,
  initialSlide = 0,
}: UsePortfolioNavigationOptions): UsePortfolioNavigationReturn {
  const [currentSlide, setCurrentSlide] = useState(() => {
    // 초기값 경계 처리
    if (initialSlide < 0) return 0;
    if (initialSlide >= totalSlides) return Math.max(0, totalSlides - 1);
    return initialSlide;
  });

  const goToSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSlides) return;
      setCurrentSlide(index);
    },
    [totalSlides]
  );

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev >= totalSlides - 1) return prev;
      return prev + 1;
    });
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  }, []);

  const hasNext = currentSlide < totalSlides - 1;
  const hasPrev = currentSlide > 0;

  const progress = useMemo(() => {
    if (totalSlides <= 1) return 1;
    return currentSlide / (totalSlides - 1);
  }, [currentSlide, totalSlides]);

  return {
    currentSlide,
    goToSlide,
    goNext,
    goPrev,
    hasNext,
    hasPrev,
    progress,
  };
}
