
(() => {
  const q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];
  let previousFocus;
  const trap=e=>{const d=qa("[role=\"dialog\"]").find(x=>x.getClientRects().length);if(!d)return;const items=qa("a[href],button,input,select,textarea,[tabindex=\"0\"]",d).filter(x=>!x.disabled&&x.getClientRects().length);if(e.key==="Tab"&&items.length){if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===items.at(-1)){e.preventDefault();items[0].focus()}}};
  document.addEventListener("keydown",trap);
  const close=overlay=>{overlay.remove();previousFocus?.focus()};
  function bindLogin(overlay){
    qa("[data-login-close]",overlay).forEach(b=>b.addEventListener("click",()=>close(overlay)));
    overlay.addEventListener("click",e=>{if(e.target===overlay)close(overlay)});
    qa("button:not([data-login-close])",overlay).forEach(b=>b.addEventListener("click",()=>{let msg=q("[data-account-message]",overlay);if(!msg){msg=document.createElement("p");msg.dataset.accountMessage="";msg.setAttribute("role","status");msg.style.cssText="font-size:14px;margin-top:16px;text-align:center";q("[role=\"dialog\"]",overlay).append(msg)}msg.textContent="계정 연동 상태를 확인해 주세요."}));
  }
  function openLogin(){
    if(q("[data-login-overlay]"))return;
    previousFocus=document.activeElement;
    const t=q("#nv-login-template");if(!t)return;
    const holder=document.createElement("div");holder.innerHTML=JSON.parse(t.textContent);const overlay=holder.firstElementChild;document.body.append(overlay);bindLogin(overlay);q("button",overlay)?.focus();
  }
  qa(".nvhd-lgnx,.nvhd-lgnx2,#head_login").forEach(el=>el.addEventListener("click",openLogin));
  qa(".nvmox-gn .nvhm-mn > p").forEach(el=>{el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===""){e.preventDefault();el.click()}});el.addEventListener("click",()=>setTimeout(()=>el.setAttribute("aria-expanded",String(el.parentElement.classList.contains("active"))),0))});
  qa(".nvcnsx-wrtx-bt").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();openLogin()}));
  qa("a[href=\"sperm-bank.html\"],a[href=\"treatment-cycle.html\"]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();openLogin()}));
  qa("[data-copy-address]").forEach(el=>el.addEventListener("click",()=>window.copyClinicAddress?.()));
  qa("[data-login-overlay]").forEach(bindLogin);
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){const modal=q("[data-login-overlay]");if(modal)close(modal)}});
  qa("[data-open-doctor-popup]").forEach(b=>b.addEventListener("click",()=>{previousFocus=b;setTimeout(()=>qa("[data-doctor-popup]").find(x=>!x.hidden)?.querySelector("button")?.focus(),0)}));
  qa("[data-close-doctor-popup]").forEach(b=>b.addEventListener("click",()=>previousFocus?.focus()));
  const fee=q("#nvi-nncx-tbl-bdyx");
  if(fee){
    const initial=fee.innerHTML;const data=JSON.parse(q("#nv-fee-data").textContent);let category="nc_01";
    const search=()=>{q("[data-empty-result]",fee)?.remove();const term=q("#nvi-nncx-sr-ip").value.trim().toLowerCase();qa("tr",fee).forEach(row=>row.hidden=!row.textContent.toLowerCase().includes(term));if(!qa("tr",fee).some(row=>!row.hidden)){const row=document.createElement("tr");row.dataset.emptyResult="";const td=document.createElement("td");td.colSpan=12;td.textContent="검색 조건에 맞는 항목이 없습니다.";row.append(td);fee.append(row)}};
    qa("#nvi-nncx-tbsx [data-category]").forEach(tab=>tab.addEventListener("click",()=>{category=tab.dataset.category;qa("#nvi-nncx-tbsx [data-category]").forEach(t=>{const active=t===tab;t.classList.toggle("nvnncx-tb-ctvx",active);t.classList.toggle("nvnncx-tb-nctx",!active);t.setAttribute("aria-current",String(active))});fee.replaceChildren();if(category==="nc_01")fee.innerHTML=initial;else for(const row of data[category]||[]){const tr=document.createElement("tr");for(const cell of row){const td=document.createElement("td");td.textContent=cell;tr.append(td)}fee.append(tr)}search()}));
    q("#nvi-nncx-sr-fm").addEventListener("submit",e=>{e.preventDefault();search()});q("#nvi-nncx-sr-ip").addEventListener("input",search);
  }
  const notice=q("#nvi-nc-gd");
  if(notice){let cat="all";const rows=qa("[data-idx]",notice);const filter=()=>{const term=q("#nvi-nc-sr-ip").value.trim().toLowerCase();rows.forEach(row=>row.hidden=!row.textContent.toLowerCase().includes(term)||(cat==="notice"&&!row.textContent.includes("공지사항"))||(cat==="event"&&!row.textContent.includes("이벤트")))};
    q("#nvi-nc-sr-fm").addEventListener("submit",e=>{e.preventDefault();filter()});
    qa("#nvi-nc-tbsx [data-tab-key]").forEach(tab=>tab.addEventListener("click",()=>{cat=tab.dataset.tabKey;qa("#nvi-nc-tbsx [data-tab-key]").forEach(t=>{t.classList.toggle("nvnncx-tb-ctvx",t===tab);t.classList.toggle("nvnncx-tb-nctx",t!==tab)});filter()}));
    rows.forEach((row,i)=>{const go=e=>{e?.preventDefault();if(i<2)location.href=i===0?"notice-detail-1.html":"notice-detail-2.html";else openLogin()};row.addEventListener("click",go);row.addEventListener("keydown",e=>{if(e.key==="Enter")go(e)})});
  }
  const story=q("#nvi-csx-gd");if(story){const cards=qa("[data-idx]",story);cards.forEach(c=>{c.addEventListener("click",openLogin);c.addEventListener("keydown",e=>{if(e.key==="Enter")openLogin()})});qa("#nvi-csx-tbsx [data-tab-key]").forEach(tab=>tab.addEventListener("click",()=>{qa("#nvi-csx-tbsx [data-tab-key]").forEach(t=>{t.classList.toggle("nvnncx-tb-ctvx",t===tab);t.classList.toggle("nvnncx-tb-nctx",t!==tab)});cards.forEach(c=>c.hidden=tab.dataset.tabKey!=="all"&&c.dataset.category!==tab.dataset.tabKey)}))}
  qa(".nvcnsx-sr").filter(f=>!f.id.includes("notice")).forEach(f=>f.addEventListener("submit",e=>e.preventDefault()));
  qa(".nvpstx-nv-dgx").forEach((b,i)=>{if(!b.disabled)b.addEventListener("click",()=>{location.href=location.pathname.includes("detail-1")?"notice-detail-2.html":"notice-detail-1.html"})});
  qa("#nvi-fqx-tbsx [data-tab-key]").forEach(tab=>tab.addEventListener("click",()=>{qa("#nvi-fqx-tbsx [data-tab-key]").forEach(t=>{const active=t===tab;t.classList.toggle("nvfqx-tb-ctvx",active);t.classList.toggle("nvfqx-tb-nctx",!active);if(active)t.setAttribute("aria-current","true");else t.removeAttribute("aria-current")})}));
  const paging=q("#nv-paging-data");
  if(paging){
    const data=JSON.parse(paging.textContent),isCase=!!q("#nvi-csx-gd"),grid=q(isCase?"#nvi-csx-gd":"#nvi-nc-gd"),nav=q(isCase?"#nvi-csx-pgnx":"#nvi-nc-pgnx"),tabs=q(isCase?"#nvi-csx-tbsx":"#nvi-nc-tbsx");
    const initial=qa("[data-idx]",grid).map((node,i)=>({node:node.cloneNode(true),i,category:node.dataset.category||"",categoryTitle:q(".nvnc-rw-ctgx",node)?.textContent||"",title:q(isCase?".nvcsx-cd-tt":".nvcnsx-rw-tt",node)?.textContent||""}));
    const records=[...initial,...data[isCase?"case":"notice"].flat().map((row,i)=>({...row,i:initial.length+i}))];
    let page=1,category="all",term="";
    function render(){
      const filtered=records.filter(row=>(category==="all"||(isCase?row.category===category:category==="notice"?row.categoryTitle.includes("공지"):row.categoryTitle.includes("이벤트")))&&row.title.toLowerCase().includes(term));
      const max=Math.max(1,Math.ceil(filtered.length/12));page=Math.min(page,max);grid.replaceChildren();
      for(const record of filtered.slice((page-1)*12,page*12)){
        const node=(record.node||initial[record.i%initial.length].node).cloneNode(true);
        node.hidden=false;node.dataset.idx="entry-"+record.i;node.dataset.category=record.category;
        if(!record.node){
          q(isCase?".nvcsx-cd-tt":".nvcnsx-rw-tt",node).textContent=record.title;
          q(isCase?".nvcmmx-cd-dt":".nvcnsx-rw-mtx-cllx:last-child",node).textContent=record.date;
          if(isCase){q(".nvcsx-cd-smmx",node).textContent=record.summary;q(".nvcsx-cd-tgx",node).textContent=record.categoryTitle||"진료 이야기"}
          else{q(".nvnc-rw-nmbx",node).textContent=String(records.length-record.i);q(".nvnc-rw-ctgx",node).textContent=record.categoryTitle}
        }
        if(isCase){node.addEventListener("click",openLogin);node.addEventListener("keydown",e=>{if(e.key==="Enter")openLogin()})}
        else if(record.i<2){const title=q(".nvcnsx-rw-tt",node);title.href=record.i===0?"notice-detail-1.html":"notice-detail-2.html";node.addEventListener("click",()=>location.href=title.href)}
        else{const title=q(".nvcnsx-rw-tt",node);if(title.tagName==="A"){const span=document.createElement("span");span.className=title.className;span.textContent=title.textContent;title.replaceWith(span)}node.style.cursor="default";node.removeAttribute("tabindex");node.removeAttribute("role")}
        grid.append(node);
      }
      if(!grid.children.length){const empty=document.createElement(isCase?"p":"li");empty.textContent="검색 조건에 맞는 게시물이 없습니다.";grid.append(empty)}
      const count=q(".nvcnsx-ls-tlbx-cn-vlx");if(count)count.textContent=filtered.length;
      qa("button",nav).forEach(btn=>{const n=Number(btn.textContent.trim()),label=btn.getAttribute("aria-label")||"";if(n){btn.hidden=n>max;btn.setAttribute("aria-current",n===page?"page":"false");btn.classList.toggle("nvcnsx-pgnx-pgx-bt-ctvx",n===page)}else btn.disabled=(label.includes("첫")||label.includes("이전"))?page===1:page===max});
    }
    qa("button",nav).forEach(btn=>btn.addEventListener("click",()=>{const n=Number(btn.textContent.trim()),label=btn.getAttribute("aria-label")||"";page=n||(label.includes("첫")?1:label.includes("이전")?page-1:label.includes("마지막")?Math.ceil(records.length/12):page+1);render();grid.scrollIntoView({block:"start",behavior:"smooth"})}));
    qa("[data-tab-key]",tabs).forEach(tab=>tab.addEventListener("click",()=>{category=tab.dataset.tabKey;page=1;render()}));
    const form=q("#nvi-nc-sr-fm");if(form)form.addEventListener("submit",e=>{e.preventDefault();term=q("input",form).value.trim().toLowerCase();page=1;render()});
    render();
  }
})();
