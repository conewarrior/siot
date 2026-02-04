import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface Insight {
  /** 인사이트 제목 */
  title: string;
  /** 인사이트 내용 */
  content: string;
}

interface TimelineItem {
  /** 항목 내용 */
  text: string;
}

interface ReflectionSlideProps {
  children?: ReactNode;
  className?: string;
  /** 슬라이드 제목 */
  heading?: string;
  /** 강조 인용구 */
  quote?: string;
  /** 인사이트/배운점 목록 (기존 방식) */
  insights?: Insight[];
  /** 잘한 점 목록 (타임라인 스타일) */
  strengths?: TimelineItem[];
  /** 개선할 점 목록 (타임라인 스타일) */
  improvements?: TimelineItem[];
  /** 섹션 테마 색상 */
  accentColor?: string;
}

/**
 * 회고 슬라이드 컴포넌트
 * 프로젝트에서 얻은 인사이트와 배운점을 정리하는 슬라이드. 인용구/강조 스타일.
 */
export function ReflectionSlide({
  children,
  className,
  heading,
  quote,
  insights,
  strengths,
  improvements,
  accentColor = "#F97316",
}: ReflectionSlideProps) {
  const hasTimeline = strengths && improvements;

  return (
    <div
      className={cn(
        "flex flex-col justify-center",
        "w-full p-12",
        className
      )}
    >
      {heading && (
        <h2 className="text-sm md:text-base font-medium text-accent uppercase tracking-widest mb-8">
          {heading}
        </h2>
      )}

      {/* 강조 인용구 */}
      {quote && (
        <blockquote className="relative mb-10">
          <span
            className="absolute -left-2 -top-4 text-6xl text-accent/20 font-serif"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium italic leading-snug pl-6 border-l-4 border-accent text-foreground">
            {quote}
          </p>
        </blockquote>
      )}

      {/* 타임라인 스타일 (잘한 점 / 개선할 점) */}
      {hasTimeline ? (
        <div className="relative flex gap-8 md:gap-16">
          {/* 중앙 세로선 */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{ backgroundColor: `${accentColor}30` }}
          />

          {/* 좌측: 잘한 점 */}
          <div className="flex-1 flex flex-col items-end pr-6 md:pr-10">
            <div
              className="flex items-center gap-2 mb-6"
              style={{ color: accentColor }}
            >
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-base font-semibold uppercase tracking-wide">
                잘한 점
              </h3>
            </div>
            <div className="space-y-4 w-full">
              {strengths.map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-end"
                >
                  <div className="bg-secondary/50 border border-border/50 rounded-lg p-4 max-w-sm text-right">
                    <p className="text-sm md:text-base text-foreground leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                  {/* 연결 점 */}
                  <div
                    className="absolute -right-[calc(50%-0.375rem)] w-3 h-3 rounded-full border-2 bg-background"
                    style={{ borderColor: accentColor }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 우측: 개선할 점 */}
          <div className="flex-1 flex flex-col items-start pl-6 md:pl-10">
            <div className="flex items-center gap-2 mb-6 text-muted">
              <AlertCircle className="w-5 h-5" />
              <h3 className="text-base font-semibold uppercase tracking-wide">
                개선할 점
              </h3>
            </div>
            <div className="space-y-4 w-full">
              {improvements.map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-start"
                >
                  {/* 연결 점 */}
                  <div
                    className="absolute -left-[calc(50%-0.375rem)] w-3 h-3 rounded-full border-2 bg-background border-muted"
                  />
                  <div className="bg-secondary/30 border border-border/30 rounded-lg p-4 max-w-sm">
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : children ? (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </div>
      ) : insights && insights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={cn(
                "p-6 rounded-lg",
                "bg-secondary/30 border border-border/50"
              )}
            >
              {/* 인사이트 제목 */}
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-foreground">
                <span className="text-accent">●</span>
                {insight.title}
              </h3>

              {/* 인사이트 내용 */}
              <p className="text-base text-muted leading-relaxed">
                {insight.content}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export type { ReflectionSlideProps, Insight, TimelineItem };
