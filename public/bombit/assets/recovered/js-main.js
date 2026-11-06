gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Flip, ScrollSmoother);

function isMobileDevice() {
	return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
  
if (!isMobileDevice()) {
	ScrollSmoother.create({
		wrapper: "#smooth-wrapper",
		content: "#smooth-content",
		smooth: 1.5,
		smoothTouch: 0.1,
		effects: true
	});
}

let scroll;
let transitionOffset = 1100;
let staggerDefault = 0.07;
let durationDefault = 1.01;
let durationDefaultFaster = 1.2;

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
	ScrollTrigger.refresh();
}

function initSplitText() {
	var splitTextLines = new SplitText(".split-lines.not-split", {type: "lines", linesClass: "single-line"});
	$('.split-lines.not-split .single-line').wrapInner('<div class="single-line-inner">');
	$(splitTextLines.elements).each(function(){
		$(this).removeClass('not-split');
	}); 
}

document.querySelectorAll('.header-1, .header-2, .header-3, .header-4').forEach(header => {
	if (header) {
		header.innerHTML = header.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
	}
});

if (document.querySelector('.animate-scroll-group')) {
	$('.animate-scroll-group').each(function () {
		let triggerElement = $(this);
		let headerLetters = triggerElement.find('.header-1 .letter, .header-2 .letter, .header-3 .letter, .header-4 .letter');
		let targetElementLines = triggerElement.find('.single-line-inner');
		let targetElementFade = triggerElement.find('.fade-in');
		let targetElementButton = triggerElement.find('.btn-animate-in .link');

		if (headerLetters.length) gsap.set(headerLetters, { autoAlpha: 0, y: 200 });
		if (targetElementLines.length) gsap.set(targetElementLines, { yPercent: 110 });
		if (targetElementFade.length) gsap.set(targetElementFade, { autoAlpha: 0, y: "2em" });
		if (targetElementButton.length) gsap.set(targetElementButton, { yPercent: 110 });

		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: triggerElement,
				start: "0% 80%",
				end: "100% 0%",
				toggleActions: "play none none reset"
			}
		});

		if (headerLetters.length) {
			tl.to(headerLetters, {
				y: 0,
				autoAlpha: 1,
				ease: "expo.out",
				duration: durationDefault,
				stagger: staggerDefault
			}, 0);
		}

		if (targetElementLines.length) {
			tl.to(targetElementLines, {
				yPercent: 0,
				rotate: 0.001,
				ease: "power2.out",
				duration: durationDefault,
				stagger: staggerDefault
			}, '+=0.2');
		}

		if (targetElementFade.length) {
			tl.to(targetElementFade, {
				y: 0,
				rotate: 0.001,
				autoAlpha: 1,
				ease: "expo.out",
				duration: durationDefault,
				stagger: staggerDefault
			}, '+=0.01');
		} 

		if (targetElementButton.length) {
			tl.to(targetElementButton, {
				yPercent: 0,
				rotate: 0.001,
				ease: "power2.out",
				duration: durationDefault,
				stagger: staggerDefault
			}, '+=0.2');
		}
	});
}

ScrollTrigger.matchMedia({
	"(min-width: 769px)": function() {
		var textWrapper = document.querySelector('.header-5');
		if (!textWrapper) return;

		textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
		let lastScrollY = window.scrollY;

		let observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				let currentScrollY = window.scrollY;
				let scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
				lastScrollY = currentScrollY;

				if (entry.isIntersecting && scrollDirection === "down") {
					textWrapper.style.opacity = "1";
					document.querySelectorAll('.header-5 .letter').forEach(letter => {
						letter.style.opacity = 0;
						letter.style.filter = "blur(10px)";
					});

					anime.timeline()
					.add({
						targets: '.header-5 .letter',
						translateX: [-50, 0],
						opacity: [0, 1],
						filter: ["blur(10px)", "blur(0px)"],
						easing: "easeOutExpo",
						duration: 3000,
						delay: (el, i) => 100 + 50 * i
					});
				}
			});
		}, { threshold: 0.5 });
		observer.observe(textWrapper);
	}
});

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
				ease: "power2.out",
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
				ease: "power2.out",
				duration: durationDefault
			 }, 0);
		}
	});
}

ScrollTrigger.create({
	trigger: ".re03_bg_n",
	start: "top 50%",
	onEnter: () => {
		setTimeout(() => {
			gsap.to(".re03_bg_n", {
				scale: 1,
				opacity: 1,
				duration: 1.2,
				ease: "power2.out"
			});
		}, 1000); 
	}
});

ScrollTrigger.create({
	trigger: ".re06_bg",
	start: "top 50%",
	onEnter: () => {
		setTimeout(() => {
			gsap.to(".re06_bg", {
				scale: 1,
				opacity: 1,
				duration: 1.2,
				ease: "power2.out"
			});
		}, 1000); 
	}
});