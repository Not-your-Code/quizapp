import React, { useEffect, useState } from 'react'
import '../css/Main.css'
import QuizItem from './QuizItem'
import Footer from './Footer';


export default function Main(props) {
 // all states
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState({});
  const [userCat, setUsercat] = useState('History')
  const [userMode, setUserMode] = useState('easy')
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
      {!user_is_quizing?""
      : <div className='message '>
      <p id='message-contnt '>Welcome to trivia api</p>

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
      
    }
     
     
        <div className='category'>
        { !user_is_quizing ?
           <form method='get' onSubmit={handleSubmit} >
           <label id="cat" >Choose Your Quiz !</label>
           <label className='labels'>Choose Category : </label>
           <select value={userCat} onChange={handleChangeCat} className="select" >
            
             {objKeys.map(key => (<option value={key}>{key}</option >))}
           </select>
           <label className='labels'>Choose Your level :</label>
           <select value={userMode} onChange={handleChangeMode} className="select">
             {mode.map(key => (<option value={key}>{key}</option>))}
           </select>
           <label className='labels'>Choose Questions :</label>
           <select value={userLimit} onChange={handleChangeLimit} className="select">
             {limit.map(key => (<option value={key}>{key}</option>))}
           </select>
           <button type='submit' className='btn'>Get Quiz</button>
         </form> : <QuizItem/>
           




          }
         
        </div>
      

   <Footer />
    </div>
  )
}
