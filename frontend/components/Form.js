import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'



export function Form(props) {

  console.log(props)
  
  const onChange = evt => {
  props.inputChange(evt.target.id,evt.target.value)
  }

  // useEffect(()=>{
  //   const 
  //   return(disabled)}
  // ,[])

  const onSubmit = evt => {
  
  props.resetForm()
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion}/>
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer}/>
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer}/>
      <button 
        disabled={props.form.newTrueAnswer.trim().length > 0 &&  props.form.newQuestion.trim().length > 0 && props.form.newFalseAnswer.trim().length > 0 ? false : true}
        onClick={(e)=>{
          e.preventDefault();
          {props.postQuiz({ "question_text": props.form.newQuestion, "true_answer_text": props.form.newTrueAnswer, "false_answer_text": props.form.newFalseAnswer },props.form.newQuestion)};
          }} 
        id="submitNewQuizBtn">
          Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
