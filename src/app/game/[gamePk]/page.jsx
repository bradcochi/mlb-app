"use client"

import { useState, useEffect } from "react"

export default function Game({ params }) {
  const [game, setGame] = useState()
  console.log({ game })
  async function getGameData({ gamePk }) {
    let singleGameData = await fetch(`/api/game/${gamePk}`)
    singleGameData = await singleGameData.json()

    setGame(singleGameData.data)
  }

  useEffect(() => {
    getGameData({ gamePk: params.gamePk })
  }, [])

  return <div>My Post: {params.gamePk}</div>
}
