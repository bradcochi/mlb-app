import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  try {
    const gameURL = `https://statsapi.mlb.com/api/v1.1/game/${params.gamePk}/feed/live`
    const gameData = await fetch(gameURL).then((response) => response.json())
    console.log(params)
    return NextResponse.json({ data: gameData })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
