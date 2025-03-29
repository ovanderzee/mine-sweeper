import PageProvider from './store/PageProvider'
import Paging from './components/Paging'
import './App.css'

function App() {
  return (
    <PageProvider>
      <Paging />
    </PageProvider>
  )
}

export default App
