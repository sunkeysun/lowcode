import { forwardRef } from 'react'

export const Root = forwardRef(({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}, ref) => {
  return (
    <div ref={ref} style={{ width: 200, height: 200, background: 'lightblue'}}>
      {title}
      {children}
    </div>
  )
})
