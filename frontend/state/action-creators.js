// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios"

export const MOVE_CLOCKWISE = 'MOVE_CLOCKWISE'
export const MOVE_COUNTERCLOCKWISE = 'MOVE_COUNTERCLOCKWISE'
export const SET_QUIZ_INTO_STATE = 'SET_QUIZ_INTO_STATE'
export const SET_SELECTED_ANSWER = 'SET_SELECTED_ANSWER'
export const SET_INFO_MESSAGE = 'SET_INFO_MESSAGE'
export const INPUT_CHANGE = 'INPUT_CHANGE'
export const RESET_FORM = 'RESET_FORM'

// ----------------------//

//WHEEL//

export function moveClockwise() {
  return {type: MOVE_CLOCKWISE}
}


export function moveCounterClockwise() { 
  return {type: MOVE_COUNTERCLOCKWISE}
}


// ----------------------//

//QUIZ//


export function setQuiz(quiz) {
  return {type: SET_QUIZ_INTO_STATE, payload: quiz}
 }


export function selectAnswer(name) { 
  return {type: SET_SELECTED_ANSWER, payload: name}
}

// ----------------------//


//FORM//

export function setMessage(message) {
  return({type: SET_INFO_MESSAGE, payload: message})
 }




export function inputChange(target,value) {
  return({type:INPUT_CHANGE, payload:{name:target,value:value}})
 }


export function resetForm() {
  return({type:RESET_FORM})
 }


// ----------------------//

// ❗ Async action creators


export function fetchQuiz(reset) {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch(setQuiz(reset))
    axios.get('http://localhost:9000/api/quiz/next')
    // On successful GET:
    .then(res => {
    // - Dispatch an action to send the obtained quiz to its state
    dispatch(setQuiz(res.data))
    })
  }
}



export function postAnswer(answer) {
  return function (dispatch) {
    
    // On successful POST:
    axios.post(`http://localhost:9000/api/quiz/answer`,(answer))
    .then((res) => {
       // - Dispatch an action to set the server message to state
       dispatch(setMessage(res.data.message))
    })
    .then(() =>
    // - Dispatch an action to reset the selected answer state
    dispatch(selectAnswer(undefined)))
    .finally(()=> {
      // - Dispatch the fetching of the next quiz
      dispatch(fetchQuiz({question: undefined, answers: [{text: undefined},{text: undefined}]}))
    })
    

  }
}




export function postQuiz(newQ,Q) {
  return function (dispatch) {
    axios.post(`http://localhost:9000/api/quiz/new`, (newQ))
    // On successful POST:
    
    .then((res)=>{
      console.log(res)
      // - Dispatch the correct message to the the appropriate state
      dispatch(setMessage(`Congrats: ${Q} is a great question!`))
    })
    .finally(()=>{
      // - Dispatch the resetting of the form
      dispatch(resetForm())
    })
    
    
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
