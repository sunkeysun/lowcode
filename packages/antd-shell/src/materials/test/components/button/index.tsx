import { forwardRef } from 'react'

export const Button = forwardRef<
  HTMLButtonElement,
  { htmlType: string; isOk: boolean; object: any; slot: React.ReactNode }
>(({ htmlType, slot }, ref) => {
  return (
    <div>
      <button
        ref={ref}
        onClick={() => {
          /**/
        }}
        style={{ marginRight: 50 }}
      >
        {htmlType}按钮
      </button>
      {slot}
    </div>
  )
})
