import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/works - Get all works with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const theme = searchParams.get("theme");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      isPublished: true,
    };

    if (type) {
      where.type = type;
    }
    if (theme) {
      where.theme = theme;
    }
    if (featured === "true") {
      where.isFeatured = true;
    }

    const [works, total] = await Promise.all([
      db.work.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          type: true,
          excerpt: true,
          theme: true,
          readingTime: true,
          viewCount: true,
          likeCount: true,
          createdAt: true,
          publishedAt: true,
        },
      }),
      db.work.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: works,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching works:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch works" },
      { status: 500 }
    );
  }
}

// POST /api/works - Create a new work
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      type,
      excerpt,
      content,
      theme,
      tags,
      coverImage,
      readingTime,
      isPublished,
      isFeatured,
    } = body;

    // Check if slug already exists
    const existing = await db.work.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Slug already exists" },
        { status: 400 }
      );
    }

    const work = await db.work.create({
      data: {
        title,
        slug,
        type,
        excerpt,
        content,
        theme,
        tags: tags ? JSON.stringify(tags) : null,
        coverImage,
        readingTime: readingTime || 0,
        isPublished: isPublished ?? true,
        isFeatured: isFeatured ?? false,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    return NextResponse.json({
      success: true,
      data: work,
    });
  } catch (error) {
    console.error("Error creating work:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create work" },
      { status: 500 }
    );
  }
}
