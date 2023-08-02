import { forwardRef } from 'react'
import { FormItem } from '../form.item'

const Form = forwardRef(({ children }, ref) => {
  return <form ref={ref} style={{ width: 100, height: 100, background: 'green' }}>表单{children}</form>
})

;(Form as any).Item = FormItem

export { Form }
