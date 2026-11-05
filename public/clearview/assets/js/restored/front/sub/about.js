$(function () {
    const mobile = $('body').hasClass('mo_ver');

    // 모바일인 경우, 가장 먼저 실행 - 인트로 슬라이드 스타일 변경
    if (mobile && $('.content_wrapper').hasClass('intro')) { // pc
        $('.intro .cont.n2 .cont_slider').append($('.intro .sec03 .cont.n2 .cont_box'));
    }

    // sec01 딜레이
    $('.img_show .img_box').each(function () {
        $(this).css({ transitionDelay: $(this).attr('data-delay') })
            .find('img').css({ transitionDelay: $(this).attr('data-delay') });
    });
    // sec01 인터렉션 종료 후 헤더 노출
    if (mobile && $('.content_wrapper').hasClass("about")) {
        $('#header').addClass('hide');
        const brandChk = $('.content_wrapper').hasClass("brand");
        const timeout = brandChk ? 7000 : 2600;
        let timer = setTimeout(() => {
            $('#header').removeClass('hide');
        }, timeout);
    }

    $(window).on("scroll touchmove mousewheel", function (e) {
        const mobile = $('body').hasClass('mo_ver');
        const sct = $(window).scrollTop();

        // sec02 스크롤
        $.each($('.ani_wr'), function (index, item) {
            var $ani_txt = $('.ani_txt'),
                ofs1 = $(this).offset().top - ($(this).height() * 0.7),
                ofs2 = $('.ani_wr.n1').offset().top - ($(this).height() * 0.7),
                $ani_box_n1 = $(this).find('.ani_box.n1'),
                $ani_box_n2 = $(this).find('.ani_box.n2'),
                $ani_box_n3 = $(this).find('.ani_box.n3');

            // 반응형 고려
            var num = $('.ani_wr.n1').height(), imgH = $('.ani_wr.n1 img').height() * .3,
                $350 = (num * 0.37), $400 = (num * 0.42),
                $440 = (num * 0.47), $550 = (num * 0.40), $700 = (num * 0.75),
                pos3 = ($('.ani_box.n3 .tit').offset().top) - ($('.ani_box.n1 .tit').offset().top);

            if (sct < ofs1) {
                $(this).removeClass('on off') // 배경 변경
            } else if (sct > ofs1 && sct < ofs1 + $(this).height()) {
                $(this).addClass('on').removeClass('off')
                if ($(window).width() > 767) {
                    $ani_box_n1.css({
                        'transform': `matrix(1, 0, 0, 1, 0, ${Math.min(Math.max((-$550 + sct - ofs1) * 1.1, 0), imgH)} )`
                    });
                    $ani_box_n2.css({
                        'transform': `matrix(1, 0, 0, 1, ${Math.min((-$350 + sct - ofs1) * 1.5, 0)}, ${Math.min(Math.max((-$400 + sct - ofs1) * 1.01, 0), imgH)})`
                    });
                    $ani_box_n3.css({
                        'transform': `matrix(1, 0, 0, 1, ${Math.min((-$350 + sct - ofs1) * 1.5, 0)}, ${Math.min(Math.max((-$440 + sct - ofs1) * 1.01, 0), imgH)})`
                    });
                    $ani_txt.css({
                        'transform': `matrix(1, 0, 0, 1, 0, ${Math.min(Math.max((-$700 + sct - ofs2) * 1.01, 0), pos3)} )`
                    });
                }
            } else {
                $(this).addClass('off').removeClass('on')
            }
        })

        // sec03 history 슬라이드 년도 active
        let historyOfs = $('.sec03').offset().top;
        if (mobile) {
            if (sct > historyOfs) {
                $('.history_slider').find('.slick-current').addClass('slick-active') // 첫 슬라이드 연도 활성화 
            } else {
                $('.history_slider').find('.slick-slide').removeClass('slick-active') // 첫 슬라이드 연도 활성화 
            }
        }

        // sec04-1 스크롤매직 반응형 고려
        var left = $(".magnif_wr").css('left') == '0px';
        var end = $(".sec04-1").parent('.scrollmagic-pin-spacer').css('padding-bottom') == '0px';
        let magnifWr = $(".magnif_wr");
        if (!left) {
            magnifWr.removeClass('on end')
        } else if (left && !end) {
            magnifWr.addClass('on').removeClass('end')
        } else if (left && end) {
            magnifWr.removeClass('on').addClass('end')
        }

        // sec04-1 모바일 버전
        // if (mobile && $('.content_wrapper').hasClass('brand')) {
        //     var ost = $('.brand .sec04-1').offset().top;
        //     var ost2 = ost + $('.brand .sec04-1').height() - $(window).height();
        //     let scrollBox = $(".scroll_box");
        //     if (sct < ost) {
        //         scrollBox.removeClass('fixed end');
        //     } else if (sct > ost && sct < ost2) {
        //         scrollBox.addClass('fixed').removeClass('end');
        //     } else {
        //         scrollBox.addClass('end').removeClass('fixed');
        //     }
        // }

        // if ($('.content_wrapper').hasClass('brand')) {
        //     var sec04_1 = $('.sec04-1 > .rel');
        //     var sec04_1Bg = sec04_1.find('.bg');
        //     var ost1 = sec04_1.offset().top;
        //     var ost2 = ost1 + sec04_1.outerHeight() - $(window).height();
        //     var img_moving = Math.min(Math.max((sct - ost1) / 30, 0), 20); 
    
        //     // sec04_1 배경 천천히 올라오기
        //     sec04_1Bg.css({
        //         bottom: `${img_moving - 20}vh`
        //     });
        //     // sec04_1 on
        //     if (sct < ost1) {
        //         sec04_1.removeClass('on end')
        //     } else if (sct > ost1 && sct < ost2) {
        //         sec04_1.removeClass('end').addClass('on')
        //     } else {
        //         sec04_1.removeClass('on').addClass('end')
        //     }
        // }

    });

    // GSAP3 Target object not found 방지
    gsap.config({
        nullTargetWarn: false,
    });

    // sec04 pocus
    if ($(".show_wr").length && $(window).width() > 767) {
        $(".show_wr").each(function () {
            var controller = new ScrollMagic.Controller();
            var focus = new TimelineMax();
            var showTexts = $(this).find('.show_txt');

            for (var i = 0; i < showTexts.length; i++) {
                focus.to(showTexts[i], { opacity: "1", duration: .8, ease: Linear.easeNone }, i + 1);
            }
            focus.fromTo(".magnif_wr", { width: '100vw' }, { width: '100vw', duration: .8, ease: Linear.easeNone }, showTexts.length + 1);

            // build scene
            new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: "onLeave",
                duration: "150%"
            })
                .setPin(this)
                .setTween(focus)
                .addTo(controller);

        });
    }

    // sec04 이미지 확대 스크롤매직 및 슬라이드
    const scrollBox = $(".scroll_box");
    scrollBox.slick({
        vertical: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        speed: 800,
        responsive: [
            {
                breakpoint: 9999,
                settings: "slick",
            },
            {
                breakpoint: 768,
                settings: {
                    vertical: false,
                    slidesToShow: 1.01,
                }    
                // settings: "unslick"
            }
        ]
    });
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
    function slick_handle_wheel_event(e, slick_instance, slick_is_animating) {
        if (!slick_is_animating && $('.magnif_wr').hasClass('on') && !mobile && scrollBox.css('opacity') == 1) { // 슬라이드 시작점 설정 
            var direction = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

            if (direction < 0) {
                slick_instance.slick("slickPrev");
            } else {
                slick_instance.slick("slickNext");
            }
        }
    }
    var slick_handle_wheel_event_debounced = debounce(
        slick_handle_wheel_event, 50, true
    );
    var scrollBox_is_animating = false;
    scrollBox.on("afterChange", function (index) {
        scrollBox_is_animating = false;
    });
    scrollBox.on("beforeChange", function (index) {
        scrollBox_is_animating = true;
    });
    $('.brand .sec04-1').on("scroll wheel mousewheel", function (e) { // pc
        slick_handle_wheel_event_debounced(e.originalEvent, scrollBox, scrollBox_is_animating);
    })
    // .on('touchstart', function (e) { // mobile
    //     var swipe = e.originalEvent.touches,
    //         start = swipe[0].pageY;

        // $(this).on('touchmove', function (e) {
        //     var contact = e.originalEvent.touches,
        //         end = contact[0].pageY, distance = end - start,
        //         idx = scrollBox.find('.slick-current').index();

        //         // console.log(e)
        //         console.log(distance)
        //     if (distance < 0) { // down
        //         scrollBox.slick("slickNext");
        //         scrollBox.on("afterChange", function (index, slick, currentSlide, nextSlide) {
        //             if (idx == slick.slideCount - 1) {
        //                 $(window).off('touchmove')
        //             }
        //         });
        //     } else if (distance > 0) { // up
        //         scrollBox.slick("slickPrev");
        //         scrollBox.on("afterChange", function (index) {
        //             if (idx == 0) {
        //                 $(window).off('touchmove')
        //             }
        //         });
        //     }
        // })
        // .on('touchend', function () {
        //     $(this).off('touchmove touchend');
        // });
    // });

    // $(window).on("scroll", function () {
    //     const sec04_1 = $(".brand .sec04-1");
    //     if($('body').hasClass('mo_ver') && sec04_1.length){
    //         const sct = window.scrollY - $('.sec04-1').offset().top;
    //         const totalH = $('.sec04-1').height();
    //         const length = $('.scroll_cont').length;
    //         let activeSlideIdx = -1; // 활성화될 슬라이드의 인덱스 초기화
    //         for(let i = 0; i < length; i++){
    //             if(sct > (totalH / (length + 1.5)) * i){
    //                 activeSlideIdx = i;
    //             }
    //         }
    //         if (activeSlideIdx !== -1) {
    //             scrollBox.slick('slickGoTo', activeSlideIdx);
    //         }
    //     }
    // })

    var sec04_1 = $(".brand .sec04-1");
    if (sec04_1.length && $(window).width() > 767) {
        var controller = new ScrollMagic.Controller();
        var magnif = new TimelineMax()
            .to(".magnif_wr", 200, { left: 0, bottom: 0, duration: 2, ease: Linear.easeNone}, 0)
            .to(".magnif_wr > .txt", 100, { 'font-size': 0, 'padding': 0, opacity: '0', duration: .3, ease: Linear.easeNone }, { onComplete: $('.scroll_box').removeClass('magnif_comlete') }, 0)
            .fromTo(".magnif_cont", 500, { scale: 0.2 }, { scale: 1, duration: 10, ease: Back.easeOut}, 100)
            .fromTo(".magnif_cont img", 500, { scale: 1.2 }, { scale: 1, duration: 10, ease: Linear.easeNone }, 100)

            .fromTo(".scroll_box", 100, { opacity: 0, visibility: 'hidden', filter: 'blur(5px)' }, { opacity: 1, visibility: 'visible', filter: 'blur(0)', ease: Power2.easeInOut, duration: 2, onStart: function () { scrollBox.slick('init'); scrollBox.slick('slickGoTo', 0); $('.scroll_box').removeClass('end'); }, onComplete: function () { $('.scroll_box').addClass('end'); } }, 400)
            .fromTo(".scroll_box", 1500, { fontSize: '1rem' }, { fontSize: 0, ease: Linear.easeNone, duration: 2 }, 400) // 시간끌기용

        new ScrollMagic.Scene({
            triggerElement: ".sec04 .txt_wr",
            triggerHook: "onLeave",
            duration: "600%",
        })
            .setPin(".sec04-1")
            .setTween(magnif)
            .addTo(controller);
    }

    // sec05 가로스크롤 스크롤 매직
    if ($(".brand .sec05").length && $(window).width() > 767) {
        $(".brand .sec05 .inner").each(function () {
            var controller = new ScrollMagic.Controller();
            var vertical = new TimelineMax()
                .to(".brand .sec05 .inner", 15, { left: '-155%', duration: 5, ease: Linear.ease, onStart: function () { $('.cont').removeClass('act') } }, 1)
                .to(".cont.n2 .img_box img", 5, { opacity: "1", duration: 2, ease: Power2.ease, onStart: function () { $('.cont.n2').addClass('act') } }, 2)
                .to(".cont.n3 .img_box img", 9, { opacity: "1", duration: 2, ease: Power2.ease, onComplete: function () { $('.cont.n3').addClass('act') } }, 3)

            // build scene
            new ScrollMagic.Scene({
                triggerElement: ".sec05",
                triggerHook: "onLeave",
                duration: "250%"
            })
                .setPin(".sec05")
                .setTween(vertical)
                .addTo(controller);
        });
    }

    // sec06 sns 슬라이드
    $('.yout_slider').slick({
        infinite: false,
        slidesToShow: 2.4,
        slidesToScroll: 1,
        speed: 1000,
        arrows: false,
        autoplay: false,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.1
                }
            }
        ]
    });
    $('.insta_slider').slick({
        infinite: false,
        slidesToShow: 3.8,
        slidesToScroll: 1,
        speed: 1000,
        arrows: false,
        autoplay: false,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.6
                }
            }
        ]
    });
    $('.tiktok_slider').slick({
        infinite: false,
        slidesToShow: 4.2,
        slidesToScroll: 1,
        speed: 1000,
        arrows: false,
        autoplay: false,
        draggable: false,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.6
                }
            }
        ]
    });


    ///////////////////// introduce

    if ($('.content_wrapper').hasClass('intro')) {
        $(window).on("scroll", function () {
            var sct = $(window).scrollTop();
            var sec02 = $('.sec02');
            var sec02Bg = sec02.find('.bg');
            var ost1 = sec02.offset().top;
            var ost2 = ost1 + sec02.outerHeight() - $(window).height();
            var img_moving = Math.min(Math.max((sct - ost1) / 130, 0), 20); // pc
            if (mobile) { // mo
                img_moving = Math.min(Math.max((sct - ost1) / 80, 0), 20);
            }

            // sec02 배경 천천히 올라오기
            sec02Bg.css({
                // top: `-${img_moving}v${mobile ? 'h' : 'w'}`
                bottom: `${img_moving - 20}vh`
              });

            // sec02 on
            if (sct < ost1) {
                sec02.removeClass('on end')
            } else if (sct > ost1 && sct < ost2) {
                sec02.removeClass('end').addClass('on')
            } else {
                sec02.removeClass('on').addClass('end')
            }

            // sec02 각 요소 opacity
            $.each($('.s_wr .s_img'), function (index, item) {
                var $this = $(this);
                var ofs = $this.offset().top * 0.9;
                if (sct > ofs) {
                    var idx = $this.index();
                    $('.f_txt').removeClass('show').eq(idx).addClass('show')
                }
            })
        })

        // mo sec02 재배치 
        if (mobile) {
            $.each($('.intro .sec02 .f_txt'), function (index, item) {
                $('.intro .sec02 .s_img').eq(index).append(item);
            })
        }

        // 슬라이드
        let intro_slider = $('.intro_slider'),
            year_slider = $('.year_slider'),
            history_slider = $('.history_slider'),
            cont_slider = $('.cont_slider'),
            introSettings = {
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 1000,
                arrows: true,
                autoplay: true,
                autoplaySpeed: 3000,
            },
            yearSettings = {
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 1000,
                arrows: true,
                autoplay: false,
                rtl: true,
                slide: '.year_slide',
                swipeToSlide: true,
                prevArrow: $(".arrow_wr .slick-prev"),
                nextArrow: $(".arrow_wr .slick-next"),
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            swipeToSlide: false,
                        }
                    }
                ]
            },
            historySettings = {
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 1000,
                arrows: false,
                rtl: true,
                asNavFor: year_slider,
            },
            contSettings = {
                mobileFirst: true,
                slides: 'ul',
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                speed: 1000,
                arrows: false,
                adaptiveHeight: true,
                asNavFor: year_slider,
                draggable: true,
                rtl: true,
                responsive: [
                    {
                        breakpoint: 9999,
                        settings: "unslick"
                    },
                    {
                        breakpoint: 768,
                        settings: "slick"
                    }
                ]
            };


        $(window).on('load resize', function () {
            //sec02 인트로 슬라이드
            intro_slider.not('.slick-initialized').slick(introSettings).slick('init');
            intro_slider.each(function () {
                var $total = $(this).siblings('.abs_wr').find('.total'),
                    $current = $(this).siblings('.abs_wr').find('.current');

                $total.text(`0${$(this).find('.slick-slide').length}`); // 초기
                $(this).on('init reInit afterChange', function (event, slick, currentSlide) {
                    var i = (currentSlide ? currentSlide : 0) + 1;
                    $current.text(`0${i}`);
                });
            })
            //sec03 히스토리 슬라이드1
            year_slider.not('.slick-initialized').slick(yearSettings).slick('init');
            year_slider.on('init reInit beforeChange', function (event, slick, currentSlide, nextSlide) {
                history_slider.slick('slickGoTo', nextSlide);
                var target = nextSlide;
                $('.year_slide').removeClass('on')
                if (!mobile) { // pc
                    for (var i = 0; i < 7; i++) {
                        $('.year_slide').eq(target + i).addClass('on');
                    }
                } else { // mo
                    cont_slider.slick('slickGoTo', nextSlide);
                    for (var i = 0; i < 3; i++) {
                        $('.year_slide').eq(target + i).addClass('on');
                    }
                }
            })
            $('.year_slide').addClass('on')
            $('.year_slide').click(function () {
                var idx = $(this).index();
                year_slider.slick('slickGoTo', idx);
            })
            //sec03 히스토리 슬라이드2
            history_slider.not('.slick-initialized').slick(historySettings).slick('init');
            history_slider.find('.slick-slide').removeClass('slick-active') // 첫 슬라이드 연도 활성화 
            history_slider.on('init reInit beforeChange', function (event, slick, currentSlide, nextSlide) {
                year_slider.slick('slickGoTo', nextSlide);
            })
            // sec03 히스토리 슬라이드3 
            // 스타일 변경
            if (!mobile) { // pc
                $('.year_slide:nth-child(n+8)').removeClass('on');
            } else { // mo
                $('.year_slide:nth-child(n+4)').removeClass('on');
                // 레이아웃 변경
                cont_slider.not('.slick-initialized').slick(contSettings).slick('init');
            }
        });

        // sec03 가로스크롤 스크롤 매직
        if ($(".intro .sec03").length && !mobile) {
            $(".intro .sec03 .inner").each(function () {
                var controller = new ScrollMagic.Controller();
                var vertical = new TimelineMax()
                    .fromTo(".intro .sec03 .inner", { left: 0 }, { left: 0, duration: 1, ease: Linear.ease, onStart: function () { $('.sec03 .cont').removeClass('on'); }, onComplete: function () { $('.sec03 .cont').removeClass('on'); } })
                    .fromTo(".intro .sec03 .inner", { left: 0 }, { left: '-8%', duration: 5, ease: Linear.ease, onComplete: function () { $('.sec03 .cont.n2').addClass('on'); $('.history_slider .history_slide:nth-child(1)').addClass('slick-active') } })
                    .fromTo(".intro .sec03 .inner", { left: '-8%' }, { left: '-105%', duration: 10, ease: Linear.ease, onComplete: function () { $('.sec03 .cont.n3').addClass('on'); } })
                    .to(".intro .sec03 .cont.n3 span", { margin: 0, duration: 1, ease: Linear.ease, })
                    .fromTo(".intro .sec03 .inner", { left: '-105%' }, { left: '-160%', duration: 10, ease: Linear.ease, onComplete: function () { $('.sec03 .cont.n4').addClass('on'); } })
                    .fromTo(".intro .sec03 .inner", { left: '-160%' }, { left: '-350%', duration: 30, ease: Linear.ease, onComplete: function () { $('.sec03 .cont.n5').addClass('on'); } })
                // build scene
                new ScrollMagic.Scene({
                    triggerElement: ".sec03",
                    triggerHook: "onLeave",
                    duration: "500%"
                })
                    .setPin(".sec03")
                    .setTween(vertical)
                    .addTo(controller);
            });
        }

        // sec04 영상 커짐
        if ($(".intro .sec04 .i_box").length) {
            const duration = !mobile ? '150%' : '50%';
            $(".intro .sec04 .i_box").each(function () {
                var controller = new ScrollMagic.Controller();
                var iframe = new TimelineMax()
                    .to(".sec04 .i_box", 15, { scale: 1, duration: 5, ease: Linear.ease }, 1)
                    .to(".sec04 .t_box .tit", 15, { padding: '0 15vw', duration: 5, ease: Linear.ease, onComplete: function () { $('.mo_ver .intro .sec05 .t_wr').removeClass('on'); } }, 1)

                // build scene
                new ScrollMagic.Scene({
                    triggerElement: ".sec04",
                    triggerHook: "onLeave",
                    duration: duration
                })
                    .setPin(".sec04")
                    .setTween(iframe)
                    .addTo(controller);
            });
        }

        // sec05 이미지 퍼짐
        if ($('.intro .sec05 .i_wr')) {
            $(".intro .sec05 .i_wr").each(function () {
                var i_t = mobile ? '0' : '-50rem';
                var controller = new ScrollMagic.Controller();
                var image = new TimelineMax()
                    .to(".i_wr .t_l", { top: 0, left: 0, duration: 1, ease: Linear.ease }, 1)
                    .to(".i_wr .t_r", { top: 0, right: 0, duration: 1, ease: Linear.ease }, 1)
                    .to(".i_wr .c_l", { top: '11vw', left: '7.5vw', duration: 1, ease: Linear.ease }, 1)
                    .to(".i_wr .c_r1", { top: '15vw', right: '8vw', duration: 1, ease: Linear.ease }, 1)
                    .to(".i_wr .c_r2", { top: '26vw', right: '17vw', duration: 1, ease: Linear.ease }, 1)
                    .to(".i_wr .b_l", { bottom: '5vw', left: 0, duration: 1, ease: Linear.ease }, 1)
                    .to(".i_wr .b_r", { bottom: '10vw', right: 0, duration: 1, ease: Linear.ease, onComplete: function () { $('.mo_ver .intro .sec05 .t_wr').addClass('on'); } }, 1)
                // build scene
                new ScrollMagic.Scene({
                    triggerElement: this,
                    triggerHook: "onLeave",
                    duration: "80%"
                })
                    .setPin(this)
                    .setTween(image)
                    .addTo(controller);
            });
        }
    }
})

$(window).load(function () {
    $('.sec01').addClass('act');
    $('.intro .sec03 .inner').css({ left: 0 })
})