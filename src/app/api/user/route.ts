import { getUsers } from "@/services/users";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getUsers();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching Users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}


