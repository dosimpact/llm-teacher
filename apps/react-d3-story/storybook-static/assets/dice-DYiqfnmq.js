function c(u){u.x0=Math.round(u.x0),u.y0=Math.round(u.y0),u.x1=Math.round(u.x1),u.y1=Math.round(u.y1)}function e(u,r,i,l,y){for(var t=u.children,a,h=-1,n=t.length,x=u.value&&(l-r)/u.value;++h<n;)a=t[h],a.y0=i,a.y1=y,a.x0=r,a.x1=r+=a.value*x}export{c as r,e as t};
