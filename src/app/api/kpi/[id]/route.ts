import { NextResponse } from "next/server";
import { UpdateKpiSchema } from "@erp/shared-schema";
import { getKpiById, updateKpi, deleteKpi } from "@/services/kpi";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const data = await getKpiById(params.id);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching KPI:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const parsed = UpdateKpiSchema.parse(body);
    const data = await updateKpi(params.id, parsed);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }
    console.error("Error updating KPI:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const data = await deleteKpi(params.id);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting KPI:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
