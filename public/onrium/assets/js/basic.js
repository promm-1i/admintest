function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


$(document).ready(function () {

    if (isMobileDevice()) {
        document.body.classList.add('on-kkx');

        // 약간의 지연 후 설정 (주소창 완전히 로드 후)
        setTimeout(function() {
            const kakaoVh = window.innerHeight;
            document.documentElement.style.setProperty('--kakaoVh', kakaoVh + 'px');
            console.log('kakaoVh:', kakaoVh);
        }, 0);
    }

    /*모바일 높이*/
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + 'px');
    $(window).resize(function () {
        document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + 'px');
    });














    // Lenis
    let lenis;
    let lenisRafId;

    function initLenis(scroll) {
        if (!lenis && window.innerWidth > 1240) {
            lenis = new Lenis({
                duration: 1.2,
                infinite: false,
                gestureOrientation: "vertical",
                normalizeWheel: false,
                smoothTouch: true,
                allowNestedScroll: true
            });

            // 전역 접근을 위해 window 객체에 할당
            window.lenis = lenis;

            if(scroll != undefined) {
                console.log("init scroll");
                lenis.scrollTo(scroll, { immediate: true }); //
            }

            function raf(time) {
                lenis.raf(time);
                lenisRafId = requestAnimationFrame(raf);
            }
            lenisRafId = requestAnimationFrame(raf); // 珥덇린 requestAnimationFrame �ㅼ젙
        }
    }

    function destroyLenis() {
        if (lenis) {
            cancelAnimationFrame(lenisRafId); // requestAnimationFrame 以묒�
            lenis.destroy();
            lenis = null;
            window.lenis = null; // 전역 참조도 제거
            lenisRafId = null; // ID 珥덇린��
        }
    }

    function enableLenis(scroll) {
        if (!lenis) {
            console.log("en");
            initLenis(scroll);
        }
    }

    function disableLenis() {
        if (lenis) {
            destroyLenis();
        }
    }

    initLenis();



    window.addEventListener("resize", () => {
        if (window.innerWidth > 1240) {
            initLenis(); // PC �붾㈃�먯꽌�� Lenis 珥덇린��
        } else {
            destroyLenis(); // 紐⑤컮�� �붾㈃�먯꽌�� Lenis 鍮꾪솢�깊솕
        }
    });



    function toggleLenis(enable) {
        if (enable) {
            lenis.start();
        } else {
            lenis.stop();
        }
    }


    $(document).on('mouseenter', '.on-ncx-slcx .on-ls', function () {
        destroyLenis();
    });

    $(document).on('mouseleave', '.on-ncx-slcx .on-ls', function () {
        initLenis(true);
    });







    // new WOW().init();


    /*퍼블리싱 임시 헤더, 푸터*/
    // $('.header').load("header.html");
    // $('.footer').load("footer.html");
    // $('.footer2').load("footer2.html");


    // Header Down
    var previousScroll;

    $(window).scroll(function () {
        if (window.scrollY <= 100) {
            $(".on-hd2").addClass("on-tp");
            $(".on-hd2").removeClass("on-dwnx");

        }else {
            $(".on-hd2").removeClass("on-tp");
            $(".on-hd2").addClass("on-dwnx");

        }

        var currentScroll = $(this).scrollTop();

        if (currentScroll > previousScroll) {
            $(".on-hd2").addClass("on-scr-dwnx");
        }else {
            $(".on-hd2").removeClass("on-scr-dwnx");
        }

        previousScroll = currentScroll;


    });


    // 빈링크 클릭 방지
    $(document).on('click', 'a[href="#"]', function (e) {
        e.preventDefault();
    });


    $(".on-tp-bt").click(function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 400);
        return false;
    });


    $("select").niceSelect();


    // $('.bg_text_box.move .bg_text').marquee({
    //     speed: 150,
    //     gap: 30,
    //     delayBeforeStart: -5000,
    //     direction: 'left',
    //     duplicated: true,
    //     pauseOnHover: false,
    // });


    // $(".sub_visual .img").addClass("zoom");


    // $(".accordion li").click(function () {

    //     $(this).find(".answer").stop().slideToggle();
    //     $(this).toggleClass('on');
    //     $(this).siblings("li").find(".answer").slideUp();
    //     $(this).siblings("li").removeClass('on');
    // })


    // function setImageScale() {
    //     const vw = window.innerWidth;
    //     const base = 3200;
    //     const scale = base / vw;

    //     const img = document.querySelector('.temp_img img');
    //     img.style.transform = `scale(${scale})`;
    //   }

    //   window.addEventListener('load', setImageScale);
    //   window.addEventListener('resize', setImageScale);

    // 고객센터 검색 영역
    // 검색어 입력시 삭제 버튼 표시/숨김 처리
    const $searchInput = $('.on-schx-npx input[name="searchText"]');
    const $deleteBtn = $('.on-schx-npx .on-bt-dlx');

    // 초기 로드시 입력값이 있으면 삭제 버튼 표시
    /*
     if($searchInput.val().length > 0) {
     $deleteBtn.addClass('active');
     } else {
     $deleteBtn.removeClass('active');
     }
     */

    // 입력값 변경시 삭제 버튼 표시/숨김
    $searchInput.on('input', function () {
        if ($(this).val().length > 0) {
            $deleteBtn.addClass('active');
        }else {
            $deleteBtn.removeClass('active');
        }
    });

    // 삭제 버튼 클릭시 입력값 초기화
    $deleteBtn.on('click', function () {
        $searchInput.val('');
        $(this).removeClass('active');
        // 검색 실행
        $('#on-i-jxx-sr-frmx input[name=page]').val(1);
        listView();
    });

});

function contObserver(selector, num, type, target2) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const $target = entry.target;
            const isIntersecting = entry.isIntersecting;

            if (isIntersecting) {
                if (target2) $(target2).addClass("active");
                $($target).addClass("active");

                if (type) {
                    setTimeout(() => $($target).addClass("on-anix-ndx"), 1500);
                }else {
                    setTimeout(() => $($target).addClass("on-anix-ndx"), 1500);
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

// fill txt
window.addEventListener("load", function () {

    if (!document.querySelector(".on-sb-tt.on-fllx-tx")) return;

    ScrollTrigger.create({
        trigger: ".on-sb-tt.on-fllx-tx",
        start: "bottom bottom",
        once: true,
        markers: false,
        onEnter: () => {

            const gap = 0.3;

            document.querySelectorAll(".on-sb-tt.on-fllx-tx span").forEach((el, i) => {
                const isSpecialty = el.closest(".on-sb-spcx") !== null;
                const duration = isSpecialty ? 0.8 : 1.5;

                gsap.to(el, {
                    backgroundSize: "100% 100%",
                    ease: "none",
                    duration,
                    delay: i * (duration - gap)
                });
            });
        }
    });

});

$(function () {

    contObserver(".on-sb-tt-bx");

    contObserver(".on-mtfx");

    contObserver(".on-sb-tt");
    contObserver(".on-cmx-pic-tp", 0.5);
    contObserver(".on-sb-rndx-tb-wr", 0.5);
    contObserver(".on-tbsx2", 0.5);
    contObserver(".on-tbsx3", 0.5);

    contObserver(".on-tlkx-sctx .on-sl2", 0.5);
    contObserver(".on-dcx-dwnx ul li", 0.5);
    contObserver(".on-tpx-dscx", 0.5);
    contObserver(".on-crtx-pgx .on-nf-tbl", 0.5);
    contObserver(".on-cmx-rcmx-sctx .on-ls li", 0.5);
    contObserver(".on-st-ls3", 0.5);
    contObserver(".on-st-ls4", 0.5);
    contObserver(".on-prgx-cntx", 0.3);
    contObserver(".on-sl-sctx", 0.3);
    contObserver(".on-strx-bnnx", 0.3);



    // 클리닉 페이지만
    if ($('.on-clnx').length > 0) {
        contObserver(".on-clnx-tp .on-ytbx-ar", 0.1);
        contObserver(".on-clnx-tp .on-pic-ar", 0.5);
        contObserver(".on-clnx-tp .on-sb-ds", 0.2);
        contObserver(".on-clnx-tp .on-lg-tt", 0.2);
        contObserver(".on-clnx-anix", 0.5);
        contObserver(".on-ls-tp1 ul li", 0.5);
        contObserver(".on-grpx-sctx .on-grpx-ar", 0.5);
        contObserver(".on-pntx-ls2 ul li", 0.5);
        contObserver(".on-clnx-sl", 0.5);
        contObserver(".on-trtx-sl", 0.5);
        contObserver(".on-gldx-sctx .on-grpx2 svg ", 0.5);
        contObserver(".on-st-sctx .on-pic2 ", 0.5);
        contObserver(".on-st-ls ul li ", 0.5);
        contObserver(".on-rdrx-sctx .on-pic2 ", 0.5);
        contObserver(".on-pntx-sctx .on-chcx3", 0.5);
        contObserver(".on-mdx-ar", 0.1);
        contObserver(".on-ab-phtx ul li", 0.5);
        contObserver(".on-srgx-ar", 0.1);
        contObserver(".on-clnx-chcx ul li", 0.5);
        contObserver(".on-tt-kyx", 0.5);
        contObserver(".on-nsrx-ls ul li", 0.5);
        contObserver(".on-cmpx-tbl", 0.5);
        contObserver(".on-srgx-bfrx ul li", 0.5);
        contObserver(".on-st-ls2 ul li", 0.5);
        contObserver(".on-cmx-crcx .on-it", 0.5);
        contObserver(".on-ab-bx", 0.1);
        contObserver(".on-gdx-ls dl", 0.5);
        contObserver(".on-cmx-pic-ar", 0.5);
        contObserver(".on-aix-sctx .on-thmx2 ul li", 0.5);
        contObserver(".on-cmx-ab-csx ul li", 0.5);
        contObserver(".on-cmx-btnx", 0.5);
        contObserver(".on-rdtx-sctx .on-rdtx-crcx", 0.5);
        contObserver(".on-rdtx-st1", 0.5);
        contObserver(".on-rdtx-st2", 0.5);
        contObserver(".on-cmx-mgsx-bx", 0.1);
        contObserver(".on-tb-wr2 .on-tbsx", 0.5);
        contObserver(".on-tbl2", 0.5);
        contObserver(".on-hwx-sctx .on-pic2", 0.5);
        contObserver(".on-clnx-tp .on-tgsx", 0.5);
        contObserver(".on-hpvx-bx1", 0.5);
        contObserver(".on-hpvx-bx2", 0.5);
        contObserver(".on-gdx-bx ul li", 0.5);
        contObserver(".on-hpvx-schx li", 0.5);
        contObserver(".on-clnx .on-nf-tbl", 0.5);
        contObserver(".on-ls-tp2 ul li", 0.5);
        contObserver(".on-rt-grpx .on-grpx", 0.5);
        contObserver(".on-cmx-st2", 0.1);
        contObserver(".on-pic-ar", 0.1);
        contObserver(".on-pic-ar1", 0.1);
        contObserver(".on-crcx-bx div", 0.5);
        contObserver(".on-grpx-sctx .graph_area1", 0.1);
        contObserver(".on-grpx-sctx .on-grpx-ar2", 0.1);
        contObserver(".on-grpx-sctx .on-grpx-ar3", 0.1);
        contObserver(".on-ab-sctx .on-pic3", 0.1);
        contObserver(".on-ab-sctx .on-pic4", 0.1);
        contObserver(".on-ab-sctx .on-pic6", 0.1);
        contObserver(".on-whyx-sctx .on-pic4 div", 0.1);
        contObserver(".on-ab-sctx .on-pic5", 0.1);
        contObserver(".on-vsx-cntx", 0.1);
        contObserver(".on-ls-tp3 ul li", 0.5);
        contObserver(".on-crcx-anix-sctx", 0.5);
        contObserver(".on-tstx-cntx2 .on-bx", 0.1);
        contObserver(".on-nw-ls ul li", 0.5);

        // 그래프 추가
        contObserver('.on-grpx-cntx', 0.5, false);


    }


    // 클리닉 조기관리  슬라이더
    var clinic_slider;

    if (window.innerWidth >= 769) {
        // PC/태블릿 버전 (769px 이상)
        clinic_slider = new Swiper('.on-clnx-sl .swiper-container', {
            effect: 'slide',
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.on-clnx-sl .on-pgx',
                type: 'fraction',
                formatFractionCurrent: function (number) {
                    return ('0' + number).slice(-2);
                },
                formatFractionTotal: function (number) {
                    return ('0' + number).slice(-2);
                },
                renderFraction: function (currentClass, totalClass) {
                    return '<span class="' + currentClass + '"></span><span class="on-brx"></span><span class="' + totalClass + '"></span>';
                },
            },
            navigation: {
                prevEl: '.on-clnx-sl .swiper-button-prev',
                nextEl: '.on-clnx-sl .swiper-button-next'
            },
            observer: true,
            observeParents: true,
            mousewheel: false,
            breakpoints: {
                1240: {slidesPerView: 1.2, spaceBetween: 100},
                1000: {slidesPerView: 1.1, spaceBetween: 60,},
                769: {slidesPerView: 1.1, spaceBetween: 50}
            }
        });
    }else {
        // 모바일 버전 (768px 이하)
        clinic_slider = new Swiper('.on-clnx-sl .swiper-container', {
            effect: 'slide',
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".on-clnx-sl .swiper-pagination",
                type: "progressbar",
            },
            navigation: {
                prevEl: '.on-clnx-sl .swiper-button-prev',
                nextEl: '.on-clnx-sl .swiper-button-next'
            },
            observer: true,
            observeParents: true,
            mousewheel: false,
            breakpoints: {
                500: {slidesPerView: 1.7, spaceBetween: 15},
                300: {slidesPerView: 1.2, spaceBetween: 15}
            }
        });
    }


    // 포인트 슬라이더 컨트롤로 위치 조정
    function updateControlsMargin() {
        var slideWidth = $(".on-clnx-sl .swiper-slide").outerWidth();
        var marginLeftValue = `calc(${slideWidth / 2}px + 7rem)`;
        $(".on-clnx-sl .on-cntx2").css("margin-left", marginLeftValue);
    }

    // 초기 설정
    updateControlsMargin();

    // 화면 리사이즈 시 업데이트
    $(window).resize(function () {
        updateControlsMargin();
    });


    // 클리닉 어떻게?

    let treatmentSwiper = new Swiper('.on-trtx-sl .swiper-container', {
        slidesPerView: 1.2,
        spaceBetween: 20,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 750,
        loop: true,
        observeParents: true,
        observer: true,
        pagination: {
            el: ".on-trtx-sl .swiper-pagination",
            type: "progressbar",

        },
        navigation: {
            nextEl: ".on-trtx-sl .swiper-button-next",
            prevEl: ".on-trtx-sl .swiper-button-prev",
        },
        breakpoints: {
            1240: {slidesPerView: 3, spaceBetween: 30},
            768: {slidesPerView: 2.5, spaceBetween: 15},
            500: {slidesPerView: 1.7, spaceBetween: 15},
            300: {slidesPerView: 1.2, spaceBetween: 15}
        },
        on: {

            init: function () {
                // loop 모드에서는 슬라이드가 복제되므로, 원본 슬라이드 개수를 따로 세야 함
                let totalSlides = this.slides.length - this.loopedSlides * 2;
                let displayTotal = totalSlides < 10 ? '0' + totalSlides : totalSlides;
                $('.on-trtx-sl .on-cntx2 .on-no .on-no2').text(displayTotal);

                // 초기 현재 슬라이드 번호도 표시
                let currentSlide = this.realIndex + 1;
                let displayNum = currentSlide < 10 ? '0' + currentSlide : currentSlide;
                $('.on-trtx-sl .on-cntx2 .on-no .on-no1').text(displayNum);
            },
            slideChange: function () {
                let currentSlide = this.realIndex + 1;
                let displayNum = currentSlide < 10 ? '0' + currentSlide : currentSlide;
                $('.on-trtx-sl .on-cntx2 .on-no .on-no1').text(displayNum);

            }
        },
    });

    // 769px 미만에서 treatment_slider의 tit를 txt와 동일레벨로 이동
    function appendTitToTxt() {
        if (window.innerWidth < 769) {
            $('.on-trtx-sl .swiper-slide').each(function () {
                var $slide = $(this);
                var $tit = $slide.find('.on-tt');
                var $txt = $slide.find('.on-tx3');

                // 이미 이동된 경우를 체크하여 중복 실행 방지
                if ($tit.length && $txt.length && !$tit.data('moved')) {
                    $tit.insertBefore($txt);  // txt 바로 앞에 배치
                    $tit.data('moved', true);
                }
            });
        }else {
            // 769px 이상일 때 a 태그 안에서 img div와 동일레벨로 배치
            $('.on-trtx-sl .swiper-slide').each(function () {
                var $slide = $(this);
                var $a = $slide.find('a');
                var $imgDiv = $a.find('.on-pic2');
                var $tit = $slide.find('.on-tt');

                if ($tit.length && $tit.data('moved') && $imgDiv.length && $a.length) {
                    $imgDiv.before($tit);  // img div 바로 앞에 배치 (a 태그 안에서)
                    $tit.removeData('moved');
                }
            });
        }
    }

    // 초기 실행
    appendTitToTxt();

    // 윈도우 리사이즈 시 실행
    $(window).resize(function () {
        appendTitToTxt();
    });


    if ($('.on-rsnx-sctx').length > 0) {

        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.matchMedia({

            "(min-width: 769px)": function () {


                // 클리닉
                const logoStart = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".on-rsnx-lg",
                        // 뷰포트의 center에서 15% 아래에 위치할 때 애니메이션 시작
                        start: "top center+=15%",
                        // 섹션의 상단이 뷰포트 상단에서 50% 더 내려간 곳까지 애니메이션 범위 지정
                        end: "bottom bottom",
                        // 스크롤과 연동하지 않고 애니메이션이 즉시 실행됨
                        scrub: 0,
                        // 디버깅을 위해 마커 표시 (개발 완료 시 false로 변경 추천)
                        pin: false


                    }
                });

                const urologyGsap = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".on-rsnx-lg",
                        start: "top top",
                        // .reason_logo의 하단이 뷰포트 하단으로부터 50% 더 내려간 위치에 닿을 때 애니메이션 종료
                        end: "bottom+=50% bottom",
                        // 스크롤 진행에 따라 애니메이션이 연동되지 않음(즉시 전환)
                        scrub: 0,
                        // 해당 구간 스크롤시 요소를 고정
                        pin: true,
                        // 리프레시 시 트리거 위치 재계산
                        invalidateOnRefresh: true,
                        // 디버깅용 마커 비활성화
                        markers: false,
                    }
                });

                const dataBgGsap = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".on-rsnx-sctx .on-bk-cntx .on-bk",
                        start: "bottom bottom",
                        endTrigger: ".on-rsnx-sctx",
                        end: "bottom bottom",
                        scrub: 1,
                        markers: false,
                        pin: true,
                    }
                });

                const dataBgContGsap = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".on-rsnx-sctx .on-bk-cntx ",
                        start: "top top",
                        end: "bottom+=100% bottom",
                        markers: false,
                        scrub: 1,

                    }
                });

                dataBgContGsap.to(".on-rsnx-sctx .on-bk-cntx .on-bk", {scale: 1, duration: 0.6},).to(".on-rsnx-lg .on-lg-bk img", {opacity: 0})



                const dataSectTxtGsap = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".on-rsnx-sctx .on-sb-tt-bx",
                        start: "top top+=10%",
                        endTrigger: ".on-rsnx-sctx",
                        end: "bottom bottom",
                        scrub: 0,
                        markers: false,
                        pin: true,
                    }
                });

                const dataSectTxtAni = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".on-rsnx-sctx .on-sb-tt-bx",
                        start: "top top+=10%",
                        endTrigger: ".on-dtx-cntx",
                        end: "top top",
                        scrub: 1,
                        markers: false,
                    }
                });

                const dataThum = document.querySelector(".on-rsnx-sctx .on-sb-tt-bx .on-dtx-thmx");
                const endY = dataThum ? -100 : -180; // 기본 -180

                dataSectTxtAni.to(".on-rsnx-sctx .on-sb-tt-bx .on-tt", { opacity: 1, y: 0 });
                dataSectTxtAni.to(".on-rsnx-sctx .on-sb-tt-bx .on-tx3", { opacity: 1, y: 0 }, ">-0.25");
                if (dataThum) {
                    dataSectTxtAni.to(dataThum, { opacity: 1, y: 0 }, ">-0.25");
                }
                dataSectTxtAni.to(".on-rsnx-sctx .on-sb-tt-bx", { yPercent: endY, opacity: 0, ease: "none" });
                gsap.utils.toArray(".on-rsnx-sctx .on-dtx-cntx .on-cntx").forEach((e) => {

                    const num = e.querySelector('.on-no');

                    gsap.to(e, {
                        scrollTrigger: {
                            trigger: e,
                            start: "bottom bottom",
                            end: "bottom center",
                            scrub: true,
                            markers: false,
                        },
                        opacity: 1,
                        y: 0,
                    });

                    gsap.to(num, {
                        scrollTrigger: {
                            trigger: e,
                            start: "top center",
                            end: "bottom center",
                            scrub: true,
                        },
                        color: "#FCA400"
                    });


                });
            },

            "(max-width: 768px)": function () {

                const urologyGsap = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".on-rsnx-lg",
                        start: "top top",
                        end: "bottom+=150% bottom",
                        scrub: 0,
                        pin: true,
                        markers: false,
                    }
                });

                const dataBgContGsap = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".on-rsnx-sctx .on-bk-cntx",
                        start: "top top",
                        endTrigger: ".on-rsnx-sctx",
                        end: "bottom bottom",
                        scrub: 1,
                        markers: false,
                        pin: true,
                        onEnter: () => {
                            $(".on-rsnx-sctx .on-bk-cntx .on-bk").addClass('active')
                        },
                        onLeaveBack: () => {
                            $(".on-rsnx-sctx .on-bk-cntx .on-bk").removeClass('active')
                        },
                    }
                });
                dataBgContGsap.to(".on-rsnx-sctx .on-cntx-bx", {opacity: 1})
            }
        });
    }

    // 클리닉 >  FAQ
    $('.on-fqx-ls .on-qx').on('click', function () {
        var $answer = $(this).next('.on-ax');
        $(this).toggleClass('active');  // active 클래스 토글
        if ($answer.is(':visible')) {
            $answer.slideUp(200, function () {
                // 애니메이션 완료 후 ScrollTrigger refresh
                ScrollTrigger.refresh();
            });

            $(this).removeClass('active');  // 닫힐 때 active 클래스 제거
        }else {
            $(this).closest('.on-fqx-ls').find('.on-qx').removeClass('active');  // 다른 질문의 active 클래스 제거
            $(this).closest('.on-fqx-ls').find('.on-ax:visible').slideUp(200);
            $answer.slideDown(200, function () {
                // 애니메이션 완료 후 ScrollTrigger refresh
                ScrollTrigger.refresh();
            });
            $(this).addClass('active');  // 열릴 때 active 클래스 추가
        }
    });

    // 클리닉,의료진 리스트 > 4썸 슬라이드 공통 사용
    if ($('.on-tlkx-sctx div:not(.on-mv-tlkx) .swiper-container').length > 0) {


        function getTalkSlidesPerView() {
            const w = window.innerWidth;

            if (w >= 1240) return 4;
            if (w >= 768) return 3;
            if (w >= 600) return 1;
            return 1;
        }


        /* -----------------------------------
         Swiper 초기화 함수
         ----------------------------------- */
        function initTalkSwipers($scope) {
            $scope.find('.swiper-container').each(function () {

                var $container = $(this);
                var slideCount = $container.find('.swiper-slide').length;

                // 이미 swiper 있으면 제거
                if ($container.data('swiper')) {
                    $container.data('swiper').destroy(true, true);
                }

                // Swiper 생성
                var swiper = new Swiper(this, {
                    slidesPerView: 1.2,
                    spaceBetween: 15,
                    loop: slideCount > 3, // 3개 초과일 때만 loop
                    speed: 1000,
                    autoplay: slideCount > 3 ? {
                        delay: 5000,
                        disableOnInteraction: false,
                    } : false, // 3개 이하면 autoplay 비활성화
                    observer: true,
                    observeParents: true,
                    navigation: {
                        nextEl: $container.closest('.on-sl2').find('.swiper_btn.on-nxtx')[0],
                        prevEl: $container.closest('.on-sl2').find('.swiper_btn.on-prvx')[0],
                    },
                    pagination: {
                        el: $container.closest('.on-sl2').find('.swiper-pagination')[0],
                        type: 'progressbar',
                    },
                    breakpoints: {
                        1240: {slidesPerView: 4, spaceBetween: 20},
                        768: {slidesPerView: 3, spaceBetween: 15},
                        600: {slidesPerView: 1.8, spaceBetween: 15}
                    }
                });

                $container.data('swiper', swiper);
                /* -----------------------------------
                 perView 올림값 대비 슬라이드 개수로
                 이동 차단 / 페이징 숨김
                 ----------------------------------- */
                function updateTalkSwiperState() {
                    // 복제본 제외한 실제 슬라이드 개수
                    const slideCount = $container.find('.swiper-slide:not(.swiper-slide-duplicate)').length;

                    const viewCount = Math.ceil(getTalkSlidesPerView());
                    const $paging = $container.closest('.on-sl2').find('.swiper-pagination');

                    if (slideCount <= viewCount) {
                        // 페이징 숨김
                        $paging.hide();

                        // 이동 차단
                        swiper.allowTouchMove = false;

                        // 버튼 막기
                        $(swiper.navigation.nextEl).css("pointer-events", "none");
                        $(swiper.navigation.prevEl).css("pointer-events", "none");

                        // autoplay 멈춤
                        if (swiper.autoplay && swiper.autoplay.running) {
                            swiper.autoplay.stop();
                        }

                        // 처음 위치로 고정
                        swiper.slideTo(0, 0);
                        swiper.setTranslate(0);
                    }else {
                        // 페이징 표시
                        $paging.show();

                        swiper.allowTouchMove = true;

                        $(swiper.navigation.nextEl).css("pointer-events", "");
                        $(swiper.navigation.prevEl).css("pointer-events", "");

                        if (swiper.autoplay) swiper.autoplay.start();
                    }
                }


                // 초기 실행
                updateTalkSwiperState();

                // 리사이즈 대응
                $(window).on("resize", updateTalkSwiperState);
            });
        }


        /* -----------------------------------
         페이지 로드: 첫 번째 cont만 실행
         ----------------------------------- */
        $(function () {

            // talk_sect 안에 tab_cont가 존재하는지 확인
            if ($('.on-tlkx-sctx .on-tb-cntx').length > 0) {

                // tab_cont 구조일 때 → 현재 보이는 cont만 초기화
                initTalkSwipers($('.on-tlkx-sctx .on-tb-cntx .on-cntx:visible'));

            } else {

                // tab_cont 구조가 아닐 때 → talk_sect 전체에서 swiper 검색 후 초기화
                initTalkSwipers($('.on-tlkx-sctx'));
            }

        });


        /* -----------------------------------
         탭 클릭 시 Swiper 재초기화
         ----------------------------------- */
        $('.on-tlkx-sctx .on-tbsx2 a').on('click', function (e) {
            e.preventDefault();

            var idx = $(this).parent().index();

            $(this).addClass('active').parent().siblings().find('a').removeClass('active');

            var $conts = $('.on-tlkx-sctx .on-tb-cntx .on-cntx');
            $conts.hide().eq(idx).show();

            // 새로 보이는 cont 안 swiper 초기화 + 조건 반영
            initTalkSwipers($conts.eq(idx));
        });


    }


    // 의료진 영상 추가 > tab X
    if ($('.on-tlkx-sctx .on-mv-tlkx .swiper-container').length > 0) {

        function getTalkSlidesPerView() {
            const w = window.innerWidth;
            if (w >= 1240) return 4;
            if (w >= 768) return 3;
            if (w >= 600) return 1;
            return 1;
        }

        /* -----------------------------------
         Swiper 초기화 함수
         ----------------------------------- */
        function initTalkSwipers($scope) {
            $scope.find('.swiper-container').each(function () {

                const $container = $(this);
                const slideCount = $container.find('.swiper-slide').length;

                // 기존 swiper 제거
                if ($container.data('swiper')) {
                    $container.data('swiper').destroy(true, true);
                }

                const swiper = new Swiper(this, {
                    slidesPerView: 1.2,
                    spaceBetween: 15,
                    loop: slideCount > 3,
                    speed: 1000,
                    autoplay: slideCount > 3 ? {
                        delay: 5000,
                        disableOnInteraction: false,
                    } : false,
                    observer: true,
                    observeParents: true,
                    navigation: {
                        nextEl: $container.closest('.on-sl2').find('.swiper_btn.on-nxtx')[0],
                        prevEl: $container.closest('.on-sl2').find('.swiper_btn.on-prvx')[0],
                    },
                    pagination: {
                        el: $container.closest('.on-sl2').find('.swiper-pagination')[0],
                        type: 'progressbar',
                    },
                    breakpoints: {
                        1240: { slidesPerView: 4, spaceBetween: 20 },
                        768: { slidesPerView: 3, spaceBetween: 15 },
                        600: { slidesPerView: 1.8, spaceBetween: 15 }
                    }
                });

                $container.data('swiper', swiper);

                /* -----------------------------------
                 슬라이드 수에 따른 제어
                 ----------------------------------- */
                function updateTalkSwiperState() {
                    const realSlideCount = $container.find('.swiper-slide:not(.swiper-slide-duplicate)').length;
                    const viewCount = Math.ceil(getTalkSlidesPerView());
                    const $paging = $container.closest('.on-sl2').find('.swiper-pagination');

                    if (realSlideCount <= viewCount) {
                        $paging.hide();
                        swiper.allowTouchMove = false;

                        $(swiper.navigation.nextEl).css("pointer-events", "none");
                        $(swiper.navigation.prevEl).css("pointer-events", "none");

                        if (swiper.autoplay && swiper.autoplay.running) {
                            swiper.autoplay.stop();
                        }

                        swiper.slideTo(0, 0);
                        swiper.setTranslate(0);
                    } else {
                        $paging.show();
                        swiper.allowTouchMove = true;

                        $(swiper.navigation.nextEl).css("pointer-events", "");
                        $(swiper.navigation.prevEl).css("pointer-events", "");

                        if (swiper.autoplay) swiper.autoplay.start();
                    }
                }

                updateTalkSwiperState();
                $(window).on('resize', updateTalkSwiperState);
            });
        }

        /* -----------------------------------
         페이지 로드 시 전체 초기화
         ----------------------------------- */
        $(function () {
            initTalkSwipers($('.on-tlkx-sctx .on-mv-tlkx'));
        });

    }



    // 클리닉> 온리움 선택 이유
    if ($('.on-spcx-sctx').length > 0) {

        // GSAP matchMedia 설정
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1241px)", () => {
            // PC 버전
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".on-spcx-sctx",
                    start: "top center+=15%",
                    end: "top center-=50%",
                    scrub: 0,
                    pin: false
                }
            }).to(".on-spcx-sctx .on-tt3 span:nth-child(1)", {x: "-57rem"}, 0).to(".on-spcx-sctx .on-tt3 span:nth-child(2)", {x: "38rem"}, 0);
        });

        mm.add("(min-width: 769px)", () => {
            $('.on-spcx-sctx .on-ls ul li').each(function (idx, li) {
                ScrollTrigger.create({
                    trigger: li,
                    start: "top center+=10%",
                    end: "bottom center+=10%",
                    onEnter: function () {
                        $('.on-spcx-sctx .on-ls ul li').removeClass('active');
                        $(li).addClass('active');
                    },
                    onEnterBack: function () {
                        $('.on-spcx-sctx .on-ls ul li').removeClass('active');
                        $(li).addClass('active');
                    },
                    markers: false
                });
            });

        });

    }


    // 클리닉 >  FAQ
    $('.on-llcx-wr .on-it .on-qx').on('click', function () {
        var $answer = $(this).next('.on-ax');
        var $clickedQ = $(this);
        
        $(this).toggleClass('active');  // active 클래스 토글
        if ($answer.is(':visible')) {
            $answer.slideUp(200, function () {
                // 애니메이션 완료 후 ScrollTrigger refresh
                ScrollTrigger.refresh();
            });
            $(this).removeClass('active');  // 닫힐 때 active 클래스 제거
        } else {
            $(this).closest('.on-llcx-wr').find('.on-qx').removeClass('active');  // 다른 질문의 active 클래스 제거
            $(this).closest('.on-llcx-wr').find('.on-ax:visible').slideUp(200);
            $answer.slideDown(200, function () {
                // 애니메이션 완료 후 ScrollTrigger refresh
                ScrollTrigger.refresh();
            });
            $(this).addClass('active');  // 열릴 때 active 클래스 추가
            
            // 0.2초 뒤에 답변 영역 상단으로 부드럽게 스크롤
            setTimeout(function() {
                // 헤더 높이 계산 (있다면)
                var headerHeight = $('.on-hd2').length ? $('.on-hd2').outerHeight() : 0;
                var answerTop = $answer.offset().top - headerHeight - 100; // 20px 여백 추가
                
                // PC에서는 Lenis 사용, 모바일에서는 jQuery animate 사용
                if (window.innerWidth > 1240 && typeof window.lenis !== 'undefined' && window.lenis && typeof window.lenis.scrollTo === 'function') {
                    // Lenis가 정상적으로 동작 중인지 확인
                    try {
                        window.lenis.scrollTo(answerTop, {
                            duration: 0.8,
                            easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
                        });
                    } catch (e) {
                        // Lenis 에러 발생 시 jQuery로 폴백
                        $('html, body').animate({
                            scrollTop: answerTop
                        }, 800, 'easeInOutQuad');
                    }
                } else {
                    $('html, body').animate({
                        scrollTop: answerTop
                    }, 800, 'easeInOutQuad');
                }
            }, 200);
        }
    });

    if ($(".calendar").length > 0) {
        $(".calendar").datepicker({
            dateFormat: "yy/mm/dd",
            showMonthAfterYear: true,
            closeText: "닫기",
            currentText: "오늘",
            prevText: '이전 달',
            nextText: '다음 달',
            monthNames: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            monthNamesShort: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            weekHeader: "주",
            yearSuffix: " /",
            minDate: 1, // 내일부터 가능
            onSelect: function (dateText, inst) {
                $(this).siblings(".on-plcx").css("opacity", 0);
            },

        });
    }


    //-----포인터 스크립트-----


    if ($(".on-clnx-tp .on-ytbx-ar .on-pntx2").length > 0) {
        var pointerSize = $(".on-clnx-tp .on-ytbx-ar .on-pntx2").width() / 2;
        var businessItems = $(".on-clnx-tp .on-ytbx-ar a");
        var isPointerInside = false;

        if ($('.on-clnx-tp .on-ytbx-ar a').attr('href') != 'javascript:void(0);') {

            businessItems.on("mouseenter", function (e) {
                $('.on-clnx-tp .on-ytbx-ar .on-pntx2').css({
                    'transform': 'translate3d(' + (e.pageX - pointerSize) + 'px,' + (e.pageY - pointerSize) + 'px, 0)'
                });
                $('.on-clnx-tp .on-ytbx-ar .on-pntx2').addClass("on");
            });

            businessItems.on("mouseleave", function () {
                $('.on-clnx-tp .on-ytbx-ar .on-pntx2').removeClass("on");
            });

            const $businessPointer = document.querySelector('.on-clnx-tp .on-ytbx-ar .on-pntx2');
            document.addEventListener('mousemove', function (e) {
                $businessPointer.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
            });
        }

        // 클릭 시 iframe 재생
        businessItems.on("click", function(e) {
            e.preventDefault();
            var $iframe = $(this).siblings('iframe');
            var src = $iframe.attr('src');

            // autoplay 파라미터 추가
            if (src.indexOf('?') > -1) {
                $iframe.attr('src', src + '&autoplay=1');
            } else {
                $iframe.attr('src', src + '?autoplay=1');
            }

            // 썸네일 숨기기
            $(this).hide();
        });
    }

    // 그래프 영역 터치 드래그 처리
    $('.on-grpx-sctx .on-grpx-ar').on('touchstart', function (e) {
        var startX = e.originalEvent.touches[0].clientX;
        $(this).data('startX', startX);
    }).on('touchend', function (e) {
        var startX = $(this).data('startX');
        var endX = e.originalEvent.changedTouches[0].clientX;
        var diff = Math.abs(endX - startX);

        // 50px 이상 드래그시 off 클래스 추가
        if (diff > 5) {
            $(this).addClass('off');
        }
    });

    // 그래프 영역 터치 off 처리
    $('.on-grpx-sctx .on-grpx-scr').on('touchstart', function () {
        $(this).addClass('off');
    });

    $('.on-clnx-tp .on-ytbx-ar a').click(function () {
        if ($(this).attr('href') != 'javascript:void(0);') {
            $(this).siblings().addClass('on');
            $(this).fadeOut(500);
            return false;
        }else {
            return false;
        }

    })

})

