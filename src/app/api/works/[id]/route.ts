import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/works/[id] - Get a single work
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const work = await db.work.findUnique({
      where: { id },
      include: {
        quotes: true,
      },
    });

    if (!work) {
      return NextResponse.json(
        { success: false, error: "Work not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: work,
    });
  } catch (error) {
    console.error("Error fetching work:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch work" },
      { status: 500 }
    );
  }
}

// PUT /api/works/[id] - Update a work
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const work = await db.work.update({
      where: { id },
      data: {
        ...body,
        tags: body.tags ? JSON.stringify(body.tags) : undefined,
        publishedAt: body.isPublished ? new Date() : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      data: work,
    });
  } catch (error) {
    console.error("Error updating work:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update work" },
      { status: 500 }
    );
  }
}

// DELETE /api/works/[id] - Delete a work
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await db.work.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Work deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting work:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete work" },
      { status: 500 }
    );
  }
}
