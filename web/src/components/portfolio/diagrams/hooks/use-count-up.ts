"use client";

import { useEffect, useState } from "react";

/**
 * 숫자 카운트업 애니메이션 훅
 * @param target - 목표 숫자
 * @param duration - 애니메이션 지속 시간 (ms)
 * @param start - 애니메이션 시작 여부
 * @param decimals - 소수점 자릿수
 */
export function useCountUp(
  target: number,
  duration: number = 1500,
  start: boolean = false,
  decimals: number = 0
): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutExpo 이징 함수
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = startValue + (target - startValue) * eased;

      setCount(Number(currentValue.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, start, decimals]);

  return count;
}
