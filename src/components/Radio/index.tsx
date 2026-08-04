import Radio from './Radio'
import type { RadioProps, RadioGroupProps, RadioOptionProps } from './types'

export { Radio }
export type { RadioProps, RadioGroupProps, RadioOptionProps }
export type { RadioSize } from './types'

// Extend Radio type to include Group sub-component
type RadioComponent = React.FC<RadioProps> & {
  Group: React.FC<RadioGroupProps>
}

export default Radio as unknown as RadioComponent
