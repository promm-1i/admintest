$(function(){

    /********** 공통 **********/ 
    let mobile = $('body').hasClass('mo_ver');

    // 슬라이드 모음
    let compareSlider = $('.macular .compare_wr'), 
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
                        slidesToShow: 1.15,
                        dots: true
                    }
                }
            ]
        };
    let graphSlider = $('.graph_slider'), 
        graphSettings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            speed: 1000,
            arrows: false,
            draggable: true,
            dots: true,
            // responsive: [
            //     {
            //         breakpoint: 768,
            //         settings: {
            //             draggable: true,
            //             slidesToShow: 1.15,
            //             dots: true
            //         }
            //     }
            // ]
        };
    $(window).on('load resize', function() {
        compareSlider.not('.slick-initialized').slick(compareSettings).slick('init');
        graphSlider.not('.slick-initialized').slick(graphSettings).slick('init');
    })

    $('.compare_slider').slick({
        slidesToShow: 1,
        speed: 1000,
        arrows: true,
        infinite: false,
        prevArrow : ".slider_wrap .prev",		// 이전 화살표 모양 설정
        nextArrow : ".slider_wrap .next",		// 다음 화살표 모양 설정
        dots: true,
        dotsClass: 'custom_paging',
        customPaging: function (slider, i) {
            return  ("0"+ (i + 1)) + '<span class="bar"></span>' + "0"+slider.slideCount;
        },
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    infinite: false,                    
                    speed: 100,
                }
            }
        ]
    })
    $('.recom_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        arrows: true,
        infinite: false,
    });
    $('.mo_ver .occurence_slider').slick({
        setPosition : 0,
        slidesToScroll: 1,
        speed: 400,
        arrows: false,
        infinite: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1.5
                }
            }
        ]
    });
    $('.mo_ver .type_slider').slick({
        setPosition : 0,
        slidesToScroll: 1,
        speed: 400,
        arrows: false,
        infinite: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2.2
                }
            }
        ]
    });
    $('.mo_ver .corneal_slider').slick({
        setPosition : 0,
        slidesToScroll: 1,
        speed: 400,
        arrows: false,
        infinite: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2.2
                }
            }
        ]
    });
    $('.mo_ver .nearsight_slider').slick({
        setPosition : 0,
        slidesToScroll: 1,
        speed: 400,
        arrows: false,
        infinite: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1.1
                }
            }
        ]
    });


    

    /********** Treatment Center **********/ 
    $(window).on("scroll", function () {
        let sct = $(window).scrollTop();

        if($('.content_wrapper').hasClass('intro')){
            let targetSection = $('.sec_intro');
            let targetBg = targetSection.find('.bg');
            let ost1 = $('.sec_list').offset().top;
            let ost2 = $('.sec_inner').offset().top;
            let hh = $(window).height();
            
            // if(targetSection.length){
            //     // sec02 배경 천천히 올라오기
            //     if(!$('body').hasClass("mo_ver")){ // pc
            //         let bg_moving_pc = Math.min(Math.max((sct-ost1+hh)/-30, 0), 50);
            //         targetBg.css({bottom: `${bg_moving_pc}vw`})
            //     } else { // mo
            //         let bg_moving_mo = Math.min(Math.max(-(sct-ost2)/5, 0), 170);
            //         targetBg.css({bottom: `${bg_moving_mo}vw`})
            //     }
            // }
    
            // sec03 등장 타이밍에 배경 변경
            if($('.sec_list').hasClass('ani_view')){
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


    /********** smile **********/ 
    if($('.dry_eye').length){
        // sec02 check box
        $('.sec02 .card_wr2 .cont').click(function(){
            $(this).toggleClass('check');
        })


        if(mobile){
            // sec03 article cont 클릭 - only mo
            $('.sec03 .step_wrap .card_wr .cont').click(function(){
                $('.sec03 .step_wrap .card_wr .cont').removeClass('on');
                $(this).addClass('on');
            });
            // sec03 article - step_wrap 'ani_load btt' 클래스 추가 - only mo    
            $('.sec03 .step_wrap .step_ul li').addClass('ani_load btt');
        }

    }

})