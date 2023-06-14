'use client'

import { useState, useEffect } from 'react'

async function getScoreboardData({ date }) {
  let scoreboardData = await fetch(`/api/scoreboard/${date}`)
  scoreboardData = await scoreboardData.json()
  console.log(
    '🚀 ~ file: page.jsx:17 ~ getScoreboardData ~ scoreboardData:',
    scoreboardData
  )
}

function getToday() {
  const unformattedDate = Intl.DateTimeFormat('en-US').format(new Date())
  let month = unformattedDate.split('/')[0]
  if (month.length === 1) {
    month = `0${month}`
  }
  let day = unformattedDate.split('/')[1]
  if (day.length === 1) {
    day = `0${day}`
  }
  const year = unformattedDate.split('/')[2]
  return `${year}-${month}-${day}`
}

function formatDate(date) {
  const year = date.split('-')[0]
  let month = date.split('-')[1]
  if (month.length === 2 && month[0] === '0') {
    month = month[1]
  }
  let day = date.split('-')[2]
  if (day.length === 2 && day[0] === '0') {
    day = day[1]
  }
  return `${year}-${month}-${day}`
}

export default function Home() {
  const [date, setDate] = useState(getToday())

  useEffect(() => {
    getScoreboardData({ date: getToday() })
  }, [])

  function handleDateChange(event) {
    setDate(event.target.value)
    getScoreboardData({ date: formatDate(event.target.value) })
  }

  return (
    <main>
      <input value={date} type="date" onChange={handleDateChange}></input>
    </main>
  )
}
