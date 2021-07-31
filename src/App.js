import PageProvider from './store/PageProvider'
import Paging from './components/Paging'
import './fonts/DejaVu-Sans-fontfacekit/fontface.css'
import './App.css'

function App() {
  return (
    <PageProvider>
      <Paging />
    </PageProvider>
  )
}

export default App
