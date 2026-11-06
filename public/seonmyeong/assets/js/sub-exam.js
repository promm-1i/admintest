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

    
    if ($(".eb-sl-th-sec").length > 0) {
        const section = $(".eb-sl-th-sec");
        const slideWrap = section.find(".eb-sl-ar .eb-sl-wr");
        const nextBtn = section.find(".eb-sl-ar .eb-bt-wr2 .eb-bt2.eb-nxtx");
        const prevBtn = section.find(".eb-sl-ar .eb-bt-wr2 .eb-bt2.eb-prvx");
        const currentPage = section.find(".eb-sl-ar .eb-pgx-wr .eb-pgx-crrx");
        const totalPage = section.find(".eb-sl-ar .eb-pgx-wr .eb-pgx-ttlx");
        const txtArea = section.find(".eb-tx-ar2");
        const textContainer = txtArea.find(".eb-tx-cont");

        const slideSwiper = new Swiper(slideWrap, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            on: {
                slideChange: function () {
                    slideSwiper.realIndex + 1 > 9
                        ? currentPage.text(slideSwiper.realIndex + 1)
                        : currentPage.text(`0${slideSwiper.realIndex + 1}`);
                    textContainer.removeClass("active");
                    textContainer.eq(slideSwiper.realIndex).addClass("active");
                }
            }
        });
        const totalText =
            slideSwiper.slides.length > 9 ? slideSwiper.slides.length - 2 : `0${slideSwiper.slides.length - 2}`;
        totalPage.text(totalText);
    }

    
    if ($(".eb-chtx-bbbx-sec").length > 0) {
        const section = $(".eb-chtx-bbbx-sec");
        const bubbleList = section.find(".eb-bbbx-ls");
        const bubbleItem = bubbleList.find(".eb-spcx-bbbx");
        const bubbleLength = bubbleItem.length;
        const imgWrap = section.find(".eb-pic-wr");

        const setBubbleAnimation = function () {
            const windowTop = $(window).scrollTop() + $(window).height() / 1.2;
            const sectionTop = imgWrap.offset().top;
            const sectionHeight = imgWrap.outerHeight();
            const animationGoal = sectionTop + sectionHeight / 2;

            
            let animationProgress = 0;
            const scrollRange = animationGoal - sectionTop;

            if (windowTop < sectionTop) {
                animationProgress = 0;
            } else if (windowTop > animationGoal) {
                animationProgress = 1;
            } else {
                animationProgress = (windowTop - sectionTop) / scrollRange;
            }

            
            const stepSize = 1 / bubbleLength;
            const currentStep = Math.floor(animationProgress * bubbleLength);
            animationProgress = currentStep * stepSize;

            
            if (currentStep >= bubbleLength) {
                animationProgress = 1;
            }

            
            if (animationProgress === 0) {
                bubbleItem.removeClass("eb-vsbx");
                bubbleItem.removeClass("eb-dnx");
                bubbleList.css("--progress", 1);
            } else if (animationProgress === 1) {
                
                bubbleItem.addClass("eb-dnx");
                bubbleItem.removeClass("eb-vsbx");
                bubbleItem.last().addClass("eb-vsbx");
                bubbleItem.last().removeClass("eb-dnx");
                bubbleList.css("--progress", 0);
            } else {
                
                for (let i = 0; i < bubbleLength; i++) {
                    const itemStart = i / bubbleLength;
                    const itemEnd = (i + 1) / bubbleLength;

                    if (animationProgress > itemStart && animationProgress <= itemEnd) {
                        bubbleList.css("--progress", (i + 1) / bubbleLength);
                        bubbleItem.eq(i).removeClass("eb-dnx");
                        bubbleItem.eq(i).addClass("eb-vsbx");
                    } else if (animationProgress > itemEnd) {
                        bubbleItem.eq(i).addClass("eb-dnx");
                        bubbleItem.eq(i).removeClass("eb-vsbx");
                    } else {
                        bubbleItem.eq(i).removeClass("eb-vsbx");
                        bubbleItem.eq(i).removeClass("eb-dnx");
                    }
                }
            }
        };
        setBubbleAnimation();
        $(window).on("scroll", function () {
            setBubbleAnimation();
        });
    }

    
    if ($("#eb-i-qpx-slcx").length > 0) {
        const equipSelect = $("#eb-i-qpx-slcx");
        const equipList = $(".eb-qpx-gd-sec .eb-nf-ls-wr li");

        var filterEquip = function () {
            var val = equipSelect.val();
            equipList.hide().removeClass("aos-animate");
            equipList
                .filter('[data-category="' + val + '"]')
                .show()
                .each(function () {
                    $(this).addClass("aos-animate");
                });
        };
        filterEquip();
        equipSelect.on("change", function () {
            filterEquip();
        });
    }

    
    if ($(".eb-pic-chnx-sec").length > 0) {
        const section = $(".eb-pic-chnx-sec");
        const imgList = section.find(".eb-pic-ls");
        const img = imgList.find(".eb-pic2");
        const list_area = section.find(".eb-ls-ar");
        const listItem = list_area.find(".eb-ls-it");
        let windowTop = 0;
        let activeIndex = 0;
        let itemLength = listItem.length;
        const imgChangeEvent = function () {
            windowTop = $(window).scrollTop() + $(window).height() / 1.4;
            listItem.each(function (index) {
                const itemTop = $(this).offset().top;
                if (windowTop > itemTop) {
                    activeIndex = index;
                }
            });
            img.each(function (index) {
                if (index <= activeIndex) {
                    img.eq(index).addClass("active");
                } else {
                    img.eq(index).removeClass("active");
                }
            });
        };

        const imgChangeEventMobile = function () {
            const scrollLeft = list_area.scrollLeft();
            const scrollWidth = list_area[0].scrollWidth;
            const clientWidth = list_area.width();
            const maxScroll = scrollWidth - clientWidth;

            
            const sectionSize = maxScroll / itemLength;

            
            activeIndex = Math.floor(scrollLeft / sectionSize);

            
            if (activeIndex >= itemLength) {
                activeIndex = itemLength - 1;
            }

            img.each(function (index) {
                if (index <= activeIndex) {
                    img.eq(index).addClass("active");
                } else {
                    img.eq(index).removeClass("active");
                }
            });
        };
        $(window).on("load scroll", function () {
            if ($(window).width() > 768) {
                imgChangeEvent();
            }
        });
        
        if ($(window).width() <= 768) {
            list_area.on("scroll", function () {
                imgChangeEventMobile();
            });
            imgChangeEventMobile(); 
        }
    }
});
