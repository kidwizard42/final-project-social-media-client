import React, { useEffect, useRef, useState } from "react"
import './TicTacToe.css'
import Square from './Square'
import io from "socket.io-client"

const localhostSocket = "http://localhost:3003/";

const TicTacToe = () => {
    const [playerValue,setPlayerValue] = useState('')
    const [room, setRoom] = useState('')
    const socketRef = useRef()

    const [game, setGame]=useState([])
    // ROOM FUNCTIONS THAT MAY NEED TO BE CHANGED
    // const setTicTacToeRoom = (e) => {
    //     setRoom(e.target.value)
    //     // console.log(room)
    // }

    // const goToRoom =  (e) => {
    //     e.preventDefault()
    //     socketRef.current?.emit('new-room', room, () => {
    //         console.log('testing callback')
    //     })

    //     socketRef.current?.on(room, () => {
    //         console.log('client is listening')
    //     })
    // }
    // useEffect(() => {
        
    // },[room])


    const clickedSpot = async (num,data) => {
        // console.log(isClicked)
        // if(isClicked){

        // }else{
        //     console.log(num)
        // }    
        game[num] = data
       await socketRef.current.emit('ticTac', game)
    }

    useEffect(
        () => {
          socketRef.current = io.connect(localhostSocket)
        //   socketRef.current.on("userNum", (num) => {
        //     setUserNum(num)
        //   })
          
          return () => socketRef.current.disconnect()
        },
        []
        )

    useEffect(() => {
        socketRef.current.on('ticTac', (gameState,mst) => {
            setGame(gameState)
            console.log(mst)
            renderGame()
        })
    },[game])

        
    const renderGame = () => {
       
        return(
            game.map((cell, index) => {

                return(<div key={index}>
                    <Square 
                        clickedSpot={clickedSpot} 
                        num={index}
                        playerValue={"x"} 
                        value={cell.value}
                        isClicked={cell.isClicked}
                    />
                </div>
                    
                )
                
            })


            
        )
    }
    return(<div>

        <h3>Tic Tac Toe</h3>
        
        {renderGame()}

    </div>)
}
export default TicTacToe


// render game w form for rooms   WRAP IN A DIV IF I USE AGAIN
{/* <form onSubmit={goToRoom}>
                    <input onChange={setTicTacToeRoom}/>
                    <input type="submit"/>
                </form>
            <div className="canvas-tic-tac-toe">
                
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