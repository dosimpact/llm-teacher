function u(r){let t;for(;t=r.sourceEvent;)r=t;return r}function l(r,t){if(r=u(r),t===void 0&&(t=r.currentTarget),t){var c=t.ownerSVGElement||t;if(c.createSVGPoint){var i=c.createSVGPoint();return i.x=r.clientX,i.y=r.clientY,i=i.matrixTransform(t.getScreenCTM().inverse()),[i.x,i.y]}if(t.getBoundingClientRect){var e=t.getBoundingClientRect();return[r.clientX-e.left-t.clientLeft,r.clientY-e.top-t.clientTop]}}return[r.pageX,r.pageY]}export{l as p};
