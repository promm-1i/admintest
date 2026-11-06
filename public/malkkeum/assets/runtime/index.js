
(function(){
	var COOKIE_NAME = 'POP_VIEW';
	var HIDE_DAYS = 1;
	var AUTO_MS = 2000;

	var root   = document.getElementById('i-lp2x');
	var strip  = root.querySelector('.lp2x-strx');
	var slides = root.querySelector('.lp2x-sldx');
	var btnPrev = root.querySelector('.lp2x-ar.prvx');
	var btnNext = root.querySelector('.lp2x-ar.nxtx');
	var current = null;
	var timer = null;
	var manual = false;	

	
	function getCookie(name){
		var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
		return m ? decodeURIComponent(m[1]) : '';
	}
	function setCookie(name, value, days){
		var d = new Date();
		d.setDate(d.getDate() + days);
		document.cookie = name + '=' + encodeURIComponent(value) + '; path=/; expires=' + d.toUTCString();
	}
	
	function hideAllForDays(){
		var add = '';
		tabs().forEach(function(t){ add += '[' + t.getAttribute('data-seq') + ']'; });
		setCookie(COOKIE_NAME, add + getCookie(COOKIE_NAME), HIDE_DAYS);
	}

	function tabs(){ return Array.prototype.slice.call(root.querySelectorAll('.lp2x-tb')); }

	function closeAll(){
		stopAuto();
		root.classList.remove('is-open');
		document.removeEventListener('keydown', onKey);
	}

	
	function move(step){
		var list = tabs(), idx = 0, i;
		for(i = 0; i < list.length; i++){ if(list[i].getAttribute('data-seq') == current){ idx = i; break; } }
		activate(list[(idx + step + list.length) % list.length].getAttribute('data-seq'));
	}

	
	function startAuto(){
		stopAuto();
		if(AUTO_MS > 0 && tabs().length > 1){ timer = setInterval(function(){ move(1); }, AUTO_MS); }
	}
	function stopAuto(){
		if(timer){ clearInterval(timer); timer = null; }
	}

	function activate(seq){
		current = seq;
		tabs().forEach(function(t){
			var on = t.getAttribute('data-seq') == seq;
			t.classList.toggle('is-on', on);
			t.setAttribute('aria-selected', on ? 'true' : 'false');
			if(on){
				var left = t.offsetLeft - (strip.clientWidth - t.offsetWidth) / 2;
				if(strip.scrollTo){ strip.scrollTo({left: left, behavior: 'smooth'}); } else { strip.scrollLeft = left; }
			}
		});
		
		var panels = root.querySelectorAll('.lp2x-pnlx'), idx = 0;
		Array.prototype.forEach.call(panels, function(p, i){
			var on = p.getAttribute('data-seq') == seq;
			if(on){ idx = i; }
			p.setAttribute('aria-hidden', on ? 'false' : 'true');
		});
		slides.style.transform = 'translateX(' + (-100 * idx) + '%)';
	}

	function onKey(e){ if(e.key === 'Escape' || e.keyCode === 27){ closeAll(); } }

	
	var hidden = getCookie(COOKIE_NAME);
	tabs().forEach(function(t){
		var seq = t.getAttribute('data-seq');
		if(hidden.indexOf('[' + seq + ']') != -1){
			var p = document.getElementById('lp2-panel-' + seq);
			t.parentNode.removeChild(t);
			if(p){ p.parentNode.removeChild(p); }
		}
	});

	var first = tabs();
	if(!first.length){ root.parentNode.removeChild(root); return; }

	
	Array.prototype.forEach.call(root.querySelectorAll('.lp2x-pnlx'), function(p){
		if(p.querySelectorAll('pic').length == 1 && !p.textContent.replace(/\s+/g, '')){
			p.classList.add('is-single');
		}
	});

	
	root.querySelector('.lp2x-trcx').addEventListener('click', function(e){
		var t = e.target.closest ? e.target.closest('.lp2x-tb') : null;
		if(t){ manual = true; stopAuto(); activate(t.getAttribute('data-seq')); }
	});
	
	btnPrev.addEventListener('click', function(){ manual = true; stopAuto(); move(-1); });
	btnNext.addEventListener('click', function(){ manual = true; stopAuto(); move(1); });
	
	root.querySelector('.lp2x-in').addEventListener('mouseenter', function(){ if(!manual){ stopAuto(); } });
	root.querySelector('.lp2x-in').addEventListener('mouseleave', function(){ if(!manual){ startAuto(); } });
	root.querySelector('.lp2x-hdx').addEventListener('click', function(){ hideAllForDays(); closeAll(); });
	root.querySelector('.lp2x-cls').addEventListener('click', closeAll);
	
	document.addEventListener('keydown', onKey);

	
	if(first.length < 2){ btnPrev.hidden = btnNext.hidden = true; }

	root.classList.add('is-open');
	activate(first[0].getAttribute('data-seq'));
	startAuto();
})();


     const cursor = document.querySelector('#i-crsx');
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

      requestAnimationFrame(animate);
			

            $(function() {
                $(window).on('load', function () {
                    setTimeout(function(){
                        $(".hm-kv").addClass("on")
                    },500)
                });
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
                    var space = 40;
                   


                    if (window.matchMedia("(max-width: 1024px)").matches) {
                         var wid = ($(".hm-kv").width() / 1.5 + ($(".bldx-flrx").width() ) ) * -1 ;
                         var line = "calc(100% - 1px)" ;
                         var clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" ;
                    } else {
                         var wid = ($(".hm-kv").width() / 2 + ($(".bldx-flrx").width() / 2 - 170) ) * -1 ;
                         var line = "calc(60% - 1px)" ;
                         var clipPath = "polygon(40% 0%, 100% 0%, 100% 100%, 40% 100%)";
                    }
                         var wid2 = $("#i-hm .hm-kv .mvx-cntx2 .vsx-tt strong").width() * -2 ;
                    let main_visual = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".hm-kv",
                        scrub: 1,
                        start: "top 0",
                        end: "+=4600",
                        pin: true,
                        ease: "power2.out",
                        }
                    })
                    .to("#i-hm .hm-kv .mvx-cntx2 .vsx-tt .on", { clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1 }, "<")
                    .to("#i-hm .hm-kv .mvx-cntx2 .vsx-tt strong", { x: "-70%", duration: 1 }, "<")
                    .to(".mvx-cntx2 .nf-pic01 div", { y: -600, duration: 1 }, "<")
                    .to(".mvx-cntx2 .nf-pic02 div", { y: -1200, duration: 1 }, "<")
                    .to(".mvx-cntx2 .nf-pic03 div", { y: -500, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx8", { y: space * -7, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx7", { y: space * -6, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx6", { y: space * -5, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx5", { y: space * -4, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx4", { y: space * -3, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx3", { y: space * -2, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx2", { y: space * -1, duration: 1 }, "<")
                    .to(".bldx-flrx", { y: -100, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx .on", { opacity: 1, duration: 1 }, "<")
                    .to(".vsx-tt", { x: wid2, duration: 1 })
                    .to(".bldx-flrx .flrx .n2x", {opacity: 1, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx", { y: 0, duration: 1 }, "<")
                    .to(".bldx-flrx", { x: -495, y: 0,duration: 1 }, "<")
                    .to(".bldx-flrx .flrx .on", { opacity: 0, duration: 1 }, "<")
                    .to(".flrx-nfmx-wr", { clipPath: clipPath, duration: 1 }, "<")
                    .to(".flrx-nfmx-wr .flrx-tt strong", { x: "0", duration: 1 }, "<")
                    .to(".flrx-nfmx-wr .rl", { right: line, duration: 1 }, "<")
                    .to(".bldx-flrx", { y: -100, x: wid, duration: 1 })
                    .to(".flrx-nfmx-wr", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1 }, "<")
                    .to(".flrx-tt", { y: "-100vh", duration: 1 }, "<")
                    .to(".bldx-flrx .flrx7", { y: space * -1, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx7 .n3x", {opacity: 1, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx8", { y: space * -2, duration: 1 }, "<")
                    .to(".flrx-nfmx-wr .rl", { right: "calc(100% - 1px)", duration: 1 }, "<")
                    .to(".mvx-cntx2 .flrx-nmbx", { y: "0%", duration: 1.5 }, "<")
                    .to(".mvx-cntx2 .flrx-nmbx .f2x", { borderColor: "#514638", background: "#514638", color:"#fff", duration: 1.5 }, "<")
                    .to(".flrx-nfmx-wr .flrx-nfmx", { y: "0%", duration: 1.5 }, "<")
                    .to(".flrx-nfmx-wr .flrx-nfmx", { y: "-33.33%", duration: 1.5 })
                    .to(".mvx-cntx2 .flrx-nmbx .f4x", { borderColor: "#514638", background: "#514638", color:"#fff", duration: 1.5 }, "<")
                    .to(".mvx-cntx2 .flrx-nmbx .f2x", { borderColor: "#F1EDE8", background: "#F1EDE8", color:"#514638", duration: 1.5 }, "<")
                    .to(".bldx-flrx .flrx5", { y: space * -1, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx4", { y: 0, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx7 .n3x", {opacity: 0, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx5 .n3x", {opacity: 1, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx6, .bldx-flrx .flrx7, .bldx-flrx .flrx8", { y: space * -2, duration: 1 }, "<")

                    .to(".flrx-nfmx-wr .flrx-nfmx", { y: "-66.66%", duration: 1.5 })
                    .to(".mvx-cntx2 .flrx-nmbx .f6x", { borderColor: "#514638", background: "#514638", color:"#fff", duration: 1.5 }, "<")
                    .to(".mvx-cntx2 .flrx-nmbx .f4x", { borderColor: "#F1EDE8", background: "#F1EDE8", color:"#514638", duration: 1.5 }, "<")
                    .to(".bldx-flrx .flrx3", { y: space * -1, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx5 .n3x", {opacity: 0, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx3 .n3x", {opacity: 1, duration: 1 }, "<")
                    .to(".bldx-flrx .flrx8,.bldx-flrx .flrx7,.bldx-flrx .flrx6,.bldx-flrx .flrx5,.bldx-flrx .flrx4", { y: space * -2, duration: 1 }, "<")

                    gsap.utils.toArray(".hm-ct02").forEach((el) => {
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: el,
                                start: "top 500",
                                end: "top 0",
                                scrub: true,
                                onEnter: () => {
                                    $(el).addClass("on");
                                },
                                
                            }
                        });
                    });
	
                    gsap.utils.toArray(".mtx").forEach((el) => {
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: el,
                                start: "top 70%",
                                end: "top 0",
                                scrub: true,
                                onEnter: () => {
                                    $(el).addClass("on");
                                },
                               
                            }
                        });
                    });
                
                
                    var $visualList2 = $("#i-hm .slx-bx .bx");
                    var visualLists2 = [$visualList2];
                    var visualLength2 = $visualList2.length;
                    var _visualIn2; 
                    var visualNum2 = 0;



                    
                    function autoVisual2() {
                        _visualIn2 = setInterval(function () {
                            visualNum2 = (visualNum2 + 1) % visualLength2;
                            fadeEvent2(visualNum2);
                        }, 5000);
                    }



                    
                    function fadeEvent2(target) {
                        visualLists2.forEach(function ($list) {
                            $list.removeClass("on prvx2 prvx3 prvx4 nxtx2 nxtx3 nxtx4 prvx5");

                            $list.eq((target - 1) % visualLength2).addClass("prvx2");
                            $list.eq((target - 2) % visualLength2).addClass("prvx3");
                            $list.eq((target - 3) % visualLength2).addClass("prvx4");
                            $list.eq((target - 4) % visualLength2).addClass("prvx5");
                            $list.eq((target + 1) % visualLength2).addClass("nxtx2");
                            $list.eq((target + 2) % visualLength2).addClass("nxtx3");
                            $list.eq((target + 3) % visualLength2).addClass("nxtx4");
                            $list.eq(target).addClass("on");
                
                
                
                
                
                        });
                    }

                    
	
	               gsap.utils.toArray(".hm-ct05").forEach((el) => {
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: el,
                                start: "top 70%",
                                end: "top 0",
                                scrub: true,
                                onEnter: () => {
                                    $(el).addClass("on");
                                    autoVisual2();
                                },
                               
                            }
                        });
                    });
                
                    
var $visualList1 = $("#i-hm .hm-ct03 .mmbx-sl .bx");
var visualLists = [$visualList1];
var visualLength = $visualList1.length;

var _visualIn = null;
var visualNum = 0;



$("#i-hm .hm-ct03 .in button").on("click", function () {
    clearInterval(_visualIn);

    if ($(this).hasClass("prvx")) {
        visualNum = visualNum <= 0
            ? visualLength - 1
            : visualNum - 1;
    } else {
        visualNum = visualNum >= visualLength - 1
            ? 0
            : visualNum + 1;
    }

    fadeEvent(visualNum);
    autoVisual();
});



$("#i-hm .hm-ct03 .mmbx-sl").on("click", ".dr-lk", function () {
    
    if ($(this).find(".mmx-tx").css("display") !== "none") return;

    var m = this.className.match(/doctor_seq_(\d+)/);
    var route=this.getAttribute("data-doctor-route");if(route)location.href=route;
});



function autoVisual() {
    
    clearInterval(_visualIn);

    _visualIn = setInterval(function () {
        visualNum = (visualNum + 1) % visualLength;
        fadeEvent(visualNum);
    }, 3600);
}



function stopVisual() {
    clearInterval(_visualIn);
    _visualIn = null;
}



function fadeEvent(target) {
    visualLists.forEach(function ($list) {
        $list.removeClass(
            "bx01 bx02 bx03 bx04 bx05 bx06 bx07 bx08 nxtx"
        );

        $list.eq(target).addClass("bx01");
        $list.eq((target + 1) % visualLength).addClass("bx02");
        $list.eq((target + 2) % visualLength).addClass("bx03");
        $list.eq((target + 3) % visualLength).addClass("bx04");
        $list.eq((target + 4) % visualLength).addClass("bx05");
        $list.eq((target + 5) % visualLength).addClass("bx06");
        $list.eq((target + 6) % visualLength).addClass("bx07");
        $list.eq((target + 7) % visualLength).addClass("bx08");

        
        $list.eq(
            (target - 1 + visualLength) % visualLength
        ).addClass("nxtx");
    });

    var page = target < 3
        ? target + 1
        : target - 2;
    $(".page_active").text(page);
}



gsap.utils.toArray(".hm-ct03").forEach(function (el) {
    ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        end: "bottom top",

        onEnter: function () {
            $(el).addClass("on");
            fadeEvent(visualNum);
            autoVisual();
        },

        onEnterBack: function () {
            autoVisual();
        },

        onLeave: function () {
            stopVisual();
        },

        onLeaveBack: function () {
            stopVisual();
        }
    });
});

                var hei2 = $("#i-hm .mmbx-hm-ct03").outerHeight(true);;
                $("#i-hm .hm-ct05 .bk2").height(hei2+2);
                    

                    $(window).on('resize', function(){
                            ScrollTrigger.refresh()
                        });
                
                $("#i-cntx button").hover(function(){
                    $("#i-cntx-fm").fadeIn(300)
                })
                $("#i-cntx-fm .cls").click(function(){
                    $("#i-cntx-fm").fadeOut(300)
                })
            });
		

			$(document).ready(function(){
				
                
            
            
            
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
    
(function(){function enter(){setTimeout(function(){var e=document.querySelector('.hm-kv');if(e)e.classList.add('on')},500)}if(document.readyState==='complete')enter();else window.addEventListener('load',enter,{once:true})})();