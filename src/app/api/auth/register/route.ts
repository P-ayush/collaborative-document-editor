import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { registerSchema } from "@/validations/auth";
import { registerUser } from "@/services/auth/auth.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = registerSchema.parse(body);

    const user = await registerUser(data);

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}