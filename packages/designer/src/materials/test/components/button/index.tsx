import { forwardRef } from 'react'

export const Button = forwardRef(
  (
    {
      htmlType,
      isOk,
      slot,
    }: { htmlType: string; isOk: boolean; object: any; slot: React.ReactNode },
    ref,
  ) => {
    return (
      <div>
        <button ref={ref} onClick={() => {}} style={{ marginRight: 50 }}>
          {htmlType}按钮
        </button>
        {slot}
      </div>
    )
  },
)
