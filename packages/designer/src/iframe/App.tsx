import { Provider } from 'react-redux'
import { Content } from './Content'

export function App() {
  const win = window as any

  if (!win.designer) {
    return null
  }

  return (
    <Provider store={win.designer.store}>
      <div style={{ padding: 50 }}>
        <Content />
      </div>
    </Provider>
  )
}
