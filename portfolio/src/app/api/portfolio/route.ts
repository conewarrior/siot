import { NextResponse } from "next/server";
import { getPortfolioSections } from "@/lib/portfolio-mdx";

export async function GET() {
  try {
    const sections = await getPortfolioSections();
    return NextResponse.json({ sections });
  } catch (error) {
    console.error("Failed to get portfolio sections:", error);
    return NextResponse.json(
      { error: "Failed to load portfolio sections", sections: [] },
      { status: 500 }
    );
  }
}
