"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration ---
const SCRAMBLE_SPEED = 10;
const CYCLES_PER_LETTER = 3;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

interface HighlightConfig {
  word: string;
  href?: string;
}

interface HyperTextProps {
  text: string;
  className?: string;
  highlightWords?: (string | HighlightConfig)[];
}

interface WordProps {
  children: string;
  isDimmed: boolean;
  isHighlightable: boolean;
  href?: string;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const Word = ({
  children,
  isDimmed,
  isHighlightable,
  href,
  onHoverStart,
  onHoverEnd,
}: WordProps) => {
  const [displayText, setDisplayText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const scramble = useCallback(() => {
    let pos = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = children
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) return char;
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          return randomChar;
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= children.length * CYCLES_PER_LETTER) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(children);
      }
    }, SCRAMBLE_SPEED);
  }, [children]);

  const stopScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(children);
  }, [children]);

  const handleMouseEnter = () => {
    if (isHighlightable) {
      setIsHovered(true);
      onHoverStart();
      scramble();
    }
  };

  const handleMouseLeave = () => {
    if (isHighlightable) {
      setIsHovered(false);
      onHoverEnd();
      stopScramble();
    }
  };

  const handleClick = () => {
    if (href) {
      window.location.href = href;
    }
  };

  return (
    <motion.span
      onClick={handleClick}
      className={`
        relative inline-block font-mono font-medium whitespace-nowrap isolate
        ${isHighlightable ? "cursor-pointer" : "cursor-default"}
      `}
      style={{ position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: isHovered ? 1.1 : 1,
        y: isHovered ? -4 : 0,
        opacity: isDimmed && !isHovered ? 0.3 : 1,
        filter: isDimmed && !isHovered ? "blur(2px)" : "blur(0px)",
        zIndex: isHovered ? 20 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute -inset-2 rounded-lg bg-black z-[-1]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              boxShadow:
                "0px 10px 25px -5px rgba(0, 0, 0, 0.3), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)",
            }}
          />
        )}
      </AnimatePresence>

      <span
        className={`relative z-10 px-1 transition-colors duration-200 ${
          isHovered
            ? "text-white"
            : isHighlightable
              ? "text-accent"
              : "text-foreground"
        }`}
      >
        {displayText}
      </span>

      <AnimatePresence>
        {isHovered && (
          <>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full z-20"
            />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-500 rounded-full z-20"
            />
          </>
        )}
      </AnimatePresence>
    </motion.span>
  );
};

export function HyperTextParagraph({
  text,
  className = "",
  highlightWords = [],
}: HyperTextProps) {
  const [isParagraphHovered, setIsParagraphHovered] = useState(false);

  const words = text.split(" ");

  const clean = (w: string) => w.toLowerCase().replace(/[^a-z0-9가-힣]/g, "");

  const getHighlightConfig = (word: string): { isHighlightable: boolean; href?: string } => {
    for (const hw of highlightWords) {
      if (typeof hw === "string") {
        if (clean(hw) === clean(word)) {
          return { isHighlightable: true };
        }
      } else {
        if (clean(hw.word) === clean(word)) {
          return { isHighlightable: true, href: hw.href };
        }
      }
    }
    return { isHighlightable: false };
  };

  return (
    <div className={`leading-relaxed tracking-wide overflow-visible ${className}`}>
      {words.map((word, i) => {
        const config = getHighlightConfig(word);

        return (
          <React.Fragment key={i}>
            <Word
              isDimmed={isParagraphHovered}
              isHighlightable={config.isHighlightable}
              href={config.href}
              onHoverStart={() => setIsParagraphHovered(true)}
              onHoverEnd={() => setIsParagraphHovered(false)}
            >
              {word}
            </Word>
            <span className="inline-block whitespace-pre"> </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}
