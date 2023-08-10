import { forwardRef, Children } from 'react'

export const Slot = forwardRef<HTMLDivElement>(
  ({ children }: { children?: React.ReactNode }, ref) => {
    if (Children.toArray(children)?.length > 0) return children

    return (
      <div
        ref={ref}
        style={{ minWidth: 20, minHeight: 20, backgroundColor: 'grey' }}
      >
        Slot
      </div>
    )
  },
)
