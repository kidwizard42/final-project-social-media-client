import React, { useEffect, useRef, useState } from "react"
import Square from './Square'
import io from "socket.io-client"
import './TicTacToe.css'

const herokuSiteSocket = "https://floating-reaches-19985.herokuapp.com/";
const localhostSocket = "http://localhost:3003/";
const localHostJavaBackend = "http://localhost:8080/";
const herokuJavaBackend = "https://pacific-journey-81010.herokuapp.com/"

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
    const socketRef = useRef()
    const [room, setRoom] = useState("")
    // const [ticTacGame, setTicTacGame] = useState({})

    const clickedSpot = (newGameState) => {
        
        setGame(newGameState)
        setIsX(!isX)
        if((game[0].value === game[1].value && game[1].value=== game[2].value)   && game[0].value !== ""){
            alert('you win!')
        } else if ((game[3].value === game[4].value && game[4].value=== game[5].value)   && game[3].value !== ""){
            alert('you win!')
        }else if ((game[6].value === game[7].value && game[7].value=== game[8].value)   && game[6].value !== ""){
            alert('you win!')
        }else if ((game[0].value === game[4].value && game[4].value=== game[8].value)   && game[0].value !== ""){
            alert('you win!')
        }else if ((game[0].value === game[3].value && game[3].value=== game[6].value)   && game[0].value !== ""){
            alert('you win!')
        }else if ((game[2].value === game[5].value && game[5].value=== game[8].value)   && game[2].value !== ""){
            alert('you win!')
        }else if ((game[1].value === game[4].value && game[4].value=== game[7].value)   && game[1].value !== ""){
            alert('you win!')
        }else if ((game[6].value === game[4].value && game[4].value=== game[2].value)   && game[2].value !== ""){
            alert('you win!')
        }
        // console.log(game)
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
        // console.log('hittttt')
        // renderGame()
    }

    const sendRoom = (e) => {
        e.preventDefault()
        socketRef.current = io.emit('joinRoom', "test")
        
    }

    const handleChange = (e) => {
        setRoom(e.target.value)
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
            <form onSubmit={sendRoom}>
                <input onChange={handleChange}/>
                <input type={'submit'}/>
            </form>

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