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
        


    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".left, .right", {
        width: "0%",
        scrollTrigger: {
            trigger: ".intro .sub_top_wrap .img",
            start: "top center",
            end: "center center",
            scrub: 1.5,

        }
    });

    let tabSlide;
    function initializeSwiper() {
        if (window.innerWidth <= 768) {
            if (!tabSlide) {
                tabSlide = new Swiper('.tabs .swiper-container', {
                    slidesPerView: 'auto',
                    initialSlide: 5,
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

    document.addEventListener('DOMContentLoaded', function() {
        const items = document.querySelectorAll('.item');

        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px',  // 60% from the bottom of the viewport
            threshold: 0
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Stop observing once the class is added
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        items.forEach(item => {
            observer.observe(item);

            const rect = item.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.6) {
                item.classList.add('active');
                observer.unobserve(item);
            }
        });
    });
