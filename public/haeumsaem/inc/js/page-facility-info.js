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
        


    var modalImgList = new Array();

    modalImgList['img1_1'] = new Array(

    );

    modalImgList['img1_2'] = new Array(
    );

    modalImgList['img1_3'] = new Array(
    );

    modalImgList['img1_4'] = new Array(
    );

    modalImgList['facility-1'] = new Array(
    );

    modalImgList['facility-2'] = new Array(
    );


	var swiperBuild = new Swiper('.build .swiper-container', {
		loop:true,
		slidesPerView: "auto",
		autoplay: {
			delay: 4000,
		},
		breakpoints: { 
			0: { 
				spaceBetween: 20,
			}, 
			769: { 
				spaceBetween: 30,
			},
			1201: { 
				spaceBetween: 40,
			},
			2001: { 
				spaceBetween: 50,
			},
		},
	});


    function openModal(obj) {
        var title = $(obj).find('.name').text();
        $('#modalTitle').text(title);

        var basicImg = $(obj).data('img');
        var html = '<div class="swiper-slide"><img src="'+$(obj).find('img').attr('src')+'" alt="시설 사진"></div>';

        if (modalImgList[basicImg] != undefined) {
            $.each(modalImgList[basicImg], function(k,v) {
                html += '<div class="swiper-slide"><img src="'+v+'" alt="사진"></div>';
            });
        }

        $('#modalImgListArea').html(html);

        swiperSet();

        $('#modalBuild').modal();
    }
    
    var swiper;

    function swiperSet() {
        var slideCount = $('.build-photos .swiper-slide').length;
    }

    function AOS_MOBILE() {
      if (matchMedia("screen and (max-width: 768px)").matches) {

        $('.build-list ul li').eq(0).attr('data-aos-delay', '100');
        $('.build-list ul li').eq(1).attr('data-aos-delay', '200');
        $('.build-list ul li').eq(2).attr('data-aos-delay', '300');
        $('.build-list ul li').eq(3).attr('data-aos-delay', '400');
        $('.build-list ul li').eq(4).attr('data-aos-delay', '500');
        $('.build-list ul li').eq(5).attr('data-aos-delay', '600');
        $('.build-list ul li').eq(6).attr('data-aos-delay', '700');
        $('.build-list ul li').eq(7).attr('data-aos-delay', '800');
        $('.build-list ul li').eq(8).attr('data-aos-delay', '900');
        $('.build-list ul li').eq(9).attr('data-aos-delay', '1000');
      }
    }
    AOS_MOBILE();
