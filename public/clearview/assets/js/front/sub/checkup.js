$(function(){
    // intro
    $('.recom_slider').slick({
        autoplay: false,
        infinite: false,
        arrows: false,
        dots: true,
        slidesToShow: 3,
        centerMode:true,
        speed: 1000,
        responsive: [
            {
                breakpoint: 9999,
                settings: "unslick"
            },
            {
                breakpoint: 768,
                settings: {
                    centerPadding: 0,
                    slidesToShow: 1.07,
                    speed: 100,
                }
            },
        ]
    })

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
                targetImg.css({transform: `translateY(${img_moving}%)`})
            } else { // mo
                // 이미지 구조 변경
                targetImg.insertAfter($('.sec_intro .tit_5'))
            }
        }
    })
})