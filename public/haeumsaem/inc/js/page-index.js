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


var players=[];


        $('#allAgree').on('change', function() {
            var isChecked = $(this).is(':checked');
            $('.checkbox-agree').prop('checked', isChecked);
        });

        $('.checkbox-agree').on('change', function() {
            var allChecked = $('.checkbox-agree').length === $('.checkbox-agree:checked').length;
            $('#allAgree').prop('checked', allChecked);
        });
    


    function resizeHandler() {
        var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (screenWidth < 1200) {

            $('.header .util_wrap .util_box .ico.ham_btn').click(function(){
                $('.header .nav').addClass('on');
                $('html').addClass('scroll_none')
            });

            $('.header nav .close_btn').click(function(){
                $('.header .nav').removeClass('on')
                $('html').removeClass('scroll_none');
                $('.header nav .depth1 li > a .depth2').slideUp(100);
            });
            $('.header nav .depth1 > li > a').off('click');
            $('.header nav .depth1 > li > a').on('click', function (event){
                var $depth2List = $(this).next('.depth2').find('li');
                if ($depth2List.length > 0) {
                    var $depth2 = $(this).siblings('.depth2');
                    $(this).parents('li').siblings().find('.depth2').slideUp(300);
                    $depth2.slideToggle(300);
                    return false
                }

            });
        } else {

            $('.header .nav').on('mouseenter', function(){
                $('.header').addClass('on');
                if($(this).length > 0){
                    $('.gnb_bg').fadeIn(200);

                }else{
                    $('.gnb_bg').fadeOut(200);
                }
            })
            $('.header .nav').on('mouseleave', function(){
                $('.header').removeClass('on');
            })
        }
    }

    window.addEventListener("resize", resizeHandler);
    resizeHandler();

    $('.header .util_wrap .util_box .ico.ham_btn').click(function(){
        $('.sitemap').addClass('on');
        $('html').addClass('scroll_none');
    });

    $('.sitemap .close_btn').click(function(){
        $('.sitemap').removeClass('on');
        $('html').removeClass('scroll_none');
    });

    var previousScroll;

    $(window).scroll(function () {
        if ($(window).width() >= 768) {
            var currentScroll = $(this).scrollTop();
            if (currentScroll > previousScroll) {
                $('.all_sch').removeClass('active');
            }
            previousScroll = currentScroll;
        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.quick_wrap').addClass('show')
        } else {
            $('.quick_wrap').removeClass('show');
        }
    });

    $('.share-btn').click(function () {
        if ($('.share_area').height() > 0) {
            $('.share_area').removeClass('on')
        } else {
            $('.search_form_wrap').removeClass("show");
            $('body').removeClass('fixed')
            $('.share_area').addClass('on')
        }
    })

    const ioVisual = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .2});

    const $itemsVisual = document.querySelectorAll(".visual_sect")
    $itemsVisual.forEach((item) => {
        ioVisual.observe(item);
    });

    let isPageLoaded = false;

    window.addEventListener('load', () => {
        isPageLoaded = true;
    });

    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".visual_sect .tit", {
        scrollTrigger: {
            trigger: '.visual_sect',
            start: window.innerWidth <= 768 ? "top-=50px top" : "top top",
            end: "-=80% bottom",
            scrub: 0.7,
            markers: false,

            onEnter: () => {
                if (isPageLoaded && window.innerWidth >= 769) {

                    const txtElement = document.querySelector(".visual_sect .visual > .txt");
                    if (txtElement) {

                        const txtHeight = txtElement.offsetHeight;

                        const txtOffset = txtElement.getBoundingClientRect().top + window.scrollY;

                        const scrollToY = txtOffset - txtHeight*2;

                        gsap.to(window, { scrollTo: { y: scrollToY, offsetY: 0 } });
                    }
                }
            },

        },
        top: "-60%",
        opacity: 0,
    });

    let paddingTopValue;

    if (window.innerWidth <= 768) {
        paddingTopValue = "90%";
    } else if (window.innerWidth <= 1024) {
        paddingTopValue = "55%";
    } else {
        paddingTopValue = "calc(100vh - var(--hd_height)";
    }



    var visualSwiper;
    var bar;
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".visual_sect .img", {
        scrollTrigger: {
            trigger: '.visual_sect',
            start: window.innerWidth <= 768 ? "top-=50px top" : "top top",
            end: "-=80% bottom",
            scrub: 1,
            markers: false,
            onUpdate: function(self) {

                if(visualSwiper != undefined && self.progress < 1) {
                    visualSwiper.destroy();
                }

                if (self.progress < 0.5) {
                    document.querySelectorAll('.visual .img .swiper-container .swiper-slide .txt_box').forEach(function(element) {
                        element.classList.remove('active');
                    });
                    document.querySelectorAll('.visual_sect .img .slider').forEach(function(element) {
                        element.classList.remove('active');
                    });
                }
            }
        },
        width: "100%",
        paddingTop: paddingTopValue,
        marginTop: '5rem',
        onComplete: function() {
            document.querySelectorAll('.visual .img .swiper-container .swiper-slide .txt_box').forEach(function(element) {
                element.classList.add('active');
            });
            document.querySelectorAll('.visual_sect .img .slider').forEach(function(element) {
                element.classList.add('active');
            });


                        if(bar == undefined) {
                bar = new ProgressBar.Line(timer, {
                    strokeWidth: 2,
                    duration: 6000,
                    color: '#fff',
                    trailColor: 'rgba(255,255,255,0.3)',
                    trailWidth: 2,
                    svgStyle: {width: '100%', height: '100%'}
                });
            }


            visualSwiper = new Swiper('.visual_sect .img .swiper-container', {
                slidesPerView: 'auto',
                effect: 'fade',
                loop: true,
                autoHeight: false,
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                },
                speed: 750,
                pagination: {
                    el: '.visual_sect .paging',
                    clickable: true,
                    type: 'fraction',
                    formatFractionCurrent: function (number) {
                        return ('0' + number).slice(-2);
                    },
                    formatFractionTotal: function (number) {
                        return ('0' + number).slice(-2);
                    },
                    renderFraction: function (currentClass, totalClass) {
                        return '<span class="' + currentClass + '"></span>' +
                            '<span class="barSpace"></span>' +
                            '<div class="num_box">' +
                            '<span class="second"></span>' +
                            '<span class="slash">/</span>' +
                            '<span class="' + totalClass + '"></span>' +
                            '</div>';
                    },
                },
                on: {
                    init: function () {
                        bar.set(0);
                        bar.animate(1.0, {
                            duration: $('.mainVisualSlideBanner').eq(0).attr('data-swiper-autoplay'),
                        });
                    },
                    slideChange: function () {
                        if(visualSwiper != undefined) {
                            


                            var visualVideo = document.querySelectorAll('.visual_sect .img .swiper-slide video');
                            visualVideo.forEach(function(video) {
                                video.currentTime = 0;
                            });
                        }



                    },
                    slideChangeTransitionStart: function () {
                        setBarDuration();
                        setInitialPagination();
                    },
                },
            });


            setInitialPagination();
                        function setBarDuration() {
                if(visualSwiper != undefined) {
                    var activeSlide = visualSwiper.slides[visualSwiper.activeIndex];
                    players.forEach(function(player) {
                        player.pauseVideo();
                    });

                    var youtubeidx = $(activeSlide).attr('data-youtubeidx');
                    if(youtubeidx != undefined) {
                        if (players[youtubeidx]) {
                            players[youtubeidx].seekTo(0);
                            players[youtubeidx].playVideo();
                        }
                    }



                    var duration = $(activeSlide).attr('data-swiper-autoplay');

                    if(duration == undefined || duration == '') {
                        duration = 6000;
                    }

                    bar.set(0);
                    bar.animate(1.0, {
                        duration: 1*duration + 750,
                    });



                }
            }

            function setInitialPagination() {
                var current = $('.visual_sect .swiper-pagination-current').text();
                var total = $('.visual_sect .swiper-pagination-total').text();

                var next = 1 * current + 1;
                if(next > total) {
                    next = next % total
                }
                next = ('0' + (next)).slice(-2);
                document.querySelector('.visual_sect .second').innerText = next;
            }
        }
    });


    let fontSizeValue;

    if (window.innerWidth <= 768) {
        fontSizeValue = "3rem";
    } else if (window.innerWidth <= 1240) {
        fontSizeValue = "6.5rem";
    } else if (window.innerWidth <= 1640){
        fontSizeValue = "9.2rem";
    } else {
        fontSizeValue = "11rem";
    }

    const setFontSizeBasedOnResolution = () => {
        if (window.matchMedia("(min-width: 1640px)").matches) {

            applyGSAPAnimation('11rem');
        } else if (window.matchMedia("(min-width: 1240px)").matches) {

            applyGSAPAnimation('9.2rem');
        } else if (window.matchMedia("(min-width: 768px)").matches) {

            applyGSAPAnimation('6.5rem');
        } else {

            applyGSAPAnimation('3rem');
        }
    };

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".visual_sect .txt", {
        scrollTrigger: {
            trigger: '.visual_sect',
            start: window.innerWidth <= 768 ? "top-=50px top" : "top top",
            end: "-=80% bottom",
            scrub: 1,
            markers: false,
        },
        width: '130rem',
        fontSize: fontSizeValue,
        fontWeight: '800',
    });

    const content = "환자의 질문을\n 먼저 듣겠습니다.";
    const text = document.querySelector(".dr_sect .txt_wrap .tit_box .tit.mo_over");
    let i = 0;

    function typing() {
        if (i < content.length) {
            let txt = content.charAt(i);
            if (txt === '\n') {
                text.innerHTML += "<br>";
            } else {
                text.innerHTML += txt;
            }
            i++;
        }
    }


    const ioDr = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {

                $target.classList.add("active");
                setInterval(typing, 100)
            }
        });
    },{threshold: .2});

    const $itemsDr = document.querySelectorAll(".dr_sect")
    $itemsDr.forEach((item) => {
        ioDr.observe(item);
    });

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    gsap.to(".uicc_sect .wrap", {
        scrollTrigger: {
            trigger: '.uicc_sect',
            start: window.innerWidth <= 768 ? "top-=250px top" : "-15% top",
            end: window.innerWidth <= 768 ? "top-=250px top" : "+90% bottom",
            scrub: 1.8,
            markers: false,
            onEnter: () => {
                document.querySelector('.uicc_sect .wrap').classList.add('active');
            },
            onLeaveBack: () => {
                document.querySelector('.uicc_sect .wrap').classList.remove('active');
            }
        },
        width: '100%',
    });

    if ($(window).width() >= 768) {
        const ioCoo = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const $target = entry.target;
                if (entry.isIntersecting) {
                    $target.classList.add("active");
                }
            });
        },{threshold: .3});

        const $itemsCoo = document.querySelectorAll(".coo_sect")
        $itemsCoo.forEach((item) => {
            ioCoo.observe(item);
        });
    }

    var cooSwiper = new Swiper('.coo_sect .logo_wrap .swiper-container', {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
        slidesPerGroup: 2,
        spaceBetween: 60,
        navigation: { nextEl: '.coo_sect .swiper_btn.next', prevEl: '.coo_sect .swiper_btn.prev', },
    });

    const ioMediImg = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsMediImg = document.querySelectorAll(".medi_img_sect")
    $itemsMediImg.forEach((item) => {
        ioMediImg.observe(item);
    });

    const ioMediTxt = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsMediTxt = document.querySelectorAll(".medi_txt_sect")
    $itemsMediTxt.forEach((item) => {
        ioMediTxt.observe(item);
    });

    if ($(window).width() >= 768) {

        gsap.registerPlugin(ScrollTrigger);

        const sections = document.querySelector('.medi_box_sect');
        if (sections) {
            const boxes = gsap.utils.toArray('.medi_box_sect .box');
            const margin = window.innerWidth <= 768 ? 100 : 250;

            sections.style.paddingLeft = `${margin}px`;
            sections.style.paddingRight = `${margin}px`;

            const totalScrollWidth = sections.scrollWidth - window.innerWidth + 2 * margin;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.medi_box_wrap',
                    start: `-=15% top`,
                    end: `+=${totalScrollWidth}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            boxes.forEach((box, i) => {
                tl.to(box, {
                    onStart: () => box.classList.add('active'),
                    onReverseComplete: () => box.classList.remove('active'),
                    duration: 1
                }, i);
            });

            gsap.to(sections, {
                x: `-${totalScrollWidth}px`,
                ease: "none",
                scrollTrigger: {
                    trigger: ".medi_box_wrap",
                    start: `-=15% top`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    end: `+=${totalScrollWidth}`,
                }
            });
        }

    } else {
        const io1 = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const $target = entry.target;
                if (entry.isIntersecting) {
                    $target.classList.add("active");
                }
            });
        }, { threshold: 0.3 });

        const $items1 = document.querySelectorAll(".medi_box_sect .box");
        $items1.forEach((item) => {
            io1.observe(item);
        });
    }

    const ioHistory = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsHistory = document.querySelectorAll(".history_sect")
    $itemsHistory.forEach((item) => {
        ioHistory.observe(item);
    });

    const ioHistoryBox = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsHistoryBox = document.querySelectorAll(".history_sect .cont .box")
    $itemsHistoryBox.forEach((item) => {
        ioHistoryBox.observe(item);
    });


    var teamSwiper = new Swiper('.team_sect .img_wrap .swiper-container', {
        slidesPerView: 1.3,
        spaceBetween: 20,
        speed: 750,
        autoplay: true,
        loop: true,
        loopAdditionalSlides: 1,
        observer: true,
        observeParents: true,
        breakpoints: {
            1241: {
                slidesPerView: 1.8,
                spaceBetween: 70,
            }
        }
    });


    if ($(window).width() >= 768) {
        gsap.registerPlugin(ScrollTrigger);

        window.onload = () => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".team_sect",
                    start: window.innerWidth <= 768 ? "top top+=60" : "top top+=80",
                    end: "+=100% top",
                    scrub: 1,
                    pin: false,
                    onEnter: () => {
                        gsap.to(".team_sect", {backgroundColor: '#f5f5f5', duration: 0.5});
                    },
                    onLeave: () => {
                        gsap.to(".team_sect", {backgroundColor: '#ffffff', duration: 0.5});
                    },
                    onEnterBack: () => {
                        gsap.to(".team_sect", {backgroundColor: '#f5f5f5', duration: 0.5});
                    },
                    onLeaveBack: () => {
                        gsap.to(".team_sect", {backgroundColor: '#ffffff', duration: 0.5});
                    }
                }
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: ".team_sect",
                    start: window.innerWidth <= 768 ? "top top+=60" : "top top+=80",
                    end: "+=75% top",
                    scrub: 1,
                    pin: true,
                }
            })
                .to(".team_sect .cont1 .txt_wrap", {
                    opacity: 0, y: '-30px', delay: 0.5, pointerEvents: 'none',
                    onComplete: function () {
                        document.querySelector(".team_sect .cont1 .txt_wrap").style.pointerEvents = 'none';
                    }
                })
                .to(".team_sect .cont1 .img_wrap", {
                    opacity: 0, y: '-30px', delay: -0.5, pointerEvents: 'none',
                    onComplete: function () {
                        document.querySelector(".team_sect .cont1 .img_wrap").style.pointerEvents = 'none';
                    }
                })
                .to(".team_sect .cont2 .txt_wrap", {
                    opacity: 1, y: 0, pointerEvents: 'visible',
                    onComplete: function () {
                        document.querySelector(".team_sect .cont2 .txt_wrap").style.pointerEvents = 'visible';
                    }
                })
                .to(".team_sect .cont2 .img_wrap", {
                    opacity: 1, y: 0, delay: -0.5, pointerEvents: 'visible',
                    onComplete: function () {
                        document.querySelector(".team_sect .cont2 .img_wrap").style.pointerEvents = 'visible';
                    }
                });

        };
    }

    var mealSwiper = new Swiper('.meal_sect .meal_slide .swiper-container', {
        slidesPerView: 2,
        spaceBetween: 10,
        speed: 750,
        observer: true,
        observeParents: true,
        navigation: { nextEl: '.meal_sect .swiper_btn.next', prevEl: '.meal_sect .swiper_btn.prev', },
        breakpoints:{
            1241: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            769: {
                slidesPerView: 3,
                spaceBetween: 15,
            }
        },
    });

    const ioMeal = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsMeal = document.querySelectorAll(".meal_sect")
    $itemsMeal.forEach((item) => {
        ioMeal.observe(item);
    });


    const ioCase = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsCase = document.querySelectorAll(".case_sect")
    $itemsCase.forEach((item) => {
        ioCase.observe(item);
    });

    const ioMedicont = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsMedicont = document.querySelectorAll(".medi_cont_sect")
    $itemsMedicont.forEach((item) => {
        ioMedicont.observe(item);
    });

    var mediSlideSwiper = new Swiper('.medi_slide_sect .swiper-container', {
        slidesPerView: 1.1,
        spaceBetween: 100,
        speed: 750,
        loop: true,
        loopAdditionalSlides: 1,
        observer: true,
        observeParents: true,
        pagination: {
            el: '.medi_slide_sect .paging',
            clickable: true,
        },
    });

    const ioMediSlide = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsMediSlide = document.querySelectorAll(".medi_slide_sect")
    $itemsMediSlide.forEach((item) => {
        ioMediSlide.observe(item);
    });

    var youtubeSwiper = new Swiper('.youtube_sect .swiper-container', {
        slidesPerView: 1.5,
        spaceBetween: 20,
        speed: 750,
        loop: true,
        loopAdditionalSlides: 1,
        observer: true,
        observeParents: true,
        breakpoints: {
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            }
        }
    });

    const ioYoutube = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsYoutube = document.querySelectorAll(".youtube_sect")
    $itemsYoutube.forEach((item) => {
        ioYoutube.observe(item);
    });

    const ioClinic = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsClinic = document.querySelectorAll(".clinic_sect")
    $itemsClinic.forEach((item) => {
        ioClinic.observe(item);
    });

    if ($(window).width() <= 768) {

        const ioClinicMo = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const $target = entry.target;
                if (entry.isIntersecting) {
                    $target.classList.add("active");
                } else {
                    $target.classList.remove("active");
                }
            });
        },{threshold: .3});

        const $itemsClinicMo = document.querySelectorAll(".clinic_sect .cont .box")
        $itemsClinicMo.forEach((item) => {
            ioClinicMo.observe(item);
        });

    }

    const iofacilities = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsfacilities = document.querySelectorAll(".facilities_sect")
    $itemsfacilities.forEach((item) => {
        iofacilities.observe(item);
    });

    var placeSwiper = new Swiper('.place_sect .place_slide .swiper-container', {
        slidesPerView: 1.3,
        spaceBetween: 10,
        speed: 750,
        autoplay: true,
        loop: true,
        loopAdditionalSlides: 1,
        observer: true,
        observeParents: true,
        breakpoints:{
            768:{
                slidesPerView: 2.8,
                spaceBetween: 15,
            }
        }
    });

    const ioPlace= new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsPlace= document.querySelectorAll(".place_sect .main_tit_box")
    $itemsPlace.forEach((item) => {
        ioPlace.observe(item);
    });

    const ioPlaceSlide= new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsPlaceSlide= document.querySelectorAll(".place_sect .place_slide")
    $itemsPlaceSlide.forEach((item) => {
        ioPlaceSlide.observe(item);
    });

    const ioAdvice = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsAdvice = document.querySelectorAll(".advice_sect")
    $itemsAdvice.forEach((item) => {
        ioAdvice.observe(item);
    });

    const ioAdviceInfo = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            if (entry.isIntersecting) {
                $target.classList.add("active");
            }
        });
    },{threshold: .3});

    const $itemsAdviceInfo = document.querySelectorAll(".advice_sect .info_wrap")
    $itemsAdviceInfo.forEach((item) => {
        ioAdviceInfo.observe(item);
    });



    var marqueeTimeline = [];

    var element = document.querySelectorAll(".coo_sect .logo_wrap");
    var itemWidth = $(".coo_sect .logo_wrap .logo_box").outerWidth(true);

    var move = gsap.to(element , {
        duration: 50,
        x: -itemWidth - 0 ,
        timeScale: 1,
        repeat:-1.5,
        ease: "none",
    });

    const boxHover = gsap.to(element,{
        timeScale: 0.1,
        duration: 0.75 ,
        paused: true
    })

    element.forEach(function(el) {
        el.addEventListener("mouseover", function () {
            gsap.to(move, {timeScale: 0.3, duration: 1});
        });
        el.addEventListener("mouseleave", function () {
            gsap.to(move, {timeScale: 1, duration: 1});
        });
    });







	$(document).ready(function(){

        var gpCateSlide = new Swiper('#gp_cate_slide', {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            freeMode: true,
            scrollbar: {
                el: '.gallery_scrollbar',
                draggable: true,
                hide: false,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 3.5,
                    spaceBetween: 20,
                }
            },
            on: {
                init: function() {
                    this.el.classList.add('swiper-container-initialized');
                    this.el.classList.add('swiper-container-horizontal');
                }
            }
        });
	});


	
	$('.main-popup-close, .main-popup-bg').click(function(){
		$('.main-popup-wrap').fadeOut(100);
		$('.popup-wrap2').fadeOut(100);
		$('body').css('overflow-y','auto');
		$('meta[name=viewport]').attr('content','width=device-width, initial-scale=1.0, maximum-scale=2.0');
	});

    
        $(document).ready(function(){
            if ( getCookie('mainPopup') == '' ) {
                $('.main-popup-wrap').show();
            }
        });

                var mainPopupLoop = true;
        
                var slidesPerView769 = 2;
        var slidesPerView1201 = 3;
        
        $(document).ready(function(){
            var mainPopupSwiper = new Swiper ('.main-popup-slide', {
                speed : 500,
                loop: mainPopupLoop,
                navigation: { nextEl: '.swiper-button-next-popup', prevEl: '.swiper-button-prev-popup', },
                slidesPerView : '3',
                centeredSlides: false,
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,

                    },
                    769: {
                        slidesPerView: slidesPerView769,
                        spaceBetween: 15,

                    },
                    1201: {
                        slidesPerView: slidesPerView1201,
                        spaceBetween: 20,

                    },
                },
            });
        });
        $('.main-popup-close-wrap > label').click(function(){
            if ($(this).find('input').prop('checked')) {
                $(this).find('.svg').addClass('popup_chk');
            } else {
                $(this).find('.svg').removeClass('popup_chk');
            }
        });

    


    function popupCookieCheck() {

        if($('#popupCheck').prop('checked')) {
            setCookie('mainPopup', 'off', 1 );
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        var root = document.querySelector(':root');
        var mainQuick = document.querySelector('.main_quick');
        var footer = document.querySelector('#footer');

        if (mainQuick) {
            var mainQuickHeight = mainQuick.offsetHeight;
            root.style.setProperty('--main-quick-height', mainQuickHeight + 'px');

            if (footer) {
                footer.classList.add('has_quick');
            }
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        var footer = document.querySelector('#footer');
        var footerPosition = footer.getBoundingClientRect().bottom + window.scrollY + 1000;

        var mainQuick = document.querySelector('.main_quick');

        window.addEventListener('scroll', function() {
            var currentPosition = window.scrollY + window.innerHeight;
            if (currentPosition >= footerPosition) {
                mainQuick.classList.add('quick_hide');
                footer.classList.remove('has_quick');
            } else {
                mainQuick.classList.remove('quick_hide');
                footer.classList.add('has_quick');
            }
        });
    });



