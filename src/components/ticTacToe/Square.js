import React, { useEffect, useRef, useState } from "react"
const Square = (props) => {
const [value, setValue] = useState(props.value)
let myValue = (props.value)
// const [playerOption, setPlayerOption]= useState(props.playerValue)
// const [isClicked, setIsClicked]=useState(props.isClicked)

    const handleClick = async() => {
        // HAD STATE ON LINE 5 ORIGINALLY BUT USING STATE THERE
        //  NEVER HITS THE TRUE CONDITION. IDK WHY
        if (props.isClicked){
            // console.log(props.num)
        }else{
            if(props.isX){
                setValue('X')
                myValue = "X"
                // console.log(props.num)
            }else{
                setValue('O')
                myValue ="O"
                // console.log(props.num)
            }

            let newGame = props.game
            newGame[props.num] = {
                value:myValue,
                num:props.num, 
                isClicked:true
            }

            await props.clickedSpot(newGame)
            // console.log(myValue)
        }
    }
    
return(
<div onClick={handleClick}className="cell">
    <span className="cellValue">{value}</span>
</div>)
}
export default Square

// clickedSpot={clickedSpot}
//  num={g.num} 
//  value={g.value} 
//  isX={isX} 
//  isClicked={g.isClicked}