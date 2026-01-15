import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Code, Palette, BarChart3, Figma } from "lucide-react";

interface Skill {
  icon: "code" | "palette" | "chart" | "figma";
  title: string;
  description: string;
}

interface ProfileSlideProps {
  children?: ReactNode;
  className?: string;
  /** 이름 */
  name: string;
  /** 직함 */
  role: string;
  /** 주요 역량 목록 */
  skills?: Skill[];
  /** 철학/한 줄 소개 */
  philosophy?: string[];
  /** 테마 색상 */
  accentColor?: string;
}

const iconMap = {
  code: Code,
  palette: Palette,
  chart: BarChart3,
  figma: Figma,
};

/**
 * 프로필 슬라이드 컴포넌트
 * About 페이지용 - 이름, 역할, 역량, 철학 표시
 */
export function ProfileSlide({
  children,
  className,
  name,
  role,
  skills,
  philosophy,
  accentColor = "#FACC15",
}: ProfileSlideProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-8",
        "w-full h-full p-12",
        "text-center",
        className
      )}
    >
      {/* 이름 & 직함 */}
      <div className="space-y-2">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {name}
        </h2>
        <p className="text-lg md:text-xl text-muted">{role}</p>
      </div>

      {/* 주요 역량 */}
      {skills && skills.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon];
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 border border-border/30 text-left"
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <IconComponent
                    className="w-5 h-5"
                    style={{ color: accentColor }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {skill.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 철학 */}
      {philosophy && philosophy.length > 0 && (
        <div className="max-w-xl space-y-2 mt-4">
          {philosophy.map((line, index) => (
            <p
              key={index}
              className="text-sm text-muted leading-relaxed"
              style={{ borderLeftColor: accentColor }}
            >
              {line}
            </p>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}

export type { ProfileSlideProps, Skill };
