import PageProvider from './store/PageProvider'
import Paging from './components/Paging'
import ShieldSymbols from './components/UI/ShieldSymbols'
import { NavSymbols, PlainSymbols } from './components/UI/NavSymbols'
import { ScreenFitSymbols } from './components/tips/ScreenFitSymbols'
import './App.css'

function App() {
  return (
    <PageProvider>
      <Paging />
      <ShieldSymbols />
      <NavSymbols />
      <PlainSymbols />
      <ScreenFitSymbols />
    </PageProvider>
  )
}

export default App
