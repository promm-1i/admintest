if(/iPhone|iPod|Android|iPad/.test(window.navigator.platform)){
	$(document)
	.on('focus', 'textarea,input,select', function(e) {
		$('#header').css('position', 'absolute');
	})
	.on('blur', 'textarea,input,select', function(e) {
		$('#header').css('position', '');
	});
}

jQuery(document).ready(function(){
	stageResize();

	// 타이틀 변환
	 var homeTile = jQuery('title').text();
	 var replaceTitle = jQuery('.sub-title h2').text();
	 arrTitle = jQuery('.sub-title h2').text();
	 if(replaceTitle==''){
	 }else{
	  document.title=arrTitle + " | " + homeTile;
	 };

	// 마우스오버시 이미지 변환
	jQuery("img.rollover").mouseover(function(){
		jQuery(this).attr("src",jQuery(this).attr("src").replace(/^(.+)(\.[a-z]+)$/, "$1_on$2"));
	}).mouseout(function(){
		jQuery(this).attr("src",jQuery(this).attr("src").replace(/^(.+)_on(\.[a-z]+)$/, "$1$2"));
	});
	
	// mobile navigation
	$(".nav-menu").html($("#gnb").html());
	$(".m-product-info").html($(".product-info").html());
	$(".btn-m-menu").click(function(e){
		e.preventDefault();
		if($("html").hasClass("menu-opened")){
			$("html").removeClass("menu-opened");
		}else{			
			$("html").addClass("menu-opened"); 
		}
	});


	$(".mobile-overlay").click(function(){				
		$("html").removeClass("menu-opened");
	});

	if(jQuery(window).width() <= 1024) {
		$(".mobile-navigation nav > ul > li > a").click(function(){
			t = $(this).parent('li');
			if (t.hasClass('active')) {
				t.removeClass('active');
				t.find('.submenu').slideUp('fast');
			}else {
				$(".mobile-navigation nav li").removeClass('active');
				t.addClass('active');
				if(t.find('div').hasClass('submenu')){
					$(".mobile-navigation nav .submenu").slideUp('fast');			
					t.find('.submenu').slideDown('fast');
					return false;
				}	
			}
		});
	}

	
	//텝
	jQuery(".tab-content").hide();
	jQuery("ul.tabs>li:first").addClass("active").show(); 	
	jQuery(".tab-content:first").show();

	jQuery("ul.tabs>li").click(function(e) {
		e.preventDefault();

		jQuery("ul.tabs>li").removeClass("active");
		jQuery(this).addClass("active");
		jQuery(".tab-content").hide();		
		
		var activeTab = jQuery(this).find("a").attr("href");
		jQuery(activeTab).fadeIn();
		return false;
	});

	$(".btn-open a").click(function() {
	  $(this).toggleClass("active");
	  $('.quick').toggleClass("active");
	});


	// fancybox
	$(".pop_privacy").fancybox({
		padding     : 0,
		margin      : 10,
		fitToView	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		type		: 'ajax',
		helpers:  {
			overlay: {
				locked: false
			}
		}
	});

	$(".pop_email").fancybox({
		padding     : 0,
		margin      : 10,
		fitToView	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		type		: 'ajax',
		helpers:  {
			overlay: {
				locked: false
			}
		}
	});
	

	$('.quick .slider').slick({
		infinite: false,
		vertical: true,
		arrows:false,
		dots: true,
		slidesToShow: 3,
		slidesToScroll: 3
	});

	jQuery('.scroll-top').on('click', function(){
		$('body,html').animate({scrollTop:0},400);
	});


	jQuery(document).ready(function(){
	 var offsetd = $(".quick").offset();
	 var topPadding = 50; //브라우저 상단에 항상 여백을 수치만 큼 여백을 두고 이동함
	 $(window).scroll(function() {
	  if ($(window).scrollTop() > offsetd.top) {
	   $(".quick").stop().animate({
		marginTop: $(window).scrollTop() - offsetd.top + topPadding
	   });
	  } else {
	   $(".quick").stop().animate({
		marginTop: 0
	   });
	  };
	 });
	});



	if(jQuery(window).width() <= 640) {
		var sIdx = $(".lnb .swiper-slide.active").index();
		var swiper = new Swiper('.lnb', {
			slidesPerView: 'auto',
			preventClicks: false,
			initialSlide: sIdx
		});
		
	}

	$('.main-visual .items').slick({
	  speed: 2000,
	  autoplay:true,
	  autoplaySpeed: 4000,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  fade: true,
	  arrows: false,
	  dots:true,
	  pauseOnHover: false,
		
	 });

	$('.listSlider .items').slick({
	  speed: 800,
	  //autoplay:true,
	  //autoplaySpeed: 4000,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  fade: false,
	  arrows: true,
	  dots:false,
	  lazyLoad: 'ondemand',
	  pauseOnHover: false,
		
	 });



	$('.product-image .slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.product-image .nav'
	});
	$('.product-image .nav').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.product-image .slider',
		focusOnSelect: true,
		responsive: [
			{
			  breakpoint: 900,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 640,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			}
		  ]
	});


	$('.product-slider').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [
			{
			  breakpoint: 900,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 640,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			}
		  ]
	});

	

	// datepicker
	$(".datepicker").datepicker({
		dateFormat: 'yy-mm-dd' //Input Display Format 변경
		,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
		,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시         
		//,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
		,prevText: "이전달"
		,nextText: "다음달"
		,buttonText: "날짜선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
		,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
		,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
		,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
		,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
		,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
	}); 

	$(".datepicker2").datepicker({
		dateFormat: 'yy-mm-dd' //Input Display Format 변경
		,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
		,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시    
		,changeMonth: true //월 선택 표시
		,changeYear: true //년도 선택 표시
		,minDate: '-100y' // 현재날짜로부터 100년이전까지 년을 표시
		,yearRange: 'c-100:c+10' // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.
		,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
		,prevText: "이전달"
		,nextText: "다음달"
		,buttonText: "날짜선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
		,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
		,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
		,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
		,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
	}); 

	// input
	$("input[type=tel], input[numberOnly]").on("keyup", function() {
		$(this).val($(this).val().replace(/[^0-9]/g,""));
	});
	

	
});	//End

// WOW
new WOW().init();

$(window).bind("load resize", function(){
	stageResize();
});

function stageResize(){
	winH = $(window).height(),
	docH = $(document).height(),
	headH = $("#header").outerHeight(),
	lnbH = $("#lnb").outerHeight(),
	footH = $("#footer").outerHeight();

	$("#sub #container").css("min-height",winH-headH-lnbH-footH);
	if(jQuery(window).width() > 900) {$("#intro .intro-wrap .row .col").css("min-height",winH);}
	if(jQuery(window).width() <= 900) {$("#intro .intro-wrap .row .col").css("min-height",winH /2);}

	
}