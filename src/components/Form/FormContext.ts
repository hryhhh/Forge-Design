import { createContext } from 'react'
import { FormValues } from './type'

export const FormContext = createContext<{
  values: FormValues
  errors: FormValues
  touched: FormValues
  onValueChange: (name: string, value: any) => void
  onSubmit: (e: React.FormEvent) => void
  layout?: 'horizontal' | 'vertical' | 'inline'
}>({
  values: {},
  errors: {},
  touched: {},
  onValueChange: () => {},
  onSubmit: () => {},
})
