import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/quotes - Get all quotes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const random = searchParams.get("random");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (random === "true") {
      // Get random quote
      const count = await db.quote.count();
      const skip = Math.floor(Math.random() * count);
      const quote = await db.quote.findFirst({
        skip,
        include: {
          work: {
            select: {
              title: true,
              slug: true,
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        data: quote,
      });
    }

    const where: Record<string, unknown> = {};

    if (featured === "true") {
      where.isFeatured = true;
    }

    const quotes = await db.quote.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        work: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: quotes,
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}

// POST /api/quotes - Create a new quote
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, source, author, workId, isFeatured } = body;

    if (!text) {
      return NextResponse.json(
        { success: false, error: "Quote text is required" },
        { status: 400 }
      );
    }

    const quote = await db.quote.create({
      data: {
        text,
        source,
        author: author || "Santri Angon",
        workId,
        isFeatured: isFeatured ?? false,
      },
    });

    return NextResponse.json({
      success: true,
      data: quote,
    });
  } catch (error) {
    console.error("Error creating quote:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create quote" },
      { status: 500 }
    );
  }
}
