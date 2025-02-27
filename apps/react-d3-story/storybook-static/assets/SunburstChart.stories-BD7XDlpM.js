import{j as N}from"./jsx-runtime-D_zvdyIk.js";import{r as A}from"./index-B7o9TaAI.js";import{s as y}from"./transform-BIeV-TGt.js";import{h as z}from"./index-DocUNPKL.js";import{o as B}from"./ordinal-BIATHBfR.js";import{r as H,t as F}from"./dice-DYiqfnmq.js";import{a as I}from"./arc--Q2xWRUA.js";import{S as O}from"./Set3-CKsqm_QX.js";import"./index-BM9YtLjs.js";import"./path-CSVzDSO0.js";import"./colors-Cc3OSVma.js";function G(){var m=1,t=1,s=0,r=!1;function o(n){var i=n.height+1;return n.x0=n.y0=s,n.x1=m,n.y1=t/i,n.eachBefore(p(t,i)),r&&n.eachBefore(H),n}function p(n,i){return function(a){a.children&&F(a,a.x0,n*(a.depth+1)/i,a.x1,n*(a.depth+2)/i);var c=a.x0,u=a.y0,d=a.x1-s,h=a.y1-s;d<c&&(c=d=(c+d)/2),h<u&&(u=h=(u+h)/2),a.x0=c,a.y0=u,a.x1=d,a.y1=h}}return o.round=function(n){return arguments.length?(r=!!n,o):r},o.size=function(n){return arguments.length?(m=+n[0],t=+n[1],o):[m,t]},o.padding=function(n){return arguments.length?(s=+n,o):s},o}const $=A.memo(({data:m,width:t=800,height:s=800,margin:r={top:20,right:20,bottom:20,left:20},colors:o=O,cornerRadius:p=3,padAngle:n=.01})=>{const i=A.useRef(null);return A.useEffect(()=>{if(!i.current)return;const a=y(i.current);a.selectAll("*").remove();const c=Math.min(t-r.left-r.right,s-r.top-r.bottom)/2,u=z(m).sum(e=>e.value||0).sort((e,l)=>(l.value||0)-(e.value||0)),d=G().size([2*Math.PI,c]),h=I().startAngle(e=>e.x0).endAngle(e=>e.x1).padAngle(n).padRadius(c/3).innerRadius(e=>e.y0).outerRadius(e=>e.y1-1).cornerRadius(p),E=B().domain(u.descendants().map(e=>e.depth.toString())).range(o),C=a.append("g").attr("transform",`translate(${t/2},${s/2})`),g=y("body").append("div").style("position","absolute").style("visibility","hidden").style("background-color","white").style("border","1px solid #ddd").style("padding","10px").style("border-radius","5px").style("font-size","12px");return C.selectAll("path").data(d(u).descendants()).join("path").attr("d",h).attr("fill",e=>E(e.depth.toString())).attr("opacity",.8).style("cursor","pointer").on("mouseover",function(e,l){y(this).attr("opacity",1);const S=(100*(l.value||0)/(u.value||1)).toFixed(1);g.style("visibility","visible").html(`
            <strong>${l.data.name}</strong><br/>
            Value: ${l.value}<br/>
            Percentage: ${S}%<br/>
            Depth: ${l.depth}
          `)}).on("mousemove",function(e){g.style("top",e.pageY-10+"px").style("left",e.pageX+10+"px")}).on("mouseout",function(){y(this).attr("opacity",.8),g.style("visibility","hidden")}),C.selectAll("text").data(d(u).descendants()).join("text").attr("transform",function(e){const l=(e.x0+e.x1)/2*180/Math.PI,S=(e.y0+e.y1)/2;return`rotate(${l-90}) translate(${S},0) rotate(${l<180?0:180})`}).attr("dy","0.35em").attr("text-anchor","middle").style("font-size","10px").style("fill","#333").style("pointer-events","none").text(e=>(e.x1-e.x0)*(e.y0+e.y1)/2>30?e.data.name:""),()=>{g.remove()}},[m,t,s,r,o,p,n]),N.jsx("svg",{ref:i,width:t,height:s})});$.displayName="SunburstChart";$.__docgenInfo={description:"",methods:[],displayName:"SunburstChart",props:{data:{required:!0,tsType:{name:"SunburstNode"},description:""},width:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"800",computed:!1}},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"800",computed:!1}},margin:{required:!1,tsType:{name:"signature",type:"object",raw:"{ top: number; right: number; bottom: number; left: number }",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"right",value:{name:"number",required:!0}},{key:"bottom",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}}]}},description:"",defaultValue:{value:"{ top: 20, right: 20, bottom: 20, left: 20 }",computed:!1}},colors:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:"d3.schemeSet3",computed:!0}},cornerRadius:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"3",computed:!1}},padAngle:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0.01",computed:!1}}}};const te={title:"D3 Advanced/SunburstChart",component:$,parameters:{layout:"centered"},tags:["autodocs"]},f={args:{data:{name:"File System",children:[{name:"Documents",children:[{name:"Work",children:[{name:"Reports",value:500},{name:"Presentations",value:300},{name:"Spreadsheets",value:200}]},{name:"Personal",children:[{name:"Photos",value:1e3},{name:"Videos",value:2e3},{name:"Music",value:800}]}]},{name:"Applications",children:[{name:"Games",value:3e3},{name:"Development",value:1500},{name:"Utilities",value:500}]},{name:"System",children:[{name:"OS",value:5e3},{name:"Cache",value:2e3},{name:"Temp",value:1e3}]}]}}},v={args:{...f.args,width:1e3,height:1e3,margin:{top:30,right:40,bottom:40,left:50},cornerRadius:5,padAngle:.02,colors:["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd"]}},b={args:{data:{name:"Root",children:[{name:"Category A",value:20},{name:"Category B",value:10},{name:"Category C",value:30},{name:"Category D",value:15},{name:"Category E",value:25}]},width:600,height:600,cornerRadius:0,padAngle:0}},x={args:{data:{name:"Root",children:Array.from({length:5},(m,t)=>({name:`Level 1 - ${t+1}`,children:Array.from({length:4},(s,r)=>({name:`Level 2 - ${t+1}.${r+1}`,children:Array.from({length:3},(o,p)=>({name:`Level 3 - ${t+1}.${r+1}.${p+1}`,value:Math.floor(Math.random()*1e3)+100}))}))}))},width:1200,height:1200,cornerRadius:2,padAngle:.005}};var R,D,q;f.parameters={...f.parameters,docs:{...(R=f.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    data: {
      name: "File System",
      children: [{
        name: "Documents",
        children: [{
          name: "Work",
          children: [{
            name: "Reports",
            value: 500
          }, {
            name: "Presentations",
            value: 300
          }, {
            name: "Spreadsheets",
            value: 200
          }]
        }, {
          name: "Personal",
          children: [{
            name: "Photos",
            value: 1000
          }, {
            name: "Videos",
            value: 2000
          }, {
            name: "Music",
            value: 800
          }]
        }]
      }, {
        name: "Applications",
        children: [{
          name: "Games",
          value: 3000
        }, {
          name: "Development",
          value: 1500
        }, {
          name: "Utilities",
          value: 500
        }]
      }, {
        name: "System",
        children: [{
          name: "OS",
          value: 5000
        }, {
          name: "Cache",
          value: 2000
        }, {
          name: "Temp",
          value: 1000
        }]
      }]
    }
  }
}`,...(q=(D=f.parameters)==null?void 0:D.docs)==null?void 0:q.source}}};var _,k,M;v.parameters={...v.parameters,docs:{...(_=v.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    width: 1000,
    height: 1000,
    margin: {
      top: 30,
      right: 40,
      bottom: 40,
      left: 50
    },
    cornerRadius: 5,
    padAngle: 0.02,
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"]
  }
}`,...(M=(k=v.parameters)==null?void 0:k.docs)==null?void 0:M.source}}};var P,T,V;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    data: {
      name: "Root",
      children: [{
        name: "Category A",
        value: 20
      }, {
        name: "Category B",
        value: 10
      }, {
        name: "Category C",
        value: 30
      }, {
        name: "Category D",
        value: 15
      }, {
        name: "Category E",
        value: 25
      }]
    },
    width: 600,
    height: 600,
    cornerRadius: 0,
    padAngle: 0
  }
}`,...(V=(T=b.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};var j,L,w;x.parameters={...x.parameters,docs:{...(j=x.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    data: {
      name: "Root",
      children: Array.from({
        length: 5
      }, (_, i) => ({
        name: \`Level 1 - \${i + 1}\`,
        children: Array.from({
          length: 4
        }, (_, j) => ({
          name: \`Level 2 - \${i + 1}.\${j + 1}\`,
          children: Array.from({
            length: 3
          }, (_, k) => ({
            name: \`Level 3 - \${i + 1}.\${j + 1}.\${k + 1}\`,
            value: Math.floor(Math.random() * 1000) + 100
          }))
        }))
      }))
    },
    width: 1200,
    height: 1200,
    cornerRadius: 2,
    padAngle: 0.005
  }
}`,...(w=(L=x.parameters)==null?void 0:L.docs)==null?void 0:w.source}}};const re=["Default","CustomStyle","SimpleHierarchy","DeepHierarchy"];export{v as CustomStyle,x as DeepHierarchy,f as Default,b as SimpleHierarchy,re as __namedExportsOrder,te as default};
