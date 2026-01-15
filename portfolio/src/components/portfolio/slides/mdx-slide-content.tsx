"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  ColorScale,
  TokenStructure,
  SpecTemplate,
  ResultsDashboard,
} from "@/components/portfolio/diagrams/design-system";
import {
  ActionFlow,
  ShortcutUsageChart,
  SpeedMetrics,
  ToolbarComparison,
} from "@/components/portfolio/diagrams/labeling-tool";

const mdxComponents = {
  ColorScale,
  TokenStructure,
  SpecTemplate,
  ResultsDashboard,
  ActionFlow,
  ShortcutUsageChart,
  SpeedMetrics,
  ToolbarComparison,
};

interface MDXSlideContentProps {
  serializedContent: MDXRemoteSerializeResult | null;
  className?: string;
}

/**
 * MDX 콘텐츠를 슬라이드 내에서 렌더링하는 컴포넌트
 */
export function MDXSlideContent({
  serializedContent,
  className = "",
}: MDXSlideContentProps) {
  if (!serializedContent) {
    return null;
  }

  return (
    <div
      className={`prose prose-sm md:prose-base dark:prose-invert max-w-none
        prose-headings:font-semibold prose-headings:text-foreground
        prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mb-4
        prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mb-3 prose-h2:mt-0
        prose-h3:text-lg prose-h3:md:text-xl prose-h3:mb-2 prose-h3:text-muted
        prose-p:text-foreground/90 prose-p:leading-relaxed
        prose-li:text-foreground/90
        prose-strong:text-foreground prose-strong:font-semibold
        prose-table:text-sm
        prose-th:bg-secondary prose-th:px-3 prose-th:py-2
        prose-td:px-3 prose-td:py-2 prose-td:border-border
        ${className}`}
    >
      <MDXRemote {...serializedContent} components={mdxComponents} />
    </div>
  );
}
