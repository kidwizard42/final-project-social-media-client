import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import io from "socket.io-client"

function Login(){

    const [username, setUsername] = useState('')
    const [msg, setMsg] = useState('')
    const [ chat, setChat ] = useState([])
    const socketRef = useRef()
    const [userNum, setUserNum] = useState(0)


    const handleChangeUsername = (e) => {
		setUsername(e.target.value )
	}

    const updateNumOfUsers = (num) => {
        setUserNum(num)
    }

    const handleChangeMsg = (e) => {
        setMsg(e.target.value)
    }

	const onMsgSubmit = (e) => {
    e.preventDefault()
		socketRef.current.emit("message", msg, username)
    e.target.reset()
		setMsg("")
	}

	const renderChat = () => {
		return chat.map(( message , index) => (
			<div className="entireChat" key={index}>
				<p className="message">
					<span><strong> {message.name}</strong> </span>: <span>{message.message}</span>
				</p>
			</div>
		))
	}

    useEffect(
        () => {
          socketRef.current = io.connect("http://localhost:3003")
          socketRef.current.on("userNum", (num) => {
            setUserNum(num)
          })
          
          return () => socketRef.current.disconnect()
        },
        []
        )
      
    useEffect(() => {
          // using once instead of .on in case I send too many listners and it stacks.s
          socketRef.current.once("message", (resMsg, resName) => {
            setChat([ ...chat,  {name: resName, message: resMsg}])
          })

    },[chat])
//     useEffect(() => {
//         // using once instead of .on in case I send too many listners and it stacks.s
//         socketRef.current.once("userNum", (num) => {
//           setUserNum(num)
//         })

//   },[chat])
    return(<>
         <div>
            {renderChat()}
        <form onSubmit={onMsgSubmit}>

        <div>
        Choose your Username!
        <input onChange={handleChangeUsername} required/>
        </div>

        <div>
        Write your Message!
        <input onChange={handleChangeMsg} required/>
        </div>
       
        <input type="submit" />

        </form>
        Currently online: {userNum}
        </div>
        
    
    </>)
}


export default Login