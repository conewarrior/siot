"use client";

import { Children, type ReactNode, useState, useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggeredContentProps {
  children: ReactNode;
  delay?: number; // 시작 딜레이 (기본 0)
  staggerDelay?: number; // 각 요소 간 딜레이 (기본 0.1초)
  className?: string;
}

const containerVariants: Variants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 400,
    },
  },
};

// 애니메이션 완료 후 즉시 표시용 variants
const itemVariantsImmediate: Variants = {
  hidden: {
    opacity: 1,
    y: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

/**
 * 자식 요소들을 순차적으로 애니메이션하는 래퍼 컴포넌트
 * 뷰포트에 처음 진입할 때만 애니메이션이 실행되고, 이후에는 즉시 표시
 *
 * @example
 * <StaggeredContent delay={0.2}>
 *   <h1>제목</h1>
 *   <p>설명</p>
 *   <img src="..." />
 * </StaggeredContent>
 * // 제목 → 0.3초 후 설명 → 0.4초 후 이미지 순차 표시
 */
export function StaggeredContent({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className,
}: StaggeredContentProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const childArray = Children.toArray(children);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // 애니메이션 완료 후에는 즉시 표시
  const activeItemVariants = hasAnimated ? itemVariantsImmediate : itemVariants;

  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-col", className)}
      variants={{
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: {
            staggerChildren: hasAnimated ? 0 : staggerDelay,
            delayChildren: hasAnimated ? 0 : delay,
          },
        },
      }}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
    >
      {childArray.map((child, index) => (
        <motion.div key={index} variants={activeItemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
