import { forwardRef } from 'react'

export const Input = forwardRef(
  (_, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <input ref={ref} />
  },
)
