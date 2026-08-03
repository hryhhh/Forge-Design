import { FormProps, FormValues, FormRule } from './type'
import React, { useState, useEffect, useCallback, ReactElement } from 'react'
import { FormContext } from './FormContext'

const Form: React.FC<FormProps> = props => {
  const {
    initialValues = {},
    formValues: controlledFormValues,
    name,
    onFormValueChange,
    onFinish,
    onFinishFailed,
    rules,
    children,
  } = props

  const [formValues, setFormValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormValues>({})
  const [touched, setTouched] = useState<FormValues>({})

  //监控受控组件变化
  useEffect(() => {
    if (controlledFormValues) {
      setFormValues(controlledFormValues)
    }
  }, [controlledFormValues])

  const validateField = useCallback(
    (name: string, value: any, rules?: FormRule[]): string | null => {
      if (!rules || rules.length === 0) return null

      for (const rule of rules) {
        //必填验证
        if (rule.required && (value === undefined || value === '')) {
          return rule.message || `${name} 是必填的`
        }
        // 如果值为空且非必填，跳过其他验证
        if (value === undefined || value === '') {
          continue
        }
        //正则验证
        if (
          rule.pattern &&
          value !== undefined &&
          value !== '' &&
          !rule.pattern.test(value)
        ) {
          return rule.message || `${name} 格式不正确`
        }
        //最短长度验证
        if (
          rule.min !== undefined &&
          value !== undefined &&
          value.length < rule.min
        ) {
          return rule.message || `${name} 长度至少为 ${rule.min}`
        }
        //最长长度验证
        if (
          rule.max !== undefined &&
          value !== undefined &&
          value.length > rule.max
        ) {
          return rule.message || `${name} 长度最多为 ${rule.max}`
        }
        //自定义验证
        if (rule.validate) {
          const validateResult = rule.validate(value)
          if (validateResult instanceof Promise) {
            //异步验证
            validateResult.then(isValid => {
              if (!isValid) {
                return rule.message || `${name} 验证失败`
              }
            })
          } else if (!validateResult) {
            return rule.message || `${name} 验证失败`
          }
        }
      }
      return null
    },
    []
  )

  //表单验证
  const validateForm = useCallback((): boolean => {
    const newErrors: FormValues = {}
    let isValid = true

    //验证子组件
    React.Children.forEach(children, child => {
      if (
        React.isValidElement(child) &&
        (child as ReactElement<any>).props.name
      ) {
        const childProps = (child as ReactElement<any>).props
        const { name, rules } = childProps
        const value = formValues[name]
        const error = validateField(name, value, rules)
        if (error) {
          newErrors[name] = error
          isValid = false
        }
      }
    })
    if (rules) {
      const formError = validateField('form', formValues, rules)
      if (formError) {
        newErrors.form = formError
        isValid = false
      }
    }
    setErrors(newErrors)
    return isValid
  }, [children, formValues, rules, validateField])

  // 更新表单值
  const handleValueChange = useCallback(
    (name: string, value: any) => {
      const newValues = { ...formValues, [name]: value }
      setFormValues(newValues) //更新表单值
      setTouched({ ...touched, [name]: true })
      onFormValueChange?.(newValues) //受控表单通知父组件

      // 实时验证
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

  // 提交表单
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
  }

  return (
    <FormContext.Provider value={formContext}>
      <form onSubmit={handleSubmit} name={name}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...(child.props as any),
              formContext,
            })
          }
          return child
        })}
      </form>
    </FormContext.Provider>
  )
}
export default Form
