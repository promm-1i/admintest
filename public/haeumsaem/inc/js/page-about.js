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
        


    function handleParallax() {
        const parallaxElements = document.querySelectorAll('.big_symbol');

        if (window.innerWidth >= 769) {

            window.addEventListener('scroll', parallaxScroll);
        } else {

            window.removeEventListener('scroll', parallaxScroll);

            parallaxElements.forEach(function(el) {
                el.style.backgroundPositionY = '0';
            });
        }
    }

    function parallaxScroll() {
        const parallaxElements = document.querySelectorAll('.big_symbol');
        const scrollPosition = window.pageYOffset;

        parallaxElements.forEach(function(el) {

            const basePosition = parseFloat(getComputedStyle(document.documentElement).fontSize) * 0;

            el.style.backgroundPositionY = (basePosition - scrollPosition * 0.75) + 'px';
        });
    }

    window.addEventListener('load', handleParallax);

    window.addEventListener('resize', handleParallax);

