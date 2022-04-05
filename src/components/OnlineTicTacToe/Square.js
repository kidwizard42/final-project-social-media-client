import React, { useEffect, useRef, useState } from "react"
const Square = (props) => {
const [value, setValue] = useState(props.value)
const [playerOption, setPlayerOption]= useState(props.playerValue)
const [isClicked, setIsClicked]=useState(props.isClicked)

    const handleClick = async () => {
        if(isClicked){
        
        }else{
             setValue(playerOption)
            setIsClicked(true)
        }
        // if(value == 'X'){
        //     console.log('already filled');
        //     isClicked=true
        // }else{
        //     setValue('X')
        //     isClicked=true
        // }
        await props.clickedSpot(props.num,
             {
                value:value,
                num:props.num,
                isClicked:isClicked
            }
        )
        // console.log('h')
        
        

    }
    
return(
<div onClick={handleClick}className="cell">
    <div>{value}</div>
</div>)
}
export default Square