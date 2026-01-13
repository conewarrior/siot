"use client"

import { useCallback } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface PDFDownloadProps {
  className?: string
}

/**
 * PDF 다운로드 버튼 컴포넌트
 * 브라우저의 인쇄 기능을 활용하여 PDF로 저장
 */
function PDFDownload({ className }: PDFDownloadProps) {
  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <motion.button
      onClick={handlePrint}
      className={cn(
        "fixed right-4 top-4 z-50 md:right-8 md:top-8",
        "flex items-center gap-2 rounded-full px-4 py-2",
        "bg-background/80 backdrop-blur-sm border border-border",
        "text-foreground shadow-lg",
        "transition-colors duration-200",
        "hover:bg-secondary hover:border-foreground/20",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "print:hidden",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
      aria-label="PDF로 다운로드"
    >
      <Download className="h-4 w-4" />
      <span className="text-sm font-medium">PDF 저장</span>
    </motion.button>
  )
}

export { PDFDownload }
export type { PDFDownloadProps }
