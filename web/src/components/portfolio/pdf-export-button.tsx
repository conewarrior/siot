"use client";

import { useCallback } from "react";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface PDFExportButtonProps {
  className?: string;
}

/**
 * PDF 내보내기 버튼 컴포넌트
 * 브라우저의 인쇄 기능을 활용하여 PDF로 저장
 */
export function PDFExportButton({ className }: PDFExportButtonProps) {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <button
      onClick={handlePrint}
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-3 py-1.5",
        "bg-white/20 hover:bg-white/30",
        "text-white text-sm font-medium",
        "transition-colors duration-200",
        "print:hidden",
        className
      )}
      aria-label="PDF로 저장"
    >
      <Download className="h-3.5 w-3.5" />
      <span>PDF 저장</span>
    </button>
  );
}
