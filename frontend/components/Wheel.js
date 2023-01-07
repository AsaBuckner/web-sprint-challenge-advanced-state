import React from 'react'
import { connect } from 'react-redux'
import {moveClockwise, moveCounterClockwise} from '../state/action-creators'


const mapStateToProps = state => {
  
  return ({
    activeCog: state.wheel.activeCog,
  })
}
const cogID = [
  0,
  1,
  2,
  3,
  4,
  5
]

function Wheel(props) {

const {activeCog,moveClockwise,moveCounterClockwise} = props

const handleClockwise= () => {
  moveClockwise();
  console.log(activeCog)
}

const handleCounterClockwise= () => {
  moveCounterClockwise()
  console.log(activeCog)
}


  return (
    <div id="wrapper">
      <div id="wheel">
        {cogID !== undefined ? cogID.map(number=>{
          return(
            <div 
            key={number}
            className={`cog ${number === activeCog ? "active" : ""}`}
            style={{ "--i": number }}
            >{number === activeCog ? "B" : ""}</div>
          )
        }): "Loading Cogs"}

        
      </div>
      <div id="keypad">
        <button onClick={handleCounterClockwise} id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={handleClockwise} id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}


export default connect(mapStateToProps,{moveClockwise, moveCounterClockwise})(Wheel)
