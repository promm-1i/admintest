//게시판 페이지 바로가기
function goto_page( pageNum, formName ){
	var fm = document.getElementById(formName);
	
	if( !fm ) fm = document.getElementById("listfm");

	if( !fm ){ alert("일치하는 Form Name 없음."); return; }
	
	if(!fm.page){
		var pageInput = document.createElement("input");
		pageInput.type = 'hidden';
		pageInput.name = 'page';
		fm.appendChild( pageInput );
	}

	fm.page.value = pageNum;

	fm.submit();
}

//클립보드 버튼 설정
function set_clipboard_button(){
	$(".clipboard").attr("data-clipboard-text", location.href);
	
	var clipboard = new ClipboardJS('.clipboard');

	clipboard.on('success', function(e) {
		alert("현재 게시물 URL이 복사되었습니다.");

		e.clearSelection();
	});

	clipboard.on('error', function(e) {
		alert("현재 게시물 URL복사에 실패했습니다.\n주소창에서 직접 복사해주세요.");
	});
}

/*
input에 숫자만 입력되도록. - onlyNumberInput( String ):void
className - 클래스명
*/
function onlyNumberInput( className ){
	if( !className || className == "" ) throw "onlyNumberInput() params is empty.";
	try{ className = trim(className); }catch(e){}

	try{
		$("." + className ).keyup( function(){
			this.value =this.value.replace(/[^0-9\.]/g,"");
			this.value =this.value.replace(/[.]/g,"");
		});
	}catch(e){
		console.log("onlyNumberInput() : Jquery is not loaded..");
	}
}

function getQueryStringToJson( queryString ){
	var params = {};

	if( !queryString ) queryString = window.location.search;
	if( queryString == "" ) return params;
	try{ queryString = trim(queryString); }catch(e){}
	
	if( queryString.indexOf("?") != 0 ) queryString = "?" + queryString;

	try{
		queryString.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { 
			params[decodeURIComponent( key )] = decodeURIComponent( value );  
		});
	}catch(e){
		params = {error:queryString};
	}
	
	return params;
}

//공유하기
function share_talk(){
	var share_url = location.href;

	Kakao.Share.sendDefault({
		objectType: 'feed',
		content: {
			title: $("title").text(),
			description: $("meta[name=description]").attr("content"),
			imageUrl: $("meta[property='og:image']").attr("content"),
			link: {
				mobileWebUrl: share_url,
				webUrl: share_url,
			},
		},

		buttons: [{
			title: '자세히 보기',
			link: {
				mobileWebUrl: share_url,
				webUrl: share_url,
			},
		}]
	});
}

function share_fb(){
	var share_url = encodeURIComponent(location.href);

	window.open('https://www.facebook.com/sharer.php?u=' + share_url, 'share','toolbar=0,status=0,width=655,height=520');
}

function share_band( title ){
	if( title ) {
		var share_title = encodeURIComponent(title);
	}else{
		var share_title = encodeURIComponent($("title").text());
	}
	
	var share_url = encodeURIComponent(location.href);

	var url = "http://www.band.us/plugin/share?body="+share_title+"&route="+share_url;
    
	window.open(url, 'share','toolbar=0,status=0,width=655,height=520');
}


/* 
쿠키 구하기 - getCookie( String ):String 
name - 쿠키 이름.
*/
function getCookie( name ) {
	if( !name || name == "" ) throw "cookie name is required.";
	try{ name = trim(name); }catch(e){}

	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length ) {
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) {
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) 
				endOfCookie = document.cookie.length;

			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 )
			break;  
	}
	return "";
}

/* 
쿠키 설정 (일 단위 기준) - setCookie( String, *, Number ):Void
name - 쿠키이름
value - 값
expiredays - 보존기간( 일 단위 )
*/
function setCookie( name, value, expiredays ){ 
	if( !name || name == "" ) throw "cookie name is required.";
	if( !value ) value = "";
	try{ name = trim(name); }catch(e){}
	try{ value = trim(value); }catch(e){}

	try{
		expiredays = Number( expiredays );
	}catch(e){
		expiredays = 1;
	}
	
	var todayDate = new Date(); 
	todayDate.setDate( todayDate.getDate() + expiredays ); 
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
}


$(document).ready(function(){
	onlyNumberInput("onlyNumber");
	
	set_clipboard_button();
	
});

