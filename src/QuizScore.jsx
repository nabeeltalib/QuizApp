import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const QuizScore = () => {
    const {state} = useLocation()
    console.log(state)
    const [percentage, setPercentage] = useState(0)


    useEffect(()=>{
    setPercentage(state.score / state.questions.length * 100)
    },[])
    
  return (
    <div>
    <div className='text-center mt-5 text-2xl'>QuizScore</div>
    <p  className='text-center mt-5 text-2xl'>{percentage} %</p>
    <h1  className='text-center mt-5'>{percentage > 50 ? <h1 className='text-green-500 text-3xl'>Pass</h1> : <h1 className='text-red-500 text-3xl'>Fail</h1>}</h1>
    </div>
  )
}

export default QuizScore