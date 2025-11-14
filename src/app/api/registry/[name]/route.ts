import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  try {
    const { name } = await params;

    // Security: ensure name doesn't contain path traversal
    if (name.includes("..") || name.includes("/")) {
      return NextResponse.json(
        { error: "Invalid component name" },
        { status: 400 },
      );
    }

    const filePath = path.join(process.cwd(), `public/registry/${name}.tsx`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 },
      );
    }

    const content = fs.readFileSync(filePath, "utf-8");

    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error loading component:", error);
    return NextResponse.json(
      { error: "Failed to load component" },
      { status: 500 },
    );
  }
}
