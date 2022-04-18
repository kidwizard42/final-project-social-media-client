import './App.css';
import {useState, useEffect, useRef} from 'react'
import Login from './components/Login'
import Posts from './components/Posts'
import GuessingGame from './components/GuessingGame'
import TicTacToe from './components/ticTacToe/TicTacToe';
import io from "socket.io-client"

// socket global
import {SocketContext, socket} from './context/socket';


// import OnlineTicTacToe from './components/OnlineTicTacToe/GameBoard';

const herokuSiteSocket = "https://floating-reaches-19985.herokuapp.com/";
const localhostSocket = "http://localhost:3003/";
const localHostJavaBackend = "http://localhost:8080/";
const herokuJavaBackend = "https://pacific-journey-81010.herokuapp.com/"



function App() {
  // const socketRef = useRef()
  

  // useEffect(
  //   () => {
  //     socket = io.connect(localhostSocket)
  //     socket.on("userNum", (num) => {
  //       setUserNum(num)
  //       // console.log(socketRef)
  //     })
      
  //     return () => socket.disconnect()
  //   },
  //   []
  //   )
  return (<>
  <h1><span className='arc'>ARC</span> <span>LEADERBOARD</span></h1>
    <div className='all-content'>
    
    <div className='leaderboard-and-social'>
    <div className='social'>
    
    <Posts/>
    </div>
    
    <SocketContext.Provider value={socket}> 
    <div className='middleStuff'>
    <GuessingGame/>
    <Login/>
    </div>
 
    <div className='Tic'>
    <TicTacToe socket={socket}/>
    </div>
    </SocketContext.Provider>
    
    </div>
    
    
    </div>
    </>);
}

export default App;