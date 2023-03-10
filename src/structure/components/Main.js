import React , {useState} from 'react'
import '../css/Main.css'
import QuizItem from './QuizItem'
import Category from './Category';

export default function Main(props) {
    const [user_is_quizing , setUser_is_quizing] = useState(false);
    const[score  , setScore] =  useState(0);
    const [total , setTotal ] = useState(0);
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
          {user_is_quizing ? <QuizItem/> : <Category/>}
        </div> 


    </div>
  )
}
