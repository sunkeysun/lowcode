import { forwardRef, useEffect } from 'react'

export const Root = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode
    title: string
  }
>(({ children, title }, ref) => {
  useEffect(() => {
    console.log('123')
  }, [])
  return (
    <div
      ref={ref}
      style={{
        width: 400,
        height: 400,
        padding: 80,
        boxSizing: 'border-box',
        background: 'lightblue',
      }}
    >
      {title}
      <div
        style={{
          border: '1px solid',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  )
})
