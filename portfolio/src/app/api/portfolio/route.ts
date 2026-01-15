import { NextResponse } from "next/server";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { getPortfolioSections } from "@/lib/portfolio-mdx";

export async function GET() {
  try {
    const sections = await getPortfolioSections();

    // 각 슬라이드의 MDX 콘텐츠를 serialize
    const sectionsWithSerializedContent = await Promise.all(
      sections.map(async (section) => ({
        ...section,
        slides: await Promise.all(
          section.slides.map(async (slide) => ({
            ...slide,
            serializedContent: slide.content
              ? await serialize(slide.content, {
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                })
              : null,
          }))
        ),
      }))
    );

    return NextResponse.json({ sections: sectionsWithSerializedContent });
  } catch (error) {
    console.error("Failed to get portfolio sections:", error);
    return NextResponse.json(
      { error: "Failed to load portfolio sections", sections: [] },
      { status: 500 }
    );
  }
}
