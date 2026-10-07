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

    (function () {
        var els = document.querySelectorAll(".eb-brcx-pntx.eb-brcx-tx[data-aos]");
        if (!els.length) return;
        var io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (e) {
                    e.target.classList.toggle("active", e.isIntersecting);
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
        );
        els.forEach(function (el) {
            io.observe(el);
        });
    })();

    
    
    
    function initImageComparison() {
        const comparisonSlider = document.querySelector(".eb-pic-cmpx");
        if (!comparisonSlider) return;

        const wrapper = comparisonSlider.querySelector(".eb-cmpx-wr");
        const overlay = comparisonSlider.querySelector(".eb-cmpx-vrlx");
        const handle = comparisonSlider.querySelector(".eb-cmpx-hndx");
        let isDragging = false;
        let startX = 0;
        let startLeft = 50;

        function initSlider() {
            overlay.style.clipPath = `inset(0 50% 0 0)`;
            handle.style.left = `50%`;
        }

        function updateSlider(percentage) {
            const clampedPercentage = Math.max(0, Math.min(100, percentage));
            overlay.style.clipPath = `inset(0 ${100 - clampedPercentage}% 0 0)`;
            handle.style.left = `${clampedPercentage}%`;
        }

        function handleMouseDown(e) {
            isDragging = true;
            startX = e.clientX || e.touches[0].clientX;
            startLeft = parseFloat(handle.style.left) || 50;
            comparisonSlider.style.cursor = "grabbing";
            e.preventDefault();
        }

        function handleMouseMove(e) {
            if (!isDragging) return;
            const currentX = e.clientX || e.touches[0].clientX;
            const rect = wrapper.getBoundingClientRect();
            const deltaX = currentX - startX;
            const percentage = startLeft + (deltaX / rect.width) * 100;
            updateSlider(percentage);
        }

        function handleMouseUp() {
            isDragging = false;
            comparisonSlider.style.cursor = "grab";
        }

        
        initSlider();

        
        comparisonSlider.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        
        comparisonSlider.addEventListener("touchstart", handleMouseDown);
        document.addEventListener("touchmove", handleMouseMove);
        document.addEventListener("touchend", handleMouseUp);

        
        handle.addEventListener("mousedown", handleMouseDown);
        handle.addEventListener("touchstart", handleMouseDown);
    }

    
    
    
    function initEquipmentSwiper() {
        const $el = $(".eb-qpmx-swpx");
        if (!$el.length) return;
        
        if ($el.find(".swiper-slide").length <= 1) return;

        let equipmentSwiper;

        function updatePagination() {
            if (!equipmentSwiper) return;
            const current = equipmentSwiper.realIndex + 1;
            const total = equipmentSwiper.slides.length - (equipmentSwiper.loopedSlides || 0) * 2;
            $(".eb-pgnx-crrx").text(String(current).padStart(2, "0"));
            $(".eb-pgnx-ttlx").text(String(total).padStart(2, "0"));
        }

        equipmentSwiper = new Swiper(".eb-qpmx-swpx", {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            navigation: {
                nextEl: ".eb-pgnx-nxtx",
                prevEl: ".eb-pgnx-prvx"
            },
            on: {
                slideChange: function () {
                    updatePagination();
                },
                init: function () {
                    updatePagination();
                }
            }
        });
    }

    
    
    
    function initPointSwiper() {
        const $el = $(".eb-pntx-swpx");
        if (!$el.length) return;

        $el.each(function () {
            const paginationEl = this.querySelector(".swiper-pagination");

            
            if (this.swiper) {
                const sw = this.swiper;
                if (paginationEl && sw.pagination) {
                    sw.params.pagination = Object.assign({}, sw.params.pagination, {
                        el: paginationEl,
                        clickable: true
                    });
                    sw.pagination.init();
                    sw.pagination.render();
                    sw.pagination.update();
                }
                return;
            }

            new Swiper(this, {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: false,
                navigation: {
                    nextEl: this.querySelector(".eb-ar-nxtx"),
                    prevEl: this.querySelector(".eb-ar-prvx")
                },
                pagination: {
                    el: paginationEl,
                    clickable: true
                }
            });
        });
    }

    
    
    
    function initVisionSwiper() {
        const $swiper = $(".eb-vsnx-swpx");
        if (!$swiper.length) return;

        const $container = $swiper.closest(".eb-sl-ar");
        const $btns = $container.find(".eb-slcx-bt");

        const visionSwiper = new Swiper(".eb-vsnx-swpx", {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            effect: "fade",
            initialSlide: 1,
            on: {
                init: function () {
                    $btns.removeClass("current").eq(this.activeIndex).addClass("current");
                },
                slideChange: function () {
                    $btns.removeClass("current").eq(this.activeIndex).addClass("current");
                }
            }
        });

        $btns.on("click", function () {
            const index = $(this).data("index");
            if (index !== undefined && index !== visionSwiper.activeIndex) {
                visionSwiper.slideTo(index);
            }
        });
    }

    
    
    
    function initInspectionSwiper() {
        const $el = $(".eb-nspx-swpx");
        if (!$el.length) return;

        let inspectionSwiper;

        function updatePagination() {
            if (!inspectionSwiper) return;
            const $pagination = $el.closest(".eb-nspx-sec").find(".eb-js-inspection-pagination");
            if (!$pagination.length) return;

            const current = inspectionSwiper.realIndex + 1;
            const total = inspectionSwiper.slides.length - (inspectionSwiper.loopedSlides || 0) * 2;
            $pagination.find(".eb-pgnx-crrx").text(String(current).padStart(2, "0"));
            $pagination.find(".eb-pgnx-ttlx").text(String(total).padStart(2, "0"));
        }

        inspectionSwiper = new Swiper(".eb-nspx-swpx", {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            
            
            
            
            navigation: {
                nextEl: ".eb-nspx-sec .eb-pic-ar-nxtx",
                prevEl: ".eb-nspx-sec .eb-pic-ar-prvx"
            },
            on: {
                slideChange: function () {
                    updatePagination();
                },
                init: function () {
                    updatePagination();
                }
            }
        });
    }

    
    
    
    function initFullInfoSwiper($targetTabContent) {
        const $swipers = $targetTabContent ? $targetTabContent.find(".eb-fllx-nf-swpx") : $(".eb-fllx-nf-swpx");
        if (!$swipers.length) return;

        $swipers.each(function () {
            const $swiper = $(this);
            const $tabContent = $swiper.closest(".eb-tb-ct2");
            const $pagination = $tabContent.find(".eb-qpmx-pgnx");

            if (!$pagination.length) return;

            if ($swiper[0].swiper) {
                if ($swiper[0].swiper.autoplay && $swiper[0].swiper.autoplay.running) {
                    $swiper[0].swiper.autoplay.stop();
                }
                $swiper[0].swiper.destroy(true, true);
            }

            
            const $slides = $swiper.find(".swiper-slide");
            const actualSlideCount = $slides.length;

            
            if (actualSlideCount === 0) return;

            
            const $currentPagination = $pagination;
            let fullInfoSwiper;

            function updatePagination() {
                if (!fullInfoSwiper) return;

                
                const total = actualSlideCount;
                $currentPagination.find(".eb-pgnx-ttlx").text(String(total).padStart(2, "0"));

                
                let currentIndex;
                if (fullInfoSwiper.params.loop) {
                    
                    currentIndex = fullInfoSwiper.realIndex;

                    
                    if (currentIndex === undefined || currentIndex === null || currentIndex < 0) {
                        
                        const loopedSlides = fullInfoSwiper.loopedSlides || 0;
                        const rawIndex = fullInfoSwiper.activeIndex - loopedSlides;
                        currentIndex = ((rawIndex % actualSlideCount) + actualSlideCount) % actualSlideCount;
                    }
                } else {
                    
                    currentIndex = fullInfoSwiper.activeIndex;
                }

                
                if (currentIndex < 0) currentIndex = 0;
                if (currentIndex >= actualSlideCount) currentIndex = actualSlideCount - 1;

                const current = currentIndex + 1;

                
                $currentPagination.find(".eb-pgnx-crrx").text(String(current).padStart(2, "0"));
            }

            
            $currentPagination.find(".eb-pgnx-ttlx").text(String(actualSlideCount).padStart(2, "0"));

            fullInfoSwiper = new Swiper($swiper[0], {
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
                loop: actualSlideCount > 1, 
                effect: "fade",
                fadeEffect: {
                    crossFade: true
                },
                navigation: {
                    nextEl: $pagination.find(".eb-pgnx-nxtx")[0],
                    prevEl: $pagination.find(".eb-pgnx-prvx")[0]
                },
                on: {
                    slideChange: function () {
                        updatePagination();
                    },
                    init: function () {
                        
                        setTimeout(function () {
                            updatePagination();
                        }, 50);
                    }
                }
            });

            
            $swiper[0].swiperInstance = fullInfoSwiper;
        });
    }

    
    
    
    function initCenterSlideSwiper() {
        const $el = $(".eb-md-sl-swpx");
        if (!$el.length) return;

        new Swiper(".eb-md-sl-swpx", {
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 30,
            loop: true,
            loopAdditionalSlides: 2,
            grabCursor: true,
            breakpoints: {
                1200: {
                    spaceBetween: 80
                }
            }
        });
    }

    initImageComparison();
    initEquipmentSwiper();
    initPointSwiper();
    initVisionSwiper();
    initInspectionSwiper();
    initFullInfoSwiper();
    initCenterSlideSwiper();

    window.initFullInfoSwiper = initFullInfoSwiper;
});
