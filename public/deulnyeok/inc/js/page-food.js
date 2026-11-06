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
        



        var chefSlide = new Swiper('.chef_slide .swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            speed: 1000,
            loop: true,
            observer: true,
            observeParents: true,
            breakpoints: {
                769: {
                    slidesPerView: 'auto',
                },
                0: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                },
            }
        });

        var slickSlider;

        function openEatMenuModal(idx) {
            var pa = 'idx=' + idx;
            ajaxJsonProc('', '', '/_Prog/mediram/getEatMenuListHTML.php', pa, openEatMenuModalEnd);
        }

        function openEatMenuModalEnd(r) {
            if (slickSlider != undefined) {
                slickSlider.slick('slickRemove', null, null, true);
            }

            var html = '';
            $.each(r.list, function (k, v) {
                var imgList = '';
                if (v.imgFiles != undefined) {
                    $.each(v.imgFiles, function (kk, vv) {
                        imgList += '<div class="swiper-slide img"><img src="' + vv.imgLink + '" alt=""></div>';
                    });
                }

                html += '<div class="slide" data-idx="' + v.idx + '" data-info="' + v.info + '">'
                    + '   <h5>' + v.title + '</h5>'
                    + '   <div class="box">'
                    + '       <div class="slider">'
                    + '           <div class="swiper-container">'
                    + '               <div class="swiper-wrapper">'
                    + '                   ' + imgList
                    + '               </div>'
                    + '           </div>'
                    + '           <div class="swiper-pagination"></div>'
                    + '       </div>'
                    + '       <div class="list">'
                    + '           ' + v.menu
                    + '       </div>'
                    + '   </div>'
                    + '</div>';
            });

            $('#eatMenuList').html(html);

            if (slickSlider != undefined) {
                slickSlider.slick('unslick');
            }

            slickSlider = $('#eatMenuList').slick({
                initialSlide: r.currentIndex,
                infinite: false,
                draggable: false,
                swipe: false
            });

            slickSlider.off().on("afterChange", function (event, slick, currentSlide) {
                var currentElement = $('[data-slick-index=' + currentSlide + ']');
                openEatMenuModal(currentElement.data('idx'));
				
            });

            var initialElement = $('[data-slick-index=' + r.currentIndex + ']');
            var initialTitle = initialElement.find('h5').text();
            $('#modalFood .modal-header h4').text(initialTitle);
			
			
			
			
			if (r.info != undefined && r.info != '' && r.info != 'undefined') {
				$('#eatMenuInfoArea').html('<p>※ ' + r.info + '</p>');
				$('#eatMenuInfoArea').show();
			} else {
				$('#eatMenuInfoArea').html('');
				$('#eatMenuInfoArea').hide();
			}
			
			

            $('#modalFood').modal();
            slickSlider.get(0).slick.setPosition();

            swiperFood = new Swiper('.food-slider .slick-active .swiper-container', {
                pagination: {
                    el: '.food-slider .swiper-pagination',
                    clickable: true,
                },
                observer: true,
                observeParents: true,
            });
        }
        var swiperFood;
		$(function(){

			var swiperChef = new Swiper('.chef2 .swiper-container', {
				autoplay: {
					delay: 3000,
				},
				pagination: {
					el: '.chef2 .swiper-pagination',
				  type: "fraction",
				},
				observer: true,
				observeParents: true,
			});
			
		})
		if($('.chef2 .swiper-slide').length == 1) {
			$('.swiper-wrapper').addClass('disabled');
			$('.swiper-pagination').addClass('disabled');
		}


		function AOS_MOBILE() {
		  if (matchMedia("screen and (max-width: 769px)").matches) {

			$('.food-feature ul li').eq(0).attr('data-aos-delay', '100');
			$('.food-feature ul li').eq(1).attr('data-aos-delay', '200');
			$('.food-feature ul li').eq(2).attr('data-aos-delay', '300');
			$('.food-feature ul li').eq(3).attr('data-aos-delay', '400');
			$('.food-feature ul li').eq(4).attr('data-aos-delay', '500');
			$('.food-feature ul li').eq(5).attr('data-aos-delay', '600');
			$('.food-feature ul li').eq(6).attr('data-aos-delay', '700');
			$('.food-feature ul li').eq(7).attr('data-aos-delay', '800');
		  }
		} 
		AOS_MOBILE();

        var youtubeSlide = new Swiper('.youtube_slide .swiper-container', {
            speed: 1000,
            loop: true,
            loopAdditionalSlides: 2,
            pagination: {
                el: '.youtube_slide .swiper-pagination',
                clickable: true,
            },
            observer: true,
            observeParents: true,
        })

	