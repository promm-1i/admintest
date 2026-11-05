function regCheck(form){
	//form중 name속성이 있으며 regPass클래스가 없는 nodeList
	var targets = form.querySelectorAll("[name]:not([type='checkbox']):not([type='hidden']):not([type='file']):not(.regPass)");
	for(var i = 0; i < targets.length; i++){
		// var target = form.elements[targets[i].name];
		var target = targets[i];
		var tag = target.tagName.toLowerCase();
		if(tag != "select" && target.length > 1){
			for(var n = 0; n < target.length; n++){
				var tg = target[n];
				if(tg.value == ""){
					if(tg.dataset.reg){	
						alert(tg.dataset.reg);
					}else{
						alert(tg.placeholder);
					}
					return false;
				}
			}
		}else{
			if(target.value == ""){		//value값이 공백일때
				if(target.dataset.reg){		//data-reg가 있으면
					alert(target.dataset.reg);	//data-reg값으로 얼럿	
					target.focus()
				}else{			
					alert(target.placeholder);	//placeholder값으로 얼럿	
					target.focus()
				}
				// target.focus();
				return false;
			} 
		}
	}
	return true;
}
function muAjax(json, form){
	var formData = (form && form.tagName == "FORM") ? new FormData(form) : new FormData();
	var url = (json.url) ? json.url : form.action;
	var method = (json.method) ? json.method : "POST";
	var data = json.data;
	for(key in data){
		formData.append(key, data[key]);
		console.log(key+": "+data);
	}
	var option = (method.toLowerCase() == "post") ? { method: method, body: formData } : { method: method };
	console.log(option);

	option.headers = {
		//'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest'
	};
	return fetch(url, option)
	.then(function(response){
		if(response.status == 403){
			alert("세션이 만료되었습니다. 다시 로그인해주세요.");
			location.href = "/admin/";
		}
		if(response.ok){
			return response.text();
		}
	}).catch(function(error){
		throw new Error("ajax error!");
	});
}

function muAjax2(json, form, returnUrl="reload"){
	const formData = (form && form.tagName == "FORM") ? new FormData(form) : new FormData();
	const url = (json.url) ? json.url : form.action;
	const method = (json.method) ? json.method : "POST";
	const data = json.data;
	for(key in data){
		formData.append(key, data[key]);
		console.log(key+": "+data);
	}
	const option = (method.toLowerCase() == "post") ? { method: method, body: formData } : { method: method };
	console.log(option);

	option.headers = {
		//'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest'
	};
	return fetch(url, option)
	.then(function(response){
		if(response.status == 403){
			alert("세션이 만료되었습니다. 다시 로그인해주세요.");
			location.href = "/admin/";
		}
		if(response.ok){
			
			if (returnUrl == "reload"){
				location.reload();
			} else {
				location.href = returnUrl;	
			}
			return response.text();
		}
	}).catch(function(error){
		throw new Error("ajax error!");
	});
}

function excuteEnter(excuteFunc)
{
	console.log(123);
	if(event.keyCode == 13){
		if(typeof isLoading == 'undefined')
		{
			excuteFunc();
			return;
		}
		else if(!isLoading)
		{
			excuteFunc();
			return;
		}
	}
}

function cutDate(dd)
{
	if(dd == "" || dd == null || dd == 'null' || dd == undefined)
	{
		return "";
	}
	else
	{
		if(trim(dd).length == 6)
		{
			var year = dd.substring(0,4);
			var month = dd.substring(4,6);
			return year+"-"+month;
		}
		else if(trim(dd).length == 8)
		{
			var year = dd.substring(0,4);
			var month = dd.substring(4,6);
			var day = dd.substring(6,8);
			return year+"-"+month+"-"+day;
		}
		else if(trim(dd).length == 12)
		{
			var year = dd.substring(0,4);
			var month = dd.substring(4,6);
			var day = dd.substring(6,8);
			var hour = dd.substring(8,10);
			var min = dd.substring(10,12);
			return year+"-"+month+"-"+day+" "+hour+":"+min;
		}
		else if(trim(dd).length == 14)
		{
			var year = dd.substring(0,4);
			var month = dd.substring(4,6);
			var day = dd.substring(6,8);
			var hour = dd.substring(8,10);
			var min = dd.substring(10,12);
			var sec = dd.substring(12,14);
			return year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
		}
		else
		{
			return dd;
		}
	}
}

function cutPhone(dd)
{
	if(dd == "" || dd == null || dd == 'null' || dd == undefined)
	{
		return "";
	}
	else
	{
		if(trim(dd).length == 11)
		{
			var phone1 = dd.substring(0,3);
			var phone2 = dd.substring(3,7);
			var phone3 = dd.substring(7,11);
			return phone1 + "-" + phone2 + "-" + phone3;
		}
		else if(trim(dd).length == 10)
		{
			var phone1 = dd.substring(0,3);
			var phone2 = dd.substring(3,6);
			var phone3 = dd.substring(6,10);
			return phone1 + "-" + phone2 + "-" + phone3;
		}
		else
		{
			return dd;
		}
	}
}


function nullChk(d)
{
	if(d == "" || d == null || d == 'null' || d == undefined)
	{
		return "";
	}
	else
	{
		return d.toString().replace(/"/gi, ""); 
	}
}
function nullChkZero(d)
{
	if(d == "" || d == null || d == 'null' || d == undefined)
	{
		return Number("0");
	}
	else
	{
		var ret = d.toString().replace(/,/gi, ""); 
		return Number(ret);
	}
}
function comma(x) {
    return nullChkZero(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var setCookie = function(name, value, exp) 
{
	var date = new Date();
	date.setTime(date.getTime() + exp*24*60*60*1000);
	document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};
var getCookie = function(name) 
{
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return value? value[2] : null;
};

const getNowDate = () => {
	const date = new Date();
	const year = date.getFullYear();
	let month = new String(date.getMonth()+1);
	let day = new String(date.getDate());

	// 한자리수일 경우 0을 채워준다. 
	if(month.length == 1){ month = "0" + month; }
	if(day.length == 1){  day = "0" + day; }

	/*return year.concat("-",month,"-",day);*/
	return year + "-" + month + "-" + day;
}

function getTime()
{
	var date = new Date(); 
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	// 한자리수일 경우 0을 채워준다. 
	if(h.toString().length == 1){ 
	  h = "0" + h.toString(); 
	} 
	if(m.toString().length == 1){ 
	  m = "0" + m.toString(); 
	} 
	if(s.toString().length == 1){ 
		s = "0" + s.toString(); 
	} 
	return h + ":" + m + "" + s;
}
function trim(stringToTrim) {
    return nullChk(stringToTrim).toString().replace(/^\s+|\s+$/g,"");
}
function repWord(dd)
{
	
	dd = dd.replace(/&amt;/gi, "&");
	dd = dd.replace(/&amp;/gi, "&");
	dd = dd.replace(/&lt;/gi, "<");
	dd = dd.replace(/&gt;/gi, ">");
	dd = dd.replace(/&quot;/gi, "\"");
	dd = dd.replace(/&#039;/gi, "\'");
	dd = dd.replace(/<br>/gi, "\n");
	
	return dd;
	
}

function repWord2(str){
	str = str.replace(/&/g,"&amt;");
	str = str.replace(/</g,"&lt;");
	str = str.replace(/>/g,"&gt;");
	str = str.replace(/\"/g,"&quot;");
	str = str.replace(/\'/g,"&#039;");
	str = str.replace(/\n/g,"<br>");
 return str;
}
//6자리 uid생성
function generateUID() {
	var ranNum = Math.floor(Math.random()*(999999-100000+1)) + 100000;
	return String(ranNum);
}


//자바스크립트 해시맵
HashMap = function(){  
    this.map = new Array();
};  
HashMap.prototype = {  
    put : function(key, value){  
        this.map[key] = value;
    },  
    get : function(key){  
        return this.map[key];
    },  
    getAll : function(){  
        return this.map;
    },  
    clear : function(){  
        this.map = new Array();
    },  
    isEmpty : function(){    
         return (this.map.size() == 0);
    },
    remove : function(key){    
         delete this.map[key];
    },
    toString : function(){
        var temp = '';
        for(i in this.map){  
            temp = temp + ',' + i + ':' +  this.map[i];
        }
        temp = temp.replace(',','');
          return temp;
    },
    keySet : function(){  
        var keys = new Array();  
        for(i in this.map){  
            keys.push(i);
        }  
        return keys;
    }
};
//자바스크립트 해시맵

/**
 * @param {string} cate
 * @return location.reload
 * 매개변수(cate)로 데이터베이스 테이블
 * ### "mu_ 뒤에 이어질 문자"
 * 를 넣으면 됩니다. ex) delProc(매개변수) == mu_매개변수
 *
 * 그리고 해당 테이블의 pk값은 체크된 input 태그들 중에 name값이 chk_list을 가지고 있는 태그의 data-idx속성의 값을 controller로 넘깁니다.
 * */
function delProc(cate){
	const cont = document.querySelectorAll("input[name='chk_list'][data-idx]:checked");
	console.log(cont);
	const cnt = cont.length;
	if(cnt == 0){
		alert("선택된 항목이 없습니다.");
		return false;
	}
	if(!confirm("정말 삭제하시겠습니까?")){
		return false;
	}
	let for_cnt = 0;
	let idxs = "";
	for(var i = 0; i < cont.length; i++){
		if(i != 0) {idxs += ',';}
		idxs += cont[i].dataset.idx;
	}
	muAjax({
		url: "/admin/delete",
		method: "post",
		data: {
			idxs: idxs,
			cate: cate
		}
	}).then(function(data){
		var result = JSON.parse(data);
		alert(result.msg);
		location.reload();
	})
}

/**
 * users 회원정보용
 * 1=일반회원, 2=sns회원
 *
 * @param {string} cate1, cate2
 * @return location.reload
 * 매개변수(cate)로 데이터베이스 테이블
 * ### "mu_ 뒤에 이어질 문자" 2개
 * 를 넣으면 됩니다. ex) delProc(매개변수) == mu_매개변수
 *
 * 그리고 해당 테이블의 pk값은 체크된 input 태그들 중에 name값이 chk_list을 가지고 있는 태그의 data-idx속성의 값을 controller로 넘깁니다.
 * */
function delProc_user(cate1, cate2){
	const cont = document.querySelectorAll("input[name='chk_list'][data-idx]:checked");
	console.log(cont);
	const cnt = cont.length;
	if(cnt == 0){
		alert("선택된 항목이 없습니다.");
		return false;
	}
	if(!confirm("정말 삭제하시겠습니까?")){
		return false;
	}
	let for_cnt1 = 0;   //첫 빈값에 , 방지
	let for_cnt2 = 0;
	let idxs1 = "";		//1=일반회원
	let idxs2 = "";		//2=sns회원
	for(var i = 0; i < cont.length; i++){
		if(cont[i].value=="general"){
			if(i != 0 && for_cnt1 != 0) {idxs1 += ',';}
			idxs1 += cont[i].dataset.idx;
			for_cnt1 = 1;
		}else{
			if(i != 0 && for_cnt2 != 0) {idxs2 += ',';}
			idxs2 += cont[i].dataset.idx;
			for_cnt2 = 1;
		}

		console.log("idxs1 : " + idxs1);
		console.log("idxs2 : " + idxs2);

	}
	muAjax({
		url: "/admin/delete_user",
		method: "post",
		data: {
			idxs1: idxs1,
			idxs2: idxs2,
			cate1: cate1,
			cate2: cate2
		}
	}).then(function(data){
		var result = JSON.parse(data);
		alert(result.msg);
		location.reload();
	})
}


function mainShowProc(cate){
	const cont = document.querySelectorAll("input[name='chk_list'][data-idx]:checked");
	console.log(cont);
	const cnt = cont.length;
	if(cnt === 0){
		alert("선택된 항목이 없습니다.");
		return false;
	}
	if(cnt > 1){
		alert("메인 노출은 하나만 가능합니다.");
		return false;
	}
	if(!confirm("선택한 항목을 메인 노출로 지정하시겠습니까?")){
		return false;
	}
	let for_cnt = 0;
	let idxs = "";
	for(var i = 0; i < cont.length; i++){
		if(i != 0) {idxs += ',';}
		idxs += cont[i].dataset.idx;
	}
	muAjax({
		url: "/admin/mainShowProc",
		method: "post",
		data: {
			idxs: idxs,
			cate: cate
		}
	}).then(function(data){
		var result = JSON.parse(data);
		alert(result.msg);
		location.reload();
	})
}

function copyProc(cate){
	const cont = document.querySelectorAll("input[name='chk_list'][data-idx]:checked");
	console.log(cont);
	const cnt = cont.length;
	if(cnt == 0){
		alert("선택된 항목이 없습니다.");
		return false;
	}
	if(!confirm("정말 복사하시겠습니까?")){
		return false;
	}
	let for_cnt = 0;
	let idxs = "";
	for(var i = 0; i < cont.length; i++){
		if(i != 0) {idxs += ',';}
		idxs += cont[i].dataset.idx;
	}
	muAjax({
		url: "/admin/copy",
		method: "post",
		data: {
			idxs: idxs,
			cate: cate
		}
	}).then(function(data){
		var result = JSON.parse(data);
		alert(result.msg);
		location.reload();
	})
}
function allChk(checked){
	const target = document.querySelectorAll("input[name='chk_list']");
	for(let i=0; i < target.length; i++){
		if(checked === true){
			target[i].checked = true;
		}else{
			target[i].checked = false;
		}
	}
}
function allChk_y(checked){
	const target = document.querySelectorAll("input[name='chk_list_y']");
	for(let i=0; i < target.length; i++){
		if(checked === true){
			target[i].checked = true;
		}else{
			target[i].checked = false;
		}
	}
}
function statusMove(cate, act)
{
	if(act == 'show')
	{
		var cont = document.querySelectorAll("input[name='chk_list'][data-idx]:checked");
		var con = "정말 노출 상태로 변경하시겠습니까?";
	}
	else if(act == 'hide')
	{
		var cont = document.querySelectorAll("input[name='chk_list_y'][data-idx]:checked");
		var con = "정말 미노출 상태로 변경하시겠습니까?"
	}
	const cnt = cont.length;
	if(cnt == 0){
		alert("선택된 항목이 없습니다.");
		return false;
	}
	if(!confirm(con)){
		return false;
	}
	let for_cnt = 0;
	let idxs = "";
	for(var i = 0; i < cont.length; i++){
		if(i != 0) {idxs += ',';}
		idxs += cont[i].dataset.idx;
	}
	muAjax({
		url: "/admin/move",
		method: "post",
		data: {
			idxs: idxs,
			cate: cate,
			act: act
		}
	}).then(function(data){
		var result = JSON.parse(data);
		alert(result.msg);
		location.reload();
	})
}
function buildCalendar() {
    //현재 달 달력 만들기
    var doMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    //getMonth()는 0~11을 반환하기 때문에 +1해줌
    var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    var tbCalendar = document.getElementById("calendar");
    var tbCalendarYM = document.getElementById("tbCalendarYM");

    //year,month 전역변수 세팅
    year = today.getFullYear();
    month = (today.getMonth() + 1);
    if (month < 10) {
        month = '0' + month;
    }

    tbCalendarYM.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월";

    while (tbCalendar.rows.length > 1) {
        //열을 지워줌
        //기본 열 크기는 body 부분에서 2로 고정되어 있다.
        tbCalendar.deleteRow(tbCalendar.rows.length - 1);
        //테이블의 tr 갯수 만큼의 열 묶음은 -1칸 해줘야지 
        //30일 이후로 담을달에 순서대로 열이 계속 이어진다.
    }
    var row = null;
    row = tbCalendar.insertRow();
    //테이블에 새로운 열 삽입 ->초기화
    var cnt = 0;
    for (i = 0; i < doMonth.getDay(); i++) {
        /*이번달의 day만큼 돌림*/
        cell = row.insertCell(); //열 한칸한칸 계속 만들어주는 역할
        cnt = cnt + 1; //열의 갯수를 계속 다음으로 위치하게 해주는 역할
    }

    /*달력 출력*/
    for (i = 1; i <= lastDate.getDate(); i++) {
        //1일부터 마지막 일까지 돌림
        cell = row.insertCell(); //열 한칸한칸 계속 만들어주는 역할
        
        cell.innerHTML = '<button type="button" class="day-allbtn '+year+'-'+month+'-'+(i < 10 ? '0' + i : i)+'-allbtn " onclick="schedule_pop(\''+year+'\',\''+month+'\',\''+i+'\')" style="display:none;border:0;padding:0;background:transparent;color:inherit;font:inherit;cursor:pointer;">전체보기</button> <div class="day-n">'+i+'</div>'; //셀을 1부터 마지막 day까지 HTML 문법에 넣어줌
       //cell.setAttribute("onclick", "choose_day('" + i + "');");
        cell.classList.add("day");
        cell.classList.add(year + '-' + month + '-' + (i < 10 ? '0' + i : i));
        cnt = cnt + 1; //열의 갯수를 계속 다음으로 위치하게 해주는 역할
        if (cnt % 7 == 1) { /*일요일 계산*/
            //1주일이 7일 이므로 일요일 구하기
            //월화수목금토일을 7로 나눴을때 나머지가 1이면 cnt가 1번째에 위치함을 의미한다
            cell.innerHTML = '<div class="day-n">'+i+'</div>';
            //1번째의 cell에만 색칠
        }
        if (cnt % 7 == 0) { /* 1주일이 7일 이므로 토요일 구하기*/
            //월화수목금토일을 7로 나눴을때 나머지가 0이면 cnt가 7번째에 위치함을 의미한다
        	cell.innerHTML = '<div class="day-n">'+i+'</div>';
            //7번째의 cell에만 색칠
            row = calendar.insertRow();
            //토요일 다음에 올 셀을 추가
        }
        /*오늘의 날짜에 노란색 칠하기*/
        if (today.getFullYear() == date.getFullYear() &&
            today.getMonth() == date.getMonth() &&
            i == date.getDate()) {
            //달력에 있는 년,달과 내 컴퓨터의 로컬 년,달이 같고, 일이 오늘의 일과 같으면
            cell.classList.add('today');//td에는 today 클래스를 추가하고
//            cell.innerHTML += '<span class="today-circle"></span>';//안에 span을 만들어서 거기에 today-circle 클래스를 추가해라
            //cell.bgColor = "#FAF58C"; //셀의 배경색을 노랑으로 
        }
    }
}
function show_address(post, addr) {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            document.getElementById(post).value = data.zonecode;
            
            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
	            document.getElementById(addr).value = roadAddr;
               // document.getElementById("extraAddress").value = extraRoadAddr;
            } else {
	            document.getElementById(addr).value = data.jibunAddress;
               // document.getElementById("extraAddress").value = '';
            }

            var guideTextBox = document.getElementById("guide");
            
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if(data.autoRoadAddress) {
            	
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                //guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
               // guideTextBox.style.display = 'block';

            } else if(data.autoJibunAddress) {
            	
                var expJibunAddr = data.autoJibunAddress;
               //guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
               // guideTextBox.style.display = 'block';
            } else {
            	
               // guideTextBox.innerHTML = '';
               // guideTextBox.style.display = 'none';
            }
        }
    }).open();
}

/**
 * 주석
 */
const muAxios = (form, url, returnUrl=null) => {
	const formData = (form && form.tagName === "FORM") ? new FormData(form) : new FormData();
    for (const value of formData.values()) {
      console.log(value);
    }

	axios.post(url, formData, {
        headers: {
			//Content-Type': 'application/json'
        	'X-Requested-With': 'multipart/form-data'
    	}
    })
    .then(function (response) {
		console.log(response);
		if(response.status == 403){
			alert("세션이 만료되었습니다. 다시 로그인해주세요.");
			location.href = "/admin/";
		}
		if(response.status == 200){
 			if(response.data){
				if(response.data.msg){
					alert(response.data.msg);
				}
				if(response.data.isSuc === "success"){
					if(returnUrl){
						location.href = returnUrl;
					}else{
						window.location.reload();
					}
				}
			}
		}
    // response
    }).catch(function (error) {
    // 오류발생시 실행
    	throw new Error("axios error!");
    }).then(function() {
    // 항상 실행
    });
}

const muAxios2 = (form, data, url, returnUrl=null) => {
	const formData = (form && form.tagName === "FORM") ? new FormData(form) : new FormData();
	for (const value of formData.values()) {
		console.log("formData.values : " +value);
	}
	if(data){
		formData.append("content", data);
	}

	axios.post(url, formData, {
		headers: {
			//Content-Type': 'application/json'
			'X-Requested-With': 'multipart/form-data'
		}
	})
		.then(function (response) {
			console.log(response);
			if(response.status == 403){
				alert("세션이 만료되었습니다. 다시 로그인해주세요.");
				location.href = "/admin/";
			}
			if(response.status == 200){
				if(response.data){
					if(response.data.msg){
						alert(response.data.msg);
					}
					if(response.data.isSuc === "success" && returnUrl){
						location.href = returnUrl;
					}else if(response.data.isSuc === "success"){
						window.location.reload();
					}
				}
			}
			// response
		}).catch(function (error) {
		// 오류발생시 실행
		throw new Error("axios error!");
	}).then(function() {
		// 항상 실행
	});
}

const muMultiAxios = (form, data, url, returnUrl=null) => {
	const formData = (form && form.tagName === "FORM") ? new FormData(form) : new FormData();
	for (const value of formData.values()) {
		console.log(value);
	}
	if(data) {
		for(let i=0; i<data.length; i++){
			formData.append("content"+[i+1], data[i]);
		}
	}
	axios.post(url, formData, {
		headers: {
			//Content-Type': 'application/json'
			'X-Requested-With': 'multipart/form-data'
		}
	})
		.then(function (response) {
			console.log(response);
			if(response.status == 403){
				alert("세션이 만료되었습니다. 다시 로그인해주세요.");
				location.href = "/admin/";
			}
			if(response.status == 200){
				if(response.data){
					if(response.data.msg){
						alert(response.data.msg);
					}
					if(response.data.isSuc === "success" && returnUrl){
						location.href = returnUrl;
					}else if(response.data.isSuc === "success"){
						window.location.reload();
					}
				}
			}
			// response
		}).catch(function (error) {
		// 오류발생시 실행
		throw new Error("axios error!");
	}).then(function() {
		// 항상 실행
	});
}

const onloadSummernote = () =>{
	$('.summernote').summernote({
		height: 300,                 // 에디터 높이
		minHeight: null,             // 최소 높이
		maxHeight: null,             // 최대 높이
		focus: false,                  // 에디터 로딩후 포커스를 맞출지 여부
		lang: "ko-KR",					// 한글 설정
		placeholder: '내용을 입력해주세요.',	//placeholder 설정
		toolbar: [
			// [groupName, [list of button]]
			['fontname', ['fontname']],
			['fontsize', ['fontsize']],
			['style', ['bold', 'italic', 'underline','strikethrough', 'clear']],
			['color', ['color']],
			['table', ['table']],
			['para', ['ul', 'ol', 'paragraph']],
			['height', ['height']],
			['insert',['hr','picture','link','video']],
			['view', ['codeview', 'fullscreen', 'help']]
		],
		styleTags: [
			'p',
			{ title: 'Blockquote', tag: 'blockquote', className: 'blockquote', value: 'blockquote' },
			'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
		],
		fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New','맑은 고딕','궁서','굴림체','굴림','돋움체','바탕체'],
		fontSizes: ['8','9','10','11','12','14','16','18','20','22','24','28','30','36','50','72'],
		popover: {
			image: [
				['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
				['float', ['floatLeft', 'floatRight', 'floatNone']],
				['remove', ['removeMedia']]
			],
			link: [
				['link', ['linkDialogShow', 'unlink']]
			],
			table: [
				['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
				['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
			],
			air: [
				['color', ['color']],
				['font', ['bold', 'underline', 'clear']],
				['para', ['ul', 'paragraph']],
				['table', ['table']],
				['insert', ['link', 'picture']]
			]
		},
		callbacks: {
			onImageUpload : function(files, editor, welEditable){

				// 파일 업로드(다중업로드를 위해 반복문 사용)
				for (var i = files.length - 1; i >= 0; i--) {
					uploadSummernoteImageFile(files[i],
						this);
				}
			}
		}
	});
}

function uploadSummernoteImageFile(file, el) {
	var data = new FormData();
	data.append("file",file);
	$.ajax({
		url: '/admin/summer_image.do',
		type: "POST",
		enctype: 'multipart/form-data',
		data: data,
		cache: false,
		contentType : false,
		processData : false,
		success : function(data) {
			if(data.responseCode === "error"){
				alert(data.message || "업로드할 수 없는 파일입니다.");
				return;
			}
			$(el).summernote('editor.insertImage', data.url);
			console.log(data);
			// const json = JSON.parse(data);
			/*console.log(json);
            $(el).summernote('editor.insertImage',json["url"]);
            jsonArray.push(json["url"]);
            jsonFn(jsonArray);*/
		},
		error : function(e) {
			console.log(e);
		}
	});
}

/**
 *  @params String param String url;
 * */
function ChkQueryString(param, url){

	const urlParams = new URLSearchParams(window.location.search);
	if(!urlParams.has(param)){
		alert("잘못된 접근 경로입니다.");
		location.href = url;
	}

}

//오늘 날짜 세팅.
function setToday(){
	let today = new Date();
	let year = today.getFullYear(); // 년도
	let month = (today.getMonth() + 1).toString();
	if(month.length === 1){
		month = '0' + (today.getMonth() + 1);
	}
	let date = today.getDate().toString();  // 날짜
	if(date.length === 1){
		date =  '0' + today.getMonth();
	}
	document.querySelector("input#date").value = year + '-' + month + '-' + date;
}

const dDayMillisecond=()=>{

	const simpleToday = new Date();
	const tomorrow = new Date(simpleToday.setDate(simpleToday.getDate() + 1));

	const dday = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()).getTime();
	const today = new Date().getTime();
	const gap = dday - today;
	const hour = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
	const sec = Math.ceil((gap % (1000 * 60)) / 1000);

	let a, b, c;
	a = hour === 0 ? 0 : hour * 60 * 60 * 1000;
	b = min === 0 ? 0 : 1000 * 60 * min;
	c = sec === 0 ? 0 : 1000 * sec;

	console.log(a+b+c);
}
