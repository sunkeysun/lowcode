import { useState, useEffect, useRef } from 'react'
import { useDesigner } from './useDesigner'

export function useWorkbench() {
  const ref = useRef<HTMLElement>(null)
  const { designer } = useDesigner()
  let workbench = null

  useEffect(() => {
    let workbench = null
    if (ref.current && designer) {
      workbench = designer.shell.createWorkbench(ref.current)
    }
    return () => workbench.destroy()
  }, [designer])

  return { containerRef }
}
