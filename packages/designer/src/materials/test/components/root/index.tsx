import { forwardRef } from 'react'

export const Root = forwardRef(({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}, ref) => {
  return (
    <div ref={ref} style={{ width: 300, height: 300, background: 'lightblue'}}>
      {title}
      {children}
    </div>
  )
})
