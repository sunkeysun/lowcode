import { useEffect, useRef } from 'react'
import { useDesigner } from './useDesigner'
import { type Workbench } from '../shell/Workbench'

let workbench: Workbench | null = null

export function useWorkbench() {
  const containerRef = useRef<HTMLDivElement>(null)
  const designer = useDesigner()

  useEffect(() => {
    if (containerRef.current && designer && !workbench) {
      workbench = designer.shell.createWorkbench(containerRef.current)
    }
    return () => {
      // workbench && workbench.destroy()
    }
  }, [])

  return { containerRef }
}
