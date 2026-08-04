import { FormProps, FormValues } from './type'
import React, { useState, useEffect, useCallback, ReactElement } from 'react'
import { FormContext } from './FormContext'
import './_style.scss'

const Form: React.FC<FormProps> = props => {
  const {
    initialValues = {},
    formValues: controlledFormValues,
    name,
    onFormValueChange,
    onFinish,
    onFinishFailed,
    children,
    className,
    layout = 'vertical',
  } = props

  const [formValues, setFormValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormValues>({})
  const [touched, setTouched] = useState<FormValues>({})

  useEffect(() => {
    if (controlledFormValues) {
      setFormValues(controlledFormValues)
    }
  }, [controlledFormValues])

  const validateField = useCallback(
    (fieldName: string, value: any, fieldRules?: any[]): string | null => {
      if (!fieldRules || fieldRules.length === 0) return null

      for (const rule of fieldRules) {
        if (
          rule.required &&
          (value === undefined || value === null || value === '')
        ) {
          return rule.message || `${fieldName} 是必填的`
        }
        if (value === undefined || value === null || value === '') {
          continue
        }
        if (rule.pattern && !rule.pattern.test(String(value))) {
          return rule.message || `${fieldName} 格式不正确`
        }
        if (rule.min !== undefined && String(value).length < rule.min) {
          return rule.message || `${fieldName} 长度至少为 ${rule.min}`
        }
        if (rule.max !== undefined && String(value).length > rule.max) {
          return rule.message || `${fieldName} 长度最多为 ${rule.max}`
        }
        if (rule.validate) {
          const validateResult = rule.validate(value)
          if (validateResult instanceof Promise) {
            validateResult.then((isValid: boolean) => {
              if (!isValid) {
                // 错误处理
              }
            })
          } else if (!validateResult) {
            return rule.message || `${fieldName} 验证失败`
          }
        }
      }
      return null
    },
    []
  )

  const validateForm = useCallback((): boolean => {
    const newErrors: FormValues = {}
    let isValid = true

    React.Children.forEach(children, child => {
      if (
        React.isValidElement(child) &&
        (child as ReactElement<any>).props.name
      ) {
        const childProps = (child as ReactElement<any>).props
        const { name: fieldName, rules: fieldRules } = childProps
        const value = formValues[fieldName]
        const error = validateField(fieldName, value, fieldRules)
        if (error) {
          newErrors[fieldName] = error
          isValid = false
        }
      }
    })

    setErrors(newErrors)
    return isValid
  }, [children, formValues, validateField])

  const handleValueChange = useCallback(
    (name: string, value: any) => {
      const newValues = { ...formValues, [name]: value }
      setFormValues(newValues)
      setTouched({ ...touched, [name]: true })
      onFormValueChange?.(newValues)

      const fieldErrors = { ...errors }
      const childElement = React.Children.toArray(children).find(
        child =>
          React.isValidElement(child) &&
          (child as ReactElement<any>).props.name === name
      ) as ReactElement<any> | undefined
      const fieldError = validateField(name, value, childElement?.props?.rules)
      if (fieldError) {
        fieldErrors[name] = fieldError
      } else {
        delete fieldErrors[name]
      }
      setErrors(fieldErrors)
    },
    [formValues, children, errors, touched, onFormValueChange, validateField]
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      if (validateForm()) {
        if (onFinish) {
          onFinish(formValues)
        }
      } else {
        if (onFinishFailed) {
          onFinishFailed(errors)
        }
      }
    },
    [formValues, validateForm, onFinish, onFinishFailed, errors]
  )

  const formContext = {
    values: formValues,
    errors,
    touched,
    onValueChange: handleValueChange,
    onSubmit: handleSubmit,
    layout,
  }

  return (
    <FormContext.Provider value={formContext}>
      <form onSubmit={handleSubmit} name={name} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

export default Form
