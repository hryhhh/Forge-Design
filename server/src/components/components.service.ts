import { Injectable, Logger } from '@nestjs/common'
import { readFileSync } from 'fs'
import { resolve } from 'path'

export interface ComponentMeta {
  name: string
  version: string
  props?: Array<{
    name: string
    type: string
    default?: any
    description: string
  }>
  docs: string
}

@Injectable()
export class ComponentsService {
  private readonly logger = new Logger(ComponentsService.name)
  private readonly packageJson: { version: string }

  constructor() {
    // 从根目录读取 package.json 获取版本
    const packageJsonPath = resolve(__dirname, '../../../package.json')
    try {
      this.packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
      this.logger.log(`组件库版本: ${this.packageJson.version}`)
    } catch (error) {
      this.logger.error('无法读取 package.json', error)
      this.packageJson = { version: 'unknown' }
    }
  }

  getComponents(): ComponentMeta[] {
    return [
      {
        name: 'Button',
        version: this.packageJson.version,
        props: [
          { name: 'type', type: 'string', default: 'primary', description: '按钮类型' },
          { name: 'size', type: 'string', default: 'medium', description: '按钮尺寸' },
          { name: 'disabled', type: 'boolean', default: false, description: '是否禁用' },
          { name: 'htmlType', type: 'string', default: 'button', description: 'HTML 按钮类型' },
        ],
        docs: 'https://hryhhh.github.io/Forge-Design',
      },
      {
        name: 'Menu',
        version: this.packageJson.version,
        props: [
          { name: 'mode', type: 'string', default: 'vertical', description: '菜单模式' },
          { name: 'defaultIndex', type: 'string', default: '', description: '默认选中项' },
          { name: 'onSelect', type: 'function', description: '选中回调' },
        ],
        docs: 'https://hryhhh.github.io/Forge-Design',
      },
      {
        name: 'Upload',
        version: this.packageJson.version,
        props: [
          { name: 'action', type: 'string | function', default: '', description: '上传地址或函数' },
          { name: 'onProgress', type: 'function', description: '进度回调' },
        ],
        docs: 'https://hryhhh.github.io/Forge-Design',
      },
      {
        name: 'Form',
        version: this.packageJson.version,
        props: [
          { name: 'initialValues', type: 'object', default: {}, description: '初始值' },
          { name: 'onFinish', type: 'function', description: '提交成功回调' },
          { name: 'layout', type: 'string', default: 'vertical', description: '布局方式' },
        ],
        docs: 'https://hryhhh.github.io/Forge-Design',
      },
      {
        name: 'Input',
        version: this.packageJson.version,
        props: [
          { name: 'placeholder', type: 'string', default: '', description: '占位文本' },
          { name: 'type', type: 'string', default: 'text', description: '输入框类型' },
          { name: 'allowClear', type: 'boolean', default: false, description: '是否显示清除按钮' },
        ],
        docs: 'https://hryhhh.github.io/Forge-Design',
      },
      {
        name: 'Select',
        version: this.packageJson.version,
        props: [
          { name: 'placeholder', type: 'string', default: '', description: '占位文本' },
          { name: 'options', type: 'array', description: '选项列表' },
          { name: 'multiple', type: 'boolean', default: false, description: '是否多选' },
        ],
        docs: 'https://hryhhh.github.io/Forge-Design',
      },
      {
        name: 'Radio',
        version: this.packageJson.version,
        props: [
          { name: 'options', type: 'array', description: '选项列表' },
          { name: 'value', type: 'string', description: '当前值' },
          { name: 'onChange', type: 'function', description: '变化回调' },
        ],
        docs: 'https://hryhhh.github.io/Forge-Design',
      },
      {
        name: 'Checkbox',
        version: this.packageJson.version,
        props: [
          { name: 'options', type: 'array', description: '选项列表' },
          { name: 'value', type: 'array', description: '当前值' },
          { name: 'onChange', type: 'function', description: '变化回调' },
        ],
        docs: 'https://hryhhh.github.io/Forge-Design',
      },
      {
        name: 'Switch',
        version: this.packageJson.version,
        props: [
          { name: 'checked', type: 'boolean', description: '是否选中' },
          { name: 'onChange', type: 'function', description: '变化回调' },
        ],
        docs: 'https://hryhhh.github.io/Forge-Design',
      },
      {
        name: 'DatePicker',
        version: this.packageJson.version,
        props: [
          { name: 'value', type: 'Date', description: '当前值' },
          { name: 'onChange', type: 'function', description: '变化回调' },
          { name: 'format', type: 'string', default: 'YYYY-MM-DD', description: '日期格式' },
        ],
        docs: 'https://hryhhh.github.io/Forge-Design',
      },
      {
        name: 'TimePicker',
        version: this.packageJson.version,
        props: [
          { name: 'value', type: 'Date', description: '当前值' },
          { name: 'onChange', type: 'function', description: '变化回调' },
          { name: 'format', type: 'string', default: 'HH:mm:ss', description: '时间格式' },
        ],
        docs: 'https://hryhhh.github.io/Forge-Design',
      },
    ]
  }
}
