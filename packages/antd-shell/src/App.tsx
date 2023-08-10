import { DesignerProvider, Designer } from '@lowcode/core'
import { Designer as DesignerComponent } from './components/designer/Designer'

const designer = new Designer()

function App() {
  return (
    <DesignerProvider designer={designer}>
      <DesignerComponent />
    </DesignerProvider>
  )
}

export default App
