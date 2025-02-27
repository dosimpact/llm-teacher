import{j as W}from"./jsx-runtime-D_zvdyIk.js";import{r as V}from"./index-B7o9TaAI.js";import{s as w}from"./transform-BIeV-TGt.js";import{o as Z}from"./ordinal-BIATHBfR.js";import{m as _}from"./min-D1slsF82.js";import{m as ee}from"./max-DBeXZoyG.js";import{S as te}from"./Set3-CKsqm_QX.js";import{s as ne}from"./pow-5oQGRduV.js";import{c as p,q as re,j as N,s as ae,m as oe}from"./manyBody-DMdDB1GA.js";import"./index-BM9YtLjs.js";import"./colors-Cc3OSVma.js";import"./linear-BvEZjWga.js";function ie(t){return t.x+t.vx}function le(t){return t.y+t.vy}function se(t){var i,a,u,m=1,s=1;typeof t!="function"&&(t=p(t==null?1:+t));function d(){for(var n,l=i.length,b,f,R,B,g,D,r=0;r<s;++r)for(b=re(i,ie,le).visitAfter(e),n=0;n<l;++n)f=i[n],g=a[f.index],D=g*g,R=f.x+f.vx,B=f.y+f.vy,b.visit(A);function A(C,Y,H,K,U){var h=C.data,$=C.r,c=g+$;if(h){if(h.index>f.index){var y=R-h.x-h.vx,x=B-h.y-h.vy,v=y*y+x*x;v<c*c&&(y===0&&(y=N(u),v+=y*y),x===0&&(x=N(u),v+=x*x),v=(c-(v=Math.sqrt(v)))/v*m,f.vx+=(y*=v)*(c=($*=$)/(D+$)),f.vy+=(x*=v)*c,h.vx-=y*(c=1-c),h.vy-=x*c)}return}return Y>R+c||K<R-c||H>B+c||U<B-c}}function e(n){if(n.data)return n.r=a[n.data.index];for(var l=n.r=0;l<4;++l)n[l]&&n[l].r>n.r&&(n.r=n[l].r)}function o(){if(i){var n,l=i.length,b;for(a=new Array(l),n=0;n<l;++n)b=i[n],a[b.index]=+t(b,n,i)}}return d.initialize=function(n,l){i=n,u=l,o()},d.iterations=function(n){return arguments.length?(s=+n,d):s},d.strength=function(n){return arguments.length?(m=+n,d):m},d.radius=function(n){return arguments.length?(t=typeof n=="function"?n:p(+n),o(),d):t},d}function ue(t){var i=p(.1),a,u,m;typeof t!="function"&&(t=p(t==null?0:+t));function s(e){for(var o=0,n=a.length,l;o<n;++o)l=a[o],l.vx+=(m[o]-l.x)*u[o]*e}function d(){if(a){var e,o=a.length;for(u=new Array(o),m=new Array(o),e=0;e<o;++e)u[e]=isNaN(m[e]=+t(a[e],e,a))?0:+i(a[e],e,a)}}return s.initialize=function(e){a=e,d()},s.strength=function(e){return arguments.length?(i=typeof e=="function"?e:p(+e),d(),s):i},s.x=function(e){return arguments.length?(t=typeof e=="function"?e:p(+e),d(),s):t},s}function de(t){var i=p(.1),a,u,m;typeof t!="function"&&(t=p(t==null?0:+t));function s(e){for(var o=0,n=a.length,l;o<n;++o)l=a[o],l.vy+=(m[o]-l.y)*u[o]*e}function d(){if(a){var e,o=a.length;for(u=new Array(o),m=new Array(o),e=0;e<o;++e)u[e]=isNaN(m[e]=+t(a[e],e,a))?0:+i(a[e],e,a)}}return s.initialize=function(e){a=e,d()},s.strength=function(e){return arguments.length?(i=typeof e=="function"?e:p(+e),d(),s):i},s.y=function(e){return arguments.length?(t=typeof e=="function"?e:p(+e),d(),s):t},s}const z=V.memo(({data:t,width:i=800,height:a=600,margin:u={top:20,right:20,bottom:20,left:20},colors:m=te,minRadius:s=10,maxRadius:d=50,strength:e=-30})=>{const o=V.useRef(null);return V.useEffect(()=>{if(!o.current||!t.length)return;const n=w(o.current);n.selectAll("*").remove();const l=Array.from(new Set(t.map(r=>r.group||r.id))),b=Z().domain(l).range(m),f=ne().domain([_(t,r=>r.value)||0,ee(t,r=>r.value)||0]).range([s,d]),R=ae(t).force("x",ue((i-u.left-u.right)/2).strength(.05)).force("y",de((a-u.top-u.bottom)/2).strength(.05)).force("collide",se().radius(r=>f(r.value))).force("charge",oe().strength(e)),B=n.append("g").attr("transform",`translate(${u.left},${u.top})`),g=w("body").append("div").style("position","absolute").style("visibility","hidden").style("background-color","white").style("border","1px solid #ddd").style("padding","10px").style("border-radius","5px").style("font-size","12px"),D=B.selectAll("g").data(t).join("g").attr("class","bubble-node");return D.append("circle").attr("r",r=>f(r.value)).attr("fill",r=>b(r.group||r.id)).attr("fill-opacity",.7).attr("stroke","#fff").attr("stroke-width",2).on("mouseover",function(r,A){w(this).attr("fill-opacity",1),g.style("visibility","visible").html(`
            ${A.label||A.id}<br/>
            Value: ${A.value}<br/>
            ${A.group?`Group: ${A.group}`:""}
          `)}).on("mousemove",function(r){g.style("top",r.pageY-10+"px").style("left",r.pageX+10+"px")}).on("mouseout",function(){w(this).attr("fill-opacity",.7),g.style("visibility","hidden")}),D.append("text").text(r=>r.label||r.id).attr("text-anchor","middle").attr("dy",".3em").style("font-size",r=>Math.min(2*f(r.value)/(r.label||r.id).length,12)+"px").style("fill","#333").style("pointer-events","none"),R.on("tick",()=>{D.attr("transform",r=>`translate(${r.x},${r.y})`)}),()=>{R.stop(),g.remove()}},[t,i,a,u,m,s,d,e]),W.jsx("svg",{ref:o,width:i,height:a})});z.displayName="BubbleChart";z.__docgenInfo={description:"",methods:[],displayName:"BubbleChart",props:{data:{required:!0,tsType:{name:"Array",elements:[{name:"BubbleData"}],raw:"BubbleData[]"},description:""},width:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"800",computed:!1}},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"600",computed:!1}},margin:{required:!1,tsType:{name:"signature",type:"object",raw:"{ top: number; right: number; bottom: number; left: number }",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"right",value:{name:"number",required:!0}},{key:"bottom",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}}]}},description:"",defaultValue:{value:"{ top: 20, right: 20, bottom: 20, left: 20 }",computed:!1}},colors:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:"d3.schemeSet3",computed:!0}},minRadius:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"10",computed:!1}},maxRadius:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"50",computed:!1}},strength:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"-30",computed:!1}}}};const Be={title:"D3 Advanced/BubbleChart",component:z,parameters:{layout:"centered"},tags:["autodocs"]},S={args:{data:[{id:"React",value:100,group:"Frontend",label:"React"},{id:"Vue",value:80,group:"Frontend",label:"Vue.js"},{id:"Angular",value:70,group:"Frontend",label:"Angular"},{id:"Node",value:90,group:"Backend",label:"Node.js"},{id:"Python",value:85,group:"Backend",label:"Python"},{id:"Java",value:75,group:"Backend",label:"Java"},{id:"PostgreSQL",value:65,group:"Database",label:"PostgreSQL"},{id:"MongoDB",value:60,group:"Database",label:"MongoDB"},{id:"Redis",value:40,group:"Database",label:"Redis"}]}},k={args:{...S.args,width:1e3,height:800,margin:{top:30,right:40,bottom:40,left:50},minRadius:20,maxRadius:80,strength:-50,colors:["#1f77b4","#ff7f0e","#2ca02c"]}},j={args:{data:[{id:"A",value:50,label:"Item A"},{id:"B",value:30,label:"Item B"},{id:"C",value:20,label:"Item C"}],width:400,height:300,minRadius:15,maxRadius:40}},M={args:{data:Array.from({length:30},(t,i)=>({id:`item-${i+1}`,value:Math.floor(Math.random()*90)+10,group:`Group ${Math.floor(i/10)+1}`,label:`Item ${i+1}`})),width:1200,height:800,minRadius:10,maxRadius:60,strength:-20}};var I,P,T;S.parameters={...S.parameters,docs:{...(I=S.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    data: [{
      id: "React",
      value: 100,
      group: "Frontend",
      label: "React"
    }, {
      id: "Vue",
      value: 80,
      group: "Frontend",
      label: "Vue.js"
    }, {
      id: "Angular",
      value: 70,
      group: "Frontend",
      label: "Angular"
    }, {
      id: "Node",
      value: 90,
      group: "Backend",
      label: "Node.js"
    }, {
      id: "Python",
      value: 85,
      group: "Backend",
      label: "Python"
    }, {
      id: "Java",
      value: 75,
      group: "Backend",
      label: "Java"
    }, {
      id: "PostgreSQL",
      value: 65,
      group: "Database",
      label: "PostgreSQL"
    }, {
      id: "MongoDB",
      value: 60,
      group: "Database",
      label: "MongoDB"
    }, {
      id: "Redis",
      value: 40,
      group: "Database",
      label: "Redis"
    }]
  }
}`,...(T=(P=S.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var q,F,L;k.parameters={...k.parameters,docs:{...(q=k.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
    minRadius: 20,
    maxRadius: 80,
    strength: -50,
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c"]
  }
}`,...(L=(F=k.parameters)==null?void 0:F.docs)==null?void 0:L.source}}};var E,J,Q;j.parameters={...j.parameters,docs:{...(E=j.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    data: [{
      id: "A",
      value: 50,
      label: "Item A"
    }, {
      id: "B",
      value: 30,
      label: "Item B"
    }, {
      id: "C",
      value: 20,
      label: "Item C"
    }],
    width: 400,
    height: 300,
    minRadius: 15,
    maxRadius: 40
  }
}`,...(Q=(J=j.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var G,O,X;M.parameters={...M.parameters,docs:{...(G=M.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    data: Array.from({
      length: 30
    }, (_, i) => ({
      id: \`item-\${i + 1}\`,
      value: Math.floor(Math.random() * 90) + 10,
      group: \`Group \${Math.floor(i / 10) + 1}\`,
      label: \`Item \${i + 1}\`
    })),
    width: 1200,
    height: 800,
    minRadius: 10,
    maxRadius: 60,
    strength: -20
  }
}`,...(X=(O=M.parameters)==null?void 0:O.docs)==null?void 0:X.source}}};const De=["Default","CustomStyle","SmallDataset","LargeDataset"];export{k as CustomStyle,S as Default,M as LargeDataset,j as SmallDataset,De as __namedExportsOrder,Be as default};
