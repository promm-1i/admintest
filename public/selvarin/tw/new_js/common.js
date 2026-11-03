console.log('%c created by. %cFINEAPPLE %cPTL ','color:#8cc677; font-size:14px; background-color:#555; font-weight:600; padding:4px 0;','color:#cbdd54; font-size:14px; background-color:#555; font-weight:600; padding:4px 0;','color:#57b69a; font-size:14px; background-color:#555; font-weight:600; padding:4px 0;');

// html엘리먼트 ie7,8인식; .....
document.createElement('header');
document.createElement('nav');
document.createElement('article');
document.createElement('section');
document.createElement('aside');
document.createElement('footer');

function isBrowserCheck() {
	const agt = navigator.userAgent.toLowerCase();
	if (agt.indexOf("chrome") != -1) return 'Chrome'
	if (agt.indexOf("opera") != -1) return 'Opera'
	if (agt.indexOf("staroffice") != -1) return 'Star Office'
	if (agt.indexOf("webtv") != -1) return 'WebTV'
	if (agt.indexOf("beonex") != -1) return 'Beonex'
	if (agt.indexOf("chimera") != -1) return 'Chimera'
	if (agt.indexOf("netpositive") != -1) return 'NetPositive'
	if (agt.indexOf("phoenix") != -1) return 'Phoenix'
	if (agt.indexOf("firefox") != -1) return 'Firefox'
	if (agt.indexOf("safari") != -1) return 'Safari'
	if (agt.indexOf("skipstone") != -1) return 'SkipStone'
	if (agt.indexOf("netscape") != -1) return 'Netscape'
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla'
	if (agt.indexOf("msie") != -1) {
		let rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer') {
			let ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})")
			if (re.exec(ua) != null)
				rv = parseFloat(RegExp.$1)
		}
		return 'Internet Explorer ' + rv
	}
}
var clickEvent = (function () {
	if ('ontouchstart' in document.documentElement === true) {
		return 'touchstart';
	} else {
		return 'click';
	}
})(); // 클릭이벤트와 터치이벤트 토글

// 빠른상담
/*
const counsel_call_btn = document.getElementById('counsel--call-btn');
const quick_counselling = document.getElementById('quick_counselling');
const counsel_call_btn02 = document.getElementById('counsel--call-btn');
const counsel_from = function(e){
	quick_counselling.classList.toggle('opened');
}
counsel_call_btn.addEventListener(clickEvent, counsel_from);
counsel_call_btn02.addEventListener(clickEvent, counsel_from);

$(window).resize(function(){
	var winWid = $(window).width();
	if(winWid < 1025) {
			// 빠른상담
			const counsel_call_btn_m = document.getElementById('counsel--call-btn_m');
			const quick_counselling = document.getElementById('quick_counselling');
			const counsel_call_closeBtn = document.getElementById('counsel--close-btn');
			const counsel_from_add = function(e){
				quick_counselling.classList.add('opened');
			}
			const counsel_from_remove = function(e){
				quick_counselling.classList.remove('opened');
			}
			counsel_call_btn_m.addEventListener(clickEvent, counsel_from_add);
			counsel_call_closeBtn.addEventListener(clickEvent, counsel_from_remove);
    
	} else {
		$('.gnb-menu-depth1 > .gnb-menu-text').hover(function(){
            $(this).stop().siblings('.gnb-menu-depth2').addClass('on');
            $(this).stop().children('a').children('p').addClass('on');
            $(this).stop().siblings('img').addClass('on');
            // $('.gnb-menu-depth1 > .gnb-menu-text').not(this).siblings('.gnb-menu-depth2').removeClass('on');
            $('.gnb-menu-depth1 > .gnb-menu-text').not(this).children('a').children('p').removeClass('on');
            $('.gnb-menu-depth1 > .gnb-menu-text').not(this).siblings('img').removeClass('on');
        }, function(){
            // $(this).stop().siblings('.gnb-menu-depth2').removeClass('on');
            $(this).stop().children('a').children('p').removeClass('on');
            $(this).stop().siblings('img').removeClass('on');
            $(this).stop().siblings('img').removeClass('on');
        });

        $('.gnb-menu-depth2').hover(function(){
            // $(this).stop().addClass('on');
            $(this).stop().siblings('.gnb-menu-text').children('a').children('p').addClass('on');
            // $(this).stop().siblings('img').addClass('on');
            // $('.gnb-menu-depth2').not(this).removeClass('on');
            $('.gnb-menu-depth2').not(this).siblings('.gnb-menu-text').children('a').children('p').removeClass('on');
            // $('.gnb-menu-depth2').not(this).siblings('img').removeClass('on');
        }, function(){
            $(this).stop().removeClass('on');
            $(this).stop().siblings('.gnb-menu-text').children('a').children('p').removeClass('on');
        });
		

	}
}).resize();

*/
// quick
const tooltipQuick = document.querySelector('#quick');
const tooltipButton = document.querySelector('.quick-btn-area');
const tooltipArea = document.querySelector('.quick-btn-area');
const tooltipMenu = document.querySelector('.quick-wrap');

var simulateClick = function (elem) {
	// Create our event (with options)
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	});
	// If cancelled, don't dispatch our event
	var canceled = !elem.dispatchEvent(evt);
};
function getTootipCookie (name) {
	let value = `; ${document.cookie}`;
	let parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

if (tooltipButton !== null) {
	tooltipButton.addEventListener('click', (e) => {
		e.stopPropagation()
		e.preventDefault()
		tooltipArea.classList.remove('is-active');
		if(tooltipMenu.classList.contains('is-active')){
			tooltipMenu.classList.remove('is-active')
			// 쿠키 생성
			if (getTootipCookie('tooltipMenuOpen') !== "no")
			{
				document.cookie = 'tooltipMenuOpen=no;path=/;expires=0;';
			}
		}else{
			tooltipMenu.classList.add('is-active');
		}
	});
}



if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
} // forEach 의 ie 지원




//const topNav = Array.from(document.getElementsByClassName('top_menu'));
var headHei = document.getElementById('header').clientHeight;





// Detect request animation frame
/*var scroll = window.requestAnimationFrame ||
             // IE Fallback
             function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.reveal'); 

function loop() {

    Array.prototype.forEach.call(elementsToShow, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });

    scroll(loop);
}

// Call the loop for the first time
loop();
*/
// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}





