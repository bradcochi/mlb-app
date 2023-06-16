import { NextResponse } from "next/server"

export async function GET() {
  try {
    const teamsURL = `https://statsapi.mlb.com/api/v1/teams?sportId=1`
    const teamsData = await fetch(teamsURL).then((response) => response.json())

    return NextResponse.json({ data: teamsData })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
