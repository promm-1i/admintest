
$(document).ready(function(){
	$(".datepicker").datepicker({ 
		dateFormat: 'yy-mm-dd',	//날짜 포맷이다. 보통 yy-mm-dd 를 많이 사용하는것 같다.
		minDate: 0,
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],	//한글 캘린더중 월 표시를 위한 부분
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],	//한글 캘린더 중 월 표시를 위한 부분
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],	//한글 캘린더 요일 표시 부분
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],	//한글 요일 표시 부분
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],	// 한글 요일 표시 부분
		showMonthAfterYear: true,	// true : 년 월  false : 월 년 순으로 보여줌
		yearSuffix: '년',
	});
});
var _isRequest = false;
function sendData(){
	var subjectIdx	= $("input[name=subjectIdx]:checked").val();
	var hopeDate	= $("input[name=hopeDate]").val();
	var hopeTime	= $("select[name=hopeTime]").val();
	var name		= $("input[name=name]").val();
	var gender		= $("input[name=gender]:checked").val();
	var tel			= $("input[name=tel]").val();
	var birth		= $("input[name=birth]").val();
	var content		= $("textarea[name=content]").val();
	if( !subjectIdx ){
		alert("재활과목을 선택해주세요.");
		return;
	}
	if( hopeDate == "" ){
		alert("희망 진료일을 선택해주세요.");
		$("input[name=hopeDate]").focus();
		return;
	}
	if( hopeTime == "" || !hopeTime){
		alert("희망 진료시간을 선택해주세요.");
		return;
	}
	if( name == "" ){
		alert("작성자명을 입력해주세요.");
		$("input[name=name]").focus();
		return;
	}
	if( gender == "" || !gender ){
		alert("성별을 선택해주세요.");
		return;
	}
	if( tel == "" ){
		alert("핸드폰번호를 입력해주세요.");
		$("input[name=tel]").focus();
		return;
	}else{
		if( !isPhoneCheck(tel) ){
			alert("올바른 핸드폰번호를 입력해주세요.");
			$("input[name=tel]").focus();
			return;
		}
	}
	if( birth == "" ){
		alert("생년월일을 입력해주세요.");
		$("input[name=birth]").focus();
		return;
	}
	if( content == "" ){
		alert("예약내용을 입력해주세요.");
		$("textarea[name=content]").focus();
		return;
	}
	if( !$("input[name=p_check]").is(":checked")){
		alert("개인정보 취급방침에 동의해주세요.");
		return;
	}
	if( _isRequest ) return;
	_isRequest = true;
	_isRequest = false; alert("입력 내용을 확인했습니다. 접수 및 일정 확인은 고객센터로 문의해 주세요.");
}


    $(document).ready(function(){
		if (window.location.href.indexOf("_info") > -1) {
			$(".sub-wrap .btns .btn-wrap li").eq(0).hide();
			var text = $(".sub-wrap .btns .btn-wrap li ").eq(0).text();
			$('.sub-wrap .btns .tit').text(text);
		}else if(window.location.href.indexOf("reservation") > -1){
			$(".sub-wrap .btns .btn-wrap li").eq(1).hide();
			var text = $(".sub-wrap .btns .btn-wrap li").eq(1).text();
			$('.sub-wrap .btns .tit').html(text);
		}else{
			$(".sub-wrap .btns .btn-wrap li").eq(2).hide();
			var text = $(".sub-wrap .btns .btn-wrap li").eq(2).text();
			$('.sub-wrap .btns .tit').html(text);
		}
	});

document.addEventListener("click",function(event){var control=event.target.closest("body > div:nth-of-type(1) > section:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > button:nth-of-type(2)");if(control){event.preventDefault();sendData();;}});
$(function(){
   $('.btn-top').on('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});});
   $('.btn-cancel').on('click',function(e){e.preventDefault();var f=this.closest('form');if(f)f.reset();$('#fileNameText').hide();});
   $('.btn_datepicker').on('click',function(e){e.preventDefault();$('.datepicker').focus();});
   $('select[onchange]').on('change',function(){if(typeof selectEmail==='function')selectEmail(this);});
 });