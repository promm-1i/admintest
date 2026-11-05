var mobile = $('body').hasClass('mo_ver');
var isTouchDevice = ('ontouchstart' in window)|| (navigator.maxTouchPoints > 0)|| (navigator.msMaxTouchPoints > 0);
if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
}
$(function () {

    /************************************ header ************************************/

    // lnb 
    $('#lnb .lnb_wr .dep1').click(function () {
        const $this = $(this);
        const $otherDep1 = $('#lnb .lnb_wr .dep1').not($this);

        if (!$this.hasClass('act')) {
            $otherDep1.removeClass('act gray').find('ul').slideUp();
            $this.addClass('act').find('ul').slideDown();
            $otherDep1.addClass('gray');
        } else {
            $this.removeClass('act gray').find('ul').slideUp();
        }
    })

    // gnb hover
    $('#gnb .dep1').not('.member').mouseenter(function () {
        $('#header').addClass('hover')
        $(this).addClass('hover')
        $(this).siblings().addClass('gray')
    }).mouseleave(function () {
        $('#header').removeClass('hover')
        $('#gnb .dep1').removeClass('gray hover')
    })

    // sidebar - today
    const today = new Date();
    const year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜

    if (month < 10) { month = '0' + month }
    if (date < 10) { date = '0' + date }

    $('#header .today').text(`${year}.${month}.${date}`);
    if ($('.reservation.write #date').length) {
        $('#date').attr('placeholder', `${year}-${month}-${date}`)
    }
    
    // top btn
    const nowUrl = window.location.href;

    if (!nowUrl.includes("admin")) {
        let topBtn = document.querySelector('.top_btn');
        if(topBtn) topBtn.addEventListener('click', toTop);
        function toTop(){
            window.scrollTo({ top: 0, behavior: 'smooth'})
        }
    } 

    /************************************ basic ************************************/

    // 준비중 얼럿
    $('.alert').click(function (e) {
        e.preventDefault();
        var text = $(this).attr('data-alert');
        if ($(this).attr('data-alert') == undefined) {
            alert('준비 중입니다.')
        } else {
            alert(text)
        }
    })

    // mo 확인
    function mo_chk() {
        if (window.innerWidth <= 767) {
            $('body').addClass('mo_ver');
        } else {
            $('body').removeClass('mo_ver');
        }
    }; mo_chk(); tab_style(); prog_init(); mobileChk();

    // resize 새로고침
    const delay = 300;
    let timer = null;
    let width = $(window).width();

    function handleResize() {
        if ($(window).width() !== width) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                location.reload();
            }, delay);
        }
    }

    if ($('.content_wrapper').hasClass('refresh')) {
        $(window).on('resize', handleResize);
    }

    // sub tit 활성화
    if ($('.sub').length) {
        $('.tab_list_wr .tab_list').each(function () {
            const $this = $(this);
            const tit = $('.sub_tit_wr .page_tit');

            if (tit.length) {
                if (tit.text() == $this.find('a').text()) {
                    $this.addClass('act')
                } else {
                    // $this.removeClass('act')
                }
            }
        })
    }
    if ($('.sub.equipment').length) { // 수술장비용
        $('.tab_list_wr .sec_tab_it').each(function () {
            const $this = $(this);
            const tit = $('.tab_tit');

            if (tit.length) {
                if (tit.text() == $this.find('a').text()) {
                    $this.addClass('act')
                } else {
                    $this.removeClass('act')
                }
            }
        })
    }

    // popup 
    $('.pop_open').click(function (e) {
        if ($(this).hasClass('lnb_btn')) { // lnb
            if (!$(this).hasClass('open')) { // open
                $(this).addClass('open');
                $('#lnb').addClass('act');
                $('#header').addClass('lnb_open');
                $('.header_wr').removeClass('hide')
                scrollDisable(); // body scroll 막기
                if ($('body').hasClass('mo_ver')) {
                    $('#quickbar').hide()
                }
            } else { // close
                $(this).removeClass('open')
                $('#header').removeClass('lnb_open');
                // $('#lnb').fadeOut();
                $('#lnb').removeClass('act');
                scrollAble();
                if ($('body').hasClass('mo_ver')) {
                    $('#quickbar').show()
                }
            }
        } else if ($(this).hasClass('sb_btn')) { // 문의하기 (사이드바)
            $('#sidebar').addClass('act');
        } else if ($(this).hasClass('fp_btn')) { // 플로팅 팝업
            $('#floating').addClass('act');
            $('#floating_btn .sub_txt').addClass('hide');
        } else {
            e.preventDefault();
            $("#" + $(this).data('popup')).addClass('act');
        }
    })
    $('.pop_close, .pop_bg, #sidebar .bg').click(function () {
        if ($(this).closest('.mu_pop').hasClass('sidebar')) {
            $('#sidebar').removeClass('act');
        } else if ($(this).closest('.mu_pop').hasClass('floating')) {
            $('#floating').removeClass('act');
            $('#floating_btn .sub_txt').removeClass('hide');
        } else {
            $(this).closest('.mu_pop').removeClass('act');
        }
    })

    // input radio button
    var radio = $('input[type="radio"]');
    radio.click(function () { // 체크 여부 확인
        var ip_rad = $(this).closest('.ip_rad');
        if ($(this).is(':checked')) {
            ip_rad.siblings().removeClass('act');
            ip_rad.addClass('act');
            if (ip_rad.closest('.input_box').siblings('.input_box').length) {
                ip_rad.closest('.input_box').siblings('.input_box').find('.ip_rad').removeClass('act')
            }
        } else {
            ip_rad.removeClass('act');
        }
    });
    radio.each(function () { // 사용 불가 설정
        var ip_chk = $(this).closest('.ip_rad, .ip_chk');
        if ($(this).is(':disabled')) {
            ip_chk.addClass('disabled')
        } else {
            ip_chk.removeClass('disabled')
        }
    })

    // tab hover
    $('.tab_list a').on('click mouseenter mouseleave', function (e) {
        var $this = $(this);
        var $target = $this.parent().siblings('.abs');
        var l = $this.parent().position().left;
        var w = $this.parent().innerWidth();
        const toggle = $this.closest('.tab_list_wr').hasClass('toggle');
        const init = $this.hasClass('slide_init')
        let slider;

        if (e.type == 'click') {
            var idx = $this.parent().index();
            $this.closest('.tab_list_wr').find('li').removeClass('act')
            $this.parent().addClass('act')
            if (toggle) { // toggle
                e.preventDefault();
                $('.tab_cont').hide().eq(idx).show();
            }
            if (init) { // slide 있는 경우 init
                const secTabIt = $this.parent().hasClass('sec_tab_it');
                const sliderWrapper = secTabIt ? $this.closest('.sec_tab_wr').siblings('.sec_tab_cont_wr') : $this.closest('.tab_list_wr').siblings('.tab_cont_wr');

                slider = sliderWrapper.find('.tab_cont').eq(idx).find('.slick-slider');
                slider.slick('setPosition'); slider.slick('setPosition'); // setPosition이 작동이 잘 되지 않아서 2번 작성
                prog_init();
            }
        } else if (e.type == 'mouseenter') {
            if (!toggle) {
                const act = $(this).parent().hasClass('act');
                if (!act) {
                    $('.tab_list.act').addClass('leave')
                }
            }
        } else if (e.type == 'mouseleave') {
            if (!toggle) {
                $('.tab_list.leave').removeClass('leave')
                const act = $(this).parent().hasClass('act');
                if (!act) {
                    $this = $(this).parent().siblings('.tab_list.act');
                    l = $this.position().left;
                    w = $this.innerWidth();
                }
            }
        }
        $target.stop().animate({
            width: w, left: l
        })
    })

    // section tab
    const secTabWrapper = $('.sec_tab_wr:not(.go_link)');
    secTabWrapper.on('click', '.sec_tab_it', function(e) {
        e.preventDefault();

        if(!secTabWrapper.hasClass('not_tab')){
            const $this = $(this);
            const idx = $this.index();
            const secTabItem = $this.closest('.sec_tab_wr').siblings('.sec_tab_cont_wr').find('.sec_tab_cont');
    
            $this.addClass('act').siblings().removeClass('act');
            secTabItem.hide().eq(idx).show();
    
            // sticky 있는 경우
            const stickyWrapper = secTabItem.find('.sticky_wr');
            if (stickyWrapper.length) {
                secTabItem.find('.sticky_cont:first-child').addClass('act').siblings().removeClass('act')
            }
    
            // slide 초기화
            $('.sec_tab_cont_wr .slick-slider').slick('setPosition')
        }
    })

    setTimeout(function(){
        if(location.hash === '#content'){
            const target = document.querySelector('#content').offsetTop;
            window.scrollTo({ top: target, behavior: 'smooth'})        
        }
    },700)

    // section toggle 
    $('.toggle_list .toggle_box:first-child').addClass('open').find('.toggle_cont').slideDown();
    $('.toggle_list .toggle_box').click(function () {
        if (!$(this).hasClass('open')) {
            if($('body').hasClass('mo_ver')){
                $(this).siblings().removeClass('open').find('.toggle_cont').hide();
                $(this).addClass('open').find('.toggle_cont').show();
            } else {
                $(this).siblings().removeClass('open').find('.toggle_cont').slideUp();
                $(this).addClass('open').find('.toggle_cont').slideDown();
            }
        } else {
            $(this).removeClass('open').find('.toggle_cont').slideUp();
            if($('body').hasClass('mo_ver')){
                $(this).find('.toggle_cont').hide();            
            } else {
                $(this).find('.toggle_cont').show();
            }
        }
    })

    // sticky 메뉴 이동
    if ($('.sticky_wr').length) {
        $('.sticky_wr .sticky_cont').click(function () {
            var idx = $(this).index();
            var target = $(this).closest('.sticky_wr').find('section');
            let targetTop = target.eq(idx).offset().top - 55;
            window.scrollTo({ top: targetTop, behavior: 'smooth' })
        })
    }

    // cursor
    const cursor = $(".cursor");
    const follower = $(".cursor_follower");
    const video_l = $("#eyeleft").get(0)
    const video_r = $("#eyeright").get(0)

    if (cursor.length) {
        let posX = 0,
            posY = 0;
        let mouseX = 0,
            mouseY = 0;

        TweenMax.to({}, 0.006, {
            repeat: -1,
            onRepeat: function () {
                posX += (mouseX - posX) / 9;
                posY += (mouseY - posY) / 9;

                TweenMax.set(cursor, {
                    css: {
                        left: posX - 0,
                        top: posY - 0
                    }
                });

                TweenMax.set(follower, {
                    css: {
                        left: mouseX,
                        top: mouseY
                    }
                });
            }
        });

        cursor.each(function(){
            if ($(this).hasClass('cursor_hover')) { // brand
                const $this = $(this);
                $('.cursor_area').mousemove(function (e, i) {
                    $this.addClass('show');
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                }).mouseleave(function () {
                    $this.removeClass('show')
                });
            } else { // main
                $(document).on("mousemove", function (e) {
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                });
            }
    
            if($('.content_wrapper').hasClass('main')){
                $('#eyes').mouseover(() => {
                    videoStartFn()
                }).mouseleave(() => {
                    videoPauseFn()
                });

                if(isTouchDevice){
                    $('.sec_around .cursor').addClass('pad_ver')
                    videoStartFn()
                } 
                    
                document.onwheel = (event) => {
                    const sct = $(this).scrollTop();
                    const windowH = $(window).height() / 2;
                    const aroundH = $(".sec_around").height() - windowH;
                    let aroundOfs = $('.sec_around').offset().top;
    
                    if(sct >= aroundOfs - windowH && sct <= aroundOfs + aroundH) {
                        if(event.target.classList.contains('around')){
                            videoStartFn()
                        } else {
                            videoPauseFn()
                        }
                    } else {
                        videoPauseFn()
                    }
    
                };
            }

        })
    }
    function videoStartFn(){
        cursor.addClass('not');
        if(video_l) video_l.play().catch(function(){});
        if(video_r) video_r.play().catch(function(){});
    }
    function videoPauseFn(){
        cursor.removeClass('not');
        if(video_l) video_l.pause();
        if(video_r) video_r.pause();
    }


    /************************************ scroll ************************************/

    var lastScrollTop = 0;
    $(window).on("scroll", function (e) {
        let sct = $(this).scrollTop();
        const wh = $(window).height();

        // scroll 방향 확인
        $('body').removeClass('s_down s_up')
        if (sct > lastScrollTop) {
            $('body').addClass('s_down');
            $('#quickbar').addClass('hide');
        } else {
            $('body').addClass('s_up');
            $('#quickbar').removeClass('hide');
        }
        lastScrollTop = sct;

        // sticky 활성화
        if ($('.sticky_wr').length) {
            $('.sticky_wr').each(function () {
                $(this).find('section').each(function (i) {
                    var ofs = $(this).offset().top - 60;
                    var stickyCont = $(this).closest('.sticky_wr').find('.sticky_box .sticky_cont');
                    if (ofs <= sct) {
                        stickyCont.removeClass('act')
                        stickyCont.eq(i).addClass('act')
                    }
                })
            })
        }

        // 문의하기 팝업 버튼 노출
        if (sct > 500) {
            $('.scroll_btn').addClass('show');
        } else {
            $('.scroll_btn').removeClass('show');
        }

        // scroll move txt
        $.each($('.move_txt, .mo_ver .ft_tit'), function (index, item) {
            var ofs = $(this).closest('.section').offset().top;
            var txt_moving = Math.round(Math.min(Math.max((sct - ofs) / -70, -5), 10));
            if ($(this).hasClass('ft_tit')) {
                txt_moving = -Math.round(Math.min(Math.max((sct - ofs) / 10, -70), 10))
            }
            $(this).css({
                transform: `translateX(${txt_moving}%)`
            })
        })
        // scroll move txt2
        if ($('body').hasClass('mo_ver')) {
            $.each($('.ani_txt_wr'), function (index, item) {
                // var ofs = ($(this).offset().top) * 0.95;
                var ofs = ($(this).offset().top) * 0.9;
                var txt_ltr = $(this).find('.ani_ltr');
                var txt_rtl = $(this).find('.ani_rtl');
                var ltr = Math.round(Math.min(Math.max((sct - ofs) / 8, -50), 0));
                var rtl = Math.round(Math.min(Math.max((sct - ofs) / -8, 0), 50));
                txt_ltr.css({
                    transform: `translateX(${ltr}%)`
                })
                txt_rtl.css({
                    transform: `translateX(${rtl}%)`
                })
            })
        }

        // 이미지 확대
        if ($('.magnif_cont').length) {
            const magnif_cont = $('.magnif_cont');
            magnif_cont.each(function () {
                let sct = $(window).scrollTop() - $(this).offset().top + $(window).height();
                let w = 0, b = 0;
                const magnif_wr = $(this).closest('.magnif_wr');

                if (magnif_wr.hasClass('ani_view')) {
                    if ($(this).offset().top < 500) { // 상단 
                        if (!$('body').hasClass('mo_ver')) { // pc
                            // w = Math.min(Math.max((sct / 10), 50), 100);
                            w = Math.min(Math.max((sct / 8), 50), 100);
                            b = sct * -1.1 + sct * 1.09 + 11
                        } else { // mo
                            w = Math.min(Math.max((sct / 5), 70), 100);
                            b = Math.max(sct * -1.3 + sct * 1.25 + 40, 0);
                        }
                    } else { // 상단 제외 모두
                        if (!$(this).hasClass('w')) { // 시작 width 다를 때
                            if (!$('body').hasClass('mo_ver')) { // pc
                                w = Math.min(Math.max((sct / 8), 50), 100);
                                b = sct * -1.1 + sct * 1.09 + 9;
                            } else { // mo
                                w = Math.min(Math.max((sct / 6), 70), 100);
                                b = Math.max(sct * -1.3 + sct * 1.25 + 30, 0);
                            }
                        }
                    }
                    $(this).css({
                        width: `${w}vw`
                    });
                    $(this).find('img, video, iframe').css({
                        filter: `blur(${b}px)`
                    });
                }
            })
        }
    })


    /************************************ slide ************************************/

    // 슬라이드
    var event_slider = $('.event_slider'),
        notice_slider = $('.notice_slider'),
        paper_slider = $('.paper_slider'),
        $status = $('.abs_wr .pagination'),
        eventSettings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 400,
            arrows: true,
            pagination: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1.05,
                        arrows: false,
                    }
                }
            ]
        },
        noticeSettings = {
            setPosition: 0,
            slidesToShow: 2,
            slidesToScroll: 1,
            speed: 400,
            arrows: false,
            infinite: false,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1.05
                    }
                }
            ]
        };
        paperSettings = {
            setPosition: 0,
            slidesToShow: 2,
            slidesToScroll: 1,
            speed: 400,
            arrows: false,
            infinite: false,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 1281,
                    settings: {
                        slidesToShow: 1.2
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1.05
                    }
                }
            ]
        };
    $(window).on('load resize', function () {
        mo_chk(); tab_style(); prog_init(); mobileChk();
        if (!$('body').hasClass('mo_ver')) {
            $('.ft_tit').css({ transform: 'none' });
        }

        // event
        event_slider.not('.slick-initialized').slick(eventSettings).slick('init');
        // event 슬라이드 페이지네이션 설정
        event_slider.each(function(){
            const thisStatus = $(this).siblings('.abs_wr').find('.pagination');
            thisStatus.text('1/' + $(this).find('.slick-slide').length); // 초기            
            $(this).on('init reInit afterChange', function (event, slick, currentSlide) {
                var i = (currentSlide ? currentSlide : 0) + 1;
                thisStatus.text(`${i}/${slick.slideCount}`);
            });
            // event 슬라이드 프로그레스바 설정
            $(this).on('init reInit beforeChange', function (event, slick, currentSlide, nextSlide) {
                let $progressBar = $(this).siblings('.progress');
                if ($(this).siblings('.progress').length) {
                    calc = (nextSlide + 1) / (slick.slideCount) * 100;
                    $progressBar.css('width', calc + '%');
                }
            });
        })
        // notice
        notice_slider.not('.slick-initialized, .kind_list, .paper_slider').slick(noticeSettings);
        // notice 슬라이드 프로그레스바 설정
        notice_slider.each(function () {
            $(this).on('init reInit beforeChange', function (event, slick, currentSlide, nextSlide) {
                let $progressBar = $(this).siblings('.progress');
                let acitveSlide = $(this).find('.slick-active').length - 1;
                calc = slick === "Infinity" ? 100 : (nextSlide + 1) / (slick.slideCount - acitveSlide) * 100;
                $progressBar.css('width', calc + '%');
            });
        })
        // paper
        paper_slider.not('.slick-initialized').slick(paperSettings).slick('init');
    });

    $('.clickable .slick-slide').click(function () {
        let idx = $(this).index();
        $(this).closest($('.clickable')).slick('slickGoTo', idx)
    })


    /************************************ 기타 공통 애니메이션 ************************************/

    // transition-delay 설정
    $(".tran_delay .tran").each(function () {
        var $this = $(this);
        var idx = ($this.index() * 1.5) / 10;
        $this.css({ 'transition-delay': `${idx}s` })
    })

    // card rotate
    $('.card_ani li').each(function () {
        const isMobile = $('body').hasClass('mo_ver');
        if(!isMobile){
            const rotate = isMobile ? $(this).attr('data-mo-rotate') : $(this).attr('data-rotate');
            $(this).css({ transform: `rotate(${rotate}deg)`})
        }
    })
})


/************************************ window load ************************************/

$(window).load(function () {
    // 로드되면 타이틀 등장
    $('.sub_tit h2').addClass('ani_view')
    if ($('h3.sub_tit.mo').length) { // mo 전용
        $('h3.sub_tit.mo').addClass('ani_view')
    }

    // mo tab 이동
    if ($('body').hasClass('mo_ver')) {
        const $tabListWr = $('.sub_tit_wr:not(.mo_scr) .tab_list_wr');
        if ($tabListWr.length) {
            const posl = +($('.content_wrapper').css('padding-left').slice(0, 2)) + +($('.dep2_tit_wr').css('padding-left').slice(0, 2));
            const posX = $('.sub_tit_wr .tab_list_wr > .act').offset().left - posl;
            $tabListWr.stop().animate({
                scrollLeft: posX
            },500)
        }
    }
})

/************************************ 함수 정의 ************************************/

function tab_style() {
    $('.tab_list.act').each(function () {
        var $this = $(this);
        var $target = $this.siblings('.abs');
        var l = $this.position().left;
        var w = $this.outerWidth(true);
        $target.css({
            width: w, left: l
        })
    })
}
function prog_init() {
    // 슬라이드 프로그레스바 초기 세팅
    var $progressBar = $('.progress');
    setTimeout(function () {
        $progressBar.each(function () {
            var $this = $(this);
            var slider = $(this).prev($('.slick-slider'));
            slider.each(function(){
                var calc = 0;
                var idx = slider.find($('.slick-current')).index() + 1;
                if (slider.hasClass('notice_slider')) {
                    calc = (idx / (slider.find('.slide').length - 1)) * 100;
                    if (slider.hasClass('kind_list')) {
                        calc = (idx / (slider.find('.slide').length - 2)) * 100;
                    }
                } else {
                    calc = (idx / (slider.find('.slide').length)) * 100;
                }
                $this.css('width', calc + '%');
            })
        })
    }, 300);
}
function mobileChk() {
    // mo sidebar 
    if ($('body').hasClass('mo_ver')) {
        $('#sidebar .weather_ico_wr').appendTo('#sidebar .today_info .l_wr');
        $('#sidebar .weather_info').appendTo('#sidebar .weather_wr');
    } else {
        $('#sidebar .weather_ico_wr').appendTo('#sidebar .weather_wr');
        $('#sidebar .weather_info').appendTo('#sidebar .today_info .l_wr');
        // mo side menu 모두 비활성화
        $('#header').removeClass('hide lnb_open');
        $('#lnb').removeClass('act');
        $('html').removeClass('scr_not');
    }
    // 검색 위치 변경
    var search = $('.search_wr');
    if (search.length && !search.hasClass('position_fixed')) {
        if ($('body').hasClass('mo_ver')) {
            search.appendTo($('.sub_tit_wr'))
        } else {
            search.appendTo($('.dep2_tit_wr'))
        }
    }
}
// 스크롤 방지
function scrollDisable() {
    $('html').addClass('scr_not');
}
function scrollAble() {
    $('html').removeClass('scr_not');
}

// 페이지 내에 년도 자동 업 카운팅
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
const contentElements = document.querySelectorAll('.count_num');

contentElements.forEach(function(elem) {
    let resultYear = currentYear - 2005 + '';
    if(elem.classList.contains('separate')){ // 인터렉션 버전
        const separeteElems = elem.querySelectorAll('span');
        for(let i=0; i<separeteElems.length; i++){
            separeteElems[i].innerHTML = [...resultYear][i]; 
        }
    } else { // 기본 버전
        elem.innerHTML = resultYear; 
    }
});