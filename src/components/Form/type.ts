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
//
export interface FormProps {
  name?: string
  initialValues?: FormValues
  onFinish?: (values: FormValues) => void
  onFinishFailed?: (errors: FormValues) => void
  layout?: 'horizontal' | 'vertical' | 'inline'
  labelCol?: number | object //label宽度
  wrapperCol?: number | object //表单项宽度
}
