import{j as Fe}from"./jsx-runtime-D_zvdyIk.js";import{r as ue}from"./index-B7o9TaAI.js";import{d as He,i as xe,s as $}from"./transform-BIeV-TGt.js";import{b as We,a as Je}from"./linear-BvEZjWga.js";import{p as ke}from"./pointer-Drloq0xg.js";import{d as Qe,y as Ue}from"./nodrag-RD0ZtkeO.js";import{e as Ze,l as et}from"./line-DIHS9p7a.js";import{o as tt}from"./ordinal-BIATHBfR.js";import{p as nt}from"./band-COO5LgbV.js";import{S as rt}from"./Set3-CKsqm_QX.js";import{b as it}from"./axis-D3QohQNI.js";import"./index-BM9YtLjs.js";import"./path-CSVzDSO0.js";import"./colors-Cc3OSVma.js";const ce=n=>()=>n;function at(n,{sourceEvent:d,target:T,selection:z,mode:h,dispatch:M}){Object.defineProperties(this,{type:{value:n,enumerable:!0,configurable:!0},sourceEvent:{value:d,enumerable:!0,configurable:!0},target:{value:T,enumerable:!0,configurable:!0},selection:{value:z,enumerable:!0,configurable:!0},mode:{value:h,enumerable:!0,configurable:!0},_:{value:M}})}function st(n){n.stopImmediatePropagation()}function fe(n){n.preventDefault(),n.stopImmediatePropagation()}var Ae={name:"drag"},me={name:"space"},K={name:"handle"},I={name:"center"};const{abs:_e,max:_,min:D}=Math;function De(n){return[+n[0],+n[1]]}function Ee(n){return[De(n[0]),De(n[1])]}var pe={},ae={name:"y",handles:["n","s"].map(he),input:function(n,d){return n==null?null:[[d[0][0],+n[0]],[d[1][0],+n[1]]]},output:function(n){return n&&[n[0][1],n[1][1]]}},R={overlay:"crosshair",selection:"move",n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},Se={e:"w",w:"e",nw:"ne",ne:"nw",se:"sw",sw:"se"},Ce={n:"s",s:"n",nw:"sw",ne:"se",se:"ne",sw:"nw"},ot={overlay:1,selection:1,n:null,e:1,s:null,w:-1,nw:-1,ne:1,se:1,sw:-1},lt={overlay:1,selection:1,n:-1,e:null,s:1,w:null,nw:-1,ne:-1,se:1,sw:1};function he(n){return{type:n}}function ut(n){return!n.ctrlKey&&!n.button}function ct(){var n=this.ownerSVGElement||this;return n.hasAttribute("viewBox")?(n=n.viewBox.baseVal,[[n.x,n.y],[n.x+n.width,n.y+n.height]]):[[0,0],[n.width.baseVal.value,n.height.baseVal.value]]}function ft(){return navigator.maxTouchPoints||"ontouchstart"in this}function de(n){for(;!n.__brush;)if(!(n=n.parentNode))return;return n.__brush}function mt(n){return n[0][0]===n[1][0]||n[0][1]===n[1][1]}function pt(){return dt(ae)}function dt(n){var d=ct,T=ut,z=ft,h=!0,M=He("start","brush","end"),E=6,N;function l(t){var e=t.property("__brush",Y).selectAll(".overlay").data([he("overlay")]);e.enter().append("rect").attr("class","overlay").attr("pointer-events","all").attr("cursor",R.overlay).merge(e).each(function(){var i=de(this).extent;$(this).attr("x",i[0][0]).attr("y",i[0][1]).attr("width",i[1][0]-i[0][0]).attr("height",i[1][1]-i[0][1])}),t.selectAll(".selection").data([he("selection")]).enter().append("rect").attr("class","selection").attr("cursor",R.selection).attr("fill","#777").attr("fill-opacity",.3).attr("stroke","#fff").attr("shape-rendering","crispEdges");var r=t.selectAll(".handle").data(n.handles,function(i){return i.type});r.exit().remove(),r.enter().append("rect").attr("class",function(i){return"handle handle--"+i.type}).attr("cursor",function(i){return R[i.type]}),t.each(O).attr("fill","none").attr("pointer-events","all").on("mousedown.brush",Q).filter(z).on("touchstart.brush",Q).on("touchmove.brush",se).on("touchend.brush touchcancel.brush",oe).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}l.move=function(t,e,r){t.tween?t.on("start.brush",function(i){V(this,arguments).beforestart().start(i)}).on("interrupt.brush end.brush",function(i){V(this,arguments).end(i)}).tween("brush",function(){var i=this,s=i.__brush,o=V(i,arguments),y=s.selection,q=n.input(typeof e=="function"?e.apply(this,arguments):e,s.extent),u=We(y,q);function S(c){s.selection=c===1&&q===null?null:u(c),O.call(i),o.brush()}return y!==null&&q!==null?S:S(1)}):t.each(function(){var i=this,s=arguments,o=i.__brush,y=n.input(typeof e=="function"?e.apply(i,s):e,o.extent),q=V(i,s).beforestart();xe(i),o.selection=y===null?null:y,O.call(i),q.start(r).brush(r).end(r)})},l.clear=function(t,e){l.move(t,null,e)};function O(){var t=$(this),e=de(this).selection;e?(t.selectAll(".selection").style("display",null).attr("x",e[0][0]).attr("y",e[0][1]).attr("width",e[1][0]-e[0][0]).attr("height",e[1][1]-e[0][1]),t.selectAll(".handle").style("display",null).attr("x",function(r){return r.type[r.type.length-1]==="e"?e[1][0]-E/2:e[0][0]-E/2}).attr("y",function(r){return r.type[0]==="s"?e[1][1]-E/2:e[0][1]-E/2}).attr("width",function(r){return r.type==="n"||r.type==="s"?e[1][0]-e[0][0]+E:E}).attr("height",function(r){return r.type==="e"||r.type==="w"?e[1][1]-e[0][1]+E:E})):t.selectAll(".selection,.handle").style("display","none").attr("x",null).attr("y",null).attr("width",null).attr("height",null)}function V(t,e,r){var i=t.__brush.emitter;return i&&(!r||!i.clean)?i:new G(t,e,r)}function G(t,e,r){this.that=t,this.args=e,this.state=t.__brush,this.active=0,this.clean=r}G.prototype={beforestart:function(){return++this.active===1&&(this.state.emitter=this,this.starting=!0),this},start:function(t,e){return this.starting?(this.starting=!1,this.emit("start",t,e)):this.emit("brush",t),this},brush:function(t,e){return this.emit("brush",t,e),this},end:function(t,e){return--this.active===0&&(delete this.state.emitter,this.emit("end",t,e)),this},emit:function(t,e,r){var i=$(this.that).datum();M.call(t,this.that,new at(t,{sourceEvent:e,target:l,selection:n.output(this.state.selection),mode:r,dispatch:M}),i)}};function Q(t){if(N&&!t.touches||!T.apply(this,arguments))return;var e=this,r=t.target.__data__.type,i=(h&&t.metaKey?r="overlay":r)==="selection"?Ae:h&&t.altKey?I:K,s=n===ae?null:ot[r],o=n===pe?null:lt[r],y=de(e),q=y.extent,u=y.selection,S=q[0][0],c,b,P=q[0][1],g,v,L=q[1][0],w,x,j=q[1][1],k,A,f=0,m=0,le,U=s&&o&&h&&t.shiftKey,Z,ee,C=Array.from(t.touches||[t],a=>{const p=a.identifier;return a=ke(a,e),a.point0=a.slice(),a.identifier=p,a});xe(e);var H=V(e,arguments,!0).beforestart();if(r==="overlay"){u&&(le=!0);const a=[C[0],C[1]||C[0]];y.selection=u=[[c=n===ae?S:D(a[0][0],a[1][0]),g=n===pe?P:D(a[0][1],a[1][1])],[w=n===ae?L:_(a[0][0],a[1][0]),k=n===pe?j:_(a[0][1],a[1][1])]],C.length>1&&X(t)}else c=u[0][0],g=u[0][1],w=u[1][0],k=u[1][1];b=c,v=g,x=w,A=k;var be=$(e).attr("pointer-events","none"),W=be.selectAll(".overlay").attr("cursor",R[r]);if(t.touches)H.moved=ve,H.ended=we;else{var ge=$(t.view).on("mousemove.brush",ve,!0).on("mouseup.brush",we,!0);h&&ge.on("keydown.brush",Ke,!0).on("keyup.brush",Ie,!0),Qe(t.view)}O.call(e),H.start(t,i.name);function ve(a){for(const p of a.changedTouches||[a])for(const J of C)J.identifier===p.identifier&&(J.cur=ke(p,e));if(U&&!Z&&!ee&&C.length===1){const p=C[0];_e(p.cur[0]-p[0])>_e(p.cur[1]-p[1])?ee=!0:Z=!0}for(const p of C)p.cur&&(p[0]=p.cur[0],p[1]=p.cur[1]);le=!0,fe(a),X(a)}function X(a){const p=C[0],J=p.point0;var B;switch(f=p[0]-J[0],m=p[1]-J[1],i){case me:case Ae:{s&&(f=_(S-c,D(L-w,f)),b=c+f,x=w+f),o&&(m=_(P-g,D(j-k,m)),v=g+m,A=k+m);break}case K:{C[1]?(s&&(b=_(S,D(L,C[0][0])),x=_(S,D(L,C[1][0])),s=1),o&&(v=_(P,D(j,C[0][1])),A=_(P,D(j,C[1][1])),o=1)):(s<0?(f=_(S-c,D(L-c,f)),b=c+f,x=w):s>0&&(f=_(S-w,D(L-w,f)),b=c,x=w+f),o<0?(m=_(P-g,D(j-g,m)),v=g+m,A=k):o>0&&(m=_(P-k,D(j-k,m)),v=g,A=k+m));break}case I:{s&&(b=_(S,D(L,c-f*s)),x=_(S,D(L,w+f*s))),o&&(v=_(P,D(j,g-m*o)),A=_(P,D(j,k+m*o)));break}}x<b&&(s*=-1,B=c,c=w,w=B,B=b,b=x,x=B,r in Se&&W.attr("cursor",R[r=Se[r]])),A<v&&(o*=-1,B=g,g=k,k=B,B=v,v=A,A=B,r in Ce&&W.attr("cursor",R[r=Ce[r]])),y.selection&&(u=y.selection),Z&&(b=u[0][0],x=u[1][0]),ee&&(v=u[0][1],A=u[1][1]),(u[0][0]!==b||u[0][1]!==v||u[1][0]!==x||u[1][1]!==A)&&(y.selection=[[b,v],[x,A]],O.call(e),H.brush(a,i.name))}function we(a){if(st(a),a.touches){if(a.touches.length)return;N&&clearTimeout(N),N=setTimeout(function(){N=null},500)}else Ue(a.view,le),ge.on("keydown.brush keyup.brush mousemove.brush mouseup.brush",null);be.attr("pointer-events","all"),W.attr("cursor",R.overlay),y.selection&&(u=y.selection),mt(u)&&(y.selection=null,O.call(e)),H.end(a,i.name)}function Ke(a){switch(a.keyCode){case 16:{U=s&&o;break}case 18:{i===K&&(s&&(w=x-f*s,c=b+f*s),o&&(k=A-m*o,g=v+m*o),i=I,X(a));break}case 32:{(i===K||i===I)&&(s<0?w=x-f:s>0&&(c=b-f),o<0?k=A-m:o>0&&(g=v-m),i=me,W.attr("cursor",R.selection),X(a));break}default:return}fe(a)}function Ie(a){switch(a.keyCode){case 16:{U&&(Z=ee=U=!1,X(a));break}case 18:{i===I&&(s<0?w=x:s>0&&(c=b),o<0?k=A:o>0&&(g=v),i=K,X(a));break}case 32:{i===me&&(a.altKey?(s&&(w=x-f*s,c=b+f*s),o&&(k=A-m*o,g=v+m*o),i=I):(s<0?w=x:s>0&&(c=b),o<0?k=A:o>0&&(g=v),i=K),W.attr("cursor",R[r]),X(a));break}default:return}fe(a)}}function se(t){V(this,arguments).moved(t)}function oe(t){V(this,arguments).ended(t)}function Y(){var t=this.__brush||{selection:null};return t.extent=Ee(d.apply(this,arguments)),t.dim=n,t}return l.extent=function(t){return arguments.length?(d=typeof t=="function"?t:ce(Ee(t)),l):d},l.filter=function(t){return arguments.length?(T=typeof t=="function"?t:ce(!!t),l):T},l.touchable=function(t){return arguments.length?(z=typeof t=="function"?t:ce(!!t),l):z},l.handleSize=function(t){return arguments.length?(E=+t,l):E},l.keyModifiers=function(t){return arguments.length?(h=!!t,l):h},l.on=function(){var t=M.on.apply(M,arguments);return t===M?l:t},l}const ye=ue.memo(({data:n,dimensions:d=Object.keys(n[0]||{}).filter(l=>l!=="id"&&l!=="group"),width:T=800,height:z=600,margin:h={top:30,right:50,bottom:30,left:50},colors:M=rt,lineOpacity:E=.5,axisLabelRotation:N=-20})=>{const l=ue.useRef(null);return ue.useEffect(()=>{if(!l.current||!n.length||!d.length)return;const O=$(l.current);O.selectAll("*").remove();const V={};d.forEach(e=>{V[e]=Je().domain(Ze(n,r=>Number(r[e]))).range([z-h.bottom,h.top])});const G=nt().range([h.left,T-h.right]).padding(1).domain(d),Q=Array.from(new Set(n.map(e=>e.group||e.id))),se=tt().domain(Q).range(M),oe=et().defined(e=>!isNaN(e[1])).x(e=>e[0]).y(e=>e[1]),Y=O.append("g"),t=$("body").append("div").style("position","absolute").style("visibility","hidden").style("background-color","white").style("border","1px solid #ddd").style("padding","10px").style("border-radius","5px").style("font-size","12px");return d.forEach(e=>{Y.append("g").attr("transform",`translate(${G(e)},0)`).call(it(V[e])).append("text").attr("y",h.top-10).attr("x",0).attr("text-anchor","middle").attr("transform",`rotate(${N})`).style("fill","#333").text(e)}),Y.selectAll("path.data-line").data(n).join("path").attr("class","data-line").attr("d",e=>oe(d.map(r=>[G(r)||0,V[r](Number(e[r]))]))).style("fill","none").style("stroke",e=>se(e.group||e.id)).style("stroke-width",1.5).style("opacity",E).on("mouseover",function(e,r){$(this).style("stroke-width",3).style("opacity",1),t.style("visibility","visible").html(`
            ID: ${r.id}<br/>
            ${r.group?`Group: ${r.group}<br/>`:""}
            ${d.map(i=>`${i}: ${r[i]}`).join("<br/>")}
          `)}).on("mousemove",function(e){t.style("top",e.pageY-10+"px").style("left",e.pageX+10+"px")}).on("mouseout",function(){$(this).style("stroke-width",1.5).style("opacity",E),t.style("visibility","hidden")}),d.forEach(e=>{const r=Y.append("g").attr("transform",`translate(${G(e)},0)`),i=pt().extent([[-8,h.top],[8,z-h.bottom]]).on("brush",function(s){const o=s.selection;if(!o)return;const[y,q]=o.map(V[e].invert);Y.selectAll(".data-line").style("opacity",u=>{const S=Number(u[e]);return S>=y&&S<=q?1:.1})}).on("end",function(s){s.selection||Y.selectAll(".data-line").style("opacity",E)});r.call(i)}),()=>{t.remove()}},[n,d,T,z,h,M,E,N]),Fe.jsx("svg",{ref:l,width:T,height:z})});ye.displayName="ParallelCoordinates";ye.__docgenInfo={description:"",methods:[],displayName:"ParallelCoordinates",props:{data:{required:!0,tsType:{name:"Array",elements:[{name:"ParallelCoordinatesData"}],raw:"ParallelCoordinatesData[]"},description:""},dimensions:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:`Object.keys(data[0] || {}).filter(
  (d) => d !== "id" && d !== "group"
)`,computed:!0}},width:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"800",computed:!1}},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"600",computed:!1}},margin:{required:!1,tsType:{name:"signature",type:"object",raw:"{ top: number; right: number; bottom: number; left: number }",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"right",value:{name:"number",required:!0}},{key:"bottom",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}}]}},description:"",defaultValue:{value:"{ top: 30, right: 50, bottom: 30, left: 50 }",computed:!1}},colors:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:"d3.schemeSet3",computed:!0}},lineOpacity:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0.5",computed:!1}},axisLabelRotation:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"-20",computed:!1}}}};const Tt={title:"D3 Advanced/ParallelCoordinates",component:ye,parameters:{layout:"centered"},tags:["autodocs"]},Ge=n=>Array.from({length:n},(d,T)=>({id:`item-${T+1}`,group:`Group ${Math.floor(T/5)+1}`,dimension1:Math.random()*100,dimension2:Math.random()*100,dimension3:Math.random()*100,dimension4:Math.random()*100,dimension5:Math.random()*100})),F={args:{data:[{id:"1",group:"A",performance:85,reliability:90,usability:75,maintainability:80,efficiency:88},{id:"2",group:"A",performance:78,reliability:85,usability:82,maintainability:75,efficiency:80},{id:"3",group:"B",performance:92,reliability:78,usability:88,maintainability:85,efficiency:75},{id:"4",group:"B",performance:70,reliability:95,usability:70,maintainability:90,efficiency:85},{id:"5",group:"C",performance:88,reliability:82,usability:85,maintainability:78,efficiency:92}],dimensions:["performance","reliability","usability","maintainability","efficiency"]}},te={args:{...F.args,width:1e3,height:600,margin:{top:40,right:60,bottom:40,left:60},colors:["#1f77b4","#ff7f0e","#2ca02c"],lineOpacity:.7,axisLabelRotation:-30}},ne={args:{data:Ge(30),dimensions:["dimension1","dimension2","dimension3","dimension4","dimension5"],width:1200,height:800,lineOpacity:.4}},re={args:{data:Ge(8),dimensions:["dimension1","dimension2","dimension3"],width:600,height:400,lineOpacity:.8}},ie={args:{...F.args,axisLabelRotation:-90}};var Te,Ve,qe;F.parameters={...F.parameters,docs:{...(Te=F.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  args: {
    data: [{
      id: "1",
      group: "A",
      performance: 85,
      reliability: 90,
      usability: 75,
      maintainability: 80,
      efficiency: 88
    }, {
      id: "2",
      group: "A",
      performance: 78,
      reliability: 85,
      usability: 82,
      maintainability: 75,
      efficiency: 80
    }, {
      id: "3",
      group: "B",
      performance: 92,
      reliability: 78,
      usability: 88,
      maintainability: 85,
      efficiency: 75
    }, {
      id: "4",
      group: "B",
      performance: 70,
      reliability: 95,
      usability: 70,
      maintainability: 90,
      efficiency: 85
    }, {
      id: "5",
      group: "C",
      performance: 88,
      reliability: 82,
      usability: 85,
      maintainability: 78,
      efficiency: 92
    }],
    dimensions: ["performance", "reliability", "usability", "maintainability", "efficiency"]
  }
}`,...(qe=(Ve=F.parameters)==null?void 0:Ve.docs)==null?void 0:qe.source}}};var ze,Me,Oe;te.parameters={...te.parameters,docs:{...(ze=te.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    width: 1000,
    height: 600,
    margin: {
      top: 40,
      right: 60,
      bottom: 40,
      left: 60
    },
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c"],
    lineOpacity: 0.7,
    axisLabelRotation: -30
  }
}`,...(Oe=(Me=te.parameters)==null?void 0:Me.docs)==null?void 0:Oe.source}}};var Re,$e,Ne;ne.parameters={...ne.parameters,docs:{...(Re=ne.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  args: {
    data: generateRandomData(30),
    dimensions: ["dimension1", "dimension2", "dimension3", "dimension4", "dimension5"],
    width: 1200,
    height: 800,
    lineOpacity: 0.4
  }
}`,...(Ne=($e=ne.parameters)==null?void 0:$e.docs)==null?void 0:Ne.source}}};var Pe,Le,je;re.parameters={...re.parameters,docs:{...(Pe=re.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    data: generateRandomData(8),
    dimensions: ["dimension1", "dimension2", "dimension3"],
    width: 600,
    height: 400,
    lineOpacity: 0.8
  }
}`,...(je=(Le=re.parameters)==null?void 0:Le.docs)==null?void 0:je.source}}};var Be,Ye,Xe;ie.parameters={...ie.parameters,docs:{...(Be=ie.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    axisLabelRotation: -90
  }
}`,...(Xe=(Ye=ie.parameters)==null?void 0:Ye.docs)==null?void 0:Xe.source}}};const Vt=["Default","CustomStyle","LargeDataset","SmallDataset","VerticalLabels"];export{te as CustomStyle,F as Default,ne as LargeDataset,re as SmallDataset,ie as VerticalLabels,Vt as __namedExportsOrder,Tt as default};
