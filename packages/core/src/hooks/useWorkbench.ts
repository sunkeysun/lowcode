import { useEffect, useRef } from 'react'
import { useDesigner } from './useDesigner'
import { Workbench } from '../core/shell/Workbench'

export function useWorkbench() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const workbenchRef = useRef<Workbench>()
  const { designer } = useDesigner()

  useEffect(() => {
    if (containerRef.current && designer && !workbenchRef.current) {
      workbenchRef.current = designer.shell.createWorkbench(
        containerRef.current,
      )
    }
  }, [designer])

  return { containerRef }
}
