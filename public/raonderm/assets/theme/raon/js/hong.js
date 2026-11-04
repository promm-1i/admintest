

if (window.gsap) { gsap.registerPlugin(...[window.ScrollTrigger, window.SplitText, window.CustomEase, window.Flip, window.ScrollSmoother].filter(Boolean)); }

// 디바이스가 모바일인지 확인하는 함수
function isMobileDevice() {
return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
  
// PC에서만 ScrollSmoother 활성화
/*if (!isMobileDevice()) {
	ScrollSmoother.create({
	  wrapper: "#smooth-wrapper", // 스크롤러 래퍼 요소 ID
	  content: "#smooth-content", // 스크롤할 컨텐츠 요소 ID
	  smooth: 1.5, // 스크롤 부드러움 정도
	  smoothTouch: 0.1,
	  effects: true, // 패럴랙스 등 효과 활성화 여부
	});
}

*/
//let scroll;
let transitionOffset = 1100;
let staggerDefault = 0.07;
let durationDefault = 1.47;
let durationDefaultFaster = 1.2;


/**
 * Fire all scripts on page load
 */
function initScript() {
   initSplitText();
   initCheckWindowHeight();
   initBasicFunctions();
   initLazyLoad();
   initScrollTriggerPlayVideoInview();
   initScrollToAnchorLenis();
   initMagnetic();
   initVimeoLightbox();
   initVimeoPlayer();
   initScrolltriggerAnimations();
   initBearlyDigitalContactForm();

   // Refresh ScrollTrigger after initialization
   ScrollTrigger.refresh();
}


// SplitText 초기화
function initSplitText() {
   if (typeof SplitText === "undefined") return;
   var splitTextLines = new SplitText(".split-lines.not-split", {type: "lines", linesClass: "single-line"});
   $('.split-lines.not-split .single-line').wrapInner('<div class="single-line-inner">');
   $(splitTextLines.elements).each(function(){
      $(this).removeClass('not-split');
   }); 
}


// ScrollTrigger 애니메이션

document.querySelectorAll('.header-1, .header-2, .header-3, .header-4').forEach(header => {
  header.innerHTML = header.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
});

// ScrollTrigger 애니메이션
if (document.querySelector('.animate-scroll-group')) {
  $('.animate-scroll-group').each(function () {
    let triggerElement = $(this);
    let headerLetters = triggerElement.find('.header-1 .letter, .header-2 .letter, .header-3 .letter, .header-4 .letter');
    let targetElementLines = triggerElement.find('.single-line-inner');
    let targetElementFade = triggerElement.find('.fade-in');
    let targetElementButton = triggerElement.find('.btn-animate-in .link');

    // 초기 상태 숨기기
    if (headerLetters.length) gsap.set(headerLetters, { autoAlpha: 0, y: 200 });
    if (targetElementLines.length) gsap.set(targetElementLines, { yPercent: 110 });
    if (targetElementFade.length) gsap.set(targetElementFade, { autoAlpha: 0, y: "2em" });
    if (targetElementButton.length) gsap.set(targetElementButton, { yPercent: 110 });

    // ScrollTrigger timeline
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "0% 80%",
        end: "100% 0%",
        toggleActions: "play none none reset"
      }
    });

    // 1. 헤더 글자 애니메이션
    if (headerLetters.length) {
      tl.to(headerLetters, {
        y: 0,
        autoAlpha: 1,
        ease: "expo.out",
        duration: durationDefault,
        stagger: staggerDefault
      }, 0); // timeline 시작 위치
    }

    // 2. single-line-inner (헤더 후에 이어지도록)
    if (targetElementLines.length) {
      tl.to(targetElementLines, {
        yPercent: 0,
        rotate: 0.001,
        ease: "primary-ease",
        duration: durationDefault,
        stagger: staggerDefault
      }, '+=0.2'); // 헤더 끝난 후 약간 쉬고 실행
    }

    // 3. fade-in 요소 (라인 다음에)
    if (targetElementFade.length) {
      tl.to(targetElementFade, {
        y: 0,
        rotate: 0.001,
        autoAlpha: 1,
        ease: "expo.out",
        duration: durationDefault,
        stagger: staggerDefault
      }, '+=0.2'); // 앞 모션들 끝난 후 실행
    }

    // 4. 버튼 (가장 마지막)
    if (targetElementButton.length) {
      tl.to(targetElementButton, {
        yPercent: 0,
        rotate: 0.001,
        ease: "primary-ease",
        duration: durationDefault,
        stagger: staggerDefault
      }, '+=0.2');
    }
  });
}


ScrollTrigger.matchMedia({
  // desktop
  "(min-width: 769px)": function() {

  }
});




/**
* Scrolltrigger Animations Desktop + Mobile
*/
if(document.querySelector('.styled-media')) {
	$('.styled-media').each(function () {
	  let triggerElement = $(this);
	  let targetElementFigureInner = $(this).find('.figure-inner');
	  let targetElementReveal = $(this).find('.figure-reveal');

	   let tl = gsap.timeline({
		  scrollTrigger: {
			trigger: triggerElement,
			start: "0% 90%",
			end: "100% 0%",
			toggleActions: "play none none reset"
		  }
	   });

	  if(targetElementReveal.length) {
		 tl.fromTo(targetElementReveal, {
			scaleY: 1,
			rotate: 0.001
		 },{
			scaleY: 0,
			rotate: 0.001,
			ease: "primary-ease",
			duration: durationDefault
		 }, 0);
	  }

	  if(targetElementFigureInner.length) {
		 tl.fromTo(targetElementFigureInner, {
			scale: 1.5,
			rotate: 0.001
		 },{
			scale: 1,
			rotate: 0.001,
			ease: "primary-ease",
			duration: durationDefault
		 }, 0);
	  }
	});
}

