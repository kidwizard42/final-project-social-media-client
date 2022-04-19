import React, {useState, useContext, useCallback, useEffect, useRef} from 'react';
import {SocketContext} from '../../context/socket'
import Square from './Square'
import './TicTacToe.css'
import '../../App.css'


const TicTacToe = (props) => {
    // const [isX, setIsX] = useState(null)
    const [playerValue, setPlayervalue] = useState('')
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
    const [room, setRoom] = useState("")
    const socket = useContext(SocketContext)
    const [gameStart, setGameStart] = useState(false)
    const [turn, setTurn] = useState(false)
    const [loser ,setLoser] = useState(null)
    const [winner, setWinner] = useState(null)

    // ref to keep track of the submitted room. for the game
    let roomSubmit = useRef()
    // counter exists to get the component to rerender
    const [counter, setCounter] = useState(0)
    // const [ticTacGame, setTicTacGame] = useState({})

    const clickedSpot =  (newGameState) => {
        
        setGame(p => newGameState)
        setTurn(false)
        setCounter(prev => prev+1)
        checkWin(newGameState)
    }
   
    const checkWin = (newGameState) => {
        
       
        if((game[0].value === game[1].value && game[1].value=== game[2].value) && game[0].value !== ""  ){
            if(game[0].value == playerValue){
                socket.emit('gameOver', roomSubmit.current, true, newGameState)
            }else{
                    console.log('you lose')
                }
        } else if ((game[3].value === game[4].value && game[4].value=== game[5].value) && game[3].value !== ""  ){
            if(game[3].value == playerValue){
                socket.emit('gameOver', roomSubmit.current, true, newGameState)
                setWinner(true)
            }else{
                    socket.emit('gameOver', roomSubmit.current, false, newGameState)
                    setLoser(true)
                }
        }else if ((game[6].value === game[7].value && game[7].value=== game[8].value) && game[6].value !== ""  ){
            if(game[6].value == playerValue){
                socket.emit('gameOver', roomSubmit.current, true, newGameState)
                setWinner(true)
            }else{
                    socket.emit('gameOver', roomSubmit.current, false, newGameState)
                    setLoser(true)
                }
        }else if ((game[0].value === game[4].value && game[4].value=== game[8].value) && game[0].value !== ""  ){
            if(game[0].value == playerValue){
                socket.emit('gameOver', roomSubmit.current, true, newGameState)
                setWinner(true)
            }else{
                    socket.emit('gameOver', roomSubmit.current, false, newGameState)
                    setLoser(true)
                }
        }else if ((game[0].value === game[3].value && game[3].value=== game[6].value) && game[0].value !== ""  ){
            if(game[0].value == playerValue){
                socket.emit('gameOver', roomSubmit.current, true, newGameState)
                setWinner(true)
            }else{
                    socket.emit('gameOver', roomSubmit.current, false, newGameState)
                    setLoser(true)
                }
        }else if ((game[2].value === game[5].value && game[5].value=== game[8].value) && game[2].value !== ""  ){
            if(game[2].value == playerValue){
                socket.emit('gameOver', roomSubmit.current, true, newGameState)
                setWinner(true)
            }else{
                    socket.emit('gameOver', roomSubmit.current, false, newGameState)
                    setLoser(true)
                }
        }else if ((game[1].value === game[4].value && game[4].value=== game[7].value) && game[1].value !== ""  ){
            if(game[1].value == playerValue){
                socket.emit('gameOver', roomSubmit.current, true, newGameState)
                setWinner(true)
            }else{
                    socket.emit('gameOver', roomSubmit.current, false, newGameState)
                    setLoser(true)
                }
        }else if ((game[6].value === game[4].value && game[4].value=== game[2].value) && game[6].value !== ""  ){
            if(game[6].value == playerValue){
                socket.emit('gameOver', roomSubmit.current, true, newGameState)
                setWinner(true)
            }else{
                    socket.emit('gameOver', roomSubmit.current, false, newGameState)
                    setLoser(true)
                }
        } else{
            socket.emit('play', roomSubmit.current, newGameState)
        }
    }
   const renderGame= () => {
   
    return(
        
        game.map((g,i) => {
           return( 
            <div className="cell" key={i}>
                {/* Nested ternary. if gamestart is true & turn is not show the squares but have a dummy function
                ( click event). if gamestart and turn are true show squares and have the click function availible */}
                {gameStart? turn?<Square
                clickedSpot={clickedSpot}
                num={g.num} 
                value={g.value}
                playerValue={playerValue}
                isClicked={g.isClicked}
                game={game}/> : <Square
                clickedSpot={() => {}}
                num={g.num} 
                value={g.value}
                playerValue={playerValue}
                isClicked={g.isClicked}
                game={game}/>   : ""}
                 
            </div>
           )
        })
    )
   }

    
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
        // setRoom("")
        setGameStart(false)
        setTurn(false)
        setLoser(null)
        setWinner(null)
    }

    const sendRoom = (e) => {
        e.preventDefault()
        socket.emit('joinRoom', room)
        roomSubmit.current = room
    }

    const handleChange = (e) => {
        setRoom(e.target.value)
    }

    useEffect(() => {
        socket.on('res', (res) => {
            console.log(res)
        })
        socket.on(`isReady`, (res, boolean) => {
            setPlayervalue(res.player)
            setGameStart(true)
            setTurn(boolean)
        })
        socket.on('gameState',  (updatedGame) => {
            setGame(updatedGame)
            setTurn(true)
            setCounter(prev => prev+1)   
        })

        socket.on('loser',  (updatedGame) => {
            setGame(updatedGame)
            setTurn(false)
            setCounter(prev => prev+1) 
            setLoser(true)
        })

        socket.on('winner',  (updatedGame) => {
            setGame(updatedGame)
            setTurn(false)
            setCounter(prev => prev+1) 
            setWinner(true)
        })

        return () => {
            socket.off('res', (res) => {

            })

            socket.off(`isReady`,  (res) =>{
                // setGameStart(false)
            })

            socket.off(`gameState`,  (res) =>{
               
            })
        }
       
    },[])

    return(
        <>
        
        {loser ?
            <div className="loser">
                
            {renderGame()}
            <span className='black' >{gameStart ? `YOU LOSE!`: 'No game yet'}</span>
            <button onClick={resetGame}>Restart</button>
            <form onSubmit={sendRoom}>
                {/* <input onChange={handleChange} />
                <input type={'submit'}/> */}
            </form> 
            <span className='black'>Press restart, then type in a NEW room for a new game!</span>

            </div> :  winner ?  
                <div className="winner">
                
                {renderGame()}
                <span className='black' >{gameStart ? `YOU WIN! `: 'No game yet'}</span>
                <button onClick={resetGame}>Restart</button>
                <form onSubmit={sendRoom}>
                    {/* <input onChange={handleChange} />
                    <input type={'submit'}/> */} 
                </form> 
                <span className='black'>Press restart, then type in a NEW room for a new game!</span>

                </div>
                : <div className="canvas-tic-tac-toe">
                
                {renderGame()}
                {gameStart ?  <span className='gameStatus'>Game begins you are player {playerValue}</span>: <span className='gameStatus'>NO GAME YET</span>}
                {/* <button onClick={() => {}}>Restart</button> */}
                <form onSubmit={sendRoom}>
                Type the same input for both players here: <input onChange={handleChange}/>
                    <input type={'submit'}/>
                </form> 
                
    
                </div>
         } 
        {/* <h3>TicTacToe</h3> */}
          
        
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