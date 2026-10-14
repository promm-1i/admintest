var Common = Common || {};

var $window = $(window),
  $body = $("body"),
  $header = $("header"),
  $moMenu = $("#yw-i-mox-mn"),
  $wrap = $(".wrap"),
  smoother;
var windowWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

Common.utils = {
  /**
   * Common.utils.smoothScroll : �ㅻТ�� �ㅽ겕濡�
   **/
  smoothScroll: function () {
    // 湲곕낯 �좎뼵
    if (!$("#yw-i-wr").hasClass("styleGuide")) {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      var mediaQuery = window.matchMedia("(min-width: 1024px)");
      function breakPoint(mediaQuery) {
        if (mediaQuery.matches) {
          // gsap smoother scroll
          smoother = ScrollSmoother.create({
            wrapper: "#yw-i-smtx-wr",
            content: "#yw-i-smtx-ct",
            smooth: 1.5,
            effects: true,
            ignoreMobileResize: true,
            normalizeScroll: false,
          });
          $("#yw-i-smtx-ct").css({ "will-change": "transform" });
        } else {
          // �ㅽ겕濡ㅼ뒪臾댁뒪 珥덇린�붾� �섍쾶 �섎㈃ 紐⑤뱺 scrollTrigger瑜� �쒓굅(kill)�� �� �ㅼ떆 �⑥닔 �몄텧 �댁빞 �⑥쑝濡� 濡쒕뱶�� �뱀뿉�쒕쭔 �ㅽ뻾�섍쾶 �곸슜
          // smoother.kill();
          // ScrollTrigger.getAll().forEach(function(st){
          // 	st.kill();
          // });
          // Common.utils.init();
        }
      }
      breakPoint(mediaQuery);
      mediaQuery.addEventListener("change", breakPoint);
    }
  },
  /**
   * Common.utils.scrollMotion() - scroll 紐⑥뀡 (��寃잛뿉 active以섏꽌 �쒖뼱)
   * @param {boolean} repeat - 紐⑥뀡 �ㅼ떆 諛섎났 �щ�
   */
  scrollMotion: function (repeat) {
    var mediaQuery = window.matchMedia("(min-width: 1024px)");
    var fadeUpStArray = [];
    // 議댁옱�덉쓣 寃쎌슦留� �ㅽ뻾
    if ($("[data-motion]").length > 0) {
      $("[data-motion]").each(function (idx, target) {
        var fadeUpSt = gsap.timeline({
          scrollTrigger: {
            id: "dataMotion",
            trigger: $(target),
            //markers: true,
            start: "top 95%",
            scrub: 1,
            invalidateOnRefresh: true,
            onEnter: function () {
              $(target).addClass("yw-isx-nmtx");
            },
            onLeaveBack: function () {
              if (repeat) {
                $(target).removeClass("yw-isx-nmtx");
              }
            },
          },
        });
        fadeUpStArray.push(fadeUpSt);
      });
      // ��, 紐⑤컮�� �몃━嫄� �쒖젏 蹂�寃�
      function breakPoint(mediaQuery) {
        if (mediaQuery.matches) {
          fadeUpStArray.forEach(function (target) {
            target.vars.scrollTrigger.start = "top 95%";
          });
        } else {
          fadeUpStArray.forEach(function (target) {
            target.vars.scrollTrigger.start = "top 90%";
          });
        }
      }
      breakPoint(mediaQuery);
      mediaQuery.addEventListener("change", breakPoint);
    }
  },
  /**
   * Common.utils.header : header script
   **/
  header: function () {
    var $gnbDim = $("#yw-i-gn-dmx");
    var $depth1 = $header.find(".yw-dptx");
    var $depth2List = $header.find(".yw-dptx2");

    /* �꾩옱 page gnb �쒖꽦�� */
    var $gnb = $header.find("nav > ul");
    var gnbPath = location.pathname.split("/");
    var gnbPathArray = [gnbPath[2], gnbPath[3], gnbPath[4], gnbPath[5]];
    var depth1Arr = ["company", "product", "maintenance", "support", "career"];
    var $btnSearch = $header.find(".yw-tltx .yw-sr");

    function depthActive() {
      // depth1
      depth1Arr.forEach(function (val, i) {
        if (val == gnbPathArray[0]) {
          var $target = $gnb.children("li").eq(i);
          window.innerWidth > 1024
            ? $target.addClass("yw-crrx")
            : $target.addClass("on open");
        }
      });

      // depth2
      $(".yw-dptx.yw-crrx .yw-dptx2 a").each(function (idx, item) {
        var href = $(item).attr("href");
        depth2Chk(item, href);
      });
      $(".yw-dptx.on .yw-dptx2 a").each(function (idx, item) {
        var href = $(item).attr("href");
        depth2Chk(item, href);
      });
      function depth2Chk(item, href) {
        if (href.indexOf(gnbPathArray[1]) > 0) {
          $(item).addClass("yw-crrx");
        }
      }
    }

    depthActive();
    $depth1.each(function (index, depth1) {
      $(depth1).on({
        mouseenter: function () {
          if (window.innerWidth <= 1024) return;

          if ($(depth1).hasClass("on")) return; // �쒖꽦�� 硫붾돱硫� return
          $body.addClass("yw-gn-pnx");
          $gnbDim.css("height", 495);

          if (!$(depth1).hasClass("on")) {
            $(depth1).addClass("on").siblings().removeClass("on");
          }
        },
        click: function (e) {
          if (window.innerWidth > 1024) return;
          smoother && smoother.paused(true);

          const depth2 = $(this).find(".yw-dptx2");
          if (depth2[0]) {
            var __height = $(depth2).outerHeight();
            $(this).toggleClass("on open");
            if (depth2.tl) {
              depth2.tl.kill();
              depth2.tl = null;
            }
            depth2.tl = gsap.timeline({
              onComplete: function () {
                gsap.set(depth2, { clearProps: "all" });
              },
            });
            if ($(this).hasClass("on")) {
              depth2.tl.set(depth2, { height: "auto", opacity: 1 });
              depth2.tl.from(depth2, {
                height: 0,
                duration: 0.5,
                ease: Quart.easeInOut,
              });
              $(this).siblings().removeClass("on open");
            } else {
              depth2.tl.fromTo(
                depth2,
                { height: __height },
                { height: 0, duration: 0.5, ease: Quart.easeInOut }
              );
            }
          }
        },
      });
    });

    $header.on("mouseleave", function () {
      if (window.innerWidth <= 1024) return;

      $body.removeClass("yw-gn-pnx");
      $gnbDim.css("height", 0);
      $depth1.removeClass("on open");
    });

    $depth1.find("> a").on("click", function (e) {
      windowWidth <= 1024 && e.preventDefault();
    });

    $window.on("resize", function () {
      $depth1.trigger("mouseleave");
      $depth1.removeClass("on open yw-crrx");
      $btnSearch.removeClass("open");
      $body.removeClass("yw-gn-sr");
      depthActive();
    });

    /* 紐⑤컮�� 硫붾돱 踰꾪듉 click */
    $moMenu.on("click", function () {
      var isOpened = $body.hasClass("yw-gn-pnx");
      if (isOpened) {
        smoother && smoother.paused(false);
        $body.removeClass("yw-gn-pnx");
        $gnbDim.removeClass("on");
        $depth1.removeClass("on open");
        depthActive();
      } else {
        smoother && smoother.paused(true);
        $(".yw-gn-wr").animate({ scrollTop: 0 }, 10);
        $body.addClass("yw-gn-pnx");
        setTimeout(function () {
          $gnbDim.addClass("on");
          $header.removeClass("active");
        }, 10);
      }
    });

    $body.on("click", function (e) {
      if ($(e.target).closest("#yw-i-gn-dmx").length !== 0) {
        smoother && smoother.paused(false);
        $body.removeClass("yw-gn-pnx");
        $gnbDim.removeClass("on");
        $depth1.removeClass("on open");
        depthActive();
      }
    });

    /* help 硫붾돱 踰꾪듉 click */
    var $help = $("#helpBtn");
    var $moHelp = $("#moHelpBtn");
    var $helpDim = $("#helpDim");
    var $helpClose = $("#help").find(".yw-bt-cls");
    var helpOpen = $body.hasClass("help-open");

    $help.on("click", function () {
      helpOpen ? $body.removeClass("help-open") : $body.addClass("help-open");

      setTimeout(function () {
        $helpDim.addClass("on");
        $header.removeClass("active");
      }, 10);

      smoother && smoother.paused(true);
    });
    $moHelp.on("click", function () {
      helpOpen ? $body.removeClass("help-open") : $body.addClass("help-open");

      setTimeout(function () {
        $helpDim.addClass("on");
        $header.removeClass("active");
      }, 10);

      smoother && smoother.paused(true);
    });
    $helpClose.on("click", function () {
      $body.removeClass("help-open");
      $helpDim.removeClass("on");
      smoother && smoother.paused(false);
    });

    $body.on("click", function (e) {
      if (
        $(e.target).closest("#helpContent").length === 0 &&
        $helpDim.hasClass("on")
      ) {
        $body.removeClass("help-open");
        $helpDim.removeClass("on");
        smoother && smoother.paused(false);
      }
    });

    // �몄뼱 �좏깮 踰꾪듉 hover ��
    var $btnLang = $header.find(".yw-tltx .yw-lngx");
    $btnLang.mouseenter(function () {
      $(this).addClass("open");
    });
    $btnLang.mouseleave(function () {
      $(this).removeClass("open");
    });

    // 寃��� �좏깮 踰꾪듉 click ��
    $btnSearch.find("button").on("click", function () {
      var isOpened = $(this).closest("li").hasClass("open");
      if (!isOpened) {
        $btnSearch.addClass("open");
        $body.addClass("yw-gn-sr");
      } else {
        $btnSearch.removeClass("open");
        $body.removeClass("yw-gn-sr");
      }
    });

    // scroll > header style change
    var currentT = 0;
    $window.on("scroll", function (e) {
      e.preventDefault();
      var scrollT = $(this).scrollTop();

      scrollT < 300 ? $header.removeClass("yw-whtx") : $header.addClass("yw-whtx");
      // scroll bounce return
      if ($window.outerHeight() > $body.outerHeight() - parseInt(scrollT))
        return;

      if ($("#yw-i-wr").hasClass("yw-hm")) {
        scrollT < 300
          ? $header.removeClass("yw-whtx")
          : $header.addClass("yw-whtx");

        if ($(".yw-hm-tp-bnnx").length > 0) {
          if (scrollT < $(".yw-hm-tp-bnnx").height()) {
            $(".yw-hm-tp-bnnx").removeClass("yw-bnnx-ctvx");
            $header.removeClass("yw-bnnx-ctvx");
            $("#yw-i-ct").removeClass("yw-bnnx-ctvx");
          } else {
            $(".yw-hm-tp-bnnx").addClass("yw-bnnx-ctvx");
            $header.addClass("yw-bnnx-ctvx");
            $("#yw-i-ct").addClass("yw-bnnx-ctvx");
          }
        }
      }

      currentT = scrollT;
    });

    // 寃��됱갹 �뷀꽣��
    $(".yw-sr-bx input[type='text']").on("keyup", function (event) {
      if (event.keyCode === 13) {
        $(this).next("label").trigger("click");
      }
    });
  },

  tabBtnCont: function (tabBtnParent, tabPanelParent) {
    var $tabBtn = $(tabBtnParent);
    var $tabCont = $(tabPanelParent);
    var $tabPanel = $tabCont.find("> *");

    // �� active
    $tabBtn.find(".yw-tb").on("click", function (e) {
      e.preventDefault;
      var idx = $(this).parent().index();
      $(this).parent().addClass("active").siblings().removeClass("active");
      $tabPanel.removeClass("active").eq(idx).addClass("active");

      if ($tabBtn.find(".yw-scr").is(":visible")) {
        $tabBtn.find(".yw-scr").animate({
          scrollLeft: $(this).parent().index() * $(this).parent().width(),
        });
      }
      Common.utils.scrollRefresh();
    });
  },

  /**
   * Common.utils.tableScroll - �뚯씠釉� �ㅽ겕濡ㅼ떆 釉붾윭 �쒖떆
   * @param {string} target - �ㅽ겕濡� �섎뒗 �뚯씠釉� class
   */
  tableScroll: function (target) {
    var $tableScroll = $(target);

    $tableScroll.on("scroll", function (e) {
      var _this = $(this);
      // �ㅽ겕濡� ��
      if (_this.scrollLeft() > 1) {
        _this.addClass("yw-scr-ctvx");
      } else {
        _this.removeClass("yw-scr-ctvx");
      }
    });
  },
  /**

	/**
	*Common.utils.accodion : accodion contents
	*@param{object} ".class"
	**/
  accodion: function (target) {
    var _self = this;
    var $list = $(target);
    $list.each(function (i, elm) {
      var type = $(elm).attr("data-type");
      $list.find("li").each(function (idx, item) {
        var $accoTit = $(item).find(".yw-ccx-tt"),
          $accoCont = $(item).find(".yw-ccx-cntx");
        $accoTit.on("click", function (e) {
          e.preventDefault();
          if (type == "single") {
            $(item).toggleClass("active");
            if ($(item).is(".active")) {
              $accoTit.attr("title", "�댁슜 �リ린");
              $accoCont.slideDown();
              $(item)
                .siblings()
                .removeClass("active")
                .children(".yw-ccx-cntx")
                .slideUp();
            } else {
              $accoTit.attr("title", "�댁슜 �닿린");
              $accoCont.slideUp();
            }
          } else if (type == "multi") {
            $(item).toggleClass("active");
            $(item).is(".active")
              ? $accoTit.attr("title", "�댁슜 �リ린")
              : $accoTit.attr("title", "�댁슜 �닿린");
            $accoCont.slideToggle();
          }
        });
      });
    });
  },

  /**
   * Global.utils.agreeAccordion - 媛쒖씤�뺣낫 �꾩퐫�붿뼵
   */
  agreeAccordion: function () {
    $(".yw-grx-ccrx")
      .find(".yw-chcx-wr > a")
      .on("click", function () {
        if ($(this).closest("li").hasClass("on")) {
          $(this).attr("title", "�댁슜 �닿린");
          $(this).closest("li").removeClass("on");
          $(this).closest("li").find(".yw-chcx-cntx").stop().slideUp();
        } else {
          $(".yw-grx-ccrx li").removeClass("on");
          $(".yw-grx-ccrx li").find(".yw-chcx-cntx").stop().slideUp();
          $(this).attr("title", "�댁슜 �リ린");
          $(this).closest("li").addClass("on");
          $(this).closest("li").find(".yw-chcx-cntx").stop().slideDown();
        }
      });
  },

  /**
   *Common.utils.popup : popup open/close
   *@param{object} ".class"
   **/
  popup: function () {
    var $popBtn = $(".pop_btn"),
      $popCloseBtn = $(".yw-pp-cls-bt");
    var $focusTarget, $targetPop;
    var popW = 0;
    function openPopup(target) {
      /* youtubePopup */
      if ($focusTarget.attr("data-videoId") !== undefined) {
        var videoId = $focusTarget.attr("data-videoId"),
          html = [],
          videoArea = "";
        html.push('<div class="video_area">');
        html.push(
          '	<iframe id="video" width="100%" height="100%" src="https://www.youtube.com/embed/' +
            videoId +
            '" title="" allowfullscreen=""></iframe>'
        );
        html.push("</div>");
        videoArea = html.join("\n");
        target.prepend(videoArea);
      }

      target.parent().addClass("on").attr("tabindex", 0).focus(); //�묎렐��
      if (popW !== 0) {
        //width fix 媛�
        target.css({ "margin-left": -popW / 2 }); //媛��대뜲 �뺣젹
      } else {
        //width 100%
        target.css({ height: target.width() * 0.562222 }); //媛��대뜲 �뺣젹
      }
    }
    function closePopup(target) {
      target.closest(".yw-pp-wr").removeClass("on").attr("tabindex", "");

      /* youtubePopup */
      if ($focusTarget.attr("data-videoId") !== undefined) {
        target.siblings(".yw-mv-ar").remove();
      }
    }
    //popup btn click
    $popBtn.on("click", function (e) {
      e.preventDefault();
      var data = $(this).data("popup");
      $targetPop = $('.yw-pp-wr[data-popup="' + data + '"]').find(
        ".yw-pp-in"
      );
      popW = $targetPop.outerWidth();
      $focusTarget = $(this);
      openPopup($targetPop);
    });
    //popup close btn click
    $popCloseBtn.on({
      click: function (e) {
        e.stopPropagation();
        closePopup($(this));
        $focusTarget.focus();
      },
      keydown: function (e) {
        var keyCode = e.keyCode || e.which;
        //shift + tab��
        if (e.shiftKey && keyCode == 9) {
          $(this).prev().focus();
        } else if (keyCode == 9) {
          e.preventDefault();
          $targetPop.focus();
        }
      },
    });
    //popup dim click �� close, �묎렐�� close
    $(".yw-pp-wr").on({
      click: function (e) {
        if (e.target.className === "yw-pp-wr on") {
          $popCloseBtn.trigger("click");
        }
      },
      keydown: function (e) {
        var keyCode = e.keyCode || e.which;
        //shift + tab��
        if (e.shiftKey && keyCode == 9) {
          if ($(e.target).hasClass("yw-pp-wr")) {
            e.preventDefault();
            $popCloseBtn.trigger("click");
          }
        }
      },
    });
  },
  customFile: function () {
    // file input delete
    var $file = $("#userFile"),
      $fileName = $("#fileName"),
      $fileBtn = $(".yw-flx-wr").find("label"),
      $fileDelete = $(".yw-flx-wr").find(".yw-bt-dltx");

    $file.on("change", function () {
      if (window.FileReader) {
        var filename = $(this)[0].files[0].name;
      } else {
        var filename = $(this).val().split("/").pop().split("\\").pop();
      }
      $fileName.val(filename);
      $fileBtn.hide();
      $fileDelete.show();
    });
    $fileDelete.on("click", function () {
      $file.val("");
      $fileName.val("");
      $fileBtn.show();
      $fileDelete.hide();
    });
  },
  multiSelect: function () {
    var category1 = ["category 1_1", "category 1_1", "category 1_1"];
    var category2 = ["category 2_1", "category 2_1", "category 2_1"];
    var category3 = ["category 3_1", "category 3_1", "category 3_1"];
    var $el = $("#categorySelect2");
    var isChk = false;

    $el.hide();

    // option �좏깮�� 寃쎌슦
    function resetSelect() {
      $el.hide();
      isChk = false;
    }

    $("#categorySelect1").change(function () {
      var _val = $(this).val();
      var selectedItem = [];

      // �쒕쾲留� �ㅽ뻾
      if (!isChk) {
        $el.show();
        isChk = true;
      }

      switch (_val) {
        case "category1":
          selectedItem = category1;
          break;

        case "category2":
          selectedItem = category2;
          break;

        case "category3":
          selectedItem = category3;
          break;

        default:
          resetSelect();
          break;
      }

      $el.find("option").remove();
      $el.append('<option value="">�좏깮</option>');

      for (v in selectedItem) {
        var opt = document.createElement("option");
        opt.value = selectedItem[v];
        opt.innerHTML = selectedItem[v];

        $el.append(opt);
      }
    });

    // MULTIPLE SELECT
    var selectedItem1 = []; // first select selected
    var selectedItem2 = []; // second select selected
    $(".second_box").hide();

    // second data
    var itemData = {
      item1: ["item 1_1", "item 1_2", "item 1_3"],
      item2: ["item 2_1", "item 2_2", "item 2_3"],
      item3: ["item 3_1", "item 3_2", "item 3_3"],
      item4: ["item 4_1", "item 4_2", "item 4_3"],
      item5: ["item 5_1", "item 5_2", "item 5_3"],
    };

    // second ���됲듃 珥덇린��
    function resetSecondSelect() {
      selectedItem2 = [];
      $(".second_box").hide();
      $("#itemSelect2").closest(".yw-nlnx").find("span").remove();
      $("#itemSelect2")
        .closest(".yw-nlnx")
        .find(".yw-tx2")
        .append("<span>selected</span>");
    }

    // changeSelected
    function changeSelected() {
      var len = $("#itemSelect1").children(":selected").length;
      if (len > 0) {
        $(".second_box").show();
        $("#itemSelect2").find("option").remove();

        // second
        var secondData = [];
        var secondSelectedArr = [];

        for (var i = 0; i < selectedItem1.length; i++) {
          var _key = selectedItem1[i];
          secondData.push(itemData[_key]);
        }

        for (var i = 0; i < secondData.length; i++) {
          for (var j = 0; j < secondData[i].length; j++) {
            var selectedVal = secondData[i][j];
            secondSelectedArr.push(selectedVal);
          }
        }

        // �좏깮�� �섏쐞 ���됲듃
        for (var i = 0; i < secondSelectedArr.length; i++) {
          var option = $(
            '<option value="' +
              secondSelectedArr[i] +
              '">' +
              secondSelectedArr[i] +
              "</option>"
          );
          $("#itemSelect2").append(option);
        }
      } else {
        // second ���됲듃 珥덇린��
        resetSecondSelect();
      }
    }

    // get select value
    function getSelectValues(el, select) {
      var _thisId = el[0].id;
      var $thisId = document.getElementById(_thisId);
      var result = [];
      var opt;

      for (var i = 0, Len = select.length; i < Len; i++) {
        opt = select[i];

        if (opt.selected) {
          result.push(opt.value || opt.text);
        }
      }

      // selected html
      function htmlSelected(result) {
        var title = result.join(", ");
        var _html = '<span title="' + title + '">' + title + "</span>";

        $($thisId).closest(".yw-nlnx").find("span").remove();
        $($thisId).closest(".yw-nlnx").find(".yw-tx2").append(_html);
      }

      if (_thisId === "itemSelect1") {
        htmlSelected(result);
        selectedItem1 = result;
      } else {
        htmlSelected(result);
        selectedItem2 = result;
      }
    }

    // itemSelect1 change
    $("#itemSelect1").change(function () {
      // second ���됲듃 珥덇린��
      resetSecondSelect();

      var target = $(this);
      getSelectValues(target, this);
      changeSelected(); // second ���됲듃 �앹꽦
    });

    // itemSelect2 change
    $("#itemSelect2").change(function () {
      var target = $(this);
      getSelectValues(target, this);
    });
  },
  strongPassword: function () {
    var changeText = function (el, text, color) {
      el.text(text).css("color", color);
    };

    var $passwrod1 = $(".password_1"),
      $passwrod2 = $(".password_2"),
      $passwrod3 = $(".password_3"),
      $passwrod4 = $(".password_4");
    var $input1 = $("#input1"),
      $input2 = $("#input2"),
      $input3 = $("#input3"),
      $input4 = $("#input4");

    $input1.keyup(function () {
      var len = this.value.length;
      var pbText = $passwrod1.find(".progress-bar-text");

      if (len === 0) {
        $passwrod1.find(".progress-bar-item").each(function () {
          $(this).removeClass("active");
        });
        $passwrod1.find(".active").css("background-color", "transparent");
        changeText(pbText, "鍮꾨�踰덊샇 �덉쟾��");
      } else if (len > 0 && len <= 4) {
        $passwrod1.find(".progress-bar-item-1").addClass("active");
        $passwrod1.find(".progress-bar-item-2").removeClass("active");
        $passwrod1.find(".progress-bar-item-3").removeClass("active");
        $passwrod1.find(".active").css("background-color", "#ff4b47");
        changeText(pbText, "��쓬");
      } else if (len > 4 && len <= 8) {
        $passwrod1.find(".progress-bar-item-2").addClass("active");
        $passwrod1.find(".progress-bar-item-3").removeClass("active");
        $passwrod1.find(".active").css("background-color", "#f9ae35");
        changeText(pbText, "�곸젙");
      } else {
        $passwrod1.find(".progress-bar-item").each(function () {
          $(this).addClass("active");
        });
        $passwrod1.find(".active").css("background-color", "#2daf7d");
        changeText(pbText, "�믪쓬");
      }
    });

    $input2.keyup(function () {
      var len = this.value.length;
      var pbText = $passwrod2.find(".progress-bar-text");

      if (len === 0) {
        $passwrod2.find(".progress-bar-item").each(function () {
          $(this).removeClass("active");
        });
        changeText(pbText, "鍮꾨�踰덊샇 �덉쟾��");
      } else if (len > 0 && len <= 4) {
        $passwrod2.find(".progress-bar-item-1").addClass("active");
        $passwrod2.find(".progress-bar-item-2").removeClass("active");
        $passwrod2.find(".progress-bar-item-3").removeClass("active");
        changeText(pbText, "��쓬");
      } else if (len > 4 && len <= 8) {
        $passwrod2.find(".progress-bar-item-2").addClass("active");
        $passwrod2.find(".progress-bar-item-3").removeClass("active");
        changeText(pbText, "�곸젙");
      } else {
        $passwrod2.find(".progress-bar-item").each(function () {
          $(this).addClass("active");
        });
        changeText(pbText, "�믪쓬");
      }
    });

    $input3.keyup(function () {
      var len = this.value.length;
      var pbText = $passwrod3.find(".progress-bar-text");

      if (len === 0) {
        $(this).css("border-bottom-color", "#2f96ef");
        changeText(pbText, "", "#aaa");
      } else if (len > 0 && len <= 4) {
        $(this).css("border-bottom-color", "#ff4b47");
        changeText(pbText, "��쓬", "#ff4b47");
      } else if (len > 4 && len <= 8) {
        $(this).css("border-bottom-color", "#f9ae35");
        changeText(pbText, "�곸젙", "#aaa");
      } else {
        $(this).css("border-bottom-color", "#2daf7d");
        changeText(pbText, "�믪쓬");
      }
    });

    $input4.keyup(function () {
      var len = this.value.length;
      var pbText = $passwrod4.find(".progress-bar-text");

      if (len === 0) {
        $(this).css("border-color", "#2f96ef");
        changeText(pbText, "", "#aaa");
      } else if (len > 0 && len <= 4) {
        $(this).css("border-color", "#ff4b47");
        changeText(pbText, "��쓬", "#ff4b47");
      } else if (len > 4 && len <= 8) {
        $(this).css("order-color", "#f9ae35");
        changeText(pbText, "�곸젙", "#f9ae35");
      } else {
        $(this).css("border-color", "#2daf7d");
        changeText(pbText, "�믪쓬", "#2daf7d");
      }
    });

    $(".input_password").on("keyup", function (e) {
      // if (e.keyCode === 13) {
      // 	e.preventDefault(); //enter
      // } else {
      if (this.value) {
        $(this).next(".password_key").css("display", "inline-block");
      } else {
        $(this).next(".password_key").hide();
      }
      //}
    });

    $(".password_key").on("click", function () {
      var _input = $(this).prev("input");

      if ($(_input).attr("type") == "password") {
        $(_input).attr("type", "text");
        $(this).text("HIDE");
      } else {
        $(_input).attr("type", "password");
        $(this).text("SHOW");
      }
    });
  },
  customSelect: function (selectCont, parentWrap) {
    var $select = $(".yw-cstx-slcx-ar");

    $select.each(function (idx, el) {
      var $this = $(el);
      var $parent = $(this).closest(".yw-cstx-slcx-ar");

      $this.find(".yw-crrx").on("click", function () {
        if ($parent.hasClass("on")) {
          $parent.removeClass("on");
        } else {
          $select.removeClass("on");
          $parent.addClass("on");
        }
      });

      $this
        .find("ul")
        .find("a")
        .on("click", function (e) {
          e.preventDefault();

          var currentText = $(this).text();
          var idx = $(this).parent().index();
          $parent.find(".yw-crrx").text(currentText);
          $(this).parent().addClass("active").siblings().removeClass("active");
          $this.removeClass("on");
          if (selectCont) {
            if (parentWrap) {
              $(this)
                .closest(parentWrap)
                .find(selectCont)
                .find(".select")
                .removeClass("active")
                .eq(idx)
                .addClass("active");
            } else {
              $(selectCont)
                .find(".select")
                .removeClass("active")
                .eq(idx)
                .addClass("active");
            }
          }
          $parent
            .find("select")
            .find("option:eq(" + idx + ")")
            .prop("selected", true);
          var val = $(this).attr("data-value");
          $parent.find("select").val(val).trigger("change");
        });

      $select.find("ul").mouseenter(function () {
        smoother && smoother.paused(true);
      });

      $select.find("ul").mouseleave(function () {
        smoother && smoother.paused(false);
      });
    });

    // customSelect �곸뿭 �� click��
    $("body").on("click", function (e) {
      if ($(e.target).closest(".yw-cstx-slcx-ar").length < 1) {
        $select.removeClass("on");
      }
    });
  },
  emailSelect: function () {
    // Email select
    $emailBoxWrap = $(".yw-mlx-bx");

    $emailBoxWrap.each(function (idx, item) {
      var $selectEmail = $(item).find("#selectEmail"),
        $email_2 = $(item).find("#email02");

      $selectEmail.on("change", function () {
        var $emailVal = $email_2.val($selectEmail.prop("selected", true).val());
        if ($selectEmail.prop("selected", true).val() == "") {
          $email_2.removeAttr("readonly");
          $email_2.focus();
        } else {
          $email_2.prop("readonly", "readonly");
          $("[name=email02]")
            .closest(".yw-ip-ar-wr")
            .find(".yw-vldx-tx")
            .remove();
        }
      });
    });
  },
  subVisual: function () {
    // ��, 紐⑤컮�� 遺꾧린 蹂� gsap
    var mediaQuery = window.matchMedia("(min-width: 1024px)");
    var target01 = $(".yw-crtx-wr > *"),
      tl;
    function breakPoint(mediaQuery) {
      if (mediaQuery.matches) {
        var tl = gsap.timeline({
          scrollTrigger: {
            id: "subVisual",
            trigger: ".yw-sb-kv",
            start: "5% top",
            end: "40% top",
            scrub: 1,
            // markers: true,
            invalidateOnRefresh: true,
          },
        });
        tl.to(target01, { width: 0, duration: 1, ease: "sine.in" });
      } else {
        setTimeout(function () {
          gsap.set([target01], { clearProps: "all" });
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.vars.id == "subVisual") {
              st.kill();
            }
          });
        }, 100);
      }
    }
    breakPoint(mediaQuery);
    mediaQuery.addEventListener("change", breakPoint);
  },
  /**
   * Common.utils.quickLink() - quick 留곹겕
   */
  quickLink: function () {
    var pcEvent, mEvent;
    var innerCon = $("#yw-i-smtx-ct"),
      item = $("#yw-i-tp-bt");

    function toggleItem(pinned) {
      if (!pinned) {
        gsap.set(item, { clearProps: true });
        $("#yw-i-wr").append($(item));
      } else {
        innerCon.append(item);
      }
    }
    $(window).on("load resize", function () {
      // ��
      if (windowWidth > 1023) {
        clearTimeout(pcEvent);
        pcEvent = setTimeout(function () {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.vars.id == "mQuick") {
              st.kill();
            }
          });
		  $footer = $('footer');
			$topBtn = $('#yw-i-tp-bt');
          var footerH = $footer.innerHeight(),
            $banner = $(".yw-bnnx-ar"),
            bannerH = $banner.innerHeight();
			
          if ($banner.length > 0) {
            // 諛곕꼫媛� 議댁옱�섎뒗 寃쎌슦
            var topBtnScroll = gsap.timeline({
              scrollTrigger: {
                id: "webQuick",
                pinnedContainer: "#yw-i-smtx-wr",
                trigger: $banner,
                // toggleClass: "fixed",
                // markers: true,
                onToggle: (self) => toggleItem(self.isActive),
                onEnter: function () {},
                onLeaveBack: function () {
                  $topBtn.css({
                    position: "",
                    bottom: "",
                  });
                },
              },
            });
          } else {
            // 諛곕꼫媛� 議댁옱�섏� �딅뒗 寃쎌슦
            var topBtnScroll = gsap.timeline({
              scrollTrigger: {
                id: "webQuick",
                pinnedContainer: "#yw-i-smtx-wr",
                trigger: $footer,
                // toggleClass: "fixed",
                // markers: true,
                onToggle: (self) => toggleItem(self.isActive),
                onEnter: function () {
                  $topBtn.css({
                    position: "absolute",
                    bottom: footerH + 64 + "px",
                  });
                },
                onLeaveBack: function () {
                  $topBtn.css({
                    position: "",
                    bottom: "",
                  });
                },
              },
            });
          }
        }, 100);
        // 紐⑤컮��
      } else {
        clearTimeout(mEvent);
        mEvent = setTimeout(function () {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.vars.id == "webQuick") {
              st.kill();
            }
          });
		  $footer = $('footer');
			$topBtn = $('#yw-i-tp-bt');
          var footerH = $footer.innerHeight(),
            $banner = $(".yw-bnnx-ar"),
            bannerH = $banner.innerHeight();
          if ($banner.length > 0) {
            // 諛곕꼫媛� 議댁옱�섎뒗 寃쎌슦
            var topBtnScroll = gsap.timeline({
              scrollTrigger: {
                id: "mQuick",
                pinnedContainer: "#yw-i-smtx-wr",
                trigger: $banner,
                // toggleClass: "fixed",
                // markers: true,
                onToggle: (self) => toggleItem(self.isActive),
                onEnter: function () {
                  $topBtn.css({
                    position: "absolute",
                    bottom: footerH + bannerH + 32 + "px",
                  });
                },
                onLeaveBack: function () {
                  $topBtn.css({
                    position: "",
                    bottom: "",
                  });
                },
              },
            });
          } else {
            // 諛곕꼫媛� 議댁옱�섏� �딅뒗 寃쎌슦
            var topBtnScroll = gsap.timeline({
              scrollTrigger: {
                id: "mQuick",
                pinnedContainer: "#yw-i-smtx-wr",
                trigger: $footer,
                // toggleClass: "fixed",
                // markers: true,
                onToggle: (self) => toggleItem(self.isActive),
                onEnter: function () {
                  $topBtn.css({
                    position: "absolute",
                    bottom: footerH + 32 + "px",
                  });
                },
                onLeaveBack: function () {
                  $topBtn.css({
                    position: "",
                    bottom: "",
                  });
                },
              },
            });
          }
        }, 100);
      }
    });
  },
  /**
   * Common.utils.getCookie - 荑좉린媛� 媛��몄삤湲�
   */
  getCookie: function (cookie_name) {
    var isCookie = false;
    var start, end;
    var i = 0;

    // cookie 臾몄옄�� �꾩껜瑜� 寃���
    while (i <= document.cookie.length) {
      start = i;
      end = start + cookie_name.length;
      // cookie_name怨� �숈씪�� 臾몄옄媛� �덈떎硫�
      if (document.cookie.substring(start, end) == cookie_name) {
        isCookie = true;
        break;
      }
      i++;
    }

    // cookie_name 臾몄옄�댁쓣 cookie�먯꽌 李얠븯�ㅻ㈃
    if (isCookie) {
      start = end + 1;
      end = document.cookie.indexOf(";", start);
      // 留덉�留� 遺�遺꾩씠�쇰뒗 寃껋쓣 �섎�(留덉�留됱뿉�� ";"媛� �녿떎)
      if (end < start) end = document.cookie.length;
      // cookie_name�� �대떦�섎뒗 value媛믪쓣 異붿텧�섏뿬 由ы꽩�쒕떎.
      return document.cookie.substring(start, end);
    }
    // 李얠� 紐삵뻽�ㅻ㈃
    return "";
  },
  /**
   * Common.utils.setCookie - 荑좉린媛� �ㅼ젙�섍린
   */
  setCookie: function (name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie =
      name +
      "=" +
      escape(value) +
      "; path=/; expires=" +
      todayDate.toGMTString() +
      ";";
  },
  /**
   * Common.utils.enterkey - �ъ빱�ㅼ옟湲� // �앹뾽�� 寃쎌슦 �앹뾽�댁뿉留� �ъ빱�� 媛��ν븯寃�
   */
  enterkey: function ($el) {
    $($el).attr("tabindex", 0).focus();

    $($el).on({
      keydown: function (e) {
        var focusList = $($el).find("input, a");
        var firstFocus = focusList.eq(0);
        var lastFocus = focusList.eq(focusList.length - 1);

        firstFocus.on({
          keydown: function (e) {
            if (e.shiftKey && e.keyCode == 9) {
              e.preventDefault();
              $(lastFocus).focus();
            }
          },
        });

        lastFocus.on({
          keydown: function (e) {
            if (!e.shiftKey && e.keyCode == 9) {
              e.preventDefault();
              $(firstFocus).focus();
            }
          },
        });
      },
    });
  },
  /**
   * Common.utils.emailPopup() - �대찓�쇳뙘��
   */
  emailPopup: function () {
    var $el = $(".yw-mlx-pp"),
      $closeBtn = $el.find(".yw-pp-cls-bt"),
      $openBtn = $(".email_popup_open");

    $openBtn.on("click", function () {
      Common.utils.enterkey(".yw-mlx-pp");
      smoother && smoother.paused(true);
      $el.show();
    });
    $closeBtn.on("click", function () {
      smoother && smoother.paused(false);
      $el.hide();
      $el.attr("tabindex", "");
    });
  },
  /**
   * Common.utils.scrollRefresh() - �ㅽ겕濡� �몃━嫄� 由ы봽�섏돩
   * 而⑦뀗痢� �댁슜�� 鍮꾨룞湲곕줈 �낅뜲�댄듃 �섏뼱�� �믪씠媛� 留욎� �딆쓣�� �ъ슜
   */
  scrollRefresh: function () {
    ScrollTrigger.refresh();
  },
  loading: function () {
    $(document).ready(function () {
      var loadingBar = $("#loading-bar");
      var startTime = performance.now();
      if (startTime > 1000) {
        $(".yw-ldnx").fadeIn(200);
      }
    });
    $(window).on("load", function () {
      setTimeout(function () {
        $(".yw-ldnx").fadeOut(200);
      }, 1000);
    });
  },
  /**
   * Common.utils.validation() - �좏슚�� 寃��� 怨듯넻
   */
  validation: function () {
    $(document).on("input", ".numonly[type=text]", function () {
      $(this).val(
        $(this)
          .val()
          .replace(/[^0-9]/g, "")
      );
    });
  },
  init: function () {
    if (!$(".yw-bd-vwx-ltsx").length) Common.utils.smoothScroll();
    Common.utils.header();
    Common.utils.quickLink();
    Common.utils.emailPopup();
    Common.utils.scrollMotion(true);
    // header 紐⑥뀡
    $body.removeClass("yw-isx-rdyx");
    Common.utils.customFile();
    Common.utils.emailSelect();
    Common.utils.loading();
    Common.utils.validation();
  },
};

$window.on("resize", function () {
  windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
});
Common.utils.init();

//top-visual
var topVisualAnimation = function () {
  var el,
    title,
    subScribe,
    etcBg,
    boo = true;

  function init(_el) {
    el = $(_el);
    title = el.find(".page-tit1");
    subScribe = el.find(".ico-subscribe");
    etcBg = el.find(".visual-area");

    setTween();
    setEvents();

    return this;
  }

  function setTween() {
    if (title != undefined) {
      setTimeout(function () {
        TweenMax.fromTo(
          title,
          1.25,
          { opacity: 0, top: "65%" },
          {
            opacity: 1,
            top: "50%",
            ease: Power2.easeOut,
          }
        );
      }, 0);
    }
    TweenMax.fromTo(
      el,
      2.25,
      { backgroundSize: "120% 120%" },
      {
        backgroundSize: "100% 100%",
        ease: Power2.easeOut,
      }
    );
    try {
      TweenMax.fromTo(
        etcBg,
        2.25,
        { backgroundSize: "120% 120%" },
        {
          backgroundSize: "100% 100%",
          ease: Power2.easeOut,
        }
      );
    } catch (e) {
      // console.log(e);
    }
  }

  function setEvents() {
    subScribe.on("click", function (e) {
      // e.preventDefault();

      if (boo) {
        $(this).addClass("on");
        boo = false;
      } else if (!boo) {
        $(this).removeClass("on");
        boo = true;
      }
    });
  }

  return { init: init };
};

var Main = Main || {};
Main.utils = {
    /**
	 * Main.utils.mainVisual : 硫붿씤 鍮꾩＜�� script
	 **/
	mainVisual: function() {
        $(window).on("load", function(){
            // 鍮꾩＜��
            var $secVisual = $(".yw-sec-kv"),
                $video = $secVisual.find("video"),
                $dim = $secVisual.find(".yw-dmx"),
                $txt = $secVisual.find(".yw-tx-ar2"),
                $progressBar = $secVisual.find(".yw-brx"),
                $controllerBtn = $secVisual.find(".yw-cntx-bt").find("a"),
                videoTime = parseInt(($video.get(0) || {duration:1}).duration) + 0.84;

            // �곸긽 吏꾪뻾 諛�
            progressTimeline = gsap.timeline({paused: true})
            .to($progressBar,{
                width:"100%",
                duration:videoTime,
                ease: "none",
            });

            // �ъ깮 �뺤� 踰꾪듉
            $controllerBtn.on("click", function(){
                if($(this).attr('data-play') == 'pause'){
                    controllor('play');
                } else{
                    controllor('pause');
                }
            });

            // �ъ깮 �뺤� �⑥닔
            function controllor(toggle){
                if (toggle == 'play'){
                    $controllerBtn.removeClass('yw-plyx').addClass('yw-psx');
                    $controllerBtn.attr('data-play', 'play');
                    progressTimeline.play();
                    $video.trigger('play');
                    
                } else if(toggle == 'pause'){
                    $controllerBtn.removeClass('yw-psx').addClass('yw-plyx');
                    $controllerBtn.attr('data-play', 'pause');
	      console.log('pause', progressTimeline);
                    progressTimeline.pause();
                    $video.trigger('pause');
                }
            }

            // �곸긽 醫낅즺 �쒖젏 �ㅼ떆 �ъ깮
            $video.on('ended', function(){
                controllor('play');
                progressTimeline.restart();
            });

            // 濡쒕뱶 �� 紐⑥뀡 諛� �대깽�� �ㅽ뻾
            gsap.to($dim, {
                autoAlpha: 0, 
                delay: 0.4,
            })
            setTimeout(function(){
                $txt.addClass("active");
                
            },450);

            var scrollVideoTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: $secVisual,
                    // markers: true,
                    // scrub: 0.002,
                    invalidateOnRefresh: true,
                    onEnterBack: function(){
                        controllor('play');
                    },
                    onLeave: function(){
                        controllor('pause');
                    },
                }
            })
        });
    },
    /**
	 * Main.utils.sec01 : 硫붿씤 sec01 �щ씪�대뱶
	 **/
    sec01: function(){
        var mediaQuery = window.matchMedia("(min-width: 1024px)");
        var mobileSlider;
        var $secWrap = $(".yw-sec01");
        var $slider = $secWrap.find(".swiper-container");
		function breakPoint(mediaQuery) {
			if(mediaQuery.matches) {
                if(mobileSlider){
                    mobileSlider.destroy();
                }
			} else{
                if(!($slider.hasClass("swiper-container-initialized"))){
                    mobileSlider = new Swiper($slider, {
                        duration:2000,
                        centeredSlides: true,
                        autoHeight : true,
                        observer: true,
                        observeParents: true,
                        spaceBetween: 16,
                        navigation : {
                            nextEl: $secWrap.find('.swiper-button-next'),
                            prevEl: $secWrap.find('.swiper-button-prev'),
                        },
                        pagination: {
                            el: $secWrap.find(".swiper-pagination"),
                            type: "progressbar",
                        },
                        breakpoints: {
                            767: {
                                spaceBetween:8,
                            }
                        },
                    });
                }
			}
		}
		breakPoint(mediaQuery);
		mediaQuery.addEventListener('change',breakPoint);
    },
    
    /**
	 * Main.utils.sec03 : 硫붿씤 sec03 �섎윺�됱뒪
	 **/
    sec03: function(){
        var $secWrap = $(".yw-sec03");
        var parallax = gsap.timeline({
            scrollTrigger: {
                trigger: $secWrap,
                start: 'top bottom',
                end: 'bottom top',
                // markers: true,
                scrub: 0.002,
                invalidateOnRefresh: true,
            }
        })
        .fromTo($secWrap.find(".yw-bk"),{
            y:"-30%",
        },
        {
            y:"30%",
        })
    },
    /**
	 * Main.utils.subvideo : 硫붿씤 subvideo 移댁슫�� 紐⑥뀡
	 **/
    subvideo: function(){
        var $countWrap = $(".yw-cntx3").find(".yw-dgtx");
        var $boxWrap = $(".yw-bx-wr");
        var count = [0,1,2,3,4,5,6,7,8,9];
        var duration = 1.5;

        $countWrap.each(function(idx, target){
            // data-current = 蹂댁뿬以� �レ옄
            // data-direction = 猷곕젢 諛⑺뼢
            // data-repeat = 猷곕젢 諛섎났 �잛닔
            var currentCount = $(target).data("current"),
                repeat = $(target).data("repeat"),
                direction = $(target).data("direction");

            // 諛⑺뼢 down
            // �꾩뿉�� �꾨옒濡�
            if(direction == 'down'){
                // 猷곕젢 html �앹꽦
                html = '<ul>';
                for(var e=0; e<repeat+1; e++){
                    for(var i=count.length-1; i > -1; i--){
                        html += '<li data-count="'+i+'">'+count[i]+'</li>';
                    }
                    $(this).html(html);
                }
                html += '</ul>';

                // 猷곕젢 諛⑺뼢 �대룞
                var $transformWrap = $(this).find("ul"),
                    listLength = $(this).find("li").length;

                // 0 �먯꽌 current�� �대떦�섎뒗 �レ옄 湲몄씠留뚰겮 �대룞
                function downMove(){
                    var listHeight = $countWrap.height();
                    countTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: $('.yw-sbvx'),
                            start: 'top 25%',
                            // markers: true,
                            // onEnter, onLeave, onEnterBack, onLeaveBack
                            // "play", "pause", "resume", "reset", "restart", "complete", "reverse", "none"
                            toggleActions: 'restart none none none',
                            invalidateOnResize: true,
                            onEnter:function(){
                                videoPlay("play");
                                $boxWrap.addClass("active");
                            },
                            onLeaveBack:function(){
                                videoPlay("pause")
                                $boxWrap.removeClass("active");
                            },
                        },
                    }).fromTo($transformWrap,{
                        y:-( (listLength-1) * listHeight ),
                    },
                    {
                        // current�� �대떦�섎뒗 �붿냼源뚯� �믪씠 援ы븯湲�
                        y:-( ( (listLength-1) - (repeat*count.length) - currentCount ) * listHeight ),
                        duration:duration,
                    })
                }
                
                // 諛섏쓳�뺤쑝濡� listHeight 媛믪씠 諛붾�뚮�濡� �⑥닔濡� 留뚮뱾�� �ъ떎�� �꾩슂
                ScrollTrigger.matchMedia({
                    '(min-width: 1540px)':function(){
                        downMove();
                    },
                    '(min-width: 1200px) and (max-width: 1539px)':function(){
                        downMove();
                    },
                    '(min-width: 1024px) and (max-width: 1199px)':function(){
                        downMove();
                    },
                    '(min-width: 768px) and (max-width: 1023px)':function(){
                        downMove();
                    },
                    '(max-width: 767px)':function(){
                        downMove();
                    }
                })
            // 諛⑺뼢 up
            // �꾨옒�먯꽌 �꾨줈
            } else if(direction == 'up'){
                // 猷곕젢 html �앹꽦
                html = '<ul>';
                for(var e=0; e<repeat+1; e++){
                    for(var i=0; i<count.length; i++){
                        html += '<li data-count="'+i+'">'+count[i]+'</li>';
                    }
                    $(this).html(html)
                }
                html += '</ul>'
                
                // 猷곕젢 諛⑺뼢 �대룞
                var $transformWrap = $(this).find("ul"),
                    listLength = $(this).find("li").length;

                // 0 �먯꽌 current�� �대떦�섎뒗 �レ옄 湲몄씠留뚰겮 �대룞
                // 猷곕젢 諛⑺뼢 �대룞
                var $transformWrap = $(this).find("ul"),
                    listLength = $(this).find("li").length;

                // 0 �먯꽌 current�� �대떦�섎뒗 �レ옄 湲몄씠留뚰겮 �대룞
                function upMove(){
                    var listHeight = $countWrap.height();
                    countTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: $('.yw-sbvx'),
                            start: 'top 25%',
                            // markers: true,
                            // onEnter, onLeave, onEnterBack, onLeaveBack
                            // "play", "pause", "resume", "reset", "restart", "complete", "reverse", "none"
                            toggleActions: 'restart none none none',
                            invalidateOnResize: true,
                            onEnter:function(){
                                videoPlay("play");
                                $boxWrap.addClass("active");
                            },
                            onLeaveBack:function(){
                                videoPlay("pause")
                                $boxWrap.removeClass("active");
                            },
                        },
                    }).fromTo($transformWrap,{
                        y:0,
                    },
                    {
                        y:-( (listLength - (count.length) + currentCount ) * listHeight ),
                        duration:duration,
                    })
                }

                // 諛섏쓳�뺤쑝濡� listHeight 媛믪씠 諛붾�뚮�濡� �⑥닔濡� 留뚮뱾�� �ъ떎�� �꾩슂
                ScrollTrigger.matchMedia({
                    '(min-width: 1540px)':function(){
                        upMove();
                    },
                    '(min-width: 1200px) and (max-width: 1539px)':function(){
                        upMove();
                    },
                    '(min-width: 1024px) and (max-width: 1199px)':function(){
                        upMove();
                    },
                    '(min-width: 768px) and (max-width: 1023px)':function(){
                        upMove();
                    },
                    '(max-width: 767px)':function(){
                        upMove();
                    }
                })
            }
        });
        
        function videoPlay(toggle){
            var $video = $(".yw-sbvx").find("video");
            if (toggle == 'play'){
                $video.trigger('play');
                
            } else if(toggle == 'pause'){
                $video.trigger('pause');
            }
        }
    },
    /**
	 * Main.utils.sec05 : 硫붿씤 sec05 �щ씪�대뱶
	 **/
    sec05: function(){
        sec05Slider = new Swiper($(".yw-sec05").find(".swiper-container"), {
            duration:2000,
            slidesPerView:'auto',
            autoHeight : true,
            observer: true,
            observeParents: true,
            spaceBetween:56,
            navigation : {
                nextEl: $(".yw-sec05").find(".yw-bt-bt").find('.swiper-button-next'),
                prevEl: $(".yw-sec05").find(".yw-bt-bt").find('.swiper-button-prev'),
            },
            pagination: {
                el: $(".yw-sec05").find(".yw-bt-bt").find(".swiper-pagination"),
                type: "progressbar",
            },
            breakpoints: {
                1024: {
                    spaceBetween:8,
                }
            },
        });
    },
    /**
	 * Main.utils.mainTopBanner() - 硫붿씤�곷떒諛곕꼫
	 */
    mainTopBanner: function(){
        var $topBanner = $(".yw-hm-tp-bnnx"),
            topBanneris = $topBanner.find(".yw-flxx").find("> a").length;
              
        if(topBanneris){
            if (Common.utils.getCookie("mainTopBannerCheck") !== "no") {
                $("#yw-i-wr").addClass("yw-tp-bnnx-onx");
                $topBanner.show();
            } else{
                $topBanner.remove();
            }
        } else{
            $topBanner.remove();
        }

        $topBanner.find("a.yw-cls").on("click", function(){
            // setCookie
			if ($(this).closest(".right").find("input[name='todayClose']").prop("checked")) {
				Common.utils.setCookie("mainTopBannerCheck", "no", 1); // �섎（ 荑좏궎 �곸슜(留덉�留� �몄옄媛믪씠 �좎옄��)
			}
            $topBanner.remove();
            $("#yw-i-wr").removeClass("yw-tp-bnnx-onx");
            Common.utils.scrollRefresh();
        });
    },
    /**
	 * Main.utils.mainPopup() - 硫붿씤�앹뾽
     * @param {string} el - �대떦 �앹뾽 �섎━癒쇳듃
	 */
    mainPopup: function(el){
        var $el = $(el),
			$popupMultiple = $el.find(".yw-pp-mltx"),
			$swiperContainer = $popupMultiple.find(".swiper-container"),
			$btnMultipleClose = $popupMultiple.find(".yw-btmx-cntx-cls"),
			popupMultipleLen = $popupMultiple.find(".swiper-slide").length,
			popupSwiper3;

		function initSwiper() {
			// 1媛� �댁긽�� 寃쎌슦 �ㅽ뻾
			if (popupMultipleLen > 1) {
				popupSwiper3 = new Swiper($swiperContainer, {
					slidesPerView: 'auto',
					observer: true,
					observeParents: true,
					pagination: {
						el: $popupMultiple.find(".swiper-pagination"),
						clickable: true,
					},
					// breakpoints: {
                    //     1400: {
					// 		slidesPerView: 2,
					// 	},
					// 	767: {
					// 		slidesPerView: 1,
					// 	},
					// },
				});
			} else {
				$popupMultiple.find(".swiper-pagination").hide();
			}
		}
		initSwiper();

		function popupMultipleOpen(el) {
            smoother && smoother.paused(true);
            $popupMultiple.delay(600).fadeIn(500);
		}
		function popupMultipleClose() {
            smoother && smoother.paused(false);
            $el.remove();

			// slide �リ린 �� 泥ル쾲吏� �щ씪�대뱶濡� �대룞
			setTimeout(function () {
				popupSwiper3.slideTo(0, 100);
			}, 400);
		}

        if(popupMultipleLen > 0){
            if (Common.utils.getCookie("mainPopupCheck") !== "no") {
                popupMultipleOpen(".yw-pp-mltx");
                Common.utils.enterkey(".yw-pp-mltx");
            } else{
                $el.remove();
            }
        } else{ 
            $el.remove();
        }
        // $focusTarget = $(this);

		$btnMultipleClose.on("click", function () {
			var popupId = $(this).closest(".yw-pp-mltx").attr("id");
			var $this = $("#" + popupId);

			// setCookie
			if ($this.find("input[name='todayClose']").prop("checked")) {
				Common.utils.setCookie(popupId + "Check", "no", 1); // �섎（ 荑좏궎 �곸슜(留덉�留� �몄옄媛믪씠 �좎옄��)
			}

			popupMultipleClose();
			$popupMultiple.attr("tabindex", "");
			// $focusTarget.focus();
		});

		$popupMultiple.on('click', function (e) {
			if ($(e.target).is('.yw-pp-mltx') || $(e.target).is('.yw-btmx-cntx-cls')) {
				popupMultipleClose();
				$popupMultiple.attr("tabindex", "");
				// $focusTarget.focus();
			}
		});
    },
    init: function(){
        Main.utils.mainVisual();
        Main.utils.sec01();
        Main.utils.sec03();
        Main.utils.subvideo();
        Main.utils.sec05();
        Main.utils.mainTopBanner();
        Main.utils.mainPopup(".yw-hm-pp");
		Common.utils.scrollMotion(true);
    },
}
Main.utils.init();

(function(){
  function toast(message){
    var node=document.createElement('div'); node.className='yw-own-toast'; node.textContent=message;
    document.body.appendChild(node); setTimeout(function(){node.remove()},2400);
  }
  function closeLayer(button){
    var card=button.closest('.yw-hdx-ppsx, .yw-hm-pp, [id^="yw-i-hdx-ppsx-6"]');
    if(card) card.style.display='none';
    var left=[].filter.call(document.querySelectorAll('.yw-hdx-ppsx, .yw-hm-pp, [id^="yw-i-hdx-ppsx-6"]'),function(x){return getComputedStyle(x).display!=='none'});
    if(!left.length){var back=document.getElementById('yw-i-hdx-pp');if(back)back.style.display='none';document.documentElement.style.overflow='';document.body.style.overflow='';}
  }
  document.addEventListener('click',function(event){
    var close=event.target.closest('.yw-hdx-ppsx-cls, .yw-hdx-ppsx-rjcx, .yw-btmx-cntx-cls');
    if(close){event.preventDefault();closeLayer(close);if(close.classList.contains('yw-hdx-ppsx-rjcx'))localStorage.setItem('yw-popup-day',new Date().toDateString());return;}
    var empty=event.target.closest('a[href="#"]'); if(empty){event.preventDefault();}
  });
  document.querySelectorAll('form').forEach(function(form){
    form.addEventListener('submit',function(event){
      event.preventDefault();
      var first=[].find.call(form.querySelectorAll('[required]'),function(field){return field.type==='checkbox'?!field.checked:!String(field.value||'').trim()});
      if(first){first.focus();toast('필수 항목을 확인해 주세요.');return;}
      toast('문의 내용을 확인했습니다.');
    });
  });
  try{
    if(localStorage.getItem('yw-popup-day')===new Date().toDateString()){
      document.querySelectorAll('.yw-hdx-ppsx, .yw-hm-pp, [id^="yw-i-hdx-ppsx-6"], #yw-i-hdx-pp').forEach(function(node){node.style.display='none'});
    }
  }catch(error){}
  if(window.jQuery && window.jQuery.fn && window.jQuery.fn.bxSlider){
    var slider=window.jQuery('.yw-dvcx-pcx .yw-hm-bnnx .yw-sl');
    if(slider.length && !slider.parent().hasClass('bx-viewport')){
      slider.bxSlider({auto:false,controls:true,touchEnabled:navigator.maxTouchPoints>0,prevText:'',nextText:'',pager:false});
      document.querySelectorAll('.bx-prev').forEach(function(node){node.setAttribute('aria-label','이전 슬라이드')});
      document.querySelectorAll('.bx-next').forEach(function(node){node.setAttribute('aria-label','다음 슬라이드')});
    }
  }
  if(window.Swiper){
    var mobile=document.querySelector('.yw-hm-sec-swpx');
    if(mobile && !mobile.swiper) new Swiper(mobile,{loop:true,slidesPerView:'auto',navigation:{nextEl:'.yw-hm-sec-swpx .swiper-button-next',prevEl:'.yw-hm-sec-swpx .swiper-button-prev'},pagination:{el:'.yw-hm-sec-swpx .swiper-pagination',clickable:true}});
    var taxTv=document.querySelector('.yw-myx-swpx');
    if(taxTv && !taxTv.swiper) new Swiper(taxTv,{slidesPerView:'auto',spaceBetween:16,loop:true,navigation:{nextEl:'.swiper_wrap .yw-dvcx-mo .swiper-button-next',prevEl:'.swiper_wrap .yw-dvcx-mo .swiper-button-prev'},breakpoints:{1260:{slidesPerView:3,spaceBetween:0,navigation:{nextEl:'.yw-myx-swpx .yw-dvcx-pcx .swiper-button-next',prevEl:'.yw-myx-swpx .yw-dvcx-pcx .swiper-button-prev'}}}});
  }
  function syncHeaderAndTop(){
    var header=document.querySelector('header');
    var compact=window.innerWidth<=1260 ? window.scrollY>0 : window.scrollY>=300;
    if(header) header.classList.toggle('yw-whtx',compact);
    var top=document.getElementById('yw-i-tp-bt2');
    if(top) top.classList.toggle('yw-own-visible',window.scrollY>0);
  }
  window.addEventListener('scroll',syncHeaderAndTop,{passive:true});
  window.addEventListener('resize',syncHeaderAndTop);
  syncHeaderAndTop();
  var top=document.getElementById('yw-i-tp-bt2');
  if(top) top.addEventListener('click',function(event){event.preventDefault();window.scrollTo({top:0,behavior:'smooth'})});
  if(window.AOS) AOS.init();
})();
