import { useState } from 'react'
import Animation from './components/Animation'
import './App.css'

function App() {
  const [play, setPlay] = useState(false)
  const goToGame = () => {
    setPlay(true)
  }

  return <>{!play && <Animation onEnd={goToGame} />}</>
}

export default App
