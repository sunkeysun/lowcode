import { forwardRef } from 'react'

export const Button = forwardRef(({ children }: { children: string }, ref) =>{
  return <button ref={ref} onClick={() => {}}>按钮</button>
})
