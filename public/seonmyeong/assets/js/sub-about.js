$(document).ready(function () {
    if (window.AOS) {
        AOS.init({
            duration: 1000
        });

        setTimeout(function () {
            AOS.refresh();
        }, 100);
    }

    $(window).on("load", function () {
        if (window.AOS) {
            AOS.refresh();
        }
    });

    
    
    
    function initHospitalLook() {
        const $area = $(".eb-hspx-lkx-ar");
        if (!$area.length) return;

        const $roundBtnSpan = $area.find(".eb-rndx-bt span");
        const $title = $area.find(".eb-flrx-nf .eb-tt2");
        const $prevBtn = $area.find(".eb-prvx-bt");
        const $nextBtn = $area.find(".eb-nxtx-bt");
        const $currentNum = $area.find(".eb-crrx-nmbx");
        const $totalNum = $area.find(".eb-ttlx-nmbx");
        const $tabContents = $area.find(".eb-tb-ct2");
        const $tabBtns = $area.find(".eb-hspx-flrx-tb .eb-tb-bt");

        function updateHeadFromSwiper(swiper) {
            if (!swiper || !swiper.slides || !swiper.slides.length) return;
            const $slide = $(swiper.slides[swiper.activeIndex]);
            const $img = $slide.find(".eb-hspx-lkx-pic img");
            const alt = $img.length ? $img.attr("alt") || "" : "";
            $title.text(alt);
            const total = swiper.slides.length;
            const current = swiper.realIndex !== undefined ? swiper.realIndex + 1 : swiper.activeIndex + 1;
            $currentNum.text(current);
            $totalNum.text(total);
        }

        function getActiveSwiper() {
            const $activeContent = $area.find(".eb-tb-ct2.active");
            if (!$activeContent.length) return null;
            const swiperEl = $activeContent.find(".eb-hspx-lkx-swpx")[0];
            return swiperEl && swiperEl.swiper ? swiperEl.swiper : null;
        }

        $tabContents.each(function () {
            const $content = $(this);
            const $swiperEl = $content.find(".eb-hspx-lkx-swpx");
            if (!$swiperEl.length) return;
            const tab = $content.attr("data-tab");
            const swiper = new Swiper($swiperEl[0], {
                effect: "fade",
                fadeEffect: { crossFade: true },
                slidesPerView: 1,
                spaceBetween: 0,
                loop: false,
                on: {
                    init: function () {
                        if ($content.hasClass("active")) updateHeadFromSwiper(this);
                    },
                    slideChange: function () {
                        if ($content.hasClass("active")) updateHeadFromSwiper(this);
                    }
                }
            });
            $swiperEl[0].swiper = swiper;
        });

        $prevBtn.on("click", function () {
            const swiper = getActiveSwiper();
            if (swiper) swiper.slidePrev();
        });
        $nextBtn.on("click", function () {
            const swiper = getActiveSwiper();
            if (swiper) swiper.slideNext();
        });

        $tabBtns.on("click", function () {
            const tab = $(this).data("tab");
            const $content = $tabContents.filter('[data-tab="' + tab + '"]');
            if (!$content.length) return;

            $tabContents.removeClass("active");
            $content.addClass("active");
            $tabBtns.removeClass("active");
            $(this).addClass("active");

            $roundBtnSpan.text(tab);

            const swiperEl = $content.find(".eb-hspx-lkx-swpx")[0];
            if (swiperEl && swiperEl.swiper) {
                const swiper = swiperEl.swiper;
                swiper.update();
                swiper.slideTo(0, 0);
                updateHeadFromSwiper(swiper);
            }
        });

        const $firstActive = $tabContents.filter(".active");
        if ($firstActive.length) {
            $roundBtnSpan.text($firstActive.attr("data-tab"));
            const firstSwiperEl = $firstActive.find(".eb-hspx-lkx-swpx")[0];
            if (firstSwiperEl && firstSwiperEl.swiper) {
                updateHeadFromSwiper(firstSwiperEl.swiper);
            }
        }
    }

    
    
    
    function initParkingInfoHover() {
        const $parking = $(".eb-prkx-nf");
        if (!$parking.length) return;

        const $listItems = $parking.find(".eb-prkx-nf-nv .eb-ls-it");
        const $mapArea = $parking.find(".eb-prkx-nf-mp");

        $listItems.on("mouseenter", function () {
            const name = $(this).attr("data-name");
            if (!name) return;
            $mapArea.find('.eb-pnx-pic[data-name="' + name + '"]').addClass("on");
        });

        $listItems.on("mouseleave", function () {
            const name = $(this).attr("data-name");
            if (!name) return;
            $mapArea.find('.eb-pnx-pic[data-name="' + name + '"]').removeClass("on");
        });
    }

    
    
    
    function initDoctorInfoSwiper() {
        const $wrap = $(".eb-dr-nf");
        if (!$wrap.length) return;

        const swiperEl = $wrap.find(".eb-dr-nf-swpx")[0];
        if (!swiperEl || swiperEl.swiper) return;

        const $currentNum = $wrap.find(".eb-dr-nf-pgnx .current");
        const $totalNum = $wrap.find(".eb-dr-nf-pgnx .eb-ttlx");

        function updatePagination(swiper) {
            if (!swiper || !swiper.slides || !swiper.slides.length) return;
            const current = swiper.realIndex !== undefined ? swiper.realIndex + 1 : swiper.activeIndex + 1;
            $currentNum.text(current);
            $totalNum.text(swiper.slides.length);
        }

        swiperEl.swiper = new Swiper(swiperEl, {
            effect: "fade",
            fadeEffect: { crossFade: true },
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                prevEl: $wrap.find(".eb-dr-nf-ar.eb-prvx")[0],
                nextEl: $wrap.find(".eb-dr-nf-ar.eb-nxtx")[0]
            },
            on: {
                init: function () {
                    updatePagination(this);
                },
                slideChange: function () {
                    updatePagination(this);
                }
            }
        });
    }

    initHospitalLook();
    initParkingInfoHover();
    initDoctorInfoSwiper();
});
