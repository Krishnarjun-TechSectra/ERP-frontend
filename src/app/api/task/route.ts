import { NextRequest, NextResponse } from "next/server";
import { CreateTaskSchema, TaskFilterSchema } from "@erp/shared-schema";
import { getTasks, createTask } from "@/services/tasks";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filters = Object.fromEntries(searchParams.entries());
    const parsed = TaskFilterSchema.parse(filters);
    const data = await getTasks(parsed);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching Tasks:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateTaskSchema.parse(body);
    const data = await createTask(parsed);
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating Task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
