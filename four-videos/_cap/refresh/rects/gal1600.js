(()=>{const f=window.__f;
const rows=[...document.querySelectorAll('tr,[role=row]')].filter(e=>/^\s*2026-10-0\d/.test(e.innerText||'')).map(e=>{const r=e.getBoundingClientRect();return [Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height),(e.innerText||'').replace(/\s+/g,' ').slice(0,70)]});
const closes=[...document.querySelectorAll('button')].filter(b=>b.innerText.trim()==='Close').map(b=>f.rc(b));
const closed=[...document.querySelectorAll('td,div,span')].filter(e=>e.children.length===0&&e.innerText.trim()==='Closed'&&e.getBoundingClientRect().x>1400).map(e=>f.rc(e));
return JSON.stringify({
status_line:f.box(["Alerts raised on this project"],{maxH:50,minX:280}),
page_note:f.box(["Every alert raised on this project, newest first"],{maxH:80,minX:280}),
tile_open:f.box(["OPEN ALERTS","Live count"],{maxW:420,minH:90}),
tile_critical:f.box(["CRITICAL OPEN","Live count"],{maxW:420,minH:90}),
tile_acknowledged:f.box(["ACKNOWLEDGED","Live count"],{maxW:420,minH:90}),
tile_closed:f.box(["CLOSED","Not available yet"],{maxW:420,minH:90}),
table_header:f.box(["Raised","Alert","Severity","Detector","Status","Actions"],{minW:1200,maxH:60}),
table:f.box(["Raised","Severity","Acknowledged"],{minW:1300,minH:300}),
rows:rows, close_buttons:closes, closed_cells:closed,
bottom_panel:f.box(["The alert timeline and assignee are not available yet"],{minW:1000}),
not_available_chip:f.box(["Not available yet"],{maxW:200,maxH:40,minY:600})
})})()
