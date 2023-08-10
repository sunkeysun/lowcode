import { useSelector } from 'react-redux'
import { useDesigner } from './useDesigner'

export function useMaterialComponentByName(componentName: string) {
  const { designer } = useDesigner()
  const Component = useSelector(() =>
    designer?.material.getComponentByName(componentName),
  ) as React.FC<{
    children: React.ReactNode
    ref: React.RefObject<HTMLElement>
  }>

  return { Component }
}
