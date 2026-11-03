gsap.registerPlugin(ScrollTrigger);

var clickEvent_2 = (function () {
	if ('ontouchstart' in document.documentElement === true) {
		return 'touchstart';
	} else {
		return 'click';
	}
})(); // 클릭이벤트와 터치이벤트 토글








ScrollTrigger.matchMedia({
    
	// desktop
	"(min-width: 769px)": function () {
    
			// setup animations and ScrollTriggers for screens over 800px wide (desktop) here...
			// ScrollTriggers will be reverted/killed when the media query doesn't match anymore.
		// 기존 설정
		/*ScrollTrigger.create({
			trigger: '#main_cont_wrap02',
			start: '-60px top',
			end: 'bottom 60px',
			toggleClass: {className: 'main_cont02', targets: '#quick'},
		});*/
		gsap.set('.main_top_cont', { height: '100vh' });

		gsap.fromTo('.main_top_cont', {
		  yPercent: 0,
		  scrollTrigger: {
			trigger: '.main_top_cont',
			start: 'top top',
			end: () => `+=${document.querySelector('.main_top_cont').offsetHeight}`,
			markers: false,
			pin: true,
			pinSpacing: false,
			scrub: 3,
			defaults: {
			  ease: 'power1.inOut',
			  duration: 1,
			  transformOrigin: '0 0'
			},
		  },
		}, {
		  immediateRender: false,
		  duration: 1.5,
		  yPercent: 0,
		});

		//메인 리프팅사진 퍼지는 영역
		setTimeout(function () {

			const mobileSize = window.matchMedia("(max-width: 768px)");

			let partnerGsap = gsap.timeline({
				scrollTrigger: {
					trigger: ".partner_sect .img_wrap",
					start: mobileSize.matches ? "top-=20% top" : "top-=20% top",
					end: "+=100%", // 스크롤이 100% 진행될 때까지 고정
					scrub: 1,
					pin: true, 
					markers: false,
					onEnter: () => {
						$(".partner_sect .img_wrap").addClass("active");
						$(".partner_sect .sect_tit_box").addClass("active");
					},
					onLeaveBack: () => {
						$(".partner_sect .cont_wrap").removeClass("active");
						$(".partner_sect .cont_wrap").addClass("hide");
					}
				}
			});
			//partnerGsap.to(".bg_img img", { scale: 1, duration: 1, ease: "power2.out" });
			partnerGsap.to(".bg_img iframe", { scale: 1, duration: 1, ease: "power2.out" });
			partnerGsap.to(".bg_img", { scale: 1, duration: 1 }, "0");
			partnerGsap.to(".partner_sect .back_color", { opacity: 1, duration: 1 }, "0");







			function contObserver(selector, num, type, target2) {

				const observer = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						const $target = entry.target;
						const isIntersecting = entry.isIntersecting;

						if (isIntersecting) {
							if (target2) $(target2).addClass("active");
							$($target).addClass("active");

							if (type) {
								setTimeout(() => $($target).addClass("ani_end"), 1500);
							}else {
								setTimeout(() => $($target).addClass("ani_end"), 1500);
							}
						}else if (type) {
							$($target).removeClass("active");
						}
					});
				}, {threshold: num});

				document.querySelectorAll(selector).forEach((item) => {
					observer.observe(item);
				});
			}

			contObserver('.cham_sect .cont_box ', 0.5, false);
			contObserver('.sect_tit_box ', 0.7, false);
			contObserver('.special_sect .cont_box', 0.7, false);
			contObserver('.review_sect ', 0.3, false);
			contObserver('.team_sect .img', 0.5, false);
			contObserver('.always_sect .txt_cont ', 0.5, false);
			contObserver('.always_sect .cont_move_box', 0.7, false);
			contObserver('.partner_sect .img_wrap ', 0.5, false);

		});

		let slides = document.querySelectorAll(".slide0");
		let progressBar = document.querySelector(".scrollbar-progress");

		slides.forEach((slide, index) => {
			gsap.set(slide, {
				x: "0%",
				scale: 0.8,
				opacity: 0.5,
				filter: "blur(3px)",
				position: "absolute"
			});

			gsap.to(slide, {
				x: `${(index - slides.length / 2) * 420}px`,
				scale: 1,
				opacity: 1,
				filter: "blur(0px)",
				duration: 3,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".re03_cont",
					start: "top center",
					end: "bottom center",
					toggleActions: "play none none none",
					scrub: 2,
				}
			});
		});

		gsap.to(".horizontal-scroll-container", {
			scrollTrigger: {
				trigger: ".rection04",
				start: "top top",
				end: "+=3000", // 스크롤 길이 조절
				scrub: 3,
				pin: true, 
				//pinReparent: true, 
				anticipatePin: 1,
				onUpdate: (self) => {
					let progress = self.progress * 100; // 0 ~ 100%
					progressBar.style.width = progress + "%";
				}
			},
			xPercent: -80, 
			ease: "none",
			duration: 5, // 스크롤 속도 조절
		}); 

		$(document).on("mousemove", function (e) {
		  mouseX = e.clientX;
		  mouseY = e.clientY;
		});
		$(".re06_cont").on("mouseenter", function () {
		  slide_lr02.addClass("active");
		});
		$(".re06_cont").on("mouseleave", function () {
		  slide_lr02.removeClass("active");
		});
		var slide_lr02 = $(".cursor_slide_lr02");
		var posX = 0,
			posY = 0;
		var mouseX = 0,
			mouseY = 0;
		TweenMax.to({}, 0.016, {
		  repeat: -1,
		  onRepeat: function () {
			posX += (mouseX - posX) / 4;
			posY += (mouseY - posY) / 4;

			let dist = Math.hypot(mouseX - posX, mouseY - posY);
			let scale = 1 + Math.min(dist / 200, 0.3);
			let angle = (mouseX - posX) * 0.2;

			TweenMax.to(slide_lr02, 0.2, {
			  css: {
				left: posX - 55,
				top: posY - 35,
				scale: scale,
				rotation: angle,
				ease: Power2.easeOut
			  }
			});
		  }
		});
		//re05_cont
		$(function () {
			const multiplier = 0.1;

			const re05_cont = new Swiper('.swiper-container.re05_cont', {
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
					el: '.re05_swiper-scrollbar',
					draggable: true,
				},
				on: {
					slideChangeTransitionStart: function () {
						applySlideEffect();
						this.autoplay.start(); // autoplay 재시작
					}
				}

			});

			const slideYMap = new WeakMap();

			function calculateWheel() {
				const slides = document.querySelectorAll('.re05_slide');
				const center = window.innerWidth / 2;

				slides.forEach((slide) => {
					const rect = slide.getBoundingClientRect();
					const slideCenter = rect.left + rect.width / 2;
					const diff = center - slideCenter;
					let ty = Math.abs(diff) * multiplier - 40;
					if (ty < 0) ty = 0;

					if (!slideYMap.has(slide)) {
						slideYMap.set(slide, gsap.quickTo(slide, "y", { duration: 0.8, ease: "power2.out" }));
					}
					slideYMap.get(slide)(ty);
				});
			}


			function raf() {
				requestAnimationFrame(raf);
				calculateWheel();
			}
			raf();

			function applySlideEffect() {
				const slides = document.querySelectorAll('.re05_slide');
				
				slides.forEach((slide) => {
					const isActive = slide.classList.contains('swiper-slide-active');

					if (isActive) {
						gsap.to(slide, {
							//width: "939px",
							scaleX:"2.8",
							scaleY:"1.25",
							duration: 0.8,
							x: 0,
							delay: 1,
							ease: "power3.out",
							zIndex: 5,
							boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
							//onUpdate: () => {
							//	re05_cont.update(); 
							//}

						});
					} else {
						gsap.to(slide, {
							//width: "335px",
							scaleX:"1",
							scaleY:"1",
							//scale:"1",
							duration: 0.8,
							delay: 0,
							x: 0,
							ease: "power2.out",
							zIndex: 2,
							boxShadow: "none"
						});
					}

				});
			}


			applySlideEffect();
		});
		//header 
		/*$(window).scroll(function (x) {
			scroll_head = parseInt($(this).scrollTop());
			if(scroll_head > 1000){
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
    
	// mobile
	"(max-width:768px)": function () {
		// Any ScrollTriggers created inside these functions are segregated and get
		// reverted/killed when the media query doesn't match anymore.



        // gnb
        const menuItem = document.querySelectorAll('.gnb-menu-depth1');

        function addClass(elem,className){
          let max = elem.length;
          for(let i=0;i<max; i++){
            elem[i].classList.add(className);
          }
        }
        function removeClass(elem,className){
          let max = elem.length;
          for(let i=0;i<max; i++){
            elem[i].classList.remove(className);
          }
        }
        menuItem.forEach(menu =>{menu.addEventListener(clickEvent_2,function(e){
          this.tg = e.target;
          this.menuList = this.tg.parentNode;

          if(this.tg.nextElementSibling.classList.contains('gnb-menu-depth2')) {
            e.preventDefault();
            if(this.menuList.classList.contains('active')){
              //클릭한 메뉴에 active가 있을때
              removeClass(menuItem,'on');
              this.menuList.classList.remove('active');
              gsap.fromTo(this.menuList,{
                  height: (this.tg.offsetHeight + this.tg.nextElementSibling.offsetHeight) + 1,
                },
                {
                  height: this.tg.offsetHeight,
                  duration: .7
                });
            } else if(!this.menuList.classList.contains('on')){
              //내가 클릭한 메뉴에 on이 없을때 active가 없을때
              removeClass(menuItem,'on');
              this.menuList.classList.add('on');
              // gsap.to(menuItem,
              //   {
              //     height: this.tg.offsetHeight,
              //     duration: .7,
              //     onStart:()=>{removeClass(menuItem,'active');}
              //   });
              menuItem.forEach((el,index)=>{
                  gsap.to(el, {
                    height: this.tg.offsetHeight,
                    duration: .4
                  });
                });
              gsap.to(this.menuList,
                {
                  height: (this.tg.offsetHeight + this.tg.nextElementSibling.offsetHeight) + 1,
                  duration: .7
                });
            } else{
              //클릭한 메뉴에 이미 on이 있을때
              this.menuList.classList.remove('on');
              gsap.to(this.menuList,
                {
                  height: this.tg.offsetHeight,
                  duration: .7
                });
            }

          }
        })});
        
        
        
	},
    
	// mobile
	"(max-width:480px)": function () {
		// Any ScrollTriggers created inside these functions are segregated and get
		// reverted/killed when the media query doesn't match anymore.
        
        
        
        
        
	},
    
	// mobile
	"(max-width:434px)": function () {
		// Any ScrollTriggers created inside these functions are segregated and get
		// reverted/killed when the media query doesn't match anymore.
        
        
        
        
        
	},
    
	// mobile
	"(max-width:400px)": function () {
		// Any ScrollTriggers created inside these functions are segregated and get
		// reverted/killed when the media query doesn't match anymore.
        
        
        
        
        
	},
    // mobile
	"(max-height:700px)": function () {
		// Any ScrollTriggers created inside these functions are segregated and get
		// reverted/killed when the media query doesn't match anymore.
        
        
        
        
        
	},
    // mobile
	"(max-height:600px)": function () {
		// Any ScrollTriggers created inside these functions are segregated and get
		// reverted/killed when the media query doesn't match anymore.
        
        
        
        
	},
    
	// all 
	"all": function () {
        const revealAni = document.getElementsByClassName("gs_reveal");
        if(revealAni){
          gsap.utils.toArray(revealAni).forEach(function(elem, index){
            gsap.set(elem, {autoAlpha: 0}); // assure that the element is hidden when scrolled into view
            const getDelay = elem.getAttribute('data-gs-delay');

            var x = 0,
              y = 80,
              z = -100;

            if (elem.classList.contains('reveal_fromDown')) {
              y = -80
            } else if(elem.classList.contains("reveal_fromUp")){
              y = 80;
            } else if (elem.classList.contains("reveal_fromRight")) {
              x = 300;
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
                start: 'top 70%',
                end: 99999,
                //onEnter:()=>elem.classList.add('active'),
                toggleClass: {className: 'active', targets: '.gs_reveal'}
                //toggleClass: {className: 'waypoint', targets: '.main-header, #gnb'}
                //markers:true
              },
              duration: 1.8,
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
       // progress
      /* window.addEventListener('scroll', setScrollValue, false);
       window.addEventListener('resize', setScrollValue, false);

        function setScrollValue() {  
            var percent = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
            $('.progress-num').text(Math.round(percent * 100) + '%');
            $('.progress-bg').css({
                'transform': 'rotate(' + (percent * 360) + 'deg)',
                '-moz-transform': 'rotate(' + (percent * 360) + 'deg)',
                '-ms-transform': 'rotate(' + (percent * 360) + 'deg)',
                '-o-transform:rotate': 'rotate(' + (percent * 360) + 'deg)'
            });
        }
        
        const progress_area = document.getElementById('content');
        ScrollTrigger.create({
          trigger: progress_area,
          start: 'top top',
          end: 99999,
          toggleClass: {className: 'on', targets: '.progress-area'}
        });*/
        window.addEventListener('scroll', setScrollValue, false);
        window.addEventListener('resize', setScrollValue, false);

        function setScrollValue() {
            var percent = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
            var cellsToFill = Math.round(percent * 13);

            //document.querySelector('.progress-num').innerText = Math.round(percent * 100) + '%';

            var cells = document.querySelectorAll('.progress-cell');
            $('.progress-bg').css({
                'transform': 'rotate(' + (percent * 360) + 'deg)',
                '-moz-transform': 'rotate(' + (percent * 360) + 'deg)',
                '-ms-transform': 'rotate(' + (percent * 360) + 'deg)',
                '-o-transform:rotate': 'rotate(' + (percent * 360) + 'deg)'
            });
            cells.forEach(function(cell, index) {
                if (index < cellsToFill) {
                    cell.classList.add('filled');
                } else {
                    cell.classList.remove('filled');
                }
            });
        }

        const progress_area = document.getElementById('content');
        ScrollTrigger.create({
            trigger: progress_area,
            start: 'top top',
            end: 99999,
            toggleClass: { className: 'on', targets: '.progress-area' }
        });

       
		// 빠른상담
		/*const counsel_call_btn = document.getElementById('counsel--call-btn');
		const quick_counselling = document.getElementById('quick_counselling');
		const counsel_from = function(e){
			quick_counselling.classList.toggle('opened');
		}
		counsel_call_btn.addEventListener(clickEvent, counsel_from);*/

		/*const cntStart = document.getElementById('con_wrap');
		ScrollTrigger.create({
			trigger:cntStart,
			start: '20% top',
			end: 99999,
			scroller: ".smooth-scroll",
			toggleClass: {className: 'scrolled', targets: '#quick'}
		});*/
		

        // quick
	/*	const cntStart = document.getElementById('con_wrap');


        ScrollTrigger.create({
			trigger:cntStart,
			start: '20% top',
			end: 99999,
			scroller: ".smooth-scroll",
			onEnter: () => {
                tooltipMenu.classList.add('is-active');
				tooltipQuick.classList.add('on');
            },
            onLeaveBack: () => {
                tooltipMenu.classList.remove('is-active');
				tooltipQuick.classList.remove('on');
            }
		});
*/

	  /*document.addEventListener('DOMContentLoaded', function() {
		  const cntStart = document.getElementById('all_wrapper');
		  const tooltipMenu = document.querySelector('.quick-wrap');
		  const tooltipQuick = document.querySelector('#quick');


			ScrollTrigger.create({
			  trigger: cntStart,
			  start: '0% top',
			  end: 99999,
			  scroller: ".smooth-scroll",
			  onEnter: () => {
				tooltipMenu.classList.add('is-active');
				tooltipQuick.classList.add('on');
			  },
			  onLeaveBack: () => {
				tooltipMenu.classList.remove('is-active');
				tooltipQuick.classList.remove('on');
			  }
			});

		});*/
	}
  
});




// ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
 ScrollTrigger.refresh();