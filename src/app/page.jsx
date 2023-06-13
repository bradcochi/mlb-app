"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const formatDate = (date) => {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  return `${year}-${month}-${day}`;
};

async function getScoreboardData({ date }) {
  let scoreboardData = await fetch(`/api/scoreboard/${date}`);
  scoreboardData = await scoreboardData.json();
}

export default function Home() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const formattedDate = formatDate(date);
    getScoreboardData({ date: formattedDate });
  }, [date]);

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  return (
    <main>
      <input value={date} type="date" onChange={handleDateChange}></input>
    </main>
  );
}
