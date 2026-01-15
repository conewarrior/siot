import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { Grid } from "@/components/portfolio/grid";
import { H2, Body, Caption } from "@/components/portfolio/typography";

interface Skill {
  icon?: "code" | "palette" | "chart" | "figma";
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

const contactIconMap = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  other: ExternalLink,
};

/**
 * 에필로그 슬라이드 컴포넌트
 * Profile + Contact 통합 - 포트폴리오 마무리용
 * 5-7 그리드 레이아웃, 스킬/연락처 텍스트 기반
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
        "flex items-center justify-center w-full h-full p-8 md:p-12",
        className
      )}
    >
      <Grid cols="5-7" align="center" gap="lg" className="w-full max-w-5xl">
        {/* 좌측 영역 (5컬럼) - 프로필 정보 */}
        <div className="flex flex-col">
          {/* ABOUT 라벨 */}
          <span
            className="text-sm font-medium uppercase tracking-widest mb-4"
            style={{ color: accentColor }}
          >
            ABOUT
          </span>

          {/* 이름 & 직함 */}
          <H2>{name}</H2>
          <Caption className="mt-1">{role}</Caption>

          {/* 철학/소개문 */}
          {philosophy && philosophy.length > 0 && (
            <div className="mt-4 space-y-1.5">
              {philosophy.map((line, index) => (
                <Body key={index} className="text-muted">
                  {line}
                </Body>
              ))}
            </div>
          )}

          {/* 구분선 */}
          <hr className="my-6 border-border" />

          {/* 연락처 (인라인 링크) */}
          {links && links.length > 0 && (
            <div className="flex items-center gap-4 flex-wrap">
              {links.map((link) => {
                const IconComponent = contactIconMap[link.type];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.type !== "email" ? "_blank" : undefined}
                    rel={link.type !== "email" ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-muted hover:text-foreground transition-colors"
                    style={{ "--hover-color": accentColor } as React.CSSProperties}
                  >
                    <IconComponent className="w-4 h-4" />
                    <Caption>{link.label}</Caption>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* 우측 영역 (7컬럼) - 스킬 & Thank You */}
        <div className="flex flex-col">
          {/* 스킬 (2컬럼 텍스트 리스트) */}
          {skills && skills.length > 0 && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {skills.map((skill) => (
                <div key={skill.title} className="flex items-start gap-2">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div>
                    <Body className="font-medium">{skill.title}</Body>
                    <Caption>{skill.description}</Caption>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 구분선 */}
          <hr className="my-6 border-border" />

          {/* Thank You 메시지 */}
          <h2
            className="text-2xl font-semibold leading-snug"
            style={{ color: accentColor }}
          >
            Thank You
          </h2>
          <Body className="mt-2 text-muted">
            {message || "새로운 프로젝트, 협업 제안, 또는 단순한 대화도 환영합니다."}
          </Body>
        </div>
      </Grid>

      {children}
    </div>
  );
}

export type { EpilogueSlideProps, Skill, ContactLink };
