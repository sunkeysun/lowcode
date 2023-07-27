import { ComponentTree } from './ComponentTree'
import { DesignerProvider } from '../context/DesignerContext'
import { LC_DESIGNER } from '../common/constants'

export function App() {
  const designer = window[LC_DESIGNER]

  if (!designer) {
    return null
  }

  return (
    <DesignerProvider designer={designer}>
      <div style={{ padding: 50 }}>
        <ComponentTree />
      </div>
    </DesignerProvider>
  )
}
