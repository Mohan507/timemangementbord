import { NextResponse } from "next/server"
import { mockUsers } from "../../lib/mockUsers"

export async function GET() {
  return NextResponse.json(mockUsers)
}