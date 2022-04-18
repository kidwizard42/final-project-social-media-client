import React, {useState, useContext, useCallback, useEffect} from 'react';
import {SocketContext} from '../context/socket';

function Login(props){
  const [username, setUsername] = useState('')
  const [msg, setMsg] = useState('')
  const [userNum, setUserNum] = useState(0)
  const socket = useContext(SocketContext);
  const [ chat, setChat ] = useState([])

  const handleChangeUsername = (e) => {
		setUsername(e.target.value )
	}

  const handleChangeMsg = (e) => {
    setMsg(e.target.value)
  }

	const onMsgSubmit = (e) => {
    e.preventDefault()
		socket.emit("message", msg, username)
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

  useEffect(() => { 
    socket.on("userNum", (num) => {
      setUserNum(num)
    })

  },[]) 
    
      
  useEffect(() => {
          // using once instead of .on in case I send too many listners and it stacks.s
      socket.once("message", (resMsg, resName) => {
        setChat([ ...chat,  {name: resName, message: resMsg}])
        // console.log('hit')
      })
          
  },[chat])
    
  
    return(
         <div className='chat'>
           <h3>Chat</h3>
            {renderChat()}
        <form onSubmit={onMsgSubmit}>

        <div>
        Choose your Username!
        <input onChange={handleChangeUsername} placeholder="if blank random name"/>
        </div>

        <div>
        Write your Message!
        <input onChange={handleChangeMsg} required/>
        </div>
       
        <input type="submit" />

        </form>
        Currently online: {userNum}
        </div>
        
        
    
    )
}


export default Login