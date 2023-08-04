import { forwardRef } from 'react'

export const Button = forwardRef(({ htmlType }: { htmlType: string }, ref) =>{
  return <button ref={ref} onClick={() => {}} style={{ marginRight: 50 }}>{htmlType}按钮</button>
})
