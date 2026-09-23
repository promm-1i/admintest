/* 누빛광학 공통 동작 — 레퍼런스 common.js 와 같은 동작 (jQuery) */
$(function () {
  var $hd = $('#hd');
  // PC 메뉴: 대메뉴에 올리면 머리글이 흰 판으로, 해당 하위 메뉴 slideDown
  $('.gnav>ul>li').on('mouseover', function () {
    $hd.addClass('open');
    $(this).find('ul').stop().slideDown().parent('li').siblings().find('ul').hide();
  });
  $hd.on('mouseleave', function () {
    $hd.removeClass('open');
    $('.gnav>ul>li>ul').slideUp();
  });
  // 50px 넘게 내리면 흰 머리글
  $(window).on('scroll', function () { $hd.toggleClass('scrolled', $(window).scrollTop() > 50); }).trigger('scroll');

  // 전체 메뉴
  var opened = false;
  $('.burger').on('click keydown', function (e) {
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    opened = !opened;
    $hd.toggleClass('menu', opened);
    $(this).toggleClass('x', opened);
    $('.amenu').toggleClass('open', opened);
  });
  $(window).on('resize', function () {
    if ($(window).width() < 1383) $('body').addClass('mobile');
    else { $('body').removeClass('mobile'); $('.amenu-in>ul>li>ul').slideDown(); }
  }).trigger('resize');
  $(document).on('click', '.mobile .amenu-in>ul>li>a', function () {
    var $li = $(this).parent('li');
    if ($li.hasClass('act')) $(this).next('ul').slideUp(300); else $(this).next('ul').slideDown(300);
    $li.toggleClass('act').siblings('li').removeClass('act').find('ul').slideUp();
  });

  // 화면에 들어오면 seen (레퍼런스 .ani → in-view, 한 번 붙으면 떼지 않음)
  var $rv = $('.rv');
  function check() {
    var top = $(window).scrollTop(), bottom = top + $(window).height();
    $rv.each(function () {
      var $e = $(this), y = $e.offset().top, h = $e.outerHeight();
      if (y + h >= top && y <= bottom) $e.addClass('seen');
    });
  }
  $(window).on('scroll resize', check).trigger('scroll');

  // 푸터 약관 팝업
  $('.ft-links li').on('click', function () {
    var i = $('.ft-links li').index(this);
    $('#dim').show(); $('.lpop.terms').show();
    $('.lpop.terms h4>div').eq(i).show().siblings().hide();
    $('.lpop.terms .body>div').eq(i).show().siblings().hide();
  });
  $('.lpop.terms .x').on('click', function () { $('#dim').hide(); $('.lpop.terms').hide(); });

  // 부드러운 휠 (레퍼런스 SmoothScroll 설정)
  if (window.SmoothScroll) SmoothScroll({ animationTime: 1000, stepSize: 60, accelerationDelta: 50, accelerationMax: 2, keyboardSupport: true, arrowScroll: 40, pulseAlgorithm: true, pulseScale: 4, pulseNormalize: 1, touchpadSupport: false, fixedBackground: true });
});
