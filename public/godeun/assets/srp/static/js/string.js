/**************************************************************************************
수정 날짜		: 2017.05.26

trim					- 문자열의 양쪽 공백 제거.
trimLeft				- 문자열의 왼쪽 공백 제거.
trimRight				- 문자열의 오른쪽 공백 제거.
replaceAll				- 문자열 전체 replace
isOnlyHangul			- 문자열이 한글로만 되어있는지 여부
isOnlyNumber			- 문자열이 숫자로만 되어있는지 여부
getStringInfo			- 문자열이 어떤 글자로 구성되어있는지 정보 얻어오기.(영문,한글,숫자,특수문자)
byteLength				- 문자열의 BYTE 길이 구하기
limitStringLength		- 문자열 길이로 자르고 뒤에 문자열 붙이기
limitStringByteLength	- 문자열 바이트 길이로 자르고 뒤에 문자열 붙이기
addMoneyComma			- 원 단위 콤파 처리후 스트링 반환
addZero					- 입력된 자리수 만큼 앞자리에 0 추가

isCompanyNumberCheck	- 사업자등록번호 체크
isDateStringCheck		- 날짜 유효성 체크
isPhoneCheck			- 휴대폰 번호 유효성 체크
isTelCheck				- 일반 전화 번호 유효성 체크
isEmailCheck			- 이메일 유효성 검사
checkPassword			- 비밀번호 입력 유효성 검사
***************************************************************************************/

/*
!! trim 함수는 아래 함수들에서도 참조하여 사용한 함수이므로 수정시 주의해주세요. !!

문자열의 양쪽 공백 제거. - trim( String ):String
str - 대상 문자열
*/
function trim( str ) {
	try{
		str = String(str);

		return str.replace(/^\s+|\s+$/g, "");
	}catch(e){
		return str;
	}
	
}

/*
문자열의 왼쪽 공백 제거. - trim_left( String ):String
str - 대상 문자열
*/
function trimLeft( str ) {
	if( !str || str == "" ) throw "trimLeft() params is empty.";
	
	return str.replace(/^\s+/g, "");
}

/*
문자열의 오른쪽 공백 제거. - trim_right( String ):String
str - 대상 문자열
*/
function trimRight( str )  {  
	if( !str || str == "" ) throw "trimRight() params is empty.";
	
	return str.replace(/\s+$/g, "");
}    

/*
문자열 전체 replace. - replace_all( String, String, String ):String
str - 대상 문자열
searchStr - 찾을 문자열
replaceStr - 바꿀 문자열
*/
function replaceAll( str, searchStr, replaceStr ){
	//if( !str || str == "" || !searchStr || searchStr == "" || !replaceStr ) throw "replaceAll() params is empty.";
	str = trim(str);

	var regExp = new RegExp( searchStr, "gi");
	return str.replace(regExp, replaceStr);
}

function strip_tags (input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}
/*
유뷰트 key 반환. - getYoutubeKey( String ):void
url - 주소
*/
function getYoutubeKey( url ){
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var matchs = url.match(regExp);
	if (matchs) {
		return matchs[7];
	}else{
		return null;
	}
}

/*
문자열이 한글로만 되어있는지 여부. - isHangul( String ):Boolean
str - 대상 문자열
*/
function isOnlyHangul( str ) {
	if( !str || str == "" ) throw "isOnlyHangul() params is empty.";
	str = trim(str);

	var testResult = true;
	var regExp = /([^가-힣ㄱ-ㅎㅏ-ㅣ\x20])/gi;
	if (regExp.test(str)){
		testResult = false;
	}

	return testResult;
}

/*
문자열이 숫자로만 되어있는지 여부. - isOnlyNumber( String ):Boolean
str - 대상 문자열
*/
function isOnlyNumber( str ) {
	if( !str || str == "" ) throw "isOnlyNumber() params is empty.";
	str = trim(str);

	var testResult = true;
	var regExp = /([^0-9\.])/gi;
	if (regExp.test(str)){
		testResult = false;
	}

	return testResult;
}

/*
문자열이 어떤 글자로 구성되어있는지 정보 얻어오기(영문,한글,숫자,특수문자). - getStringInfo( String ):Json
str - 대상 문자열
*/
function getStringInfo( str ){
	if( !str || str == "" ) throw "getStringInfo() params is empty.";
	
	var resultObj = {};
	resultObj.kor = false;
	resultObj.eng = false;
	resultObj.num = false;
	resultObj.spc = false;
	
	resultObj.kor = str.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi) == -1 ? false : true;
	resultObj.num = str.search(/[0-9]/g) == -1 ? false : true;
	resultObj.eng = str.search(/[a-z]/ig) == -1 ? false : true;
	resultObj.spc = str.search(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi) == -1 ? false : true;

	return resultObj;
}

/*
문자열의 BYTE 길이 구하기. - bytelength( String, String ):Number
str - 대상 문자열
encoding - 문자열 인코딩, "UTF-8" 일 때 한글은 3byte, 그 외는 2바이트
*/
function byteLength( str, encoding ) {
	var hangulByteLength = 2;

	if( !str || str == "" ) throw "byteLength() params is empty.";
	str = trim(str);

	if( !encoding ) encoding = "EUC-KR";
	encoding = encoding.toUpperCase();

	if( encoding == "UTF-8" ) hangulByteLength = 3;

	var len = (function(s,b,i,c){
		for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?hangulByteLength:c>>7?2:1);
		return b
	})(str);
	
	return len;
}

/*
문자열 길이로 자르고 뒤에 문자열 붙이기. - limitStringLength( String, Number, String ):String
str - 대상 문자열
len - 자르고 싶은 길이
end_str - 문자열 자른 후 후미에 붙을 문자.
*/
function limitStringLength( str, len, end_str ){
	var resultStr = "";

	if( !str || str == "" || !len  ) throw "limitStringLength() params is empty.";
	if( !end_str ) end_str = "";

	str = str.toString();
	
	if( str.length <= len ){
		resultStr = str;
	}else{
		resultStr = str.substr( 0, len );
		resultStr += end_str;
	}

	return resultStr;
}

/*
문자열 바이트 길이로 자르고 뒤에 문자열 붙이기. - limitStringLength( String, Number, String, String ):String
str - 대상 문자열
len - 자르고 싶은 길이
end_str - 문자열 자른 후 후미에 붙을 문자.
encoding - 문자열 인코딩, "UTF-8" 일 때 한글은 3byte, 그 외는 2바이트
*/
function limitStringByteLength( str, bytes, end_str, encoding ){
	var resultStr = "";
	var hangulByteLength = 2;

	if( !str || str == "" || !bytes  ) throw "limitStringByteLength() params is empty.";
	if( !end_str ) end_str = "";
	if( !encoding ) encoding = "EUC-KR";
	encoding = encoding.toUpperCase();

	if( encoding == "UTF-8" ) hangulByteLength = 3;
	
	var strBytes = byteLength( str, encoding );
	
	if( strBytes <= bytes ){
		resultStr = str;
	}else{
		var len = (function(s,b,i,c){
			for(b=i=0; c=s.charCodeAt(i); ++i){
				b += c >> 11 ? hangulByteLength : c >> 7 ? 2 : 1
				if( b > bytes ) break;
			}
			return i;
		})(str);

		resultStr = str.substr( 0, len );
		resultStr += end_str;
	}

	return resultStr;
}

/*
원 단위 콤파 처리후 스트링 반환. - addMoneyComma( String ):String
strValue - 대상 문자열
*/
function addMoneyComma( strValue ){ 
	if( !strValue || strValue == "" ) throw "addMoneyComma() params is empty.";
	strValue = trim(strValue);

	var strValue = strValue.toString();
	var objRegExp = new RegExp('(-?[0-9]+)([0-9]{3})'); 
	while (objRegExp.test(strValue)) { 
		strValue = strValue.replace(objRegExp, '$1,$2'); 
	} 
	return strValue; 
} 

/*
입력된 자리수 만큼 앞자리에 0 추가. - addZero( String, number ):String
number - 대상 숫자 혹은 문자열
len - 원하는 길이
*/
function addZero( number, len ){
	if( !number || number == "" ) throw "addZero() params is empty.";
	number = number.toString();
	number = trim(number);

	return number.length < len ? addZero("0" + number, len) : number;
}

/*
사업자등록번호 체크. - isCompanyNumberCheck( String ):Boolean
bizID - 사업자등록번호
*/
function isCompanyNumberCheck( bizID ) {
	if( !bizID || bizID == "" ) throw "isCompanyNumberCheck() params is empty.";
	bizID = trim(bizID);

	var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
	var i, Sum=0, c2, remander;
	 
	for (i=0; i<=7; i++) Sum += checkID[i] * bizID.charAt(i);

	c2 = "0" + (checkID[8] * bizID.charAt(8));
	c2 = c2.substring(c2.length - 2, c2.length);

	Sum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));

	remander = (10 - (Sum % 10)) % 10 ;
	 
	if (Math.floor(bizID.charAt(9)) != remander){
		return false;
	}else {
		return true;
	}
}

/*
날짜 유효성 체크. - isDateCheck( String ):Boolean
dateStr - 날짜( ex: 2015-09-01, 20150902, 2015:09:01 등 )
*/
function isDateStringCheck( dateStr ) {
	if( !dateStr || dateStr == "" ) throw "isDateStringCheck() params is empty.";
	dateStr = trim(dateStr);
	dateStr = dateStr.replace(/[^0-9]/g, '');
	dateStr = Number(dateStr);
	dateStr = dateStr.toString();

	if(dateStr.length != 8){
		return false;
	}else{
		var t_month = Number( dateStr.substr(4,2) );
		var t_date = Number( dateStr.substr(6,2) );
		
		if( t_month < 13 && t_month > 0 && t_date < 32 && t_date > 0) return true;
		else return false;
	}
}

/*
휴대폰 번호 유효성 체크. - isPhoneCheck( String ):Boolean
tel - 전화번호
*/
function isPhoneCheck( tel ){
	var result = false;

	if( !tel || tel == "" ) throw "isPhoneCheck() params is empty.";
	tel = tel.toString();
	tel = trim(tel);
	tel = tel.replace(/[^0-9]/g, '');

	if( tel.length == 10 || tel.length == 11 ){
		var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
		result = regExp.test(tel);
	}else{
		result = false;
	}
	
	return result;
}

/*
일반 전화 번호 유효성 체크. - isTelCheck( String ):Boolean
tel - 전화번호
*/
function isTelCheck( tel ){
	var result = false;

	if( !tel || tel == "" ) throw "isTelCheck() params is empty.";
	tel = tel.toString();
	tel = trim(tel);
	tel = tel.replace(/[^0-9]/g, '');
	
	var regExp = /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|7[0]))(\d{3,4})(\d{4})$/;
	result = regExp.test(tel);
	
	return result;
}

/*
이메일 유효성 검사. - isEmailCheck( String ):Boolean
emailStr - 이메일주소
*/
function isEmailCheck( emailStr ) {
	if( !emailStr || emailStr == "" ) throw "isEmailCheck() params is empty.";
	emailStr = trim(emailStr);
	emailStr = emailStr.toLowerCase();

	var checkTLD = 1;
	var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;
	var emailPat = /^(.+)@(.+)$/;
	var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
	var validChars="\[^\\s" + specialChars + "\]";
	var quotedUser="(\"[^\"]*\")";
	var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
	var atom = validChars + '+';
	var word="(" + atom + "|" + quotedUser + ")";
	var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
	var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
	var matchArray=emailStr.match(emailPat);

	if (matchArray == null) return false;

	var user=matchArray[1];
	var domain=matchArray[2];

	for (i=0; i<user.length; i++) {
		if (user.charCodeAt(i)>127) return false;
	}

	for (i=0; i<domain.length; i++) {
		if (domain.charCodeAt(i)>127) return false;
	}

	if (user.match(userPat) == null) return false;

	var IPArray = domain.match(ipDomainPat);
	if (IPArray != null) {
		for (var i = 1; i <= 4; i++) {
			if (IPArray[i] > 255) return false;
		}
		return true;
	}

	var atomPat = new RegExp("^" + atom + "$");
	var domArr = domain.split(".");
	var len = domArr.length;
	for (i = 0; i < len; i++) {
		if (domArr[i].search(atomPat)==-1) return false;
	}

	if (checkTLD && domArr[domArr.length-1].length!=2 && 
		domArr[domArr.length-1].search(knownDomsPat)==-1) {
		return false;
	}

	if (len<2) return false;

	return true;
}

/*
비밀번호 입력 유효성 검사. - checkPassword( String, Array ):Json
password - 비밀번호
ban_list - 포함되면 안되는 문자열의 배열
*/
function checkPassword( password, ban_list ){
	if( !password || password == "" ) throw "checkPassword() params is empty.";
	
	var returnJson = {};
	var check_arr = [];

	returnJson.result	= true;
	returnJson.msg		= "";
	
	check_arr[0] = password.search(/[0-9]/g);
	check_arr[1] = password.search(/[a-z]/ig);
	check_arr[2] = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
	
	var none_cnt = 0;
	for( var i = 0; i < check_arr.length; ++i ) if( check_arr[i] == -1 ) ++none_cnt;
	
	if( none_cnt == 0 ){
		if( password.length < 6 || password.length > 16 ){
			returnJson.result	= false;
			returnJson.msg		= "영문/숫자/특수문자 3가지 조합일 경우\n비밀번호는 6 ~ 16 자리로 작성해주세요.";
		}
	}else if( none_cnt == 1 ){
		if( password.length < 8 || password.length > 16 ){
			returnJson.result	= false;
			returnJson.msg		= "영문/숫자/특수문자 2가지 조합일 경우\n비밀번호는 8 ~ 16 자리로 작성해주세요.";
		}
	}else{
		returnJson.result	= false;
		returnJson.msg		= "숫자/영문/특수문자 조합으로 6~16자리를 사용해야 합니다.";
	}

	if(/(\w)\1\1/.test(password)){
		returnJson.result	= false;
		returnJson.msg		= "같은 문자를 3번 이상 사용하실 수 없습니다.";
	}
	
	for( var i = 0; i < ban_list.length; ++i ){
		if(password.search(ban_list[i]) > -1){
			returnJson.result	= false;
			returnJson.msg		= "비밀번호에 개인정보가 포함되었습니다.";
		}
	}

	return returnJson;
}