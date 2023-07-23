import React, { createContext } from 'react'
import { Provider } from 'react-redux'
import { Designer } from '..'
const designer = new Designer()

export const DesignerContext = createContext<Designer | null>(null)

export const DesignerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <Provider store={designer.store}>
      <DesignerContext.Provider value={designer}>
        {children}
      </DesignerContext.Provider>
    </Provider>
  )
}
