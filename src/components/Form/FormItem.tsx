import React, { useContext } from 'react'
import classNames from 'classnames'
import { FormContext } from './FormContext'
import { FormItemProps } from './type'
import './_style.scss'

const FormItem: React.FC<FormItemProps> = props => {
  const { name, label, required = false, children, className, layout } = props

  const {
    values,
    errors,
    touched,
    onValueChange,
    layout: formLayout,
  } = useContext(FormContext)

  const currentLayout = layout || formLayout
  const value = values[name]
  const error = errors[name]
  const isTouched = touched[name]

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value: newValue } = e.target
    onValueChange(name, newValue)
  }

  const handleBlur = () => {
    onValueChange(name, values[name])
  }

  const getControl = () => {
    if (React.isValidElement(children)) {
      const child = children as React.ReactElement<any>
      return React.cloneElement(child, {
        value,
        onChange: handleChange,
        onBlur: handleBlur,
        className: classNames(child.props.className, {
          'forge-form-input--error': error && isTouched,
        }),
      })
    }
    return children
  }

  const labelColStyle =
    currentLayout === 'horizontal'
      ? { width: '100px', textAlign: 'right' as const, paddingRight: '8px' }
      : undefined
  const wrapperColStyle =
    currentLayout === 'horizontal' ? { marginLeft: '108px' } : undefined

  return (
    <div
      className={classNames('forge-form-item', className, {
        'forge-form-item--horizontal': currentLayout === 'horizontal',
        'forge-form-item--inline': currentLayout === 'inline',
        'forge-form-item--error': error && isTouched,
      })}
    >
      {label && (
        <div className="forge-form-item__label" style={labelColStyle}>
          {label}
          {required && <span className="forge-form-item__required">*</span>}
        </div>
      )}
      <div className="forge-form-item__wrapper" style={wrapperColStyle}>
        <div className="forge-form-item__control">{getControl()}</div>
        {error && isTouched && (
          <div className="forge-form-item__error">{error}</div>
        )}
      </div>
    </div>
  )
}

export default FormItem
