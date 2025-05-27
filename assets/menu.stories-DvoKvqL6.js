import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{R as i,r as I}from"./index-CgfFrydU.js";import{c as j}from"./index-FGJkmGnF.js";import"./_commonjsHelpers-CqkleIqs.js";const C=i.createContext({index:"0"}),S=({defaultIndex:n="0",mode:r="horizontal",className:a,children:d,onSelect:o,defaultOpenSubMenus:l=[]})=>{const[u,s]=I.useState(n),k=j("forge-menu",a,{"menu-vertical":r!=="horizontal","menu-horizontal":r==="horizontal"}),m={index:u||"0",onSelect:c=>{s(c),o==null||o(c)},mode:r,defaultOpenSubMenus:l},b=()=>i.Children.map(d,(c,f)=>{if(i.isValidElement(c)){const p=c,{displayName:M}=p.type;if(M==="MenuItem"||M==="SubMenu")return i.cloneElement(p,{index:f.toString()})}return null});return e.jsx("ul",{className:k,"data-testid":"test-menu",children:e.jsx(C.Provider,{value:m,children:b()})})},t=({index:n="0",className:r,disabled:a,style:d,children:o})=>{const l=I.useContext(C),u=j("menu-item",r,{"is-disabled":a,"is-active":l.index===n}),s=()=>{l.onSelect&&!a&&typeof n=="string"&&l.onSelect(n)};return e.jsx("li",{className:u,style:d,onClick:s,children:o})};t.displayName="MenuItem";const v=({index:n="0",className:r,title:a,children:d})=>{const o=I.useContext(C),l=o.defaultOpenSubMenus,u=n&&o.mode==="vertical"?l.includes(n):!1,[s,k]=I.useState(u),w=j("menu-item submenu-item",r,{"is-active":o.index===n,"menu-opened":s}),m=()=>{k(!s)},b=()=>{const c=j("forge-submenu",{"menu-opened":s}),f=i.Children.map(d,(p,M)=>{const g=p;if(i.isValidElement(g)){const{displayName:$}=g.type;if($==="MenuItem")return i.cloneElement(g,{index:`${n}-${M}`})}});return e.jsx("ul",{className:c,children:f})};return e.jsxs("li",{className:w,"data-testid":`submenu-${n}`,children:[e.jsxs("div",{className:"submenu-title",onClick:m,children:[a,e.jsx("span",{className:`arrow-icon ${s?"open":""}`,onClick:m,children:"▼"})]}),b()]},n)};v.displayName="SubMenu";const D={title:"Forge Design/Menu",component:S,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{mode:{control:{type:"select"},options:["horizontal","vertical"]},defaultIndex:{control:{type:"text"}},onSelect:{action:"selected"}}},h={render:n=>e.jsxs(S,{...n,children:[e.jsx(t,{children:"cool link 0"}),e.jsx(t,{children:"cool link 1"}),e.jsx(t,{children:"cool link 2"}),e.jsxs(v,{title:"dropdown",children:[e.jsx(t,{children:"dropdown 1"}),e.jsx(t,{children:"dropdown 2"})]}),e.jsx(t,{disabled:!0,children:"cool link 3"})]}),args:{defaultIndex:"0",mode:"horizontal"}},x={render:n=>e.jsxs(S,{...n,children:[e.jsx(t,{children:"cool link 0"}),e.jsx(t,{children:"cool link 1"}),e.jsx(t,{children:"cool link 2"}),e.jsxs(v,{title:"Vertical SubMenu",children:[e.jsx(t,{children:"dropdown 1"}),e.jsx(t,{children:"dropdown 2"})]}),e.jsx(t,{disabled:!0,children:"cool link 3"})]}),args:{defaultIndex:"0",mode:"vertical"}};var y,N,z;h.parameters={...h.parameters,docs:{...(y=h.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <Menu {...args}>
      <MenuItem>cool link 0</MenuItem>
      <MenuItem>cool link 1</MenuItem>
      <MenuItem>cool link 2</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>dropdown 1</MenuItem>
        <MenuItem>dropdown 2</MenuItem>
      </SubMenu>
      <MenuItem disabled>cool link 3</MenuItem>
    </Menu>,
  args: {
    defaultIndex: '0',
    mode: 'horizontal'
  }
}`,...(z=(N=h.parameters)==null?void 0:N.docs)==null?void 0:z.source}}};var E,V,O;x.parameters={...x.parameters,docs:{...(E=x.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <Menu {...args}>
      <MenuItem>cool link 0</MenuItem>
      <MenuItem>cool link 1</MenuItem>
      <MenuItem>cool link 2</MenuItem>
      <SubMenu title="Vertical SubMenu">
        <MenuItem>dropdown 1</MenuItem>
        <MenuItem>dropdown 2</MenuItem>
      </SubMenu>
      <MenuItem disabled>cool link 3</MenuItem>
    </Menu>,
  args: {
    defaultIndex: '0',
    mode: 'vertical'
  }
}`,...(O=(V=x.parameters)==null?void 0:V.docs)==null?void 0:O.source}}};const F=["HorizontalMenu","VerticalMenu"];export{h as HorizontalMenu,x as VerticalMenu,F as __namedExportsOrder,D as default};
