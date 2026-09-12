jQuery(function(jQuery){
	jQuery.fn.gnb = function(options) {
		var opts = jQuery.extend(options);
		var gnb = jQuery(this);
		var gnbList = gnb.find('>ul>li');
		var submenu = gnb.find('.submenu');
		var submenuList = submenu.find('ul>li');

		function showMenu() {
			t = jQuery(this).parent('li');
			if (!t.hasClass('active')) {
				gnbList.removeClass('active');
				gnbList.bind("focus mouseover",function(){
					jQuery(this).addClass('active');
				});
				gnbList.bind("mouseleave",function(){
					jQuery(this).removeClass('active');
				});
				
			}
			submenu.hide();
			t.find('.submenu').slideDown('fast');
		}

		function showMenu2() {
			t = jQuery(this).parent('li');
			if (!t.hasClass('active')) {
				gnbList.removeClass('active');
				t.addClass('active');
				if(t.find('div').hasClass('submenu')){
					submenu.slideUp('fast');
					t.find('.submenu').slideDown('fast');
					return false
				}				
			}		
		}

		function hideMenu() {
			gnbList.removeClass('active');
			submenu.slideUp('fast');
			activeMenu();
		}

		function activeMenu() {
			if(opts.d1) {
				t = gnbList.eq(opts.d1-1); 
				t.addClass('active');
				t.find('.submenu').hide();
			}
		}

		return this.each(function() {
			activeMenu();
			var isTablet = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);
			if( !isTablet ){
				gnbList.find('>a').mouseover(showMenu).focus(showMenu);
			}else{
				gnbList.find('>a').click(showMenu2);
			}
			jQuery("#header").mouseleave(hideMenu);
		});
	}
});