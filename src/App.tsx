import PageProvider from './store/PageProvider'
import Paging from './components/Paging'
import AllSymbols from './components/UI/AllSymbols'
import './App.css'

function App() {
  return (
    <PageProvider>
      <Paging />
      <AllSymbols />
    </PageProvider>
  )
}

export default App
