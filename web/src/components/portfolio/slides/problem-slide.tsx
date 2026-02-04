import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Grid } from "@/components/portfolio/grid";
import { Body, Caption } from "@/components/portfolio/typography";

interface ProblemSlideProps {
  children?: ReactNode;
  className?: string;
  /** 슬라이드 제목 (기본: "PROBLEM") */
  heading?: string;
  /** 문제 배경 컨텍스트 (불릿 리스트) */
  context?: string[];
}

/**
 * 숫자 강조 처리 헬퍼
 * 텍스트 내 숫자(정수, 소수, 백분율, 시간 등)에 강조 스타일 적용
 */
function highlightNumbers(text: string): ReactNode {
  // 숫자 패턴: 정수, 소수, 백분율, 시간(00:00), 단위 포함
  const numberPattern = /(\d+(?:\.\d+)?(?:%|시간|분|초|개|건|명)?|\d+:\d+)/g;
  const parts = text.split(numberPattern);

  return parts.map((part, index) => {
    if (numberPattern.test(part)) {
      // Reset lastIndex for global regex
      numberPattern.lastIndex = 0;
      return (
        <span key={index} className="font-semibold text-accent">
          {part}
        </span>
      );
    }
    return part;
  });
}

/**
 * 문제 정의 슬라이드 컴포넌트
 * 6-6 그리드 레이아웃으로 배경 컨텍스트와 다이어그램/비즈니스 임팩트 분리
 */
export function ProblemSlide({
  children,
  className,
  heading = "PROBLEM",
  context,
}: ProblemSlideProps) {
  const hasContext = context && context.length > 0;

  return (
    <div
      className={cn(
        "w-full h-full p-6 md:p-12",
        className
      )}
    >
      <Grid cols="6-6" align="start" gap="lg" className="h-full">
        {/* 좌측 영역: 라벨 + 배경 컨텍스트 */}
        <div className="flex flex-col justify-center h-full">
          <Caption className="text-accent uppercase tracking-widest mb-4">
            {heading}
          </Caption>

          {/* 문제 배경 컨텍스트 - 불릿 리스트 */}
          {hasContext && (
            <ul className="space-y-3">
              {context.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <Body className="text-foreground/80">
                    {highlightNumbers(item)}
                  </Body>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 우측 영역: children (다이어그램/비즈니스 임팩트) */}
        <div className="min-h-0 flex items-center justify-center h-full">
          {children && (
            <div className="w-full [&_img]:object-contain">
              {children}
            </div>
          )}
        </div>
      </Grid>
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
