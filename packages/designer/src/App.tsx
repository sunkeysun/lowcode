import { DesignerProvider } from './context/DesignerContext'
import { Designer } from './components/designer/Designer'
import { Designer as Engine } from '.'
import { LC_DESIGNER } from './common/constants'

const designer = new Engine()
window[LC_DESIGNER] = designer

function App() {
  return (
    <DesignerProvider designer={designer}>
      <Designer />
    </DesignerProvider>
  )
}

export default App
