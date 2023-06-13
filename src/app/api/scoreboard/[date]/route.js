import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    // date must be in format YYYY-M-D
    const scoreboardURL = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${params.date}&endDate=${params.date}`
    const scoreboardData = await fetch(scoreboardURL).then((response) =>
      response.json()
    )

    return NextResponse.json({ data: scoreboardData })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
