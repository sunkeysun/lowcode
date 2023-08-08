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
      name: 'json',
      title: {
        label: 'json数据',
        tip: '这是原生类型',
      },
      setter: 'JsonSetter'
    },
    {
      name: 'slot',
      title: '自定义插槽',
      setter: {
        componentName: 'SlotSetter',
        props: {},
        defaultValue: {
          type: 'JSSlot',
          value: [],
        },
      },
    },
    {
      name: 'function',
      title: '自定义函数',
      setter: {
        componentName: 'FunctionSetter',
        props: {},
        defaultValue: {
          type: 'JSFunction',
          value: '',
        },
      },
    },
    {
      name: 'expression',
      title: '自定义表达式',
      setter: {
        componentName: 'ExpressionSetter',
        props: {},
        defaultValue: {
          type: 'JSExpression',
          value: '',
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
      display: 'block',
      title: '对象标题',
      setter: {
        componentName: 'ObjectSetter',
        props: {
          config: {
            items: [
              {
                name: 'label',
                title: { label: '标题' },
                setter: 'StringSetter',
              },
              {
                name: 'isOpen',
                title: { label: '是否开启' },
                setter: 'BoolSetter',
              },
              {
                name: 'type',
                title: { label: '开启类型' },
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
              {
                name: 'typeObj',
                display: 'block',
                title: { label: '类型对象' },
                setter: {
                  componentName: 'ObjectSetter',
                  props: {
                    config: {
                      items: [
                        {
                          name: 'div',
                          title: { label: 'DIV' },
                          setter: 'StringSetter',
                        },                        
                      ],
                    },
                  },
                },
              }
            ],
          },
        },
      },
    },
    {
      name: 'array',
      display: 'block',
      title: '数组设置',
      setter: {
        componentName: 'ArraySetter',
        props: {
          itemSetter: {
            componentName: 'ObjectSetter',
            props: {
              forceInline: 1,
              config: {
                items: [
                  {
                    name: 'name',
                    title: { label: '姓名' },
                    setter: 'StringSetter',
                    isRequired: true,
                  },
                  {
                    name: 'age',
                    title: { label: '年龄' },
                    setter: 'NumberSetter',
                  },
                  {
                    name: 'sex',
                    title: { label: '性别' },
                    setter: {
                      componentName: 'RadioGroupSetter',
                      props: {
                        options: [
                          { label: '男', value: 'male' },
                          { label: '女', value: 'female' },
                        ],
                      },
                    },
                  },
                ],
              },
            },
            defaultValue: {
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
