$(function(){

    // aside 노출
    // if($('.content_wrapper').hasClass('main')){
    //     $('#sidebar').addClass('act')
    // }
    // setTimeout(function() {
    //     $('#sidebar.first').removeClass('first act');
    // }, 3000);
    
    // 팝업 비활성 이후 인터렉션 실행
    $('#sidebar_btn').addClass('hidden');
    if(!$('#main_popup').length || !$('#main_popup').hasClass('act')){
        $('.sec01').addClass('start');
        sideBtnShow();
    } else {
        $('#main_popup .pop_bg, #main_popup .pop_close').click(function(){
            $('.sec01').addClass('start');
            sideBtnShow();
        })
    }
    function sideBtnShow(){
        setTimeout(function() {
            $('#sidebar_btn').removeClass('hidden')
        }, 7000);
    }

    
    $(window).on("scroll", function(){
        var sct = $(window).scrollTop();

        // mo 헤더 숨김
        // if($('body').hasClass('mo_ver')){
        //     if(sct > $('.main .sec01 > .rel').offset().top){
        //         // $('body').addClass('s_up')
        //         $('#header').removeClass('hide')
        //     } else {
        //         $('#header').addClass('hide')
        //     }
        // }
    });
    // lnb 클릭시 헤더 hide 해제
    $('.lnb_btn').click(function(){
        if($('body').hasClass('mo_ver')){
            setTimeout(function(){
                $('#header').removeClass('hide')
            }, 10)
        }
    })

    // 슬라이드 
    var riview_slider = $('.review_cont .tab_cont'),
        sort_slider = $(".sort_wr"),
        reviewSettings = {
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 1000,
            arrows: false,
            infinite: false,
            draggable: true,
            slides: 'li',        
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        draggable: true,
                        slidesToShow: 1.1,
                        dots: true,
                        speed: 100,
                    }
                }
            ]
        },
        sortSettings = {
            dots: false,
            responsive: [
                {
                    breakpoint: 9999,
                    settings: "unslick"
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 100,
                        arrows: false,
                        infinite: false,
                        dots: true,
                        appendDots : $('.sort_wr + .slick-dots'),
                    }
                }
            ]
        };
    // resize
    $(window).on('load resize', function() {
        // review
        riview_slider.not('.slick-initialized').slick(reviewSettings).slick('init');
        // sort
        sort_slider.not('.slick-initialized').slick(sortSettings);
        sort_slider.slick('reinit');
        sort_slider.on('init reInit afterChange', function(event, slick, currentSlide) {
            // $('.sort_wr .sort').eq(currentSlide).trigger('mouseover')
            // $(".sort_wr .sort").toggleClass("slick-active", event.type === 'mouseenter');
        })
    });

    // sec_sns click 
    const snsItems = document.querySelectorAll('.sns_wr > a');
    snsItems.forEach((snsItem) => {
        if(snsItem.getAttribute('href') === ''){
            snsItem.classList.add('no_link');
            snsItem.addEventListener('click', (e) => {
                e.preventDefault();
            })
        }
    })

})

$(window).load(function(){
    if($('.content_wrapper').hasClass('main')){
        // 헤더 숨김
        // if($('body').hasClass('mo_ver')){
        //     $('#header').addClass('hide')
        // }
    }
})
