import { forwardRef } from 'react'

export const Button = forwardRef(
  (
    {
      htmlType,
      isOk,
      object,
      slot,
      ...restProps
    }: { htmlType: string; isOk: boolean; object: any; slot: React.ReactNode },
    ref,
  ) => {
    console.log(object, restProps, '000000000000000')

    if (htmlType === 'submit') {
      return (
        <p ref={ref} onClick={() => {}} style={{ marginRight: 50 }}>
          {htmlType}按钮x{String(isOk)}
        </p>
      )
    }
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
