function getDeviceType() {
  const w = window.innerWidth;
  if (w <= 768) return "mobile";
  if (w <= 1280) return "tablet";
  return "desktop";
}
$(function(){
  gnb();
  sitemap();
  window.addEventListener("load", () => {
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
      });
    }
  });
  window.layerLoad = layerLoad;
  window.layerClose = layerClose;
  let resizeTimer;
  let prevDevice = getDeviceType();
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const currentDevice = getDeviceType();
      if (prevDevice !== currentDevice) {
        location.reload();
        return;
      }
      if (window.AOS) {
        window.AOS.refreshHard();
      }
      prevDevice = currentDevice;
    }, 300);
  });
  $(".btnTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 1) {
      $(".nvhd-wr").addClass("nvfx");
    } else if (
      $(window).scrollTop() === 0 &&
      !$(".nvhd-wr").is(":hover") &&
      typeof __pageName !== "undefined" &&
      __pageName !== "sub"
    ) {
      $(".nvhd-wr").removeClass("nvfx");
    }
  });
  function gnb() {
    if (getDeviceType() !== "desktop") return;
    var head = ".nvhd-wr";
    var submenuWrap = ".nvsb-mn-wr";
    $(submenuWrap).hide();
    $(".nvgn-wx").on("mouseenter", function () {
      $(".nvsb-mn-wr").hide();
      $(".nvsb-mn-wr").stop().fadeIn(300);
      $(".nvhd-wr #nvi-gn .nvsb-mn").stop().fadeIn(200);
      $(head).addClass("nvfx nvsb-pnx");
    });
    $(".nvgn-wx").on("mouseleave", function () {
      $(".nvsb-mn-wr").stop().fadeOut(300);
      $(".nvhd-wr #nvi-gn .nvsb-mn").stop().fadeOut(100);
      if ($(window).scrollTop() >= 1) {
        $(head).removeClass("nvsb-pnx");
      } else if ($(window).scrollTop() === 0 && !$(head).is(":hover")) {
        var isSubPage =
          typeof __pageName !== "undefined" && __pageName === "sub";
        $(head).removeClass(isSubPage ? "nvsb-pnx" : "nvfx nvsb-pnx");
      }
    });
  }
  function sitemap() {
    if (getDeviceType() !== "desktop") return;
    $(".nvhdx-mn").on("click", function () {
      $(".nvstmx-wr").fadeIn(250, function () {
        $(".nvstmx-wr").addClass("active");
      });
    });
    $(".nvstmx-wr .nvcls").on("click", function () {
      $(".nvstmx-wr").fadeOut();
      $(".nvstmx-wr").removeClass("active");
    });
    $(".nvstmx-wr .nvsb-mn").hover(
      function () {
        $(this).addClass("active");
      },
      function () {
        $(this).removeClass("active");
      },
    );
  }
  function layerLoad(selector) {
    var $modalWrap = $(selector);
    if ($modalWrap.length) {
      $(".popup_wrap").hide();
      $modalWrap.fadeIn();
    }
  }
  function layerClose(selector) {
    var $modalWrap = $(selector);
    if ($modalWrap.length) {
      $modalWrap.fadeOut();
    }
  }
  $(".popup_wrap .nvbt-cls").on("click", function () {
    var $modalWrap = $(this).closest(".popup_wrap");
    $modalWrap.fadeOut();
    return false;
  });
  $(".nvhdx-mn").on("click", function (e) {
    if (getDeviceType() !== "desktop") {
      e.preventDefault();
      $(".nvbt-cls").fadeIn();
      $(".nvmox-nv").fadeIn();
      $(".nvmox-nv-vrlx").fadeIn();
    }
  });
  $(".nvmox-gn .nvhm-mn > p").on("click", function () {
    if (getDeviceType() !== "desktop") {
      const $parent = $(this).parent();
      const $submenu = $parent.find(".nvsb-mn-ls");
      if ($parent.hasClass("active")) {
        $parent.removeClass("active");
        $submenu.stop(true, true).slideUp();
        return;
      }
      $(".nvmox-gn .nvhm-mn")
        .removeClass("active")
        .find(".nvsb-mn-ls")
        .stop(true, true)
        .slideUp();
      $parent.addClass("active");
      $submenu.stop(true, true).slideDown();
    }
  });
  $(document).on("click", ".nvmox-nv .nvbt-cls,.nvmox-nv-vrlx", function (e) {
    if (getDeviceType() !== "desktop") {
      e.preventDefault();
      closeMenu();
    }
  });
  function closeMenu() {
    $(".nvbt-cls").fadeOut();
    $(".nvmox-nv").fadeOut(function () {
      $("#mo_gnb > li").removeClass("active").find(".nvsb-mn-ls").slideUp();
    });
    $(".nvmox-nv-vrlx").fadeOut();
  }
});
