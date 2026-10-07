$(document).ready(function () {
    

    const FIXED_VIEWPORT_HEIGHT = window.innerHeight;
    const FIXED_SVH = window.visualViewport ? window.visualViewport.height : FIXED_VIEWPORT_HEIGHT;

    
    function forceFixedViewportUnits() {
        const htmlElement = document.documentElement;
        htmlElement.style.setProperty("--vh", FIXED_VIEWPORT_HEIGHT * 0.01 + "px");
        htmlElement.style.setProperty("--svh", FIXED_SVH * 0.01 + "px");
    }
    forceFixedViewportUnits();

    
    const sub_top_section = $(".eb-sb-tp-sec");
    const depth1_menu = sub_top_section.find(".eb-dptx");
    const depth1_btn = depth1_menu.find(".eb-mn-bx-in");
    const depth1_list_wrap = depth1_menu.find(".eb-mn-bx-ls");
    const depth1_list = depth1_menu.find("ul");
    const depth2_menu = sub_top_section.find(".eb-dptx2");
    const depth2_btn = depth2_menu.find(".eb-mn-bx-in");
    const depth2_list_wrap = depth2_menu.find(".eb-mn-bx-ls");
    const depth2_list = depth2_menu.find("ul");

    let depth1_list_height = depth1_list.innerHeight();
    depth1_btn.on("click", function () {
        if (depth1_menu.hasClass("active")) {
            depth1_list_wrap.height(0);
            depth1_menu.removeClass("active");
        } else {
            depth1_list_wrap.height(depth1_list_height);
            depth1_menu.addClass("active");
        }
        closeSubMenu(depth2_menu);
    });
    let depth2_list_height = depth2_list.innerHeight();
    depth2_btn.on("click", function () {
        if (depth2_menu.hasClass("active")) {
            depth2_list_wrap.height(0);
            depth2_menu.removeClass("active");
        } else {
            depth2_list_wrap.height(depth2_list_height);
            depth2_menu.addClass("active");
        }
        closeSubMenu(depth1_menu);
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest(".eb-dptx").length && !$(e.target).closest(".eb-dptx2").length) {
            closeSubMenu(depth1_menu);
            closeSubMenu(depth2_menu);
        }
    });

    const closeSubMenu = function (target) {
        const target_menu = target.find(".eb-mn-bx-ls");
        target.removeClass("active");
        target_menu.height(0);
    };

    

    
    if ($(".eb-xmx-prcx-sec").length > 0) {
        const section = $(".eb-xmx-prcx-sec");
        const infoContainer = section.find(".eb-nf-cont");
        const nextBtn = infoContainer.find(".eb-bt-wr2 .eb-bt2.eb-nxtx");
        const prevBtn = infoContainer.find(".eb-bt-wr2 .eb-bt2.eb-prvx");
        const currentPage = infoContainer.find(".eb-bt-wr2 .eb-pgx-wr .eb-pgx-crrx");
        const totalPage = infoContainer.find(".eb-bt-wr2 .eb-pgx-wr .eb-pgx-ttlx");

        const slide = infoContainer.find(".swiper-slide");
        const slide_btn = infoContainer.find(".eb-bt-wr2");
        const img_wrap = infoContainer.find(".eb-pic-wr");

        let realLength = 0;

        const infoSwiper = new Swiper(infoContainer, {
            slidesPerView: 1.1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            loopAdditionalSlides: 1,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn
            },
            breakpoints: {
                768: {
                    spaceBetween: 0,
                    slidesPerView: 1
                }
            },
            on: {
                slideChange: function () {
                    infoSwiper.realIndex > 9
                        ? currentPage.text(infoSwiper.realIndex + 1)
                        : currentPage.text(`0${infoSwiper.realIndex + 1}`);
                }
            }
        });

        for (let i = 0; i < infoSwiper.slides.length; i++) {
            if (!infoSwiper.slides[i].classList.contains("swiper-slide-duplicate")) {
                realLength++;
            }
        }

        if (realLength > 10) {
            totalPage.text(realLength);
        } else {
            totalPage.text(`0${realLength}`);
        }

        
        const slide_btn_position_set = function () {
            const img_width = img_wrap.innerWidth();
            slide_gap = parseInt(slide.css("gap"));
            slide_btn.css("margin-left", img_width + slide_gap + "px");
        };
        $(window).on("resize load", function () {
            setTimeout(function () {
                slide_btn_position_set();
            }, 100);
        });

        if ($(".eb-nf-cont2").length > 0) {
            const infoContainer2 = section.find(".eb-nf-cont2");
            const nextBtn2 = infoContainer2.find(".eb-bt-wr2 .eb-bt2.eb-nxtx");
            const prevBtn2 = infoContainer2.find(".eb-bt-wr2 .eb-bt2.eb-prvx");
            const currentPage2 = infoContainer2.find(".eb-bt-wr2 .eb-pgx-wr .eb-pgx-crrx");
            const totalPage2 = infoContainer2.find(".eb-bt-wr2 .eb-pgx-wr .eb-pgx-ttlx");

            const slide2 = infoContainer2.find(".swiper-slide");
            const slide_btn2 = infoContainer2.find(".eb-bt-wr2");
            const img_wrap2 = infoContainer2.find(".eb-pic-wr");

            let realLength2 = 0;

            const infoSwiper2 = new Swiper(infoContainer2, {
                slidesPerView: 1.1,
                speed: 1000,
                spaceBetween: 30,
                loop: true,
                loopAdditionalSlides: 1,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                navigation: {
                    nextEl: nextBtn,
                    prevEl: prevBtn
                },
                breakpoints: {
                    768: {
                        spaceBetween: 0,
                        slidesPerView: 1
                    }
                },
                on: {
                    slideChange: function () {
                        infoSwiper.realIndex > 9
                            ? currentPage.text(infoSwiper.realIndex + 1)
                            : currentPage.text(`0${infoSwiper.realIndex + 1}`);
                    }
                }
            });

            for (let i = 0; i < infoSwiper2.slides.length; i++) {
                if (!infoSwiper2.slides[i].classList.contains("swiper-slide-duplicate")) {
                    realLength2++;
                }
            }

            if (realLength2 > 10) {
                totalPage2.text(realLength2);
            } else {
                totalPage2.text(`0${realLength2}`);
            }

            
            const slide_btn_position_set2 = function () {
                const img_width = img_wrap2.innerWidth();
                slide_gap = parseInt(slide2.css("gap"));
                slide_btn2.css("margin-left", img_width + slide_gap + "px");
            };
            $(window).on("resize load", function () {
                setTimeout(function () {
                    slide_btn_position_set2();
                }, 100);
            });

            const tab_animation = function () {
                const tab_btn = section.find(".eb-stcx-tb .eb-tb-bt");
                tab_btn.on("click", function () {
                    const target = $(this).data("tab");
                    if (target === "tab1") {
                        infoContainer.addClass("active");
                        infoContainer2.removeClass("active");
                    } else {
                        infoContainer.removeClass("active");
                        infoContainer2.addClass("active");
                    }

                    
                    if (infoSwiper && infoSwiper.initialized) {
                        infoSwiper.autoplay.stop();
                        infoSwiper.slideToLoop(0, 0);
                        setTimeout(() => {
                            infoSwiper.autoplay.start();
                        }, 100);
                    }
                    if (infoSwiper2 && infoSwiper2.initialized) {
                        infoSwiper2.autoplay.stop();
                        infoSwiper2.slideToLoop(0, 0);
                        setTimeout(() => {
                            infoSwiper2.autoplay.start();
                        }, 100);
                    }
                });
            };
            if (section.find(".eb-stcx-tb").length > 0) {
                tab_animation();
            }
        }
    }

    
    function rollingContentCopy() {
        const rollingRail = $(".eb-rllx-rlx");
        const rollingContentList = $(".eb-rllx-ct-ls");

        rollingContentList.clone().appendTo(rollingRail);
    }

    if ($(".eb-rllx-ct-wr").length > 0) {
        rollingContentCopy();
    }

    
    
    
    function updateProgressbar(swiper) {
        if (!swiper || !swiper.slides || swiper.slides.length === 0) return;

        const total = swiper.slides.length;
        const swiperWidth = swiper.width;
        const translate = Math.abs(swiper.translate);
        let currentIndex = 0;

        let maxVisible = 0;

        for (let i = 0; i < total; i++) {
            const slide = swiper.slides[i];
            const slideLeft = slide.offsetLeft;
            const slideRight = slideLeft + slide.offsetWidth;

            const visibleLeft = Math.max(0, slideLeft - translate);
            const visibleRight = Math.min(slideRight - translate, swiperWidth);
            const visibleWidth = Math.max(0, visibleRight - visibleLeft);

            if (visibleWidth > maxVisible) {
                maxVisible = visibleWidth;
                currentIndex = i;
            }
        }

        const current = currentIndex + 1;
        const progress = (current / total) * 100;

        $(".eb-prgx-fllx").css("width", progress + "%");
    }

    
    
    
    function initProcessSwiper() {
        const $swiper = $(".eb-prcx-swpx");
        if (!$swiper.length) return;

        
        window.updateProgressbar = updateProgressbar;

        const processSwiper = new Swiper(".eb-prcx-swpx", {
            slidesPerView: "auto",
            spaceBetween: 48,
            grabCursor: true,
            allowTouchMove: true,
            touchRatio: 1,
            resistance: true,
            initialSlide: 0,
            breakpoints: {
                1200: {
                    spaceBetween: 60
                }
            },
            on: {
                slideChange: function () {
                    updateProgressbar(this);
                },
                init: function () {
                    this.slideTo(0, 0);
                    updateProgressbar(this);
                }
            }
        });
    }

    
    
    
    function initStickyTabMenu() {
        const $tabBtns = $(".eb-stcx-tb .eb-tb-bt");
        if (!$tabBtns.length) return;

        const $tabBg = $(".eb-stcx-tb .eb-tb-bk");
        const $container = $tabBtns.closest(".eb-ar-wr, .eb-in-ct, section");
        const $tabContents = $container.find(".eb-tb-ct2[data-tab]");

        $tabContents.hide();
        const $activeBtn = $tabBtns.filter(".active");
        if ($activeBtn.length) {
            const activeTab = $activeBtn.data("tab");
            $tabContents.filter(`[data-tab="${activeTab}"]`).show();
            updateTabBg($activeBtn, $tabBg);
        }

        $tabBtns.on("click", function () {
            const $this = $(this);
            const targetTab = $this.data("tab");

            $tabBtns.removeClass("active");
            $this.addClass("active");

            updateTabBg($this, $tabBg);

            $tabContents.hide();
            const $targetContent = $tabContents.filter(`[data-tab="${targetTab}"]`);
            $targetContent.show();

            setTimeout(function () {
                if ($targetContent.find(".eb-fllx-nf-swpx").length) {
                    initFullInfoSwiper($targetContent);
                }

                initScrollTriggerAnimation();
            }, 150);

            const $section = $(".eb-stcx-sec");
            if ($section.length) {
                const sectionTop = $section.offset().top;
                $("html, body").animate(
                    {
                        scrollTop: sectionTop - 100
                    },
                    600,
                    "swing"
                );
            }
        });
    }

    
    
    
    function updateTabBg($btn, $bg) {
        const btnLeft = $btn.position().left;
        const btnWidth = $btn.outerWidth();

        $bg.css({
            left: btnLeft + "px",
            width: btnWidth + "px"
        });
    }

    
    
    
    let scrollTriggerInstances = [];

    function initScrollTriggerAnimation() {
        if (!window.gsap || !window.ScrollTrigger) return;

        const isMobile = window.innerWidth <= 768;

        scrollTriggerInstances.forEach(function (instance) {
            if (instance && instance.kill) {
                instance.kill();
            }
        });
        scrollTriggerInstances = [];

        ScrollTrigger.getAll().forEach(function (trigger) {
            if (trigger.vars && trigger.vars.trigger && $(trigger.vars.trigger).hasClass("eb-ls-it")) {
                trigger.kill();
            }
        });

        if (isMobile) {
            gsap.set(".eb-stcx-tp .eb-ls-ar .eb-ls-it", { opacity: 1, y: 0 });
            ScrollTrigger.refresh();
            return;
        }

        
        gsap.utils.toArray(".eb-stcx-tp .eb-ls-ar .eb-ls-it").forEach(function (item) {
            gsap.set(item, { opacity: 0.3, y: 80 });
        });
        gsap.registerPlugin(ScrollTrigger);
        const $visibleItems = $(".eb-stcx-tp .eb-ls-ar .eb-ls-it:visible");
        $visibleItems.each(function () {
            const item = this;
            const trigger = gsap.fromTo(
                item,
                { opacity: 0.3, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 75%",
                        end: "top 40%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
            scrollTriggerInstances.push(trigger.scrollTrigger);
        });

        ScrollTrigger.refresh();
    }

    
    
    
    function initResizeHandler() {
        $(window).on("resize", function () {
            const $activeBtn = $(".eb-stcx-tb .eb-tb-bt.active");
            const $tabBg = $(".eb-stcx-tb .eb-tb-bk");
            if ($activeBtn.length && $tabBg.length) {
                updateTabBg($activeBtn, $tabBg);
            }
        });
    }

    
    
    
    function initDifferentSwiper() {
        const $el = $(".eb-dffx-swpx");
        if (!$el.length) return;

        new Swiper(".eb-dffx-swpx", {
            slidesPerView: "auto",
            loop: false,
            freeMode: false,
            grabCursor: true
        });
    }

    
    
    
    function initPointSwiper() {
        const $swiper = $(".eb-pntx-swpx");
        if (!$swiper.length) return;

        new Swiper(".eb-pntx-swpx", {
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: ".eb-ar-bt.eb-ar-nxtx",
                prevEl: ".eb-ar-bt.eb-ar-prvx"
            }
        });
    }

    
    
    
    function initQnaAccordion() {
        const $list = $(".eb-qnx-ls");
        if (!$list.length) return;

        const $titles = $list.find(".eb-qnx-tt");
        const $contents = $list.find(".eb-qnx-ct");
        $contents.hide();
        $titles.first().addClass("active");
        $contents.first().show();

        $titles.on("click", function () {
            const $title = $(this);
            const $item = $title.closest(".eb-qnx-it");
            const $content = $item.find(".eb-qnx-ct");
            const isOpen = $title.hasClass("active");

            
            $titles.not($title).removeClass("active");
            $contents.not($content).slideUp(300);

            if (isOpen) {
                $title.removeClass("active");
                $content.slideUp(300);
            } else {
                $title.addClass("active");
                $content.slideDown(300);
            }
        });
    }

    
    
    
    function initCircularChart() {
        var circumference = 2 * Math.PI * 45;

        function runChart(el) {
            if (el.dataset.circularInited) return;
            el.dataset.circularInited = "1";

            var percent = Math.min(100, Math.max(0, parseInt(el.getAttribute("data-percent"), 10) || 0));
            var progress = el.querySelector(".eb-chrx-prgx");
            var valueEl = el.querySelector(".eb-chrx-vlx");
            if (!progress) return;

            var offset = circumference * (1 - percent / 100);
            progress.style.strokeDasharray = String(circumference);
            progress.style.strokeDashoffset = String(circumference);
            if (valueEl) valueEl.innerHTML = "0<em>%</em>";

            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    progress.style.strokeDashoffset = String(offset);
                    if (valueEl) {
                        var cur = 0;
                        var step = Math.max(1, Math.ceil(percent / 25));
                        var t = setInterval(function () {
                            cur = Math.min(cur + step, percent);
                            valueEl.innerHTML = cur + "<em>%</em>";
                            if (cur >= percent) clearInterval(t);
                        }, 40);
                    }
                });
            });
        }

        function runAll() {
            document.querySelectorAll(".eb-crcx-chrx[data-percent]").forEach(runChart);
        }

        runAll();
        setTimeout(runAll, 0);
        window.addEventListener("load", runAll);

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (m) {
                m.addedNodes.forEach(function (node) {
                    if (node.nodeType !== 1) return;
                    if (node.matches && node.matches(".eb-crcx-chrx[data-percent]")) runChart(node);
                    if (node.querySelectorAll) node.querySelectorAll(".eb-crcx-chrx[data-percent]").forEach(runChart);
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    initProcessSwiper();
    initStickyTabMenu();
    initScrollTriggerAnimation();
    initResizeHandler();
    initDifferentSwiper();
    initPointSwiper();
    initCircularChart();
    initQnaAccordion();
});
