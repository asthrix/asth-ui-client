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

    // Remove .json extension if present
    const componentName = name.replace(/\.json$/, "");

    const filePath = path.join(
      process.cwd(),
      `public/registry/${componentName}.json`,
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          error: `Component "${componentName}" not found`,
          message: `The registry item was not found. Available at: /r/${componentName}.json`,
        },
        { status: 404 },
      );
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(content);

    return NextResponse.json(json, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Error loading component:", error);
    return NextResponse.json(
      {
        error: "Failed to load component",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
