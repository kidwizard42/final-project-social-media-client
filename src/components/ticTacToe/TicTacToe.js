import React, { useEffect, useRef, useState } from "react"
import Square from './Square'
import './TicTacToe.css'

const TicTacToe = () => {
    const [isX, setIsX] = useState(true)
    const [game, setGame]= useState([
        {value:"",num:0, isClicked:false},
        {value:"",num:1, isClicked:false},
        {value:"",num:2, isClicked:false},
        {value:"",num:3, isClicked:false},
        {value:"",num:4, isClicked:false},
        {value:"",num:5, isClicked:false},
        {value:"",num:6, isClicked:false},
        {value:"",num:7, isClicked:false},
        {value:"",num:8, isClicked:false}
    ])


    const clickedSpot = (newGameState) => {
        
        setGame(newGameState)
        setIsX(!isX)
        // renderGame()
    }

   const renderGame= () => {
       
    return(
        
        game.map((g,i) => {
           return( 
            <div className="cell" key={i}>
                <Square
                clickedSpot={clickedSpot}
                num={g.num} 
                value={g.value}
                isX={isX}
                isClicked={g.isClicked}
                game={game}/>  
            </div>
           )
        })
    )}
    
    const resetGame = () => {
        setGame([
            {value:"",num:0, isClicked:false},
            {value:"",num:1, isClicked:false},
            {value:"",num:2, isClicked:false},
            {value:"",num:3, isClicked:false},
            {value:"",num:4, isClicked:false},
            {value:"",num:5, isClicked:false},
            {value:"",num:6, isClicked:false},
            {value:"",num:7, isClicked:false},
            {value:"",num:8, isClicked:false}
        ])
        setIsX(true)
        // renderGame()
    }

    

    // useEffect(() => {
    //     renderGame()
    // },[game])

    return(
        <>
        {/* <h3>TicTacToe</h3> */}
            <div className="canvas-tic-tac-toe">
                
            {renderGame()}
            <button onClick={resetGame}>Restart</button>

            </div>
        
        </>
    )

}
export default TicTacToe


{/* <div className="canvas-tic-tac-toe">
                
                <div className="row1">
                    <Square clickedSpot={clickedSpot} num={0} playerValue={playerValue} />
                    <Square clickedSpot={clickedSpot} num={1} playerValue={playerValue} />
                    <Square clickedSpot={clickedSpot} num={2} playerValue={playerValue} />
                </div>
                <div className="row2">
                    <Square clickedSpot={clickedSpot} num={3} playerValue={playerValue} />
                    <Square clickedSpot={clickedSpot} num={4} playerValue={playerValue} />
                    <Square clickedSpot={clickedSpot} num={5} playerValue={playerValue} />
                </div>
                <div className="row3">
                    <Square clickedSpot={clickedSpot} num={6} playerValue={playerValue} />
                    <Square clickedSpot={clickedSpot} num={7} playerValue={playerValue} />
                    <Square clickedSpot={clickedSpot} num={8} playerValue={playerValue} />
                </div>
        
            </div> */}