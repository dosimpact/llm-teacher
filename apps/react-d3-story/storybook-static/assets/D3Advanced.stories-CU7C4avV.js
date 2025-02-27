import{j as z}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-B7o9TaAI.js";import{s as R}from"./transform-BIeV-TGt.js";import{o as H}from"./ordinal-BIATHBfR.js";import{s as L,m as U}from"./manyBody-DMdDB1GA.js";import{l as X,c as Y,d as J}from"./link-Bbfm1_hM.js";import{c as K}from"./category10-D7Iw8EHd.js";import"./index-BM9YtLjs.js";import"./nodrag-RD0ZtkeO.js";import"./pointer-Drloq0xg.js";import"./colors-Cc3OSVma.js";const f={width:600,height:400,margin:{top:20,right:30,bottom:40,left:50}},Q=r=>{const{width:n,height:i,margin:a}=r;return{width:n-a.left-a.right,height:i-a.top-a.bottom}},Z=()=>R("body").append("div").attr("class","tooltip").style("position","absolute").style("pointer-events","none").style("background","rgba(0, 0, 0, 0.8)").style("color","white").style("padding","8px").style("border-radius","4px").style("font-size","12px").style("opacity",0),F=({data:r,width:n=f.width,height:i=f.height,margin:a=f.margin,nodeRadius:y=5,linkStrength:v=.3,chargeStrength:x=-30,className:V,style:N,onNodeClick:p})=>{const g=u.useRef(null),s=u.useRef(),b=u.useMemo(()=>({width:n,height:i,margin:a}),[n,i,a]),{width:B,height:_}=Q(b);return u.useEffect(()=>{if(!g.current)return;const k=R(g.current);k.selectAll("*").remove(),s.current||(s.current=Z());const w=k.append("g").attr("transform",`translate(${a.left},${a.top})`),m=L(r.nodes).force("link",X(r.links).id(e=>e.id).strength(v)).force("charge",U().strength(x)).force("center",Y(B/2,_/2)),G=H(K),M=w.append("g").selectAll("line").data(r.links).join("line").attr("stroke","#999").attr("stroke-opacity",.6).attr("stroke-width",e=>Math.sqrt(e.value)),D=w.append("g").selectAll("circle").data(r.nodes).join("circle").attr("r",y).attr("fill",e=>G(e.group)).attr("stroke","#fff").attr("stroke-width",1.5).call(P(m));D.on("mouseover",(e,o)=>{s.current.style("opacity",1).html(`ID: ${o.id}<br/>Group: ${o.group}<br/>Value: ${o.value}`).style("left",`${e.pageX+10}px`).style("top",`${e.pageY-10}px`)}).on("mouseout",()=>{s.current.style("opacity",0)}).on("click",(e,o)=>{p&&p(o.id)}),m.on("tick",()=>{M.attr("x1",e=>e.source.x).attr("y1",e=>e.source.y).attr("x2",e=>e.target.x).attr("y2",e=>e.target.y),D.attr("cx",e=>e.x).attr("cy",e=>e.y)});function P(e){function o(t){t.active||e.alphaTarget(.3).restart(),t.subject.fx=t.subject.x,t.subject.fy=t.subject.y}function W(t){t.subject.fx=t.x,t.subject.fy=t.y}function O(t){t.active||e.alphaTarget(0),t.subject.fx=null,t.subject.fy=null}return J().on("start",o).on("drag",W).on("end",O)}return()=>{var e;m.stop(),(e=s.current)==null||e.remove(),s.current=void 0}},[r,b,y,v,x,p]),z.jsx("svg",{ref:g,width:n,height:i,className:V,style:N})};F.__docgenInfo={description:"",methods:[],displayName:"ForceGraph",props:{className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},data:{required:!0,tsType:{name:"NetworkData"},description:""},nodeRadius:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"5",computed:!1}},linkStrength:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0.3",computed:!1}},chargeStrength:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"-30",computed:!1}},onNodeClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(nodeId: string) => void",signature:{arguments:[{type:{name:"string"},name:"nodeId"}],return:{name:"void"}}},description:""},width:{defaultValue:{value:"600",computed:!1},required:!1},height:{defaultValue:{value:"400",computed:!1},required:!1},margin:{defaultValue:{value:`{
  top: 20,
  right: 30,
  bottom: 40,
  left: 50,
}`,computed:!1},required:!1}},composes:["Partial"]};const de={title:"D3 Advanced/ForceGraph",component:F,parameters:{layout:"centered"}},h={nodes:[{id:"A",group:"group1",value:20},{id:"B",group:"group1",value:15},{id:"C",group:"group2",value:25},{id:"D",group:"group2",value:18},{id:"E",group:"group3",value:22},{id:"F",group:"group3",value:30}],links:[{source:"A",target:"B",value:5},{source:"B",target:"C",value:3},{source:"C",target:"D",value:7},{source:"D",target:"E",value:4},{source:"E",target:"F",value:6},{source:"F",target:"A",value:2},{source:"A",target:"D",value:8},{source:"B",target:"E",value:3},{source:"C",target:"F",value:5}]},c={args:{data:h,width:600,height:400}},l={args:{data:h,width:600,height:400,nodeRadius:8,linkStrength:.5,chargeStrength:-50}},d={args:{data:h,width:600,height:400,onNodeClick:r=>{alert(`노드 ${r}가 클릭되었습니다!`)}}};var S,j,q;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    data: sampleData,
    width: 600,
    height: 400
  }
}`,...(q=(j=c.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};var I,T,$;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    data: sampleData,
    width: 600,
    height: 400,
    nodeRadius: 8,
    linkStrength: 0.5,
    chargeStrength: -50
  }
}`,...($=(T=l.parameters)==null?void 0:T.docs)==null?void 0:$.source}}};var E,A,C;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    data: sampleData,
    width: 600,
    height: 400,
    onNodeClick: (nodeId: string) => {
      alert(\`노드 \${nodeId}가 클릭되었습니다!\`);
    }
  }
}`,...(C=(A=d.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};const pe=["Default","CustomStyling","WithInteraction"];export{l as CustomStyling,c as Default,d as WithInteraction,pe as __namedExportsOrder,de as default};
