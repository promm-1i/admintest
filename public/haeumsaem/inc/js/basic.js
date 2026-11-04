$(document).ready(function () {
    /*모바일 높이*/
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + 'px');
    $(window).resize(function () {
        document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + 'px');
    });

    new WOW().init();

    $('select').niceSelect()

    $(".top_btn").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 400);
        return false;
    });


	setTimeout(function (){
		$("body").addClass('end_ani')

	},1000)


	$('.aside_wrap .youtube_box .play_btn').on('click', function () {
		const $youtubeBox = $(this).closest('.youtube_box');
		const $iframe = $(this).siblings('iframe');

		let src = $iframe.attr('src');

		if (src.indexOf('autoplay=1') === -1) {
			src += (src.indexOf('?') > -1 ? '&' : '?') + 'autoplay=1';
			$iframe.attr('src', src);
		}
		$youtubeBox.addClass('active');
	});


    $('.bg_text_box.move .bg_text').marquee({
        speed: 150,
        gap: 30,
        delayBeforeStart: -5000,
        direction: 'left',
        duplicated: true,
        pauseOnHover: false,
    });

    $(".sub_visual .img").addClass("zoom");

    $(".accordion li").click(function () {

        $(this).find(".answer").stop().slideToggle();
        $(this).toggleClass('on');
        $(this).siblings("li").find(".answer").slideUp();
        $(this).siblings("li").removeClass('on');
    })

});
// 스크롤 너비 계산 및 설정
function updateScrollWidth() {
	var scrollingElement = document.scrollingElement || document.documentElement;
	var scrollWidth = window.innerWidth - scrollingElement.clientWidth;
	var root = document.querySelector(':root');
	root.style.setProperty('--scroll-width', scrollWidth + 'px');
}

// 초기화 시 스크롤 너비 계산 및 설정
document.addEventListener('DOMContentLoaded', function() {
	updateScrollWidth();
});

// 브라우저 크기 변화 감지하여 스크롤 너비 업데이트
window.addEventListener('resize', function() {
	updateScrollWidth();
});




$(document).ready(function(){	
	/*header*/
	$('#header nav').mouseenter(function(){
		$('#header').addClass('enter');
	}).mouseleave(function(){
		$('#header').removeClass('enter');
	})

	$('.gnb-bg').css('width',$('body').innerWidth());
	$(window).resize(function(){
		$('.gnb-bg').css('width',$('body').innerWidth());
	});





	/*fade in*/
	if( $('.fade-self').length > 0 ){
		$('.fade-self').each(function(i){		
			var btm_item_self = $(this).offset().top + $(this).outerHeight()/3;
			var btm_window_self = $(window).scrollTop() + $(window).height();            
			if(btm_window_self >= btm_item_self){
				$(this).addClass('show');
			}
		}); 
	}		
	if( $('.fade-box').length > 0 ){
		$('.fade-box').each(function(i){		
			var btm_item_box = $(this).offset().top + $(this).outerHeight()/1.5;
			var btm_window_box = $(window).scrollTop() + $(window).height();            
			if(btm_window_box >= btm_item_box){
				$(this).find('.fade').addClass('show');
			}
		}); 
	}
	if( $('.fade-box-dr').length > 0 ){
		$('.fade-box-dr').each(function(i){		
			var btm_item_dr = $(this).offset().top;
			var btm_window_dr = $(window).scrollTop() + $(window).height();            
			if(btm_window_dr >= btm_item_dr){
				$(this).find('.fade').addClass('show');
			}
		}); 
	}				
	$(window).scroll(function(){
		if( $('.fade-self').length > 0 ){
			$('.fade-self').each(function(i){		
				var btm_item_self = $(this).offset().top + $(this).outerHeight()/3;
				var btm_window_self = $(window).scrollTop() + $(window).height();            
				if(btm_window_self >= btm_item_self){
					$(this).addClass('show');
				}
			}); 
		}		
		if( $('.fade-box').length > 0 ){
			$('.fade-box').each(function(i){		
				var btm_item_box = $(this).offset().top + $(this).outerHeight()/1.5;
				var btm_window_box = $(window).scrollTop() + $(window).height();            
				if(btm_window_box >= btm_item_box){
					$(this).find('.fade').addClass('show');
				}
			}); 
		}
		if( $('.fade-box-dr').length > 0 ){
			$('.fade-box-dr').each(function(i){		
				var btm_item_dr = $(this).offset().top;
				var btm_window_dr = $(window).scrollTop() + $(window).height();            
				if(btm_window_dr >= btm_item_dr){
					$(this).find('.fade').addClass('show');
				}
			}); 
		}	
	});		
});	