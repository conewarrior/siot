import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { H1, Body, Caption } from "@/components/portfolio/typography";

interface MetaInfo {
  company?: string;
  period?: string;
  role?: string;
}

interface Outcome {
  label: string;
  value: string;
  change?: string;
}

/** @deprecated projects 대신 outcomes 사용 권장 */
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
  /** 서브타이틀 (역할/카테고리) */
  title?: string;
  /** 프로젝트 설명 (한 줄 개요) */
  description?: string;
  /** 메타 정보 (회사, 기간, 역할) */
  meta?: MetaInfo;
  /** 섹션 테마 색상 */
  accentColor?: string;
  /** 인트로/소개 텍스트 (여러 줄 가능) */
  intro?: string[];
  /** 핵심 성과 수치 */
  outcomes?: Outcome[];
  /** @deprecated outcomes 사용 권장 - 호환성을 위해 유지 */
  projects?: ProjectPreview[];
}

/**
 * 커버 슬라이드 컴포넌트
 * 프로젝트 표지. 좌측 정렬 레이아웃 + 핵심 성과 수치.
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
  outcomes,
  projects,
}: CoverSlideProps) {
  const hasMeta = meta && (meta.company || meta.period);
  const hasIntro = intro && intro.length > 0;
  const hasOutcomes = outcomes && outcomes.length > 0;
  // projects를 outcomes 형식으로 변환 (호환성)
  const hasProjects = !hasOutcomes && projects && projects.length > 0;

  // 메타 정보를 구분자로 연결
  const metaText = [meta?.company, meta?.period].filter(Boolean).join(" · ");

  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-4 md:gap-6",
        "w-full h-full p-4 md:p-12",
        "text-left",
        className
      )}
    >
      {/* 상단 메타 정보 (플랫 텍스트) */}
      {hasMeta && (
        <Caption className="text-muted-foreground">{metaText}</Caption>
      )}

      {/* 메인 타이틀 */}
      {name && (
        <H1 className="text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
          {name}
        </H1>
      )}

      {/* 역할/카테고리 */}
      {title && (
        <Caption className="text-muted">{title}</Caption>
      )}

      {/* 프로젝트 설명 (개요) */}
      {description && (
        <Body className="mt-2 md:mt-4 max-w-2xl leading-relaxed">
          {description}
        </Body>
      )}

      {/* 인트로 텍스트 */}
      {hasIntro && (
        <div className="mt-2 md:mt-4 space-y-1 max-w-xl">
          {intro.map((line, index) => (
            <Body key={index} className="text-muted leading-relaxed">
              {line}
            </Body>
          ))}
        </div>
      )}

      {/* 핵심 성과 수치 */}
      {hasOutcomes && (
        <div className="mt-6 md:mt-10 flex flex-wrap gap-8 md:gap-12">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex flex-col gap-1">
              <span
                className="text-3xl md:text-4xl font-bold"
                style={{ color: accentColor }}
              >
                {outcome.value}
              </span>
              <Caption className="text-muted">{outcome.label}</Caption>
              {outcome.change && (
                <span className="text-xs text-muted-foreground">
                  {outcome.change}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 프로젝트 미리보기 (deprecated - outcomes로 마이그레이션 권장) */}
      {hasProjects && (
        <div className="mt-6 md:mt-10 flex flex-wrap gap-8 md:gap-12">
          {projects.map((project, index) => (
            <div key={index} className="flex flex-col gap-1">
              <span
                className="text-3xl md:text-4xl font-bold"
                style={{ color: project.color }}
              >
                {project.highlight}
              </span>
              <Caption className="text-muted">{project.title}</Caption>
            </div>
          ))}
        </div>
      )}

      {/* children은 추가 콘텐츠로 렌더링 */}
      {children && (
        <div className="mt-4 flex flex-wrap gap-4">
          {children}
        </div>
      )}
    </div>
  );
}

export type { CoverSlideProps, MetaInfo, Outcome, ProjectPreview };
