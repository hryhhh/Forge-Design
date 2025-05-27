import{j as f}from"./jsx-runtime-D_zvdyIk.js";import{c as F}from"./index-FGJkmGnF.js";import"./_commonjsHelpers-CqkleIqs.js";var i=(r=>(r.Small="small",r.Medium="medium",r.Large="large",r))(i||{}),e=(r=>(r.Primary="primary",r.Default="default",r.Danger="danger",r.Link="link",r))(e||{});const O=r=>{const{children:u,size:d=i.Medium,btnType:m=e.Default,disabled:p=!1,href:g,className:$,...h}=r,b=F("btn",$,{[`btn-${m}`]:m,[`btn-${d}`]:d,disabled:p});if(m===e.Link&&g){const l=h;return f.jsx("a",{className:b,href:g,...l,children:u})}else{const l=h;return f.jsx("button",{className:b,disabled:p,...l,children:u})}},G={title:"Forge Design/Button",component:O,tags:["autodocs"],parameters:{layout:"centered"}},a={args:{children:"Default Button"}},s={args:{size:i.Large,children:"Large Button"}},n={args:{size:i.Small,children:"Small Button"}},t={args:{btnType:e.Primary,children:"Primary Button"}},o={args:{btnType:e.Danger,children:"Danger Button"}},c={args:{btnType:e.Link,children:"Link Button",href:"https://www.baidu.com"}};var y,L,B;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    children: 'Default Button'
  }
}`,...(B=(L=a.parameters)==null?void 0:L.docs)==null?void 0:B.source}}};var D,S,k;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    size: ButtonSize.Large,
    children: 'Large Button'
  }
}`,...(k=(S=s.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var P,T,w;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    size: ButtonSize.Small,
    children: 'Small Button'
  }
}`,...(w=(T=n.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var x,z,j;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    btnType: ButtonType.Primary,
    children: 'Primary Button'
  }
}`,...(j=(z=t.parameters)==null?void 0:z.docs)==null?void 0:j.source}}};var N,M,R;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    btnType: ButtonType.Danger,
    children: 'Danger Button'
  }
}`,...(R=(M=o.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var v,E,_;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    btnType: ButtonType.Link,
    children: 'Link Button',
    href: 'https://www.baidu.com' // Link 类型的按钮通常需要 href
  }
}`,...(_=(E=c.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};const H=["Default","Large","Small","Primary","Danger","Link"];export{o as Danger,a as Default,s as Large,c as Link,t as Primary,n as Small,H as __namedExportsOrder,G as default};
