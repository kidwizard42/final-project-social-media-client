import React, { useEffect, useRef, useState } from "react"
import PostGame from "./PostGame"
import axios from 'axios'
import '../App.css'

// loading screen
import PacmanLoader from "react-spinners/PacmanLoader";


const herokuJavaBackend = "https://pacific-journey-81010.herokuapp.com/"


const GuessingGame = () => {
    const [num, setNum] = useState(0)
    const [guess, setGuess]= useState(0)
    const [numOfTries, setNumOfTries]=useState(0)
    const [leaderboardData, setLeaderBoardData] = useState([])
    const [gameData, setGameData] = useState({})
    const [showGamePost,setShowGamePost] = useState(false)
    const [guessMsg, setGuessMsg]=useState('')
    
   const [loading, setLoading] = useState(true)
   
   
    
    const newNumber= () => {
        alert('New Game New Number!')
        setNum( Math.ceil(Math.random()*10))
        setNumOfTries(0)
        setShowGamePost(false)
        setGuessMsg("")
        // console.log(num)
    }
    const checkGuess = (e) => {
        e.preventDefault()
        setNumOfTries(int => int+1 )
        if(guess ==num){
            // alert('You win!!!')
            setShowGamePost(true)
            setGuessMsg("Game Over")

        }else if (guess < num){
            
            // alert("try higher")
            // guessMsg= "try higher"
            setGuessMsg("try a higher number")
            
        }else{
            // alert("try lower")
            // guessMsg= "try lower"
            setGuessMsg("try a lower number")
        }
    }
    const updateGuess = (e) => {
        setGuess(e.target.value) 
    }

    const getLeaderboard = async() => {
        const res =  await axios.get(herokuJavaBackend+'guessingGameTop',{
        auth: {
            username: 'blah',
            password: 'blah'
          }
       })
       setLeaderBoardData(res.data)
    }

    const renderLeaderboard = () => {
       return leaderboardData.map((data, index) => {
           return (<div key={index}>
               <div> <span className="usernameSpan"> {data.username}</span> <span> _______ </span>
                 <span className="scoreSpan">Guess Number: {data.score} </span></div>
           </div>)
       })
    }
    const renderBoardMessage = () => {
        return(
            <div className="makeM">
                {guessMsg}
            </div>
        )
    }

    // useEffect(() => {
    //     getLeaderboard()
    // },[])

    useEffect(  () => {

        const loading = async()  => {
            const load = await getLeaderboard()
    
         }
         loading()
         setLoading(false)
    
       return () => {
    
       }
     },[])

    return(
        <>
        { loading? ""
        :
        <div className="GuessingGame">
        <div className="leaderboard">
            <h3>Guessing Game LeaderBoard Top 15</h3>
            {renderLeaderboard()}
            {renderBoardMessage()}
        </div>

        <form onSubmit={checkGuess}>
        <input type="number" onChange={updateGuess}/>
        <input type={"submit"}/>

        </form>
        <button onClick={newNumber}>Start/New Game</button>
         Number of tries! {numOfTries}

        {showGamePost? <PostGame post={'guessingGame'} get={'guessingGameTop'} 
         score={numOfTries} getLeaderboard={getLeaderboard} renderLeaderboard={renderLeaderboard}/> : null}
    </div>
     }
     </>
    
    )
}
export default GuessingGame