import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{e as i,r as y}from"./iframe-CKV3-sDl.js";import{c as f}from"./index-7HekgMPd.js";const V=i.createContext({index:"0"}),m=({defaultIndex:t="0",mode:u="horizontal",className:o,children:M,onSelect:s,defaultOpenSubMenus:l=[]})=>{const[c,r]=y.useState(t),v=f("forge-menu",o,{"menu-vertical":u!=="horizontal","menu-horizontal":u==="horizontal"}),I={index:c||"0",onSelect:a=>{r(a),s==null||s(a)},mode:u,defaultOpenSubMenus:l},C=()=>i.Children.map(M,(a,z)=>{if(i.isValidElement(a)){const x=a,{displayName:h}=x.type;if(h==="MenuItem"||h==="SubMenu")return i.cloneElement(x,{index:z.toString()})}return null});return e.jsx("ul",{className:v,"data-testid":"test-menu",children:e.jsx(V.Provider,{value:I,children:C()})})},n=({index:t="0",className:u,disabled:o,style:M,children:s})=>{const l=y.useContext(V),c=f("menu-item",u,{"is-disabled":o,"is-active":l.index===t}),r=()=>{l.onSelect&&!o&&typeof t=="string"&&l.onSelect(t)};return e.jsx("li",{className:c,style:M,onClick:r,children:s})};n.displayName="MenuItem";const d=({index:t="0",className:u,title:o,children:M})=>{const s=y.useContext(V),l=s.defaultOpenSubMenus,c=t&&s.mode==="vertical"?l.includes(t):!1,[r,v]=y.useState(c),E=f("menu-item submenu-item",u,{"is-active":s.index===t,"menu-opened":r}),I=()=>{v(!r)},C=()=>{const a=f("forge-submenu",{"menu-opened":r}),z=i.Children.map(M,(x,h)=>{const N=x;if(i.isValidElement(N)){const{displayName:B}=N.type;if(B==="MenuItem")return i.cloneElement(N,{index:`${t}-${h}`})}});return e.jsx("ul",{className:a,children:z})};return e.jsxs("li",{className:E,"data-testid":`submenu-${t}`,children:[e.jsxs("div",{className:"submenu-title",onClick:I,children:[o,e.jsx("span",{className:`arrow-icon ${r?"open":""}`,onClick:I,children:"▼"})]}),C()]},t)};d.displayName="SubMenu";const{action:g}=__STORYBOOK_MODULE_ACTIONS__,Y={title:"Forge Design/Menu",component:m,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
# 菜单导航组件

一个功能完整的菜单导航组件，支持水平和垂直布局、子菜单嵌套和多种交互状态。

## ✨ 主要功能

### 🎨 多种布局模式
- **Horizontal**: 水平布局，适用于顶部导航栏
- **Vertical**: 垂直布局，适用于侧边栏导航

### 🏗️ 灵活的菜单结构
- **MenuItem**: 基础菜单项，支持点击选择和禁用状态
- **SubMenu**: 子菜单容器，支持下拉展开和嵌套结构
- **组合使用**: 可以任意组合MenuItem和SubMenu

### 🔄 交互特性
- **选中状态**: 支持默认选中项和动态选中切换
- **禁用状态**: 支持单个菜单项的禁用功能
- **事件回调**: 提供onSelect回调函数，响应菜单选择事件

### ⚙️ 配置选项
- **默认选中**: 通过defaultIndex设置初始选中项
- **样式定制**: 支持自定义className进行样式扩展
- **响应式**: 自适应不同屏幕尺寸

## 📋 技术规范

**类型安全**: 完全使用TypeScript开发，提供完整的类型支持
**组件化**: 采用组合式设计，MenuItem和SubMenu可独立使用

## 🎯 使用场景

### 基础用法
\`\`\`tsx
<Menu defaultIndex="0" onSelect={handleSelect}>
  <MenuItem>菜单项 1</MenuItem>
  <MenuItem>菜单项 2</MenuItem>
  <MenuItem disabled>禁用项</MenuItem>
</Menu>
\`\`\`

### 水平导航栏
\`\`\`tsx
<Menu mode="horizontal" defaultIndex="0">
  <MenuItem>首页</MenuItem>
  <MenuItem>产品</MenuItem>
  <SubMenu title="解决方案">
    <MenuItem>企业版</MenuItem>
    <MenuItem>个人版</MenuItem>
  </SubMenu>
  <MenuItem>联系我们</MenuItem>
</Menu>
\`\`\`

### 垂直侧边栏
\`\`\`tsx
<Menu mode="vertical" defaultIndex="0">
  <MenuItem>仪表盘</MenuItem>
  <SubMenu title="用户管理">
    <MenuItem>用户列表</MenuItem>
    <MenuItem>权限设置</MenuItem>
  </SubMenu>
  <MenuItem>系统设置</MenuItem>
</Menu>
\`\`\`

### 完整功能演示
下面的示例展示了组件的所有功能特性，包括不同布局模式、子菜单嵌套和交互状态。
        `}}},argTypes:{mode:{control:{type:"select"},options:["horizontal","vertical"],description:"菜单布局模式",table:{type:{summary:'"horizontal" | "vertical"'},defaultValue:{summary:'"horizontal"'}}},defaultIndex:{control:{type:"text"},description:"默认选中的菜单项索引",table:{type:{summary:"string"},defaultValue:{summary:"0"}}},onSelect:{action:"menu-selected",description:"菜单选择时的回调函数",table:{type:{summary:"(selectedIndex: string) => void"},defaultValue:{summary:"undefined"}}},className:{control:"text",description:"自定义CSS类名",table:{type:{summary:"string"},defaultValue:{summary:"undefined"}}},children:{description:"菜单项内容（MenuItem 和 SubMenu 组件）",table:{type:{summary:"React.ReactNode"},defaultValue:{summary:"undefined"}}}}},p={render:t=>e.jsxs(m,{...t,children:[e.jsx(n,{children:"首页"}),e.jsx(n,{children:"产品中心"}),e.jsxs(d,{title:"解决方案",children:[e.jsx(n,{children:"企业版本"}),e.jsx(n,{children:"个人版本"}),e.jsx(n,{children:"开发者版本"})]}),e.jsx(n,{children:"技术支持"}),e.jsx(n,{disabled:!0,children:"维护中"}),e.jsx(n,{children:"关于我们"})]}),args:{defaultIndex:"0",mode:"horizontal",onSelect:g("menu-selected")},parameters:{docs:{description:{story:`
### 🚀 完整功能演示

这个示例展示了 Menu 组件的核心功能。你可以通过下方的控制面板来测试不同的属性组合：

#### 🎨 布局模式测试
- **Horizontal**: 切换到水平布局模式，适合顶部导航
- **Vertical**: 切换到垂直布局模式，适合侧边栏导航

#### 🏗️ 菜单结构测试
- **基础菜单项**: 点击"首页"、"产品中心"等常规菜单项
- **子菜单展开**: 悬停或点击"解决方案"查看子菜单
- **禁用状态**: 观察"维护中"菜单项的禁用效果

#### 🔄 交互功能测试
- **选中切换**: 点击不同菜单项观察选中状态变化
- **默认选中**: 修改 **defaultIndex** 属性测试默认选中项
- **事件响应**: 查看控制台的菜单选择事件日志

#### 🎯 实际应用场景
- **顶部导航**: 设置为 horizontal 模式作为网站主导航
- **侧边栏**: 设置为 vertical 模式作为管理后台侧边栏
- **响应式**: 在不同屏幕尺寸下观察布局适配效果

**提示**: 打开浏览器开发者工具的 Console 面板，可以看到菜单选择事件的详细日志。
        `}}}},j={render:t=>e.jsxs(m,{...t,children:[e.jsx(n,{children:"首页"}),e.jsx(n,{children:"产品"}),e.jsx(n,{children:"服务"}),e.jsxs(d,{title:"更多",children:[e.jsx(n,{children:"帮助中心"}),e.jsx(n,{children:"开发者文档"}),e.jsx(n,{children:"API参考"})]}),e.jsx(n,{children:"联系我们"}),e.jsx(n,{disabled:!0,children:"敬请期待"})]}),args:{defaultIndex:"0",mode:"horizontal",onSelect:g("horizontal-menu-selected")},parameters:{docs:{description:{story:`
### 🎨 水平布局展示

展示水平模式下的菜单布局，适用于网站顶部导航栏：

- **适用场景**: 网站头部导航、标签页导航
- **布局特点**: 菜单项水平排列，子菜单向下展开
- **交互方式**: 鼠标悬停展开子菜单，点击选择菜单项
- **响应式**: 在小屏幕设备上可以考虑转为垂直布局

这种布局模式节省垂直空间，适合内容丰富的网站首页。
        `}}}},S={render:t=>e.jsx("div",{style:{width:"200px"},children:e.jsxs(m,{...t,children:[e.jsx(n,{children:"仪表盘"}),e.jsxs(d,{title:"用户管理",children:[e.jsx(n,{children:"用户列表"}),e.jsx(n,{children:"角色管理"}),e.jsx(n,{children:"权限设置"})]}),e.jsxs(d,{title:"内容管理",children:[e.jsx(n,{children:"文章管理"}),e.jsx(n,{children:"分类管理"}),e.jsx(n,{children:"标签管理"})]}),e.jsx(n,{children:"系统设置"}),e.jsx(n,{disabled:!0,children:"高级功能"})]})}),args:{defaultIndex:"0",mode:"vertical",onSelect:g("vertical-menu-selected")},parameters:{docs:{description:{story:`
### 📐 垂直布局展示

展示垂直模式下的菜单布局，适用于侧边栏导航：

- **适用场景**: 管理后台侧边栏、文件目录树
- **布局特点**: 菜单项垂直排列，子菜单可以展开收起
- **交互方式**: 点击展开/收起子菜单，选择具体菜单项
- **空间利用**: 有效利用侧边空间，支持深层级嵌套

这种布局模式适合功能复杂的管理系统，可以承载更多的导航选项。
        `}}}},b={render:t=>e.jsxs("div",{style:{display:"flex",gap:"20px",flexDirection:"column"},children:[e.jsxs("div",{children:[e.jsx("h4",{children:"正常状态菜单"}),e.jsxs(m,{...t,children:[e.jsx(n,{children:"正常菜单项"}),e.jsx(n,{children:"可选择项"}),e.jsxs(d,{title:"子菜单",children:[e.jsx(n,{children:"子项 1"}),e.jsx(n,{children:"子项 2"})]})]})]}),e.jsxs("div",{children:[e.jsx("h4",{children:"包含禁用项的菜单"}),e.jsxs(m,{...t,children:[e.jsx(n,{children:"正常项"}),e.jsx(n,{disabled:!0,children:"禁用项"}),e.jsxs(d,{title:"混合状态",children:[e.jsx(n,{children:"正常子项"}),e.jsx(n,{disabled:!0,children:"禁用子项"})]})]})]})]}),args:{defaultIndex:"0",mode:"horizontal",onSelect:g("state-menu-selected")},parameters:{docs:{description:{story:`
### 🔄 交互状态展示

展示菜单组件的不同交互状态：

- **正常状态**: 菜单项可以正常点击和选择
- **选中状态**: 当前选中的菜单项会有特殊的视觉反馈
- **悬停状态**: 鼠标悬停时的交互效果
- **禁用状态**: 禁用的菜单项不可点击，视觉上呈现灰色

#### 状态说明
- **MenuItem**: 支持 disabled 属性来禁用单个菜单项
- **SubMenu**: 子菜单的展开/收起状态切换
- **选中反馈**: 通过 onSelect 回调函数处理选择事件

这些状态确保了用户界面的清晰度和可用性。
        `}}}};var O,_,k;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品中心</MenuItem>
      <SubMenu title="解决方案">
        <MenuItem>企业版本</MenuItem>
        <MenuItem>个人版本</MenuItem>
        <MenuItem>开发者版本</MenuItem>
      </SubMenu>
      <MenuItem>技术支持</MenuItem>
      <MenuItem disabled>维护中</MenuItem>
      <MenuItem>关于我们</MenuItem>
    </Menu>,
  args: {
    defaultIndex: '0',
    mode: 'horizontal',
    onSelect: action('menu-selected')
  },
  parameters: {
    docs: {
      description: {
        story: \`
### 🚀 完整功能演示

这个示例展示了 Menu 组件的核心功能。你可以通过下方的控制面板来测试不同的属性组合：

#### 🎨 布局模式测试
- **Horizontal**: 切换到水平布局模式，适合顶部导航
- **Vertical**: 切换到垂直布局模式，适合侧边栏导航

#### 🏗️ 菜单结构测试
- **基础菜单项**: 点击"首页"、"产品中心"等常规菜单项
- **子菜单展开**: 悬停或点击"解决方案"查看子菜单
- **禁用状态**: 观察"维护中"菜单项的禁用效果

#### 🔄 交互功能测试
- **选中切换**: 点击不同菜单项观察选中状态变化
- **默认选中**: 修改 **defaultIndex** 属性测试默认选中项
- **事件响应**: 查看控制台的菜单选择事件日志

#### 🎯 实际应用场景
- **顶部导航**: 设置为 horizontal 模式作为网站主导航
- **侧边栏**: 设置为 vertical 模式作为管理后台侧边栏
- **响应式**: 在不同屏幕尺寸下观察布局适配效果

**提示**: 打开浏览器开发者工具的 Console 面板，可以看到菜单选择事件的详细日志。
        \`
      }
    }
  }
}`,...(k=(_=p.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var D,A,H;j.parameters={...j.parameters,docs:{...(D=j.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品</MenuItem>
      <MenuItem>服务</MenuItem>
      <SubMenu title="更多">
        <MenuItem>帮助中心</MenuItem>
        <MenuItem>开发者文档</MenuItem>
        <MenuItem>API参考</MenuItem>
      </SubMenu>
      <MenuItem>联系我们</MenuItem>
      <MenuItem disabled>敬请期待</MenuItem>
    </Menu>,
  args: {
    defaultIndex: '0',
    mode: 'horizontal',
    onSelect: action('horizontal-menu-selected')
  },
  parameters: {
    docs: {
      description: {
        story: \`
### 🎨 水平布局展示

展示水平模式下的菜单布局，适用于网站顶部导航栏：

- **适用场景**: 网站头部导航、标签页导航
- **布局特点**: 菜单项水平排列，子菜单向下展开
- **交互方式**: 鼠标悬停展开子菜单，点击选择菜单项
- **响应式**: 在小屏幕设备上可以考虑转为垂直布局

这种布局模式节省垂直空间，适合内容丰富的网站首页。
        \`
      }
    }
  }
}`,...(H=(A=j.parameters)==null?void 0:A.docs)==null?void 0:H.source}}};var L,R,T;S.parameters={...S.parameters,docs:{...(L=S.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <div style={{
    width: '200px'
  }}>
      <Menu {...args}>
        <MenuItem>仪表盘</MenuItem>
        <SubMenu title="用户管理">
          <MenuItem>用户列表</MenuItem>
          <MenuItem>角色管理</MenuItem>
          <MenuItem>权限设置</MenuItem>
        </SubMenu>
        <SubMenu title="内容管理">
          <MenuItem>文章管理</MenuItem>
          <MenuItem>分类管理</MenuItem>
          <MenuItem>标签管理</MenuItem>
        </SubMenu>
        <MenuItem>系统设置</MenuItem>
        <MenuItem disabled>高级功能</MenuItem>
      </Menu>
    </div>,
  args: {
    defaultIndex: '0',
    mode: 'vertical',
    onSelect: action('vertical-menu-selected')
  },
  parameters: {
    docs: {
      description: {
        story: \`
### 📐 垂直布局展示

展示垂直模式下的菜单布局，适用于侧边栏导航：

- **适用场景**: 管理后台侧边栏、文件目录树
- **布局特点**: 菜单项垂直排列，子菜单可以展开收起
- **交互方式**: 点击展开/收起子菜单，选择具体菜单项
- **空间利用**: 有效利用侧边空间，支持深层级嵌套

这种布局模式适合功能复杂的管理系统，可以承载更多的导航选项。
        \`
      }
    }
  }
}`,...(T=(R=S.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var $,w,P;b.parameters={...b.parameters,docs:{...($=b.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    gap: '20px',
    flexDirection: 'column'
  }}>
      <div>
        <h4>正常状态菜单</h4>
        <Menu {...args}>
          <MenuItem>正常菜单项</MenuItem>
          <MenuItem>可选择项</MenuItem>
          <SubMenu title="子菜单">
            <MenuItem>子项 1</MenuItem>
            <MenuItem>子项 2</MenuItem>
          </SubMenu>
        </Menu>
      </div>
      <div>
        <h4>包含禁用项的菜单</h4>
        <Menu {...args}>
          <MenuItem>正常项</MenuItem>
          <MenuItem disabled>禁用项</MenuItem>
          <SubMenu title="混合状态">
            <MenuItem>正常子项</MenuItem>
            <MenuItem disabled>禁用子项</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </div>,
  args: {
    defaultIndex: '0',
    mode: 'horizontal',
    onSelect: action('state-menu-selected')
  },
  parameters: {
    docs: {
      description: {
        story: \`
### 🔄 交互状态展示

展示菜单组件的不同交互状态：

- **正常状态**: 菜单项可以正常点击和选择
- **选中状态**: 当前选中的菜单项会有特殊的视觉反馈
- **悬停状态**: 鼠标悬停时的交互效果
- **禁用状态**: 禁用的菜单项不可点击，视觉上呈现灰色

#### 状态说明
- **MenuItem**: 支持 disabled 属性来禁用单个菜单项
- **SubMenu**: 子菜单的展开/收起状态切换
- **选中反馈**: 通过 onSelect 回调函数处理选择事件

这些状态确保了用户界面的清晰度和可用性。
        \`
      }
    }
  }
}`,...(P=(w=b.parameters)==null?void 0:w.docs)==null?void 0:P.source}}};const q=["CompleteDemo","HorizontalLayout","VerticalLayout","InteractiveStates"];export{p as CompleteDemo,j as HorizontalLayout,b as InteractiveStates,S as VerticalLayout,q as __namedExportsOrder,Y as default};
