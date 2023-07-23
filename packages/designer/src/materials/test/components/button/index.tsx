import { forwardRef } from 'react'

export const Button = forwardRef(({ children }: { children: string }, ref) =>{
  return <button ref={ref}>按钮</button>
})
