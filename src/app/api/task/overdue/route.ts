import { getOverdueTasks } from "@/services/leaderboard";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getOverdueTasks();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching Tasks:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
