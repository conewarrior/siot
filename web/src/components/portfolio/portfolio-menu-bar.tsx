"use client";

import { PDFExportButton } from "./pdf-export-button";

interface PortfolioMenuBarProps {
  sectionName: string;
  sectionColor: string;
  currentSlideInSection: number;
  totalSlidesInSection: number;
}

export function PortfolioMenuBar({
  sectionName,
  sectionColor,
  currentSlideInSection,
  totalSlidesInSection,
}: PortfolioMenuBarProps) {
  return (
    <div
      className="flex items-center justify-between rounded-xl px-4 py-2 text-sm text-white print:hidden"
      style={{ backgroundColor: sectionColor }}
    >
      <span>
        You are now entering ( <strong>{sectionName}</strong> ) section
      </span>
      <div className="flex items-center gap-3">
        <PDFExportButton />
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-white" />
          <span>
            {String(currentSlideInSection).padStart(2, "0")} /{" "}
            {String(totalSlidesInSection).padStart(2, "0")}
          </span>
        </span>
      </div>
    </div>
  );
}
