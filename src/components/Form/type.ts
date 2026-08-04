// 表单值类型
export type FormValues = Record<string, any>

// 校验规则类型
export interface FormRule {
  required?: boolean
  message?: string
  pattern?: RegExp
  min?: number
  max?: number
  validate?: (value: any) => boolean | Promise<boolean>
}

// 表单字段配置
export interface FormField {
  name: string
  label?: string
  rules?: FormRule[]
  initialValue?: any
  // 受控组件
  value?: any
  onChange?: (value: any) => void
  // 非受控组件
  defaultValue?: any
  readonly?: boolean
  disabled?: boolean
}

// Form 组件的 props 类型
export interface FormProps {
  name?: string
  initialValues?: FormValues
  onFinish?: (values: FormValues) => void
  onFinishFailed?: (errors: FormValues) => void
  layout?: 'horizontal' | 'vertical' | 'inline'
  labelCol?: number | object
  wrapperCol?: number | object
  children?: React.ReactNode
  className?: string
  rules?: FormRule[]
  // 受控表单
  formValues?: FormValues
  onSubmit?: (values: FormValues) => void
  onFormValueChange?: (values: FormValues) => void
}

// FormItem 组件的 props 类型
export interface FormItemProps {
  name: string
  label?: string
  required?: boolean
  rules?: FormRule[]
  children?: React.ReactNode
  className?: string
  layout?: 'horizontal' | 'vertical' | 'inline'
}
