import { useState } from 'react'
import Game from './components/game/Game'
import Animation from './components/Animation'
import './App.css'

function App() {
  const [play, setPlay] = useState(false)
  const goToGame = () => {
    setPlay(true)
  }

  return <>{play ? <Game /> : <Animation onEnd={goToGame} />}</>
}

export default App
