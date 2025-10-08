import React, { useState, useCallback } from 'react'
import classNames from 'classnames'
import { FormContext } from './context'
import { useForm } from './useForm'
import { FormProps, FormValues, FormItemProps } from './types'
import './_style.scss'

const Form: React.FC<FormProps> = ({
  initialValues = {},
  onFinish,
  onFinishFailed,
  layout = 'horizontal',
  labelCol,
  wrapperCol,
  className,
  children,
  onValuesChange,
}) => {
  const form = useForm(initialValues)
  const [fieldsConfig, setFieldsConfig] = useState<
    Array<{ name: string; rules: any[] }>
  >([])

  // 注册字段配置
  const registerField = useCallback((name: string, rules: any[] = []) => {
    setFieldsConfig(prev => {
      const existing = prev.find(field => field.name === name)
      if (existing) {
        return prev.map(field =>
          field.name === name ? { ...field, rules } : field
        )
      }
      return [...prev, { name, rules }]
    })
  }, [])

  // 处理字段值变化
  const handleValuesChange = useCallback(
    (changedValues: FormValues) => {
      onValuesChange?.(changedValues, form.values)
    },
    [form.values, onValuesChange]
  )

  // 提交表单
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      const isValid = await form.validateForm(fieldsConfig)

      if (isValid) {
        try {
          await form.submitForm()
          onFinish?.(form.values)
        } catch (error) {
          onFinishFailed?.(form.errors)
        }
      } else {
        onFinishFailed?.(form.errors)
      }
    },
    [form, fieldsConfig, onFinish, onFinishFailed]
  )

  // 计算布局样式
  const getLayoutStyle = useCallback(() => {
    const style: React.CSSProperties = {}

    if (layout === 'inline') {
      style.display = 'flex'
      style.flexWrap = 'wrap'
      style.gap = '16px'
    }

    return style
  }, [layout])

  const formClasses = classNames('forge-form', className, {
    'form-horizontal': layout === 'horizontal',
    'form-vertical': layout === 'vertical',
    'form-inline': layout === 'inline',
  })

  const contextValue = {
    ...form,
    registerField,
    handleValuesChange,
    layout,
    labelCol,
    wrapperCol,
  }

  return (
    <FormContext.Provider value={contextValue}>
      <form
        className={formClasses}
        style={getLayoutStyle()}
        onSubmit={handleSubmit}
        data-testid="forge-form"
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}

export default Form
