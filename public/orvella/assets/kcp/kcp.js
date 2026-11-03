function auth_type_check()
{
    var auth_form = document.kcp_form_auth;
    
	if (auth_form.kcp_page_submit_yn.value != "Y")
	{

		var return_gubun;
		var width  = 410;
		var height = 500;

		var leftpos = screen.width  / 2 - ( width  / 2 );
		var toppos  = screen.height / 2 - ( height / 2 );

		var winopts  = "width=" + width   + ", height=" + height + ", toolbar=no,status=no,statusbar=no,menubar=no,scrollbars=no,resizable=no";
		var position = ",left=" + leftpos + ", top="    + toppos;
		var AUTH_POP = window.open('','auth_popup', winopts + position);
    
		auth_form.target = "auth_popup";
	}

    auth_form.action = "/kcp/kcp_cert_req.php"; // 인증창 호출 및 결과값 리턴 페이지 주소
    
	auth_form.submit();
	
    return true;
}

// 주문번호 생성 예제
function init_orderid()
{ 
	var today = new Date();
	var year  = today.getFullYear();
	var month = today.getMonth()+ 1;
	var date  = today.getDate();
	var time  = today.getTime();

	if(parseInt(month) < 10)
	{
		month = "0" + month;
	}

	var vOrderID = year + "" + month + "" + date + "" + time;
	
	return vOrderID;
}

function getCurrentDate()
{
	var frm = document.hash_info;
	
	var date = new Date();
	var str_year = date.getFullYear().toString();
	var year = str_year.substr(2,4);

	var month = date.getMonth() + 1;
	month = month < 10 ? '0' + month.toString() : month.toString();

	var day = date.getDate();
	day = day < 10 ? '0' + day.toString() : day.toString();

	var hour = date.getHours();
	hour = hour < 10 ? '0' + hour.toString() : hour.toString();

	var minites = date.getMinutes();
	minites = minites < 10 ? '0' + minites.toString() : minites.toString();

	var seconds = date.getSeconds();
	seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

	var vtime = year + month + day + hour + minites + seconds;
	
	return vtime;
}

function getHash(){
	var ordr_idxx = init_orderid();
	document.kcp_form_auth.ordr_idxx.value = ordr_idxx;
	
	var param = {};
	param.ct_type = "HAS";
	param.ordr_idxx = ordr_idxx;
	param.make_req_dt = getCurrentDate();
	
	$.ajax({
		type		: "POST",
		url			: "/kcp/kcp_api_hash.php",
		dataType	: "json",
		async		: false,
		data		: param,
		success:function( resultData ){
			console.log(resultData)
			document.kcp_form_auth.up_hash.value = resultData.up_hash;
			document.kcp_form_auth.kcp_merchant_time.value = resultData.kcp_merchant_time;
			document.kcp_form_auth.kcp_cert_lib_ver.value = resultData.kcp_cert_lib_ver;
		},
		
		error:function(request, status, error) {
			console.log(request)
			alert("시스템 오류입니다.\n시스템 관리자에게 문의해주세요.")
		}
	});
}

$(document).ready(function(){
	getHash();
});