gsap.registerPlugin(ScrollTrigger);


var $animation_elements = $('.ani');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
 
  $.each($animation_elements, function() {
	var $element = $(this);
	var element_height = $element.outerHeight();
	var element_top_position = $element.offset().top;
	var element_bottom_position = (element_top_position + element_height);
 
	//check to see if this current container is within viewport
	if ((element_bottom_position >= window_top_position) &&
		(element_top_position <= window_bottom_position)) {
	  $element.addClass('in-view');
	} else {
	  //$element.removeClass('in-view');
	}
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

function wrapEachTextInSpan() {
	const targets = ['.text1', '.text2', '.text3'];

	targets.forEach(selector => {
		$(selector).each(function () {
			const text = $(this).text().trim();
			const wrapped = text
				.split('')
				.map(char => char === ' ' ? '&nbsp;' : `<span>${char}</span>`)
				.join('');
			$(this).html(wrapped);
		});
	});
}

function animateMainTitle() {
	const spans1 = $('.main_top_slider_text01 .text1 span');
	const spans2 = $('.main_top_slider_text01 .text2 span');
	const spans3 = $('.main_top_slider_text01 .text3 span');
	const bar = $('.main_top_slider_text01 .bar-text .bar-bg');

	const randomOrder1 = Array.from({ length: spans1.length }, (_, i) => i).sort(() => Math.random() - 0.25);
	const randomOrder2 = Array.from({ length: spans2.length }, (_, i) => i).sort(() => Math.random() - 0.25);
	const randomOrder3 = Array.from({ length: spans3.length }, (_, i) => i).sort(() => Math.random() - 0.25);

	randomOrder1.forEach((index, i) => {
		setTimeout(() => {
			$(spans1[index]).addClass('show');
		}, i * 50);
	});

	setTimeout(() => {
		bar.addClass('show');
	}, spans1.length * 50 + 200);

	randomOrder2.forEach((index, i) => {
		setTimeout(() => {
			$(spans2[index]).addClass('show');
		}, i * 50 + 700);
	});

	randomOrder3.forEach((index, i) => {
		setTimeout(() => {
			$(spans3[index]).addClass('show');
		}, i * 50 + 1200);
	});
}

$(document).ready(function () {
	wrapEachTextInSpan();
	animateMainTitle();
});



//re0555_cont swiper
window.addEventListener("DOMContentLoaded", () => {
	const re0555_cont = new Swiper('.re0555_cont', {
		slidesPerView:'auto',
		speed:2000,
		//centeredSlides: true,
		autoplay: {
		    delay: 2500,
		    disableOnInteraction: false,
		 },
		spaceBetween: 43,  
		observer: true,
		observeParents: true,  
		pagination: {
			el: ".swiper-pagination.main_space_pagination02",
			type: "progressbar",
		},
	});


	const re01_container_w = document.querySelector(".re0555_cont");

	function cursorChange(ele, cursorClass) {
	  ele.addEventListener("mouseenter", () => {
		document.body.classList.add("cursorNone");

		gsap.set(`.${cursorClass}`, {xPercent: -50, yPercent: -50, autoAlpha: 1});
		const cursorX = gsap.quickTo(`.${cursorClass}`, "x", { duration: 0.1 })
		const cursorY = gsap.quickTo(`.${cursorClass}`, "y", { duration: 0.1 })
		
		window.addEventListener("mousemove", e => {
		  cursorX(e.clientX);
		  cursorY(e.clientY);
		});

	  })

	  ele.addEventListener("mouseleave", () => {
		gsap.set(`.${cursorClass}`, {autoAlpha: 0});
	  })
	}
	cursorChange(re01_container_w, "re01_container_cursor");

})




ScrollTrigger.matchMedia({
	"(min-width: 769px)": function () {
		//re02 swiper
		const multiplier = {
			translate: .7,
			rotate: .0
		}
		const re03_container = new Swiper('.re03_container', {
			slidesPerView:'auto',
			centeredSlides: true,
			speed:2000,
			  loop: true,
			  loopAdditionalSlides: 6,
			autoplay: {
				delay: 3500,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".swiper-button-next.re02_next",
				prevEl: ".swiper-button-prev.re02_prev",
			},
			spaceBetween: 110,  
			observer: true,
			observeParents: true, 
			on: {
			slideChangeTransitionStart: function () {
			  const allSlides = document.querySelectorAll('.re03_container .swiper-slide');
			  allSlides.forEach(slide => {
				const bg = slide.querySelector('.sw_con_bg');
				if (bg) bg.classList.remove('bg-animate');
			  });
			  const activeSlide = this.slides[this.activeIndex];
			  const activeBg = activeSlide.querySelector('.sw_con_bg');
			  if (activeBg) {
				void activeBg.offsetWidth;
				activeBg.classList.add('bg-animate');
			  }
			}
		  }
		});
		function calculateWheel() {
			const slides = document.querySelectorAll('.re02_slide')
			slides.forEach((slide, i) => {
				const rect = slide.getBoundingClientRect()
				const r = window.innerWidth * .5 - (rect.x + rect.width * .5)
				let ty = Math.abs(r) * multiplier.translate - rect.width * multiplier.translate

				if (ty < 0) {
					ty = 0
				}
				const transformOrigin = r < 0 ? 'left top' : 'right top'
				slide.style.transform = `translate(0, ${ty}px) rotate(${-r * multiplier.rotate}deg)`
				slide.style.transformOrigin = transformOrigin
			})
		}

		function raf() {
			requestAnimationFrame(raf)
			calculateWheel()
		}

		raf();

	},
	"(max-width:768px)": function () {
		//re01 swiper

		const re01_container = new Swiper('.re01_container', {
			slidesPerView:'auto',
			speed:2000,
			centeredSlides: true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			 },
			//spaceBetween: 15,  
			observer: true,
			observeParents: true,  
			pagination: {
				el: ".swiper-pagination.main_space_pagination02",
				type: "progressbar",
			},
		});


	}


});


const re03_container_m = new Swiper('.re03_container_m', {
	slidesPerView:'auto',
	centeredSlides: true,
	speed:2000,
	loop: true,
	loopAdditionalSlides: 6,
	autoplay: {
		delay: 3500,
		disableOnInteraction: false,
	},
	navigation: {
		nextEl: ".swiper-button-next.re02_next",
		prevEl: ".swiper-button-prev.re02_prev",
	},
	spaceBetween: 110,  
	observer: true,
	observeParents: true, 
});

//sw_vic
var sw_vic = new Swiper('.swiper-container.sw_vic', {
	direction: 'vertical',
	slidesPerView: 1,
	speed: 2000,
	loop: true,
	loopAdditionalSlides: 1,
	autoplay: {
		delay: 4500,
		disableOnInteraction: false,
	},
	slidesPerGroup: 1,
	loopFillGroupWithBlank: true,
});
window.addEventListener("resize", () => {
  ScrollTrigger.refresh(true);
  ScrollTrigger.update;
})


	var swiperTopNum = $('.re06_cont').find('.swiper-slide');

	var re05_cont_m = new Swiper('.re06_cont', {
	  slidesPerView: "1.2",
	   spaceBetween: 5,
	  centeredSlides: true,
	speed: 1000,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".main_sect3_swiper_scrollbar",
        type: "progressbar",
      },
	  loop: true,
	  loopedSlides: swiperTopNum.length,
		breakpoints: {
			768: {
				spaceBetween: 20,
			},
		},
	});








const re05_container = new Swiper('.re05_container', {
	slidesPerView:'auto',
	speed:2000,
	//centeredSlides: true,
	autoplay: {
	   delay: 2500,
	 disableOnInteraction: false,
	 },
	//spaceBetween: 15,  
	observer: true,
	observeParents: true,  
	pagination: {
		el: ".swiper-pagination.main_space_pagination05",
		type: "progressbar",
	},
});














/*
const progressbar = document.querySelector(".autoplay-progress div");
const visualSwiperToggleBtn = document.querySelector(".visual_swiper_toggleBtn");
const mainVisualSlider = new Swiper(".main_visual_Swiper", {
  spaceBetween: 30,
  slidesPerView: 1,
  centeredSlides: true,
  effect: "fade",
  loop: true,
  autoplay: {
    delay: 2200,
    disableOnInteraction: false
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressbar.style.setProperty("--progress", 1 - progress);
    }
  }
});

visualSwiperToggleBtn.addEventListener("click", () => {
  if(visualSwiperToggleBtn.classList.contains("play")) {
    visualSwiperToggleBtn.classList.remove("play");
    mainVisualSlider.autoplay.stop();
  } else {
    visualSwiperToggleBtn.classList.add("play");
    mainVisualSlider.autoplay.start();
  }
})

document.querySelectorAll('.main_sect5-slide').forEach(slide => {
  const text = slide.getAttribute('data-text');
  if (text) {
    const spannedText = [...text].map((char, idx) => {
      const delay = (idx + 1) * 0.1; 
      return `<span class="txt${idx}" style="transition-delay: ${delay}s;">${char}</span>`;
    }).join('');
    slide.innerHTML = spannedText;
  }
});

const mainSect5Slider = new Swiper(".main_sect5_slider", {
  direction: "vertical",
  slidesPerView: 1,
  spaceBetween: 50,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  loop: true,
  speed: 1000,
});

const panel = document.querySelectorAll(".main_sect3 .panel");
panel.forEach(item => {
  item.addEventListener("mouseenter", (e) => {
    e.target.classList.add("on");
  })
  item.addEventListener("mouseleave", (e) => {
    e.target.classList.remove("on");
  })
})
*/