import React, { useEffect, useRef, useState } from "react"
import axios from 'axios'
const localHostJavaBackend = "http://localhost:8080/";
const herokuJavaBackend = "https://pacific-journey-81010.herokuapp.com/";

const PostGame = (props) => {
    const [user, setUser]=useState('')

    const handleUser = (e) => {
        setUser(e.target.value)
    }

    const getLeaderboard = async() => {
        const res =  await axios.get(herokuJavaBackend+props.post,{
        auth: {
            username: 'blah',
            password: 'blah'
          }
       })
    }

    // NEED TO STORE SCORE IN PROPS SO YOU CAN PROGRAM DYNAMICALLY
    const submitScore = async(e) => {
        e.preventDefault()
        const res =  await axios.post(herokuJavaBackend+props.post,{
            username:user,
            score:props.score
        },{
        auth: {
            username: 'blah',
            password: 'blah'
          }
       })
      await props.getLeaderboard()
      await props.renderLeaderboard()
    }


    
    return(<div>
        <form onSubmit={submitScore}>
            <p>NEW SCORE!!</p>
            Enter your userName! <input onChange={handleUser}/>
            <br></br>
            <input type={"submit"}/>
        </form>
    </div>)
}
export default PostGame