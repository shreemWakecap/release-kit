(()=>{const out=[];const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
while(n=w.nextNode()){const t=n.nodeValue;const re=/H7038|Fadhili|FADHILI|\d{2}\.\d{5,}, ?\d{2}\.\d{5,}/g;let m;const idx=[];while((m=re.exec(t)))idx.push(m.index);if(!idx.length)continue;
let start=idx[0];const pre=t.slice(Math.max(0,start-4),start);if(/[—–-]\s*$/.test(pre)&&start>0){start=Math.max(0,start-4+pre.search(/[—–-]/))}
const r=document.createRange();r.setStart(n,start);r.setEnd(n,t.length);const b=r.getBoundingClientRect();if(b.width<1)continue;
out.push({text:t.slice(start).trim(),x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.width),h:Math.round(b.height)})}
return JSON.stringify(out)})()
