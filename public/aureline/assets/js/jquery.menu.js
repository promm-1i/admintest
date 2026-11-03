$(function(){
    var hide_menu = false;
    var mouse_event = false;
    var oldX = oldY = 0;

    $(document).on('mousemove', function(e) {
        if(oldX == 0) {
            oldX = e.pageX;
            oldY = e.pageY;
        }

        if(oldX != e.pageX || oldY != e.pageY) {
            mouse_event = true;
        }
    });

    var $gnb = $(".gnb_1dli > a");
    $gnb.on('mouseenter', function() {
        if(mouse_event) {
            $("#hd").addClass("hd_zindex");
            $(".gnb_1dli").removeClass("gnb_1dli_over gnb_1dli_over2 gnb_1dli_on");
            $(this).parent().addClass("gnb_1dli_over gnb_1dli_on");
            menu_rearrange($(this).parent());
            hide_menu = false;
        }
    });

    $gnb.on('mouseleave', function() {
        hide_menu = true;
    });

    $(".gnb_2dli").on('mouseenter', function() {
        hide_menu = false;
    });

    $(".gnb_2dli").on('mouseleave', function() {
        hide_menu = true;
    });

    $gnb.on('focusin', function() {
        $("#hd").addClass("hd_zindex");
        $(".gnb_1dli").removeClass("gnb_1dli_over gnb_1dli_over2 gnb_1dli_on");
        $(this).parent().addClass("gnb_1dli_over gnb_1dli_on");
        menu_rearrange($(this).parent());
        hide_menu = false;
    });

    $gnb.on('focusout', function() {
        hide_menu = true;
    });

    $(".gnb_2da").on('focusin', function() {
        $(".gnb_1dli").removeClass("gnb_1dli_over gnb_1dli_over2 gnb_1dli_on");
        var $target = $(this).closest(".gnb_1dli");
        if($target.length) {
            $target.addClass("gnb_1dli_over gnb_1dli_on");
            menu_rearrange($target);
        }
        hide_menu = false;
    });

    $(".gnb_2da").on('focusout', function() {
        hide_menu = true;
    });

    $('#gnb_1dul > li').on('mouseleave', function(){
        submenu_hide();
    });

    $(document).on('click focusin', function(){
        if(hide_menu) {
            submenu_hide();
        }
    });
});

function submenu_hide() {
    $("#hd").removeClass("hd_zindex");
    $(".gnb_1dli").removeClass("gnb_1dli_over gnb_1dli_over2 gnb_1dli_on");
}

function menu_rearrange(el) {
    if(!el || !el.length) return;
    var width = $("#gnb_1dul").width();
    var left = w1 = w2 = 0;
    var idx = $(".gnb_1dli").index(el);
    var max_menu_count = 0;
    var $gnb_1dli;

    for(i=0; i<=idx; i++) {
        $gnb_1dli = $(".gnb_1dli").eq(i);
        w1 = $gnb_1dli.outerWidth();

        if($gnb_1dli.find(".gnb_2dul").length)
            w2 = $gnb_1dli.find(".gnb_2dli > a").outerWidth(true);
        else
            w2 = w1;

        if((left + w2) > width) {
            if(max_menu_count == 0)
                max_menu_count = i + 1;
        }

        if(max_menu_count > 0 && (idx + 1) % max_menu_count == 0) {
            el.removeClass("gnb_1dli_over").addClass("gnb_1dli_over2");
            left = 0;
        } else {
            left += w1;
        }
    }
}