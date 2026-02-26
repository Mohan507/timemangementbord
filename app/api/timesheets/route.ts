// import { NextResponse } from "next/server"
// import { mockTimesheets } from "../../lib/mockTimesheets"

// export async function GET() {
//   return NextResponse.json(mockTimesheets)
// }

// export async function POST(req: Request) {
//   const body = await req.json()

//   const newEntry = {
//     id: Date.now(),
//     ...body
//   }

//   mockTimesheets.push(newEntry)

//   return NextResponse.json(newEntry)
// }
import { NextRequest, NextResponse } from "next/server"
import { mockTimesheets } from "../../lib/mockTimesheets"

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = await request.json()

  const index = mockTimesheets.findIndex(
    (item) => item.id === Number(id)
  )

  if (index === -1) {
    return NextResponse.json(
      { message: "Not found" },
      { status: 404 }
    )
  }

  mockTimesheets[index] = {
    ...mockTimesheets[index],
    ...body
  }

  return NextResponse.json(mockTimesheets[index])
}