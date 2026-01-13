"use client";

import { useEffect } from "react";

interface KeyboardNavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

/**
 * 키보드 네비게이션 컴포넌트
 * 좌/우 화살표 키로 슬라이드 이동
 * 입력 필드에 포커스가 있을 때는 동작하지 않음
 */
export function KeyboardNavigation({
  onPrev,
  onNext,
}: KeyboardNavigationProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 입력 필드나 편집 가능한 요소에 포커스가 있으면 무시
      const target = event.target as HTMLElement;
      const isEditable =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable;

      if (isEditable) {
        return;
      }

      if (event.key === "ArrowLeft") {
        onPrev();
      } else if (event.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onPrev, onNext]);

  return null;
}
