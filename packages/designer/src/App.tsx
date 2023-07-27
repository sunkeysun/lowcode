import { Workbench } from './components/Workbench'
import { IframeCanvas } from './components/IframeCanvas'
import { DesignerProvider } from './context/DesignerContext'
import { Designer } from '.'
import { LC_DESIGNER } from './common/constants'

const designer = new Designer()
window[LC_DESIGNER] = designer

function App() {
  return (
    <DesignerProvider designer={designer}>
      <div>
        <Workbench />
        <IframeCanvas />
      </div>
    </DesignerProvider>
  )
}

export default App
