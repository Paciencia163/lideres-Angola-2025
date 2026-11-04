import{j as e}from"./motion-Bn-5I1za.js";import{h as u,L as g,N as r}from"./react-DNOzMFm6.js";import{c as t,a6 as f,B as k,k as o}from"./index-CyO7m7HC.js";import{L as b}from"./log-out-DCrbpw-C.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=t("FilePlus2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M3 15h6",key:"4e2qda"}],["path",{d:"M6 12v6",key:"1u72j0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=t("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=t("ListChecks",[["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}],["path",{d:"M13 6h8",key:"15sg57"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 18h8",key:"oe0vm4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=t("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=t("UserRound",[["circle",{cx:"12",cy:"8",r:"5",key:"1hypcn"}],["path",{d:"M20 21a8 8 0 0 0-16 0",key:"rfgkzh"}]]),R=({title:n,subtitle:s,children:i})=>{const{signOut:c,isStaff:d}=f(),l=u(),h=[{to:"/painel",label:"Resumo",icon:v,end:!0},{to:"/painel/nova-indicacao",label:"Nova Indicação",icon:j},{to:"/painel/indicacoes",label:"Minhas Indicações",icon:N},{to:"/painel/perfil",label:"Meu Perfil",icon:L}];return e.jsxs("div",{className:"min-h-screen bg-background",children:[e.jsx("header",{className:"border-b border-border/60 bg-card/40 backdrop-blur",children:e.jsxs("div",{className:"container mx-auto px-4 h-16 flex items-center justify-between",children:[e.jsx(g,{to:"/",className:"font-heading text-sm md:text-base tracking-[0.2em] text-primary",children:"LÍDERES ANGOLA"}),e.jsxs(k,{variant:"ghost",size:"sm",onClick:async()=>{await c(),l("/")},className:"text-muted-foreground hover:text-foreground",children:[e.jsx(b,{className:"w-4 h-4 mr-2"})," Terminar sessão"]})]})}),e.jsxs("div",{className:"container mx-auto px-4 py-8 grid lg:grid-cols-[240px_1fr] gap-8",children:[e.jsx("aside",{className:"lg:sticky lg:top-8 lg:self-start",children:e.jsxs("nav",{className:"flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0",children:[h.map(({to:a,label:m,icon:x,end:p})=>e.jsxs(r,{to:a,end:p,className:({isActive:y})=>o("flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-body whitespace-nowrap transition-colors",y?"bg-primary/10 text-primary":"text-muted-foreground hover:text-foreground hover:bg-muted/40"),children:[e.jsx(x,{className:"w-4 h-4"}),m]},a)),d&&e.jsxs(r,{to:"/admin",className:({isActive:a})=>o("flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-body whitespace-nowrap transition-colors",a?"bg-primary/10 text-primary":"text-muted-foreground hover:text-foreground hover:bg-muted/40"),children:[e.jsx(w,{className:"w-4 h-4"}),"Administração"]})]})}),e.jsxs("main",{children:[e.jsxs("div",{className:"mb-8",children:[e.jsx("h1",{className:"text-2xl md:text-3xl font-heading text-foreground",children:n}),s&&e.jsx("p",{className:"text-muted-foreground font-body text-sm mt-2",children:s})]}),i]})]})]})};export{j as F,R as P};
