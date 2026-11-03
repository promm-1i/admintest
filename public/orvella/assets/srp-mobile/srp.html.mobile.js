
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
	});
	var rehabilitationSwiper = new Swiper(".rehabilitation-swiper", {
		pagination: {
			el: ".swiper-pagination",
			type: "progressbar",
		},
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		slidesPerView: 'auto',
	});
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
	});
	var therapistBig = new Swiper(".therapist-big", {
		slidesPerView: 'auto',
		loop:true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
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
		loopedSlides: 2
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
		console.log(isToday);
		if( isToday ) setCookie( 'todaycloseyn', 'Y', 1 );
	});
	var todaycloseyn = getCookie('todaycloseyn');
	if( $('#modalMain').length && todaycloseyn != 'Y' ) {
		openModal('Main');
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


$(function(){
   $('.btn-top').on('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});});
   $('.btn-cancel').on('click',function(e){e.preventDefault();var f=this.closest('form');if(f)f.reset();$('#fileNameText').hide();});
   $('.btn_datepicker').on('click',function(e){e.preventDefault();$('.datepicker').focus();});
   $('select[onchange]').on('change',function(){if(typeof selectEmail==='function')selectEmail(this);});
 });