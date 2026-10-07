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

    
    if ($(".eb-qpmx-sl-sec").length > 0) {
        const section = $(".eb-qpmx-sl-sec");
        const btnWrap = section.find(".eb-tt-ct .eb-sl-bt-wr");
        const btn = btnWrap.find("li");
        const itemSlideWrap = section.find(".eb-it-sl-wr");
        const itemSlideSwiper = new Swiper(itemSlideWrap, {
            slidesPerView: 1,
            spaceBetween: 0,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            loop: true,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false
            },
            on: {
                slideChange: function () {
                    btn.removeClass("active");
                    btn.eq(this.realIndex).addClass("active");
                }
            },
            navigation: {
                nextEl: ".eb-qpmx-sl-sec .eb-it-sl-wr .eb-cntx-bt-wr .eb-bt2.eb-nxtx",
                prevEl: ".eb-qpmx-sl-sec .eb-it-sl-wr .eb-cntx-bt-wr .eb-bt2.eb-prvx"
            }
        });

        btn.on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
            itemSlideSwiper.slideTo($(this).index() + 1);
        });
    }

    
    if ($(".eb-sb19").length > 0) {
        
        const section2 = $(".eb-sec2");
        const infoSlideWrap = section2.find(".eb-nf-sl-wr");
        const infoSlideSwiper = new Swiper(infoSlideWrap, {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            breakpoints: {
                768: {
                    slidesPerView: 1.9,
                    spaceBetween: 100
                }
            }
        });

        const section3 = $(".eb-sec3");
        const infoContainer = section3.find(".eb-nf-cont");
        const txt_list = infoContainer.find(".eb-tx-ls ul");
        const currentPage = infoContainer.find(".eb-pgx-crrx");
        const totalPage = infoContainer.find(".eb-pgx-ttlx");

        const infoSwiper = new Swiper(infoContainer, {
            slidesPerView: 1,
            speed: 0,
            spaceBetween: 0,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            navigation: {
                nextEl: ".eb-sec3 .eb-nf-cont .eb-bt2.eb-nxtx",
                prevEl: ".eb-sec3 .eb-nf-cont .eb-bt2.eb-prvx"
            },
            on: {
                slideChange: function () {
                    txt_list.css("transform", `translateY(-${infoSwiper.realIndex * 1.6}em)`);
                    infoSwiper.realIndex > 9
                        ? currentPage.text(infoSwiper.realIndex + 1)
                        : currentPage.text(`0${infoSwiper.realIndex + 1}`);
                }
            }
        });

        if (infoSwiper.slides.length - 2 > 10) {
            totalPage.text(infoSwiper.slides.length - 2);
        } else {
            totalPage.text(`0${infoSwiper.slides.length - 2}`);
        }

        const section4 = $(".eb-sec4");
        const infoWrap = section4.find(".eb-nf-wr");
        const infoListSwiper = new Swiper(infoWrap, {
            slidesPerView: 1.3,
            spaceBetween: 0,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            }
        });

        function desableSwiper() {
            infoListSwiper.destroy(true, true);
        }
        function setSwiper() {
            if ($(window).width() > 768) {
                desableSwiper();
            } else {
                infoListSwiper.init();
            }
        }
        $(window).on("resize, load", function () {
            setSwiper();
        });
    }

    
    
    if ($(".eb-ntrx-pnx-sec").length > 0) {
        const section = $(".eb-ntrx-pnx-sec");
        const roller = section.find(".eb-ct-rllx");
        const content = section.find(".eb-ct-cont");
        const info_length = content.length;
        const bgGradientWrap = section.find(".eb-bk-grdx-wr");

        const content1 = section.find(".eb-cont1");
        const content2 = section.find(".eb-cont2");
        const con2_img = content2.find(".eb-pic-wr .eb-pic2");
        const pinTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `${content.length * 100}%`,
                pinSpacing: true,
                pin: true,
                scrub: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    for (let i = 0; i < content.length; i++) {
                        if (self.progress > i / content.length && self.progress < (i + 1) / content.length) {
                            content.eq(i).addClass("active");
                        } else if (self.progress === 1) {
                            content.eq(i).removeClass("active");
                            content.eq(content.length - 1).addClass("active");
                        } else {
                            content.eq(i).removeClass("active");
                        }
                    }
                    
                    if (self.progress > 1 / content.length && self.progress < 1) {
                        bgGradientWrap.addClass("active");
                    } else {
                        bgGradientWrap.removeClass("hide");
                        bgGradientWrap.removeClass("active");
                    }

                    
                    if (self.progress > (1 / content.length) * 2) {
                        con2_img.addClass("hide");
                    } else {
                        con2_img.removeClass("hide");
                    }
                }
            }
        });
        pinTimeLine.to({}, { duration: 1 }); 
        pinTimeLine.to(
            content1,
            {
                opacity: 0,
                duration: 1 / content.length
            },
            0
        );
        pinTimeLine.to(
            con2_img,
            {
                scale: 1,
                translateY: 0,
                translateX: 0
            },
            "<"
        );
    }
});
