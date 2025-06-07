import PageProvider from './store/PageProvider'
import Paging from './components/Paging'
import ShieldSymbols from './components/UI/ShieldSymbols'
import './App.css'

function App() {
  return (
    <PageProvider>
      <Paging />
      <ShieldSymbols />
    </PageProvider>
  )
}

export default App
