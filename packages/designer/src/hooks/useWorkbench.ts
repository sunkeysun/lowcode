import { useEffect, useRef } from 'react'
import { useDesigner } from './useDesigner'
import { type Workbench } from '../shell/Workbench'

export function useWorkbench() {
  const containerRef = useRef<HTMLDivElement>(null)
  const designer = useDesigner()

  useEffect(() => {
    let workbench: Workbench | null = null
    if (containerRef.current && designer) {
      workbench = designer.shell.createWorkbench(containerRef.current)
    }
    return () => {
      workbench && workbench.destroy()
    }
  }, [])

  return { containerRef }
}
