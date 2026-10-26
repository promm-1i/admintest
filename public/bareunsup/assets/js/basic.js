let lenis;
let lenisRafId;

// Lenis 초기화 함수
function initLenis() {
    if (!lenis && window.innerWidth > 1240) {
        lenis = new Lenis({
            duration: 1.2,
            infinite: false,
            gestureOrientation: "vertical",
            normalizeWheel: false,
            smoothTouch: true
        });

        function raf(time) {
            lenis.raf(time);
            lenisRafId = requestAnimationFrame(raf);
        }

        lenisRafId = requestAnimationFrame(raf);

        addScrollEventListeners();
    }
}

// Lenis 제거 함수
function destroyLenis() {
    if (lenis) {
        cancelAnimationFrame(lenisRafId);
        lenis.destroy();
        lenis = null;
        lenisRafId = null;

        removeScrollEventListeners();
    }
}


// 내부 스크롤 가능한 요소 이벤트 리스너 추가
function addScrollEventListeners() {
    const scrollableContainers = document.querySelectorAll(
        '.flagship_sub .building_sect .bf-nf-cntx, .depart_map_sect .map_cont .aside .map_li'
    );
    scrollableContainers.forEach((container) => {
        container.addEventListener('wheel', handleWheelEvent, {passive: false});
    });
}

// 내부 스크롤 가능한 요소 이벤트 리스너 제거
function removeScrollEventListeners() {
    const scrollableContainers = document.querySelectorAll(
        '.flagship_sub .building_sect .bf-nf-cntx, .depart_map_sect .map_cont .aside .map_li'
    );
    scrollableContainers.forEach((container) => {
        container.removeEventListener('wheel', handleWheelEvent);
    });
}



// 리사이즈 시 Lenis 활성화/비활성화
window.addEventListener("resize", () => {
    if (window.innerWidth > 1240) {
        initLenis(); // PC 화면에서는 Lenis 초기화
    }else {
        destroyLenis(); // 모바일 화면에서는 Lenis 비활성화
    }
});

// Lenis 스크롤 애니메이션 프레임 관리
function smoothScroll() {
    function raf(time) {
        if (lenis) lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

$(document).ready(function () {
    // 초기 설정
    initLenis();

    if (window.matchMedia("(min-width: 768px)").matches) {
        new WOW().init();
    }

    /*header*/
    // $('.gnb_bg').css('width',$('body').innerWidth());
    // $(window).resize(function(){
    //     $('.gnb_bg').css('width',$('body').innerWidth());
    // });

    //top_btn
    $(".bf-tp-bt").click(function () {
        setTimeout(() => {

            if (lenis) {
                lenis.scrollTo(0, {immediate: true}); // 상단으로 즉시 스크롤
            }else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

        }, 100); // 페이지 로드 완료 후 약간의 지연 후 강제로 스크롤 이동

        return false;
    });


    // 새로고침 시 스크롤을 상단으로 강제 이동
    window.addEventListener('load', () => {
        header();
    });


    function header() {

        var previousScroll;
        var windowScroll = window.pageYOffset || document.documentElement.scrollTop;

        $(window).scroll(function () {
            var currentScroll = $(this).scrollTop();


            if (currentScroll > previousScroll) {
                $(".bf-hd2").addClass("bf-scr-dwnx")
            } else {
                $(".bf-hd2").removeClass("bf-scr-dwnx")
            }

            previousScroll = currentScroll;


            if (window.scrollY <= 100) {
                $(".bf-hd2").addClass("bf-tp")
                $(".bf-hd2").removeClass("bf-dwnx")

            } else {
                $(".bf-hd2").removeClass("bf-tp")
                $(".bf-hd2").addClass("bf-dwnx")

            }

        });

    }

    $("select").niceSelect();
    

});



//모바일 이미지 확대
document.addEventListener('DOMContentLoaded', function() {
    // 모달 HTML 생성
    const modalHTML = `
        <div class="bf-zmx-mdlx">
            <div class="bf-zmx-mdlx-ct">
                <img>
                <button class="bf-zmx-mdlx-cls">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="0.8em"><path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.6 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"/></svg>
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.querySelector('.bf-zmx-mdlx');
    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.bf-zmx-mdlx-cls');

    /*
    // 이미지 클릭 이벤트
    if(window.innerWidth <= 768){
        document.querySelectorAll('.mo_img_zoom').forEach(container => {
            const images = container.querySelectorAll('img');
            if (images) {
                container.addEventListener('click', () => {
                    // 보이는 이미지만 선택
                    const visibleImg = Array.from(images).find(img => {
                        const style = window.getComputedStyle(img);
                        return style.display !== 'none';
                    });

                    if (visibleImg) {
                        modal.style.display = 'block';
                        modalImg.src = visibleImg.src;
                    }
                });
            }
        });

        // 닫기 이벤트
        closeBtn.addEventListener('click', e => {
            e.stopPropagation();
            modal.style.display = 'none';
        });

        modal.addEventListener('click', e => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    */

});

// 특화센터 > 질환 원인
let causeSlide = null;

function initCauseSlide() {
    const container = document.querySelector('.bf-csx-wr .swiper-container');
    if (!container) {
        console.warn("Swiper 컨테이너 요소가 없습니다. initCauseSlide 실행 중단.");
        return; // 요소가 없으면 함수 실행 중단
    }

    const slideCount = container.querySelectorAll('.swiper-slide').length;
    const isMobile = window.matchMedia("(max-width: 1240px)").matches;

    if (slideCount >= 7) {
        if (!causeSlide) {
            causeSlide = new Swiper('.bf-csx-wr .swiper-container', {
                slidesPerView: 'auto',
                observer: true,
                observeParents: true,
            });
        }
    } else {
        if (isMobile) {
            if (!causeSlide) {
                causeSlide = new Swiper('.bf-csx-wr .swiper-container', {
                    slidesPerView: 'auto',
                    observer: true,
                    observeParents: true,
                });
            }
        } else {
            if (causeSlide) {
                causeSlide.destroy(true, true);
                causeSlide = null;
            }
        }
    }
}

// 리사이즈 이벤트 바인딩
function setupResizeListener() {
    window.addEventListener('resize', initCauseSlide);
}




// 특화센터 > 주요 증상 탭 이벤트 초기화 함수
function initCauseTabs() {
    const causeTabs = document.querySelectorAll('.bf-csx-tb button');
    const causeTabConts = document.querySelectorAll('.bf-csx-tb-cntx');

    if (causeTabs.length === 0 || causeTabConts.length === 0) {
        console.warn("탭 버튼 또는 탭 콘텐츠를 찾을 수 없습니다. initCauseTabs 실행을 건너뜁니다.");
        return;
    }

    causeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. 모든 탭에서 active 클래스 제거
            causeTabs.forEach(t => t.classList.remove('active'));

            // 2. 모든 탭 콘텐츠 숨기기
            causeTabConts.forEach(content => content.classList.remove('active'));

            // 3. 현재 클릭된 탭에 active 클래스 추가
            tab.classList.add('active');

            // 4. 해당하는 탭 콘텐츠 보여주기
            const tabIndex = tab.getAttribute('data-cause-tab');
            const targetContent = document.querySelector(`.bf-csx-tb-cntx${tabIndex}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 초기화: 각 탭 콘텐츠에 대해 서브 탭 설정
    causeTabConts.forEach(causeTabCont => {
        updateSubTabs(causeTabCont);
    });
}

// 특화센터 > 주요 증상 서브 탭 이벤트 초기화 함수
function updateSubTabs(parent) {
    const subTabs = parent.querySelectorAll('.bf-csx-tb-inx-tb button');
    const subTabConts = parent.querySelectorAll('.bf-tb-inx-tb-cntx');

    if (subTabs.length === 0 || subTabConts.length === 0) {
        console.warn(`"${parent.className}"에서 서브 탭 또는 서브 콘텐츠를 찾을 수 없습니다.`);
        return;
    }

    subTabs.forEach(subTab => {
        subTab.addEventListener('click', () => {
            // 1. 모든 서브 탭에서 active 클래스 제거
            subTabs.forEach(t => t.classList.remove('active'));

            // 2. 모든 서브 콘텐츠 숨기기
            subTabConts.forEach(content => content.classList.remove('active'));

            // 3. 현재 클릭된 서브 탭에 active 클래스 추가
            subTab.classList.add('active');

            // 4. 해당하는 서브 콘텐츠 보여주기
            const subTabIndex = subTab.getAttribute('data-cause-sub-tab');
            const targetContent = parent.querySelector(`.bf-tb-inx-tb-cntx${subTabIndex}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}



// 특화센터 > 치료법 아코디언 타입
function initAccordion(selector = '.bf-ccrx-wr') {
    const $accordions = $(selector);

    if ($accordions.length === 0) {
        console.warn(`${selector} 요소를 찾을 수 없습니다. initAccordion 실행을 건너뜁니다.`);
        return;
    }

    $accordions.each(function () {
        const $accordion = $(this);
        const $items = $accordion.find('.bf-it');
        const $headers = $accordion.find('.bf-ccx-tt');

        $headers.on('click', function () {
            const $item = $(this).parent('.bf-it');
            const $content = $item.find('.bf-ccx-cntx');

            // 모든 내용 숨기기
            $items.find('.bf-ccx-cntx').slideUp(0);

            if ($item.hasClass('active')) {
                // 이미 활성화된 항목은 비활성화
                $item.removeClass('active');
            } else {
                // 다른 항목 비활성화 후 선택된 항목 활성화
                $items.removeClass('active');
                $item.addClass('active');
                $content.slideDown(0);
            }

            // 스크롤 이동
            const scrollTopOffset = $(this).offset().top;
            const headerHeight = $(".bf-hd2").outerHeight() || 0;
            const targetPosition = Math.max(scrollTopOffset - headerHeight, 0);

            if (window.innerWidth > 1240) {
                if (typeof lenis !== "undefined" && lenis.scrollTo) {
                    lenis.scrollTo(targetPosition, {
                        duration: 0.5, // 0.5초 동안 스크롤
                        easing: (t) => 1 - Math.pow(1 - t, 3), // 부드러운 가속도 적용
                    });
                } else {
                    console.warn("Lenis 스크롤 객체가 정의되지 않았습니다.");
                }
            } else {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth' // 부드러운 스크롤
                });
            }
        });
    });
}



// 특화센터 > qna 타입
function initQnaEvent(selector = '.bf-qnx-wr') {
    const $qnaWrap = $(selector);

    if ($qnaWrap.length === 0) {
        console.warn(`${selector} 요소를 찾을 수 없습니다. initQnaEvent 실행을 건너뜁니다.`);
        return;
    }

    // 클릭 이벤트 바인딩
    $qnaWrap.off('click').on('click', '.bf-it .bf-qstx', function () {
        let $parent = $(this).parent('.bf-it');
        let $answer = $parent.find('.bf-nswx');

        // 현재 열려있는 모든 답변 닫기 (현재 선택된 항목 제외)
        $qnaWrap.find('.bf-it').not($parent).removeClass('active');
        $qnaWrap.find('.bf-it .bf-nswx').not($answer).stop(true, true).slideUp(400);

        // 현재 항목 토글
        if ($parent.hasClass('active')) {
            $parent.removeClass('active');
            $answer.stop(true, true).slideUp(400);
        } else {
            $parent.addClass('active');
            $answer.stop(true, true).slideDown(400);
        }
    });

    // 리사이즈 이벤트 바인딩 (모바일 환경에서 강제로 닫히지 않도록 개선)
    $(window).off(`resize.qnaResize.${selector}`).on(`resize.qnaResize.${selector}`, function () {
        // 현재 화면의 너비가 변경되었는지 확인 (resize가 브라우저 주소창 숨김/표시가 아닌 경우)
        const currentWidth = window.innerWidth;

        // 이전 너비와 비교
        if (typeof window._prevWidth === 'undefined' || window._prevWidth !== currentWidth) {
            window._prevWidth = currentWidth; // 현재 너비 저장

            // 리사이즈 시 답변의 display, height 초기화 및 active 클래스 제거
            $qnaWrap.find('.bf-it').each(function () {
                $(this).removeClass('active'); // active 클래스 제거
                $(this).find('.bf-nswx').css({
                    display: '', // display 속성 초기화
                    height: '',  // height 속성 초기화
                });
            });
        }
    });
}





// 특화센터 > checkpoint 타입
function initCheckpointEvent() {
    const $checkpointWrap = $('.bf-chcx.swiper-container');

    if ($checkpointWrap.length === 0) {
        console.warn('.bf-chcx.swiper-container 요소를 찾을 수 없습니다. initCheckpointEvent 실행을 건너뜁니다.');
        return;
    }

    let checkpointSlide = null;

    // Checkpoint 슬라이드 초기화 함수
    function initCheckpointSlide() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // 768px 이하에서 Swiper 초기화
            if (!checkpointSlide) {
                checkpointSlide = new Swiper('.bf-chcx.swiper-container', {
                    slidesPerView: 'auto',
                    speed: 750,
                    observer: true,
                    observeParents: true,
                });
            }
        } else {
            // 768px 초과에서 Swiper 제거
            if (checkpointSlide && typeof checkpointSlide.destroy === 'function') {
                checkpointSlide.destroy(true, true);
                checkpointSlide = null;
            }
        }
    }

    // 초기 실행
    initCheckpointSlide();

    // 리사이즈 이벤트 바인딩
    $(window).off('resize.checkpointResize').on('resize.checkpointResize', function () {
        initCheckpointSlide();
    });
}


