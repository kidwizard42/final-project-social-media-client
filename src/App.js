import './App.css';
import Login from './components/Login'
import Posts from './components/Posts'
import GuessingGame from './components/GuessingGame'
import TicTacToe from './components/ticTacToe/TicTacToe';
// import OnlineTicTacToe from './components/OnlineTicTacToe/GameBoard';

function App() {
  return (<>
  <h1><span className='arc'>ARC</span> <span>LEADERBOARD</span></h1>
    <div className='all-content'>
    
    <div className='leaderboard-and-social'>
    <div className='social'>
    
    <Posts/>
    </div>
    
    <div className='middleStuff'>
    <GuessingGame/>
    <Login/>
    </div>

    <div className='Tic'>
    <TicTacToe/>
    </div>
    
    </div>
    
    
    </div>
    </>);
}

export default App;