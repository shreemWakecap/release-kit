(()=>{const out=[];const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;const re=/Main Plant Weather Station|SCC Weather Station/g;
while(n=w.nextNode()){const t=n.nodeValue;let m;while((m=re.exec(t))){const r=document.createRange();r.setStart(n,m.index);r.setEnd(n,m.index+m[0].length);const b=r.getBoundingClientRect();if(b.width<1)continue;out.push({text:m[0],x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.width),h:Math.round(b.height)})}}
return JSON.stringify(out)})()
