"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

async function getTeams({ setData }) {
  const response = await fetch("/api/teams")
  const { data } = await response.json()
  setData(data.teams)
}

export default function TeamsPage() {
  const [teams, setTeams] = useState([])

  const leagues = teams.reduce((acc, team) => {
    if (!acc.find((league) => league.id === team.league.id)) {
      acc.push({ divisions: [team.division], ...team.league })
    } else {
      const foundLeague = acc.find((league) => league.id === team.league.id)
      const foundDivision = foundLeague.divisions.find(
        (division) => division.id === team.division.id
      )
      if (!foundDivision) {
        foundLeague.divisions.push(team.division)
      }
    }
    return acc
  }, [])

  useEffect(() => {
    getTeams({ setData: setTeams })
  }, [])

  return (
    <div className="mx-auto max-w-4xl">
      {leagues.map((league) => (
        <div key={league.id} className="mb-4 flex justify-between">
          {league.divisions.map((division) => {
            const divisionTeams = teams.filter(
              (team) => team.division.id === division.id
            )

            return (
              <div key={division.id} className="w-52">
                <div className="mb-2 text-sm font-bold text-gray-400">
                  {division.name}
                </div>
                {divisionTeams.map((team) => (
                  <Link
                    href={`/teams/${team.id}`}
                    key={team.id}
                    className="my-2 flex items-center gap-2"
                  >
                    <div className="relative h-6 w-6">
                      <Image
                        className="object-contain"
                        fill
                        alt={team.name}
                        src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
                      ></Image>
                    </div>
                    {team.name}
                  </Link>
                ))}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
