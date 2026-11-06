
    $(document).ready(function(){
    });


    $(document).ready(function(){
		if (window.location.href.indexOf("_info") > -1) {
			$(".sub-top ul li").first().addClass("active");
		}else if(window.location.href.indexOf("reservation") > -1){
			$(".sub-top ul li").eq(1).addClass("active");
		}else{
			$(".sub-top ul li").last().addClass("active");
		}
	});


$(function(){
   $('.btn-top').on('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});});
   $('.btn-cancel').on('click',function(e){e.preventDefault();var f=this.closest('form');if(f)f.reset();$('#fileNameText').hide();});
   $('.btn_datepicker').on('click',function(e){e.preventDefault();$('.datepicker').focus();});
   $('select[onchange]').on('change',function(){if(typeof selectEmail==='function')selectEmail(this);});
 });