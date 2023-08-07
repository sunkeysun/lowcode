import { type ComponentMetaSchema } from '../../../../types'

const componentName = 'Button'
export const Button: ComponentMetaSchema = {
  componentName,
  title: '按钮',
  props: [
    {
      name: 'htmlType',
      title: {
        label: '原生类型',
        tip: '这是原生类型',
      },
      setter: {
        componentName: 'RadioGroupSetter',
        props: {
          options: [
            {
              label: '提交',
              value: 'submit',
            },
            {
              label: '重置',
              value: 'reset',
            },
            {
              label: '按钮',
              value: 'button',
            },
          ],
        },
      },
    },
    {
      name: 'isOk',
      title: {
        label: '是否ok',
        tip: '这是原生类型',
      },
      setter: 'BoolSetter',
    },
    {
      name: 'object',
      title: {
        label: '对象标题',
      },
      setter: {
        componentName: 'ObjectSetter',
        props: {
          config: {
            items: [
              {
                name: 'label',
                title: '标题',
                setter: 'StringSetter',
              },
              {
                name: 'isOpen',
                title: '是否开启',
                setter: 'BoolSetter',
              },
              {
                name: 'type',
                title: '开启类型',
                setter: {
                  componentName: 'SelectSetter',
                  props: {
                    options: [
                      {
                        label: '部分开启',
                        value: 'partial',
                      },
                      {
                        label: '全部开启',
                        value: 'all',
                      },
                    ]
                  },
                },
              },
            ],
          },
        },
      },
    },
    {
      name: 'array',
      title: {
        label: '数组设置',
      },
      setter: {
        componentName: 'ArraySetter',
        props: {
          itemSetter: {
            componentName: 'ObjectSetter',
            props: {
              config: {
                items: [
                  {
                    name: 'name',
                    title: '姓名',
                    setter: 'StringSetter',
                  },
                  {
                    name: 'age',
                    title: '年龄',
                    setter: 'NumberSetter',
                  }
                ],
              },
            },
            initialValue: {
              name: '我的姓名',
              age: '我的年龄',
            },
          },
        },
      },
    }
  ],
  snippets: [
    {
      title: '提交按钮',
      schema: {
        componentName,
        props: {
          htmlType: 'submit',
          isOk: true,
        },
      },
    },
    {
      title: '提交按钮',
      schema: {
        componentName,
        props: {
          htmlType: 'reset',
          isOk: false,
        },
      },
    },
  ],
}
