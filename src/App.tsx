import PageProvider from './store/PageProvider'
import Paging from './components/Paging'
import ShieldSymbols from './components/UI/ShieldSymbols'
import NavSymbols from './components/UI/NavSymbols'
import './App.css'

function App() {
  return (
    <PageProvider>
      <Paging />
      <ShieldSymbols />
      <NavSymbols />
    </PageProvider>
  )
}

export default App
