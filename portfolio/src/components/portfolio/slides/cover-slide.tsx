import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Building2, Calendar, User } from "lucide-react";

interface MetaInfo {
  company?: string;
  period?: string;
  role?: string;
}

interface ProjectPreview {
  title: string;
  highlight: string;
  color: string;
}

interface CoverSlideProps {
  children?: ReactNode;
  className?: string;
  /** 프로젝트명 */
  name?: string;
  /** 서브타이틀 */
  title?: string;
  /** 프로젝트 설명 (한 줄 개요) */
  description?: string;
  /** 메타 정보 (회사, 기간, 역할) */
  meta?: MetaInfo;
  /** 섹션 테마 색상 */
  accentColor?: string;
  /** 인트로/소개 텍스트 (여러 줄 가능) */
  intro?: string[];
  /** 프로젝트 미리보기 목록 */
  projects?: ProjectPreview[];
}

/**
 * 커버 슬라이드 컴포넌트
 * 프로젝트 표지. 큰 제목 + 간단한 메타 정보.
 */
export function CoverSlide({
  children,
  className,
  name,
  title,
  description,
  meta,
  accentColor = "#F97316",
  intro,
  projects,
}: CoverSlideProps) {
  const hasMeta = meta && (meta.company || meta.period || meta.role);
  const hasIntro = intro && intro.length > 0;
  const hasProjects = projects && projects.length > 0;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 md:gap-6",
        "w-full h-full p-4 md:p-12",
        "text-center",
        className
      )}
    >
      {/* 메인 타이틀 */}
      {name && (
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
          {name}
        </h1>
      )}

      {/* 서브타이틀 */}
      {title && (
        <p className="text-base md:text-xl text-muted max-w-2xl px-2">
          {title}
        </p>
      )}

      {/* 프로젝트 설명 (개요) */}
      {description && (
        <p className="mt-2 md:mt-4 text-sm md:text-base text-foreground/80 max-w-2xl px-4 leading-relaxed">
          {description}
        </p>
      )}

      {/* 인트로 텍스트 */}
      {hasIntro && (
        <div className="mt-2 md:mt-4 space-y-1 max-w-xl px-2">
          {intro.map((line, index) => (
            <p key={index} className="text-sm md:text-base text-muted leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      )}

      {/* 프로젝트 미리보기 */}
      {hasProjects && (
        <div className="mt-4 md:mt-8 grid grid-cols-2 gap-2 md:gap-3 w-full max-w-3xl px-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-1 md:gap-2 p-3 md:p-4 rounded-xl bg-secondary/30 border border-border/30"
            >
              <div
                className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              <span className="text-xs md:text-sm font-medium text-foreground">
                {project.title}
              </span>
              <span
                className="text-[10px] md:text-xs font-semibold"
                style={{ color: project.color }}
              >
                {project.highlight}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 메타 정보 카드 */}
      {hasMeta && (
        <div className="mt-4 md:mt-8 flex flex-wrap justify-center gap-2 md:gap-4 px-2">
          {meta.company && (
            <div
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-secondary/50 border border-border/50"
            >
              <Building2 className="w-3 h-3 md:w-4 md:h-4" style={{ color: accentColor }} />
              <span className="text-xs md:text-sm font-medium text-foreground">{meta.company}</span>
            </div>
          )}
          {meta.period && (
            <div
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-secondary/50 border border-border/50"
            >
              <Calendar className="w-3 h-3 md:w-4 md:h-4" style={{ color: accentColor }} />
              <span className="text-xs md:text-sm font-medium text-foreground">{meta.period}</span>
            </div>
          )}
          {meta.role && (
            <div
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-secondary/50 border border-border/50"
            >
              <User className="w-3 h-3 md:w-4 md:h-4" style={{ color: accentColor }} />
              <span className="text-xs md:text-sm font-medium text-foreground">{meta.role}</span>
            </div>
          )}
        </div>
      )}

      {/* children은 추가 콘텐츠로 렌더링 */}
      {children && (
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {children}
        </div>
      )}
    </div>
  );
}

export type { CoverSlideProps, MetaInfo, ProjectPreview };
