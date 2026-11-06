
(function () {
    if (!window.gsap || !window.ScrollTrigger) return;

    var section = document.querySelector(".eb-klsx-ntrx-sec");
    if (!section) return;

    var introTop = section.querySelector(".eb-ntrx-tp");
    var topImg = section.querySelector(".eb-tp-pic");
    if (!topImg) return;

    var bg = topImg.querySelector(".eb-bk");
    var imgTop = topImg.querySelector(".eb-pic-tp");
    var imgBottom = topImg.querySelector(".eb-pic-bt");
    var textTop = section.querySelector(".eb-tx-tp");
    var textBottom = section.querySelector(".eb-tx-bt");
    var countInfo = section.querySelector(".eb-cn-nf");
    var hospitalInfo = section.querySelector(".eb-hspx-nf");

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(topImg, { width: "40%", height: "14%" });
    if (bg) gsap.set(bg, { opacity: 0 });
    if (imgBottom) gsap.set(imgBottom, { opacity: 0 });
    if (countInfo) gsap.set(countInfo, { opacity: 0 });
    if (hospitalInfo) gsap.set(hospitalInfo, { opacity: 0 });

    $(document).ready(function () {
        $(window).on("beforeunload", function () {
            $(window).scrollTop(0);
        });
    });

    window.addEventListener("load", function () {
        var startHold = 3; 
        var totalDur = 40 + startHold;
        var pinEnd = 6500;
        var countInfoAt = 15 + startHold;
        var hospitalAt = 27 + startHold;
        var progressCount = countInfoAt / totalDur;
        var progressHospital = hospitalAt / totalDur;
        var activeThreshold = (startHold + 0.5) / totalDur; 
        var countInfoHasAnimated = false;
        var countInfoResetTimer = null;
        var countInfoTransitionMs = 800; 

        function formatCount(n) {
            return n >= 1000 ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : String(n);
        }
        function runCountUp() {
            if (!countInfo) return;
            var els = countInfo.querySelectorAll(".js-count");
            els.forEach(function (el) {
                var to = parseInt(el.getAttribute("data-to"), 10);
                if (isNaN(to)) return;
                var obj = { v: 0 };
                gsap.to(obj, {
                    v: to,
                    duration: 1.2,
                    ease: "power2.out",
                    snap: { v: 1 },
                    onUpdate: function () {
                        el.textContent = formatCount(Math.round(obj.v));
                    }
                });
            });
        }

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: introTop || section,
                start: "end top",
                end: "bottom+=" + pinEnd + "px bottom",
                pin: true,
                scrub: 0,
                invalidateOnRefresh: true,
                onEnter: function () {
                    if (introTop) introTop.classList.add("on");
                },
                onLeaveBack: function () {
                    if (introTop) introTop.classList.remove("on");
                },
                onUpdate: function (self) {
                    var p = self.progress;
                    var active = p > activeThreshold;
                    var hideText = p >= progressCount;

                    [topImg, textTop, textBottom].forEach(function (el) {
                        if (el) el.classList.toggle("active", active);
                    });
                    [textTop, textBottom].forEach(function (el) {
                        if (el) {
                            el.classList.toggle("hide", hideText);
                            el.style.opacity = hideText ? "0" : "";
                        }
                    });
                    if (countInfo) {
                        var countActive = p >= progressCount && p < progressHospital;
                        countInfo.classList.toggle("active", countActive);
                        if (countActive) {
                            if (countInfoResetTimer) {
                                clearTimeout(countInfoResetTimer);
                                countInfoResetTimer = null;
                            }
                            if (!countInfoHasAnimated) {
                                countInfoHasAnimated = true;
                                runCountUp();
                            }
                        } else {
                            countInfoHasAnimated = false;
                            if (countInfoResetTimer) clearTimeout(countInfoResetTimer);
                            countInfoResetTimer = setTimeout(function () {
                                countInfoResetTimer = null;
                                var resetEls = countInfo.querySelectorAll(".js-count");
                                resetEls.forEach(function (el) {
                                    el.textContent = "0";
                                });
                            }, countInfoTransitionMs);
                        }
                    }
                    if (hospitalInfo) hospitalInfo.classList.toggle("active", p >= progressHospital);
                }
            }
        });

        tl.to({}, { duration: startHold }, 0)
            .to(topImg, { width: "73%", height: "62%", duration: 0.1, ease: "none" }, startHold)
            .to(topImg, { width: "83%", height: "78%", duration: 0, ease: "none" }, startHold + 1)
            .to(topImg, { width: "100%", height: "100%", duration: 0, ease: "none" }, startHold + 2)
            .to(countInfo, { opacity: 1, duration: 0.05, ease: "none" }, countInfoAt)
            .to({}, { duration: 20 }, startHold + 2);
        if (bg) tl.to(bg, { opacity: 1, duration: 3, ease: "none" }, startHold);
        tl.to(imgTop, { opacity: 0, duration: 3, ease: "none" }, hospitalAt)
            .to(imgBottom, { opacity: 1, duration: 3, ease: "none" }, hospitalAt)
            .to(hospitalInfo, { opacity: 1, duration: 0.05, ease: "none" }, hospitalAt)
            .to(countInfo, { opacity: 0, duration: 0.2, ease: "none" }, hospitalAt)
            .to({}, { duration: totalDur - hospitalAt }, hospitalAt);

        var staffSection = document.querySelector(".eb-ntrx-stfx-sec");
        var bgArea = staffSection ? staffSection.querySelector(".eb-bk-ar") : null;
        if (staffSection && bgArea) {
            ScrollTrigger.create({
                trigger: staffSection,
                start: "top 25%",
                onEnter: function () {
                    bgArea.classList.add("active");
                }
            });
        }
    });
})();
