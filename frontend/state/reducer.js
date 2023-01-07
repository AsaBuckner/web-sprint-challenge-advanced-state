// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, 
  SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER,SET_INFO_MESSAGE,INPUT_CHANGE,RESET_FORM} from './action-creators'


// ----------------------//


const initialWheelState = {
  activeCog : 0
}
function wheel(state = initialWheelState, action) {
  
  switch(action.type){

    case MOVE_CLOCKWISE: 
      return({
          ...state, activeCog: state.activeCog === 5 ? 0 : state.activeCog += 1
      });

    case MOVE_COUNTERCLOCKWISE: 
      return({
          activeCog: state.activeCog === 0 ? 5 : state.activeCog -= 1
      })

    default: 
      return state
  }
  
}



// ----------------------//

const initialQuizState = {
  question: undefined,
  answer1: undefined,
  answer2: undefined,
  quizId: undefined,
  answer1Id: undefined,
  answer2Id: undefined
}
function quiz(state = initialQuizState, action) {
  
  switch(action.type){
    case SET_QUIZ_INTO_STATE:
      return({
        question: action.payload.question,
        quizId: action.payload.quiz_id,
        answer1: action.payload.answers[0].text,
        answer2: action.payload.answers[1].text,
        answer1Id: action.payload.answers[0].answer_id,
        answer2Id: action.payload.answers[1].answer_id
      })
    
    default:
    return(state)
    }
  }
  


// ----------------------//


const initialSELECTEDAnswerState ={
  bttn1: "Select",
  bttn2: "Select",
  answerId: undefined
}
function SELECTEDAnswer(state = initialSELECTEDAnswerState, action) {
  switch(action.type){
    case SET_SELECTED_ANSWER:
      return({
        bttn1: action.payload === "bttn1" ? "SELECTED" : "Select",
        bttn2: action.payload === "bttn2" ? "SELECTED" : "Select"
      })
      default:
      return( state )
  }   
  }
  


// ----------------------//

const initialMessageState = {
  message: ''
}
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    
    case SET_INFO_MESSAGE:
      return({
        message: action.payload
      })

    default:
    return state
  }
  
}



// ----------------------//


const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {

  switch(action.type){

    case INPUT_CHANGE:
      return({
        newQuestion: action.payload.name == "newQuestion" ? `${action.payload.value}` : state.newQuestion,
        newTrueAnswer: action.payload.name == "newTrueAnswer" ? `${action.payload.value}` : state.newTrueAnswer,
        newFalseAnswer:action.payload.name == "newFalseAnswer" ? `${action.payload.value}` : state.newFalseAnswer,
      })

    case RESET_FORM:
      return(initialFormState)

    default:
      return state
  }
  
}



// ----------------------//


export default combineReducers({ wheel, quiz, SELECTEDAnswer, infoMessage, form })
