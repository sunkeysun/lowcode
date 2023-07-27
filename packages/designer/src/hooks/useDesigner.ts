import { useContext } from 'react'
import { DesignerContext } from '../context/DesignerContext'

export function useDesigner() {
  const designer = useContext(DesignerContext)
  return { designer }
}
