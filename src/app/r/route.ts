import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const registryPath = path.join(
      process.cwd(),
      "public/registry/registry.json",
    );

    if (!fs.existsSync(registryPath)) {
      return NextResponse.json(
        {
          error: "Registry not found",
          message: 'Please run "npm run build:registry" first.',
        },
        { status: 404 },
      );
    }

    const content = fs.readFileSync(registryPath, "utf-8");
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
    console.error("Error loading registry:", error);
    return NextResponse.json(
      {
        error: "Failed to load registry",
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
