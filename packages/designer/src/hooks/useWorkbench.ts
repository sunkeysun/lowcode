import { useEffect, useRef } from 'react'
import { useDesigner } from './useDesigner'

let workbench  = null

export function useWorkbench() {
  const ref = useRef<HTMLDivElement>(null)
  const { designer } = useDesigner()

  useEffect(() => {
    if (ref.current && designer && !workbench) {
      workbench = designer.shell.createWorkbench(ref.current)
    }
    return () => {
      // workbench && workbench.destroy()
    }
  }, [])

  return { ref }
}
