"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Loader2 } from "lucide-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// PDF.js worker 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFPageViewerProps {
  pdfUrl: string;
  pageNumber: number;
}

export default function PDFPageViewer({ pdfUrl, pageNumber }: PDFPageViewerProps) {
  const [loading, setLoading] = useState(true);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // 컨테이너 크기 측정
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleLoadSuccess = () => {
    setLoading(false);
  };

  // 16:9 비율에 맞게 너비 계산 (높이 기준)
  const pdfWidth = containerSize.height > 0
    ? Math.min(containerSize.width - 32, containerSize.height * (16 / 9))
    : undefined;

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center"
    >
      {loading && (
        <div className="absolute flex items-center gap-2 text-gray-400">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      <Document
        file={pdfUrl}
        loading={null}
        className="flex items-center justify-center"
      >
        <Page
          pageNumber={pageNumber}
          width={pdfWidth}
          onRenderSuccess={handleLoadSuccess}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          className="shadow-lg rounded-lg overflow-hidden"
        />
      </Document>
    </div>
  );
}
