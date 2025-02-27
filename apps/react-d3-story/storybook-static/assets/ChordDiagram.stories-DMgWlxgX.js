import{j as ne}from"./jsx-runtime-D_zvdyIk.js";import{r as j}from"./index-B7o9TaAI.js";import{s as A}from"./transform-BIeV-TGt.js";import{o as ae}from"./ordinal-BIATHBfR.js";import{s as oe}from"./sum-CB6J5KXz.js";import{S as se}from"./Set3-CKsqm_QX.js";import{a as ue}from"./arc--Q2xWRUA.js";import{p as le}from"./path-CSVzDSO0.js";import"./index-BM9YtLjs.js";import"./colors-Cc3OSVma.js";var I=Math.abs,V=Math.cos,k=Math.sin,re=Math.PI,S=re/2,P=re*2,O=Math.max,E=1e-12;function X(o,d){return Array.from({length:d-o},(f,p)=>o+p)}function ie(o){return function(d,f){return o(d.source.value+d.target.value,f.source.value+f.target.value)}}function ce(){return pe(!1)}function pe(o,d){var f=0,p=null,v=null,g=null;function m(s){var t=s.length,u=new Array(t),a=X(0,t),h=new Array(t*t),D=new Array(t),c=0,y;s=Float64Array.from({length:t*t},(i,r)=>s[r/t|0][r%t]);for(let i=0;i<t;++i){let r=0;for(let l=0;l<t;++l)r+=s[i*t+l]+o*s[l*t+i];c+=u[i]=r}c=O(0,P-f*t)/c,y=c?f:P/t;{let i=0;p&&a.sort((r,l)=>p(u[r],u[l]));for(const r of a){const l=i;{const b=X(0,t).filter(e=>s[r*t+e]||s[e*t+r]);v&&b.sort((e,n)=>v(s[r*t+e],s[r*t+n]));for(const e of b){let n;if(r<e?(n=h[r*t+e]||(h[r*t+e]={source:null,target:null}),n.source={index:r,startAngle:i,endAngle:i+=s[r*t+e]*c,value:s[r*t+e]}):(n=h[e*t+r]||(h[e*t+r]={source:null,target:null}),n.target={index:r,startAngle:i,endAngle:i+=s[r*t+e]*c,value:s[r*t+e]},r===e&&(n.source=n.target)),n.source&&n.target&&n.source.value<n.target.value){const T=n.source;n.source=n.target,n.target=T}}D[r]={index:r,startAngle:l,endAngle:i,value:u[r]}}i+=y}}return h=Object.values(h),h.groups=D,g?h.sort(g):h}return m.padAngle=function(s){return arguments.length?(f=O(0,s),m):f},m.sortGroups=function(s){return arguments.length?(p=s,m):p},m.sortSubgroups=function(s){return arguments.length?(v=s,m):v},m.sortChords=function(s){return arguments.length?(s==null?g=null:(g=ie(s))._=s,m):g&&g._},m}var fe=Array.prototype.slice;function x(o){return function(){return o}}function me(o){return o.source}function de(o){return o.target}function Y(o){return o.radius}function ge(o){return o.startAngle}function he(o){return o.endAngle}function ye(){return 0}function ve(o){var d=me,f=de,p=Y,v=Y,g=ge,m=he,s=ye,t=null;function u(){var a,h=d.apply(this,arguments),D=f.apply(this,arguments),c=s.apply(this,arguments)/2,y=fe.call(arguments),i=+p.apply(this,(y[0]=h,y)),r=g.apply(this,y)-S,l=m.apply(this,y)-S,b=+v.apply(this,(y[0]=D,y)),e=g.apply(this,y)-S,n=m.apply(this,y)-S;if(t||(t=a=le()),c>E&&(I(l-r)>c*2+E?l>r?(r+=c,l-=c):(r-=c,l+=c):r=l=(r+l)/2,I(n-e)>c*2+E?n>e?(e+=c,n-=c):(e-=c,n+=c):e=n=(e+n)/2),t.moveTo(i*V(r),i*k(r)),t.arc(0,0,i,r,l),(r!==e||l!==n)&&(t.quadraticCurveTo(0,0,b*V(e),b*k(e)),t.arc(0,0,b,e,n)),t.quadraticCurveTo(0,0,i*V(r),i*k(r)),t.closePath(),a)return t=null,a+""||null}return u.radius=function(a){return arguments.length?(p=v=typeof a=="function"?a:x(+a),u):p},u.sourceRadius=function(a){return arguments.length?(p=typeof a=="function"?a:x(+a),u):p},u.targetRadius=function(a){return arguments.length?(v=typeof a=="function"?a:x(+a),u):v},u.startAngle=function(a){return arguments.length?(g=typeof a=="function"?a:x(+a),u):g},u.endAngle=function(a){return arguments.length?(m=typeof a=="function"?a:x(+a),u):m},u.padAngle=function(a){return arguments.length?(s=typeof a=="function"?a:x(+a),u):s},u.source=function(a){return arguments.length?(d=a,u):d},u.target=function(a){return arguments.length?(f=a,u):f},u.context=function(a){return arguments.length?(t=a??null,u):t},u}function be(){return ve()}const w=j.memo(({data:o,width:d=800,height:f=800,margin:p={top:20,right:20,bottom:20,left:20},colors:v=se,padAngle:g=.05,labelOffset:m=20})=>{const s=j.useRef(null);return j.useEffect(()=>{if(!s.current||!o.matrix.length)return;const t=A(s.current);t.selectAll("*").remove();const u=Math.min(d-p.left-p.right,f-p.top-p.bottom)/2,a=u*.9,h=ae().domain(o.groups||o.names).range(v),c=ce().padAngle(g)(o.matrix),y=ue().innerRadius(a).outerRadius(u),i=be().radius(a),r=t.append("g").attr("transform",`translate(${d/2},${f/2})`),l=A("body").append("div").style("position","absolute").style("visibility","hidden").style("background-color","white").style("border","1px solid #ddd").style("padding","10px").style("border-radius","5px").style("font-size","12px"),b=r.append("g").selectAll("g").data(c.groups).join("g");return b.append("path").attr("d",y).style("fill",e=>{var n;return h(((n=o.groups)==null?void 0:n[e.index])||o.names[e.index])}).style("stroke","#fff").on("mouseover",function(e,n){A(this).style("opacity",.8),l.style("visibility","visible").html(`${o.names[n.index]}<br/>Total: ${oe(o.matrix[n.index])}`)}).on("mousemove",function(e){l.style("top",e.pageY-10+"px").style("left",e.pageX+10+"px")}).on("mouseout",function(){A(this).style("opacity",1),l.style("visibility","hidden")}),b.append("text").each(e=>{e.angle=(e.startAngle+e.endAngle)/2}).attr("dy",".35em").attr("transform",e=>{const n=e.angle*180/Math.PI-90,T=a+m;return`rotate(${n}) translate(${T},0) ${n>90?"rotate(180)":""}`}).attr("text-anchor",e=>e.angle>Math.PI?"end":"start").text((e,n)=>o.names[n]).style("font-size","10px").style("fill","#333"),r.append("g").selectAll("path").data(c).join("path").attr("d",i).style("fill",e=>{var n;return h(((n=o.groups)==null?void 0:n[e.source.index])||o.names[e.source.index])}).style("opacity",.7).on("mouseover",function(e,n){A(this).style("opacity",1),l.style("visibility","visible").html(`
            ${o.names[n.source.index]} → ${o.names[n.target.index]}<br/>
            Value: ${n.source.value}
          `)}).on("mousemove",function(e){l.style("top",e.pageY-10+"px").style("left",e.pageX+10+"px")}).on("mouseout",function(){A(this).style("opacity",.7),l.style("visibility","hidden")}),()=>{l.remove()}},[o,d,f,p,v,g,m]),ne.jsx("svg",{ref:s,width:d,height:f})});w.displayName="ChordDiagram";w.__docgenInfo={description:"",methods:[],displayName:"ChordDiagram",props:{data:{required:!0,tsType:{name:"ChordData"},description:""},width:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"800",computed:!1}},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"800",computed:!1}},margin:{required:!1,tsType:{name:"signature",type:"object",raw:"{ top: number; right: number; bottom: number; left: number }",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"right",value:{name:"number",required:!0}},{key:"bottom",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}}]}},description:"",defaultValue:{value:"{ top: 20, right: 20, bottom: 20, left: 20 }",computed:!1}},colors:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:"d3.schemeSet3",computed:!0}},padAngle:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0.05",computed:!1}},labelOffset:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"20",computed:!1}}}};const Te={title:"D3 Advanced/ChordDiagram",component:w,parameters:{layout:"centered"},tags:["autodocs"]},R={matrix:[[11,58,89,45],[58,0,31,75],[89,31,0,21],[45,75,21,0]],names:["A","B","C","D"]},$={args:{data:R}},C={args:{data:R,width:600,height:600,margin:{top:30,right:30,bottom:30,left:30},colors:["#ff0000","#00ff00","#0000ff","#ffff00"],padAngle:.1,labelOffset:30}},G={args:{data:{matrix:Array.from({length:8},()=>Array.from({length:8},()=>Math.floor(Math.random()*100))),names:["A","B","C","D","E","F","G","H"]}}},q={args:{data:{matrix:[[10,20],[20,10]],names:["X","Y"]}}},M={args:{data:{matrix:R.matrix,names:R.names,groups:["Group 1","Group 1","Group 2","Group 2"]}}};var B,F,z;$.parameters={...$.parameters,docs:{...(B=$.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    data: defaultData
  }
}`,...(z=(F=$.parameters)==null?void 0:F.docs)==null?void 0:z.source}}};var H,L,N;C.parameters={...C.parameters,docs:{...(H=C.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    data: defaultData,
    width: 600,
    height: 600,
    margin: {
      top: 30,
      right: 30,
      bottom: 30,
      left: 30
    },
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00"],
    padAngle: 0.1,
    labelOffset: 30
  }
}`,...(N=(L=C.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};var W,J,K;G.parameters={...G.parameters,docs:{...(W=G.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    data: {
      matrix: Array.from({
        length: 8
      }, () => Array.from({
        length: 8
      }, () => Math.floor(Math.random() * 100))),
      names: ["A", "B", "C", "D", "E", "F", "G", "H"]
    }
  }
}`,...(K=(J=G.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,Z;q.parameters={...q.parameters,docs:{...(Q=q.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    data: {
      matrix: [[10, 20], [20, 10]],
      names: ["X", "Y"]
    }
  }
}`,...(Z=(U=q.parameters)==null?void 0:U.docs)==null?void 0:Z.source}}};var _,ee,te;M.parameters={...M.parameters,docs:{...(_=M.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    data: {
      matrix: defaultData.matrix,
      names: defaultData.names,
      groups: ["Group 1", "Group 1", "Group 2", "Group 2"]
    }
  }
}`,...(te=(ee=M.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const je=["Default","CustomStyle","LargeDataset","SmallDataset","WithGroups"];export{C as CustomStyle,$ as Default,G as LargeDataset,q as SmallDataset,M as WithGroups,je as __namedExportsOrder,Te as default};
