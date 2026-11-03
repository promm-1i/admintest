//console.log('%c created by. %cFINEAPPLE %cPTL ','color:#8cc677; font-size:14px; background-color:#555; font-weight:600; padding:4px 0;','color:#cbdd54; font-size:14px; background-color:#555; font-weight:600; padding:4px 0;','color:#57b69a; font-size:14px; background-color:#555; font-weight:600; padding:4px 0;');

gsap.registerPlugin(ScrollTrigger);

var clickEvent = (function () {
	if ('ontouchstart' in document.documentElement === true) {
		return 'touchstart';
	} else {
		return 'click';
	}
})(); // 클릭이벤트와 터치이벤트 토글

// header

const hamberger = document.querySelector('.hamberger');
const hamberger_gnb = document.getElementById('hamberger_gnb');
const gnb = document.getElementById('gnb');

const menuEvent = function(e){
	document.body.classList.toggle('open');
	hamberger.classList.toggle('open');
	gnb.classList.toggle('open');
	hamberger_gnb.classList.toggle('open');
    
    /* 모바일에서 메뉴 버튼 클릭 시 스크롤 멈춤(토글 방식) */
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

hamberger.addEventListener(clickEvent, menuEvent);
hamberger_gnb.addEventListener(clickEvent, menuEvent);

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//쿠키삭제
function deleteCookie(name) { 
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'; 
}















var mainPlayer2 = null;
const equipSect = document.getElementsByClassName('equipment-sect')[0];
const equipList = document.querySelectorAll('.equipment__list li');
const equipMenu = Array.from(document.getElementsByClassName('equipment-menu-item'));

// var laserHoverTl = gsap.timeline();
// equipMenu.forEach(equips=>laserHoverTl.to(equips,{autoAlpha:0,scale:1.05,duration:.6},0));

if(equipSect){
  
  equipList.forEach((equip,index)=>{
    equip.addEventListener('mouseenter',function(){
      equipList.forEach(equips=>equips.classList.remove('hover'));
      equipList[index].classList.add('hover');

      equipMenu.forEach(equips=>equips.classList.remove('hover'));
      equipMenu[index].classList.add('hover');

      //equipMenu.forEach(el=>gsap.to(el,{autoAlpha:0,scale:1.05}));
      // laserHoverTl.play(0);
      // gsap.fromTo(equipMenu[index],{autoAlpha:0,scale:1.05},{duration:1,autoAlpha:1,scale:1});
      
      // mainPlayer2.setCurrentTime(6);
      // mainPlayer2.play();
    });
  });
  //equipMenu.forEach(equips=>gsap.set(equips,{autoAlpha:0,scale:1.05}));
  
}

//rection02
/*
const openBtns3 = Array.from(document.getElementsByClassName('open-on-hover'));
openBtns3.forEach((button)=>{
  button.addEventListener('mouseenter',(e)=>{
    const list = button.getElementsByClassName('open-on-hover-list')[0];
    gsap.fromTo(list,{y:-0,autoAlpha:0},{y:0,autoAlpha:1});
  });
  button.addEventListener('mouseleave',(e)=>{
    const list = button.getElementsByClassName('open-on-hover-list')[0];
    gsap.fromTo(list,{y:0,autoAlpha:1},{y:-0,autoAlpha:0});
  });
});
*/


// main-satisfied-sect
const satisSect = document.getElementsByClassName('main-satisfied-sect')[0];
const satisList = document.querySelectorAll('.main-satisfied-sect ul li');
const satisMenu = Array.from(document.getElementsByClassName('satisfied-menu-item'));


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




//const openBtns = Array.from(document.getElementsByClassName('open-on-hover00')); //right menu
const openBtns01 = Array.from(document.getElementsByClassName('open-on-hover01')); //select-lang 지구본
const quick_counselling01 = document.getElementById('networkBtn');
const networkBtn01 = document.getElementById('networkBtn01');
const selectLang = document.getElementById('selectLang');

/*openBtns.forEach((button) => {
  button.addEventListener('mouseenter', (e) => {
    const list = button.getElementsByClassName('open-on-hover-list')[0];
    gsap.fromTo(list, { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 });
    quick_counselling01.classList.add('opened'); // 'opened' 클래스 추가
  });

  button.addEventListener('mouseleave', (e) => {
    const list = button.getElementsByClassName('open-on-hover-list')[0];
    gsap.fromTo(list, { y: 0, autoAlpha: 1 }, { y: -20, autoAlpha: 0 });
    quick_counselling01.classList.remove('opened'); // 'opened' 클래스 제거
  });
});
*/
openBtns01.forEach((button) => {
  button.addEventListener('mouseenter', (e) => {
    const list = button.getElementsByClassName('open-on-hover-list')[0];
    gsap.fromTo(list, { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 });
    networkBtn01.classList.add('opened'); // 'opened' 클래스 추가
  });

  button.addEventListener('mouseleave', (e) => {
    const list = button.getElementsByClassName('open-on-hover-list')[0];
    gsap.fromTo(list, { y: 0, autoAlpha: 1 }, { y: -20, autoAlpha: 0 });
    networkBtn01.classList.remove('opened'); // 'opened' 클래스 제거
  });
});
/*
selectLang.addEventListener('mouseenter', (e) => {
  networkBtn01.classList.add('opened'); // 'opened' 클래스 추가
});

selectLang.addEventListener('mouseleave', (e) => {
  networkBtn01.classList.remove('opened'); // 'opened' 클래스 제거
});*/






const searchOpen = document.getElementsByClassName('header-search-icon')[0];
const headerSearch = document.getElementsByClassName('header-search-container')[0];
const searchClose = document.getElementsByClassName('header-search-close')[0];
const searchClose2 = document.getElementsByClassName('smooth-scroll')[0];





ScrollTrigger.matchMedia({
	
  // desktop
  "(min-width: 769px)": function() {
    // setup animations and ScrollTriggers for screens 800px wide or greater (desktop) here...
    // These ScrollTriggers will be reverted/killed when the media query doesn't match anymore.
    

  },

  // mobile
  "(max-width: 768px)": function() {

	//re03_cont_m
	$(function () {
		const re03_cont_m = new Swiper('.swiper-container.re03_cont_m', {
			speed: 2000,
			slidesPerView: 'auto',
			loop: true,
			loopAdditionalSlides: 1,
			autoplay: {
				delay: 4500,
				disableOnInteraction: false,
			},
			centeredSlides: true,
			slidesPerGroup: 1,
			loopFillGroupWithBlank: true,
			scrollbar: {
				el: '.re03_swiper-scrollbar',
				draggable: true,
			},
		});

		//re05_cont mobile
		var swiperTopNum = $('.re05_cont').find('.swiper-slide');

		var re05_cont = new Swiper('.re05_cont', {
			slidesPerView: "auto",
		  //slidesPerView: "1.5",
		  spaceBetween: 10,
			speed: 1000,
			autoplay: {
				delay: 4500,
				disableOnInteraction: false,
			},
		  //effect: "coverflow",
		  //grabCursor: true,
		  centeredSlides: true,
		  /*coverflowEffect: {
			rotate: 0,
			stretch: 0,
			depth: 300,
			modifier: 1,
			slideShadows: true,
		  },*/
			scrollbar: {
				el: '.re05_swiper-scrollbar',
				draggable: true,
			},
		  loop: true,
		  loopedSlides: swiperTopNum.length,	
		});
		

	});

	//header 
	/*$(window).scroll(function (x) {
		scroll_head = parseInt($(this).scrollTop());
		if(scroll_head > 0){
			//$("#quick").addClass("on");
			$(".network-select-list").removeClass("on");
			$(".main-header").addClass("scrolled");
		} else {	
			//$("#quick").removeClass("on");
			$(".network-select-list").removeClass("on");
			$(".main-header").removeClass("scrolled");
		}
	});*/
  },
    
    
  "(max-width: 480px)": function() {
    
    /* 세로 스크롤 시 컨텐츠 가로 이동 (sub1_1) */
    const process = document.querySelector('.process');
    let sections = gsap.utils.toArray('.process .process__item');
    gsap.fromTo(sections, {
      xPercent: 0,
      ease:'linear',
    },{
      scrollTrigger: {
        trigger: ".process-wrap",
        markers: false,
        scrub: 1,
        pin: true,
        //snap: 1 / (sections.length - 1),
        start: "top top",
        end: "+=3000",
      },
      xPercent: -110 * (sections.length - 1),
      ease:'linear',
    });
    /* //세로 스크롤 시 컨텐츠 가로 이동 (sub1_1) */
    
  },
    
	
  // all 
  "all": function() {
    // ScrollTriggers created here aren't associated with a particular media query,
    // so they persist.
    const cntStart = document.getElementById('startContent');

    var networkTl = gsap.timeline({paused:true});
    //networkTl.fromTo('.network-select-list',{y:0, autoAlpha:1},{y:0,autoAlpha:0});

    /*ScrollTrigger.create({
      trigger:cntStart,
      start: 'bottom 20%',
      end: 99999,
      scroller: ".smooth-scroll",
      onEnter:()=>networkTl.play(),
      onLeaveBack:()=>{networkTl.reverse()},
      toggleClass: {className: 'scrolled', targets: '.main-header,.hamberger,.m-network-call-icon,.sub-gnb-bg'}
    });*/


    const revealAni = document.getElementsByClassName("gs_reveal");
    if(revealAni){
      gsap.utils.toArray(revealAni).forEach(function(elem, index){
        gsap.set(elem, {autoAlpha: 0}); // assure that the element is hidden when scrolled into view
        const getDelay = elem.getAttribute('data-gs-delay');
      
        var x = 0,
          y = 60,
          z = -100;
      
        if (elem.classList.contains('reveal_fromDown')) {
          y = -12
        } else if(elem.classList.contains("reveal_fromUp")){
          y = 12;
        } else if (elem.classList.contains("reveal_fromRight")) {
          x = 30;
          y = 0;
          z = 10;
        } else if (elem.classList.contains("reveal_fromLeft")) {
          x = -300;
          y = 0;
          z = 10;
        } 
        gsap.fromTo(elem, {
          x: x,
          y: y,
          z: z,
          autoAlpha: 0
        }, {
          scrollTrigger: {
            trigger: elem.parentNode,
            scroller: ".smooth-scroll",
            start: 'top 50%',
            toggleActions: 'play none none none',
            onEnter:()=>elem.classList.add('active'),
            //toggleClass: {className: 'waypoint', targets: '.main-header, #gnb'}
            //markers:true
          },
          duration: .8,
          x: 0,
          y: 0,
          z: 0,
          autoAlpha: 1,
          ease: Power2.easeOut,
          overwrite: "auto",
          delay: getDelay * 0.001
        });
      });
    }/* gs_reveal이 있을때만 실행 */

    const pintitle = document.getElementsByClassName('pin-title-start')[0];
    if(pintitle){
      gsap.to('.pin-title-start',{
        scrollTrigger:{
          trigger:'.pin-title-end',
          start: 'top 240',
          end: 99999,
          scroller: ".smooth-scroll",
          toggleClass: {className: 'sticky', targets: '.pin-title-start,.pin-title-end'}
        },
        //autoAlpha:0
      })
      
    }


	const waypoint = document.getElementsByClassName("waypoint");
	if(waypoint){
	  gsap.utils.toArray(waypoint).forEach(function(elem, index){
		var startPoint = elem.getAttribute('data-start');
		var startTrigger = startPoint !== null ? startPoint : 'top 50%';

		ScrollTrigger.create({
		  trigger: elem,
		  scroller: ".smooth-scroll",
		  start: startTrigger,
		  end: 'bottom top',
		  toggleActions: 'play none none none',
		  onEnter:()=>elem.classList.add('active'),
		  //markers:true,
		  //toggleClass: {className: 'active', targets: elem}
		});
	  });
	}/* waypoint가 있을때만 실행 */

	}

})