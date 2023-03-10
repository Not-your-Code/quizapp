import React, { useEffect, useState } from 'react'
import '../css/Main.css'
import QuizItem from './QuizItem'


export default function Main(props) {
 // all states
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState({});
  const [userCat, setUsercat] = useState('History')
  const [userMode, setUserMode] = useState('Easy')
  const [userLimit, setUserLimit] = useState(1)
  const [user_is_quizing, setUser_is_quizing] = useState(false);
  const [fetched, setFetched] = useState({})

// all needed vars
  const mode = ["easy ", "medium", "hard"];
  const limit = [];


  for (let i = 1; i <= 20; i++) {
    limit.push(i);
  }



  useEffect(() => {
    const url = 'https://the-trivia-api.com/api/categories'

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setCategories(json)

      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [])



  const objKeys = [];
  for (let key in categories) {
    objKeys.push(key);
  }

  const handleChangeCat = (e) => setUsercat(e.target.value)
  const handleChangeMode = (e) => setUserMode(e.target.value)
  const handleChangeLimit = (e) => setUserLimit(e.target.value)


  const handleSubmit = (e) => {
    e.preventDefault();
    const FetchUrl = `https://the-trivia-api.com/api/questions?categories=${userCat}&limit=${userLimit}&difficulty=${userMode}`
    console.log(FetchUrl)
    fetchData_user(FetchUrl)
    setUser_is_quizing(true)

  }

  const fetchData_user = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setFetched(json)

    } catch (error) {
      console.log("error", error);
    }
  };



  return (
    <div className='container'>
      <div className='message box cont'>
        <p id='message-contnt box'>Welcome to trivia api</p>

        <div id="score">
          <ul>
            <label>Score</label>
            <li>{score}</li>
          </ul>
          <ul>
            <label>Question</label>
            <li>{total}</li>
          </ul>
        </div>
      </div>
      <div className='content box cont'>
        <div className='category'>
          { !user_is_quizing ?
           <form method='get' onSubmit={handleSubmit} >
           <label >Category </label>

           <select value={userCat} onChange={handleChangeCat}>
             {objKeys.map(key => (<option value={key}>{key}</option>))}
           </select>
           <select value={userMode} onChange={handleChangeMode}>
             {mode.map(key => (<option value={key}>{key}</option>))}
           </select>
           <select value={userLimit} onChange={handleChangeLimit}>
             {limit.map(key => (<option value={key}>{key}</option>))}
           </select>
           <button type='submit'>submit</button>
         </form> : <h1>"hello"</h1>
           




          }
         
        </div>
      </div>


    </div>
  )
}
