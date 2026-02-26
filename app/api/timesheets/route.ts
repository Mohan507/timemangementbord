import { NextResponse } from "next/server"
import { mockTimesheets } from "../../lib/mockTimesheets"

export async function GET() {
  return NextResponse.json(mockTimesheets)
}

export async function POST(req: Request) {
  const body = await req.json()

  const newEntry = {
    id: Date.now(),
    ...body
  }

  mockTimesheets.push(newEntry)

  return NextResponse.json(newEntry)
}