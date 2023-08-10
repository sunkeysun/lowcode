import { ComponentTree } from './ComponentTree'
import { LC_DESIGNER, DesignerProvider } from '@lowcode/core'

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
