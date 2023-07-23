import { Workbench } from './components/Workbench'
import { IframeCanvas } from './components/IframeCanvas'
import { DesignerProvider } from './context/DesignerContext'

function App() {
  return (
    <DesignerProvider>
      <div>
        <Workbench />
        <IframeCanvas />
      </div>
    </DesignerProvider>
  )
}

export default App
