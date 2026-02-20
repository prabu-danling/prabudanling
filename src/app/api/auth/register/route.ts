import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";

// Simple hash function (in production, use bcrypt)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

// POST /api/auth/register - Register new member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, password, username } = body;

    // Validate
    if (!email || !name || !password) {
      return NextResponse.json(
        { success: false, error: "Email, nama, dan password wajib diisi" },
        { status: 400 }
      );
    }

    // Check if email exists
    const existingEmail = await db.member.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { success: false, error: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Check if username exists (if provided)
    if (username) {
      const existingUsername = await db.member.findUnique({
        where: { username },
      });

      if (existingUsername) {
        return NextResponse.json(
          { success: false, error: "Username sudah digunakan" },
          { status: 400 }
        );
      }
    }

    // Create member
    const member = await db.member.create({
      data: {
        email,
        name,
        username: username || `member_${nanoid(8)}`,
        password: simpleHash(password),
        tier: "free",
      },
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
      message: "Pendaftaran berhasil! Selamat datang di Portal Kesadaran.",
    });
  } catch (error) {
    console.error("Error registering member:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mendaftarkan member" },
      { status: 500 }
    );
  }
}
