import { NextResponse } from "next/server";
import { CreateKpiDto } from "@erp/shared-schema";
import { createKpi, getKpis } from "@/services/kpi";

export async function GET() {
  try {
    const data = await getKpis();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching KPIs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CreateKpiDto.parse(body);
    const data = await createKpi(parsed);
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }
    console.error("Error creating KPI:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
