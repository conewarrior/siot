"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ScreenshotItem {
  src: string;
  alt: string;
  caption?: string;
}

interface ScreenshotGalleryProps {
  images: ScreenshotItem[];
  layout?: "single" | "grid" | "side-by-side";
  className?: string;
}

/**
 * 실제 스크린샷/이미지를 표시하는 갤러리 컴포넌트
 * 이미지 비율을 유지하면서 슬라이드 내에 맞춤
 */
export function ScreenshotGallery({
  images,
  layout = "single",
  className,
}: ScreenshotGalleryProps) {
  if (images.length === 0) return null;

  const containerClass = cn(
    "w-full flex items-center justify-center",
    layout === "grid" && "grid grid-cols-2 gap-4",
    layout === "side-by-side" && "flex flex-row gap-4",
    className
  );

  if (layout === "single" && images.length === 1) {
    return (
      <div className={containerClass}>
        <figure className="flex flex-col items-center">
          <div className="relative rounded-lg overflow-hidden border border-border/50 shadow-lg bg-secondary/20">
            <Image
              src={images[0].src}
              alt={images[0].alt}
              width={800}
              height={450}
              className="w-auto h-auto max-w-full max-h-[160px] md:max-h-[200px] object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {images[0].caption && (
            <figcaption className="mt-2 text-center text-xs text-muted">
              {images[0].caption}
            </figcaption>
          )}
        </figure>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {images.map((image, index) => (
        <figure key={index} className="flex flex-col items-center flex-1 min-w-0">
          <div className="relative rounded-lg overflow-hidden border border-border/50 shadow-lg bg-secondary/20">
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={300}
              className="w-auto h-auto max-w-full max-h-[180px] md:max-h-[240px] object-contain"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          {image.caption && (
            <figcaption className="mt-2 text-center text-xs text-muted">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

/**
 * Before/After 비교 이미지 컴포넌트
 */
interface BeforeAfterProps {
  before: ScreenshotItem;
  after: ScreenshotItem;
  className?: string;
}

export function BeforeAfterComparison({
  before,
  after,
  className,
}: BeforeAfterProps) {
  return (
    <div className={cn("w-full flex flex-col md:flex-row gap-4 items-center justify-center", className)}>
      <div className="flex flex-col items-center">
        <span className="text-xs font-medium text-muted uppercase tracking-wider mb-2 text-center">
          Before
        </span>
        <figure className="flex flex-col items-center">
          <div className="relative rounded-lg overflow-hidden border border-border/50 shadow-lg bg-secondary/20">
            <Image
              src={before.src}
              alt={before.alt}
              width={400}
              height={300}
              className="w-auto h-auto max-w-full max-h-[160px] md:max-h-[220px] object-contain"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          {before.caption && (
            <figcaption className="mt-2 text-center text-xs text-muted">
              {before.caption}
            </figcaption>
          )}
        </figure>
      </div>

      <div className="flex items-center justify-center px-2">
        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
          <span className="text-accent">→</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-xs font-medium text-accent uppercase tracking-wider mb-2 text-center">
          After
        </span>
        <figure className="flex flex-col items-center">
          <div className="relative rounded-lg overflow-hidden border-2 border-accent/30 shadow-lg bg-secondary/20">
            <Image
              src={after.src}
              alt={after.alt}
              width={400}
              height={300}
              className="w-auto h-auto max-w-full max-h-[160px] md:max-h-[220px] object-contain"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          {after.caption && (
            <figcaption className="mt-2 text-center text-xs text-muted">
              {after.caption}
            </figcaption>
          )}
        </figure>
      </div>
    </div>
  );
}

export type { ScreenshotItem, ScreenshotGalleryProps, BeforeAfterProps };
