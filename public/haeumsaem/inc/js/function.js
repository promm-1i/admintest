function mouseWheelMove(classId) {
	$("."+classId).each(function () {
		// 개별적으로 Wheel 이벤트 적용
		$(this).on("mousewheel DOMMouseScroll", function (e) {
			e.preventDefault();
			var delta = 0;
			if (!event) event = window.event;
			if (event.wheelDelta) {
				delta = event.wheelDelta / 120;
				if (window.opera) delta = -delta;
			} else if (event.detail) delta = -event.detail / 3;
			var moveTop = null;
			var moveYn = 'N';
			// 마우스휠을 위에서 아래로
			if (delta < 0) {
				if ($(this).next().length > 0) {
					moveYn = 'Y';
					moveTop = $(this).next().offset().top;
				} else {
					$("html,body").animate({
						scrollTop: $(document).height() + 'px'
					},1000);
				}
			// 마우스휠을 아래에서 위로
			} else {
				if ($(this).prev().length > 0) {
					moveYn = 'Y';
					moveTop = $(this).prev().offset().top;
				}
			}
			// 화면 이동 0.8초(800)
			if (moveYn=='Y') {
				$("html,body").stop().animate({
					scrollTop: moveTop + 'px'
				}, {
					duration: 800, complete: function () {
					}
				});
			}
		});
	});
}