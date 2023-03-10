import React from 'react'

export default function QuizItem () {

   const fetchdata = async()=>{
        const data = await fetch("https://the-trivia-api.com/api/questions?limit=20&categories=science,history");
        const parsed = await data.json();
        console.log(parsed);

    }
  return (
    <div>
        <button type='submit' onSubmit={fetchdata()}> hello</button>
    </div>
  )
}
