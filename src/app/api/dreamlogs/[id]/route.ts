import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/dreamlogs/[id] - Get a single dream log
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const dreamlog = await db.dreamLog.findUnique({
      where: { id },
    });

    if (!dreamlog) {
      return NextResponse.json(
        { success: false, error: "Dream log not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: dreamlog,
    });
  } catch (error) {
    console.error("Error fetching dream log:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dream log" },
      { status: 500 }
    );
  }
}

// PUT /api/dreamlogs/[id] - Update a dream log
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const dreamlog = await db.dreamLog.update({
      where: { id },
      data: {
        ...body,
        symbols: body.symbols ? JSON.stringify(body.symbols) : undefined,
        dreamDate: body.dreamDate ? new Date(body.dreamDate) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      data: dreamlog,
    });
  } catch (error) {
    console.error("Error updating dream log:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update dream log" },
      { status: 500 }
    );
  }
}

// DELETE /api/dreamlogs/[id] - Delete a dream log
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await db.dreamLog.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Dream log deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting dream log:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete dream log" },
      { status: 500 }
    );
  }
}
