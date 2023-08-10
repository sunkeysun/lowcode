import React, { createContext } from 'react'
import { Provider } from 'react-redux'
import { Designer } from '..'

export const DesignerContext = createContext<Designer | null>(null)

export const DesignerProvider = ({
  children,
  designer,
}: {
  children: React.ReactNode
  designer: Designer
}) => {
  if (!designer) {
    console.warn('designer not exist.')
    return null
  }

  return (
    <DesignerContext.Provider value={designer}>
      <Provider store={designer.store}>{children}</Provider>
    </DesignerContext.Provider>
  )
}
