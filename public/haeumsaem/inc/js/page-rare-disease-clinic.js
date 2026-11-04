setTimeout(function(){
        $(".ms-preloader").animate({"opacity": "0"}, 1200, "easeInOutCubic", function () {
            $(".ms-preloader").css("visibility", "hidden");
        });
    },550);

	
	$('.btn-share').click(function(){
		$('.share-li').stop().fadeToggle(200);
		$('.share-box').toggleClass('on');
		return false; 
	 });

	$(document).click(function(e){
		if(!$('.share-li').is(e.target) && $('.share-li').has(e.target).length === 0){
			$('.share-li').stop().fadeOut();
			$('.share-box').removeClass('on');
		}
	});

	$('.btn-hbg').click(function(){
		$('#header').toggleClass('on');
		$('body').toggleClass('overflow');
        

        
	});
	$(window).resize(function(){
		if(window.innerWidth > 1200){
			$('#header').removeClass('on');
			$('body').removeClass('overflow');
           
		}
	});

    $(document).on('click', '.modal', function(e) {
        if (!$(e.target).closest('.modal-wrap').length) {
            $('body').css('overflow', 'visible');
            $('.modal').css('display', 'none');
            $('.modal-backdrop').remove();
        }
    });

    $(document).on('touchstart', function(e) {

        if($('#header').hasClass('on') && 
        !$(e.target).closest('nav').length && 
        !$(e.target).closest('.btn-hbg').length) {
            $('#header').removeClass('on');
            $('body').removeClass('overflow');
        }
    });

    $(document).on('click', function(e) {
        if($('#header').hasClass('on') && 
        !$(e.target).closest('nav').length && 
        !$(e.target).closest('.btn-hbg').length) {
            $('#header').removeClass('on');
            $('body').removeClass('overflow');
        }
    });


document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){$('.modal').hide();$('.modal-backdrop').remove();$('body').css('overflow','');$('#header').removeClass('on');}
});



        $('#allAgree').on('change', function() {
            var isChecked = $(this).is(':checked');
            $('.checkbox-agree').prop('checked', isChecked);
        });

        $('.checkbox-agree').on('change', function() {
            var allChecked = $('.checkbox-agree').length === $('.checkbox-agree:checked').length;
            $('#allAgree').prop('checked', allChecked);
        });
    


            $(document).on('change','.select_nav',function(){
                if($(this).val() != '') {
                    location.href=$(this).val();
                }
            })
        





    let tabSlide;
    function initializeSwiper() {
        if (window.innerWidth <= 768) {
            if (!tabSlide) {
                tabSlide = new Swiper('.tabs .swiper-container', {
                    slidesPerView: 'auto',
                    initialSlide: 0,
                    freeMode: true,
                    observer: true,
                    observeParents: true,
                });
            }
        } else {
            if (tabSlide) {
                tabSlide.destroy(true, true);
                tabSlide = undefined;
            }
        }
    }

    window.addEventListener('load', initializeSwiper);

    window.addEventListener('resize', initializeSwiper);


    function contObserver(selector, num, type, moChk, slide) {

        if (window.innerWidth < 768) {
            if (moChk) {
                num = moChk
            }
        }


        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const $target = entry.target;
                const isIntersecting = entry.isIntersecting;

                if (isIntersecting) {
                    $($target).addClass("active");
                    if (slide) {
                        slide.autoplay.start();
                    }

                } else if (type) {
                    $($target).removeClass("active");
                }
            });
        }, { threshold: num });

        document.querySelectorAll(selector).forEach((item) => {
            observer.observe(item);
        });
    }


    const graphWrap = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting && !$target.classList.contains("active")) {
                $target.classList.add("active");
                counterAnim(".main_num_cont11 .cont_wrap .num_cont_box .right_box .cont:nth-child(1) .num_txt .num", 0, 60, 1000 , 800);
                counterAnim(".main_num_cont11 .cont_wrap .num_cont_box .right_box .cont:nth-child(2) .num_txt .num", 0, 1.8, 1000 , 1000);
                counterAnim(".main_num_cont11 .cont_wrap .num_cont_box .right_box .cont:nth-child(3) .num_txt .num", 0, 19, 1000 , 1200);

            }
        });
    }, { threshold: .4 });

    const graphWrapItems = document.querySelectorAll(".main_num_cont11 .cont_wrap .num_cont_box .right_box .cont .num_txt")
    graphWrapItems.forEach((item) => {
        graphWrap.observe(item);
    });

    const counterAnim = (qSelector, start = 0, end, duration = 1000, delay = 0) => {
        const target = document.querySelector(qSelector);
        let startTimestamp = null;

        const decimalPlaces = Number.isInteger(end) ? 0 : 1; // 정수일 경우 0, 소수일 경우 2

        const easeInQuad = (t) => {

            return t * t;
        };

        const addCommas = (num) => {
            return num.toString().replace(/B(?=(d{3})+(?!d))/g, ",");
        };

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;

            const elapsed = timestamp - startTimestamp;

            if (elapsed >= delay) {
                const progress = Math.min((elapsed - delay) / duration, 1);
                const easedProgress = easeInQuad(progress); // ease-in 함수 적용
                const value = start + easedProgress * (end - start);
                target.innerText = addCommas(value.toFixed(decimalPlaces)); // 소수점 이하 자릿수를 표시
            }

            if (elapsed - delay < duration) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    };




    $(document).ready(function () {




        const subContProcess03 = gsap.timeline({
            scrollTrigger: {
                trigger: ".sub_cont_process03",
                start: "top center",
                end: "bottom center",
                scrub: 0.5,
                markers: false,
                anticipatePin: 1
            }
        });

            subContProcess03
            .to(".sub_cont_process03 .cont_box .right_box .line", { height: "calc(100% + 5rem)" , ease:"none"})



        contObserver('.main_num_cont11', 0.4, false, 0.1);
        contObserver('.sub_cont_sorting03 .cont_box .cont', 0.2, false, 0.1);




        var contBasicSlide10Swiper  = new Swiper ('.cont_basic_slide10 .swiper-container', {
            speed : 1000,
            slidesPerView: "auto",
            spaceBetween: 20,
            loop: true,
            loopAdditionalSlides: 1,
            autoplay: {
                delay: 3000, // 3초마다 다음 슬라이드
                disableOnInteraction: false, // 사용자 조작 후에도 자동재생 유지
                pauseOnMouseEnter: true, // 마우스를 올리면 일시정지
            },
            breakpoints: {

                600: {
                    spaceBetween: 20
                },
                0: {
                    spaceBetween: 15
                },
            }
        })



    })

