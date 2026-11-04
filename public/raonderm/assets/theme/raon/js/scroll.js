gsap.registerPlugin(ScrollTrigger);

var clickEvent_2 = (function () {
	if ('ontouchstart' in document.documentElement === true) {
		return 'touchstart';
	} else {
		return 'click';
	}
})(); // 클릭이벤트와 터치이벤트 토글


// ********************* locomotive scroll 스크롤 효과

// const mainPage = document.querySelector('.main-section');
// let locoScroll;

// if(!mainPage){
// 	locoScroll = new LocomotiveScroll({
// 		el: document.querySelector(".smooth-scroll"),
// 		smooth: false
// 	})
// } else{
// 	locoScroll = new LocomotiveScroll({
// 		el: document.querySelector(".smooth-scroll"),
// 		smooth: true,
// 		smartphone: { smooth: false },
// 		tablet: { smooth: false },
// 	});
  
// }
// locoScroll.on("scroll", ScrollTrigger.update);

// ScrollTrigger.scrollerProxy(".smooth-scroll", {
//     scrollTop(value) {
//         return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
//     },
//     getBoundingClientRect() {
//         return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
//     },
//     pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
// });

ScrollTrigger.matchMedia({
    
	// desktop
	"(min-width: 961px)": function () {
    
		// setup animations and ScrollTriggers for screens over 800px wide (desktop) here...
		// ScrollTriggers will be reverted/killed when the media query doesn't match anymore.
	},
    
	// mobile
	"(max-width:960px)": function () {
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
        menuItem.forEach(menu =>{menu.addEventListener(clickEvent,function(e){
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

    
    $('.counter4').each(function(i) {

      $(this).attr('id','count'+4);
      const thisID_4 = $(this).attr("id");
      const thisCount_4 = $(this).data('count');

      var counter_4 = new CountUp(thisID_4, 10, thisCount_4, 0, 3, {  
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
      });

      var waypoint_4 = new Waypoint({
          element: document.getElementById(thisID_4),
          handler: function(direction) {
              if (direction == "up") {
                  counter_4.reset();
              } else {
                  counter_4.start();
              }
          },
          offset: '70%'
      });

    });
    
    $('.counter5').each(function(i) {

      $(this).attr('id','count'+5);
      const thisID_5 = $(this).attr("id");
      const thisCount_5 = $(this).data('count');

      var counter_5 = new CountUp(thisID_5, 7000, thisCount_5, 0, 2, {  
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
      });

      var waypoint_5 = new Waypoint({
          element: document.getElementById(thisID_5),
          handler: function(direction) {
              if (direction == "up") {
                  counter_5.reset();
              } else {
                  counter_5.start();
              }
          },
          offset: '70%'
      });

    });
       
    $('.counter6').each(function(i) {

      $(this).attr('id','count'+6);
      const thisID_6 = $(this).attr("id");
      const thisCount_6 = $(this).data('count');
      const thisStartCount_6 = $(this).data('scount');
      const thisSecond_6 = $(this).data('second');

      var counter_6 = new CountUp(thisID_6, thisStartCount_6, thisCount_6, 0, thisSecond_6, {  
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
      });

      var waypoint_6 = new Waypoint({
          element: document.getElementById(thisID_6),
          handler: function(direction) {
              if (direction == "up") {
                  counter_6.reset();
              } else {
                  counter_6.start();
              }
          },
          offset: '70%'
      });

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


       // progress
       window.addEventListener('scroll', setScrollValue, false);
       window.addEventListener('resize', setScrollValue, false);
       function setScrollValue() {  
           var percent = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
           // $('.progress-num').text(Math.round(percent * 100)); 
           // $('.progress-bg').css({
           //     'transform': 'rotate(' + (percent * 360) + 'deg)',
           //     '-moz-transform': 'rotate(' + (percent * 360) + 'deg)',
           //     '-ms-transform': 'rotate(' + (percent * 360) + 'deg)',
           //     '-o-transform:rotate': 'rotate(' + (percent * 360) + 'deg)'
           // });
       }






        // main_cont04_video
        // ScrollTrigger 로 해당 영역에 왔을때 video 재생 및 일시정지 시키기
        const videos_main_cont = gsap.utils.toArray('video')
        videos_main_cont.forEach(function(video, i) {
            function playVideo(el) {
                let vid_main_cont = document.getElementById('main_cont04_video');
                setTimeout(function() {
                    vid_main_cont.play();
                }, 1500);
            }
            
            function pauseVideo(el) {
                let vid_main_cont = document.getElementById('main_cont04_video');
                vid_main_cont.pause();
            }
            
            const main_cont04_video = document.getElementById('main_cont04_video');
            const rection02  = document.getElementById('rection02');
            ScrollTrigger.create({
              trigger: rection02,
              start: 'top 50%',
              end: 'bottom 30%',
              markers:false,
              toggleClass: {className: 'on', targets: '.rection02'},
              onToggle: self => self.isActive ? playVideo("main_cont04_video") : pauseVideo("main_cont04_video"),
            });
            
        });
        // //ScrollTrigger 로 해당 영역에 왔을때 video 재생 및 일시정지 시키기      

	}
  
});

// ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
// ScrollTrigger.refresh();