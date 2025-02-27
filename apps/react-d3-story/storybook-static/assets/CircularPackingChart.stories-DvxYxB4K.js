import{j as ue}from"./jsx-runtime-D_zvdyIk.js";import{r as I}from"./index-B7o9TaAI.js";import{s as A}from"./transform-BIeV-TGt.js";import{h as me}from"./index-DocUNPKL.js";import{o as ce}from"./ordinal-BIATHBfR.js";import{o as de,c as T,a as fe}from"./constant-CNVSbJfz.js";import{S as he}from"./Set3-CKsqm_QX.js";import"./index-BM9YtLjs.js";import"./colors-Cc3OSVma.js";const pe=1664525,ye=1013904223,U=4294967296;function ge(){let n=1;return()=>(n=(pe*n+ye)%U)/U}function ve(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function xe(n,a){let e=n.length,r,t;for(;e;)t=a()*e--|0,r=n[e],n[e]=n[t],n[t]=r;return n}function be(n,a){for(var e=0,r=(n=xe(Array.from(n),a)).length,t=[],o,i;e<r;)o=n[e],i&&se(i,o)?++e:(i=_e(t=ke(t,o)),e=0);return i}function ke(n,a){var e,r;if(E(a,n))return[a];for(e=0;e<n.length;++e)if(M(a,n[e])&&E(y(n[e],a),n))return[n[e],a];for(e=0;e<n.length-1;++e)for(r=e+1;r<n.length;++r)if(M(y(n[e],n[r]),a)&&M(y(n[e],a),n[r])&&M(y(n[r],a),n[e])&&E(le(n[e],n[r],a),n))return[n[e],n[r],a];throw new Error}function M(n,a){var e=n.r-a.r,r=a.x-n.x,t=a.y-n.y;return e<0||e*e<r*r+t*t}function se(n,a){var e=n.r-a.r+Math.max(n.r,a.r,1)*1e-9,r=a.x-n.x,t=a.y-n.y;return e>0&&e*e>r*r+t*t}function E(n,a){for(var e=0;e<a.length;++e)if(!se(n,a[e]))return!1;return!0}function _e(n){switch(n.length){case 1:return we(n[0]);case 2:return y(n[0],n[1]);case 3:return le(n[0],n[1],n[2])}}function we(n){return{x:n.x,y:n.y,r:n.r}}function y(n,a){var e=n.x,r=n.y,t=n.r,o=a.x,i=a.y,u=a.r,s=o-e,m=i-r,c=u-t,d=Math.sqrt(s*s+m*m);return{x:(e+o+s/d*c)/2,y:(r+i+m/d*c)/2,r:(d+t+u)/2}}function le(n,a,e){var r=n.x,t=n.y,o=n.r,i=a.x,u=a.y,s=a.r,m=e.x,c=e.y,d=e.r,f=r-i,p=r-m,l=t-u,h=t-c,N=s-o,V=d-o,z=r*r+t*t-o*o,P=z-i*i-u*u+s*s,H=z-m*m-c*c+d*d,v=p*l-f*h,x=(l*H-h*P)/(v*2)-r,b=(h*N-l*V)/v,k=(p*P-f*H)/(v*2)-t,_=(f*V-p*N)/v,j=b*b+_*_-1,w=2*(o+x*b+k*_),O=x*x+k*k-o*o,R=-(Math.abs(j)>1e-6?(w+Math.sqrt(w*w-4*j*O))/(2*j):O/w);return{x:r+x+b*R,y:t+k+_*R,r:R}}function X(n,a,e){var r=n.x-a.x,t,o,i=n.y-a.y,u,s,m=r*r+i*i;m?(o=a.r+e.r,o*=o,s=n.r+e.r,s*=s,o>s?(t=(m+s-o)/(2*m),u=Math.sqrt(Math.max(0,s/m-t*t)),e.x=n.x-t*r-u*i,e.y=n.y-t*i+u*r):(t=(m+o-s)/(2*m),u=Math.sqrt(Math.max(0,o/m-t*t)),e.x=a.x+t*r-u*i,e.y=a.y+t*i+u*r)):(e.x=a.x+e.r,e.y=a.y)}function F(n,a){var e=n.r+a.r-1e-6,r=a.x-n.x,t=a.y-n.y;return e>0&&e*e>r*r+t*t}function G(n){var a=n._,e=n.next._,r=a.r+e.r,t=(a.x*e.r+e.x*a.r)/r,o=(a.y*e.r+e.y*a.r)/r;return t*t+o*o}function $(n){this._=n,this.next=null,this.previous=null}function Ae(n,a){if(!(o=(n=ve(n)).length))return 0;var e,r,t,o,i,u,s,m,c,d,f;if(e=n[0],e.x=0,e.y=0,!(o>1))return e.r;if(r=n[1],e.x=-r.r,r.x=e.r,r.y=0,!(o>2))return e.r+r.r;X(r,e,t=n[2]),e=new $(e),r=new $(r),t=new $(t),e.next=t.previous=r,r.next=e.previous=t,t.next=r.previous=e;e:for(s=3;s<o;++s){X(e._,r._,t=n[s]),t=new $(t),m=r.next,c=e.previous,d=r._.r,f=e._.r;do if(d<=f){if(F(m._,t._)){r=m,e.next=r,r.previous=e,--s;continue e}d+=m._.r,m=m.next}else{if(F(c._,t._)){e=c,e.next=r,r.previous=e,--s;continue e}f+=c._.r,c=c.previous}while(m!==c.next);for(t.previous=e,t.next=r,e.next=r.previous=r=t,i=G(e);(t=t.next)!==r;)(u=G(t))<i&&(e=t,i=u);r=e.next}for(e=[r._],t=r;(t=t.next)!==r;)e.push(t._);for(t=be(e,a),s=0;s<o;++s)e=n[s],e.x-=t.x,e.y-=t.y;return t.r}function Me(n){return Math.sqrt(n.value)}function $e(){var n=null,a=1,e=1,r=T;function t(o){const i=ge();return o.x=a/2,o.y=e/2,n?o.eachBefore(J(n)).eachAfter(D(r,.5,i)).eachBefore(W(1)):o.eachBefore(J(Me)).eachAfter(D(T,1,i)).eachAfter(D(r,o.r/Math.min(a,e),i)).eachBefore(W(Math.min(a,e)/(2*o.r))),o}return t.radius=function(o){return arguments.length?(n=de(o),t):n},t.size=function(o){return arguments.length?(a=+o[0],e=+o[1],t):[a,e]},t.padding=function(o){return arguments.length?(r=typeof o=="function"?o:fe(+o),t):r},t}function J(n){return function(a){a.children||(a.r=Math.max(0,+n(a)||0))}}function D(n,a,e){return function(r){if(t=r.children){var t,o,i=t.length,u=n(r)*a||0,s;if(u)for(o=0;o<i;++o)t[o].r+=u;if(s=Ae(t,e),u)for(o=0;o<i;++o)t[o].r-=u;r.r=s+u}}}function W(n){return function(a){var e=a.parent;a.r*=n,e&&(a.x=e.x+n*a.x,a.y=e.y+n*a.y)}}const L=I.memo(({data:n,width:a=800,height:e=800,margin:r={top:20,right:20,bottom:20,left:20},colors:t=he})=>{const o=I.useRef(null);return I.useEffect(()=>{if(!o.current)return;const i=A(o.current);i.selectAll("*").remove();const u=me(n).sum(l=>l.value||0).sort((l,h)=>(h.value||0)-(l.value||0)),m=$e().size([a-r.left-r.right,e-r.top-r.bottom]).padding(3)(u),c=ce().domain(u.descendants().map(l=>l.depth.toString())).range(t),d=i.append("g").attr("transform",`translate(${r.left},${r.top})`),f=A("body").append("div").style("position","absolute").style("visibility","hidden").style("background-color","white").style("border","1px solid #ddd").style("padding","10px").style("border-radius","5px").style("font-size","12px"),p=d.selectAll("g").data(m.descendants()).join("g").attr("transform",l=>`translate(${l.x},${l.y})`);return p.append("circle").attr("r",l=>l.r).attr("fill",l=>c(l.depth.toString())).attr("fill-opacity",.7).attr("stroke","#fff").attr("stroke-width",2).on("mouseover",function(l,h){A(this).attr("fill-opacity",1),f.style("visibility","visible").html(`
            <strong>${h.data.name}</strong><br/>
            ${h.value?`Value: ${h.value}`:""}
            ${h.children?`<br/>Children: ${h.children.length}`:""}
          `)}).on("mousemove",function(l){f.style("top",l.pageY-10+"px").style("left",l.pageX+10+"px")}).on("mouseout",function(){A(this).attr("fill-opacity",.7),f.style("visibility","hidden")}),p.append("text").filter(l=>l.r>20).attr("dy",".3em").style("text-anchor","middle").style("font-size",l=>Math.min(l.r/3,12)+"px").style("fill","#333").text(l=>l.data.name),()=>{f.remove()}},[n,a,e,r,t]),ue.jsx("svg",{ref:o,width:a,height:e})});L.displayName="CircularPackingChart";L.__docgenInfo={description:"",methods:[],displayName:"CircularPackingChart",props:{data:{required:!0,tsType:{name:"HierarchyNode"},description:""},width:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"800",computed:!1}},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"800",computed:!1}},margin:{required:!1,tsType:{name:"signature",type:"object",raw:"{ top: number; right: number; bottom: number; left: number }",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"right",value:{name:"number",required:!0}},{key:"bottom",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}}]}},description:"",defaultValue:{value:"{ top: 20, right: 20, bottom: 20, left: 20 }",computed:!1}},colors:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:"d3.schemeSet3",computed:!0}}}};const Ne={title:"D3 Advanced/CircularPackingChart",component:L,parameters:{layout:"centered"},tags:["autodocs"]},g={args:{data:{name:"Organization",children:[{name:"Engineering",children:[{name:"Frontend",children:[{name:"React",value:30},{name:"Vue",value:20},{name:"Angular",value:15}]},{name:"Backend",children:[{name:"Node.js",value:25},{name:"Python",value:20},{name:"Java",value:15}]}]},{name:"Design",children:[{name:"UI",value:20},{name:"UX",value:15},{name:"Graphics",value:10}]},{name:"Marketing",children:[{name:"Social Media",value:15},{name:"Content",value:12},{name:"SEO",value:8}]}]}}},C={args:{...g.args,width:1e3,height:1e3,margin:{top:30,right:40,bottom:40,left:50},colors:["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd"]}},S={args:{data:{name:"Root",children:[{name:"Category A",children:[{name:"Item 1",value:10},{name:"Item 2",value:15}]},{name:"Category B",children:[{name:"Item 3",value:20},{name:"Item 4",value:5}]}]},width:600,height:600}},q={args:{data:{name:"Root",children:Array.from({length:3},(n,a)=>({name:`Level 1 - ${a+1}`,children:Array.from({length:4},(e,r)=>({name:`Level 2 - ${a+1}.${r+1}`,children:Array.from({length:3},(t,o)=>({name:`Level 3 - ${a+1}.${r+1}.${o+1}`,value:Math.floor(Math.random()*30)+5}))}))}))},width:1200,height:1200}};var Y,Z,K;g.parameters={...g.parameters,docs:{...(Y=g.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...(K=(Z=g.parameters)==null?void 0:Z.docs)==null?void 0:K.source}}};var Q,B,ee;C.parameters={...C.parameters,docs:{...(Q=C.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"]
  }
}`,...(ee=(B=C.parameters)==null?void 0:B.docs)==null?void 0:ee.source}}};var ne,re,te;S.parameters={...S.parameters,docs:{...(ne=S.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    data: {
      name: "Root",
      children: [{
        name: "Category A",
        children: [{
          name: "Item 1",
          value: 10
        }, {
          name: "Item 2",
          value: 15
        }]
      }, {
        name: "Category B",
        children: [{
          name: "Item 3",
          value: 20
        }, {
          name: "Item 4",
          value: 5
        }]
      }]
    },
    width: 600,
    height: 600
  }
}`,...(te=(re=S.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var ae,oe,ie;q.parameters={...q.parameters,docs:{...(ae=q.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    data: {
      name: "Root",
      children: Array.from({
        length: 3
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
            value: Math.floor(Math.random() * 30) + 5
          }))
        }))
      }))
    },
    width: 1200,
    height: 1200
  }
}`,...(ie=(oe=q.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};const Ve=["Default","CustomStyle","SimpleHierarchy","DeepHierarchy"];export{C as CustomStyle,q as DeepHierarchy,g as Default,S as SimpleHierarchy,Ve as __namedExportsOrder,Ne as default};
