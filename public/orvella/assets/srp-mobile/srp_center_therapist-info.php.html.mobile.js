
    $(document).ready(function(){
		if (window.location.href.indexOf("_center-info") > -1) {
			$(".sub-wrap .btns .btn-wrap li").eq(0).hide();
			var text = $(".sub-wrap .btns .btn-wrap li ").eq(0).text();
			$('.sub-wrap .btns .tit').text(text);
		}else if(window.location.href.indexOf("therapist-info") > -1){
			$(".sub-wrap .btns .btn-wrap li").eq(1).hide();
			var text = $(".sub-wrap .btns .btn-wrap li").eq(1).text();
			$('.sub-wrap .btns .tit').html(text);
		}else if(window.location.href.indexOf("compliment-view") > -1){
			$(".sub-wrap .btns .btn-wrap li").eq(1).hide();
			var text = $(".sub-wrap .btns .btn-wrap li").eq(1).text();
			$('.sub-wrap .btns .tit').html(text);
		}else if(window.location.href.indexOf("facility-info") > -1){
			$(".sub-wrap .btns .btn-wrap li").eq(2).hide();
			var text = $(".sub-wrap .btns .btn-wrap li").eq(2).text();
			$('.sub-wrap .btns .tit').html(text);
		}else{
			$(".sub-wrap .btns .btn-wrap li").eq(3).hide();
			var text = $(".sub-wrap .btns .btn-wrap li").eq(3).text();
			$('.sub-wrap .btns .tit').html(text);
		}
	});


$(function(){
   $('.btn-top').on('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});});
   $('.btn-cancel').on('click',function(e){e.preventDefault();var f=this.closest('form');if(f)f.reset();$('#fileNameText').hide();});
   $('.btn_datepicker').on('click',function(e){e.preventDefault();$('.datepicker').focus();});
   $('select[onchange]').on('change',function(){if(typeof selectEmail==='function')selectEmail(this);});
 });