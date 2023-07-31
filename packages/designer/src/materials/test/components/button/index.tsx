import { forwardRef } from 'react'

export const Button = forwardRef(({ text }: { text: string }, ref) =>{
  return <button ref={ref} onClick={() => {}} style={{ marginRight: 50 }}>{text}按钮</button>
})
