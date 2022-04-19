import './App.css';
import {useState, useEffect, useRef} from 'react'
import Login from './components/Login'
import Posts from './components/Posts'
import GuessingGame from './components/GuessingGame'
import TicTacToe from './components/ticTacToe/TicTacToe';
import io from "socket.io-client"

// socket global
import {SocketContext, socket} from './context/socket';

// MUI STUFF
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height:900,
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
  return (<>
  <h1><span className='arc'>ARC</span> <span>ARCADE</span></h1>
{/* ALL MUI EXPLANATION */}
  <div>
      <Button size="large" variant="contained" color="success" onClick={handleOpen}>OVERVIEW OF APP</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* IMPORTANT!!! If posts and leaderboard are NOT populated then
           please wait 30 seconds for the site to load. (heroku hosting default).
          <hr></hr>
          <br></br> */}

          <Typography id="modal-modal-title" variant="h6" component="h2">
          TicTacToe:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             1. You need a friend's laptop or open another tab/browser. 
            <br></br>
            2. type in whatever you want in the input and press submit for both screens.
            When both screens have submitted the same thing the game 
            will begin. Enjoy! <br></br>
            <hr></hr>
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Posts:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Full CRUD for posts using java/spring boot. Feel free to make your own or edit another
          </Typography>
          <hr></hr>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Chat:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Instant messaging! Use with a friend's laptop or open another tab/browser.
            Keeps track of how many people are online. You can either pick a name or leave
            that input blank for a random name.
            <hr></hr>
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          GuessingGame:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Guess a number from 1-10. Like arcade games, if you are in the top 15 of scores
            you can put your name and it will automatically update the leaderboard!
            <hr></hr>
          </Typography>
          
        </Box>
      </Modal>
    </div>

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
 
    <div>
    <h2>Multiplayer TicTacToe</h2>
    <div className='Tic'>
    <TicTacToe socket={socket}/>
    </div>
    </div>
    </SocketContext.Provider>
    
    </div>
    
    
    </div>
    </>);
}

export default App;