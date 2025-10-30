import { CreateTaskSchema } from "@/lib/schemas/task/schemas";
import { createTask } from "@/services/tasks";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CreateTaskSchema.parse(body);
    const data = await createTask(parsed);
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating KPI:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}