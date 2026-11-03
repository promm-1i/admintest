
function onlyNumberInput( className ){
	if( !className || className == "" ) throw "onlyNumberInput() params is empty.";
	try{ className = trim(className); }catch(e){}

	try{
		$("." + className ).keyup( function(){
			this.value =this.value.replace(/[^0-9\.]/g,"");
			this.value =this.value.replace(/[.]/g,"");
		});
	}catch(e){
		console.log("onlyNumberInput() : Jquery is not loaded..");
	}
}

//HEADER
$(window).scroll(function() {
	$('.header').css({left: 0 - $(this).scrollLeft()});
});
$(document).ready(function(){
	onlyNumberInput("onlyNumber");

    $(".gnb").hover(function(){
        $(".gnb-bg").css({display:"block"})
        $(".depth2-list").css({display:"block"})
    },
    function(){
        $(".gnb-bg").css({display:"none"})
        $(".depth2-list").css({display:"none"})
    })
    $(".gnb-bg").hover(function(){
        $(".gnb-bg").css({display:"block"})
        $(".depth2-list").css({display:"block"})
    },
    function(){
        $(".gnb-bg").css({display:"none"})
        $(".depth2-list").css({display:"none"})
    })
//HEADER
//QUICK
    $('.quick .quick-wrap .plus .open-quick').on("click",function(){
        $('.quick-menu').fadeToggle(200);
    })
    $('.btn-top').on('click',function() {
        //$("#fullpage").fullpage.moveTo($(this).index() + 1);
    });
    floatingBtn();
    function floatingBtn() {
        var el;
 
        el = $('.quick .quick-wrap');
 
        if (el.length <= 0) {
            return;
        }
 
        $(window).on('scroll.floatingBtnWrap, resize.floatingBtnWrap', function () {
            var $footer = $('#footer'),
                $fbw = $('.quick .quick-wrap'),
                winScrT = $(window).scrollTop(),
                totH = winScrT + $(window).height(),
                footerTop = $footer.offset().top,
                pos = totH - footerTop ;
 
            if (winScrT > 100) {
                $fbw.fadeIn()
            }else {
                $fbw.fadeOut()
            }
 
            //위치
            if (totH >= footerTop) {
                $fbw.css({
                    'bottom': -130,
                    'position': 'absolute',
                })
            } else {
                $fbw.css({
                    'position': 'fixed',
                    'bottom': '10px'
                })
            }
        });
    }
//QUICK
//IE
    if(document.currentScript === undefined){
        // IE 에서만 돌아갈 내용
        $('.input-box-flex').addClass('ie');
        $('.flex').addClass('ie');
        $('.radio-wrap').addClass('ie');
        $('.date-a').addClass('ie');
        $('.division').addClass('ie');
    } else {
        // IE 가 아닐 때 돌아갈 내용
        $('.input-box-flex').removeClass('ie');
        $('.flex').removeClass('ie');
        $('.radio-wrap').removeClass('ie');
        $('.date-a').removeClass('ie');
        $('.division').removeClass('ie');
    }
//IE
})
