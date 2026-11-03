
var mainPopupSwiper = null;
$(document).ready(function(){
	var mainSwiper = new Swiper(".main-swiper", {
		pagination: {
			el: ".swiper-pagination",
			type: "custom",
			clickable: true,
			renderCustom: function (swiper, current, total) {
				return '<span class="current">'+ 0+current +'</span>' + '<span class="line"></span>' + '<span class="total-num">'+ 0+total +'</span>';
			},
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
	});
	var rehabilitationSwiper = new Swiper(".rehabilitation-swiper", {
		pagination: {
			el: ".swiper-pagination",
			type: "progressbar",
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		slidesPerView: 'auto',
	});
	$(".section-02 .rehabilitation-swiper .swiper-button-pause").on('click', function(){
		rehabilitationSwiper.autoplay.stop();
		$(".section-02 .rehabilitation-swiper .swiper-button-play").show();
		$(".section-02 .rehabilitation-swiper .swiper-button-pause").hide();
	})
	$(".section-02 .rehabilitation-swiper .swiper-button-play").on('click', function(){
		rehabilitationSwiper.autoplay.start();
		$(".section-02 .rehabilitation-swiper .swiper-button-play").hide();
		$(".section-02 .rehabilitation-swiper .swiper-button-pause").show();
	})
	var therapistSmall = new Swiper(".therapist-small",{
		slidesPerView: 'auto',
		thumbs: {
			swiper: therapistBig,
		},
		pagination: {
			el: ".swiper-pagination",
			type: "progressbar",
		},
		watchSlidesProgress: true,
		slideToClickedSlide : true,
		loop:true,
		initialSlide: 0,
		direction: "vertical",
	});
	var therapistBig = new Swiper(".therapist-big", {
		slidesPerView: 'auto',
		loop:true,
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
            formatFractionCurrent: function (number) {
                return ('0' + number).slice(-2);
            },
            formatFractionTotal: function (number) {
                return ('0' + number).slice(-2);
            },
            renderFraction: function(current, total){
                return '<span class="'+current +'"></span>'+'<span class="line"></span>'+'<span class="'+total +'"></span>'
            }
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
	});
	therapistBig.controller.control = therapistSmall;
	therapistSmall.controller.control = therapistBig;
	var infoImg = new Swiper(".info-img", {
		slidesPerView: 'auto',
		slideToClickedSlide : true,
		loop:true,
		loopedSlides: 2,
	});
	var infoTxt = new Swiper(".info-txt", {
		pagination: {
			el: ".swiper-pagination",
			type: "custom",
			clickable: true,
			renderCustom: function (swiper, current, total) {
				return '<span class="current">'+ 0+current +'</span>' + '<span class="line"></span>' + '<span class="total-num">'+ 0+total +'</span>';
			},
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		loop:true,
		loopedSlides: 2,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
	});
	infoTxt.controller.control = infoImg;
	infoImg.controller.control = infoTxt;
	$(window).resize(function() { 
		if($(window).width() < 1240) { 
			$('body').css("overflow-x","auto");
		}else{
			$('body').css("overflow-x","initial");
		}
	});
	$('#modalMain').on($.modal.BEFORE_CLOSE, function(event, modal) {
		var isToday = $("#todaycloseyn").is(":checked");
		if( isToday ) setCookie( 'todaycloseyn', 'Y', 1 );
	});
	var todaycloseyn = getCookie('todaycloseyn');
	if( $('#modalMain').length && todaycloseyn != 'Y' ) {
		openModal('Main')
		if( mainPopupSwiper == null ){
			if( $('#modalMain .swiper-slide').length >= 2){
				$('#modalMain .swiper-pagination').css({display : 'flex'});
				mainPopupSwiper = new Swiper(".main-popup-swiper", {
					pagination: {
						el: ".swiper-pagination",
						type: "custom",
						clickable: true,
						renderCustom: function (swiper, current, total) {
							return '<span class="current">' + current + '</span><span class="line">/ </span><span class="total-num">'+ total +'</span>';
						},
					},
					slidesPerView: 'auto',
					autoplay: {
						delay: 4000,
						disableOnInteraction: false,
					},
					loop:false,
				})
			}
		}
	};
    $(window).scroll(scrollContent);
    $(window).resize(scrollContent);
    scrollContent();
});
function openModal(target){
    $($('#modal'+target)).modal({
        escapeClose: false,
        clickClose: false,
    });
}
function getCookie( name ) {
	if( !name || name == "" ) throw "cookie name is required.";
	try{ name = trim(name); }catch(e){}
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length ) {
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) {
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) 
				endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 )
			break;  
	}
	return "";
}
function setCookie( name, value, expiredays ){ 
	if( !name || name == "" ) throw "cookie name is required.";
	if( !value ) value = "";
	try{ name = trim(name); }catch(e){}
	try{ value = trim(value); }catch(e){}
	try{
		expiredays = Number( expiredays );
	}catch(e){
		expiredays = 1;
	}
	var todayDate = new Date(); 
	todayDate.setDate( todayDate.getDate() + expiredays ); 
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
}
function scrollContent(){
    var scrollTop = $(window).scrollTop();
    var height = $(window).height();
    var contentHeight = $(".l-main .section-01 .wrap-etc").outerHeight();
    var headerHeight = $(".header").height();
    var calc = height - contentHeight - headerHeight + scrollTop;
    console.log(height);
    if( calc >= 900 - contentHeight ) calc = 900 - contentHeight;
    else if ( calc <= 602) calc = 602 - contentHeight;
    $(".wrap-etc").css({ 'top' :  calc + "px"});
}


$(function(){
   $('.btn-top').on('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});});
   $('.btn-cancel').on('click',function(e){e.preventDefault();var f=this.closest('form');if(f)f.reset();$('#fileNameText').hide();});
   $('.btn_datepicker').on('click',function(e){e.preventDefault();$('.datepicker').focus();});
   $('select[onchange]').on('change',function(){if(typeof selectEmail==='function')selectEmail(this);});
 });