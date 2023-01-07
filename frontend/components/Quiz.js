import React from 'react'
import { connect } from 'react-redux'
import {fetchQuiz, selectAnswer, postAnswer} from '../state/action-creators'
import { useEffect, useState} from 'react'


const mapStateToProps = state => {
  return ({
    question : state.quiz.question,
    answer1: state.quiz.answer1,
    answer2: state.quiz.answer2,
    quizId: state.quiz.quizId,
    answer1Id: state.quiz.answer1Id,
    answer2Id: state.quiz.answer2Id,
    bttn1: state.SELECTEDAnswer.bttn1,
    bttn2: state.SELECTEDAnswer.bttn2,
  })
} 


function Quiz(props) {
  const {question,answer1Id,answer2Id,quizId, answer1, answer2, fetchQuiz, bttn1, bttn2, selectAnswer, postAnswer} = props 


  useEffect(() => {
    if(question === undefined){
    fetchQuiz({question: undefined, answers: [{text: undefined},{text: undefined}]})
  }

  },[])

  
  return (
    
    <div id="wrapper">
      {
      
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        question !== undefined ? (
          <>
            <h2>{question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${bttn1 === "SELECTED" ? "selected" : ""}`}>
                {answer1}
                <button
                onClick={()=>{selectAnswer("bttn1")}}
                >
                  {bttn1}
                </button>
              </div>

              <div className={`answer ${bttn2 === "SELECTED" ? "selected" : ""}`}>
              {answer2}
                <button
                onClick={()=>{selectAnswer("bttn2")}}>
                  {bttn2}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn"
            disabled={bttn1 !== "SELECTED" && bttn2 !== "SELECTED"}
            onClick={()=>{postAnswer({ 'quiz_id': `${quizId}`, 'answer_id': `${bttn1 === "SELECTED" ? answer1Id : answer2Id}` })}}
            >Submit answer
            </button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}


export default connect(mapStateToProps,{fetchQuiz, selectAnswer, postAnswer})(Quiz)

