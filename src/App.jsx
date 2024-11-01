import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const [questions, setQuestion] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const navigate = useNavigate()
  const Input = useRef([])


  useEffect(()=>{
   axios('https://the-trivia-api.com/v2/questions')
   .then((res)=>{
    // console.log(res.data)
    setQuestion(res.data)
   }).catch((res)=>{
    console.log(res)
   })
  },[])

  function NextQuestion() {
    const selectedVal = Input.current.find(item => item && item.checked)
    const correctAnswer = questions[currentIndex].correctAnswer

    if(selectedVal &&  selectedVal.value === correctAnswer){
       setScore(score + 1)
    }
    if(currentIndex < questions.length - 1){
      setCurrentIndex(currentIndex + 1)
      return
    }
    navigate('QuizScore', {
      state:{
        questions, 
        score
      }
    })
  
  }

    // useEffect(()=>{
    //   NextQuestion()
    // },[])

  function shuffleArray(arr){
    const emptyArr = [];
    const ShuffleArr = [];
    for (let index = 0; index < arr.length; index++) {
      const randomNumber = Math.floor(Math.random() * arr.length)
      if(emptyArr.includes(randomNumber)){
      index--
      }else{
        emptyArr.push(randomNumber)
        ShuffleArr[randomNumber] = arr[index]
      }
    }
    return ShuffleArr
  }
  

  return (
    <>
    <div className='text-center m-5 text-3xl font-bold	'>
     Quiz App
     </div>
     <div className='p-10'>
      {
        questions ?
        <>
        <h1 className='text-2xl font-bold'>Q {currentIndex + 1} : {questions[currentIndex].question.text}</h1>
        <h1>{shuffleArray([...questions[currentIndex].incorrectAnswers, questions[currentIndex].correctAnswer]).map((item, index)=>{
          return(
            <div className='m-2' key={index}>
            <input ref={el => Input.current[index] = el} type="radio" name="check" id={index} size={25} value={item}/>
            <label htmlFor={index} className='m-2 text-2xl'>{item}</label>
            </div>
          )
        })}</h1>
        <button onClick={NextQuestion} className='bg-blue-300 p-2 rounded mt-5 text-2xl w-[100%]'>Next</button>
        </>
        : <div className='text-center font-bold text-2xl'>...loading</div>
      }
     </div>
    </>
  )
}

export default App

// fetch('https://the-trivia-api.com/v2/questions')