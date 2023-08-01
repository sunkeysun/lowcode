import { forwardRef } from 'react'

export const FormItem = forwardRef(({ children }, ref) => {
  return <div ref={ref} style={{ height: 20, background: 'yellow' }}>表单项目</div>
})
