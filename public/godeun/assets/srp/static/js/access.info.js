/*
이름		: 접속 기기 정보
버전		: 1.1
날짜		: 2017.05.17 
설명		: 접속한 디바이스 정보 알아오기.
작성자	: 심재원

####### CONST #######
FACEFACEBOOK- 페이스북
KAKAOSTORY	- 카카오스토리
KAKAOTALK	- 카카오톡
LINE		- 라인
NAVER_APP	- 네이버앱
DAUM_APP	- 다음앱

####### Method #######
getInAppName():String		- 인앱으로 접속시 인앱 이름을 String 으로 반환, 위 정의된 상수와 비교하면 된다.
isFacebookApp():boolean		- 페이스북 인앱 접속 여부
isKakaostoryApp():boolean	- 카카오스토리 인앱 접속 여부
isKakaotalkApp():boolean	- 카카오톡 인앱 접속 여부
isLineApp():boolean			- 라인 인앱 접속 여부
isNaverApp():boolean		- 네이버앱 인앱 접속 여부
isDaumApp():boolean			- 다음앱 인앱 접속 여부
isInApp():boolean			- 위 열거된 인앱 접속 여부
isIOS():boolean				- IOS 접속 여부
isHttps():boolean			- SSL 접속 여부
isMobile():boolean			- 모바일 기기로 접속했는지 여부
getUserAgent():String		- UserAgent 를 반환
getCurrentFileName():String - 현재 접속중인 파일명 반환( 쿼리 스트링은 무시 )
getFullDomain():String		- 현재 접속한 사이트의 풀도메인을 반환( ex:https://test.com )
*/

(function() {
	var root = this;

	var AccessInfo = function(){
		//내부 변수 정의
		this.userAgent = navigator.userAgent.toLowerCase();
	}
	
	//상수 정의
	AccessInfo.prototype = {
		get FACEBOOK(){ return "facebook"; },
		get KAKAOSTORY(){ return "kakaostory"; },
		get KAKAOTALK(){ return "kakaotalk"; },
		get LINE(){ return "line"; },
		get NAVER_APP(){ return "naverapps"; },
		get DAUM_APP(){ return "daumsapps"; }
	}
	
	AccessInfo.prototype.isFacebookApp = function(){ 
		return (/fb_|fban/i.test(this.userAgent.toLowerCase()));
	}
	
	AccessInfo.prototype.isKakaostoryApp = function(){ 
		return (/kakaostory/i.test(this.userAgent.toLowerCase()));
	}

	AccessInfo.prototype.isKakaotalkApp = function(){ 
		return (/kakaotalk/i.test(this.userAgent.toLowerCase()));
	}

	AccessInfo.prototype.isLineApp = function(){ 
		return (/line/i.test(this.userAgent.toLowerCase()));
	}

	AccessInfo.prototype.isNaverApp = function(){ 
		return (/naver/i.test(this.userAgent.toLowerCase()));
	}

	AccessInfo.prototype.isDaumApp = function(){ 
		return (/daumapps/i.test(this.userAgent.toLowerCase()));
	}
	
	AccessInfo.prototype.isHttps = function(){ 
		return document.location.protocol == "http:" ? false : true;
	}
	
	AccessInfo.prototype.isIOS = function(){ 
		return (/iPad|iPhone|iPod/i.test(this.userAgent.toLowerCase()) && !window.MSStream);
	}

	AccessInfo.prototype.isInApp = function(){ 
		if( this.isFacebookApp() || this.isKakaostoryApp() || this.isKakaotalkApp() || this.isLineApp() || this.isNaverApp() || this.isDaumApp() ){
			return true;
		}else{
			return false;
		}
	}

	AccessInfo.prototype.isMobile = function(){ 
		return (/iphone|ipad|ipod|android|blackberry|windows ce|nokia|webos|opera mini|sonyericsson|opera mobi|iemobile|lg|mot|samsung|sonyericsson/i.test(this.userAgent.toLowerCase()));
	}
	
	AccessInfo.prototype.getInAppName = function(){ 
		var inappName = "";

		if( this.isInApp() ){
			if( this.isFacebookApp() ){
				inappName = this.FACEBOOK;
			}else if( this.isKakaostoryApp() ){
				inappName = this.KAKAOSTORY;
			}else if( this.isKakaotalkApp() ){
				inappName = this.KAKAOTALK;
			}else if( this.isLineApp() ){
				inappName = this.LINE;
			}else if( this.isNaverApp() ){
				inappName = this.NAVER_APP;
			}else if( this.isDaumApp() ){
				inappName = this.DAUM_APP;
			}else{
				inappName = "";
			}
		}

		return inappName;
	}

	AccessInfo.prototype.getUserAgent = function(){ return this.userAgent; }
	
	AccessInfo.prototype.getCurrentFileName = function(){ 
		var _url = document.URL;
		return _url.substring(_url.lastIndexOf("/") + 1, _url.length);
	}
	
	AccessInfo.prototype.getFullDomain = function(){ 
		return document.location.protocol + "//" + document.location.host;
	}

	root.AccessInfo = new AccessInfo();
}).call(this);

