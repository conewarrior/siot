import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Insight {
  /** 인사이트 제목 */
  title: string;
  /** 인사이트 내용 */
  content: string;
}

interface ReflectionSlideProps {
  children?: ReactNode;
  className?: string;
  /** 슬라이드 제목 */
  heading?: string;
  /** 강조 인용구 */
  quote?: string;
  /** 인사이트/배운점 목록 */
  insights?: Insight[];
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
}: ReflectionSlideProps) {
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

      {children ? (
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

export type { ReflectionSlideProps, Insight };
