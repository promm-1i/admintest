$(function(){ 
        
    /********** 공통 **********/ 
    let mobile = $('body').hasClass('mo_ver');
    
    // 추천 슬라이드 
    $('.recom_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        arrows: true,
        infinite: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    speed: 100,
                }
            },
        ]
    });

    if($('#floating_btn .sub_txt').length){
        var pageTit;
        if($('h2.no_tit').length){
            pageTit = document.querySelector('.sub_tit h2.no_tit').innerText.replace('\n',' ')
        } else {
            pageTit = document.querySelector('.sub_tit h2').innerText.replace('\n','')
        }
        $('#floating_btn .page_tit').text(pageTit);
    }

    /********** 스마일 팝업 **********/ 
    // smile Popup MoVer - unslick
    if(mobile){
        $(window).on('load resize', function(){
            $('#floating').find('.notice_slider').slick('unslick');
            $('#floating').find('.event_slider').slick('unslick');
        });
    }
    // $('#floating .faq_cont .tit_wr').on('click',function(){
    //     $(this).parents('.cont').siblings().removeClass('on');
    //     $(this).parents('.cont').toggleClass('on');
    // });

    $(window).on("scroll", function (e) {
        var sct = $(window).scrollTop();
        
        /********** 스마일 **********/ 
        if($('.content_wrapper').hasClass('smile')){
            if(mobile){
                // sec_card
                let animateTarget = $('.card_wr.n2 .opacity');
                let ofs = $('.card_wr.n2').offset().top;
                let $opacity = 0;

                if (ofs < sct) { // 상단 
                    $opacity = 1 - Math.min(Math.max((sct - ofs) / 600, -1.3), .8)
                    animateTarget.each(function(){
                        $(this).css({
                            opacity: $opacity
                        })
                    })
                }
            }
        }

        /********** 수술센터 메인 **********/ 
        if($('.content_wrapper').hasClass('operation_center')){
            
            // sec02 배경 천천히 올라오기
            let targetSection = $('.sec_intro');
            let targetBg = targetSection.find('.bg');
            let ost1 = $('.sec_recommend').offset().top;
            let ost2 = $('.sec_inner').offset().top;
            let hh = $(window).height();
            
            // if(targetSection.length){
            //     if(!$('body').hasClass("mo_ver")){ // pc
            //         let bg_moving_pc = Math.min(Math.max((sct-ost1+hh)/-30, 0), 50);
            //         targetBg.css({bottom: `${bg_moving_pc}vw`})
            //     } else { // mo
            //         let bg_moving_mo = Math.min(Math.max(-(sct-ost2)/5, 0), 170);
            //         targetBg.css({bottom: `${bg_moving_mo}vw`})
            //     }
            // }

            // sec03 등장 타이밍에 배경 변경
            if($('.sec03').hasClass('ani_view')){
                targetSection.addClass('end')
            } else {
                targetSection.removeClass('end')
            }

            // sec02 이미지 빠르게 올라오기
            let targetImg = $('.sec_intro .img_wr');
            let img_moving = Math.min(Math.max((sct-ost1+hh)/-15, -25), 100);
            if(!$('body').hasClass("mo_ver")){ // pc
                // targetImg.css({marginTop: `${img_moving}%`})
                targetImg.css({transform: `translateY(${img_moving}%)`})
            } else { // mo
                // 이미지 구조 변경
                targetImg.insertAfter($('.sec_intro .tit_5'))
            }
        }

    });

    // 슬라이드 모음
    const compareSlider = $('.compare_wr.slide_ver'), 
        compareSettings = {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            speed: 1000,
            arrows: false,
            draggable: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        draggable: true,
                        slidesToShow: 1.1,
                    }
                }
            ]
        };
    const implantationSlider = $('.lens .implantation_wr'), 
    implantationSettings = {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        speed: 1000,
        arrows: false,
        draggable: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    draggable: true,
                    slidesToShow: 1.15,
                    dots: true,
                }
            }
        ]
    };
    const artificialSlider = $('.artificial .kind_list'), 
    artificialSettings = {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        speed: 1000,
        autoplay:false,
        arrows: false,
        draggable: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    draggable: true,
                    slidesToShow: 1,
                    arrows: true,
                    swipeToSlide: false,
                }
            }
        ]
    };
    const artificialSlider02 = $('.sec_tab .chk_list + .img_wr'), 
    artificialSettings02 = {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        speed: 1000,
        arrows: false,
        draggable: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    draggable: true,
                    slidesToShow: 1.38,
                }
            }
        ]
    };
    const artificialSlider02_02 = $('.sec_tab .main_txt + .img_wr'), 
    artificialSettings02_02 = {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        speed: 1000,
        arrows: false,
        draggable: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    draggable: true,
                    slidesToShow: 1.38,
                }
            }
        ]
    };
    const artificialSlider03 = $('.sec_compare .compare_wr'), 
        artificialSettings03 = {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            speed: 1000,
            arrows: false,
            draggable: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        draggable: true,
                        slidesToShow: 1.02,
                    }
                }
            ]
        };
    const lasikSlider = $('.lasik .compare_wrap'), 
        lasikSettings = {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        speed: 1000,
        arrows: false,
        draggable: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    draggable: true,
                    slidesToShow: 1.2,
                }
            }
        ]
    };
    const lasikSlider02 = $('.la_ .sec_analyze .img_list'), 
        lasikSettings02 = {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: false,
        speed: 1000,
        arrows: false,
        draggable: false,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    draggable: true,
                    slidesToShow: 1.2,
                    dots: true,
                }
            }
        ]
    };
    const lasekSlider = $('.lasek .sec_gray .detail_wr.mo'), 
        lasekSettings = {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: false,
        speed: 1000,
        arrows: false,
        draggable: false,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    draggable: true,
                    slidesToShow: 1.2,
                    dots: true,
                }
            }
        ]
    };
    const lasekSlider02 = $('.lasek .sec_ect .box_list'), 
        lasekSettings02 = {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: false,
        speed: 1000,
        arrows: false,
        draggable: false,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    draggable: true,
                    slidesToShow: 1.3,
                }
            }
        ]
    };

    $(window).on('load resize', function() {
        compareSlider.not('.slick-initialized').slick(compareSettings).slick('init');
        implantationSlider.not('.slick-initialized').slick(implantationSettings).slick('init');
        artificialSlider.not('.slick-initialized').slick(artificialSettings).slick('init');
        artificialSlider02.not('.slick-initialized').slick(artificialSettings02).slick('init');
        artificialSlider02_02.not('.slick-initialized').slick(artificialSettings02_02).slick('init');
        artificialSlider03.not('.slick-initialized').slick(artificialSettings03).slick('init');
        lasikSlider.not('.slick-initialized').slick(lasikSettings).slick('init');
        lasikSlider02.not('.slick-initialized').slick(lasikSettings02).slick('init');
        lasekSlider.not('.slick-initialized').slick(lasekSettings).slick('init');
        lasekSlider02.not('.slick-initialized').slick(lasekSettings02).slick('init');
    })

    /********** smile **********/ 
    if($('.smile').length){
        if(!mobile){
            // sec04 pocus 스크롤 매직
            var controller = new ScrollMagic.Controller();
            var card = new TimelineMax()
            .to(".card_wr.n2 .opacity", { opacity: "0.2", duration: 1, ease: Linear.easeNone }, 1)
            .to(".card_wr.n2 .info", { opacity: "1", duration: 1, ease: Linear.easeNone }, 1);
            
            // build scene
            new ScrollMagic.Scene({
                triggerElement: ".sec04 .card_wr.n2",
                triggerHook: "onLeave",
                duration: "120%"
            })
            .setPin(".sec04 .card_wr.n2")
            .setTween(card)
            .addTo(controller);   
        }
    }

    /********** lens **********/ 
    if($('.lens').length){
        $('.point_wr .pop_open').click(function(){
            $(this).addClass('open')
            $(this).closest($('.img_box.abs')).addClass('zind_99')
        })
        $('#lens02 .pop_close').click(function(){
            $('.point_wr .pop_open').removeClass('open')
            $('.img_box.abs').removeClass('zind_99')
        })

        if(mobile){
            $('.sec04 .how_list, .sec04 .info_l .txt').removeClass('ani_load');
        }

        //팝업 z-index
        // if($('.sec_tab_cont.n2 .pop_open').hasClass('open')){
        //     console.log('ddddd')
        // }

    }

    /********** operation_center **********/ 
    if($('.operation_center').length){

        // GSAP3 Target object not found 방지
        gsap.config({
            nullTargetWarn: false,
        }); 

        // sec05 이미지 퍼짐
        if ($('.operation_center .sec05').length) {
            var i_t = mobile ? '0' : '-50rem';
            var controller = new ScrollMagic.Controller();
            var image = new TimelineMax()
                .to(".sec05 .inner", { top: i_t, duration: 5, ease: Linear.ease }, 1)
                .to(".i_wr .l_2", { top: '19vw', left: '22.5vw', duration: 1, ease: Linear.ease }, 1)
                .to(".i_wr .l_3", { top: '10vw', left: 0, duration: 1, ease: Linear.ease }, 1)
                .to(".i_wr .l_4", { bottom: '-11vw', left: '12.5vw', duration: 1, ease: Linear.ease }, 1)
                .to(".i_wr .l_5", { bottom: '-19.1vw', left: '19vw', duration: 1, ease: Linear.ease }, 1)
                .to(".i_wr .r_6", { bottom: '-2.5vw', right: '11vw', duration: 1, ease: Linear.ease }, 1)
                .to(".i_wr .r_7", { bottom: '9vw', right: 0, duration: 1, ease: Linear.ease, onComplete: function () { $('.mo_ver .intro .sec05 .t_wr').addClass('on'); } }, 1)
            // build scene
            new ScrollMagic.Scene({
                triggerElement: '.operation_center .sec05',
                triggerHook: "onLeave",
                duration: "100%"
            })
                .setPin('.operation_center .sec05')
                .setTween(image)
                .addTo(controller);
        }

         // sec06 슬라이드
         $('.awards_slider').slick({
            setPosition : 0,
                slidesToShow: 2.6,
                slidesToScroll: 2,
                speed: 400,
                arrows: false,
                infinite: false,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 1.05,
                            slidesToScroll: 1,
                        }
                    }
                ]
        });
    }
    // 세이프티 백내장 모바일 팝업창 스크립트
    if($('.cataract').length){
        $('.pop_open').click(function (e) {
            e.preventDefault();
            $(".mo_pop_wr").removeClass("dis-no")
        })
        $('.pop_close').click(function () {
            $(this).parents('.mo_pop_wr').addClass('dis-no');
        })
    }
})