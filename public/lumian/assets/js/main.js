"use strict";

// VISUAL - 로드 인트로 + 슬라이드 텍스트/영상
(function () {
	var visual = document.querySelector('.sc_visual');
	if (!visual || typeof Swiper === 'undefined') return;

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var hasGsap = typeof gsap !== 'undefined';
	var introDone = false;

	// 현재 활성 슬라이드 안의 영상(없으면 null)
	function getActiveVideo(swiper) {
		if (!swiper || !swiper.slides || !swiper.slides.length) return null;
		var activeSlide = swiper.slides[swiper.activeIndex];
		return activeSlide ? activeSlide.querySelector('video.sc_visual_video') : null;
	}

	function startAutoplay(swiper) {
		if (!swiper.autoplay || swiper.autoplay.running) return;
		swiper.autoplay.start();
	}

	function stopAutoplay(swiper) {
		if (!swiper.autoplay || !swiper.autoplay.running) return;
		swiper.autoplay.stop();
	}

	function playActiveVideo(swiper) {
		var videos = visual.querySelectorAll('video.sc_visual_video');

		// 모든 영상 초기화
		videos.forEach(function (video) {
			video.pause();
			video.currentTime = 0;
			video.onended = null;
		});

		var activeVideo = getActiveVideo(swiper);

		// 영상이 없는 슬라이드는 기존 autoplay 사용
		if (!activeVideo) {
			startAutoplay(swiper);
			return;
		}

		// 영상이 있는 슬라이드는 autoplay 정지 (영상이 끝날 때까지 대기)
		stopAutoplay(swiper);

		// 영상이 끝나면 다음 슬라이드
		activeVideo.onended = function () {
			swiper.slideNext();
		};

		// 영상 재생
		var playPromise = activeVideo.play();

		if (playPromise && typeof playPromise.catch === 'function') {
			// 브라우저가 자동재생을 막으면 onended가 오지 않아 슬라이드가 멈춘다.
			// 이 경우에만 autoplay로 되돌린다.
			playPromise.catch(function () {
				if (getActiveVideo(swiper) !== activeVideo) return;
				startAutoplay(swiper);
			});
		}
	}

	function getSlideText(slide) {
		if (!slide) return { titles: [], desc: [], media: [] };
		return {
			titles: slide.querySelectorAll('.title_wrap .title'),
			desc: slide.querySelectorAll('.desc_wrap'),
			media: slide.querySelectorAll('.media img, .media video'),
		};
	}

	function hideSlideText(slide) {
		if (!hasGsap) return;
		var els = getSlideText(slide);
		if (els.titles.length) {
			gsap.killTweensOf(els.titles);
			gsap.set(els.titles, { y: 50, autoAlpha: 0 });
		}
		if (els.desc.length) {
			gsap.killTweensOf(els.desc);
			gsap.set(els.desc, { y: 40, autoAlpha: 0 });
		}
	}

	function showSlideText(slide) {
		if (!hasGsap) return;
		var els = getSlideText(slide);
		if (els.titles.length) gsap.set(els.titles, { y: 0, autoAlpha: 1 });
		if (els.desc.length) gsap.set(els.desc, { y: 0, autoAlpha: 1 });
	}

	function hideAllSlideText(swiper) {
		swiper.slides.forEach(function (slide) {
			hideSlideText(slide);
		});
	}

	function animateSlideText(swiper) {
		if (!hasGsap || !introDone) return;

		var slide = swiper.slides[swiper.activeIndex];
		var els = getSlideText(slide);
		if (!els.titles.length && !els.desc.length) return;

		if (reduceMotion) {
			showSlideText(slide);
			return;
		}

		gsap.killTweensOf(els.titles);
		gsap.killTweensOf(els.desc);

		var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
		if (els.titles.length) {
			tl.fromTo(
				els.titles,
				{ y: 50, autoAlpha: 0 },
				{ y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.3 },
				0
			);
		}
		if (els.desc.length) {
			tl.fromTo(
				els.desc,
				{ y: 40, autoAlpha: 0 },
				{ y: 0, autoAlpha: 1, duration: 0.8 },
				0.35
			);
		}
	}

	function playLoadIntro(swiper) {
		if (!hasGsap) {
			introDone = true;
			return;
		}

		var slide = swiper.slides[swiper.activeIndex];
		var els = getSlideText(slide);
		var lineLeft = visual.querySelector('.visualLine_left');
		var lineRight = visual.querySelector('.visualLine_right');

		if (reduceMotion) {
			if (lineLeft) gsap.set(lineLeft, { scaleY: 1 });
			if (lineRight) gsap.set(lineRight, { scaleY: 1 });
			showSlideText(slide);
			if (els.media.length) gsap.set(els.media, { scale: 1 });
			introDone = true;
			return;
		}

		hideAllSlideText(swiper);

		if (lineLeft) gsap.set(lineLeft, { scaleY: 0, transformOrigin: 'top center' });
		if (lineRight) gsap.set(lineRight, { scaleY: 0, transformOrigin: 'bottom center' });
		if (els.media.length) gsap.set(els.media, { scale: 1.08, transformOrigin: 'center center' });

		var visualTl = gsap.timeline({
			defaults: { ease: 'power3.out' },
			onComplete: function () {
				introDone = true;
			},
		});

		if (els.media.length) {
			visualTl.to(els.media, { scale: 1, duration: 2 }, 0);
		}
		if (lineLeft) {
			visualTl.to(lineLeft, { scaleY: 1, duration: 0.9 }, 0.2);
		}
		if (lineRight) {
			visualTl.to(lineRight, { scaleY: 1, duration: 0.9 }, 0.35);
		}
		if (els.titles.length) {
			visualTl.to(els.titles, {
				y: 0,
				autoAlpha: 1,
				duration: 0.8,
				stagger: 0.15,
			}, 0.8);
		}
		if (els.desc.length) {
			visualTl.to(els.desc, {
				y: 0,
				autoAlpha: 1,
				duration: 0.8,
			}, 1.15);
		}
	}

	var visualSwiper = null;
	var bannerSwiper = null;
	var isSyncing = false;

	// 두 스와이퍼(메인 비주얼 / 하단 배너)를 realIndex 기준으로 동기화
	function syncSwiper(target, index) {
		if (!target || target.destroyed || isSyncing) return;
		if (target.realIndex === index) return;

		isSyncing = true;
		target.slideToLoop(index);
		isSyncing = false;
	}

	// 배너 조작으로 슬라이드가 바뀐 경우 메인 자동재생 타이머를 초기화.
	// 단, 영상 슬라이드는 playActiveVideo()가 이미 autoplay를 꺼두고 onended로 넘기므로
	// 여기서 다시 start()하면 영상이 끝나기 전에 슬라이드가 넘어간다.
	function resetVisualAutoplay() {
		if (!visualSwiper || !visualSwiper.autoplay) return;
		if (getActiveVideo(visualSwiper)) return;

		visualSwiper.autoplay.stop();
		visualSwiper.autoplay.start();
	}

	// 초기화 중 예외가 나면 main.js 전체 실행이 중단되어 아래 섹션(info1 등)까지 죽는다.
	// 비주얼 영역에서만 실패가 끝나도록 격리하고, 원인은 콘솔에 남긴다.
	try {
		bannerSwiper = new Swiper('.sc_visual .visualBanner_swiper', {
			loop: true,
			a11y: { slideRole: 'listitem' },
			effect: 'fade',
			fadeEffect: {
				crossFade: true,
			},
			speed: 500,
			navigation: {
				nextEl: '.sc_visual .visualBanner_btn--next',
				prevEl: '.sc_visual .visualBanner_btn--prev',
			},
			on: {
				init: function (swiper) {
					// Keep <li> slides as list items when Swiper adds its own ARIA role.
					swiper.slides.forEach(function (slide) {
						if (slide.tagName === 'LI') slide.setAttribute('role', 'listitem');
					});
				},
				slideChangeTransitionStart: function (swiper) {
					if (isSyncing) return;
					syncSwiper(visualSwiper, swiper.realIndex);
					resetVisualAutoplay();
				},
			},
		});

		visualSwiper = new Swiper('.sc_visual .group_visualSwiper .swiper', {
			loop: true,
			a11y: { slideRole: 'listitem' },
			effect: 'fade',
			fadeEffect: {
				crossFade: true,
			},
			speed: 800,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.sc_visual .group_visualSwiper .swiper_control',
				clickable: true,
				bulletClass: 'swiper_control_bullet',
				bulletActiveClass: 'is-active',
			},
			on: {
				init: function (swiper) {
					swiper.slides.forEach(function (slide) {
						if (slide.tagName === 'LI') slide.setAttribute('role', 'listitem');
					});
					playActiveVideo(swiper);
					playLoadIntro(swiper);
					syncSwiper(bannerSwiper, swiper.realIndex);
				},
				slideChangeTransitionStart: function (swiper) {
					playActiveVideo(swiper);
					syncSwiper(bannerSwiper, swiper.realIndex);
					if (!introDone) return;
					hideAllSlideText(swiper);
				},
				slideChangeTransitionEnd: function (swiper) {
					animateSlideText(swiper);
				},
			},
		});
	} catch (err) {
		console.error('visual swiper init failed:', err);
	}
})();

// The promotion dialog is part of the home page, not the visual hero. Its
// independent slider is initialized after the dialog markup is available.
(function initPromotionSlider() {
	function mount() {
		var el = document.querySelector('#iei-mdlx .iemdlx-swpx .swiper');
		if (!el || el.swiper || typeof Swiper === 'undefined') return;
		new Swiper(el, {
			loop: true,
			slidesPerView: 1,
			speed: 600,
			observer: true,
			observeParents: true,
			a11y: { slideRole: 'group' },
			navigation: {
				nextEl: '#iei-mdlx .swiper-button--next',
				prevEl: '#iei-mdlx .swiper-button--prev',
			},
			pagination: {
				el: '#iei-mdlx .iemdlx-swpx .swiper-pagination',
				clickable: true,
			},
		});
	}
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', mount, { once: true });
	} else {
		mount();
	}
})();

// INFO1 - swiper (desktop: 원형 / md↓: 일자 일반 스와이퍼)
function businessSwiper() {
	const el = document.querySelector(".s04_swiper");
	if (!el || typeof Swiper === "undefined") return;

	const fill = document.querySelector(".sc_info .progress .fill");
	const sliderWrap = el.closest(".slider");
	const wrapper = el.querySelector(".swiper-wrapper");
	if (!wrapper) return;

	const originalSlides = Array.prototype.slice.call(
		wrapper.querySelectorAll(":scope > .swiper-slide")
	);
	const total = originalSlides.length;
	if (!total) return;

	// 넓은 화면에서 loop가 깨지지 않도록 원본을 2회 복제 (총 3세트)
	// slidesPerView:"auto"는 대략 보이는 장수 × 2 이상이 필요
	for (let set = 0; set < 4; set++) {
		originalSlides.forEach(function (slide) {
			wrapper.appendChild(slide.cloneNode(true));
		});
	}

	const MOBILE_MAX = 768;

	function isMobile() {
		return window.innerWidth <= MOBILE_MAX;
	}

	function contentIndex(sw) {
		return ((sw.realIndex % total) + total) % total;
	}

	function syncMode(sw) {
		if (!sliderWrap) return;
		sliderWrap.classList.toggle("is-linear", isMobile());
		if (isMobile()) {
			clearCircularStyles(sw);
		} else {
			circularLayout(sw);
		}
	}

	function ensureAutoplay(sw) {
		if (!sw.autoplay) return;
		sw.allowSlideNext = true;
		sw.allowSlidePrev = true;
		if (!sw.autoplay.running) sw.autoplay.start();
	}

	const swiper = new Swiper(el, {
		loop: true,
		loopAdditionalSlides: total,
		initialSlide: 0,
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 1.4,
		spaceBetween: 16,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		breakpoints: {
			769: {
            slidePerView: 2,
				spaceBetween: 48,
			},
			1025: {
				spaceBetween: 64,
			},
			1201: {
				slidesPerView: "auto",
				spaceBetween: 88,
				centeredSlides: true,
			},
		},
		speed: 500,
		watchSlidesProgress: true,
		on: {
			init: function (sw) {
				sw.slideToLoop(0, 0);
			},
			slideChange: function (sw) {
				updateProgress(sw);
			},
			setTranslate: function (sw) {
				if (isMobile()) {
					clearCircularStyles(sw);
					return;
				}
				circularLayout(sw);
			},
			setTransition: function (sw, dur) {
				if (isMobile()) return;
				circularTransition(sw, dur);
			},
			breakpoint: function (sw) {
				syncMode(sw);
				ensureAutoplay(sw);
				updateProgress(sw);
			},
			resize: function (sw) {
				syncMode(sw);
				ensureAutoplay(sw);
				updateProgress(sw);

			},
		},
	});

	swiper.loopFix();
	swiper.slideToLoop(0, 0);
	syncMode(swiper);
	ensureAutoplay(swiper);
	updateProgress(swiper);

	// 텍스트 동기화용
	swiper.__infoTotal = total;
	swiper.__contentIndex = function () {
		return contentIndex(swiper);
	};

	function getCircularParams() {
		const w = window.innerWidth;
		if (w <= 1024) return { STEP: 22, Y_AT_ONE: 140 };
		if (w <= 1200) return { STEP: 22, Y_AT_ONE: 164 };
		return { STEP: 22, Y_AT_ONE: 200 };
	}

	function getProgressTrack() {
		const w = window.innerWidth;
		if (w <= 768) return Math.min(290, w * 0.7);
		if (w <= 1024) return 200;
		if (w <= 1200) return 240;
		return 290;
	}

	function clearCircularStyles(sw) {
		sw.slides.forEach(function (slide) {
			slide.style.transform = "";
			slide.style.opacity = "";
			slide.style.pointerEvents = "";
			slide.style.zIndex = "";
			slide.style.transitionDuration = "";
			slide.style.transitionProperty = "";
		});
	}

	function circularLayout(sw) {
		if (isMobile()) {
			clearCircularStyles(sw);
			return;
		}
		const params = getCircularParams();
		const STEP = params.STEP;
		const Y_AT_ONE = params.Y_AT_ONE;
		const MAX = 2;

		sw.slides.forEach(function (slide) {
			const p = Math.max(-MAX, Math.min(MAX, slide.progress));
			const abs = Math.abs(p);
			const t = Math.min(1, abs);
			const theta = -p * STEP;
			const y = abs <= 1 ? abs * Y_AT_ONE : Y_AT_ONE + (abs - 1) * Y_AT_ONE;
			const scale = 1 - t * 0.25;
			const opacity =
				abs <= 1
					? 1 - t * 0.8
					: Math.max(0, 0.2 * (2 - abs));

			slide.style.transform =
				"translateY(" + y + "px) rotate(" + theta + "deg) scale(" + scale + ")";
			slide.style.opacity = String(opacity);
			slide.style.pointerEvents = opacity < 0.05 ? "none" : "";
			slide.style.zIndex = abs < 0.5 ? "5" : abs <= 1.2 ? "2" : "1";
		});
	}

	function circularTransition(sw, dur) {
		if (isMobile()) return;
		sw.slides.forEach(function (slide) {
			slide.style.transitionProperty = "transform, opacity";
			slide.style.transitionDuration = dur + "ms";
		});
	}

	function updateProgress(sw) {
		const idx = contentIndex(sw);
		if (!fill) return;
		const TRACK = getProgressTrack();
		const MIN = TRACK * (68 / 290);
		if (total <= 1) {
			fill.style.width = TRACK + "px";
			return;
		}
		fill.style.width = MIN + (idx / (total - 1)) * (TRACK - MIN) + "px";
	}

	return swiper;
}

// INFO1 - REASON 텍스트 swiper (이미지 s04_swiper와 동기화, 기존 원형 swiper는 유지)
function businessTextSwiper(imageSwiper) {
	const el = document.querySelector(".s04_text_swiper");
	if (!el || typeof Swiper === "undefined") return null;

	// 이미지 swiper는 loop 안정화를 위해 원본을 여러 세트 복제해 realIndex가 원본 개수를 넘는다.
	// 텍스트는 원본 1세트뿐이므로 원본 개수로 나눈 나머지를 써야 한다. (Swiper 초기화 전에 계산)
	const total = el.querySelectorAll(".swiper-wrapper > .swiper-slide").length;

	const textSwiper = new Swiper(el, {
		loop: true,
		effect: "fade",
		fadeEffect: { crossFade: true },
		allowTouchMove: false,
		speed: 500,
	});

	if (imageSwiper) {
		imageSwiper.on("slideChange", function () {
			// 이미지 swiper가 노출하는 contentIndex를 우선 사용
			const idx =
				typeof imageSwiper.__contentIndex === "function"
					? imageSwiper.__contentIndex()
					: total
						? ((imageSwiper.realIndex % total) + total) % total
						: imageSwiper.realIndex;
			textSwiper.slideToLoop(idx);
		});
	}

	return textSwiper;
}

// INFO1 초기화
// 이미지 swiper가 실패해도 텍스트 swiper는 살아있도록 분리해서 초기화한다
var info1ImageSwiper = null;
try {
	info1ImageSwiper = businessSwiper();
} catch (err) {
	console.error("businessSwiper init failed:", err);
}
businessTextSwiper(info1ImageSwiper);

// CARE - sticky 스크롤 + 세로선
(function () {
	var section = document.querySelector('.sc_care');
	if (!section || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

	gsap.registerPlugin(ScrollTrigger);

	var track = section.querySelector('.care_track');
	var sticky = section.querySelector('.care_sticky');
	var items = gsap.utils.toArray('.sc_care .care_item');
	var lines = section.querySelectorAll('.careLine');
	var total = items.length;
	if (!total || !track || !sticky) return;

	var current = -1;

	// sticky 구간 높이 = 아이템 수 × 뷰포트
	track.style.height = total * 100 + 'vh';

	gsap.set(items, { autoAlpha: 0 });
	gsap.set(items[0], { autoAlpha: 1 });
	if (lines.length) gsap.set(lines, { scaleY: 0 });

	function setActive(index) {
		if (index === current) return;
		current = index;
		items.forEach(function (item, i) {
			item.classList.toggle('is-active', i === index);
			gsap.to(item, { autoAlpha: i === index ? 1 : 0, duration: 0.45, overwrite: 'auto' });
		});
	}

	function showLines() {
		if (!lines.length) return;
		gsap.to(lines, {
			scaleY: 1,
			duration: 1.4,
			ease: 'power2.inOut',
			stagger: 0.08,
			overwrite: 'auto',
		});
	}

	function hideLines() {
		if (!lines.length) return;
		gsap.to(lines, {
			scaleY: 0,
			duration: 1,
			ease: 'power2.inOut',
			stagger: 0.08,
			overwrite: 'auto',
		});
	}

	ScrollTrigger.create({
		trigger: track,
		start: 'top top',
		end: 'bottom bottom',
		scrub: true,
		onUpdate: function (self) {
			setActive(Math.min(total - 1, Math.floor(self.progress * total)));
			section.style.setProperty('--care-bg-y', self.progress * 100 + '%');
		},
	});

	ScrollTrigger.create({
		trigger: track,
		start: 'top 80%',
		onEnter: showLines,
		onLeaveBack: hideLines,
	});

	ScrollTrigger.create({
		trigger: track,
		start: 'bottom top',
		onEnter: hideLines,
		onLeaveBack: showLines,
	});

	setActive(0);
})();

// EVENT - 탭 + 라인 모션
(function () {
	var section = document.querySelector('.sc_event');
	if (!section) return;

	var MOBILE_MAX = 768;
	var tabs = section.querySelectorAll('.event_tab');
	var panels = section.querySelectorAll('.event_panel');
	var linesWrap = section.querySelector('.event_lines');
	var lines = section.querySelectorAll('.event_card_line');

	function isMobile() {
		return window.innerWidth <= MOBILE_MAX;
	}

	function activePanel() {
		return (
			section.querySelector('.event_panel.is-active') ||
			section.querySelector('.event_panel:not([hidden])') ||
			panels[0]
		);
	}

	// .event_card 경계에 세로선 고정 (카드 n개 → 선 n+1개)
	function syncLines() {
		if (!linesWrap || !lines.length) return;

		if (isMobile()) {
			lines.forEach(function (line) {
				line.style.left = '';
				line.style.display = '';
			});
			return;
		}

		var panel = activePanel();
		if (!panel) return;

		var cards = panel.querySelectorAll('.event_card');
		if (!cards.length) return;

		var hostLeft = linesWrap.getBoundingClientRect().left;
		var positions = [];

		cards.forEach(function (card, i) {
			var rect = card.getBoundingClientRect();
			positions.push(rect.left - hostLeft);
			if (i === cards.length - 1) {
				positions.push(rect.right - hostLeft - 1);
			}
		});

		lines.forEach(function (line, i) {
			if (i < positions.length) {
				line.style.display = '';
				line.style.left = positions[i] + 'px';
				line.style.right = 'auto';
			} else {
				line.style.display = 'none';
			}
		});
	}

	tabs.forEach(function (tab) {
		tab.addEventListener('click', function () {
			var name = tab.dataset.tab;
			tabs.forEach(function (t) {
				t.classList.toggle('is-active', t === tab);
			});
			panels.forEach(function (panel) {
				var on = panel.dataset.panel === name;
				panel.classList.toggle('is-active', on);
				panel.hidden = !on;
			});
			requestAnimationFrame(syncLines);
		});
	});

	var resizeTimer = null;
	window.addEventListener('resize', function () {
		window.clearTimeout(resizeTimer);
		resizeTimer = window.setTimeout(syncLines, 100);
	});

	syncLines();

	if (!lines.length || typeof gsap === 'undefined') return;

	function playLines() {
		if (isMobile()) return;
		syncLines();
		gsap.set(lines, { scaleY: 0 });
		gsap.to(lines, {
			scaleY: 1,
			duration: 1.4,
			ease: 'power2.inOut',
			stagger: 0.08,
		});
	}

	if (typeof IntersectionObserver === 'undefined') {
		playLines();
		return;
	}

	var played = false;
	new IntersectionObserver(
		function (entries) {
			if (!entries[0].isIntersecting) return;
			if (played || isMobile()) return;
			played = true;
			playLines();
		},
		{ threshold: 0.2 }
	).observe(section);
})();

// VALUE - 섹션 도달 시 카드 순차 등장 
(function () {
	var section = document.querySelector('.sc_value');
	if (!section) return;

	if (typeof IntersectionObserver === 'undefined') {
		section.classList.add('is-ready');
		return;
	}

	var observer = new IntersectionObserver(function (entries) {
		if (entries[0].isIntersecting) {
			section.classList.add('is-ready');
		} else {
			section.classList.remove('is-ready');
		}
	}, { threshold: 0.15, rootMargin: '120px 0px' });

	observer.observe(section);
})();

// MEDICAL COLUMN — 해시태그(#…) 단위 span 감싸기 (줄바꿈)
(function () {
	function wrapColumnCardCate() {
		document.querySelectorAll('.column_card_cate').forEach(function (el) {
			if (el.dataset.cateWrapped === '1') return;
			var text = (el.textContent || '').trim();
			if (text.indexOf('#') === -1) return;

			var tags = text.match(/#[^\s#]+(?:\s+[^\s#]+)*/gu);
			if (!tags || !tags.length) return;

			el.textContent = '';
			tags.forEach(function (tag, i) {
				if (i) el.appendChild(document.createTextNode(' '));
				var span = document.createElement('span');
				span.textContent = tag;
				el.appendChild(span);
			});
			el.dataset.cateWrapped = '1';
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', wrapColumnCardCate);
	} else {
		wrapColumnCardCate();
	}
})();
