import React from 'react'
import Board from './Board/Board'
import './App.css'

function App() {
  const [win, setWin] = React.useState(false)


  return (
    <div className={(win) ? "App win" : "App"}>
      <div className="winBg"></div>
      <div className="second-bg">
        <div className="game">
          <h1>Light<span>s</span> Out!</h1>
          <Board winHandler={(setTo: boolean) => {setWin(setTo)}} />
        </div>
      </div>
    </div>
  )
}

export default App