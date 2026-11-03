$(window).on("load", function () {
  gsap.registerPlugin(ScrollTrigger, Observer);
  if (getDeviceType() === "desktop") {
    initSec02Scroll();
  }
  function initSec02Scroll() {
    const sec02ScrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nvsec02",
        start: "top top",
        end: "+=130%",
        pin: true,
        anticipatePin: 1,
        refreshPriority: 1,
        scrub: 1,
      },
    });
    gsap.set(".nvsec02 .nvsec-tt .nvtt22, .nvsec02 .nvsec-tt .nvfntx3", {
      y: 30,
    });
    sec02ScrollTl
      .to(
        {},
        {
          duration: 0.6,
        },
      )
      .to(".nvsec02 .nvpic-bx, .nvsec02 .nvpic-bx02", {
        width: "100%",
        height: "100%",
        borderRadius: 0,
        top: 0,
        duration: 1,
        ease: "none",
      })
      .to(
        ".nvsec02 .nvsec-tt .nvtt1",
        {
          opacity: 0,
          duration: 0.3,
        },
        "+=0.05",
      )
      .to(
        ".nvsec02 .nvpic-bx",
        {
          opacity: 0,
          duration: 0.3,
        },
        "+=0.2",
      )
      .to(
        ".nvsec02 .nvsec-tt",
        {
          zIndex: 3,
        },
        "<",
      )
      .to(
        ".nvsec02 .nvsec-tt",
        {
          top: "50%",
          left: "50%",
          duration: 0.6,
        },
        "<",
      )
      .to(
        ".nvsec02 .nvpic-bx02",
        {
          opacity: 1,
          duration: 0.3,
        },
        "<",
      )
      .to(
        ".nvsec02 .nvsec-tt .nvtt22",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "+=0.3",
      )
      .to(
        ".nvsec02 .nvsec-tt .nvfntx3",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "<0.08",
      )
      .to(
        {},
        {
          duration: 0.6,
        },
      );
  }
  const sec04Swiper = new Swiper(".nvsec04 .swiper", {
    slidesPerView: "auto",
    spaceBetween: 24,
    touchRatio: 0,
    loop: true,
    loopAddBlankSlides: true,
    speed: 5000,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
  });
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    AOS.refreshHard();
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      AOS.refreshHard();
    });
  });
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
    AOS.refreshHard();
  });
});
