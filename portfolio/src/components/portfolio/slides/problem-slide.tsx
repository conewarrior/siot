import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProblemSlideProps {
  children?: ReactNode;
  className?: string;
  /** 슬라이드 제목 */
  heading?: string;
  /** 문제 배경 컨텍스트 (불릿 리스트) */
  context?: string[];
}

/**
 * 문제 정의 슬라이드 컴포넌트
 * 비즈니스 임팩트를 숫자 강조형으로 보여주는 슬라이드.
 */
export function ProblemSlide({
  children,
  className,
  heading,
  context,
}: ProblemSlideProps) {
  const hasContext = context && context.length > 0;

  return (
    <div
      className={cn(
        "flex flex-col justify-center",
        "w-full h-full p-6 md:p-12",
        className
      )}
    >
      {heading && (
        <h2 className="text-sm md:text-base font-medium text-accent uppercase tracking-widest mb-4 md:mb-6">
          {heading}
        </h2>
      )}

      {/* 문제 배경 컨텍스트 */}
      {hasContext && (
        <ul className="mb-6 md:mb-8 space-y-2 max-w-2xl">
          {context.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm md:text-base text-foreground/80">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* children: MetricCard 등 구조화된 컴포넌트가 들어옴 */}
      {children && (
        <div className="flex-1 flex items-center min-h-0">
          <div className="w-full">{children}</div>
        </div>
      )}
    </div>
  );
}

/**
 * 메트릭 카드 - 숫자를 크게 강조
 */
interface MetricCardProps {
  label: string;
  value: string;
  description?: string;
  accent?: boolean;
}

export function MetricCard({ label, value, description, accent }: MetricCardProps) {
  return (
    <div className="p-6 rounded-xl bg-secondary/50">
      <p className="text-sm text-muted uppercase tracking-wide mb-2">{label}</p>
      <p className={cn(
        "text-4xl md:text-5xl font-bold",
        accent ? "text-accent" : "text-foreground"
      )}>
        {value}
      </p>
      {description && (
        <p className="text-sm text-muted mt-2">{description}</p>
      )}
    </div>
  );
}

/**
 * 메트릭 그리드
 */
interface MetricGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function MetricGrid({ children, columns = 3 }: MetricGridProps) {
  return (
    <div className={cn(
      "grid gap-4",
      columns === 2 && "grid-cols-1 md:grid-cols-2",
      columns === 3 && "grid-cols-1 md:grid-cols-3",
      columns === 4 && "grid-cols-2 md:grid-cols-4"
    )}>
      {children}
    </div>
  );
}

export type { ProblemSlideProps, MetricCardProps, MetricGridProps };
