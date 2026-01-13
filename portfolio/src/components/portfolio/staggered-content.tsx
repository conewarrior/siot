"use client";

import { Children, type ReactNode } from "react";
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

/**
 * 자식 요소들을 순차적으로 애니메이션하는 래퍼 컴포넌트
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
  const childArray = Children.toArray(children);

  return (
    <motion.div
      className={cn("flex flex-col", className)}
      variants={{
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      {childArray.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
