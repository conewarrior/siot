"use client"

import { cn } from "@/lib/utils"

interface PageIndicatorProps {
  progress: number // 0-1, 전체 진행률
  onDownloadPDF?: () => void
  className?: string
}

/**
 * 페이지 프로그레스 인디케이터 컴포넌트
 * 하단 고정 프로그레스 바 + PDF 다운로드 버튼
 *
 * @example
 * <PageIndicator progress={0.4} onDownloadPDF={() => handleDownload()} />
 */
function PageIndicator({
  progress,
  onDownloadPDF,
  className,
}: PageIndicatorProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-background/80 backdrop-blur-sm",
        className
      )}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`진행률 ${Math.round(progress * 100)}%`}
    >
      <div className="max-w-5xl mx-auto flex items-center gap-4">
        {/* 프로그레스 바 */}
        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        {/* PDF 다운로드 버튼 */}
        <button
          onClick={onDownloadPDF}
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          PDF 다운로드
        </button>
      </div>
    </div>
  )
}

export { PageIndicator }
export type { PageIndicatorProps }
