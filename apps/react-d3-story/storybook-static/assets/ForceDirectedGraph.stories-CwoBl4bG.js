import{j as S}from"./jsx-runtime-D_zvdyIk.js";import{r as m}from"./index-B7o9TaAI.js";import{s as E}from"./transform-BIeV-TGt.js";import{s as T,m as _}from"./manyBody-DMdDB1GA.js";import{l as q,c as B,d as G}from"./link-Bbfm1_hM.js";import"./index-BM9YtLjs.js";import"./nodrag-RD0ZtkeO.js";import"./pointer-Drloq0xg.js";const p=m.memo(({data:r,width:t=600,height:d=400,nodeRadius:f=5,linkDistance:g=100,charge:h=-30})=>{const l=m.useRef(null);m.useEffect(()=>{if(!l.current||!r.nodes.length)return;const a=E(l.current);a.selectAll("*").remove();const n=T(r.nodes).force("link",q(r.links).id(e=>e.id).distance(g)).force("charge",_().strength(h)).force("center",B(t/2,d/2)),u=a.append("g").selectAll("line").data(r.links).join("line").attr("stroke","#999").attr("stroke-opacity",.6).attr("stroke-width",e=>Math.sqrt(e.value||1)),s=a.append("g").selectAll("circle").data(r.nodes).join("circle").attr("r",f).attr("fill","#69b3a2").call(M(n));return s.append("title").text(e=>e.id),n.on("tick",()=>{u.attr("x1",e=>e.source.x).attr("y1",e=>e.source.y).attr("x2",e=>e.target.x).attr("y2",e=>e.target.y),s.attr("cx",e=>e.x).attr("cy",e=>e.y)}),()=>{n.stop()}},[r,t,d,f,g,h]);const M=a=>{function n(e){e.active||a.alphaTarget(.3).restart(),e.subject.fx=e.subject.x,e.subject.fy=e.subject.y}function u(e){e.subject.fx=e.x,e.subject.fy=e.y}function s(e){e.active||a.alphaTarget(0),e.subject.fx=null,e.subject.fy=null}return G().on("start",n).on("drag",u).on("end",s)};return S.jsx("svg",{ref:l,width:t,height:d})});p.displayName="ForceDirectedGraph";p.__docgenInfo={description:"",methods:[],displayName:"ForceDirectedGraph",props:{data:{required:!0,tsType:{name:"GraphData"},description:""},width:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"600",computed:!1}},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"400",computed:!1}},nodeRadius:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"5",computed:!1}},linkDistance:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},charge:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"-30",computed:!1}}}};const O={title:"D3 Advanced/ForceDirectedGraph",component:p,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{data:{nodes:[{id:"A"},{id:"B"},{id:"C"},{id:"D"},{id:"E"}],links:[{source:"A",target:"B",value:1},{source:"B",target:"C",value:2},{source:"C",target:"D",value:1},{source:"D",target:"E",value:3},{source:"E",target:"A",value:2}]}}},c={args:{...o.args,width:800,height:600,nodeRadius:8,linkDistance:150,charge:-50}},i={args:{data:{nodes:Array.from({length:20},(r,t)=>({id:String.fromCharCode(65+t)})),links:Array.from({length:30},(r,t)=>({source:String.fromCharCode(65+Math.floor(Math.random()*20)),target:String.fromCharCode(65+Math.floor(Math.random()*20)),value:Math.floor(Math.random()*5)+1}))},width:1e3,height:800}};var y,C,D;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    data: {
      nodes: [{
        id: "A"
      }, {
        id: "B"
      }, {
        id: "C"
      }, {
        id: "D"
      }, {
        id: "E"
      }],
      links: [{
        source: "A",
        target: "B",
        value: 1
      }, {
        source: "B",
        target: "C",
        value: 2
      }, {
        source: "C",
        target: "D",
        value: 1
      }, {
        source: "D",
        target: "E",
        value: 3
      }, {
        source: "E",
        target: "A",
        value: 2
      }]
    }
  }
}`,...(D=(C=o.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var x,v,k;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    width: 800,
    height: 600,
    nodeRadius: 8,
    linkDistance: 150,
    charge: -50
  }
}`,...(k=(v=c.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};var b,A,j;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    data: {
      nodes: Array.from({
        length: 20
      }, (_, i) => ({
        id: String.fromCharCode(65 + i)
      })),
      links: Array.from({
        length: 30
      }, (_, i) => ({
        source: String.fromCharCode(65 + Math.floor(Math.random() * 20)),
        target: String.fromCharCode(65 + Math.floor(Math.random() * 20)),
        value: Math.floor(Math.random() * 5) + 1
      }))
    },
    width: 1000,
    height: 800
  }
}`,...(j=(A=i.parameters)==null?void 0:A.docs)==null?void 0:j.source}}};const z=["Default","CustomStyle","LargeDataset"];export{c as CustomStyle,o as Default,i as LargeDataset,z as __namedExportsOrder,O as default};
