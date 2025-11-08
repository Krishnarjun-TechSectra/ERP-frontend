import { NextRequest, NextResponse } from "next/server";
import { UpdateTaskSchema } from "@erp/shared-schema";
import { getTaskById, updateTask, deleteTask } from "@/services/tasks";

export async function GET(_req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } };

  try {
    const data = await getTaskById(params.id);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching Task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } };

  try {
    const body = await req.json();
    const parsed = UpdateTaskSchema.parse(body);
    const data = await updateTask(params.id, parsed);

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }

    console.error("Error updating Task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } };

  try {
    const data = await deleteTask(params.id);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error deleting Task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
