export type FormValues = Record<string, any>

//校验规则类型
export interface FormRule {
  required?: boolean
  message?: string
  pattern?: RegExp
  min?: number
  max?: number
  validate?: (value: any) => boolean | Promise<boolean>
}

//表单字段配置
export interface FormFiled {
  name: string
  label?: string
  rules?: FormRule[]
  initialValue?: any
}

//Form组件的props类型
export interface FormProps {
  name?: string
  initialValues?: FormValues
  onFinish?: (values: FormValues) => void
  onFinishFailed?: (errors: FormValues) => void
  layout?: 'horizontal' | 'vertical' | 'inline'
  labelCol?: number | object //label宽度
  wrapperCol?: number | object //表单项宽度
  children?: React.ReactNode
  classNames?: string
  rule?: FormRule[]
}

//FormItem组件的props类型
export interface FormItemProps extends FormProps {
  defaultValue?: any
  required: boolean
}
