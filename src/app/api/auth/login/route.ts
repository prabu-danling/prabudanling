import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";

// Simple hash function (must match register)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

// POST /api/auth/login - Login member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    // Find member
    const member = await db.member.findUnique({
      where: { email },
    });

    if (!member) {
      return NextResponse.json(
        { success: false, error: "Email atau password salah" },
        { status: 401 }
      );
    }

    // Verify password
    if (member.password !== simpleHash(password)) {
      return NextResponse.json(
        { success: false, error: "Email atau password salah" },
        { status: 401 }
      );
    }

    // Update last active
    await db.member.update({
      where: { id: member.id },
      data: { lastActive: new Date() },
    });

    // Create session token
    const token = nanoid(32);

    // Return member without password
    const { password: _, ...memberWithoutPassword } = member;

    return NextResponse.json({
      success: true,
      data: {
        member: memberWithoutPassword,
        token,
      },
      message: "Login berhasil! Selamat datang kembali.",
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { success: false, error: "Gagal login" },
      { status: 500 }
    );
  }
}
