import{o as w,i as I}from"./ordinal-BIATHBfR.js";function O(n,u,g){n=+n,u=+u,g=(e=arguments.length)<2?(u=n,n=0,1):e<3?1:+g;for(var t=-1,e=Math.max(0,Math.ceil((u-n)/g))|0,a=new Array(e);++t<e;)a[t]=n+t*g;return a}function s(){var n=w().unknown(void 0),u=n.domain,g=n.range,t=0,e=1,a,p,o=!1,d=0,h=0,l=.5;delete n.unknown;function i(){var r=u().length,m=e<t,f=m?e:t,c=m?t:e;a=(c-f)/Math.max(1,r-d+h*2),o&&(a=Math.floor(a)),f+=(c-f-a*(r-d))*l,p=a*(1-d),o&&(f=Math.round(f),p=Math.round(p));var M=O(r).map(function(y){return f+a*y});return g(m?M.reverse():M)}return n.domain=function(r){return arguments.length?(u(r),i()):u()},n.range=function(r){return arguments.length?([t,e]=r,t=+t,e=+e,i()):[t,e]},n.rangeRound=function(r){return[t,e]=r,t=+t,e=+e,o=!0,i()},n.bandwidth=function(){return p},n.step=function(){return a},n.round=function(r){return arguments.length?(o=!!r,i()):o},n.padding=function(r){return arguments.length?(d=Math.min(1,h=+r),i()):d},n.paddingInner=function(r){return arguments.length?(d=Math.min(1,r),i()):d},n.paddingOuter=function(r){return arguments.length?(h=+r,i()):h},n.align=function(r){return arguments.length?(l=Math.max(0,Math.min(1,r)),i()):l},n.copy=function(){return s(u(),[t,e]).round(o).paddingInner(d).paddingOuter(h).align(l)},I.apply(i(),arguments)}function v(n){var u=n.copy;return n.padding=n.paddingOuter,delete n.paddingInner,delete n.paddingOuter,n.copy=function(){return v(u())},n}function x(){return v(s.apply(null,arguments).paddingInner(1))}export{s as b,x as p};
