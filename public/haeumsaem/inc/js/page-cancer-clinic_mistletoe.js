setTimeout(function(){
        $(".ms-preloader").animate({"opacity": "0"}, 1200, "easeInOutCubic", function () {
            $(".ms-preloader").css("visibility", "hidden");
        });
    },550);

	
	$('.btn-share').click(function(){
		$('.share-li').stop().fadeToggle(200);
		$('.share-box').toggleClass('on');
		return false; 
	 });

	$(document).click(function(e){
		if(!$('.share-li').is(e.target) && $('.share-li').has(e.target).length === 0){
			$('.share-li').stop().fadeOut();
			$('.share-box').removeClass('on');
		}
	});

	$('.btn-hbg').click(function(){
		$('#header').toggleClass('on');
		$('body').toggleClass('overflow');
        

        
	});
	$(window).resize(function(){
		if(window.innerWidth > 1200){
			$('#header').removeClass('on');
			$('body').removeClass('overflow');
           
		}
	});

    $(document).on('click', '.modal', function(e) {
        if (!$(e.target).closest('.modal-wrap').length) {
            $('body').css('overflow', 'visible');
            $('.modal').css('display', 'none');
            $('.modal-backdrop').remove();
        }
    });

    $(document).on('touchstart', function(e) {

        if($('#header').hasClass('on') && 
        !$(e.target).closest('nav').length && 
        !$(e.target).closest('.btn-hbg').length) {
            $('#header').removeClass('on');
            $('body').removeClass('overflow');
        }
    });

    $(document).on('click', function(e) {
        if($('#header').hasClass('on') && 
        !$(e.target).closest('nav').length && 
        !$(e.target).closest('.btn-hbg').length) {
            $('#header').removeClass('on');
            $('body').removeClass('overflow');
        }
    });


document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){$('.modal').hide();$('.modal-backdrop').remove();$('body').css('overflow','');$('#header').removeClass('on');}
});



        $('#allAgree').on('change', function() {
            var isChecked = $(this).is(':checked');
            $('.checkbox-agree').prop('checked', isChecked);
        });

        $('.checkbox-agree').on('change', function() {
            var allChecked = $('.checkbox-agree').length === $('.checkbox-agree:checked').length;
            $('#allAgree').prop('checked', allChecked);
        });
    


            $(document).on('change','.select_nav',function(){
                if($(this).val() != '') {
                    location.href=$(this).val();
                }
            })
        






    let tabSlide;
    function initializeSwiper() {
        if (window.innerWidth <= 768) {
            if (!tabSlide) {
                tabSlide = new Swiper('.tabs .swiper-container', {
                    slidesPerView: 'auto',
                    initialSlide: 1,
                    freeMode: true,
                    observer: true,
                    observeParents: true,
                });
            }
        } else {
            if (tabSlide) {
                tabSlide.destroy(true, true);
                tabSlide = undefined;
            }
        }
    }

    window.addEventListener('load', initializeSwiper);

    window.addEventListener('resize', initializeSwiper);



    $(document).ready(function (){

        var contBasicSlide10Swiper  = new Swiper ('.cont_basic_slide10 .swiper-container', {
            speed : 1000,
            slidesPerView: "auto",
            spaceBetween: 20,
            loop: true,
            loopAdditionalSlides: 1,
            autoplay: {
                delay: 3000, // 3초마다 다음 슬라이드
                disableOnInteraction: false, // 사용자 조작 후에도 자동재생 유지
                pauseOnMouseEnter: true, // 마우스를 올리면 일시정지
            },
            breakpoints: {

                600: {
                    spaceBetween: 20
                },
                0: {
                    spaceBetween: 15
                },
            }
        })




        function contObserver(selector, num, type, moChk, slide) {

            if (window.innerWidth < 768) {
                if (moChk) {
                    num = moChk
                }
            }


            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const $target = entry.target;
                    const isIntersecting = entry.isIntersecting;

                    if (isIntersecting) {
                        $($target).addClass("active");
                        if (slide) {
                            slide.autoplay.start();
                        }

                    } else if (type) {
                        $($target).removeClass("active");
                    }
                });
            }, { threshold: num });

            document.querySelectorAll(selector).forEach((item) => {
                observer.observe(item);
            });
        }


        contObserver('.mechanism_cont', 0.2, false, 0.1);
        contObserver('.stage_cont_box', 0.2, false, 0.1);
    })





