gsap.registerPlugin(ScrollTrigger);

var clickEvent_2 = (function () {
	if ('ontouchstart' in document.documentElement === true) {
		return 'touchstart';
	} else {
		return 'click';
	}
})(); // 클릭이벤트와 터치이벤트 토글


ScrollTrigger.matchMedia({
	// desktop
	"(min-width: 769px)": function () {
		//header 
		/*$(window).scroll(function (x) {
			scroll_head = parseInt($(this).scrollTop());
			if(scroll_head > 100){
				$(".network-select-list").removeClass("on");
				$(".main-header").addClass("scrolled");
			} else {	
				$(".network-select-list").removeClass("on");
				$(".main-header").removeClass("scrolled");
			}
		});*/
		$(document).ready(function(){
			$('.main-header').addClass('scrolled');
		});
		$(function(){
		  var lastScroll = 0;
		  var delta = 5;
		  var header = $('.main-header');

		  $(window).on('scroll', function(){
			var st = $(this).scrollTop();

			if (Math.abs(lastScroll - st) <= delta) return;

			if (st > lastScroll && st > header.outerHeight()) {
			  header.addClass('upup');
			} else {
			  if (st + $(window).height() < $(document).height()) {
				header.removeClass('upup');
			  }
			}

			lastScroll = st;
		  });
		});
        // card motion
        const cardmotion = document.querySelectorAll(".card-motion");
        cardmotion.forEach((cardmotion, index) => {
            ScrollTrigger.create({
                trigger: cardmotion,
                id: index + 1,
                start: 'top 80%',
                end: 'bottom 10%',
                onEnter: () => cardmotion.classList.add('animate'),
				onEnterBack: () => cardmotion.classList.add('animate'),
				onLeaveBack: () => cardmotion.classList.remove('animate'),
				onLeave: () => cardmotion.classList.remove('animate')
            });
        });
	},
    
	// mobile
	"(max-width:768px)": function () {
		// Any ScrollTriggers created inside these functions are segregated and get
		// reverted/killed when the media query doesn't match anymore.
        // gnb
        const menuItem = document.querySelectorAll('.gnb-menu-depth1');

        function addClass(elem,className){
          let max = elem.length;
          for(let i=0;i<max; i++){
            elem[i].classList.add(className);
          }
        }
        function removeClass(elem,className){
          let max = elem.length;
          for(let i=0;i<max; i++){
            elem[i].classList.remove(className);
          }
        }
        menuItem.forEach(menu =>{menu.addEventListener(clickEvent_2,function(e){
          this.tg = e.target;
          this.menuList = this.tg.parentNode;

          if(this.tg.nextElementSibling.classList.contains('gnb-menu-depth2')) {
            e.preventDefault();
            if(this.menuList.classList.contains('active')){
              //클릭한 메뉴에 active가 있을때
              removeClass(menuItem,'on');
              this.menuList.classList.remove('active');
              gsap.fromTo(this.menuList,{
                  height: (this.tg.offsetHeight + this.tg.nextElementSibling.offsetHeight) + 1,
                },
                {
                  height: this.tg.offsetHeight,
                  duration: .7
                });
            } else if(!this.menuList.classList.contains('on')){
              //내가 클릭한 메뉴에 on이 없을때 active가 없을때
              removeClass(menuItem,'on');
              this.menuList.classList.add('on');
              // gsap.to(menuItem,
              //   {
              //     height: this.tg.offsetHeight,
              //     duration: .7,
              //     onStart:()=>{removeClass(menuItem,'active');}
              //   });
              menuItem.forEach((el,index)=>{
                  gsap.to(el, {
                    height: this.tg.offsetHeight,
                    duration: .4
                  });
                });
              gsap.to(this.menuList,
                {
                  height: (this.tg.offsetHeight + this.tg.nextElementSibling.offsetHeight) + 1,
                  duration: .7
                });
            } else{
              //클릭한 메뉴에 이미 on이 있을때
              this.menuList.classList.remove('on');
              gsap.to(this.menuList,
                {
                  height: this.tg.offsetHeight,
                  duration: .7
                });
            }

          }
        })});
        
		$(window).scroll(function (x) {
			scroll_head = parseInt($(this).scrollTop());
			if(scroll_head > 100){
				$(".network-select-list").removeClass("on");
				$(".main-header").addClass("scrolled");
			} else {	
				$(".network-select-list").removeClass("on");
				$(".main-header").removeClass("scrolled");
			}
		});
        
	},
    
	// mobile
	"(max-width:480px)": function () {
		// Any ScrollTriggers created inside these functions are segregated and get
		// reverted/killed when the media query doesn't match anymore.
        
        
        
        
        
	},
    
	// mobile
	"(max-width:434px)": function () {
		// Any ScrollTriggers created inside these functions are segregated and get
		// reverted/killed when the media query doesn't match anymore.
        
        
        
        
        
	},
    
	// mobile
	"(max-width:400px)": function () {
		// Any ScrollTriggers created inside these functions are segregated and get
		// reverted/killed when the media query doesn't match anymore.
        
        
        
        
        
	},
    // mobile
	"(max-height:700px)": function () {
		// Any ScrollTriggers created inside these functions are segregated and get
		// reverted/killed when the media query doesn't match anymore.
        
        
        
        
        
	},
    // mobile
	"(max-height:600px)": function () {
		// Any ScrollTriggers created inside these functions are segregated and get
		// reverted/killed when the media query doesn't match anymore.
        
        
        
        
	},
    
	// all 
	"all": function () {
        const revealAni = document.getElementsByClassName("gs_reveal");
        if(revealAni){
          gsap.utils.toArray(revealAni).forEach(function(elem, index){
            gsap.set(elem, {autoAlpha: 0}); // assure that the element is hidden when scrolled into view
            const getDelay = elem.getAttribute('data-gs-delay');

            var x = 0,
              y = 80,
              z = -100;

            if (elem.classList.contains('reveal_fromDown')) {
              y = -80
            } else if(elem.classList.contains("reveal_fromUp")){
              y = 80;
            } else if (elem.classList.contains("reveal_fromRight")) {
              x = 300;
              y = 0;
              z = 10;
            } else if (elem.classList.contains("reveal_fromLeft")) {
              x = -300;
              y = 0;
              z = 10;
            } 
            gsap.fromTo(elem, {
              x: x,
              y: y,
              z: z,
              autoAlpha: 0
            }, {
              scrollTrigger: {
                trigger: elem.parentNode,
                start: 'top 70%',
                end: 99999,
                //onEnter:()=>elem.classList.add('active'),
                toggleClass: {className: 'active', targets: '.gs_reveal'}
                //toggleClass: {className: 'waypoint', targets: '.main-header, #gnb'}
                //markers:true
              },
              duration: 1.8,
              x: 0,
              y: 0,
              z: 0,
              autoAlpha: 1,
              ease: Power2.easeOut,
              overwrite: "auto",
              delay: getDelay * 0.001
            });
          });
        }/* gs_reveal이 있을때만 실행 */
	}
});




// ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
 ScrollTrigger.refresh();