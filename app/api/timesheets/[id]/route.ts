// import { NextResponse } from "next/server"
// import { mockTimesheets } from '../../../lib/mockTimesheets'

// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const body = await req.json()
//   const id = Number(params.id)

//   const index = mockTimesheets.findIndex(t => t.id === id)

//   if (index === -1) {
//     return NextResponse.json({ message: "Not found" }, { status: 404 })
//   }

//   mockTimesheets[index] = {
//     ...mockTimesheets[index],
//     ...body
//   }

//   return NextResponse.json(mockTimesheets[index])
// }
import { NextRequest, NextResponse } from "next/server"
import { mockTimesheets } from "../../../lib/mockTimesheets"

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = await request.json()

  const numericId = Number(id)

  const index = mockTimesheets.findIndex(
    (t) => t.id === numericId
  )

  if (index === -1) {
    return NextResponse.json(
      { message: "Not found" },
      { status: 404 }
    )
  }

  mockTimesheets[index] = {
    ...mockTimesheets[index],
    ...body,
  }

  return NextResponse.json(mockTimesheets[index])
}