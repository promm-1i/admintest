// console.log('%c created by. %cFINEAPPLE %cPTL ','color:#8cc677; font-size:14px; background-color:#555; font-weight:600; padding:4px 0;','color:#cbdd54; font-size:14px; background-color:#555; font-weight:600; padding:4px 0;','color:#57b69a; font-size:14px; background-color:#555; font-weight:600; padding:4px 0;');

// html엘리먼트 ie7,8인식;
document.createElement('header');
document.createElement('nav');
document.createElement('article');
document.createElement('section');
document.createElement('aside');
document.createElement('footer');

function isBrowserCheck() {
	const agt = navigator.userAgent.toLowerCase();
	if (agt.indexOf("chrome") != -1) return 'Chrome'
	if (agt.indexOf("opera") != -1) return 'Opera'
	if (agt.indexOf("staroffice") != -1) return 'Star Office'
	if (agt.indexOf("webtv") != -1) return 'WebTV'
	if (agt.indexOf("beonex") != -1) return 'Beonex'
	if (agt.indexOf("chimera") != -1) return 'Chimera'
	if (agt.indexOf("netpositive") != -1) return 'NetPositive'
	if (agt.indexOf("phoenix") != -1) return 'Phoenix'
	if (agt.indexOf("firefox") != -1) return 'Firefox'
	if (agt.indexOf("safari") != -1) return 'Safari'
	if (agt.indexOf("skipstone") != -1) return 'SkipStone'
	if (agt.indexOf("netscape") != -1) return 'Netscape'
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla'
	if (agt.indexOf("msie") != -1) {
		let rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer') {
			let ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})")
			if (re.exec(ua) != null)
				rv = parseFloat(RegExp.$1)
		}
		return 'Internet Explorer ' + rv
	}
}




function hide(elem){
	gsap.set(elem, {autoAlpha: 0});
}



var clickEvent = (function () {
	if ('ontouchstart' in document.documentElement === true) {
		return 'touchstart';
	} else {
		return 'click';
	}
})(); // 클릭이벤트와 터치이벤트 토글


// header
/*const header = document.getElementById('header');
const hamberger = document.querySelector('.header_hamburgerBtn');
const gnb = document.getElementById('gnb2');
//const logo2222 = document.querySelector('.header_center');
const header_rightCont = document.querySelector('.header_rightCont');
//const lnb = document.getElementById('lnb');
let lenisState = false;
const lnbCloseBtn = document.querySelector('.topCont_closeWrap');

const menuEvent = function(e){
    header.classList.toggle('open');
	document.body.classList.toggle('open');
    document.documentElement.classList.toggle('open');
	hamberger.classList.toggle('open');
	gnb.classList.toggle('open');
	//logo2222.classList.toggle('open');
	header_rightCont.classList.toggle('open');
    //lnb.classList.toggle('open');
    // headerWrap.classList.toggle('open');

    if(lenisState === false) {
        lenisState = true;
        lenis.stop(); // Stop the smooth scrolling
    } else {
        lenisState = false;
        lenis.start(); // Start the smooth scrolling
    }
    
    //모바일에서 메뉴 버튼 클릭 시 스크롤 멈춤(토글 방식) 
    var ele = document.querySelector('html, body');
    if (!ele) {
        return
    };
    if (ele.style.overflowY === 'hidden') {
        ele.style.overflowY = 'overlay';
        ele.style.height = 'initial';
    } else {
        ele.style.overflowY = 'hidden';
        ele.style.height = 'auto';
    }
}

//lnbCloseBtn?.addEventListener(clickEvent, menuEvent);
//hamberger?.addEventListener(clickEvent, menuEvent);
hamberger.addEventListener(clickEvent, menuEvent);

*/



//8.14 추가

const header = document.getElementById('header');
const hamberger = document.querySelector('.header_hamburgerBtn');
const gnb = document.getElementById('gnb2');
const header_rightCont = document.querySelector('.header_rightCont');
const lnbCloseBtn = document.querySelector('.topCont_closeWrap');
const gnbItems = document.querySelectorAll('.gnb_li');

let lenisState = false;

function lockScroll(lock = true) {
  const html = document.documentElement;
  const body = document.body;

  if (lock) {
    html.style.overflowY = 'hidden';
    body.style.overflowY = 'hidden';
    html.style.height = '100%';
    body.style.height = '100%';
  } else {
    html.style.overflowY = '';
    body.style.overflowY = '';
    html.style.height = '';
    body.style.height = '';
  }
}
function stopLenis() {
  if (window.lenis && !lenisState) {
    window.lenis.stop();
    lenisState = true;
  }
}
function startLenis() {
  if (window.lenis && lenisState) {
    window.lenis.start();
    lenisState = false;
  }
}
function openMenu() {
  header.classList.add('open');
  document.body.classList.add('open');
  document.documentElement.classList.add('open');
  hamberger.classList.add('open');
  gnb.classList.add('open');
  header_rightCont && header_rightCont.classList.add('open');

  stopLenis();
  lockScroll(true);
}

function closeMenu() {
  header.classList.remove('open');
  document.body.classList.remove('open');
  document.documentElement.classList.remove('open');
  hamberger.classList.remove('open');
  gnb.classList.remove('open');
  header_rightCont && header_rightCont.classList.remove('open');

  lockScroll(false);
  startLenis();
}

function toggleMenu(e) {
  if (header.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
}
hamberger && hamberger.addEventListener('click', toggleMenu);
lnbCloseBtn && lnbCloseBtn.addEventListener('click', closeMenu);

gnbItems.forEach(li => {
  li.addEventListener('click', () => {
    closeMenu();
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && header.classList.contains('open')) {
    closeMenu();
  }
});
document.addEventListener('click', (e) => {
  if (!header.classList.contains('open')) return;
  const isInsideMenu =
    gnb.contains(e.target) || hamberger.contains(e.target) || header.contains(e.target);
  if (!isInsideMenu) closeMenu();
});









const noDepth = document.querySelectorAll(".list_title.noDepth");
noDepth?.forEach(item => {
    item.addEventListener("click", () => {
        const showCont = document.querySelectorAll(".show");
        item.closest(".bottomCont_list").classList.toggle("show");
        item.nextElementSibling.classList.toggle("show");
        showCont.forEach(ele => ele.classList.remove("show"));
    })
})


const lnbContWrap = document.querySelectorAll(".lnb_contWrap");
const lnbImgBox = document.querySelector(".lnb_inner .imgBox");
lnbContWrap.forEach((cont, idx) => {
    const contWrapEventArr = ["mouseenter", "click"]
    contWrapEventArr.forEach(arr => {
        cont.addEventListener(arr, () => {
            for(let i = 0; i < lnbContWrap.length; i++ ) {
                lnbImgBox.classList.remove("imgBox_cont_" + (i + 1));
            }
            lnbImgBox.classList.add("imgBox_cont_" + (idx + 1));
        })
    })
    
})




if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
} // forEach 의 ie 지원


// 스크롤시 헤더 컨트롤
// ScrollTrigger.create({
//     trigger: '#content',
//     start: '60px top',
//     end: 99999,
//     toggleClass: {className: 'onder', targets: '.main_top_slider_text_wrap, .scroll_down_wrap'}
// });
ScrollTrigger.create({
    trigger: '#content',
    start: '120px top',
    end: 99999,
    toggleClass: {className: 'scrolled', targets: '.ht-inner, .main-header, .hamberger, .quick_wrap'}
    // toggleClass: {className: 'scrolled', targets: '.quick_wrap'}
});

function headerChangeWhenScroll() {
    const header = document.querySelector(".header");
    const currentScrollPosition = window.scrollY;
    if(currentScrollPosition >= 50) {
        header.classList.add("bg_active");
        document.body.classList.add("scroll_active");
    } else {
        header.classList.remove("bg_active");
        document.body.classList.remove("scroll_active")
    }
}
headerChangeWhenScroll()

window.addEventListener('scroll', () => {
    headerChangeWhenScroll();
});



// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

const quickBtnEffect =  gsap.timeline({
    scrollTrigger: {
        trigger: "#content",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
    }
})
quickBtnEffect
//.set(".quick_text",{xPercent: -50, yPercent: -50, x: 0, y: 0, rotate: 0})
//.fromTo(".quick_text",{xPercent: -50, yPercent: -50, rotate: 0}, {xPercent: -50, yPercent: -50, rotate: 360 },"footer")
//.to(".btn_wrap .quick_act_box", { "--rotate-progress" : 100 },"footer")

// const topBtn = document.querySelector(".quick_top_btn");
// const eventArr = ["click", "touchend"];
// topBtn.addEventListener("click", () => {
//     window.scrollTo({
//         top: 0,
//         behavior: "smooth"
//     });
// })
// topBtn.addEventListener("touchend", () => {
//     window.scrollTo({
//         top: 0,
//         behavior: "smooth"
//     });
// })

const topNav = Array.from(document.getElementsByClassName('top_menu'));
var headHei = document.getElementById('header').clientHeight;
// function quickBtnChangeAtBottom() {
//     const quickBtnWrap = document.querySelector(".quick_wrap");
//     const quickMenuBtn = document.querySelector(".quick_open_btn");
//     const isScrollAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
//     console.log(isScrollAtBottom)
//     if(isScrollAtBottom) {
//         quickBtnWrap.classList.add("top");
//         quickMenuBtn.addEventListener("click", () => {
//             console.log("111")
//             if(quickBtnWrap.classList.contains("top")) {
//                 window.scrollTo({
//                     top: 0,
//                     left: 0,
//                     behavior: "smooth"
//                 });
//             }
//         })
//     } else { 
//         quickBtnWrap.classList.remove("top");
//     }
// }
// window.addEventListener('scroll', function() {
//     quickBtnChangeAtBottom();

// });
// quickBtnChangeAtBottom()

function quickBtnChangeAtBottom() {
    const quickBtnWrap = document.querySelector(".quick_wrap");
    const quickTopBtn = document.querySelector(".top_btn");

    const isScrolledDown = window.scrollY > 10; 

    if (isScrolledDown) {
        quickBtnWrap.classList.add("top");
        quickTopBtn.addEventListener("click", () => {
            if (quickBtnWrap.classList.contains("top")) {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                });
            }
        });
    } else {
        quickBtnWrap.classList.remove("top");
    }
}


window.addEventListener('scroll', function() {
    // 최하단일경우 퀵메뉴버튼 변경
    quickBtnChangeAtBottom();

});
quickBtnChangeAtBottom()



// Detect request animation frame
var scroll = window.requestAnimationFrame ||
             // IE Fallback
             function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.reveal'); 

function loop() {

    Array.prototype.forEach.call(elementsToShow, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });

    scroll(loop);
}

// Call the loop for the first time
loop();

// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}


// 퀵메뉴
// const quick = document.getElementById("quick");
// const quickBtn = document.getElementById("progress-area");
// const quickBtnClose = document.getElementById("q_close");
// quickBtn.addEventListener(clickEvent,()=>quick.classList.add('open'));
// quickBtn.addEventListener(clickEvent,()=>quickBtn.classList.add('close'));
// quickBtnClose.addEventListener(clickEvent,()=>quick.classList.remove('open'));
// quickBtnClose.addEventListener(clickEvent,()=>quickBtn.classList.remove('close'));
// 퀵메뉴
const quick = document.getElementById("quick");
const quickBtn = document.getElementById("q_btn");
quickBtn.addEventListener(clickEvent,()=>quick.classList.toggle('open'));

/*const equipment_top_view_swiper = new Swiper('.equipment_top_view_swiper', {
    slidesPerView: 'auto',
	spaceBetween: 0,
    autoplay: false,
	centeredSlides: true,
    // loop: true,
    touchRatio: 0,
    observer: true,
    observeParents: true,
});*/
    
// commonTab
function modalView(modalName){
	if(modalName.includes('doctor')) {
		$(".modal#"+modalName).css("display", "block")
		$(".modal-"+modalName+".transparents-layer").css("display","block").css("opacity","1");
	}else if(modalName.includes('equipment')) {
		$(".modal#"+modalName).css("display", "block")
		$(".modal-"+modalName+".transparents-layer").css("display","block").css("opacity","0.5");
	}else {
		$(".modal#"+modalName).css("display", "block")
		$(".modal-"+modalName+".transparents-layer").css("display","block").css("opacity","0.5");
	}
	$(".transparents-layer").attr("onclick", "modalHide('"+modalName+"')");
	// $(".modal#"+modalName).css("top","50%").css("left","50%").css("transform","translate(-50%, -50%)").animate({opacity:1}, 500);
	$(".modal#"+modalName).animate({opacity:1}, 500);
	$("html, body").css("overflow","hidden");
	$("#header").css("display","none");
    lenis.stop();
}
function modalHide(modalName){
	$(".modal#"+modalName).animate({opacity:0}, 400, function(){
		// $(".modal#"+modalName).css("top", "-99999px").css("left","-99999px");
		$(".modal#"+modalName).css("display", "none")
		$("html, body").css("overflow","auto");
		$("#header").css("display","flex");
	})
	$(".transparents-layer").animate({opacity:0}, 400, function(){
		$(this).css("display","none");
	});
    lenis.start();
}
// counselmodal modal
function counselmodalView(modalName){
	$(".modal-"+modalName+".transparents-layer").css("display","block").css("opacity","0.5");
	$(".transparents-layer").attr("onclick", "modalHide('"+modalName+"')");
    $(".modal#"+modalName).css("opacity","1").css("transform","translate(-50%, 0%) scale(1,1)");
	// $(".modal#"+modalName).css("bottom","5rem").css("left","50%").css("transform","translate(-50%, -50%)").animate({opacity:1}, 500);
	// $("html, body").css("overflow","hidden");
}
// commonTab
// function commonTab(tabParent, tabName){
//     $("."+tabParent+" ul.tab_list > li").stop().removeClass("active");
//     $("."+tabParent+" ul.tab_list > li."+tabName).stop().addClass("active");
//     $("."+tabParent+" .tabcont_wrap").stop().removeClass("active");
//     $("."+tabParent+" .tabcont_wrap."+tabName).stop().addClass("active");
// }

// modal
// function modalView(modalName){
// 	$(".modal-"+modalName+".transparents-layer").css("display","block").css("opacity","0.5");
// 	$(".transparents-layer").attr("onclick", "modalHide('"+modalName+"')");
// 	$(".modal#"+modalName).css("top","50%").css("left","50%").css("transform","translate(-50%, -50%)").animate({opacity:1}, 500);
// 	$("html, body").css("overflow","hidden");
// }
// function modalHide(modalName){
// 	$(".modal#"+modalName).animate({opacity:0}, 400, function(){
// 		$(".modal#"+modalName).css("top", "-99999px").css("left","-99999px");
// 		$("html, body").css("overflow","auto");
// 	})
// 	$(".transparents-layer").animate({opacity:0}, 400, function(){
// 		$(this).css("display","none");
// 	});
// }
// counselmodal modal
// function counselmodalView(modalName){
// 	$(".modal-"+modalName+".transparents-layer").css("display","block").css("opacity","0.5");
// 	$(".transparents-layer").attr("onclick", "modalHide('"+modalName+"')");
//     $(".modal#"+modalName).css("opacity","1").css("transform","translate(-50%, 0%) scale(1,1)");
// 	$(".modal#"+modalName).css("bottom","5rem").css("left","50%").css("transform","translate(-50%, -50%)").animate({opacity:1}, 500);
// 	$("html, body").css("overflow","hidden");
// }
// function modalHide(modalName){
// 	$(".modal#"+modalName).animate({opacity:0}, 400, function(){
// 		// $(".modal#"+modalName).css("top", "-99999px").css("left","-99999px");
// 		$(".modal#"+modalName).css("opacity","0").css("transform","translate(-50%, 0%) scale(0,0)");
// 		// $("html, body").css("overflow","auto");
// 	})
// 	$(".transparents-layer").animate({opacity:0}, 400, function(){
// 		$(this).css("display","none");
// 	});
// }


// panel
function panelOpen(panel){
    var $panel = $(panel);
    var $panelContent = $(panel).next(".panel-content");

    if($panelContent.is(":visible")) {
        $panelContent.slideUp("fast",function(){
            $panel.find(".icon-panel").removeClass("open");
            $panel.find(".panel-title").removeClass("open");
        });
    }else {
        $panelContent.slideDown("fast",function(){
            $panel.find(".icon-panel").addClass("open");
            $panel.find(".panel-title").addClass("open");
        });
        $panel.parent(".panel").siblings().find(".panel-content").slideUp("fast",function(){
            $panel.parent(".panel").siblings().find(".icon-panel").removeClass("open");
            $panel.parent(".panel").siblings().find(".panel-title").removeClass("open");
        });
    }
}


$(window).resize(function(){
	var winWid = $(window).width();
	if(winWid < 961) {
    
	} else {
		$('.gnb-menu-depth1 > .gnb-menu-text').hover(function(){
            $(this).stop().siblings('.gnb-menu-depth2').addClass('on');
            $(this).stop().children('a').children('p').addClass('on');
            $(this).stop().siblings('img').addClass('on');
            // $('.gnb-menu-depth1 > .gnb-menu-text').not(this).siblings('.gnb-menu-depth2').removeClass('on');
            $('.gnb-menu-depth1 > .gnb-menu-text').not(this).children('a').children('p').removeClass('on');
            $('.gnb-menu-depth1 > .gnb-menu-text').not(this).siblings('img').removeClass('on');
        }, function(){
            // $(this).stop().siblings('.gnb-menu-depth2').removeClass('on');
            $(this).stop().children('a').children('p').removeClass('on');
            $(this).stop().siblings('img').removeClass('on');
            $(this).stop().siblings('img').removeClass('on');
        });
        // $('.gnb-menu-depth2').hover(function(){
        //     $(this).stop().addClass('on');
        //     $(this).stop().siblings('.gnb-menu-text').children('a').children('p').addClass('on');
        //     $(this).stop().siblings('img').addClass('on');
        //     $('.gnb-menu-depth2').not(this).removeClass('on');
        //     $('.gnb-menu-depth2').not(this).siblings('.gnb-menu-text').children('a').children('p').removeClass('on');
        //     $('.gnb-menu-depth2').not(this).siblings('img').removeClass('on');
        // }, function(){
        //     $(this).stop().removeClass('on');
        //     $(this).stop().siblings('.gnb-menu-text').children('a').children('p').removeClass('on');
        // });
	}
}).resize();



// ********************* 시그니쳐 호버 효과

$(".main_signature_half01").mouseover(
    function () {
        $(".main_signature_wrap").addClass("left");
    }
  );
  $(".main_signature_half01").mouseleave(
    function () {
        $(".main_signature_wrap").removeClass("left");
    }
);
$(".main_signature_half02").mouseover(
    function () {
        $(".main_signature_wrap").addClass("right");
    }
  );
  $(".main_signature_half02").mouseleave(
    function () {
        $(".main_signature_wrap").removeClass("right");
    }
);

// ********************* 

// modal
// function modalView(modalName){
// 	$(".modal-"+modalName+".transparents-layer").css("display","block").css("opacity","0.5");
// 	$(".modal#"+modalName).css("top","50%").css("left","50%").css("transform","translate(-50%, -50%)").animate({opacity:1}, 500);
// 	$("html, body").css("overflow","hidden");
// }
// function modalHide(modalName){
// 	$(".modal#"+modalName).animate({opacity:0}, 400, function(){
// 		$(".modal#"+modalName).css("top", "-99999px").css("left","-99999px");
// 		$("html, body").css("overflow","auto");
// 	})
// }

// ********************* swiper 

const main_story_wrap = document.getElementById('main_story_wrap');
const main_story_swiper_Id = document.getElementById('main_story_swiper');
const main_story_slide01_Id = document.getElementById('main_story_slide01');
const main_story_slide02_Id = document.getElementById('main_story_slide02');
const main_story_slide03_Id = document.getElementById('main_story_slide03');
var main_story_pageTxt = ['Inborn','Minimalism','Everlasting'];
const main_story_swiper = new Swiper('.main_story_swiper', {
    slidesPerView:'1',
    spaceBetween: 0,
    speed:900,
    effect: "fade",
    fadeEffect: { crossFade: true },
    mousewheel: true,
    watchOverflow : true,
    observer: true,
    observeParents: true,
    centeredSlides: true,
    pagination: {
        el: ".swiper-pagination.main_story_pagination",
		clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"><em>' + main_story_pageTxt[index] + '</em></span>';
        },
    },
    navigation: {
        nextEl: '.swiper-button-next.main-story-next',
        prevEl: '.swiper-button-prev.main-story-prev',
    },
    on: {
        slideChange: function() {
            setTimeout(function () {
                main_story_swiper.params.touchReleaseOnEdges = false;  
                main_story_swiper.params.mousewheel.releaseOnEdges = false;
            });

            if(this.realIndex == 2){ 
            }
        },
        reachEnd: function() {
            setTimeout(function () {
                main_story_swiper.params.touchReleaseOnEdges = true;
                main_story_swiper.params.mousewheel.releaseOnEdges = true;
            }, 500);
        },
            reachBeginning: function() {
            setTimeout(function () {
                main_story_swiper.params.touchReleaseOnEdges = true;
                main_story_swiper.params.mousewheel.releaseOnEdges = true;
            }, 500);
        }
    }
});
main_story_swiper.on('transitionStart', function() { 
    if(main_story_swiper.realIndex == 0){ //메인 슬라이드 1번 영역에 도착 후 실행되는 구문
        main_story_swiper_Id.classList.add('main_story02_active');
        main_story_swiper_Id.classList.remove('main_story01_active');
        main_story_swiper_Id.classList.remove('main_story03_active');
        main_story_wrap.classList.remove("color_contrast")
        main_story_wrap.classList.remove("grey")

        main_story_slide01_Id.classList.remove("show")
        main_story_slide03_Id.classList.remove("show")
        main_story_slide02_Id.classList.add("show")
    
    } else if(main_story_swiper.realIndex == 1){ //메인 슬라이드 2번 영역에 도착 후 실행되는 구문
        main_story_swiper_Id.classList.add('main_story01_active');
        main_story_swiper_Id.classList.remove('main_story02_active');
        main_story_swiper_Id.classList.remove('main_story03_active');
        main_story_swiper_Id.classList.remove('slide01_icon_active');
        main_story_wrap.classList.add("color_contrast")
        main_story_wrap.classList.remove("grey")

        main_story_slide02_Id.classList.remove("active")
        main_story_slide02_Id.classList.remove("show")
        main_story_slide03_Id.classList.remove("show")
        main_story_slide01_Id.classList.add("show")

    } else if(main_story_swiper.realIndex == 2){ //메인 슬라이드 2번 영역에 도착 후 실행되는 구문
        main_story_swiper_Id.classList.add('main_story03_active');
        main_story_swiper_Id.classList.remove('main_story01_active');
        main_story_swiper_Id.classList.remove('main_story02_active');
        main_story_wrap.classList.remove("color_contrast")
        main_story_wrap.classList.add("grey")

        main_story_slide02_Id.classList.remove("active")
        main_story_slide01_Id.classList.remove("show")
        main_story_slide02_Id.classList.remove("show")
        main_story_slide03_Id.classList.add("show")

        /* 숫자 카운트 */
                
        $('.counter1').each(function(i) {
            $(this).attr('id','count'+1);
            const thisID_1 = $(this).attr("id");
            const thisCount_1 = $(this).data('count');

            var counter_1 = new CountUp(thisID_1, 10, thisCount_1, 0, 4, {  
                useEasing: true,
                useGrouping: true,
                separator: '',
                decimal: '.',
                prefix: '',
            });

            var waypoint_1 = new Waypoint({
                element: document.getElementById(thisID_1),
                handler: function(direction) {
                    if (direction == "up") {
                        counter_1.reset();
                    } else {
                        counter_1.start();
                    }
                },
                offset: '70%'
            });
        });

        $('.counter2').each(function(i) {
            $(this).attr('id','count'+2);
            const thisID_2 = $(this).attr("id");
            const thisCount_2 = $(this).data('count');

            var counter_2 = new CountUp(thisID_2, 7000, thisCount_2, 0, 3, {  
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
            });
            
            var waypoint_2 = new Waypoint({
                element: document.getElementById(thisID_2),
                handler: function(direction) {
                    if (direction == "up") {
                        counter_2.reset();
                    } else {
                        counter_2.start();
                    }
                },
                offset: '70%'
            });
        });
        $('.counter3').each(function(i) {
            $(this).attr('id','count'+3);
            const thisID_3 = $(this).attr("id");
            const thisCount_3 = $(this).data('count');
            const thisStartCount_3 = $(this).data('scount');
            const thisSecond_3 = $(this).data('second');

            var counter_3 = new CountUp(thisID_3, thisStartCount_3, thisCount_3, 0, thisSecond_3, {  
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
            });

            var waypoint_3 = new Waypoint({
                element: document.getElementById(thisID_3),
                handler: function(direction) {
                    if (direction == "up") {
                        counter_3.reset();
                    } else {
                        counter_3.start();
                    }
                },
                offset: '70%'
            });
        });
    } 
    
});



// main-satisfied-sect
const satisSect = document.getElementsByClassName('main-satisfied-sect')[0];
const satisList = document.querySelectorAll('.main-satisfied-sect ul li');
const satisMenu = Array.from(document.getElementsByClassName('satisfied-menu-item'));


// main-satisfied-slide
var mainSatisfiedThumbSlide = new Swiper("#main-satisfied-thumb-slide.swiper-container", {
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    slidesPerView: 4,
    direction: "vertical",
    spaceBetween: 0,
    observer: true,
    observeParents: true,
//			watchSlidesProgress: true,
    allowTouchMove: false,
});
var mainSatisfiedGallerySlide = new Swiper("#main-satisfied-gallery-slide.swiper-container", {
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    effect: "fade",
    spaceBetween: 0,
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    allowTouchMove: false,
    thumbs: {
        swiper: mainSatisfiedThumbSlide,
    },
});

// main-sect-satisfied
if(satisSect){
    satisList.forEach((sati,index)=>{
        sati.addEventListener('mouseenter',function(){
            satisList.forEach(sati=>sati.classList.remove('hover'));
            satisList[index].classList.add('hover');

            satisMenu.forEach(sati=>sati.classList.remove('hover'));
            satisMenu[index].classList.add('hover');
        });
    });
}

function main_top_btn(){
    window.scrollTo({ top: 0, behavior: "smooth" });  
}

(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };
    
    /* init - you can init any event */
    throttle("resize", "optimizedResize");
    
 
    // Hide Header on on scroll down
    //var offset_main = $("#main_cont_wrap01").offset().top;
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5; // 동작의 구현이 시작되는 위치
    var navbarHeight = $('header').outerHeight(); // 영향을 받을 요소를 선택
    
    // 스크롤시에 사용자가 스크롤했다는 것을 알림
    $(window).scroll(function(event){
        didScroll = true;
    });
    
    // hasScrolled()를 실행하고 didScroll 상태를 재설정
    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);
    
    // 동작을 구현
    function hasScrolled() {
        // 접근하기 쉽게 현재 스크롤의 위치를 저장한다.
        var st = $(this).scrollTop();
        
        // 설정한 delta 값보다 더 스크롤되었는지를 확인한다.
        if(Math.abs(lastScrollTop - st) <= delta){
            return;
        }
        
        // 헤더의 높이보다 더 스크롤되었는지 확인하고 스크롤의 방향이 위인지 아래인지를 확인한다.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('header').removeClass('nav-down').addClass('nav-up');
            $('body').removeClass('down').addClass('up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
                $('body').removeClass('up').addClass('down');
            }
        }
        
        // lastScrollTop 에 현재 스크롤위치를 지정한다.
        lastScrollTop = st;
    }

    // $(document).ready(function(){
    //     $('.text_popup_btn_open').on(clickEvent, function(){
    //         $('.text_popup_wrap').stop().addClass('open');
    //     });
    //     $('.text_popup_btn_close').on(clickEvent, function(){
    //         $('.text_popup_wrap').stop().removeClass('open');
    //     });
    // });
    
    
})(); // resize 최적화