import{j as X}from"./jsx-runtime-D_zvdyIk.js";import{r as V}from"./index-B7o9TaAI.js";import{s as k}from"./transform-BIeV-TGt.js";import{h as F}from"./index-DocUNPKL.js";import{o as G}from"./ordinal-BIATHBfR.js";import{t as J,r as P}from"./dice-DYiqfnmq.js";import{r as Y,c as C,a as $}from"./constant-CNVSbJfz.js";import{S as Z}from"./Set3-CKsqm_QX.js";import"./index-BM9YtLjs.js";import"./colors-Cc3OSVma.js";function K(p,u,i,t,g){for(var m=p.children,s,d=-1,h=m.length,f=p.value&&(g-i)/p.value;++d<h;)s=m[d],s.x0=u,s.x1=t,s.y0=i,s.y1=i+=s.value*f}var Q=(1+Math.sqrt(5))/2;function W(p,u,i,t,g,m){for(var s=[],d=u.children,h,f,a=0,v=0,e=d.length,c,o,l=u.value,n,r,b,T,R,A,y;a<e;){c=g-i,o=m-t;do n=d[v++].value;while(!n&&v<e);for(r=b=n,A=Math.max(o/c,c/o)/(l*p),y=n*n*A,R=Math.max(b/y,y/r);v<e;++v){if(n+=f=d[v].value,f<r&&(r=f),f>b&&(b=f),y=n*n*A,T=Math.max(b/y,y/r),T>R){n-=f;break}R=T}s.push(h={value:n,dice:c<o,children:d.slice(a,v)}),h.dice?J(h,i,t,g,l?t+=o*n/l:m):K(h,i,t,l?i+=c*n/l:g,m),l-=n,a=v}return s}const ee=function p(u){function i(t,g,m,s,d){W(u,t,g,m,s,d)}return i.ratio=function(t){return p((t=+t)>1?t:1)},i}(Q);function ne(){var p=ee,u=!1,i=1,t=1,g=[0],m=C,s=C,d=C,h=C,f=C;function a(e){return e.x0=e.y0=0,e.x1=i,e.y1=t,e.eachBefore(v),g=[0],u&&e.eachBefore(P),e}function v(e){var c=g[e.depth],o=e.x0+c,l=e.y0+c,n=e.x1-c,r=e.y1-c;n<o&&(o=n=(o+n)/2),r<l&&(l=r=(l+r)/2),e.x0=o,e.y0=l,e.x1=n,e.y1=r,e.children&&(c=g[e.depth+1]=m(e)/2,o+=f(e)-c,l+=s(e)-c,n-=d(e)-c,r-=h(e)-c,n<o&&(o=n=(o+n)/2),r<l&&(l=r=(l+r)/2),p(e,o,l,n,r))}return a.round=function(e){return arguments.length?(u=!!e,a):u},a.size=function(e){return arguments.length?(i=+e[0],t=+e[1],a):[i,t]},a.tile=function(e){return arguments.length?(p=Y(e),a):p},a.padding=function(e){return arguments.length?a.paddingInner(e).paddingOuter(e):a.paddingInner()},a.paddingInner=function(e){return arguments.length?(m=typeof e=="function"?e:$(+e),a):m},a.paddingOuter=function(e){return arguments.length?a.paddingTop(e).paddingRight(e).paddingBottom(e).paddingLeft(e):a.paddingTop()},a.paddingTop=function(e){return arguments.length?(s=typeof e=="function"?e:$(+e),a):s},a.paddingRight=function(e){return arguments.length?(d=typeof e=="function"?e:$(+e),a):d},a.paddingBottom=function(e){return arguments.length?(h=typeof e=="function"?e:$(+e),a):h},a.paddingLeft=function(e){return arguments.length?(f=typeof e=="function"?e:$(+e),a):f},a}const M=V.memo(({data:p,width:u=800,height:i=600,margin:t={top:20,right:20,bottom:20,left:20},colors:g=Z,padding:m=1,round:s=!0})=>{const d=V.useRef(null);return V.useEffect(()=>{if(!d.current)return;const h=k(d.current);h.selectAll("*").remove();const f=F(p).sum(n=>n.value||0).sort((n,r)=>(r.value||0)-(n.value||0)),v=ne().size([u-t.left-t.right,i-t.top-t.bottom]).padding(m).round(s)(f),e=G().domain(f.descendants().map(n=>n.depth.toString())).range(g),c=h.append("g").attr("transform",`translate(${t.left},${t.top})`),o=k("body").append("div").style("position","absolute").style("visibility","hidden").style("background-color","white").style("border","1px solid #ddd").style("padding","10px").style("border-radius","5px").style("font-size","12px"),l=c.selectAll("g").data(v.descendants()).join("g").attr("transform",n=>`translate(${n.x0},${n.y0})`);return l.append("rect").attr("width",n=>n.x1-n.x0).attr("height",n=>n.y1-n.y0).attr("fill",n=>e(n.depth.toString())).attr("stroke","#fff").attr("stroke-width",1).attr("opacity",.7).on("mouseover",function(n,r){k(this).attr("opacity",1),o.style("visibility","visible").html(`
            <strong>${r.data.name}</strong><br/>
            ${r.value?`Value: ${r.value}`:""}
            ${r.children?`<br/>Children: ${r.children.length}`:""}
          `)}).on("mousemove",function(n){o.style("top",n.pageY-10+"px").style("left",n.pageX+10+"px")}).on("mouseout",function(){k(this).attr("opacity",.7),o.style("visibility","hidden")}),l.append("text").filter(n=>n.x1-n.x0>40&&n.y1-n.y0>25).attr("x",3).attr("y",15).style("font-size","12px").style("fill","#333").text(n=>n.data.name),()=>{o.remove()}},[p,u,i,t,g,m,s]),X.jsx("svg",{ref:d,width:u,height:i})});M.displayName="TreemapChart";M.__docgenInfo={description:"",methods:[],displayName:"TreemapChart",props:{data:{required:!0,tsType:{name:"TreemapNode"},description:""},width:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"800",computed:!1}},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"600",computed:!1}},margin:{required:!1,tsType:{name:"signature",type:"object",raw:"{ top: number; right: number; bottom: number; left: number }",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"right",value:{name:"number",required:!0}},{key:"bottom",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}}]}},description:"",defaultValue:{value:"{ top: 20, right: 20, bottom: 20, left: 20 }",computed:!1}},colors:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:"d3.schemeSet3",computed:!0}},padding:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},round:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const ce={title:"D3 Advanced/TreemapChart",component:M,parameters:{layout:"centered"},tags:["autodocs"]},S={args:{data:{name:"Organization",children:[{name:"Engineering",children:[{name:"Frontend",children:[{name:"React",value:30},{name:"Vue",value:20},{name:"Angular",value:15}]},{name:"Backend",children:[{name:"Node.js",value:25},{name:"Python",value:20},{name:"Java",value:15}]}]},{name:"Design",children:[{name:"UI",value:20},{name:"UX",value:15},{name:"Graphics",value:10}]},{name:"Marketing",children:[{name:"Social Media",value:15},{name:"Content",value:12},{name:"SEO",value:8}]}]}}},q={args:{...S.args,width:1e3,height:800,margin:{top:30,right:40,bottom:40,left:50},colors:["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd"],padding:3,round:!0}},w={args:{data:{name:"Root",children:[{name:"Category A",value:20},{name:"Category B",value:10},{name:"Category C",value:30},{name:"Category D",value:15},{name:"Category E",value:25}]},width:600,height:400}},x={args:{data:{name:"Root",children:Array.from({length:5},(p,u)=>({name:`Level 1 - ${u+1}`,children:Array.from({length:4},(i,t)=>({name:`Level 2 - ${u+1}.${t+1}`,children:Array.from({length:3},(g,m)=>({name:`Level 3 - ${u+1}.${t+1}.${m+1}`,value:Math.floor(Math.random()*1e3)+100}))}))}))},width:1200,height:800}};var D,E,_;S.parameters={...S.parameters,docs:{...(D=S.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    data: {
      name: "Organization",
      children: [{
        name: "Engineering",
        children: [{
          name: "Frontend",
          children: [{
            name: "React",
            value: 30
          }, {
            name: "Vue",
            value: 20
          }, {
            name: "Angular",
            value: 15
          }]
        }, {
          name: "Backend",
          children: [{
            name: "Node.js",
            value: 25
          }, {
            name: "Python",
            value: 20
          }, {
            name: "Java",
            value: 15
          }]
        }]
      }, {
        name: "Design",
        children: [{
          name: "UI",
          value: 20
        }, {
          name: "UX",
          value: 15
        }, {
          name: "Graphics",
          value: 10
        }]
      }, {
        name: "Marketing",
        children: [{
          name: "Social Media",
          value: 15
        }, {
          name: "Content",
          value: 12
        }, {
          name: "SEO",
          value: 8
        }]
      }]
    }
  }
}`,...(_=(E=S.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var j,B,L;q.parameters={...q.parameters,docs:{...(j=q.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    width: 1000,
    height: 800,
    margin: {
      top: 30,
      right: 40,
      bottom: 40,
      left: 50
    },
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"],
    padding: 3,
    round: true
  }
}`,...(L=(B=q.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};var I,N,O;w.parameters={...w.parameters,docs:{...(I=w.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
    height: 400
  }
}`,...(O=(N=w.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};var z,H,U;x.parameters={...x.parameters,docs:{...(z=x.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
    height: 800
  }
}`,...(U=(H=x.parameters)==null?void 0:H.docs)==null?void 0:U.source}}};const pe=["Default","CustomStyle","SimpleHierarchy","DeepHierarchy"];export{q as CustomStyle,x as DeepHierarchy,S as Default,w as SimpleHierarchy,pe as __namedExportsOrder,ce as default};
