
$(document).ready(function(){
	$("input[name=type_select]").change(function(){
		if( $(this).val() == "기타" ){
			$("input[name=type_text]").prop("disabled", false);
		}else{
			$("input[name=type_text]").val("");
			$("input[name=type_text]").prop("disabled", true);
		}
	});
	$( "select[name=email2]" ).change( function( event, ui ) {
		if( $(this).val() == "etc" ){
			$("input[name=email3]").val("");
			$("input[name=email3]").prop("disabled", false);
		}else{
			$("input[name=email3]").val($(this).val());
			$("input[name=email3]").prop("disabled", true);
		}
	});
	$("input[name=callSMS]").change(function(){
		if( $(this).is(":checked") ){
			$("input[name=callEMAIL]").prop("checked",false);
		}
	});
	$("input[name=callEMAIL]").change(function(){
		if( $(this).is(":checked") ){
			$("input[name=callSMS]").prop("checked",false);
		}
	});
	$('input[type="text"]').keydown(function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
		}
	});
	$("input[name=userFile]").change(function(){
		var fileArr = $(this).val().split("\\");
		var fileName = fileArr[ fileArr.length - 1 ];
		$("#fileNameText").show();
		$("#fileNameText").find("input").val( fileName )
	});
});
var _isRequest = false;
function sendData(){
	var fm = document.getElementById("actfm");
	var wType = $("input[name=type_select]:checked").val();
	if( wType == "기타" ) wType = $("input[name=type_text]").val();
	var name		= $("input[name=name]").val();
	var gender		= $("input[name=gender]:checked").val();
	var tel			= $("input[name=tel]").val();
	var email1		= $("input[name=email1]").val();
	var email2		= $("select[name=email2]").val();
	var email3		= $("input[name=email3]").val();
	var title		= $("input[name=title]").val();
	var content		= $("textarea[name=content]").val();
	if( wType == "" || !wType ){
		alert("작성자를 입력해주세요.");
		return;
	}
	if( name == "" ){
		alert("작성자명을 입력해주세요.");
		$("input[name=name]").focus();
		return;
	}
	if( !$("input[name=callSMS]").is(":checked") && !$("input[name=callEMAIL]").is(":checked") ){
		alert("답변 받을 채널을 선택해주세요.");
		return;
	}
	if( $("input[name=callSMS]").is(":checked") ){
		if( tel == "" || !tel ){
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
	}
	if( $("input[name=callEMAIL]").is(":checked") ){
		if( email1 == "" ){
			alert("이메일 주소를 입력해주세요.");
			$("input[name=email1]").focus();
			return;
		}
		if( email3 == "" ){
			alert("이메일 주소를 입력해주세요.");
			$("input[name=email3]").focus();
			return;
		}
		if( !isEmailCheck( email1 + "@" + email3 ) ){
			alert("올바른 이메일 주소를 입력해주세요.");
			$("input[name=email1]").focus();
			return;
		}
		fm.email.value = email1 + "@" + email3;
	}
	if( title == "" ){
		alert("제목을 입력해주세요.");
		$("input[name=title]").focus();
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
	fm.wType.value = wType;
	fm.answer.value = $("input[name=callEMAIL]").is(":checked") ? "EMAIL" : "SMS";
	_isRequest = false; alert("온라인 접수는 준비 중입니다. 문의는 010-4894-4905로 전화 주세요.");
}
function regiComplete(){_isRequest=false;}
function regiError( $code ){
	_isRequest = false;
	alert("오류가 발생했습니다.\nerror code = " + $code);
}
function deleteUserFile(){
	$("input[name=userFile]").val("");
	$("#fileNameText").hide();
}


    $(document).ready(function(){
		if (window.location.href.indexOf("_consultation") > -1) {
			$(".sub-top ul li").first().addClass("active");
		}else{
			$(".sub-top ul li").last().addClass("active");
		}
	});
    function selectEmail(ele){
		var $ele = $(ele); 
		var $email2 = $("#dis"); // '1'인 경우 직접입력 
		if($ele.val() == "직접 입력하기"){ 
			$email2.attr('disabled', false); 
			$email2.val(''); 
		}else { 
			$email2.attr('disabled', true); 
			$email2.val($ele.val()); 
		} 
	}

document.addEventListener("click",function(event){var control=event.target.closest("body > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(2) > form:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(7) > td:nth-of-type(1) > div:nth-of-type(1) > a:nth-of-type(1)");if(control){event.preventDefault();deleteUserFile();;}});
document.addEventListener("click",function(event){var control=event.target.closest("body > div:nth-of-type(1) > section:nth-of-type(1) > div:nth-of-type(2) > form:nth-of-type(1) > div:nth-of-type(2) > button:nth-of-type(2)");if(control){event.preventDefault();sendData();;}});
$(function(){
   $('.btn-top').on('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});});
   $('.btn-cancel').on('click',function(e){e.preventDefault();var f=this.closest('form');if(f)f.reset();$('#fileNameText').hide();});
   $('.btn_datepicker').on('click',function(e){e.preventDefault();$('.datepicker').focus();});
   $('select[onchange]').on('change',function(){if(typeof selectEmail==='function')selectEmail(this);});
 });