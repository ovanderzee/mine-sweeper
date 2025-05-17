import PageProvider from './store/PageProvider'
import Paging from './components/Paging'
import Symbols from './components/UI/Symbols'
import './App.css'

function App() {
  return (
    <PageProvider>
      <Paging />
      <Symbols />
    </PageProvider>
  )
}

export default App
