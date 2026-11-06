function loginChk() {

	var userid = $('#loginForm').find('input[name=userid]').val();
	var passwd = $('#loginForm').find('input[name=passwd]').val();

	if (userid == '') {
		alert('휴대폰번호를 입력해주세요.');
		return false;
	}

	if (passwd == '') {
		alert('비밀번호를 입력해주세요.');
		return false;
	}

	ajaxProc('','loginForm','/_Prog/member/loginProc.php','', loginChkEnd);
}

function loginChkEnd(v) {
    var vSplit = v.split('||');
    if (vSplit[0]=='OK') {
        alert('로그인되었습니다.');
//      location.href='/deulnyeok/';
//        location.href=vSplit[1];
		if(vSplit[1] != '') {
			location.href = vSplit[1];			
		} else {
			location.reload();
		}
    } else {
        alert(v);
    }
}





// 동의방침 팝업 다음버튼
function joinStep1Chk() {
    if($('#privacyAgree').prop('checked') == false) {
        alert('개인정보처리방침에 동의해주세요.');
        return false;
    }
    if($('#termAgree').prop('checked') == false) {
        alert('이용약관에 동의해주세요.');
        return false;    
    }

    $('#modalJoin02').modal();
}


// 아이디 중복 확인
/*
function useridDblChk() {
	var userid = $('#joinForm').find('input[name=userid]').val();
	if (userid == '') {
		alert('아이디를 입력해주세요.');
		return false;
	}
	var pa = 'userid='+userid;
	ajaxProc('','','/_Prog/member/useridDblChk.php',pa,useridDblChkEnd);
}
*/
function useridDblChk() {
	var phone1 = $('#joinForm').find('#phone1').val();
	var phone2 = $('#joinForm').find('#phone2').val();
	var phone3 = $('#joinForm').find('#phone3').val();

	if (phone1 == '' || phone2 == '' || phone3 == '') {
		alert('휴대폰번호를 입력해주세요.');
		return false;
	}

	var userid = phone1+phone2+phone3;
	$('#joinForm').find('#userid').val(userid);
/*
	if (userid == '') {
		alert('아이디를 입력해주세요.');
		return false;
	}
*/
	var pa = 'userid='+userid;
	ajaxProc('','','/_Prog/member/useridDblChk.php',pa,useridDblChkEnd);
}

function useridDblChkEnd(v) {
	var vSplit = v.split("||");
	alert(vSplit[1]);
	$('#joinForm').find('#useridDblChk').val(vSplit[0]);
}

// 가입하기 버튼
function joinFormChk() {
	var userid = $('#joinForm').find('input[name=userid]').val().trim();
	var useridDblChk = $('#joinForm').find('#useridDblChk').val().trim();
	var passwd = $('#joinForm').find('input[name=passwd]').val().trim();
	var passwdChk = $('#joinForm').find('input[name=passwdChk]').val().trim();
	var usernm = $('#joinForm').find('input[name=usernm]').val().trim();
	//var phone = $('#joinForm').find('input[name=phone]').val().trim();
	//var email = $('#joinForm').find('input[name=email]').val().trim();
/*
	if (userid == '') {
		alert('아이디를 입력해주세요.');
		return false;
	}
*/
	if (useridDblChk != 'Y') {
		alert('휴대폰번호 중복확인을 해주세요.');
		return false;
	}

	if (passwd == '') {
		alert('비밀번호를 입력해주세요.');
		return false;
	}

	//if(fnCheckPassWord(passwd, 8)) {
		if (passwd != passwdChk) {
			alert('비밀번호 확인 값이 일치하지 않습니다.');
			return false;
		}

		if (usernm == '') {
			alert('이름을 입력해주세요.');
			return false;
		}
/*
		if (phone == '') {
			alert('핸드폰번호를 입력해주세요.');
			return false;
		}

		if (email == '') {
			alert('이메일을 입력해주세요.');
			return false;
		}

		if(!CheckEmail(email))	{
			alert("이메일 형식이 잘못되었습니다");
			return false;
		}
*/
		ajaxProc('','joinForm','/_Prog/member/joinProc.php','',joinFormChkEnd);
	//}
}

function CheckEmail(str){
     var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
     if(!reg_email.test(str)) {                            
          return false;         
     }                            
     else {                       
          return true;         
     }                            
}                     

function joinFormChkEnd (v) {
	if(v == 'OK') {
		alert('가입되었습니다.');
		location.reload();
	} else {
		alert(v);
	}
}



// 아이디 찾기 모달 다음 버튼
function findIdFormChk() {
	var usernm = $('#findIdForm').find('input[name=usernm]').val();
	//var phone = $('#findIdForm').find('input[name=phone]').val();
	var email = $('#findIdForm').find('input[name=email]').val();

	if (usernm == '') { 
		alert('이름을 입력해주세요.');
		return false;
	}
/*
	if (phone == '') {
		alert('핸드폰번호를 입력해주세요.');
		return false;
	}
*/
	if (email == '') {
		alert('이메일을 입력해주세요.');
		return false;
	}

	ajaxProc('','findIdForm','/_Prog/member/findIdProc.php','',findIdFormChkEnd);
}

function findIdFormChkEnd(v) {
	var vSplit = v.split("||");
	if (vSplit[0] == 'OK') {
		$('#findIdForm2').find('input[name=userid]').val(vSplit[1]);
		//$('#findIdForm2').find('input[name=phone]').val(vSplit[2]);
		$('#findIdForm2').find('input[name=email]').val(vSplit[3]);
		$('#modalIdfind2').modal();
	} else {
		alert(v);
	}
}

function imsiPwSend(frmId) {
	if (confirm('임시비밀번호를 발급받으시겠습니까? 임시비밀번호는 등록된 이메일로만 발송가능합니다.')) {
		ajaxProc('',frmId,'/_Prog/member/imsiPwProc.php','',imsiPwSendEnd);
	}
}

function imsiPwSendEnd(v) {
	if (v == 'OK') {
		alert('이메일로 임시비밀번호가 발송되었습니다.');
		//location.reload();
	} else {
		alert(v);
	}
}

function userInfoConfirm(frmId) {
	ajaxProc('',frmId,'/_Prog/member/memberProc.php','', function (res) {
		if(res == 'OK') {
			javascript:$('.memberModal').hide();$('.modal-backdrop').css('z-index','7500');$('#modalPwChange').modal();
		} else {
			alert(res);
		}
	});
}

function fnPasswdChange() {
	var passwd = $('#pwdChangeForm').find('input[name=passwd]').val().trim();
	var passwdChk = $('#pwdChangeForm').find('input[name=passwdChk]').val().trim();

	if (passwd == '') {
		alert('비밀번호를 입력해주세요.');
		return false;
	}

	//if(fnCheckPassWord(passwd, 8)) {
	if (passwd != passwdChk) {
		alert('비밀번호 확인 값이 일치하지 않습니다.');
		return false;
	}

	ajaxProc('','pwdChangeForm','/_Prog/member/memberProc.php','',fnPasswdChangeEnd);
}

function fnPasswdChangeEnd (v) {
	if(v == 'OK') {
		alert('비밀번호가 변경되었습니다.');
		location.reload();
	} else {
		alert(v);
	}
}