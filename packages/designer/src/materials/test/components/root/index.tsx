import { forwardRef } from 'react'

export const Root = forwardRef(
  (
    {
      children,
      title,
    }: {
      children: React.ReactNode
      title: string
    },
    ref,
  ) => {
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
        <div style={{
          border: '1px solid',
          height: '100%',
        }}>
          {children}
        </div>
      </div>
    )
  },
)
