if(document.querySelector(".hero")){
const ASSET='/seohae/assets/img/';const CURL=['/seohae/centers/emergency/','/seohae/centers/health-screening/','/seohae/med_dept_center/','/seohae/departments/cardiology/','/seohae/med_dept_center/','/seohae/med_dept_center/'];function deptURL(n){return '/seohae/'+(n==='심장내과'?'departments/cardiology':n==='신경과'?'departments/neurology':n==='응급의학과'?'emergencycare':/외과|비뇨|치과/.test(n)?'departments/surgery':'departments/internal')+'/'};

var C=[
 ['응급의료센터','24시간 · 365일<br>응급의학과 전문의 상주<br>구급차 전용 진입로','외상, 급성 복통, 흉통, 뇌졸중 의심 증상','emergencyc-01.jpg','응급의료센터 입구'],
 ['건강검진센터','국가건강검진 · 종합검진 · 기업검진<br>평일 07:30 – 16:00 · 토요일 07:30 – 12:00<br>본관 3층','위 · 대장 내시경, 초음파, CT, 혈액 검사','index-08.jpg','검진 서류를 넘기는 손'],
 ['척추관절센터','정형외과 · 신경외과 · 재활의학과 협진<br>수술 · 비수술 치료<br>본관 2층','디스크, 척추관 협착증, 인공관절, 스포츠 손상','intromissi-01.jpg','진료 기록지를 보는 의사'],
 ['심장혈관센터','순환기내과<br>심장 초음파 · 운동부하 검사 · 24시간 심전도<br>본관 2층','협심증, 부정맥, 고혈압, 심부전','greeting-consultation.webp','청진기를 둔 진료 책상'],
 ['소화기내시경센터','소화기내과<br>수면 내시경 · 용종 절제<br>본관 3층','위염, 위궤양, 대장 용종, 역류성 식도염','index-04.jpg','본관 입구'],
 ['재활의학센터','재활의학과<br>물리치료 · 작업치료 · 도수치료<br>별관 1층','뇌졸중 후 재활, 척추 · 관절 수술 후 재활','index-12.jpg','본관 옆 산책로']
];
var t=document.getElementById('ctabs'),i=0;
C.forEach(function(c,k){var b=document.createElement('button');b.type='button';b.role='tab';b.textContent=c[0];b.onclick=function(){show(k)};t.appendChild(b)});
document.getElementById('call').textContent=C.length;
function show(k){i=(k+C.length)%C.length;var c=C[i];
 [].forEach.call(t.children,function(b,n){b.setAttribute('aria-selected',n===i);b.id='ctab-'+n;b.tabIndex=n===i?0:-1;b.setAttribute('aria-controls','cpanel')});
 var cl=document.createElement('a');cl.href=CURL[i];cl.textContent=c[0];document.getElementById('cname').replaceChildren(cl);document.getElementById('cfacts').innerHTML=c[1];
 document.getElementById('cfield').textContent=c[2];var im=document.getElementById('cimg');im.src=ASSET+c[3];im.alt=c[4];
 document.getElementById('cnow').textContent=i+1;document.getElementById('cpanel').setAttribute('aria-labelledby','ctab-'+i);}
function go(d){show(i+d)}
show(0);

var D=[['내과','in'],['심장내과','in'],['호흡기내과','in'],['내분비내과','in'],['소화기내과','in'],['신경과','in'],['외과','out'],['정형외과','out'],['신경외과','out'],['비뇨의학과','out'],['치과 · 구강악안면외과','out'],['소아청소년과','in'],['재활의학과','sup'],['가정의학과','in'],['응급의학과','sup'],['영상의학과','sup'],['진단검사의학과','sup'],['마취통증의학과','sup']];
var dl=document.getElementById('dlist');
D.forEach(function(d){var li=document.createElement('li');li.dataset.g=d[1];li.innerHTML='<a href="'+deptURL(d[0])+'">'+d[0]+'</a>';dl.appendChild(li)});
document.getElementById('dfil').onclick=function(e){var b=e.target.closest('button');if(!b)return;
 [].forEach.call(this.children,function(x){x.setAttribute('aria-pressed',x===b)});
 [].forEach.call(dl.children,function(li){li.hidden=!(b.dataset.g==='all'||li.dataset.g===b.dataset.g)})};

var W=[['5병동 · 내과',['42병상 · 4인실 · 2인실 · 1인실','간호·간병통합서비스','면회 평일 18:00 – 20:00']],['6병동 · 외과',['38병상 · 4인실 · 1인실','수술 후 회복실 옆','면회 평일 18:00 – 20:00']],['7병동 · 정형외과',['40병상 · 4인실 · 2인실','재활치료실 연결 통로','면회 평일 18:00 – 20:00']],['8병동 · 재활',['36병상 · 4인실','보호자 상주 가능','면회 평일 18:00 – 20:00']]];
var wt=document.getElementById('wtabs');
W.forEach(function(w,k){var b=document.createElement('button');b.type='button';b.role='tab';b.textContent=w[0].split(' · ')[0];b.onclick=function(){ward(k)};wt.appendChild(b)});
function ward(k){[].forEach.call(wt.children,function(b,n){b.setAttribute('aria-selected',n===k);b.id='wtab-'+n;b.tabIndex=n===k?0:-1;b.setAttribute('aria-controls','ward-panel')});
 document.getElementById('ward-panel').setAttribute('aria-labelledby','wtab-'+k);document.getElementById('wname').textContent=W[k][0];document.getElementById('wfacts').innerHTML=W[k][1].map(function(x){return '<li>'+x+'</li>'}).join('');}
ward(0);

var s=document.querySelectorAll('.hero .slide'),h=0;
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(function(){s[h].classList.remove('on');h=(h+1)%s.length;s[h].classList.add('on')},5000);
function toggleMenu(b){var o=document.getElementById('side').classList.toggle('open');b.setAttribute('aria-expanded',o)}

}
(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const side=$('#side'),menu=$('.menu-open');
function closeMenu(){side.classList.remove('open');menu.setAttribute('aria-expanded','false');document.body.classList.remove('menu-visible')}
menu.addEventListener('click',()=>{const o=side.classList.toggle('open');menu.setAttribute('aria-expanded',String(o));document.body.classList.toggle('menu-visible',o)});
$$('#gnb a,.side-btn a,.logo').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();$('#search-results').hidden=true}});
let zoomNodes=null;$('[data-zoom]').addEventListener('click',e=>{const on=!zoomNodes;if(on){zoomNodes=$$('body *:not(script):not(style)').map(el=>({el,original:el.style.fontSize,size:parseFloat(getComputedStyle(el).fontSize)}));zoomNodes.forEach(x=>x.el.style.fontSize=(x.size*1.12)+'px')}else{zoomNodes.forEach(x=>x.el.style.fontSize=x.original);zoomNodes=null}document.documentElement.classList.toggle('large-text',on);e.currentTarget.setAttribute('aria-pressed',String(on))});
const entries=JSON.parse($('#r1-search-data').textContent),out=$('#search-results'),search=$('[data-search]'),input=$('input',search);
function results(){const q=input.value.trim();out.replaceChildren();if(!q){out.hidden=true;return}const hits=entries.filter(x=>x.title.toLowerCase().includes(q.toLowerCase()));if(!hits.length)out.textContent='검색 결과 0건';hits.forEach(x=>{const a=document.createElement('a');a.href=x.url;a.textContent=x.title;out.append(a)});out.hidden=false}
search.addEventListener('submit',e=>{e.preventDefault();results()});input.addEventListener('input',results);document.addEventListener('click',e=>{if(!search.contains(e.target))out.hidden=true});
$$('[role="tablist"]').forEach(list=>{const tabs=$$('[role="tab"]',list);tabs.forEach((t,i)=>t.addEventListener('keydown',e=>{let n=i;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();tabs[n].click();tabs[n].focus()}));
if(list.classList.contains('body-tabs'))tabs.forEach(t=>t.addEventListener('click',()=>{tabs.forEach(x=>{const on=x===t;x.setAttribute('aria-selected',String(on));x.tabIndex=on?0:-1;$$('[data-panel="'+x.getAttribute('aria-controls')+'"]').forEach(p=>p.hidden=!on)});const table=$('.tbl');if(table&&!$('[data-panel]')){const label=t.textContent;const allowed=label.includes('행위')?['검사료','처치료']:label.includes('치료 재료')?['치료 재료']:label.includes('약제')?['약제비']:['제증명'];$$('tbody tr',table).forEach(row=>row.hidden=!allowed.includes(row.cells[0].textContent.trim()))}}))});
const equipment=$$('[data-equipment]');
if(equipment.length){const dialog=document.createElement('dialog');dialog.className='doc equipment-dialog';dialog.setAttribute('aria-labelledby','equipment-dialog-title');dialog.innerHTML='<div class="doc-h"><b id="equipment-dialog-title"></b><button type="button" data-dialog-close>닫기</button></div><div class="pics"><figure><img alt=""></figure></div><p></p>';document.body.append(dialog);$('[data-dialog-close]',dialog).addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});equipment.forEach(b=>b.addEventListener('click',()=>{const target=document.getElementById(b.dataset.equipment),title=b.closest('figure').querySelector('figcaption').textContent;$('#equipment-dialog-title').textContent=title;$('p',dialog).textContent=target?.textContent||'';const image=$('img',dialog);image.src=$('img',b).src;image.alt=title;dialog.showModal()}))}
$('[data-agree-all]')?.addEventListener('change',e=>$$('[data-consent] input[required]').forEach(c=>c.checked=e.currentTarget.checked));
$$('.body-form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();$('.form-result',f).textContent='온라인 접수 준비 중 · 010-4894-4905'}));
})();
