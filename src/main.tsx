import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FADE_OUT_TIME } from './common/constants'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

document.documentElement.style.setProperty('--fadeout-time', `${Math.floor(FADE_OUT_TIME / 1.1)}ms`)
