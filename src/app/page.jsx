"use client"

import { useState, useEffect } from "react"

function getToday() {
  const unformattedDate = Intl.DateTimeFormat("en-US").format(new Date())
  let month = unformattedDate.split("/")[0]
  if (month.length === 1) {
    month = `0${month}`
  }
  let day = unformattedDate.split("/")[1]
  if (day.length === 1) {
    day = `0${day}`
  }
  const year = unformattedDate.split("/")[2]
  return `${year}-${month}-${day}`
}

function formatDate(date) {
  const year = date.split("-")[0]
  let month = date.split("-")[1]
  if (month.length === 2 && month[0] === "0") {
    month = month[1]
  }
  let day = date.split("-")[2]
  if (day.length === 2 && day[0] === "0") {
    day = day[1]
  }
  return `${year}-${month}-${day}`
}

export default function Home() {
  const [date, setDate] = useState(getToday())
  const [games, setGames] = useState([])
  console.log({ games })

  async function getScoreboardData({ date }) {
    let scoreboardData = await fetch(`/api/scoreboard/${date}`)
    scoreboardData = await scoreboardData.json()
    console.log(
      "🚀 ~ file: page.jsx:17 ~ getScoreboardData ~ scoreboardData:",
      scoreboardData
    )
    const gamesData = scoreboardData.data.dates[0].games
    console.log(gamesData)

    setGames(gamesData)
  }

  useEffect(() => {
    getScoreboardData({ date: getToday() })
  }, [])

  function handleDateChange(event) {
    setDate(event.target.value)
    getScoreboardData({ date: formatDate(event.target.value) })
  }

  return (
    <main className="p-3">
      <input value={date} type="date" onChange={handleDateChange}></input>
      <div className="mt-2 grid grid-cols-4 gap-4">
        {games.map((game) => {
          let gameStatus = game.status.detailedState
          const hasNotStarted =
            gameStatus === "Pre-Game" || gameStatus === "Scheduled"
          if (hasNotStarted) {
            gameStatus = game.gameDate
          }

          return (
            <div
              key={game.gamePk}
              className="w-full rounded-md px-3 py-2 font-sans shadow-md hover:scale-105"
            >
              <div className="pb-2 text-xs font-semibold text-gray-400">
                {gameStatus}
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <div className="font-bold leading-6">
                    {game.teams.away.team.name}
                  </div>
                  <div className="text-xs leading-7 text-gray-400">
                    ({game.teams.away.leagueRecord.wins}-
                    {game.teams.away.leagueRecord.losses})
                  </div>
                </div>
                {!hasNotStarted && <div>{game.teams.away.score}</div>}
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <div className="font-bold leading-6">
                    {game.teams.home.team.name}
                  </div>
                  <div className="text-xs leading-7 text-gray-400">
                    ({game.teams.home.leagueRecord.wins}-
                    {game.teams.home.leagueRecord.losses})
                  </div>
                </div>
                {!hasNotStarted && <div>{game.teams.home.score}</div>}
              </div>
              <a href="api/gameId">
                <div className="text-center font-mono text-sm font-semibold text-blue-600">
                  Box
                </div>
              </a>
            </div>
          )
        })}
      </div>
    </main>
  )
}
