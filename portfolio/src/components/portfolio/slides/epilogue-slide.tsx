import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Code, Palette, BarChart3, Figma, Mail, Github, Linkedin, ExternalLink } from "lucide-react";

interface Skill {
  icon: "code" | "palette" | "chart" | "figma";
  title: string;
  description: string;
}

interface ContactLink {
  type: "email" | "github" | "linkedin" | "other";
  label: string;
  href: string;
}

interface EpilogueSlideProps {
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
  /** 연락처 링크 목록 */
  links?: ContactLink[];
  /** 추가 메시지 */
  message?: string;
  /** 테마 색상 */
  accentColor?: string;
}

const skillIconMap = {
  code: Code,
  palette: Palette,
  chart: BarChart3,
  figma: Figma,
};

const contactIconMap = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  other: ExternalLink,
};

/**
 * 에필로그 슬라이드 컴포넌트
 * Profile + Contact 통합 - 포트폴리오 마무리용
 */
export function EpilogueSlide({
  children,
  className,
  name,
  role,
  skills,
  philosophy,
  links,
  message,
  accentColor = "#FACC15",
}: EpilogueSlideProps) {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16",
        "w-full h-full p-8 md:p-12",
        className
      )}
    >
      {/* 좌측: 프로필 정보 */}
      <div className="flex flex-col items-center lg:items-start gap-6 max-w-md">
        {/* 이름 & 직함 */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
            {name}
          </h2>
          <p className="text-base md:text-lg text-muted">{role}</p>
        </div>

        {/* 주요 역량 */}
        {skills && skills.length > 0 && (
          <div className="grid grid-cols-2 gap-3 w-full">
            {skills.map((skill, index) => {
              const IconComponent = skillIconMap[skill.icon];
              return (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 rounded-lg bg-secondary/30 border border-border/30"
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: `${accentColor}20` }}
                  >
                    <IconComponent
                      className="w-4 h-4"
                      style={{ color: accentColor }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-foreground leading-tight">
                      {skill.title}
                    </h3>
                    <p className="text-[10px] text-muted leading-snug mt-0.5">
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
          <div className="space-y-1.5 text-center lg:text-left">
            {philosophy.map((line, index) => (
              <p
                key={index}
                className="text-xs text-muted leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* 구분선 (데스크톱) */}
      <div className="hidden lg:block w-px h-48 bg-border/50" />

      {/* 우측: 연락처 */}
      <div className="flex flex-col items-center lg:items-start gap-4">
        <h3
          className="text-2xl md:text-3xl font-bold tracking-tight"
          style={{ color: accentColor }}
        >
          Thank You
        </h3>
        <p className="text-sm text-muted text-center lg:text-left max-w-xs">
          새로운 프로젝트, 협업 제안, 또는 단순한 대화도 환영합니다.
        </p>

        {/* 연락처 링크 */}
        {links && links.length > 0 && (
          <div className="flex flex-col gap-2 w-full max-w-xs">
            {links.map((link, index) => {
              const IconComponent = contactIconMap[link.type];
              return (
                <a
                  key={index}
                  href={link.href}
                  target={link.type !== "email" ? "_blank" : undefined}
                  rel={link.type !== "email" ? "noopener noreferrer" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg",
                    "bg-secondary/50 border border-border/50",
                    "hover:bg-secondary/80 hover:border-border transition-colors",
                    "group"
                  )}
                >
                  <IconComponent
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: accentColor }}
                  />
                  <span className="text-sm font-medium text-foreground flex-1 text-left truncate">
                    {link.label}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              );
            })}
          </div>
        )}

        {/* 추가 메시지 */}
        {message && (
          <p className="text-[10px] text-muted/70 italic mt-2">
            {message}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

export type { EpilogueSlideProps, Skill, ContactLink };
