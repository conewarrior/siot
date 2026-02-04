"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// 보라 계열 액센트 컬러
const VIOLET_ACCENT = "#7C3AED";

// 컬러 팔레트 정의 (Tailwind 스타일 10단계)
const COLOR_PALETTES = {
  gray: {
    name: "Gray",
    scales: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
  },
  blue: {
    name: "Blue",
    scales: {
      50: "#EFF6FF",
      100: "#DBEAFE",
      200: "#BFDBFE",
      300: "#93C5FD",
      400: "#60A5FA",
      500: "#3B82F6",
      600: "#2563EB",
      700: "#1D4ED8",
      800: "#1E40AF",
      900: "#1E3A8A",
    },
  },
  green: {
    name: "Green",
    scales: {
      50: "#F0FDF4",
      100: "#DCFCE7",
      200: "#BBF7D0",
      300: "#86EFAC",
      400: "#4ADE80",
      500: "#22C55E",
      600: "#16A34A",
      700: "#15803D",
      800: "#166534",
      900: "#14532D",
    },
  },
  red: {
    name: "Red",
    scales: {
      50: "#FEF2F2",
      100: "#FEE2E2",
      200: "#FECACA",
      300: "#FCA5A5",
      400: "#F87171",
      500: "#EF4444",
      600: "#DC2626",
      700: "#B91C1C",
      800: "#991B1B",
      900: "#7F1D1D",
    },
  },
  yellow: {
    name: "Yellow",
    scales: {
      50: "#FEFCE8",
      100: "#FEF9C3",
      200: "#FEF08A",
      300: "#FDE047",
      400: "#FACC15",
      500: "#EAB308",
      600: "#CA8A04",
      700: "#A16207",
      800: "#854D0E",
      900: "#713F12",
    },
  },
} as const;

const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

// 상대 휘도 계산 (WCAG 2.1)
function getLuminance(hex: string): number {
  const rgb = hex
    .replace("#", "")
    .match(/.{2}/g)!
    .map((c) => {
      const val = parseInt(c, 16) / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

// 명도대비율 계산
function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// WCAG 등급 판정
function getWCAGLevel(
  bgColor: string,
  textColor: string
): { level: "AAA" | "AA" | "Fail"; ratio: number } {
  const ratio = getContrastRatio(bgColor, textColor);
  if (ratio >= 7) return { level: "AAA", ratio };
  if (ratio >= 4.5) return { level: "AA", ratio };
  return { level: "Fail", ratio };
}

// 텍스트 색상 결정 (배경 명도 기준)
function getTextColor(bgHex: string): string {
  const luminance = getLuminance(bgHex);
  return luminance > 0.179 ? "#171717" : "#FAFAFA";
}

// 단일 컬러 셀
interface ColorCellProps {
  color: string;
  scale: number;
  paletteName: string;
  index: number;
  rowIndex: number;
}

function ColorCell({ color, scale, paletteName, index, rowIndex }: ColorCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const textColor = getTextColor(color);
  const wcagWhite = getWCAGLevel(color, "#FFFFFF");
  const wcagBlack = getWCAGLevel(color, "#000000");
  const bestWcag = wcagWhite.ratio > wcagBlack.ratio ? wcagWhite : wcagBlack;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: rowIndex * 0.08 + index * 0.02,
        ease: "easeOut",
      }}
      className={cn(
        "relative aspect-square cursor-pointer",
        "rounded-md overflow-hidden",
        "transition-all duration-200",
        "shadow-sm hover:shadow-md hover:z-10 hover:scale-110"
      )}
      style={{ backgroundColor: color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 호버 시 정보 표시 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center",
          "p-1 text-center"
        )}
        style={{ color: textColor }}
      >
        <span className="text-[8px] font-mono font-bold leading-tight">
          {color.toUpperCase()}
        </span>
        <span className="text-[7px] font-medium mt-0.5">
          {paletteName}-{scale}
        </span>
      </motion.div>

      {/* WCAG 등급 뱃지 */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0,
        }}
        className={cn(
          "absolute top-0.5 right-0.5 px-1 py-0.5 rounded text-[6px] font-bold",
          bestWcag.level === "AAA" && "bg-green-500 text-white",
          bestWcag.level === "AA" && "bg-yellow-500 text-black",
          bestWcag.level === "Fail" && "bg-red-500 text-white"
        )}
      >
        {bestWcag.level}
      </motion.div>
    </motion.div>
  );
}

// 팔레트 행 라벨
interface PaletteLabelProps {
  name: string;
  index: number;
}

function PaletteLabel({ name, index }: PaletteLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className={cn(
        "flex items-center justify-end pr-2",
        "text-xs font-semibold text-muted"
      )}
    >
      {name}
    </motion.div>
  );
}

// 스케일 라벨 (상단 헤더)
function ScaleHeader() {
  return (
    <div className="col-span-1" /> // 빈 셀 (좌측 상단)
  );
}

// 다크모드 비교 패널
function DarkModeComparison() {
  const sampleBg = {
    light: "#FFFFFF",
    dark: "#171717",
  };
  const sampleText = {
    light: "#171717",
    dark: "#FAFAFA",
  };
  const sampleAccent = {
    light: "#3B82F6",
    dark: "#60A5FA",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      className={cn(
        "mt-6 p-4 rounded-xl",
        "bg-gradient-to-r from-neutral-50 to-neutral-100",
        "border border-neutral-200"
      )}
    >
      <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: VIOLET_ACCENT }}
        />
        다크모드 대응 예시
      </h4>

      <div className="grid grid-cols-2 gap-4">
        {/* 라이트 모드 */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-medium text-muted uppercase tracking-wide">
            Light Mode
          </span>
          <div
            className="p-3 rounded-lg border"
            style={{
              backgroundColor: sampleBg.light,
              borderColor: "#E5E5E5",
            }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: sampleText.light }}
            >
              제목 텍스트
            </p>
            <p className="text-xs mt-1" style={{ color: "#737373" }}>
              보조 텍스트 (gray-500)
            </p>
            <button
              className="mt-2 px-3 py-1 rounded text-xs font-medium text-white"
              style={{ backgroundColor: sampleAccent.light }}
            >
              Blue-500
            </button>
          </div>
          <div className="flex items-center gap-2 text-[9px] text-muted">
            <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium">
              AA 4.5:1
            </span>
            <span>텍스트 대비율 충족</span>
          </div>
        </div>

        {/* 다크 모드 */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-medium text-muted uppercase tracking-wide">
            Dark Mode
          </span>
          <div
            className="p-3 rounded-lg border"
            style={{
              backgroundColor: sampleBg.dark,
              borderColor: "#404040",
            }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: sampleText.dark }}
            >
              제목 텍스트
            </p>
            <p className="text-xs mt-1" style={{ color: "#A3A3A3" }}>
              보조 텍스트 (gray-400)
            </p>
            <button
              className="mt-2 px-3 py-1 rounded text-xs font-medium text-black"
              style={{ backgroundColor: sampleAccent.dark }}
            >
              Blue-400
            </button>
          </div>
          <div className="flex items-center gap-2 text-[9px] text-muted">
            <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium">
              AAA 7:1+
            </span>
            <span>밝은 배경 대비 우수</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// WCAG 범례
function WCAGLegend() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.6 }}
      className="flex flex-wrap items-center justify-center gap-4 mt-4 text-[10px] text-muted"
    >
      <div className="flex items-center gap-1.5">
        <span className="px-1.5 py-0.5 bg-green-500 text-white rounded font-bold">
          AAA
        </span>
        <span>7:1+ 최고 수준</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="px-1.5 py-0.5 bg-yellow-500 text-black rounded font-bold">
          AA
        </span>
        <span>4.5:1+ 권장 수준</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="px-1.5 py-0.5 bg-red-500 text-white rounded font-bold">
          Fail
        </span>
        <span>4.5:1 미만</span>
      </div>
    </motion.div>
  );
}

interface ColorScaleProps {
  className?: string;
  showDarkModeComparison?: boolean;
}

/**
 * 디자인 시스템 컬러 스케일 시각화 컴포넌트
 *
 * - 5개 컬러 팔레트: Gray, Blue, Green, Red, Yellow
 * - 각 컬러 10단계 그라데이션 (50-900)
 * - WCAG 명도대비율 정보 (AAA/AA/Fail)
 * - 다크모드 대응 예시
 * - 진입 애니메이션 (stagger)
 */
export function ColorScale({
  className,
  showDarkModeComparison = true,
}: ColorScaleProps) {
  const palettes = Object.entries(COLOR_PALETTES);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={cn("w-full", className)}
    >
      {/* 타이틀 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-center mb-6"
      >
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
          컬러 스케일
        </h3>
        <p className="text-sm text-muted">
          접근성을 고려한 10단계 컬러 팔레트
        </p>
      </motion.div>

      {/* 메인 컨테이너 */}
      <div
        className={cn(
          "p-4 md:p-6 rounded-xl",
          "bg-white border border-neutral-200",
          "shadow-sm"
        )}
        style={{
          boxShadow: `0 4px 20px ${VIOLET_ACCENT}10`,
        }}
      >
        {/* 스케일 헤더 (상단 라벨) */}
        <div className="grid grid-cols-[60px_repeat(10,1fr)] gap-1 mb-2">
          <ScaleHeader />
          {SCALE_STEPS.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              className="text-center text-[10px] font-mono font-medium text-muted"
            >
              {step}
            </motion.div>
          ))}
        </div>

        {/* 컬러 그리드 (5행 x 10열) */}
        <div className="flex flex-col gap-1">
          {palettes.map(([key, palette], rowIndex) => (
            <div
              key={key}
              className="grid grid-cols-[60px_repeat(10,1fr)] gap-1"
            >
              <PaletteLabel name={palette.name} index={rowIndex} />
              {SCALE_STEPS.map((step, colIndex) => (
                <ColorCell
                  key={`${key}-${step}`}
                  color={palette.scales[step]}
                  scale={step}
                  paletteName={palette.name}
                  index={colIndex}
                  rowIndex={rowIndex}
                />
              ))}
            </div>
          ))}
        </div>

        {/* WCAG 범례 */}
        <WCAGLegend />

        {/* 다크모드 비교 */}
        {showDarkModeComparison && <DarkModeComparison />}
      </div>

      {/* 하단 설명 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        className="text-center text-xs text-muted mt-3"
      >
        각 셀에 마우스를 올리면 HEX 값과 WCAG 접근성 등급을 확인할 수 있습니다
      </motion.p>
    </motion.div>
  );
}

export default ColorScale;
