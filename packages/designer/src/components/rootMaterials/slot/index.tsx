import { forwardRef } from 'react'

export const Slot = forwardRef(({ children }, ref) => {
  console.log(children, '123')
  return (
    <div ref={ref} style={{ width: 30, height: 30, backgroundColor: 'grey' }}>
      {children}
    </div>
  )
})
