$(document).ready(function() {
    var $header = $('header');
    var $body = $('body');
    // 페이지 내의 모든 메뉴 리스트
    var $allGnbLists = $('.gnb_list'); 
    var $pcTopGnbList = $('.pc-gnb-row .gnb_list');
    var $mobileGnbList = $('.gnb-row .gnb_list');
    var $toggleBtn = $('#toggle-menu');
    var mobileBreakpoint = 1200;
    var headerMinHeight = $header.outerHeight();
    var activeCode = (typeof gnbActiveCode !== 'undefined' && gnbActiveCode) ? String(gnbActiveCode) : '';
    
    // [통합] 비주얼 타겟 설정 (메인, 서브, 빅 서브 중 존재하는 것을 선택)
    var $mainVisual = $('.main-visual-swiper').closest('.section-01');
    var $subVisual = $('.sub-visual');
    var $subVisualBig = $('.sub-visual-big');

    // 우선순위: 메인 > 빅서브 > 일반서브 순으로 체크하여 타겟 결정
    var $visualTarget = $mainVisual.length > 0 ? $mainVisual : ($subVisualBig.length > 0 ? $subVisualBig : $subVisual);
    
    // 마우스 이탈 방어용 타이머
    var leaveTimer = null;

    // [중요] 1. 시작하자마자 모든 서브메뉴 박스를 강제로 숨김
    $('.depth_box').hide(); 

    // [함수] 현재 페이지 활성화 상태 복구
    function restoreActiveState() {
        if (activeCode.length >= 1) {
            var d1 = parseInt(activeCode.charAt(0)) - 1;
            
            $allGnbLists.each(function() {
                var $ul = $(this);
                $ul.children('li').removeClass('active');
                $ul.find('.depth_box').hide();
                
                if (d1 >= 0) {
                    var $targetLi = $ul.children('li').eq(d1);
                    $targetLi.addClass('active'); 
                }
            });
        } else {
            $allGnbLists.children('li').removeClass('active');
            $('.depth_box').hide();
        }
    }

    // [초기 로딩] Active 클래스 붙이기
    if (activeCode.length >= 2) {
        var d1 = parseInt(activeCode.charAt(0)) - 1;
        var d2 = parseInt(activeCode.charAt(1)) - 1;
        
        if (d1 >= 0) {
            $allGnbLists.each(function() {
                var $ul = $(this);
                var $d1Item = $ul.children('li').eq(d1);
                $d1Item.addClass('active');
                $d1Item.find('.depth_box').hide(); 

                if (d2 >= 0) {
                    $d1Item.find('.depth_box .depth2 > li').eq(d2).addClass('active');
                }
            });
        }
    }

    function isMobile() {
        return window.innerWidth < mobileBreakpoint;
    }

    // 1. 메뉴 초기화 함수
    function resetMenu() {
        $header.removeClass('mobile-menu-open pc-menu-open');
        $toggleBtn.removeClass('menu-is-active');
        $('body').removeClass('overflow');
        $('.depth_box').removeAttr('style').hide(); 
        
        if (!isMobile()) {
            restoreActiveState(); 
        } else {
            $allGnbLists.children('li').removeClass('active');
        }

        $allGnbLists.css('height', ''); 
        $header.css('height', '');
        
        if (!isMobile()) {
            headerMinHeight = $header.outerHeight();
        }
    }

    // 2. 리사이즈 감지
    var lastWindowWidth = $(window).width();
    $(window).on('resize', function() {
        var currentWindowWidth = $(window).width();

        // 통합 투명도 제어 함수 호출 (구형 updateVisualHeight 대체)
        handleHeaderTransparency();

        if (lastWindowWidth !== currentWindowWidth) {
            if ($header.hasClass('mobile-menu-open') || $header.hasClass('pc-menu-open')) {
                resetMenu();
            }
            if ((lastWindowWidth < mobileBreakpoint && currentWindowWidth >= mobileBreakpoint) || 
                (lastWindowWidth >= mobileBreakpoint && currentWindowWidth < mobileBreakpoint)) {
                resetMenu();
            }
            lastWindowWidth = currentWindowWidth;
        }
    });

    // 3. 전체 메뉴 토글 버튼
    $toggleBtn.on('click', function() {
        var $this = $(this);
        
        if ($this.hasClass('menu-is-active')) {
            $this.removeClass('menu-is-active');
            if (isMobile()) {
                $header.removeClass('mobile-menu-open');
                $allGnbLists.css('height', '');
                $('.depth_box').hide();
                $allGnbLists.children('li').removeClass('active');
            } else {
                $header.removeClass('pc-menu-open').css('height', '');
                $header.stop().animate({ height: headerMinHeight }, 0);
                restoreActiveState(); 
            }
            $('body').removeClass('overflow');
            return;
        }

        $this.addClass('menu-is-active');
        $('body').addClass('overflow');

        if (isMobile()) {
            $header.addClass('mobile-menu-open').removeClass('pc-menu-open');
            var targetIndex = 0;
            if (activeCode.length >= 1) {
                var d1Index = parseInt(activeCode.charAt(0)) - 1;
                if (d1Index >= 0 && d1Index < $mobileGnbList.children('li').length) {
                    targetIndex = d1Index;
                }
            }
            var $targetLi = $mobileGnbList.children('li').eq(targetIndex);
            $targetLi.removeClass('active').find('.depth_box').hide();
            setTimeout(function() { $targetLi.children('a').trigger('click'); }, 10);
        } else {
            $header.addClass('pc-menu-open').removeClass('mobile-menu-open').css('height', ''); 
            restoreActiveState(); 
        }
    });

    // 4. GNB 1차 메뉴 클릭 (Mobile)
    $allGnbLists.on('click', '> li > a', function(e) {
        if (isMobile()) {
            var $depthBox = $(this).siblings('.depth_box');
            if ($depthBox.find('li').length > 0) {
                e.preventDefault();
                var $li = $(this).parent('li');
                var $currentUlist = $li.parent('.gnb_list');
                if ($depthBox.is(':visible')) return;

                $currentUlist.css('height', ''); 
                var gnbDefaultHeight = $currentUlist.outerHeight();
                $currentUlist.find('.depth_box').slideUp(80);
                $currentUlist.children('li').removeClass('active');
                
                $li.addClass('active');
                $depthBox.slideDown(250, function(){
                    var depthHeight = $(this).outerHeight();
                    if (depthHeight > gnbDefaultHeight) {
                        $currentUlist.stop().animate({ height: depthHeight }, 80);
                    } else {
                        $currentUlist.stop().animate({ height: gnbDefaultHeight }, 250);
                    }
                });
            }
        }
    });

    // 5. PC 상단 메뉴 호버
    $pcTopGnbList.on('mouseenter', '> li', function() {
        if ($header.hasClass('pc-menu-open')) return;
        if (!isMobile()) {
            if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
            $pcTopGnbList.find('.depth_box').not($(this).find('.depth_box')).hide();
            $pcTopGnbList.children('li').removeClass('active');
            $(this).addClass('active');

            var $depthBox = $(this).find('.depth_box');
            if ($depthBox.length > 0) {
                $depthBox.stop().show();
                var depthHeight = $depthBox.outerHeight(); 
                $header.stop().animate({ height: headerMinHeight + depthHeight }, 200);
            } else {
                $header.stop().animate({ height: headerMinHeight }, 200);
                $depthBox.hide();
            }
        }
    });

    $header.on('mouseleave', function() {
        if ($header.hasClass('pc-menu-open')) return;
        if (!isMobile()) {
            leaveTimer = setTimeout(function() {
                $header.stop().animate({ height: headerMinHeight }, 200, function(){
                    $('.depth_box').hide();
                    restoreActiveState(); 
                });
            }, 150); 
        }
    });

    // -------------------------------------------------------
    // 6. 스크롤 감지 (헤더 투명도 및 숨김/표시 제어)
    // -------------------------------------------------------
    var lastScrollTop = 0;
    var delta = 5; 

    // [통합 함수] 헤더 투명도 제어 로직 (메인/서브 공통)
    function handleHeaderTransparency() {
        var st = $(window).scrollTop();
        var currentHeaderHeight = $header.outerHeight();
        
        if ($visualTarget.length > 0) {
            var visualHeight = $visualTarget.outerHeight();
            // 비주얼 영역 안에 있을 때 (투명), 벗어났을 때 (불투명)
            if (st <= visualHeight - currentHeaderHeight) {
                $body.addClass('header-transparent');
            } else {
                $body.removeClass('header-transparent');
            }
        }
    }

    // 초기 실행
    handleHeaderTransparency();

    $(window).scroll(function(event){
        var st = $(this).scrollTop();
        var currentHeaderHeight = $header.outerHeight();
        
        // 투명도 실시간 체크
        handleHeaderTransparency();

        if ($header.hasClass('mobile-menu-open') || $header.hasClass('pc-menu-open')) return;
        if (Math.abs(lastScrollTop - st) <= delta) return;

        // 헤더 숨김/노출 제어
        if (st > lastScrollTop && st > currentHeaderHeight){
            $header.addClass('header-hidden');
            $('.depth_box').hide();
            $allGnbLists.children('li').removeClass('active');
        } else {
            if(st + $(window).height() < $(document).height()) {
                $header.removeClass('header-hidden');
            }
        }
        
        // 퀵메뉴 제어
        var $quickMenu = $('#quick');
        if ($quickMenu.length > 0) {
            if (st > lastScrollTop && st > currentHeaderHeight) {
                $quickMenu.addClass('quick-hidden');
            } else {
                $quickMenu.removeClass('quick-hidden');
            }
        }
        lastScrollTop = st;
    }); 

    // 7. 탑 버튼 클릭 시 최상단 이동
    $('.top-btn').on('click', function(e) {
        e.preventDefault();
        $('html, body').stop().animate({ scrollTop: 0 }, 400);
    });   

    initCommonVideo();
});

/**
 * [1] 공통 비디오 초기화 함수
 */
function initCommonVideo() {
    var $targets = $('[data-vbg]').not('.swiper-slide-duplicate [data-vbg]');
    if ($targets.length > 0) {
        $targets.youtube_background();
    }
}

/**
 * [2] 메인 비주얼 전용 함수
 */
function initMainVisual() {
    var $swiperContainer = $('.main-visual-swiper');
    if ($swiperContainer.length === 0) return;

    var $progress = $('.progress-bar');
    var $controllerDiv = $('.controller');
    var totalSlides = $('.main-visual-swiper .swiper-slide:not(.swiper-slide-duplicate)').length;

    var tick, time = 0, duration = 5, isPaused = false, currentVideo = null, lastTime = 0, isVideoStarted = false, isInViewport = true; 

    var mainSwiper = new Swiper(".main-visual-swiper", {
        slidesPerView: 1,
        touchRatio: 0, 
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 800,
        autoplay: false, 
        autoHeight: false, 
        navigation: { nextEl: ".btn-custom-next", prevEl: ".btn-custom-prev" },
        on: {
            init: function() { updatePagination(this.realIndex + 1); },
            slideChangeTransitionEnd: function() {
                updatePagination(this.realIndex + 1);
                slideAction(this); 
            }
        }
    });

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                isInViewport = entry.isIntersecting;
                if (!isInViewport) {
                    if (currentVideo && currentVideo.player && typeof currentVideo.player.pauseVideo === 'function') {
                        currentVideo.pause();
                    }
                } else {
                    if (!isPaused && currentVideo && currentVideo.player && typeof currentVideo.player.playVideo === 'function') {
                        currentVideo.play();
                    }
                    lastTime = Date.now();
                }
            });
        }, { threshold: 0 });
        observer.observe($swiperContainer[0]);
    }

    setTimeout(function() { slideAction(mainSwiper); }, 500);

    function updatePagination(currentIdx) {
        $('.main-visual-swiper .swiper-pagination').html('<span class="swiper-pagination-current">' + currentIdx + '</span> <span class="separator">/</span> <span class="swiper-pagination-total">' + totalSlides + '</span>');
    }

    function slideAction(swiper) {
        clearInterval(tick);
        $progress.css('width', '0%');
        time = 0; currentVideo = null; isVideoStarted = false; lastTime = Date.now();  

        $('.main-visual-swiper .swiper-slide .txt-row, .main-visual-swiper .swiper-slide .btn-row').removeClass('motion-up');
        var $activeSlide = $(swiper.slides[swiper.activeIndex]);
        
        setTimeout(function() {
            $activeSlide.find('.txt-row, .btn-row').addClass('motion-up');
        }, 100);
        
        var type = $activeSlide.data('type');
        if (window.innerWidth <= 1024 && type === 'video') type = 'image';
        var slideTime = $activeSlide.data('time');
        duration = slideTime ? parseInt(slideTime) : 5;

        if (window.innerWidth < 1200) { 
            var currentHeight = $activeSlide.outerHeight();
            if(currentHeight > 0) $swiperContainer.css('height', currentHeight + 'px');
        } else {
            $swiperContainer.css('height', ''); 
        }

        if (type === 'video') {
            if (window.VIDEO_BACKGROUNDS) {
                for (var k in window.VIDEO_BACKGROUNDS.index) {
                    var v = window.VIDEO_BACKGROUNDS.index[k];
                    if (v.element && $(v.element).closest('.main-visual-swiper').length > 0) {
                         if (v.player && typeof v.player.pauseVideo === 'function') { v.pause(); v.seek(0); }
                    }
                }
            }
            var vbgElement = $activeSlide.find('.vbg_common')[0];
            if (window.VIDEO_BACKGROUNDS && vbgElement) currentVideo = window.VIDEO_BACKGROUNDS.get(vbgElement);
            if (currentVideo && !isPaused && isInViewport) {
                if (currentVideo.player && typeof currentVideo.player.playVideo === 'function') { currentVideo.play(); currentVideo.seek(0); } 
            }
        } 
        if (!isPaused) startProgress();
    }

    function startProgress() {
        clearInterval(tick);
        tick = setInterval(function() {
            var now = Date.now();
            var dt = (now - lastTime) / 1000; 
            lastTime = now;

            if (!isPaused && isInViewport) {
                if (currentVideo && currentVideo.player && typeof currentVideo.player.getCurrentTime === 'function') {
                    var currentSec = currentVideo.player.getCurrentTime();
                    var totalSec = currentVideo.player.getDuration();
                    var playerState = currentVideo.player.getPlayerState(); 

                    if (!isVideoStarted) {
                        if (playerState === 1 && currentSec < 1.5) isVideoStarted = true; 
                        else { $progress.css('width', '0%'); return; }
                    }
                    if (isVideoStarted && totalSec > 0) {
                        var percent = (currentSec / totalSec) * 100;
                        $progress.css('width', Math.min(percent, 100) + '%');
                        if ((totalSec - currentSec) < 0.2 || playerState === 0) mainSwiper.slideNext();
                    }
                } else {
                    time += dt;
                    var percent = (time / duration) * 100;
                    $progress.css('width', Math.min(percent, 100) + '%');
                    if (time >= duration) mainSwiper.slideNext();
                }
            }
        }, 50);
    }

    $('.btn-swiper-pause').on('click', function() {
        isPaused = true; clearInterval(tick); $controllerDiv.addClass('is-paused');
        if (currentVideo && currentVideo.player) currentVideo.pause();
    });

    $('.btn-swiper-play').on('click', function() {
        isPaused = false; $controllerDiv.removeClass('is-paused');
        lastTime = Date.now(); if (currentVideo && currentVideo.player) currentVideo.play();
        startProgress();
    });
}

/* 마이페이지 탭 */   
function initSwiper() {
    var offsetRaw = window.innerWidth < 1200 ? window.innerWidth * 0.0625 : 0;
    new Swiper(".my-tab-swiper", {
        slidesPerView: 3,
        spaceBetween: 0,
        watchOverflow: true,
        freeMode: true,
        slidesOffsetBefore: offsetRaw,
        slidesOffsetAfter: offsetRaw,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            1200: {
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                slidesPerView: 6,
                freeMode: false,
            }
        },
        on: {
            resize: function() {
                // ★ 수정된 부분: 1200px 미만일 때만 오프셋 계산 및 적용
                if (window.innerWidth < 1200) {
                    var newOffset = window.innerWidth * 0.0625;
                    this.params.slidesOffsetBefore = newOffset;
                    this.params.slidesOffsetAfter = newOffset;
                } else {
                    // 768px 이상이면 0으로 강제하거나 breakpoints 설정이 적용되도록 둠
                    // (명시적으로 0을 주는 것이 안전함)
                    this.params.slidesOffsetBefore = 0;
                    this.params.slidesOffsetAfter = 0;
                }
                this.update(); // 업데이트 적용
            }
        },          
    }); 
}

/* ==========================================================================
   [공통] 게시판 아코디언 기능 (온라인 상담, 고객의 소리 등)
   ========================================================================== */
$(document).on("click", ".list-row .item-head", function() {
    var $item = $(this).closest(".item");     // 클릭한 헤더의 부모 item 찾기
    var $body = $item.find(".item-body");     // 해당 item의 본문 찾기

    // 1. 이미 열려있는 경우 -> 닫기
    if ($item.hasClass("active")) {
        $body.stop().slideUp(300); 
        $item.removeClass("active");
    } 
    // 2. 닫혀있는 경우 -> 열기
    else {
        // [아코디언 효과] 
        // 같은 부모(ul.list-row) 아래에 있는 다른 item들은 닫기
        $item.siblings(".item").removeClass("active").find(".item-body").stop().slideUp(300);

        // 클릭한 항목 열기
        $body.stop().slideDown(300);
        $item.addClass("active");
    }
});

/* 다음 우편번호 검색 */
function openPostcode() {
    kakao.postcode.load(function() {
        new kakao.Postcode({
            oncomplete: function(data) {
                var addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;

                // 1. 값 넣기 (공통)
                document.getElementById('userZip').value = data.zonecode;
                document.getElementById('userAddress1').value = addr;
                document.getElementById('userAddress2').value = ''; 
                document.getElementById('userAddress2').focus();

                // 2. [수정] 현재 페이지의 폼 ID 동적 감지
                // 정보수정(#infoedit-Form) 또는 회원가입(#infoForm) 중 존재하는 것 찾기
                var $currentForm = $("#infoedit-Form").length > 0 ? $("#infoedit-Form") : $("#infoForm");

                // 3. 유효성 검사 실행 (폼이 존재하고, validator가 초기화된 경우만)
                if ($currentForm.length > 0 && $currentForm.data('validator')) {
                    $currentForm.validate().element("#userZip");
                    $currentForm.validate().element("#userAddress1");
                }
            }
        }).open();
    });
}

/* 메인 텍스트 애니메이션 */
function startMarqueeIndividual($container) {
    // 1. 초기화 (리사이즈 등 재실행 대비)
    if ($container.find('.marquee-track').length > 0) {
        var $firstP = $container.find('p').first();
        $container.empty().append($firstP);
    }

    var $p = $container.find('p');
    var pWidth = $p.outerWidth(); 
    var windowWidth = $(window).width();

    // 2. [그룹 A] 만들기
    var requiredReps = Math.ceil(windowWidth / pWidth) + 1; 
    
    var $group = $('<div>').css({ display: 'flex' });
    for (var i = 0; i < requiredReps; i++) {
        $group.append($p.clone());
    }

    // 3. 트랙 구성
    var $track = $('<div class="marquee-track"></div>');
    $track.append($group);          // 그룹 A
    $track.append($group.clone());  // 그룹 B

    $container.empty().append($track);

    // 4. 애니메이션 적용
    var groupWidth = pWidth * requiredReps; 
    
    // ★ 속도 조절: 숫자가 작을수록 느림 (권장: 50 ~ 150)
    var speed = 100; 
    
    // 거리(px) / 속도(px/s) = 시간(s)
    var duration = groupWidth / speed; 

    $track.css({
        'animation': `infinite-marquee ${duration}s linear infinite`
    });
}

/* 탭 */
/**
 * 탭 메뉴 스와이퍼 초기화 함수
 * @param {string} swiperSelector - (선택) 클래스명 (기본값: '.swiper')
 * @param {number|string} viewCount - (선택) 모바일 기본 개수 (기본값: 'auto')
 * @param {object} customBreakpoints - (선택) 반응형 설정 (기본값: null)
 * @param {number} slidesOffset - (선택) 좌우 여백 px (기본값: 0)
 */
function initTabMenus(swiperSelector = '.swiper', viewCount = 'auto', customBreakpoints = null, slidesOffset = 0) {
    const tabContainers = document.querySelectorAll('.tab-container');

    let swiperInstances = [];

    tabContainers.forEach(container => {
        const swiperElement = container.querySelector(swiperSelector);
        let tabSwiper = null;

        if (swiperElement && !swiperElement.classList.contains('swiper-initialized')) {
            const swiperOptions = {
                slidesPerView: viewCount,
                spaceBetween: 0,
                slidesOffsetBefore: slidesOffset,
                slidesOffsetAfter: slidesOffset, 
                freeMode: true,
                observer: true,
                observeParents: true,
                resizeObserver: true,
            };

            if (customBreakpoints) {
                swiperOptions.breakpoints = customBreakpoints;
            }

            tabSwiper = new Swiper(swiperElement, swiperOptions);
            swiperInstances.push(tabSwiper);
        }

        const tabs = container.querySelectorAll('.tab-btn');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', (e) => {
                // data-target이 있을 때만(내부 탭일 때만) 이동을 막음
                if (tab.dataset.target) {
                    e.preventDefault();
                }

                // (1) 탭 활성화
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                if (tabSwiper) {
                    tabSwiper.slideTo(index, 300);
                }

                // (2) 콘텐츠 활성화
                const targetId = tab.dataset.target;
                const targetPanel = document.querySelector(targetId);

                if (targetPanel) {
                    const parentContainer = targetPanel.parentElement;
                    if (parentContainer) {
                        const siblings = parentContainer.querySelectorAll('.tab-panel');
                        siblings.forEach(p => p.classList.remove('active'));
                    }
                    targetPanel.classList.add('active');
                }

                // ============================================================
                // ★ [수정] 스크롤 위치 보정 로직 (대타 활용)
                // ============================================================
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                // 1. 기준 요소 찾기
                // 탭이 fixed 되면 스크롤을 따라다니므로 위치 계산이 틀어짐.
                // 따라서 원래 자리를 지키고 있는 'tab-placeholder'를 찾아야 함.
                let targetElement = container;
                const prevElement = container.previousElementSibling;

                // 바로 위에 형제 요소가 있고, 그게 대타(placeholder)라면 그걸 기준으로 삼음
                if (prevElement && prevElement.classList.contains('tab-placeholder')) {
                    targetElement = prevElement;
                }

                // 2. 절대 좌표 계산 (문서 전체 기준 Top)
                const elementRect = targetElement.getBoundingClientRect();
                const absoluteTop = window.scrollY + elementRect.top;
                
                // 3. 목표 위치 설정 (탭 시작 위치 - 헤더 높이)
                // 여기서 -1px은 계산 오차로 1px 정도 틈이 생기는걸 방지
                const targetScrollPos = absoluteTop - headerHeight - 1;

                // 4. 현재 스크롤이 목표보다 아래에 있으면 강제 이동
                if (window.scrollY > targetScrollPos) {
                    window.scrollTo({
                        top: targetScrollPos, 
                        behavior: 'auto' // 즉시 이동
                    });
                }
                // ============================================================
            });
        });
    });
    return swiperInstances[0];
}