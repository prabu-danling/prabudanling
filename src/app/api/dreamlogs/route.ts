import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/dreamlogs - Get all dream logs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lucidity = searchParams.get("lucidity");
    const mood = searchParams.get("mood");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (lucidity) {
      where.lucidity = lucidity;
    }
    if (mood) {
      where.mood = mood;
    }

    const [dreamlogs, total] = await Promise.all([
      db.dreamLog.findMany({
        where,
        orderBy: { dreamDate: "desc" },
        skip,
        take: limit,
      }),
      db.dreamLog.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: dreamlogs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching dream logs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dream logs" },
      { status: 500 }
    );
  }
}

// POST /api/dreamlogs - Create a new dream log
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      content,
      symbols,
      lucidity,
      mood,
      dreamDate,
      isRecurring,
      isLucid,
      notes,
    } = body;

    // Check if slug already exists
    const existing = await db.dreamLog.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Slug already exists" },
        { status: 400 }
      );
    }

    const dreamlog = await db.dreamLog.create({
      data: {
        title,
        slug,
        content,
        symbols: symbols ? JSON.stringify(symbols) : null,
        lucidity: lucidity || "medium",
        mood,
        dreamDate: new Date(dreamDate),
        isRecurring: isRecurring ?? false,
        isLucid: isLucid ?? false,
        notes,
      },
    });

    return NextResponse.json({
      success: true,
      data: dreamlog,
    });
  } catch (error) {
    console.error("Error creating dream log:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create dream log" },
      { status: 500 }
    );
  }
}
