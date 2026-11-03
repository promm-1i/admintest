let lenis = null;
let lenisRafFn = null;

// Lenis 초기화
function initLenis() {
    if (lenis || window.innerWidth <= 1240) return;

    lenis = new Lenis({
        duration: 1.0,
        infinite: false,
        gestureOrientation: "vertical",
        normalizeWheel: false,
        smoothTouch: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    lenisRafFn = (time) => {
        lenis.raf(time * 1000);
    };
    gsap.ticker.add(lenisRafFn);
}


// Lenis 제거
function destroyLenis() {
    if (!lenis) return;

    lenis.destroy();
    lenis = null;

    if (lenisRafFn) {
        gsap.ticker.remove(lenisRafFn);
        lenisRafFn = null;
    }

    if (typeof removeScrollEventListeners === 'function') {
        removeScrollEventListeners();
    }
}

// 초기 실행
initLenis();

window.addEventListener("resize", () => {
    if (window.innerWidth > 1240) {
        initLenis();
    } else {
        destroyLenis();
    }
});



$(document).ready(function () {
    gsap.registerPlugin(ScrollTrigger);


    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);


        // resize
        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        })

    $('.share-btn').click(function(event) {
        event.stopPropagation(); // 클릭 이벤트 전파 중지
        $('.share_area').toggleClass('on');
    });

    $(document).click(function(event) {
        if (!$(event.target).closest('.share_area').length && !$(event.target).closest('.share_btn').length) {
            $('.share_area').removeClass('on');
        }
    });




    //브라우저 스크롤 크기 감지
    var scrollingElement = document.scrollingElement;
    var scrollWidth = window.innerWidth - scrollingElement.clientWidth
    var root = document.querySelector(':root');
    let styles = getComputedStyle(root);
    styles.getPropertyValue('--scroll-width');
    root.style.setProperty('--scroll-width', scrollWidth+'px');


    function ScrollXArr() {
        // Check if top_tab exists
        if ($('.top_tab').length === 0) {
            return; // Exit the function if top_tab doesn't exist
        }


        // Add 'first' class to top_tab
        $('.top_tab').addClass('first');

        $('.top_tab .wrap').on('scroll', function () {
            var tabScroll = $(this).scrollLeft();
            var maxScroll = $(this)[0].scrollWidth - $(this).width();

            if (tabScroll >= maxScroll -1 ) {
                // Scrolled to the end
                $('.top_tab').addClass('last').removeClass('first');
            } else if (tabScroll === 0) {
                // Scrolled to the beginning
                $('.top_tab').addClass('first').removeClass('last');
            }
        });
    }
    ScrollXArr()



    function moveToSlide(slideIndex) {
        mySwiper.slideTo(slideIndex);
    }



    

    $("select").niceSelect();

    document.querySelectorAll("input, textarea").forEach(el => {
        el.addEventListener("input", function() {
            if (this.value.trim() !== "") {
                this.classList.add("none");   // 입력값 있으면 none 클래스 추가
            } else {
                this.classList.remove("none"); // 입력값 없으면 none 클래스 제거
            }
        });
    });



    $('.sub_nav button').on('click', function(){
        $('.sub_nav button').not($(this)).removeClass('open')
        $(this).toggleClass('open')
    })



    $(".over_modal").click(function (e){
        var target = e.target;
        if ($(target).hasClass("scroll_box") || $(target).hasClass("over_modal") ) {
            overModalClose();
            lenis.start();
        }
    });



    

    // stemoria 추가
    // Tab
    const tabs = document.querySelectorAll('.line_tab_wrap:not(.inner_tab) .line_tab');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          const targetName = tab.dataset.name;
          document.querySelectorAll('.tab_cont').forEach(cont => {
          cont.classList.toggle('active', cont.dataset.name === targetName);
        });

          // 모바일 tab
          if (window.innerWidth < 1240) {
              const wrap = tab.closest('.line_tab_wrap');
              const wrapRect = wrap.getBoundingClientRect();
              const tabRect = tab.getBoundingClientRect();
              const scrollLeft = wrap.scrollLeft + (tabRect.left - wrapRect.left - 20);
              wrap.scrollTo({ left: scrollLeft, behavior: 'smooth' });
          }
      });
    });


    const roundTabs = document.querySelectorAll('.round_tab_wrap:not(.inner_tab) .round_tab');

    roundTabs.forEach(tab => {
      tab.addEventListener('click', () => {
          roundTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          const targetName = tab.dataset.name;
          document.querySelectorAll('.tab_cont').forEach(cont => {
          cont.classList.toggle('active', cont.dataset.name === targetName);
        });
      });
    });


    // 자주 묻는 질문
    if (document.querySelector(".faq_sect .qna_list")) {
        // 첫 번째 아이템 초기 활성화
        const $firstRow = $('.qna_list .row').first();
        $firstRow.addClass('active');
        $firstRow.find('.que').addClass('active');
        $firstRow.find('.answer').addClass('show').show();

        $('.que').on('click', function () {
            const $question = $(this);
            const $row = $question.closest('.row');
            const $answer = $question.next('.answer');
            const isActive = $row.hasClass('active');

            $('.qna_list .row').not($row).removeClass('active').find('.que').removeClass('active');
            $('.qna_list .row').not($row).find('.answer').slideUp(300).removeClass('show');

            if (isActive) {
                $row.removeClass('active');
                $question.removeClass('active');
                $answer.stop(true, true).slideUp(300).removeClass('show');
            } else {
                $row.addClass('active');
                $question.addClass('active');
                $answer.stop(true, true).slideDown(300).addClass('show');
            }
        });
    }
    

    // 프로그램 안내_진행 과정
    if (document.querySelector(".program_page .step_sect .cont .step_list")) {
        const list  = document.querySelector(".program_page .step_sect .cont .step_list");
        const line  = list.querySelector(".line");
        const dot   = line.querySelector(".dot");
        const items = gsap.utils.toArray(".program_page .step_sect .cont .step_list .item");

        function build() {
            ScrollTrigger.getAll().forEach(st => { if (st.vars?.trigger === list) st.kill(true); });

            gsap.set(items, { opacity: 0, y: 80 });

            const centers = items.map(el => el.offsetTop + el.offsetHeight / 2);
            const firstC  = centers[0];
            const lastC   = centers[centers.length - 1];
            const scrollLen = Math.max(1, lastC - firstC);

            const lineRatio = Math.min(1, lastC / list.scrollHeight); // 라인이 자랄 최종 비율
            const totalSteps = items.length;                           // 타임라인 총 길이

            const tl = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                    trigger: list,
                    start: "top center",
                    end: () => "+=" + scrollLen,
                    scrub: true,
                    markers: false,
                    invalidateOnRefresh: true
                }
            });

            tl.fromTo(line, { height: 0 }, { height: (lineRatio * 100) + "%", duration: totalSteps }, 0)
                .fromTo(dot,  { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0);

            centers.forEach((c, i) => {
                const at = gsap.utils.clamp(0, 1, (c - firstC) / scrollLen) * totalSteps; // 0~totalSteps
                tl.fromTo(items[i],
                    { opacity: 0, y: 80 },
                    { opacity: 1, y: 0, ease: "power2.out", duration: 0.18 },
                    Math.max(0, at - 0.1) // 살짝 먼저 시작
                );
            });
        }

        build();
        ScrollTrigger.addEventListener("refreshInit", build);
        window.addEventListener("load", () => ScrollTrigger.refresh());
    }


    // observer
    function ComContObserver(selector, num, type, target2) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const $target = entry.target;
                const isIntersecting = entry.isIntersecting;

                if (isIntersecting) {
                    if (target2) $(target2).addClass("active");
                    $($target).addClass("active");
                } else if (type) {
                    $($target).removeClass("active");
                }
            });
        }, { threshold: num });

        document.querySelectorAll(selector).forEach((item) => {
            observer.observe(item);
        });
    }

    ComContObserver('.sub_tit_box', 0.5, false);
    ComContObserver('.sub_tit', 0.5, false);
    ComContObserver('.faq_sect .qna_list', 0, false, true);
    ComContObserver('.sub .counsel_sect', 0.6 , false);
    ComContObserver('.board_view_page .reaction_cont .cont_box', 0.6 , false);
    



    
    // 빈링크 클릭 방지
    $(document).on('click', 'a[href="#"]', function(e) {
        e.preventDefault();
    });


    // //stemoria




    // ADD
    // Copy Button
    // $('.copy_btn').on('click', function () {
    //     const text = $(this).closest('.address').find('.copy_target').text().trim();
    //     const $temp = $('<textarea>');
    //     $('body').append($temp);
    //     $temp.val(text).select();
    //     document.execCommand('copy');
    //     $temp.remove();

    //     const $msg = $(this).find('.copy_msg');
    //     $msg.stop(true, true).fadeIn(200).delay(1500).fadeOut(200);
    // });


    // Form
    // placeholder
    // if ($('.form_inp .inp input').length) {
    //     $('.form_inp .inp input').on('input blur', function () {
    //         const $input = $(this);
    //         const hasValue = $input.val().trim() !== '';
    //         const $placeholder = $input.next('.placeholder');

    //         if (hasValue) {
    //             $placeholder.css('opacity', 0);
    //         } else if (!$input.is(':focus')) {
    //             $placeholder.css('opacity', 1);
    //         }
    //     });
    // }

    // Select
    // $(document).on('click', '.form_inp .nice-select .option:not(.disabled)', function () {
    //     const $niceSelect = $(this).closest('.nice-select');
    //     const selectedText = $(this).text().trim();

    //     if (selectedText && selectedText !== '선택') {
    //         $niceSelect.find('.current').css('opacity', 1);
    //     } else {
    //         $niceSelect.find('.current').css('opacity', 0);
    //     }
    // });


});



// fill txt
// window.addEventListener("load", function () {
//     if (document.querySelector(".top_txt_box .sub_tit.fill_txt")) {
//         setTimeout(() => {
//             const duration = 0.8; // 채워지는 속도
//             const gap = 0.3;    // 각 간격
//             document.querySelectorAll(".top_txt_box .sub_tit.fill_txt span").forEach((el, i) => {
//                 gsap.to(el, {
//                     backgroundSize: "100% 100%",
//                     ease: "none",
//                     duration: duration,
//                     delay: i * (duration - gap)
//                 });
//             });
//         }, 1000);
//     }
// });
