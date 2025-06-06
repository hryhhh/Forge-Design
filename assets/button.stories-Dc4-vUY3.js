import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as n,a as l,b as a}from"./Button-TH8D-0BZ.js";import"./index-7HekgMPd.js";import"./iframe-CKV3-sDl.js";/* empty css               */const{action:t}=__STORYBOOK_MODULE_ACTIONS__,L={title:"Forge Design/Button",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
# 按钮组件

一个功能完整的按钮组件，支持多种类型、尺寸和状态的按钮交互。

## ✨ 主要功能

### 🎨 多种按钮类型
- **Primary**: 主要操作按钮，用于重要操作
- **Danger**: 危险操作按钮，用于删除等危险操作
- **Link**: 链接样式按钮，具有超链接功能

### 📏 多种尺寸规格
- **Large**: 大尺寸按钮，适用于重要操作
- **Medium**: 中等尺寸按钮（默认），适用于常规操作
- **Small**: 小尺寸按钮，适用于辅助操作

### 🔄 交互状态
- **Normal**: 正常状态，可点击交互
- **Disabled**: 禁用状态，不可点击
- **Hover**: 鼠标悬停状态，提供视觉反馈

### 🔗 链接功能测试
1. 将类型设置为 **Link**
2. 在 **href** 属性中输入链接地址
3. 点击按钮测试链接跳转功能

### 🎯 自定义样式测试
- 在 **className** 属性中添加自定义样式类
- 观察样式变化和扩展效果

## 📋 技术规范

**类型安全**: 完全使用 TypeScript 开发，提供完整的类型支持

## 🎯 使用场景

### 基础用法
\`\`\`tsx
<Button onClick={handleClick}>点击按钮</Button>
\`\`\`

### 不同类型
\`\`\`tsx
<Button type={ButtonType.Primary}>主要按钮</Button>
<Button type={ButtonType.Danger}>危险按钮</Button>
<Button type={ButtonType.Link} href="https://www.baidu.com">链接按钮</Button>
\`\`\`

### 不同尺寸
\`\`\`tsx
<Button size={ButtonSize.Large}>大按钮</Button>
<Button size={ButtonSize.Medium}>中按钮</Button>
<Button size={ButtonSize.Small}>小按钮</Button>
\`\`\`

### 禁用状态
\`\`\`tsx
<Button disabled>禁用按钮</Button>
\`\`\`

### 完整功能演示
下面的示例展示了组件的所有功能特性，包括不同类型、尺寸、状态和交互效果。
        `}}},argTypes:{children:{control:"text",description:"按钮内容文本",table:{type:{summary:"React.ReactNode"},defaultValue:{summary:"undefined"}}},type:{control:{type:"select"},options:Object.values(a),description:"按钮类型",table:{type:{summary:"ButtonType"},defaultValue:{summary:"ButtonType.Primary"}}},size:{control:{type:"select"},options:Object.values(l),description:"按钮尺寸",table:{type:{summary:"ButtonSize"},defaultValue:{summary:"ButtonSize.Medium"}}},disabled:{control:"boolean",description:"禁用状态",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},href:{control:"text",description:"链接地址（仅限 Link 类型按钮）",table:{type:{summary:"string"},defaultValue:{summary:"undefined"}}},className:{control:"text",description:"自定义 CSS 类名",table:{type:{summary:"string"},defaultValue:{summary:"undefined"}}},onClick:{action:"button-clicked",description:"点击事件回调函数",table:{type:{summary:"(event: React.MouseEvent) => void"},defaultValue:{summary:"undefined"}}}}},r={args:{children:"Button",onClick:t("button-clicked")},parameters:{docs:{description:{story:`
### 🚀 完整功能演示

这个示例展示了 Button 组件的核心功能。你可以通过下方的控制面板来测试不同的属性组合：


**提示**: 打开浏览器开发者工具的 Console 面板，可以看到点击事件的详细日志。
        `}}}},o={render:()=>e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx(n,{type:a.Primary,onClick:t("primary-clicked"),children:"Primary Button"}),e.jsx(n,{type:a.Danger,onClick:t("danger-clicked"),children:"Danger Button"}),e.jsx(n,{type:a.Link,href:"https://www.baidu.com",onClick:t("link-clicked"),children:"Link Button"})]}),parameters:{docs:{description:{story:`
### 🎨 按钮类型展示

展示所有可用的按钮类型，每种类型都有不同的视觉样式和用途：

- **Primary**: 主要操作按钮，使用品牌色，适用于最重要的操作
- **Danger**: 危险操作按钮，使用警告色，适用于删除、取消等操作
- **Link**: 链接样式按钮，外观类似链接，可以设置 href 属性进行页面跳转
        `}}}},i={render:()=>e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap"},children:[e.jsx(n,{size:l.Large,onClick:t("large-clicked"),children:"Large Button"}),e.jsx(n,{size:l.Medium,onClick:t("medium-clicked"),children:"Medium Button"}),e.jsx(n,{size:l.Small,onClick:t("small-clicked"),children:"Small Button"})]}),parameters:{docs:{description:{story:`
### 📏 按钮尺寸展示

展示所有可用的按钮尺寸，适用于不同的界面场景：

- **Large**: 大尺寸按钮，适用于重要操作或需要突出显示的场景
- **Medium**: 中等尺寸按钮（默认），适用于大多数常规操作
- **Small**: 小尺寸按钮，适用于辅助操作或空间受限的场景
        `}}}},s={render:()=>e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsx(n,{onClick:t("normal-clicked"),children:"Normal State"}),e.jsx(n,{disabled:!0,onClick:t("disabled-clicked"),children:"Disabled State"}),e.jsx(n,{type:a.Danger,disabled:!0,onClick:t("danger-disabled-clicked"),children:"Danger Disabled"})]}),parameters:{docs:{description:{story:`
### 🔄 按钮状态展示

展示按钮的不同交互状态：

- **Normal**: 正常状态，可以正常点击和交互
- **Disabled**: 禁用状态，不可点击，视觉上呈现灰色效果
- **Hover**: 鼠标悬停状态（需要鼠标悬停才能看到效果）

禁用状态下的按钮不会触发点击事件，确保用户界面的安全性。
        `}}}};var c,d,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    children: 'Button',
    onClick: action('button-clicked')
  },
  parameters: {
    docs: {
      description: {
        story: \`
### 🚀 完整功能演示

这个示例展示了 Button 组件的核心功能。你可以通过下方的控制面板来测试不同的属性组合：


**提示**: 打开浏览器开发者工具的 Console 面板，可以看到点击事件的详细日志。
        \`
      }
    }
  }
}`,...(u=(d=r.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var p,m,y;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Button type={ButtonType.Primary} onClick={action('primary-clicked')}>
        Primary Button
      </Button>
      <Button type={ButtonType.Danger} onClick={action('danger-clicked')}>
        Danger Button
      </Button>
      <Button type={ButtonType.Link} href="https://www.baidu.com" onClick={action('link-clicked')}>
        Link Button
      </Button>
    </div>,
  parameters: {
    docs: {
      description: {
        story: \`
### 🎨 按钮类型展示

展示所有可用的按钮类型，每种类型都有不同的视觉样式和用途：

- **Primary**: 主要操作按钮，使用品牌色，适用于最重要的操作
- **Danger**: 危险操作按钮，使用警告色，适用于删除、取消等操作
- **Link**: 链接样式按钮，外观类似链接，可以设置 href 属性进行页面跳转
        \`
      }
    }
  }
}`,...(y=(m=o.parameters)==null?void 0:m.docs)==null?void 0:y.source}}};var B,k,g;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Button size={ButtonSize.Large} onClick={action('large-clicked')}>
        Large Button
      </Button>
      <Button size={ButtonSize.Medium} onClick={action('medium-clicked')}>
        Medium Button
      </Button>
      <Button size={ButtonSize.Small} onClick={action('small-clicked')}>
        Small Button
      </Button>
    </div>,
  parameters: {
    docs: {
      description: {
        story: \`
### 📏 按钮尺寸展示

展示所有可用的按钮尺寸，适用于不同的界面场景：

- **Large**: 大尺寸按钮，适用于重要操作或需要突出显示的场景
- **Medium**: 中等尺寸按钮（默认），适用于大多数常规操作
- **Small**: 小尺寸按钮，适用于辅助操作或空间受限的场景
        \`
      }
    }
  }
}`,...(g=(k=i.parameters)==null?void 0:k.docs)==null?void 0:g.source}}};var x,b,f;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Button onClick={action('normal-clicked')}>Normal State</Button>
      <Button disabled onClick={action('disabled-clicked')}>
        Disabled State
      </Button>
      <Button type={ButtonType.Danger} disabled onClick={action('danger-disabled-clicked')}>
        Danger Disabled
      </Button>
    </div>,
  parameters: {
    docs: {
      description: {
        story: \`
### 🔄 按钮状态展示

展示按钮的不同交互状态：

- **Normal**: 正常状态，可以正常点击和交互
- **Disabled**: 禁用状态，不可点击，视觉上呈现灰色效果
- **Hover**: 鼠标悬停状态（需要鼠标悬停才能看到效果）

禁用状态下的按钮不会触发点击事件，确保用户界面的安全性。
        \`
      }
    }
  }
}`,...(f=(b=s.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};const v=["CompleteDemo","TypeVariants","SizeVariants","StateVariants"];export{r as CompleteDemo,i as SizeVariants,s as StateVariants,o as TypeVariants,v as __namedExportsOrder,L as default};
