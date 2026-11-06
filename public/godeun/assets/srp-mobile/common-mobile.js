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
$( document ).ready( function() {
	onlyNumberInput("onlyNumber");
    $("header .btn").click(function(){
        $('body').toggleClass('scroll');
        $(this).toggleClass('btn-on');
        $(".header").toggleClass("header-open");
        $(".header-full").slideToggle(200);
    });
    $(".depth1>a").click(function(){
        var toggle = $(this).parent().hasClass("open") ? true : false;
        $(".depth1").removeClass("open")
        $(".depth2-list").slideUp();
        if( !toggle ){
            $(this).parent().addClass("open")
            $(this).next().slideDown()
        }
    })
    $('.quick .quick-wrap .plus .open-quick').on("click",function(){
        $('.blocker').toggleClass('on');
        $('.quick').toggleClass('on');
        $('.quick-menu').fadeToggle(200);
    })
    $('.btn-top').on('click',function() {
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
                pos = totH - footerTop + 50;
            if (totH >= footerTop) {
                $fbw.css({
                    'bottom':0,
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
    $(".sub-wrap .btns .tit").on("click",function(){
        $(this).parent().toggleClass('active');
        $(this).next().slideToggle(400);
    })
})