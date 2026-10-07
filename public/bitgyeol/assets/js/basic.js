

$(document).ready(function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    
    
    if (!window.location.href.includes("p=1_new_renewal")) {
        window.addEventListener("resize", () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        });
    }
    $(".eb-shrx-bt").click(function (event) {
        event.stopPropagation(); 
        $(".eb-shrx-ar").toggleClass("on");
    });

    $(document).click(function (event) {
        if (!$(event.target).closest(".eb-shrx-ar").length && !$(event.target).closest(".eb-js-share-btn").length) {
            $(".eb-shrx-ar").removeClass("on");
        }
    });

    var wow = null;

    function initWowOnResize() {
        
        if (wow !== null) {
            
            wow = null;
        }

        
        if (window.matchMedia("(min-width: 768px)").matches) {
            wow = new WOW();
            wow.init();
        }
    }

    
    initWowOnResize();

    
    window.addEventListener("resize", function () {
        
        initWowOnResize();
    });

    

    $(".eb-tp-bt").click(function () {
        $("html, body").animate(
            {
                scrollTop: 0
            },
            400
        );
        return false;
    });

    
    var scrollingElement = document.scrollingElement;
    var scrollWidth = window.innerWidth - scrollingElement.clientWidth;
    var root = document.querySelector(":root");
    let styles = getComputedStyle(root);
    styles.getPropertyValue("--scroll-width");
    root.style.setProperty("--scroll-width", scrollWidth + "px");

    function ScrollXArr() {
        
        if ($(".eb-tp-tb").length === 0) {
            return; 
        }

        
        $(".eb-tp-tb").addClass("eb-frsx");

        $(".eb-tp-tb .eb-wr").on("scroll", function () {
            var tabScroll = $(this).scrollLeft();
            var maxScroll = $(this)[0].scrollWidth - $(this).width();

            if (tabScroll >= maxScroll - 1) {
                
                $(".eb-tp-tb").addClass("eb-lstx").removeClass("eb-frsx");
            } else if (tabScroll === 0) {
                
                $(".eb-tp-tb").addClass("eb-frsx").removeClass("eb-lstx");
            }
        });
    }
    ScrollXArr();

    function moveToSlide(slideIndex) {
        mySwiper.slideTo(slideIndex);
    }

    function beforeSlide() {
        
        const slider = document.getElementById("eb-i-cmpx-sl");
        const before = document.getElementById("eb-i-bfrx-pic");

        if (before) {
            const beforeImage = before.getElementsByTagName("img")[0];
            const resizer = document.getElementById("eb-i-rszx");

            let active = false;

            
            document.addEventListener("DOMContentLoaded", function () {
                let width = slider.offsetWidth;
                
                beforeImage.style.width = width + "px";
            });

            
            window.addEventListener("resize", function () {
                let width = slider.offsetWidth;
                
                beforeImage.style.width = width + "px";
            });

            resizer.addEventListener("mousedown", function () {
                active = true;
                resizer.classList.add("eb-js-resize");
            });

            document.body.addEventListener("mouseup", function () {
                active = false;
                resizer.classList.remove("eb-js-resize");
            });

            document.body.addEventListener("mouseleave", function () {
                active = false;
                resizer.classList.remove("eb-js-resize");
            });

            document.body.addEventListener("mousemove", function (e) {
                if (!active) return;
                let x = e.pageX;
                x -= slider.getBoundingClientRect().left;
                slideIt(x);
                pauseEvent(e);
            });

            resizer.addEventListener("touchstart", function () {
                active = true;
                resizer.classList.add("eb-js-resize");
            });

            document.body.addEventListener("touchend", function () {
                active = false;
                resizer.classList.remove("eb-js-resize");
            });

            document.body.addEventListener("touchcancel", function () {
                active = false;
                resizer.classList.remove("eb-js-resize");
            });

            
            document.body.addEventListener("touchmove", function (e) {
                if (!active) return;
                let x;

                let i;
                for (i = 0; i < e.changedTouches.length; i++) {
                    x = e.changedTouches[i].pageX;
                }

                x -= slider.getBoundingClientRect().left;
                slideIt(x);
                pauseEvent(e);
            });

            function slideIt(x) {
                let transform = Math.max(0, Math.min(x, slider.offsetWidth));
                before.style.width = transform + "px";
                resizer.style.left = transform - 0 + "px";
            }

            
            function pauseEvent(e) {
                if (e.stopPropagation) e.stopPropagation();
                if (e.preventDefault) e.preventDefault();
                e.cancelBubble = true;
                e.returnValue = false;
                return false;
            }
        }
    }

    beforeSlide();

    var previousScroll;
    var windowScroll = window.pageYOffset || document.documentElement.scrollTop;
    var scrollPosition;

    $(".eb-hd").removeClass("eb-dwnx");

    scrollPosition = window.scrollY || window.pageYOffset;
    if (scrollPosition > 100) {
        $(".eb-hd").addClass("eb-hd-dwnx");
    } else {
        $(".eb-hd").removeClass("eb-hd-dwnx");
    }

    $(window).scroll(function () {
        scrollPosition = window.scrollY || window.pageYOffset;

        if (scrollPosition > 100) {
            $(".eb-hd").addClass("eb-hd-dwnx");
        } else {
            $(".eb-hd").removeClass("eb-hd-dwnx");
        }

        if ($(".eb-nv").hasClass("on")) {
            return;
        }

        var currentScroll = $(this).scrollTop();
        if (currentScroll > previousScroll) {
            if (scrollPosition > 10) {
                $(".eb-hd").addClass("eb-dwnx");
                $("body").addClass("eb-dwnx");
            }
        } else {
            $(".eb-hd").removeClass("eb-dwnx");
            $("body").removeClass("eb-dwnx");
        }
        previousScroll = currentScroll;
    });

    $(window).scroll(function () {});

    $("select").niceSelect();

    $(".eb-sb-nv button").on("click", function () {
        $(".eb-sb-nv button").not($(this)).removeClass("open");
        $(this).toggleClass("open");
    });

    $(".eb-mdlx").click(function (e) {
        var target = e.target;
        if ($(target).hasClass("eb-scr-bx") || $(target).hasClass("eb-mdlx")) {
            if ($(".eb-mdlx").find(".eb-cnfx-mdlx").length > 0) {
                modalClose("join");
            } else {
                modalClose();
            }
        }
    });
    $(".eb-vrx-mdlx").click(function (e) {
        var target = e.target;
        if ($(target).hasClass("eb-scr-bx") || $(target).hasClass("eb-vrx-mdlx")) {
            overModalClose();
        }
    });
    
    
    const ioSolution = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const $target = entry.target;
                if (entry.isIntersecting) {
                    $target.classList.add("on");
                }
            });
        },
        { threshold: 0.2 }
    );

    const $itemsSolution = document.querySelectorAll(".eb-js-sub-cont .eb-js-cir-step-sect");
    $itemsSolution.forEach((item) => {
        ioSolution.observe(item);
    });

    
    const ioBanner = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const $target = entry.target;
                if (entry.isIntersecting) {
                    $target.classList.add("on");
                }
            });
        },
        { threshold: 0.2 }
    );

    const $itemsBanner = document.querySelectorAll(".eb-js-sub-cont .eb-js-online-banner");
    $itemsBanner.forEach((item) => {
        ioBanner.observe(item);
    });

    
    const ioMindCircle = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const $target = entry.target;
                if (entry.isIntersecting) {
                    $target.classList.add("on");
                }
            });
        },
        { threshold: 0.2 }
    );

    const $itemsMindCircle = document.querySelectorAll(".eb-js-sub-cont .eb-js-mind-cir-sect");
    $itemsMindCircle.forEach((item) => {
        ioMindCircle.observe(item);
    });

    
    const ioGradient = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const $target = entry.target;
                if (entry.isIntersecting) {
                    $target.classList.add("on");
                }
            });
        },
        { threshold: 0.2 }
    );

    const $itemsGradient = document.querySelectorAll(".eb-js-sub-cont .eb-js-gradient-sect");
    $itemsGradient.forEach((item) => {
        ioGradient.observe(item);
    });

    
    const ioMindVisual = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const $target = entry.target;
                if (entry.isIntersecting) {
                    $target.classList.add("on");
                }
            });
        },
        { threshold: 0.2 }
    );

    const $itemsMindVisual = document.querySelectorAll(".eb-js-imgvisual .eb-kv-sctx");
    $itemsMindVisual.forEach((item) => {
        ioMindVisual.observe(item);
    });

    
    if (window.innerWidth >= 768) {
        const ioProgress = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const $target = entry.target;
                    if (entry.isIntersecting) {
                        $target.classList.add("on");
                    }
                });
            },
            { threshold: 0.2 }
        );

        const $itemsProgress = document.querySelectorAll(".eb-js-progress-sect");
        $itemsProgress.forEach((item) => {
            ioProgress.observe(item);
        });
    }

    
    if (window.innerWidth >= 768) {
        const ioSlideUp = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const $target = entry.target;
                    if (entry.isIntersecting) {
                        $target.classList.add("active");
                    }
                });
            },
            { threshold: 0.2 }
        );

        const $itemsSlideUp = document.querySelectorAll(".eb-js-slideup-sect .eb-cntx-wr .eb-cntx");
        $itemsSlideUp.forEach((item) => {
            ioSlideUp.observe(item);
        });
    }
});
