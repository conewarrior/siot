"use client"

import * as React from "react"
import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  duration?: number
  delay?: number
  replay?: boolean
  className?: string
  textClassName?: string
  underlineClassName?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  underlineHeight?: string
  underlineOffset?: string
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  ({
    text,
    duration = 0.25,
    delay = 0.05,
    replay = true,
    className,
    textClassName,
    underlineClassName,
    as: Component = "h1",
    underlineHeight = "h-0.5",
    underlineOffset = "-bottom-1",
    ...props
  }, ref) => {
    const letters = Array.from(text)

    const container: Variants = {
      hidden: {
        opacity: 0
      },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: {
          staggerChildren: duration,
          delayChildren: i * delay
        }
      })
    }

    const child: Variants = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 400
        }
      },
      hidden: {
        opacity: 0,
        y: 15,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 400
        }
      }
    }

    const lineVariants: Variants = {
      hidden: {
        width: "0%",
        left: "50%"
      },
      visible: {
        width: "100%",
        left: "0%",
        transition: {
          delay: (letters.length - 1) * duration,
          duration: 0.3,
          ease: "easeOut"
        }
      }
    }

    return (
      <div
        ref={ref}
        className={cn("inline-flex flex-col", className)}
        {...props}
      >
        <div className="relative">
          <motion.div
            style={{ display: "flex", overflow: "hidden" }}
            variants={container}
            initial="hidden"
            animate={replay ? "visible" : "hidden"}
            className={cn("", textClassName)}
          >
            {letters.map((letter, index) => (
              <motion.span key={index} variants={child}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "absolute",
              underlineHeight,
              underlineOffset,
              "bg-accent",
              underlineClassName
            )}
          />
        </div>
      </div>
    )
  }
)
AnimatedText.displayName = "AnimatedText"

export { AnimatedText }
