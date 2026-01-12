import PageProvider from './store/PageProvider'
import PageRoot from './components/PageRoot'
import AllSymbols from './components/UI/AllSymbols'
import './App.css'

function App() {
  return (
    <PageProvider>
      <>
        <PageRoot />
        <AllSymbols />
      </>
    </PageProvider>
  )
}

export default App
