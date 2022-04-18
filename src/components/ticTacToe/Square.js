import React, {useState, useContext, useCallback, useEffect} from 'react';
import {SocketContext} from '../../context/socket';

const Square = (props) => {

const socket = useContext(SocketContext);

    const handleClick = async () => {
        // HAD STATE ON LINE 5 ORIGINALLY BUT USING STATE THERE
        //  NEVER HITS THE TRUE CONDITION. IDK WHY
        // console.log('hit')
        if (props.isClicked){
            // console.log(props.num)
        }else{  
            // console.log(playerValue)
            let newGame = props.game
            newGame[props.num] = {
                value:props.playerValue,
                num:props.num, 
                isClicked:true
            }
             await props.clickedSpot(newGame)
            // console.log(props.value)
            
        }
    }

    
return(
<div onClick={handleClick}className="cell">
    <span className="cellValue">{props.value}</span>
</div>)
}
export default Square

// clickedSpot={clickedSpot}
//  num={g.num} 
//  value={g.value} 
//  isX={isX} 
//  isClicked={g.isClicked}