import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const gameURL = `https://statsapi.mlb.com/api/v1.1/game/717844/feed/live`;
    const gameData = await fetch(gameURL).then((response) => response.json());

    return NextResponse.json({ data: gameData });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
