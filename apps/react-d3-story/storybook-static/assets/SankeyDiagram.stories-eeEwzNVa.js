import{j as Pe}from"./jsx-runtime-D_zvdyIk.js";import{r as O}from"./index-B7o9TaAI.js";import{s as N,c as Te}from"./transform-BIeV-TGt.js";import{o as Le}from"./ordinal-BIATHBfR.js";import{S as _e}from"./Set3-CKsqm_QX.js";import"./index-BM9YtLjs.js";import"./colors-Cc3OSVma.js";function U(e,n){let r;if(n===void 0)for(const s of e)s!=null&&(r<s||r===void 0&&s>=s)&&(r=s);else{let s=-1;for(let i of e)(i=n(i,++s,e))!=null&&(r<i||r===void 0&&i>=i)&&(r=i)}return r}function Me(e,n){let r;if(n===void 0)for(const s of e)s!=null&&(r>s||r===void 0&&s>=s)&&(r=s);else{let s=-1;for(let i of e)(i=n(i,++s,e))!=null&&(r>i||r===void 0&&i>=i)&&(r=i)}return r}function R(e,n){let r=0;if(n===void 0)for(let s of e)(s=+s)&&(r+=s);else{let s=-1;for(let i of e)(i=+n(i,++s,e))&&(r+=i)}return r}function Ae(e,n){return e.sourceLinks.length?e.depth:n-1}function z(e){return function(){return e}}function ee(e,n){return V(e.source,n.source)||e.index-n.index}function te(e,n){return V(e.target,n.target)||e.index-n.index}function V(e,n){return e.y0-n.y0}function H(e){return e.value}function Be(e){return e.index}function Ee(e){return e.nodes}function Ce(e){return e.links}function ne(e,n){const r=e.get(n);if(!r)throw new Error("missing: "+n);return r}function re({nodes:e}){for(const n of e){let r=n.y0,s=r;for(const i of n.sourceLinks)i.y0=r+i.width/2,r+=i.width;for(const i of n.targetLinks)i.y1=s+i.width/2,s+=i.width}}function De(){let e=0,n=0,r=1,s=1,i=24,k=8,d,g=Be,h=Ae,p,v,x=Ee,w=Ce,b=6;function m(){const t={nodes:x.apply(null,arguments),links:w.apply(null,arguments)};return T(t),P(t),l(t),S(t),ke(t),re(t),t}m.update=function(t){return re(t),t},m.nodeId=function(t){return arguments.length?(g=typeof t=="function"?t:z(t),m):g},m.nodeAlign=function(t){return arguments.length?(h=typeof t=="function"?t:z(t),m):h},m.nodeSort=function(t){return arguments.length?(p=t,m):p},m.nodeWidth=function(t){return arguments.length?(i=+t,m):i},m.nodePadding=function(t){return arguments.length?(k=d=+t,m):k},m.nodes=function(t){return arguments.length?(x=typeof t=="function"?t:z(t),m):x},m.links=function(t){return arguments.length?(w=typeof t=="function"?t:z(t),m):w},m.linkSort=function(t){return arguments.length?(v=t,m):v},m.size=function(t){return arguments.length?(e=n=0,r=+t[0],s=+t[1],m):[r-e,s-n]},m.extent=function(t){return arguments.length?(e=+t[0][0],r=+t[1][0],n=+t[0][1],s=+t[1][1],m):[[e,n],[r,s]]},m.iterations=function(t){return arguments.length?(b=+t,m):b};function T({nodes:t,links:c}){for(const[u,o]of t.entries())o.index=u,o.sourceLinks=[],o.targetLinks=[];const a=new Map(t.map((u,o)=>[g(u,o,t),u]));for(const[u,o]of c.entries()){o.index=u;let{source:f,target:y}=o;typeof f!="object"&&(f=o.source=ne(a,f)),typeof y!="object"&&(y=o.target=ne(a,y)),f.sourceLinks.push(o),y.targetLinks.push(o)}if(v!=null)for(const{sourceLinks:u,targetLinks:o}of t)u.sort(v),o.sort(v)}function P({nodes:t}){for(const c of t)c.value=c.fixedValue===void 0?Math.max(R(c.sourceLinks,H),R(c.targetLinks,H)):c.fixedValue}function l({nodes:t}){const c=t.length;let a=new Set(t),u=new Set,o=0;for(;a.size;){for(const f of a){f.depth=o;for(const{target:y}of f.sourceLinks)u.add(y)}if(++o>c)throw new Error("circular link");a=u,u=new Set}}function S({nodes:t}){const c=t.length;let a=new Set(t),u=new Set,o=0;for(;a.size;){for(const f of a){f.height=o;for(const{source:y}of f.targetLinks)u.add(y)}if(++o>c)throw new Error("circular link");a=u,u=new Set}}function M({nodes:t}){const c=U(t,o=>o.depth)+1,a=(r-e-i)/(c-1),u=new Array(c);for(const o of t){const f=Math.max(0,Math.min(c-1,Math.floor(h.call(null,o,c))));o.layer=f,o.x0=e+f*a,o.x1=o.x0+i,u[f]?u[f].push(o):u[f]=[o]}if(p)for(const o of u)o.sort(p);return u}function q(t){const c=Me(t,a=>(s-n-(a.length-1)*d)/R(a,H));for(const a of t){let u=n;for(const o of a){o.y0=u,o.y1=u+o.value*c,u=o.y1+d;for(const f of o.sourceLinks)f.width=f.value*c}u=(s-u+d)/(a.length+1);for(let o=0;o<a.length;++o){const f=a[o];f.y0+=u*(o+1),f.y1+=u*(o+1)}Se(a)}}function ke(t){const c=M(t);d=Math.min(k,(s-n)/(U(c,a=>a.length)-1)),q(c);for(let a=0;a<b;++a){const u=Math.pow(.99,a),o=Math.max(1-u,(a+1)/b);xe(c,u,o),ve(c,u,o)}}function ve(t,c,a){for(let u=1,o=t.length;u<o;++u){const f=t[u];for(const y of f){let A=0,L=0;for(const{source:E,value:$}of y.targetLinks){let C=$*(y.layer-E.layer);A+=be(E,y)*C,L+=C}if(!(L>0))continue;let B=(A/L-y.y0)*c;y.y0+=B,y.y1+=B,K(y)}p===void 0&&f.sort(V),X(f,a)}}function xe(t,c,a){for(let u=t.length,o=u-2;o>=0;--o){const f=t[o];for(const y of f){let A=0,L=0;for(const{target:E,value:$}of y.sourceLinks){let C=$*(E.layer-y.layer);A+=we(y,E)*C,L+=C}if(!(L>0))continue;let B=(A/L-y.y0)*c;y.y0+=B,y.y1+=B,K(y)}p===void 0&&f.sort(V),X(f,a)}}function X(t,c){const a=t.length>>1,u=t[a];J(t,u.y0-d,a-1,c),Y(t,u.y1+d,a+1,c),J(t,s,t.length-1,c),Y(t,n,0,c)}function Y(t,c,a,u){for(;a<t.length;++a){const o=t[a],f=(c-o.y0)*u;f>1e-6&&(o.y0+=f,o.y1+=f),c=o.y1+d}}function J(t,c,a,u){for(;a>=0;--a){const o=t[a],f=(o.y1-c)*u;f>1e-6&&(o.y0-=f,o.y1-=f),c=o.y0-d}}function K({sourceLinks:t,targetLinks:c}){if(v===void 0){for(const{source:{sourceLinks:a}}of c)a.sort(te);for(const{target:{targetLinks:a}}of t)a.sort(ee)}}function Se(t){if(v===void 0)for(const{sourceLinks:c,targetLinks:a}of t)c.sort(te),a.sort(ee)}function be(t,c){let a=t.y0-(t.sourceLinks.length-1)*d/2;for(const{target:u,width:o}of t.sourceLinks){if(u===c)break;a+=o+d}for(const{source:u,width:o}of c.targetLinks){if(u===t)break;a-=o}return a}function we(t,c){let a=c.y0-(c.targetLinks.length-1)*d/2;for(const{source:u,width:o}of c.targetLinks){if(u===t)break;a+=o+d}for(const{target:u,width:o}of t.sourceLinks){if(u===c)break;a-=o}return a}return m}var W=Math.PI,Z=2*W,_=1e-6,qe=Z-_;function G(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function ye(){return new G}G.prototype=ye.prototype={constructor:G,moveTo:function(e,n){this._+="M"+(this._x0=this._x1=+e)+","+(this._y0=this._y1=+n)},closePath:function(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(e,n){this._+="L"+(this._x1=+e)+","+(this._y1=+n)},quadraticCurveTo:function(e,n,r,s){this._+="Q"+ +e+","+ +n+","+(this._x1=+r)+","+(this._y1=+s)},bezierCurveTo:function(e,n,r,s,i,k){this._+="C"+ +e+","+ +n+","+ +r+","+ +s+","+(this._x1=+i)+","+(this._y1=+k)},arcTo:function(e,n,r,s,i){e=+e,n=+n,r=+r,s=+s,i=+i;var k=this._x1,d=this._y1,g=r-e,h=s-n,p=k-e,v=d-n,x=p*p+v*v;if(i<0)throw new Error("negative radius: "+i);if(this._x1===null)this._+="M"+(this._x1=e)+","+(this._y1=n);else if(x>_)if(!(Math.abs(v*g-h*p)>_)||!i)this._+="L"+(this._x1=e)+","+(this._y1=n);else{var w=r-k,b=s-d,m=g*g+h*h,T=w*w+b*b,P=Math.sqrt(m),l=Math.sqrt(x),S=i*Math.tan((W-Math.acos((m+x-T)/(2*P*l)))/2),M=S/l,q=S/P;Math.abs(M-1)>_&&(this._+="L"+(e+M*p)+","+(n+M*v)),this._+="A"+i+","+i+",0,0,"+ +(v*w>p*b)+","+(this._x1=e+q*g)+","+(this._y1=n+q*h)}},arc:function(e,n,r,s,i,k){e=+e,n=+n,r=+r,k=!!k;var d=r*Math.cos(s),g=r*Math.sin(s),h=e+d,p=n+g,v=1^k,x=k?s-i:i-s;if(r<0)throw new Error("negative radius: "+r);this._x1===null?this._+="M"+h+","+p:(Math.abs(this._x1-h)>_||Math.abs(this._y1-p)>_)&&(this._+="L"+h+","+p),r&&(x<0&&(x=x%Z+Z),x>qe?this._+="A"+r+","+r+",0,1,"+v+","+(e-d)+","+(n-g)+"A"+r+","+r+",0,1,"+v+","+(this._x1=h)+","+(this._y1=p):x>_&&(this._+="A"+r+","+r+",0,"+ +(x>=W)+","+v+","+(this._x1=e+r*Math.cos(i))+","+(this._y1=n+r*Math.sin(i))))},rect:function(e,n,r,s){this._+="M"+(this._x0=this._x1=+e)+","+(this._y0=this._y1=+n)+"h"+ +r+"v"+ +s+"h"+-r+"Z"},toString:function(){return this._}};function oe(e){return function(){return e}}function Ne(e){return e[0]}function ze(e){return e[1]}var Fe=Array.prototype.slice;function Ie(e){return e.source}function je(e){return e.target}function Ve(e){var n=Ie,r=je,s=Ne,i=ze,k=null;function d(){var g,h=Fe.call(arguments),p=n.apply(this,h),v=r.apply(this,h);if(k||(k=g=ye()),e(k,+s.apply(this,(h[0]=p,h)),+i.apply(this,h),+s.apply(this,(h[0]=v,h)),+i.apply(this,h)),g)return k=null,g+""||null}return d.source=function(g){return arguments.length?(n=g,d):n},d.target=function(g){return arguments.length?(r=g,d):r},d.x=function(g){return arguments.length?(s=typeof g=="function"?g:oe(+g),d):s},d.y=function(g){return arguments.length?(i=typeof g=="function"?g:oe(+g),d):i},d.context=function(g){return arguments.length?(k=g??null,d):k},d}function $e(e,n,r,s,i){e.moveTo(n,r),e.bezierCurveTo(n=(n+s)/2,r,n,i,s,i)}function Oe(){return Ve($e)}function Re(e){return[e.source.x1,e.y0]}function He(e){return[e.target.x0,e.y1]}function We(){return Oe().source(Re).target(He)}const Q=O.memo(({data:e,width:n=800,height:r=600,margin:s={top:20,right:20,bottom:20,left:20},nodeWidth:i=20,nodePadding:k=10,colors:d=_e})=>{const g=O.useRef(null);return O.useEffect(()=>{if(!g.current||!e.nodes.length)return;const h=N(g.current);h.selectAll("*").remove(),e.nodes.map(l=>l.id);const p=new Map(e.nodes.map((l,S)=>[l.id,S])),v=e.links.map(l=>({...l,source:typeof l.source=="string"?p.get(l.source)||0:p.get(l.source.id)||0,target:typeof l.target=="string"?p.get(l.target)||0:p.get(l.target.id)||0})),x=De().nodeWidth(i).nodePadding(k).extent([[s.left,s.top],[n-s.right,r-s.bottom]]),{nodes:w,links:b}=x({nodes:e.nodes.map((l,S)=>({...l,index:S})),links:v}),m=Le().domain(e.nodes.map(l=>l.name)).range(d);h.append("g").selectAll("path").data(b).join("path").attr("d",We()).attr("fill","none").attr("stroke",l=>{var S;return(S=Te(m(l.source.name)))==null?void 0:S.darker()}).attr("stroke-width",l=>Math.max(1,l.width||0)).attr("opacity",.5);const T=h.append("g").selectAll("g").data(w).join("g").attr("transform",l=>`translate(${l.x0},${l.y0})`);T.append("rect").attr("height",l=>(l.y1||0)-(l.y0||0)).attr("width",l=>(l.x1||0)-(l.x0||0)).attr("fill",l=>m(l.name)).attr("opacity",.8),T.append("text").attr("x",l=>(l.x0||0)<n/2?(l.x1||0)-(l.x0||0)+6:-6).attr("y",l=>((l.y1||0)-(l.y0||0))/2).attr("dy","0.35em").attr("text-anchor",l=>(l.x0||0)<n/2?"start":"end").text(l=>l.name).style("font-size","10px").style("fill","#333");const P=N("body").append("div").style("position","absolute").style("visibility","hidden").style("background-color","white").style("border","1px solid #ddd").style("padding","10px").style("border-radius","5px");return T.on("mouseover",function(l,S){N(this).select("rect").attr("opacity",1),P.style("visibility","visible").html(`${S.name}<br/>Value: ${S.value}`)}).on("mousemove",function(l){P.style("top",l.pageY-10+"px").style("left",l.pageX+10+"px")}).on("mouseout",function(){N(this).select("rect").attr("opacity",.8),P.style("visibility","hidden")}),()=>{P.remove()}},[e,n,r,s,i,k,d]),Pe.jsx("svg",{ref:g,width:n,height:r})});Q.displayName="SankeyDiagram";Q.__docgenInfo={description:"",methods:[],displayName:"SankeyDiagram",props:{data:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  nodes: SankeyNode[];
  links: SankeyLink[];
}`,signature:{properties:[{key:"nodes",value:{name:"Array",elements:[{name:"SankeyNode"}],raw:"SankeyNode[]",required:!0}},{key:"links",value:{name:"Array",elements:[{name:"SankeyLink"}],raw:"SankeyLink[]",required:!0}}]}},description:""},width:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"800",computed:!1}},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"600",computed:!1}},margin:{required:!1,tsType:{name:"signature",type:"object",raw:"{ top: number; right: number; bottom: number; left: number }",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"right",value:{name:"number",required:!0}},{key:"bottom",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}}]}},description:"",defaultValue:{value:"{ top: 20, right: 20, bottom: 20, left: 20 }",computed:!1}},nodeWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"20",computed:!1}},nodePadding:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"10",computed:!1}},colors:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:"d3.schemeSet3",computed:!0}}}};const Ue={title:"D3 Advanced/SankeyDiagram",component:Q,parameters:{layout:"centered"},tags:["autodocs"]},D={args:{data:{nodes:[{id:"A",name:"A"},{id:"B",name:"B"},{id:"C",name:"C"},{id:"D",name:"D"},{id:"E",name:"E"},{id:"F",name:"F"}],links:[{source:"A",target:"B",value:20},{source:"A",target:"C",value:10},{source:"B",target:"D",value:15},{source:"B",target:"E",value:25},{source:"C",target:"E",value:23},{source:"D",target:"F",value:12},{source:"E",target:"F",value:18}]}}},F={args:{data:D.args.data,width:1e3,height:600,margin:{top:30,right:40,bottom:40,left:50},nodeWidth:30,nodePadding:20,colors:["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b"]}},I={args:{data:{nodes:[{id:"Input",name:"Input"},{id:"Process",name:"Process"},{id:"Output",name:"Output"}],links:[{source:"Input",target:"Process",value:10},{source:"Process",target:"Output",value:10}]},width:600,height:300}},j={args:{data:{nodes:[{id:"Source1",name:"Source 1"},{id:"Source2",name:"Source 2"},{id:"Source3",name:"Source 3"},{id:"Process1",name:"Process 1"},{id:"Process2",name:"Process 2"},{id:"Process3",name:"Process 3"},{id:"Target1",name:"Target 1"},{id:"Target2",name:"Target 2"},{id:"Target3",name:"Target 3"}],links:[{source:"Source1",target:"Process1",value:15},{source:"Source1",target:"Process2",value:10},{source:"Source2",target:"Process2",value:20},{source:"Source2",target:"Process3",value:5},{source:"Source3",target:"Process3",value:25},{source:"Process1",target:"Target1",value:12},{source:"Process1",target:"Target2",value:8},{source:"Process2",target:"Target2",value:22},{source:"Process3",target:"Target3",value:20}]},width:1200,height:800}};var se,ae,ie;D.parameters={...D.parameters,docs:{...(se=D.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    data: {
      nodes: [{
        id: "A",
        name: "A"
      }, {
        id: "B",
        name: "B"
      }, {
        id: "C",
        name: "C"
      }, {
        id: "D",
        name: "D"
      }, {
        id: "E",
        name: "E"
      }, {
        id: "F",
        name: "F"
      }],
      links: [{
        source: "A",
        target: "B",
        value: 20
      }, {
        source: "A",
        target: "C",
        value: 10
      }, {
        source: "B",
        target: "D",
        value: 15
      }, {
        source: "B",
        target: "E",
        value: 25
      }, {
        source: "C",
        target: "E",
        value: 23
      }, {
        source: "D",
        target: "F",
        value: 12
      }, {
        source: "E",
        target: "F",
        value: 18
      }]
    }
  }
}`,...(ie=(ae=D.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};var ue,ce,le;F.parameters={...F.parameters,docs:{...(ue=F.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    data: Default.args.data,
    width: 1000,
    height: 600,
    margin: {
      top: 30,
      right: 40,
      bottom: 40,
      left: 50
    },
    nodeWidth: 30,
    nodePadding: 20,
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"]
  }
}`,...(le=(ce=F.parameters)==null?void 0:ce.docs)==null?void 0:le.source}}};var fe,de,ge;I.parameters={...I.parameters,docs:{...(fe=I.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    data: {
      nodes: [{
        id: "Input",
        name: "Input"
      }, {
        id: "Process",
        name: "Process"
      }, {
        id: "Output",
        name: "Output"
      }],
      links: [{
        source: "Input",
        target: "Process",
        value: 10
      }, {
        source: "Process",
        target: "Output",
        value: 10
      }]
    },
    width: 600,
    height: 300
  }
}`,...(ge=(de=I.parameters)==null?void 0:de.docs)==null?void 0:ge.source}}};var me,he,pe;j.parameters={...j.parameters,docs:{...(me=j.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    data: {
      nodes: [{
        id: "Source1",
        name: "Source 1"
      }, {
        id: "Source2",
        name: "Source 2"
      }, {
        id: "Source3",
        name: "Source 3"
      }, {
        id: "Process1",
        name: "Process 1"
      }, {
        id: "Process2",
        name: "Process 2"
      }, {
        id: "Process3",
        name: "Process 3"
      }, {
        id: "Target1",
        name: "Target 1"
      }, {
        id: "Target2",
        name: "Target 2"
      }, {
        id: "Target3",
        name: "Target 3"
      }],
      links: [
      // Sources to Processes
      {
        source: "Source1",
        target: "Process1",
        value: 15
      }, {
        source: "Source1",
        target: "Process2",
        value: 10
      }, {
        source: "Source2",
        target: "Process2",
        value: 20
      }, {
        source: "Source2",
        target: "Process3",
        value: 5
      }, {
        source: "Source3",
        target: "Process3",
        value: 25
      },
      // Processes to Targets
      {
        source: "Process1",
        target: "Target1",
        value: 12
      }, {
        source: "Process1",
        target: "Target2",
        value: 8
      }, {
        source: "Process2",
        target: "Target2",
        value: 22
      }, {
        source: "Process3",
        target: "Target3",
        value: 20
      }]
    },
    width: 1200,
    height: 800
  }
}`,...(pe=(he=j.parameters)==null?void 0:he.docs)==null?void 0:pe.source}}};const et=["Default","CustomStyle","SimpleFlow","ComplexFlow"];export{j as ComplexFlow,F as CustomStyle,D as Default,I as SimpleFlow,et as __namedExportsOrder,Ue as default};
