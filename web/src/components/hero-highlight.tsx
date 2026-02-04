"use client";

import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const dotPattern = (color: string) => ({
    backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
    backgroundSize: "16px 16px",
  });

  return (
    <div
      className={cn(
        "relative min-h-screen flex flex-col bg-background w-full group",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-70 dark:opacity-0 transition duration-300"
        style={{
          ...dotPattern("rgb(212 212 212)"),
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              transparent 0%,
              black 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              transparent 0%,
              black 100%
            )
          `,
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-70 transition duration-300"
        style={{
          ...dotPattern("rgb(64 64 64)"),
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              transparent 0%,
              black 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              transparent 0%,
              black 100%
            )
          `,
        }}
      />

      <div className={cn("relative z-20 flex-1", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-orange-300 to-orange-400 dark:from-orange-400 dark:to-orange-500`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};

export const HoverHighlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      className={cn(
        `relative inline-block pb-0.5 px-1 rounded-md cursor-pointer`,
        className
      )}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.span
        className="absolute inset-0 bg-accent rounded-md origin-left"
        variants={{
          rest: {
            scaleX: 0,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            },
          },
          hover: {
            scaleX: 1.03,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 15,
            },
          },
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.span>
  );
};
