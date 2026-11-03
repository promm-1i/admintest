(function(data){var id=new URLSearchParams(location.search).get('member'),p=data[id];if(!p)return;
var image=document.querySelector('[data-staff-avatar]');if(image){image.src='./assets/img/scene-'+String(40+Number(id)).padStart(3,'0')+'.jpg';image.alt=p.name+' 원장 프로필';image.dataset.mediaSlot='p'+(40+Number(id))}
var heading=document.querySelector('[data-staff-heading]');if(heading){heading.replaceChildren();var b=document.createElement('b');b.textContent=p.name;heading.append(b,document.createTextNode(' 원장님'))}
var english=document.querySelector('[data-staff-english]');if(english)english.textContent=p.english;
var career=document.querySelector('[data-staff-career]');if(career){career.replaceChildren();p.career.forEach(function(text){var li=document.createElement('li');li.textContent=text;career.appendChild(li)})}
var saturday=document.querySelector('[data-staff-saturday]');if(id==='8'&&saturday&&saturday.lastChild)saturday.lastChild.textContent='AM 09:30 ~ PM 02:00';
document.title=p.name+' 의료진 소개 | 새롬결치과';
})({"3": {"name": "윤서진", "english": "Dr. YOON SEO JIN", "career": ["다온의과대학교 치의학대학원 석사 졸업", "구강검진 실무 교육 이수", "턱관절 진료 교육 과정 이수", "은솔치과보철연구회 정회원", "다온치아보존연구회 정회원", "새롬치주진료연구회 정회원"]}, "4": {"name": "강태오", "english": "Dr. KANG TAE OH", "career": ["은솔의과대학교 치의학과 졸업", "다온시 공공보건센터 치과의사", "구강검진 실무 교육 이수", "턱관절 기능 평가 교육 이수", "은솔치과보철연구회 정회원", "다온치아보존연구회 정회원", "새롬치주진료연구회 정회원"]}, "5": {"name": "이해린", "english": "Dr. LEE HAE RIN", "career": ["다온의과대학교 치의학대학원 졸업", "은솔치과진료센터 악안면 분야 박사 과정 연수 이수", "악안면 진료 분야 전문 교육 이수", "다온악안면재건연구회 교육 이수 및 정회원", "은솔악안면진료연구회 정회원"]}, "6": {"name": "차도윤", "english": "Dr. CHA DO YOON", "career": ["은솔의과대학교 치의학과 졸업", "새봄시 은솔보건지소 진료책임자", "새봄시 공공보건센터 치과의사", "은솔치과보철연구회 정회원", "다온치아보존연구회 정회원", "새롬치주진료연구회 정회원", "구강검진 평가 교육 이수", "턱관절 기능 검사 교육 이수"]}, "7": {"name": "문채은", "english": "Dr. MOON CHAE EUN", "career": ["새봄의과대학교 치의학과 졸업", "은솔치과보철연구회 정회원", "다온치아보존연구회 정회원", "새롬치주진료연구회 정회원", "구강검진 평가 교육 이수", "턱관절 운동 평가 교육 이수"]}, "8": {"name": "오현준", "english": "Dr. OH HYEON JUN", "career": ["다온의과대학교 치의학대학원 졸업", "다온치과진료센터 치주과 연수 이수", "치주 진료 분야 전문 교육 이수", "새롬치주진료연구회 정회원", "다온치아보존연구회 정회원"]}});

        $(function() {
            gsap.registerPlugin(ScrollTrigger, ScrollSmoother, MotionPathPlugin);
            ScrollTrigger.normalizeScroll(true);
            ScrollTrigger.config({autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"});
            const smoother = ScrollSmoother.create({
                wrapper: "#i-smtx-wr",
                content: "#i-smtx-ct",
                smooth: 1.5,
                ignoreMobileResize: true,
                smoothTouch: 0.3,
                effects: true,   
                preventDefault: true,
                normalizeScroll: {allowNestedScroll: true},
            });

           let sv_title = gsap.timeline({
                scrollTrigger: {
                    trigger: ".svx-tt",
                    scrub: 1,
                    start: 'top 300px',
                    end: '+=300',
                }
            })
             
            .to('#i-sb .svx-tt .svx-tx-wx .vrx p:nth-child(2)', {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1,
                stagger: 1,
                ease: "none"
            });

            $(".sx-ct").each(function () {
				const $this = $(this);

				gsap.timeline({
					scrollTrigger: {
						trigger: this,
						start: "top 700",
						end: "top 0",
						scrub: true,
						onEnter: () => {
							$this.addClass("on");
						},
					},
				});
			});
            
            
            
            
            
            
            $(".bc button").click(function(){
                $(this).next("ul").slideToggle(500)
            })
            
            $("#i-cntx-fm .cls").click(function(){
                $("#i-cntx-fm").fadeOut(300)
            })
        });
    

  $(document).ready(function(){
    $(".llx-mn > ul > li > a").click(function(){
      $(this).next("ul").slideToggle(300);
        return false;
    });

    $("#i-hd .mox-mn").click(function(){
      $('.llx-mn').addClass("on");
    });

    $(".llx-mn .cls-bx").click(function(){
      $('.llx-mn').removeClass("on");
    });


    $('.gnb2 .in > ul > li > a').click(function(){
        $(this).next().slideToggle(300);
		$(this).parents('li').toggleClass('on');
        return false;

    });


    });


    
    $(function(){
        
        $("#i-ft .pri_btn").click(function(){
            $(".popup_01").fadeIn();
            return false;
        })
        $("#i-ft .pri_btn02").click(function(){
            $(".popup_02").fadeIn();
            return false;
        }) 
        $("#i-ft .pri_btn03").click(function(){
            $(".popup_03").fadeIn();
            return false;
        })
    })
document.querySelectorAll('#i-sb .sb-kv .svx-tt strong').forEach(el => {
    const nodes = [...el.childNodes];
    el.innerHTML = '';

    nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            [...node.textContent].forEach(char => {
                if (char === ' ') {
                    el.appendChild(document.createTextNode('\u00A0'));
                } else {
                    const span = document.createElement('i');
                    span.className = 'char';
                    span.textContent = char;
                    el.appendChild(span);
                }
            });
        } else if (node.nodeName === 'BR') {
            el.appendChild(node);
        }
    });

    gsap.to(el.querySelectorAll('.char'), {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        x: 0,
        duration: 1.5,
        stagger: 0.06,
        ease: 'power2.out',
        delay: 0.2
    });
});

(function(){const cursor = document.querySelector('#i-crsx');
const cursorRadius = Math.round(cursor.getBoundingClientRect().width / 2);

const mouse = { x: 0, y: 0 };
const pos = { x: -10, y: -10 };
const ratio = 0.9;

const draw = () => {
pos.x += (mouse.x - cursorRadius - pos.x) * ratio;
pos.y += (mouse.y - cursorRadius - pos.y) * ratio;
cursor.style.transform = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';
};

const update = e => {
mouse.x = e.clientX;
mouse.y = e.clientY;
}

window.addEventListener('mousemove', update, { capture: false, passive: true });

function animate() {
draw();
requestAnimationFrame(animate);
}

requestAnimationFrame(animate);})();

    (function(){
      var q=function(s){return document.querySelector(s)};
      var all=function(s){return Array.from(document.querySelectorAll(s))};
      function menuClose(){var m=q('.llx-mn');if(m)m.classList.remove('on')}
      var menu=q('.llx-mn'),menuButton=q('#i-hd .mox-mn');
      if(menu){function menuState(){var on=menu.classList.contains('on');menu.inert=!on;menu.setAttribute('aria-hidden',String(!on));if(menuButton)menuButton.setAttribute('aria-expanded',String(on))}menuState();new MutationObserver(menuState).observe(menu,{attributes:true,attributeFilter:['class']});document.addEventListener('keydown',function(e){if(e.key==='Escape'&&menu.classList.contains('on')){menuClose();if(menuButton)menuButton.focus()}})}
      all('.llx-mn a[href]').forEach(function(a){a.addEventListener('click',function(){
        if(!a.nextElementSibling||a.nextElementSibling.tagName!=='UL')menuClose();
      })});
      var contact=q('#i-cntx'),form=q('#i-cntx-fm');
      if(contact&&form){contact.addEventListener('mouseenter',function(){jQuery(form).fadeIn(300)});
        var toggle=contact.querySelector('button');if(toggle)toggle.addEventListener('click',function(){jQuery(form).fadeIn(300)});
        var c=form.querySelector('.cls');if(c)c.addEventListener('click',function(){jQuery(form).fadeOut(300)})}
      var login=q('#i-hd .login_popup01'),join=q('#i-hd .login_popup02');
      var popupFocus=null;
      function pause(on){var s=window.ScrollSmoother&&ScrollSmoother.get();if(s)s.paused(on)}
      function open(p){if(p){popupFocus=document.activeElement;p.style.display='block';pause(true);var i=p.querySelector('input');if(i)i.focus()}}
      function close(){var shown=[login,join].some(function(p){return p&&p.style.display==='block'});[login,join].forEach(function(p){if(p)p.style.display='none'});if(shown){pause(false);if(popupFocus&&popupFocus.isConnected)popupFocus.focus();popupFocus=null}}
      var b=q('#hdLoginBtn');if(b)b.addEventListener('click',function(e){e.preventDefault();open(login)});
      var jb=q('#joinBtn');if(jb)jb.addEventListener('click',function(e){e.preventDefault();close();open(join)});
      all('[data-login-open]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();open(login)})});
      all('#i-hd .lgnx-pp .cls').forEach(function(b){b.setAttribute('role','button');b.setAttribute('tabindex','0');b.setAttribute('aria-label','닫기');b.addEventListener('click',close);b.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();close()}})});
      document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
      var quick=q('#btnQuickSubmit');if(quick)quick.addEventListener('click',function(){if(quick.form)quick.form.requestSubmit()});
      var inquiry=q('#i-bt-nqrx-sbmx');if(inquiry)inquiry.addEventListener('click',function(){
        var fields=[q('#i-cntx-nm'),q('#i-cntx-phnx'),q('input[name="contactType"]'),q('#i-prvx')];
        for(var i=0;i<fields.length;i++){if(fields[i]&&!fields[i].reportValidity())return}
        var box=inquiry.parentElement,status=box.querySelector('[role="status"]');
        if(!status){status=document.createElement('p');status.setAttribute('role','status');box.appendChild(status)}
        status.textContent='입력 내용을 확인했습니다.';
      });
      var search=q('#i-sr-bt'),searchText=q('#i-sr-tx');
      function filterNotice(){var term=(searchText.value||'').trim().toLowerCase();var items=all('[data-notice-item]');var visible=0;
        items.forEach(function(e){e.hidden=!!term&&!e.textContent.toLowerCase().includes(term);if(!e.hidden)visible++});
        var result=q('[data-search-status]');if(result)result.textContent=visible+'개의 공지가 있습니다.';if(window.ScrollTrigger)ScrollTrigger.refresh();}
      if(search&&searchText){search.addEventListener('click',filterNotice);searchText.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();filterNotice()}})}
      all('form').forEach(function(f){f.addEventListener('submit',function(e){
        var confirm=f.querySelector('#joinPass2');if(confirm)confirm.setCustomValidity('');
        e.preventDefault();if(!f.reportValidity())return;
        var pw=f.querySelector('#joinPass'),confirm=f.querySelector('#joinPass2');
        if(pw&&confirm&&pw.value!==confirm.value){confirm.setCustomValidity('비밀번호 확인이 일치하지 않습니다.');confirm.reportValidity();return}
        var output=f.querySelector('[role="status"]');if(!output){output=document.createElement('p');output.setAttribute('role','status');f.appendChild(output)}
        output.textContent='입력 내용을 확인했습니다.';
      });Array.from(f.querySelectorAll('input')).forEach(function(i){i.addEventListener('input',function(){i.setCustomValidity('')})})});
      all('.dr-lk').forEach(function(e){e.addEventListener('click',function(){
        var info=e.querySelector('.mmx-tx');if(info&&getComputedStyle(info).display!=='none')return;
        var route=e.getAttribute('data-doctor-route');if(route){location.href=route;return}
        var link=e.querySelector('a[href]');if(link)location.href=link.getAttribute('href');
      })});
      all('#i-ft .pri_btn, #i-ft .pri_btn02').forEach(function(a,i){a.addEventListener('click',function(e){e.preventDefault();var b=document.querySelector('[data-policy-open="'+(i?'terms':'privacy')+'"]');if(b)b.click()})});
      var fee=q('#i-ft .pri_btn03'),feeLayer=q('[aria-label="비급여수가 안내"][role="dialog"]'),feeFocus=null;
      function closeFees(){if(feeLayer&&feeLayer.style.display==='block'){feeLayer.style.display='none';pause(false);if(feeFocus)feeFocus.focus()}}
      if(fee&&feeLayer){fee.addEventListener('click',function(e){e.preventDefault();feeFocus=fee;feeLayer.style.display='block';pause(true);feeLayer.querySelector('button').focus()});feeLayer.querySelector('button').addEventListener('click',closeFees);document.addEventListener('keydown',function(e){if(e.key==='Escape')closeFees()})}
      document.addEventListener('keydown',function(e){if(e.key!=='Tab')return;var active=[login,join,feeLayer].find(function(p){return p&&getComputedStyle(p).display!=='none'});if(!active)return;var fields=Array.from(active.querySelectorAll('a[href],button,input,textarea,select,[tabindex]')).filter(function(e){return e.getClientRects().length&&!e.disabled});var first=fields[0],last=fields[fields.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
      if(window.ScrollTrigger)window.addEventListener('load',function(){setTimeout(function(){ScrollTrigger.refresh()},500)});
      if(document.readyState==='complete')jQuery(window).triggerHandler('load');
    })();
    