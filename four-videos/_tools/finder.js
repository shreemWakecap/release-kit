(()=>{
const all=[...document.querySelectorAll('*')];
const rc=e=>{const r=e.getBoundingClientRect();return [Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)]};
// smallest element whose text includes every string in `has`, within size limits
const box=(has,o={})=>{const c=all.filter(e=>{const t=e.innerText||'';if(!has.every(h=>t.includes(h)))return false;const r=e.getBoundingClientRect();return r.width>=(o.minW||0)&&r.width<=(o.maxW||9999)&&r.height>=(o.minH||0)&&r.height<=(o.maxH||9999)&&r.x>=(o.minX||0)&&r.y>=(o.minY||0)});c.sort((a,b)=>{const A=a.getBoundingClientRect(),B=b.getBoundingClientRect();return A.width*A.height-B.width*B.height});return c[0]?rc(c[0]):null};
const leaf=(t,o={})=>{const c=all.filter(e=>e.children.length===0&&(e.innerText||'').trim()===t&&e.getBoundingClientRect().x>=(o.minX||0)&&e.getBoundingClientRect().y>=(o.minY||0));return c[o.i||0]?rc(c[o.i||0]):null};
window.__f={box,leaf,rc};
return 'ok'})()
