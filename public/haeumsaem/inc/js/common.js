
!function(){"use strict";function r(){function e(){var r={width:u.width/u.naturalWidth,height:u.height/u.naturalHeight},a={width:parseInt(window.getComputedStyle(u,null).getPropertyValue("padding-left"),10),height:parseInt(window.getComputedStyle(u,null).getPropertyValue("padding-top"),10)};i.forEach(function(e,t){var n=0;o[t].coords=e.split(",").map(function(e){var t=1==(n=1-n)?"width":"height";return a[t]+Math.floor(Number(e)*r[t])}).join(",")})}function t(e){return e.coords.replace(/ *, */g,",").replace(/ +/g,",")}function n(){clearTimeout(d),d=setTimeout(e,250)}function r(e){return document.querySelector('img[usemap="'+e+'"]')}var a=this,o=null,i=null,u=null,d=null;"function"!=typeof a._resize?(o=a.getElementsByTagName("area"),i=Array.prototype.map.call(o,t),u=r("#"+a.name)||r(a.name),a._resize=e,u.addEventListener("load",e,!1),window.addEventListener("focus",e,!1),window.addEventListener("resize",n,!1),window.addEventListener("readystatechange",e,!1),document.addEventListener("fullscreenchange",e,!1),u.width===u.naturalWidth&&u.height===u.naturalHeight||e()):a._resize()}function e(){function t(e){e&&(!function(e){if(!e.tagName)throw new TypeError("Object is not a valid DOM element");if("MAP"!==e.tagName.toUpperCase())throw new TypeError("Expected <MAP> tag, found <"+e.tagName+">.")}(e),r.call(e),n.push(e))}var n;return function(e){switch(n=[],typeof e){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(e||"map"),t);break;case"object":t(e);break;default:throw new TypeError("Unexpected data type ("+typeof e+").")}return n}}"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&"object"==typeof module.exports?module.exports=e():window.imageMapResize=e(),"jQuery"in window&&(window.jQuery.fn.imageMapResize=function(){return this.filter("map").each(r).end()})}();

// modal
! function(t) {
    var n = {
            show: !0,
            backdrop: !0,
            backdropClick: !0,
            keyboard: !0,
            autoPosition: !0,
            dialogMarginTop: 20,
            width: null,
            top: null,
            left: null
        },
        o = {
            BACKDROP: "modal-backdrop",
            OPEN: "modal-open",
            FADE: "fade",
            IN: "in"
        },
        i = {
            MODAL: ".modal",
            DIALOG: ".modal-dialog",
            CONTENT: ".modal-content",
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]'
        };
    t.fn.modal = function(e) {
        function s() {
            var n = t(window).height(),
                o = r.find(i.DIALOG).height(),
                e = n / 2 - o / 2;
            e < g.settings.dialogMarginTop && (e = g.settings.dialogMarginTop), g.settings.top && (e = g.settings.top), t(i.DIALOG).css({
                marginTop: e
            })
        }

        function a() {
            t(document).off("focusin").on("focusin", function(n) {
                f === n.target || t(f).has(n.target).length || f.focus()
            })
        }

        function d() {
            t(document).find("." + o.BACKDROP).length || t(h).appendTo(document.body)
        }

        function c() {
            t("." + o.BACKDROP).remove(), h = null
        }

        function u() {
            //t(document.body).addClass(o.OPEN), 
			var zIndex = '';
			$('.modal').each(function(){
				if($(this).css('display') == 'block') {
					if(zIndex < $(this).css('z-index')) {
						zIndex = $(this).css('z-index');
					}
				}
			});
			
			
			d(), r.show(), g.settings.width && t(i.DIALOG).css({
                width: g.settings.width,
                marginLeft: "auto",
                marginRight: "auto"
            }), t(i.DIALOG).css({
                marginLeft: g.settings.left
            }), g.settings.autoPosition && s(), a(), r.focus()

			//$('.modal-dialog').css('max-width',$('.modal-wrap').css('max-width'));
			$('body').css('overflow','hidden');
			if (zIndex != '') {
				r.css('z-index',zIndex*1+2);
				$('.modal-backdrop').css('z-index',zIndex*1+1);
			}
        }

        function l() {
            t(document.body).removeClass(o.OPEN), c(), r.hide(), t(i.DIALOG).css("margin-top", ""), t(document).off("focusin")
			
			$('body').css('overflow','visible');
        }
        if (0 === this.length) return this;
        if (this.length > 1) return this.each(function() {
            t(this).modal(e)
        }), this;
        var g = {},
            r = this,
            f = r[0],
            h = null,
            m = function() {
                g.settings = t.extend({}, n, e), r.attr("tabindex", "-1"), g.settings.backdrop ? (h = document.createElement("div"), h.className = o.BACKDROP) : h = null, r.on("click", function(t) {
                    //t.target === t.currentTarget && g.settings.backdrop && g.settings.backdropClick && l()
                    t.target === t.currentTarget && g.settings.backdrop && g.settings.backdropClick && l()
                }), g.settings.keyboard && t(document.body).on("keydown", function(t) {
                    27 === t.which && l()
                })
            };
        return m(), g.settings.show ? u() : l(), t(window).bind("resize", function() {
            s()
        }), this
    }, t(document).on("click", i.DATA_TOGGLE, function(n) {
        var o = t(this).attr("data-target");
        "A" === this.tagName && n.preventDefault(), t(o).modal();
    }), t(document).off().on("click", i.DATA_DISMISS, function() {

		var zIndex = '';
		var zIndexArr = [];
		var el;

		$('.modal').each(function(){
			if($(this).css('display') == 'block') {
				if (zIndex == '' || zIndex < $(this).css('z-index')) {
					zIndex = $(this).css('z-index');
					el = this;
				}
				zIndexArr.push($(this).css('z-index'));
			}
		});
		//console.log('최대 z-index : '+$(el).css('z-index'));
		//console.log(zIndexArr);

		for(let i = 0; i < zIndexArr.length; i++) {
			if(zIndexArr[i] === $(el).css('z-index'))  {
				zIndexArr.splice(i, 1);
				i--;
			}
		}

		//console.log(zIndexArr);

		var maxValue = Math.max.apply(null, zIndexArr);

		$(el).hide();

		var backdropRemove = true;
		if (zIndexArr.length > 0) {
			backdropRemove = false;
			$('.modal-backdrop').css('z-index',maxValue*1-1);
		} else {
			
		}
	/*
		$('.modal').each(function(){
			if($(this).css('display') == 'block') {
				backdropRemove = false;
				return false;
			}
		});
	*/

		if (backdropRemove) {
			$('.modal-backdrop').remove();
			$('body').css('overflow','visible');
		}
		
		

		//console.log(event);
		/*
        t(i.MODAL).modal({
            show: !1
        })
		return false;
		*/
    })
}(jQuery);


//공통값
var loadingYn = 'Y';
var subMenuViewYn = 'N';


//* LNB Navigation */
function activeLNB(id, cnt, n) {
	for(num=1; num<=parseInt(cnt); num++) {
		$("#Um"+num).removeClass("current"); 
		$("#Lm"+num).css("visibility", "hidden"); 
		$("#Lm"+num).css("display", "none"); 
	}
	$("#Um"+n).addClass("current"); 
	$("#"+id).css("visibility", "visible"); //해당 ID만 보임
	$("#"+id).css("display", "block"); //해당 ID만 보임
}

function onblueLNB(id) {
	$("#"+id).css("visibility", "hidden");
	$("#"+id).css("display", "none");
}   
/*기본형 스타일 끝*/


/*헤더 DropDown style*/


//* LNB Navigation */
function activeLNB1(id, cnt, n) {
	$("#Um"+n).addClass("current"); 
 
	for(num=1; num<=parseInt(cnt); num++) {
		if (subMenuViewYn=='N') {
			$("#Lm1"+num).show().animate({height:'200px'},300); 
		}
	}
	if (subMenuViewYn=='N') {
		$('#subMenuBg').slideDown(300);
		$('#lnb1').height('240');
		$('#subMenuBgBottom').css('display','block');
		$('.dimmed').show();
	}
	subMenuViewYn='Y';
	$('#showYn').text(subMenuViewYn);

}

function onblueLNB1(cnt, n) {
	$("#Um"+n).addClass("current"); 
	for(num=1; num<=parseInt(cnt); num++) {
		if (subMenuViewYn=='Y') {
			$("#Lm1"+num).animate({height:'0px'},100); 
		}
	}
	if (subMenuViewYn=='Y') {
		$('#subMenuBg').slideUp(100);
		$('#lnb1').animate({height:'71px'},100);
		$('#subMenuBgBottom').css('display','none');
		$('.dimmed').hide();
	}
	subMenuViewYn='N';
	$('#showYn').text(subMenuViewYn);

}  
/*퓨처헤더 style 끝*/

function activeLNBM(id, cnt) {
	for(num=1; num<=parseInt(cnt); num++) {
		$("#Lm"+num).css("visibility", "visible"); 
	}
}
function activeLNBM1(id, cnt) {
	for(num=1; num<=parseInt(cnt); num++) {
		$("#Lm1"+num).css("visibility", "visible"); 
	}
}






/* image rollover */
$(document).ready(function() {
   $("img.rollover").mouseover(function() {
	 $(this).attr("src", $(this).attr("src").replace("_off","_on")); 
   });
   $("img.rollover").mouseout(function() {
	 $(this).attr("src", $(this).attr("src").replace("_on", "_off"));
   }); 
});

//처리후 마무리하는 script
/*
0:결과 기호 OK / 그외
1:결과메세지
2:link주소
3:함수명
*/
function scriptEnd(v) {
	var vSplit = v.split('||');
	var vLen = vSplit.length;
	if (vSplit[0]=='OK') {
		if (vSplit[1]!='') {
			alert(vSplit[1]);
		}
		if (vSplit[2]!='') {
			linkScript(vSplit[2]);
		}
		if (vLen>3) {
			for (ii=3;ii<vLen;ii++) {
				scriptExec(vSplit[ii]);
			}
		}
	} else {
		alert(v);
	}
}
function scriptExec(fnExe) {
	alert(fnExe);
	fnExe;
}
function linkScript(v) {
	location.href=v;
}

function getCookie(strName) {
	var strArg = new String(strName + "=");	
	var nArgLen, nCookieLen, nEnd;
	var i = 0, j;	
	nArgLen    = strArg.length;
	nCookieLen = document.cookie.length;	
	if(nCookieLen > 0) {	
		while(i < nCookieLen) {		
			j = i + nArgLen;			
			if(document.cookie.substring(i, j) == strArg) {			
				nEnd = document.cookie.indexOf (";", j);				
				if(nEnd == -1) nEnd = document.cookie.length;				
				return unescape(document.cookie.substring(j, nEnd));			 
			}			
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0) break;
		}
	}	
	return("");
}

function setCookie( name, value, expiredays ) {
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function closeWinPop(getID, dd){ 
	if ($('#popWin'+getID).is(':checked') == true) {
		setCookie('WP'+getID, "done" ,dd );
	}
	window.close();
}
function closeLayerPop(getID, dd){ 
	if ($('#popLayer'+getID).is(':checked') == true) {
		setCookie('LP'+getID, "done" ,dd );
	}
	$("#layer_popup"+getID).hide();
	$(".popupBg").hide();
	$('body').css('overflow-y', 'auto');
}


//레이어 팝업 열기
function openLayer(IdName, tpos, lpos){
	$('#bgClose').css('height', $(document).height()+'px');
	$('#bgClose').css('display', 'block');

	var pop = document.getElementById(IdName);
	var scrollPos = ($(document).scrollTop());
	pop.style.display = "block";
	if (tpos=='') {
		var iHeight = ($(window).height() - $('#'+IdName).outerHeight())/2;
		pop.style.top = (iHeight+scrollPos) + "px";
	} else {
		pop.style.top = tpos + "px";
	}
	if (lpos=='') {
		var iWidth = ($(window).width() - $('#'+IdName).outerWidth())/2;
		pop.style.left = iWidth + "px";
	} else {
		pop.style.left = lpos + "px";
	}
}

//레이어 팝업 닫기
function closeLayer(IdName){
	var pop = document.getElementById(IdName);
	pop.style.display = "none";
	$('#bgClose').css('display', 'none');
}

function layerPopViewEnd(v) {
	openLayer('popView','','');
}

//레이어 중앙정렬
function centerLayer(divid) {
	var pop = document.getElementById(divid);
	var scrollPos = ($(document).scrollTop());

	var iHeight = ($(window).height() - $('#'+divid).outerHeight())/2;
	var iWidth = ($(window).width() - $('#'+divid).outerWidth())/2;
	pop.style.top = (iHeight+scrollPos) + "px";
	pop.style.left = iWidth + "px";
}

function fnOpenLayer(IdName){
	$('#'+IdName).show();
	var posTop = ($(window).height() - $('#'+IdName+' .pop_contents').height())/2;
	var posLeft = ($(window).width() - $('#'+IdName+' .pop_contents').width())/2;

	$('#'+IdName+' .pop_contents').css({'top':posTop+'px' , 'left':posLeft+'px'});
	$('body').css('overflow','hidden');
}
function fnCloseLayer(IdName){
	$('#'+IdName).hide();
	$('body').css('overflow','auto');
}

//체크박스 공통함수
function checkToggle(chkid, chknm) {
	if ($('#'+chkid).is(':checked')==true) {
		$('input:checkbox[id^='+chknm+']').prop('checked',true);
	} else {
		$('input:checkbox[id^='+chknm+']').prop('checked',false);
	}
}

function checkToggle2(obj, chknm) {
	if (obj) {
		$('input:checkbox[id^='+chknm+']').prop('checked',true);
	} else {
		$('input:checkbox[id^='+chknm+']').prop('checked',false);
	}
}

//ajax 처리 
function ajaxProc(divid, frmnm, urlLink, pa, returnData) {
	if (frmnm!='') {
		if (pa!='') {
			pa = $('#'+frmnm).serialize() + '&'+ pa;
		} else {
			pa = $('#'+frmnm).serialize();
		}
	}
	if (loadingYn=='Y') {
		$('#loading').show();
	}
	$.ajax({
		url : urlLink
		,type : 'POST'
		,dataType : 'html'
		,contentType :"application/x-www-form-urlencoded;charset=UTF-8"
		,data : pa
		,beforeSend: function() {
		}
		,success : function(data) {
			$('#loading').hide();
			if (divid!='') {
				$('#'+divid).html(data);
			}
			if (returnData != '') {
				returnData(data);
			}
		}
		,error : function(xhr, ajaxOptions, thrownError) {
			$('#loading').hide();
			alert(xhr.status + " : " + thrownError);
		}

	});
}


//ajax 처리 
function ajaxJsonProc(divid, frmnm, urlLink, pa, returnData) {
	if (frmnm!='') {
		if (pa!='') {
			pa = $('#'+frmnm).serialize() + '&'+ pa;
		} else {
			pa = $('#'+frmnm).serialize();
		}
	}
	if (loadingYn=='Y') {
		$('#loading').show();
	}
	$.ajax({
		url : urlLink
		,type : 'POST'
		,dataType : 'json'
		,contentType :"application/x-www-form-urlencoded;charset=UTF-8"
		,data : pa
		,beforeSend: function() {
		}
		,success : function(data) {
			$('#loading').hide();
			if (divid!='') {
				$('#'+divid).html(data);
			}
			if (returnData != '') {
				returnData(data);
			}
		}
		,error : function(xhr, ajaxOptions, thrownError) {
			$('#loading').hide();
			alert(xhr.status + " : " + thrownError);
		}

	});
}

//ajax 이미지 form 업로드 처리 
function ajaxMultiProc(divid, returnData) {
	if (loadingYn=='Y') {
		$('#loading').show();
	}
	$('#'+divid).ajaxSubmit({
		type:"POST",
		dataType:"html",
		contentType :"application/x-www-form-urlencoded;charset=UTF-8",
		beforeSend: function() {
		},
		uploadProgress: function(event, position, total, percentComplete) {
		},
		success: function( data ){
			$('#loading').hide();
			returnData(data);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			$('#loading').hide();
			alert(xhr.status + " : " + thrownError);
		}
	});
}


//ajax 이미지 form 업로드 처리 
function ajaxFileUploadProc(divid, fileRef, returnData) {
	loadingYn = 'Y';
	if (loadingYn=='Y') {
		$('#loading').show();
	}

	var form = new FormData();
	form.append( "file", $("#"+divid)[0].files[0] );
	form.append( "fileRef", fileRef );
	
	 jQuery.ajax({
		 url : "/_Prog/common/fileUpload.php"
	   , type : "POST"
	   , processData : false
	   , contentType : false
	   , data : form
	   , success:function(data) {
		   $('#loading').hide();
			
			if (returnData != '') {
				returnData(data);
			}
	   }
	   ,error: function (jqXHR) 
	   { 
		   alert(jqXHR.responseText); 
	   }
   });
}


/*sns 연동 관련*/
function pstTwitter(msg,url) {
	var href = "http://twitter.com/share?text=" + encodeURIComponent(msg) + "&url=" + encodeURIComponent(url);
	var a = window.open(href, 'twitter', 'width=466, height=356');
	if ( a ) {
		a.focus();
	}
}
function pstMe2Day(msg,url,tag) {
	var href = "http://me2day.net/posts/new?new_post[body]=" + encodeURIComponent(msg) + " " + encodeURIComponent(url) + "&new_post[tags]=" + encodeURIComponent(tag);
	var a = window.open(href, 'me2Day', 'width=466, height=356');
	if ( a ) {
		a.focus();
	}
}

//페이스북은 og 태그를 변경해야 함
function pstFaceBook(msg,url, tag, img) {
	//var href = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url) + "&t=" + encodeURIComponent(msg) +"&i="+ encodeURIComponent(tag);
	var href="";
	href = "http://www.facebook.com/sharer/sharer.php?u="+ encodeURIComponent(url);
     //          +"&p[images][0]="+ encodeURIComponent(img) 
     //          +"&p[title]="+ encodeURIComponent(msg) 
     //          +"&p[summary]="+encodeURIComponent(tag);
    //href = href.split("#").join("%23");
    
	//href = encodeURI(href);
//	alert(href);
//return;
	var a = window.open(href, 'facebook', 'width=466, height=356');
	if ( a ) {
		a.focus();
	}
}

function pstYozmDaum(link,prefix,parameter) {
	var href = "http://yozm.daum.net/api/popup/prePost?link=" + encodeURIComponent(link) + "&prefix=" + encodeURIComponent(prefix);
	var a = window.open(href, 'yozm', 'width=466, height=356');
	if ( a ) {
		a.focus();
	}
}

function pstTwitterMobile(msg,url) {
	var href = "http://twitter.com/intent/tweet?p__g=i__n&text=" + encodeURIComponent(msg) + " " + encodeURIComponent(url);
	var a = window.open(href, 'twitter', 'width=466, height=356');
	if ( a ) {
		a.focus();
	}
}
function pstFaceBookMobile(msg,url, tag, img) {
	//var href = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url) + "&t=" + encodeURIComponent(msg) +"&i="+ encodeURIComponent(tag);
	var href="";
	href = "http://m.facebook.com/sharer.php?p__g=i__n&s=100&u="+ encodeURIComponent(url);
    //href = href.split("#").join("%23");

	//href = encodeURI(href);
	//alert(href);

	var a = window.open(href, 'facebook', 'width=466, height=356');
	if ( a ) {
		a.focus();
	}
}

function pstNaverBlog(msg,url, tag, img) {
	var href="";
	href = "http://blog.naver.com/ScrapForm.nhn?blogId=naver&source_type=3&title="+msg+"&source_url="+encodeURIComponent(url);
	var a = window.open(href, 'facebook', 'width=466, height=356');
	if ( a ) {
		a.focus();
	}
}

function snsCon(g, msg, url, tag, img) {
	if (g=="tw") {
		pstTwitter(msg,url);
	} else if (g=="fb") {
		pstFaceBook(msg,url, tag, img);
	} else if (g=="mt") {
		pstMe2Day(msg,url,tag);
	} else if (g=="yz") {
		pstYozmDaum(url,msg, '')
	} else if (g=="nb") {
		pstNaverBlog(msg,url, '')
	}
}

function snsConMobile(g, msg, url, tag, img) {
	if (g=="tw") {
		pstTwitterMobile(msg,url);
	} else if (g=="fb") {
		pstFaceBookMobile(msg,url, tag, img);
	}
}

//kakao init 을 실행한후 실행해야함
function kakaoTalkShare(tit, desc, img, linkUrl) {
	Kakao.Link.sendDefault({
		objectType: 'feed',
		content: {
		  title: tit,
		  description: desc,
		  imageUrl: img,
		  link: {
			mobileWebUrl: linkUrl,
			webUrl: linkUrl
		  }
		},
		buttons: [
		  {
			title: '웹으로 보기',
			link: {
			  mobileWebUrl: linkUrl,
			  webUrl: linkUrl
			}
		  },
		  {
			title: '앱으로 보기',
			link: {
			  mobileWebUrl: linkUrl,
			  webUrl: linkUrl
			}
		  }
		]
	});
	/*
	Kakao.Link.sendTalkLink({
		label: tit,
		image: {
			src : img,
			width : '300',
			height : '200'
		}
	});
	*/
}

/** ------------------------------------------------------------------------------------------------
fnOnlyNumber() - 숫자만입력을받는다 
사용예)
onkeydown="return onlyNumber(event);" onkeyup="removeChar(event);" style="ime-mode:disabled;"
 ------------------------------------------------------------------------------------------------**/
function onlyNumber(event){
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 || keyID == 190 || keyID == 110 || keyID == 109 || keyID == 45 || keyID == 189  || keyID == 9)  
		return;
	else
		return false;
}
function removeChar(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
		return;
	else
		event.target.value = event.target.value.replace(/[^-\.\,0-9]/g, "");
}

// 영어 / 숫자 / 특수문자만 입력 가능 (값 리셋)
function fnOnlyEngNumberSpecial(objID){
	$(objID).keyup(function(event){
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^a-z0-9-@._!)(#$]/gi,''));
        }
    });
}

function numberViewKorean(viewId, num, unit) {	
	var hanA = new Array("","일","이","삼","사","오","육","칠","팔","구","십"); 
	var danA = new Array("","십","백","천","","십","백","천","","십","백","천","","십","백","천"); 
	var result = ""; 
	num = num.replace(/,/g,'');
	for(i=0; i<num.length; i++) {	
		str = ""; 
		han = hanA[num.charAt(num.length-(i+1))]; 
		if(han != "") str += han+danA[i]; 
		if(i == 4) str += "만"; 
		if(i == 8) str += "억"; 
		if(i == 12) str += "조"; 
		result = str + result; 
	} 
	if (num != 0) {
		result = result + " "+ unit; 
	}
	//return result ; 
	$('#'+viewId).text(result);
}

function regChk(f, ty){
	var msg='';
	if (ty=='kor') {
		regexp = /^[\ㄱ-ㅎ ㅏ-ㅣ 가-힣\s]+$/;
		msg = '한글만';
	} else if (ty=='num') {
		regexp = /^[0-9]+$/;
		msg = '숫자만';
	} else if (ty=='eng') {
		regexp = /^[a-zA-Z\s]+$/;
		msg = '영문만';
	} else if (ty=='numeng') {
		regexp = /^[a-zA-Z0-9]+$/;
		msg = '숫자와 영문만';
	} else if (ty=='koreng') {
		regexp = /^[가-힣a-zA-Z]+$/;
		msg = '한글과 영문만';
	}
	v = $('#'+f).val();
	if( !regexp.test(v) ) {
		if (event.keyCode==8 || event.keyCode==9 || event.keyCode==37 || event.keyCode==39 || event.keyCode==46 ) {
		} else {
			alert(msg+"입력하세요");
			$('#'+f).val('');
		}
	}
	/*
	if((event.keyCode < 12592) || (event.keyCode > 12687)){
		alert("한글만 입력이 가능합니다.");
		//f = '';
		event.returnValue = false
	}
	*/
}

function fnCheckPassword(upw) {
	regexp = /^[a-zA-Z0-9]{6,20}$/;
    if(!regexp.test(upw)) { 
        alert('비밀번호는 숫자와 영문자 조합으로 6~12자리를 사용해야 합니다.'); 
        return;
    }
  
    var chk_num = $('#'+upw).val().search(/[0-9]/g); 
    var chk_eng = $('#'+upw).val().search(/[a-z]/ig); 
    if(chk_num < 0 || chk_eng < 0) { 
        alert('비밀번호는 숫자와 영문자를 혼용하여야 합니다.'); 
		$('#'+upw).val('');
		$('#'+upw).focus();
        return;
    }
    if(/(\w)\1\1\1/.test($('#'+upw).val())) {
        alert('비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.'); 
		$('#'+upw).val('');
		$('#'+upw).focus();
        return;
    }
    return;
} 

//다음 주소검색
// f1:zonecode, f2: addr1, f3:addr2 f4:addrOld
function daumZipSearch(f1, f2, f3, f4) {
	new daum.Postcode({
		oncomplete: function(data) {
			if (f1!='') {
				document.getElementById(f1).value = data.zonecode;
			}
			/*
			//전체 주소에서 연결 번지 및 ()로 묶여 있는 부가정보를 제거하고자 할 경우,
			//아래와 같은 정규식을 사용해도 된다. 정규식은 개발자의 목적에 맞게 수정해서 사용 가능하다.
			var addr = data.address.replace(/(\s|^)\(.+\)$|\S+~\S+/g, '');
			document.getElementById(f3).value = addr;
			*/

			if (f2!='') {
				var addr = data.roadAddress.replace(/(\s|^)\(.+\)$|\S+~\S+/g, '');
				document.getElementById(f2).value = addr;
			}

			if (f4!='') {
				var addr = data.jibunAddress.replace(/(\s|^)\(.+\)$|\S+~\S+/g, '');
				document.getElementById(f4).value = addr;
			}
			
			if (f3!='') {
				document.getElementById(f3).focus();
			}
		}
	}).open();
}

//날짜 기간설정 (1주일/한달/3개월)
//v : 구분(w, m, 3m)
function setDate(sdate, edate, v) {
	var eD = $('#'+edate).val();
	var today;
	var year;
	var month;
	var day;

	if (eD=='') {
		today = new Date();
		year = today.getFullYear();
		month = today.getMonth()+1;
		day = today.getDate();
	} else {
		var eDSplit = eD.split('-');
		year = eDSplit[0];
		month = parseInt(eDSplit[1]);
		day = parseInt(eDSplit[2]);
	}
	if (month<10) {
		month = '0'+month;
	}
	if (day<10) {
		day = '0'+day;
	}

	var curD = year+'-'+month+'-'+day;

	$('#'+edate).val(curD);

	var resultDate;
	if (v=='w') {
		resultDate = new Date(year, month-1, day-7);
	} else if (v=='m') {
		resultDate = new Date(year, month-2, day);
	} else if (v=='3m') {
		resultDate = new Date(year, month-4, day);
	}

	year = resultDate.getFullYear();
	month = resultDate.getMonth()+1;
	day = resultDate.getDate();

	if (month<10) {
		month = '0'+month;
	}
	if (day<10) {
		day = '0'+day;
	}
	var resD = year+'-'+month+'-'+day;
	$('#'+sdate).val(resD);
}

//숫자콤마
function comma(str) {
	var parts=str.toString().split(".");

    str = String(parts[0]);
	str = String(str).replace(/,/gi,'');
	str = str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	if (parts.length==2) {
		str = str +'.'+ parts[1];
	}
    return str;
    //return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//콤마풀기
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

//글자수 제한 체크 
function len_chk(txtid, len, lenchk) {  
	var txtLength = $('#'+txtid).val().length; 

	if(txtLength > len){  
		alert("글자수는 "+len+"자로 제한됩니다.!");  
		$('#'+txtid).val($('#'+txtid).val().substring(0,len));  
		$('#'+txtid).focus();  
	} 
	if (lenchk!='') {
		$('#'+lenchk).text(txtLength+'/'+len+' bytes');
	}
} 

function regChk2(f, ty){
	var msg='';
	if (ty=='kor') {
		regexp = /^[\ㄱ-ㅎ ㅏ-ㅣ 가-힣\s]+$/;
		msg = '한글만';
	} else if (ty=='num') {
		regexp = /^[0-9]+$/;
		msg = '숫자만';
	} else if (ty=='eng') {
		regexp = /^[a-zA-Z\s]+$/;
		msg = '영문만';
	} else if (ty=='numeng') {
		regexp = /^[a-zA-Z0-9]+$/;
		msg = '숫자와 영문만';
	} else if (ty=='koreng') {
		regexp = /^[가-힣a-zA-Z]+$/;
		msg = '한글과 영문만';
	}
	v = $('#'+f).val();

	if( !regexp.test(v) ) {
		alert(msg+"입력하세요");
		$('#'+f).val('');
		return false;
	}
	return;

}

function regChk(f, ty){
	var msg='';
	if (ty=='kor') {
		regexp = /^[\ㄱ-ㅎ ㅏ-ㅣ 가-힣\s]+$/;
		msg = '한글만';
	} else if (ty=='num') {
		regexp = /^[0-9]+$/;
		msg = '숫자만';
	} else if (ty=='eng') {
		regexp = /^[a-zA-Z\s]+$/;
		msg = '영문만';
	} else if (ty=='numeng') {
		regexp = /^[a-zA-Z0-9]+$/;
		msg = '숫자와 영문만';
	} else if (ty=='koreng') {
		regexp = /^[가-힣a-zA-Z]+$/;
		msg = '한글과 영문만';
	}
	v = $('#'+f).val();
	//alert(event.keyCode);
	if( !regexp.test(v) ) {
		if (event.keyCode==8 || event.keyCode==13 || event.keyCode==9 || event.keyCode==37 || event.keyCode==39 || event.keyCode==46 || event.keyCode==93 || event.keyCode==229 || event.keyCode==116 ) {
			event.returnValue = false;
		} else {
			alert(msg+"입력하세요");
			$('#'+f).val('');
			event.returnValue = false;
			return false;
		}
	}
	event.returnValue = false;
	/*
	if((event.keyCode < 12592) || (event.keyCode > 12687)){
		alert("한글만 입력이 가능합니다.");
		//f = '';
		event.returnValue = false
	}
	*/
}

//사용자 출력 함수
function printUser(divid) {

	$("#"+divid).print({
		addGlobalStyles : 'inc/css/CMS.css',
		stylesheet : 'inc/css/CMS.css',
		rejectWindow : true,
		noPrintSelector : ".no-print",
		iframe : true,
		append : null,
		prepend : null
	});
}

//관리자 출력 함수
function printMng(divid) {

	$("#"+divid).print({
		addGlobalStyles : '<?=AdminPath?>inc/css/sub.css',
		stylesheet : '<?=AdminPath?>inc/css/board.css',
		rejectWindow : true,
		noPrintSelector : ".no-print",
		iframe : true,
		append : null,
		prepend : null
	});
}

//이미지 확장자 체크
function fnImgExtCheck(id){
	var strFile = $("#"+id).val();
	var ext = strFile.split('.').pop().toLowerCase();
	if($.inArray(ext, ['gif','jpg','jpeg','png']) == -1) {
		return false;
	} else{
		return true;
	}
}

//셀렉트박스의 선택값 가져오기
function fnSelectGetItem(md, id){
	var retval;
	if(md=='value'){
		retval = $("#"+id+" option:selected").val();
	} else {
		retval = $("#"+id+" option:selected").text();
	}	
	return retval;
}

//브라우저 체크
function getVersionIE () { 
	var word; 
	var version = "N/A"; 

	var agent = navigator.userAgent.toLowerCase(); 
	var name = navigator.appName; 

	// IE old version ( IE 10 or Lower ) 
	if ( name == "Microsoft Internet Explorer" ) word = "msie "; 

	else { 
		// IE 11 
		if ( agent.search("trident") > -1 ) word = "trident/.*rv:"; 

		// IE 12  ( Microsoft Edge ) 
		else if ( agent.search("edge/") > -1 ) word = "edge/"; 
	} 

	var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 

	if (  reg.exec( agent ) != null  ) version = RegExp.$1 + RegExp.$2; 
	return version; 
} 

function cclView() {
	var cI='';
	var cT='';
	
	var v1,v2;
	v1 = $(':radio[name=ccl1]:checked').val();
	v2 = $(':radio[name=ccl2]:checked').val();

	if (v1=='Y') {
		if (v2=='Y') {
			cI='https://i.creativecommons.org/l/by/4.0/88x31.png';
			cT='이 저작물은 크리에이티브 커먼즈 저작자표시 4.0 국제 라이선스에 따라 이용할 수 있습니다.';
		} else if (v2=='N') {
			cI='https://i.creativecommons.org/l/by-nd/4.0/88x31.png';
			cT='이 저작물은 크리에이티브 커먼즈 저작자표시-변경금지 4.0 국제 라이선스에 따라 이용할 수 있습니다.';
		} else {
			cI='https://i.creativecommons.org/l/by-sa/4.0/88x31.png';
			cT='이 저작물은 크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스에 따라 이용할 수 있습니다.';
		}
	} else {
		if (v2=='Y') {
			cI='https://i.creativecommons.org/l/by-nc/4.0/88x31.png';
			cT='이 저작물은 크리에이티브 커먼즈 저작자표시-비영리 4.0 국제 라이선스에 따라 이용할 수 있습니다.';
		} else if (v2=='N') {
			cI='https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png';
			cT='이 저작물은 크리에이티브 커먼즈 저작자표시-비영리-변경금지 4.0 국제 라이선스에 따라 이용할 수 있습니다.';
		} else {
			cI='https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png';
			cT='이 저작물은 크리에이티브 커먼즈 저작자표시-비영리-동일조건변경허락 4.0 국제 라이선스에 따라 이용할 수 있습니다.';
		}
	}
	$('#cclImg').attr('src',cI);
	$('#cclText').text(cT);
}

//숫자체크
function numberChk(key) {
	var str =  ($('#'+key).val()).replace(/\./g, '');

	for(i=0; i<str.length; i++) {
		temp = str.charAt(i);
		if((temp >= "0" && temp <= "9") ){
			return true;
		}else{
			//$(this).showMessage(key, command, value);
			return false;
		}
	}
}

//소셜 로그인
/*
트위터 : https://apps.twitter.com
페이스북: https://developers.facebook.com/apps
네이버: https://nid.naver.com/oauth2.0/authorize
카카오톡 : https://dev.kakao.com/
다음: http://developers.daum.net/ 
구글 : https://code.google.com/apis/console
*/
function snsLogin(g, id, backUrl, st) { 
    if(g =="naver") { 
        var win = window.open("https://nid.naver.com/oauth2.0/authorize?client_id="+id+"&response_type=code&redirect_uri="+backUrl+"&state="+st, "네이버 아이디로 로그인","width=320, height=480, toolbar=no, location=no");  
		/*
        var timer = setInterval(function() {    
            if(win.closed) {   
                window.location.reload(); 
            }   
        }, 500);  
		*/
    } else if(g =="twitter") { 
		alert('준비중입니다.');
		return;
        var win = window.open("<?=G5_PLUGIN_URL?>/social_login/tw/login.php", "twLogin","width=720, height=580, toolbar=no, location=no,resizable=yes");  
    } else if(g =="facebook") { 
        var win = window.open("https://www.facebook.com/dialog/oauth?client_id="+id+"&redirect_uri="+backUrl+"&scope=public_profile,email&granted_scopes=public_profile,email", "fbLogin","width=620, height=500, toolbar=no, location=no,resizable=yes");  
    } else if(g =="daum") { 
		alert('준비중입니다.');
		return;
	    var win = window.open("<?=DAUM_OAUTH_URL?>authorize?client_id=<?=DAUM_CONSUMER_KEY?>&response_type=code&redirect_uri=<?=DAUM_CALLBACK_URL?>&state=<?=$dastate?>", "다음 아이디로 로그인","width=520, height=700, toolbar=no, location=no");  
    } else if(g =="kakao") { 
		alert('준비중입니다.');
		return;
        var win = window.open("<?=KAKAO_OAUTH_URL?>authorize?client_id=<?=KA_CONSUMER_KEY?>&response_type=code&redirect_uri=<?=KA_OAUTH_CALLBACK?>&state=<?=$kastate?>", "kakaologin","width=320, height=480, toolbar=no, location=no");  
    } else if(g =="google") { 
		alert('준비중입니다.');
		return;
        var win = window.open("<?=G5_PLUGIN_URL?>/social_login/gg/login.php", "ggLogin","width=720, height=580, toolbar=no, location=no,resizable=yes");  
    } 
} 

//날짜 두개 비교
function compareDate(v, sd, ed) {
	if ($('#'+sd).val()!='' && $('#'+ed).val()!='') {
		if (v=='s') {
			if ($('#'+sd).val() > $('#'+ed).val()) {
				alert('시작일은 종료일보다 크면 안됩니다.');
				$('#'+sd).val('');
			}
		} else {
			if ($('#'+sd).val() > $('#'+ed).val()) {
				alert('종료일은 시작일보다 작으면 안됩니다.');
				$('#'+ed).val('');
			}
		}
	}
}

function fileCheck(file, msize) {
	// 사이즈체크
	var fileSize = 0;
	var maxSize = 1024 * msize;
	// 브라우저 확인
	var browser=navigator.appName;

	// 익스플로러일 경우
	if (browser=="Microsoft Internet Explorer"){
		var oas = new ActiveXObject("Scripting.FileSystemObject");
		fileSize = oas.getFile(file.value).size;
	} else {	// 익스플로러가 아닐경우
		fileSize = file.files[0].size;
	}


	//alert("파일사이즈 : "+ fileSize +", 최대파일사이즈 : "+maxSize);

	if(fileSize > maxSize) {
		alert("첨부파일 사이즈는 "+ msize +"KB 이내로 등록 가능합니다.    ");
		return false;
	} else {
		return true;
	}


}

//이미지 미리보기
$(function() {
	$("#imgInp").on('change', function(){
		readURL(this);
	});
});

function readURL(input) {
	if (input.files && input.files[0]) {
	var reader = new FileReader();

	reader.onload = function (e) {
			$('#blah').attr('src', e.target.result);
		}

	  reader.readAsDataURL(input.files[0]);
	}
}

//이미지 미리보기
function imgPreView(fileId, previewId) {
	if ($('#'+fileId).val()=='') {
		alert('파일을 업로드 하세요');
		$('#'+fileId).focus();
		return;
	}

	var upload = document.getElementById(fileId);
	//var upload = document.getElementsById(fileId)[0];
	//alert(upload.value);

	if (typeof window.FileReader === 'undefined') {
		alert('이미지를 부를수 없습니다.');
		return;
	} 
	 
	var file = upload.files[0],
		 reader = new FileReader();

	reader.onload = function (event) {
		var img = new Image();
		img.src = event.target.result;

		// note: no onload required since we've got the dataurl...I think! :)
		//if (img.width > 560) { // holder width
		//  img.width = 560;
		//}

		//alert(img);
		$('#'+previewId).attr('src', img.src);
	};

	reader.readAsDataURL(file);

}

// 사업자번호 체크
function checkBizID(bizID) {

	// bizID는 숫자만 10자리로 해서 문자열로 넘긴다.
	var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
	var tmpBizID, i, chkSum=0, c2, remander;
	bizID = bizID.replace(/-/gi,'');

	for (i=0; i<=7; i++) {
		chkSum += checkID[i] * bizID.charAt(i);
	}

	c2 = "0" + (checkID[8] * bizID.charAt(8));
	c2 = c2.substring(c2.length - 2, c2.length);
	chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
	remander = (10 - (chkSum % 10)) % 10 ;


	if (Math.floor(bizID.charAt(9)) == remander) {
		return true; // OK!
	} 

	return false;

}

//넘버카운트
function numberCounter(target_frame, target_number) {
	this.count = 0; this.diff = 0;
	this.target_count = parseInt(target_number);
	this.target_frame = document.getElementById(target_frame);
	this.timer = null;
	this.counter();
};

numberCounter.prototype.counter = function() {
	var self = this;
	this.diff = this.target_count - this.count;

	if(this.diff > 0) {
		self.count += Math.ceil(this.diff / 5);
	}

	this.target_frame.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	if(this.count < this.target_count) {
		this.timer = setTimeout(function() { self.counter(); }, 20);
	} else {
		clearTimeout(this.timer);
	}
};

function viewNum(divid, number) {
	new numberCounter(divid, number);
}

//주소보기
function viewZip(val1, val2, gb, id) {
	ajaxProc(id,'','/_Prog/common/zipcodeOptionView.php','gubun='+gb+'&val1='+val1+'&val2='+val2,'');
}

//아이디 중복체크 공통 (중복값 체크여부 변수는 dblChkVal 로 해야 함
function useridDblChk(uid) {
	if ($('#'+uid).val()=='') {
		alert('중복체크할 아이디를 적으세요');
		$('#'+uid).focus();
		return;
	}
	ajaxProc('','','/_Prog/member/useridDblChk.php','userid='+$('#'+uid).val(), useridDblChkEnd);
}
function useridAdmDblChk(uid) {
	if ($('#'+uid).val()=='') {
		alert('중복체크할 아이디를 적으세요');
		$('#'+uid).focus();
		return;
	}
	ajaxProc('','','/_Prog/member/useridAdmDblChk.php','userid='+$('#'+uid).val(), useridDblChkEnd);
}
function useridDblChkEnd(v) {
	var vSplit = v.split('||');
	$('#dblChkVal').val(vSplit[0]);
	alert(vSplit[1]);
}

//파일삭제 공통
function delFile(idx) {
	if(confirm("삭제하시겠습니까?")){
		ajaxProc('', '', '/_Prog/common/fileDelete.php', 'idx='+idx, delFileEnd);
	} else {
		return;
	}
}
//동영상삭제 공통
function delMovie(v) {
	if (confirm('동영상정보를 삭제하시겠습니까?')) {
		ajaxProc('', '', '/_Prog/common/movieDelete.php', 'idx='+v, delMovieEnd);
	}
}

//클릭한 곳에 띄우기
function layerPosition(g, div) {
	var ly;
	if (g=='id') {
		ly = $('#'+div);
	} else {
		ly = $('.'+div);
	}
	var popH = ly.offset().top;
    ly.css("top", popH-100+'px');
   // return ly;
}

//해당 아이디 및 class로 아이디로 위치 이동
//hei 는 해당 높이만큼 강제 이동
function scrollMove(div, hei){
	var offset = $(div).offset();
	var top = 0;
	if (hei!='') {
		top = offset.top + parseInt(hei);
	} else {
		top = offset.top;
	}
	$('html, body').animate({scrollTop : top}, 400);
}

function copyToClipboard(val){
	var t = document.createElement("textarea");
	document.body.appendChild(t);
	t.value = val;
	t.select();
	document.execCommand('copy');
	document.body.removeChild(t);
	alert('클립보드에 복사되었습니다');
}


//복사기능
//<input id="clipboardtarget" type="text" value="" style="position:absolute;top:-9999em;"/> 를 공통부분에 추가한다.
function clipboardProc(v, tit) {
	$('#clipboardtarget').val(v);
	//input박스 value를 선택 
	$('#clipboardtarget').select(); 
	// Use try & catch for unsupported browser 
	try { // The important part (copy selected text) 
		var successful = document.execCommand('copy'); 
		alert(tit);
		// if(successful) answer.innerHTML = 'Copied!'; 
		// else answer.innerHTML = 'Unable to copy!'; 
	} catch (err) { 
		alert('이 브라우저는 지원하지 않습니다.') ;
	}

}

//게시글 신고
function bbsPoliceProc(g, bbsConfIdx, bbsIdx, commIdx) {
	if (confirm('해당글을 신고하시겠습니까?')) {
		ajaxProc('','','/_Ext/bbs/bbsPoliceProc.php','gubun='+g+'&bbsConfIdx='+bbsConfIdx+'&bbsIdx='+bbsIdx+'&commIdx='+commIdx,bbsPoliceProcEnd);
	}
}
function bbsPoliceProcEnd(v) {
	var vSplit = v.split('||');
	if (vSplit[0]=='OK') {
		alert('신고가 등록되었습니다.\n관리자 확인후 처리하겠습니다.');
	} else {
		alert(v);
	}
}

//추천 / 비추천
function likeYnProc(g, yn, idx) {
	var msg;
	if (yn=='Y') {
		msg = '추천';
	} else {
		msg = '비추천';
	}
	if (confirm('해당 글을 '+msg+' 하시겠습니가?')) {
		ajaxProc('','','/_Ext/bbs/likeYnProc.php','gubun='+g+'&yn='+yn+'&idx='+idx,likeYnProcEnd);
	}
}

function likeYnProcEnd(v) {
	var vSplit = v.split('||');
	if (vSplit[0]=='OK') {
		alert(vSplit[1]+' 되었습니다.');
	} else {
		alert(v);
	}
}

//시작페이지 설정
function setStartPage(t, url) {
	if (confirm('시작페이지로 설정하시겠습니까?')) {

		if (document.all && window.external){
			t.style.behavior='url(#default#homepage)';
			t.setHomePage(url);
		} else {
			alert('해당 브라우저는 지원이 되지 않습니다.');
		}
	}
}

//time을 시간으로 표시
function msgTime() {	// 1초씩 카운트
	h = Math.floor(SetTime / 3600);	// 남은 시간 계산
	m = Math.floor((SetTime / 3600) % 60);	// 남은 시간 계산
	s = SetTime % 60;	// 남은 시간 계산
	var msg = fillZero(h,2) +":"+ fillZero(m,2) + ":" + fillZero(s,2);
	//document.all.ViewTimer.innerHTML = msg;		// div 영역에 보여줌 
	$('#leftHourView').text(msg);
	SetTime--;					// 1초씩 감소
	if (SetTime < 0) {			// 시간이 종료 되었으면..
		clearInterval(tid);		// 타이머 해제
		//alert("종료");
	}

}

//즐겨찾기
function bookmark(url, title) {
	var agent = navigator.userAgent.toLowerCase();
	if (window.sidebar) { // Mozilla Firefox Bookmark
		window.sidebar.addPanel(location.href,document.title,"");
	} else if (window.external) { // IE Favorite
		if (agent.indexOf("chrome") != -1) {
			alert('Ctrl(Cmd)+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.');
		} else {
			window.external.AddFavorite(location.href,document.title); 
		}
	} else if (window.opera && window.print) { // Opera Hotlist
		this.title=document.title;
	} else {
		alert('Ctrl(Cmd)+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.');
	}

}

//자리수채우기
//n 숫자, width : 자리수
function fillZero(n, width) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

//날짜더하고 빼기
//dateAddDel('2017-09-25', -7, 'd'); 
 //dateAddDel('2017-09-25', -1, 'm'); 
 //dateAddDel('2017-09-25', -1, 'y');
function dateAddDel(sDate, nNum, type) {
    var yy = parseInt(sDate.substr(0, 4), 10);
    var mm = parseInt(sDate.substr(5, 2), 10);
    var dd = parseInt(sDate.substr(8), 10);
	nNum = parseInt(nNum);

    
    if (type == "d") {
        d = new Date(yy, mm - 1, dd + nNum);
    }
    else if (type == "m") {
        d = new Date(yy, mm - 1, dd + (nNum * 31));
    }
    else if (type == "y") {
        d = new Date(yy + nNum, mm - 1, dd);
    }
 
    yy = d.getFullYear();
    mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
    dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
 
    return '' + yy + '-' +  mm  + '-' + dd;
}

function alertJs(msg, f, callFun, funData) {
	var param='';
	if (f!='') {
		alertBoxFocus(msg, f)
	} else {
		alertBox(msg, callFun, funData);
	}
}

function goUrl(v) {
	location.href=v.url;
}

//alert창 기능 모음
function alertBox(txt, callbackMethod, jsonData){
    modal({
        type: 'alert',
        title: '알림',
        text: txt,
        callback: function(result){
            if(callbackMethod){
                callbackMethod(jsonData);
            }
        }
    });
}
 
function alertBoxFocus(txt, obj){
    modal({
        type: 'alert',
        title: '알림',
        text: txt,
        callback: function(result){
            $('#'+obj).focus();
			$(window).scrollTop($('#'+obj).offset().top - 250);
        }
    });
}
 
    
function confirmBox(txt, callbackMethod, jsonData){
    modal({
        type: 'confirm',
        title: '알림',
        text: txt,
        callback: function(result) {
            if(result){
                callbackMethod(jsonData);
            }
        }
    });
}
 
function promptBox(txt, callbackMethod, jsonData){
    modal({
        type: 'prompt',
        title: 'Prompt',
        text: txt,
        callback: function(result) {
            if(result){
                callbackMethod(jsonData);
            }
        }
    });
}
 
function successBox(txt){
    modal({
        type: 'success',
        title: 'Success',
        text: txt
    });
}
 
function warningBox(txt){
    modal({
        type: 'warning',
        title: 'Warning',
        text: txt,
        center: false
    });
}
 
function infoBox(txt){
    modal({
        type: 'info',
        title: 'Info',
        text: txt,
        autoclose: true
    });
}
 
function errorBox(txt){
    modal({
        type: 'error',
        title: 'Error',
        text: txt
    });
}
 
function invertedBox(txt){
    modal({
        type: 'inverted',
        title: 'Inverted',
        text: txt
    });
}
 
function primaryBox(txt){
    modal({
        type: 'primary',
        title: 'Primary',
        text: txt
    });
}


/*
주소창 바꾸는 스크립트
//현재 주소를 가져온다.
var renewURL = location.href;
//현재 주소 중 page 부분이 있다면 날려버린다.
renewURL = renewURL.replace(/\&page=([0-9]+)/ig,'');
 
//새로 부여될 페이지 번호를 할당한다.
// page는 ajax에서 넘기는 page 번호를 변수로 할당해주거나 할당된 변수로 변경
renewURL += '&page='+page;
 
//페이지 갱신 실행!
history.pushState(null, null, url);
*/

/*
<script>
   alertBox("안녕", goNaver);
 
   function goNaver(){
      location.href = "http://www.naver.com";
   }
<script>
<script>
   alertBox("안녕", goNaver, {url:"http://www.naver.com"});
 
   function goNaver(urlData){
      location.href = urlData.url;
   }
<script>
//alert창 기능 모음 끝

/*
//아이디 저장 기능을 수행할때 login page에

	$(document).ready(function(){
		// 저장된 쿠키값을 가져와서 ID 칸에 넣어준다. 없으면 공백으로 들어감.
		var userInputId = getCookie("userInputId");
		$("input[name='userid']").val(userInputId); 
		 
		if($("input[name='userid']").val() != ""){ // 그 전에 ID를 저장해서 처음 페이지 로딩 시, 입력 칸에 저장된 ID가 표시된 상태라면,
			$("#idSaveCheck").attr("checked", true); // ID 저장하기를 체크 상태로 두기.
		}
		 
		$("#idSaveCheck").change(function(){ // 체크박스에 변화가 있다면,
			if($("#idSaveCheck").is(":checked")){ // ID 저장하기 체크했을 때,
				var userInputId = $("input[name='userid']").val();
				setCookie("userInputId", userInputId, 7); // 7일 동안 쿠키 보관
			}else{ // ID 저장하기 체크 해제 시,
				deleteCookie("userInputId");
			}
		});
		 
		// ID 저장하기를 체크한 상태에서 ID를 입력하는 경우, 이럴 때도 쿠키 저장.
		$("input[name='userid']").keyup(function(){ // ID 입력 칸에 ID를 입력할 때,
			if($("#idSaveCheck").is(":checked")){ // ID 저장하기를 체크한 상태라면,
				var userInputId = $("input[name='userid']").val();
				setCookie("userInputId", userInputId, 7); // 7일 동안 쿠키 보관
			}
		});
	});

*/
/*
function pstTwitter(msg, url) { 
    msg = document.title;
    url = document.location.href;
	var href = "http://twitter.com/home?status=" + encodeURIComponent(msg) + " " + encodeURIComponent(url);
	var a = window.open(href, 'twitter', '');
	if ( a ) {
		a.focus();
	}
}
	
function pstFaceBook(msg, url) { 
    msg = document.title;
    url = document.location.href;
	//var href = "http://www.facebook.com/sharer.php?v=4&src=bm&u=" + url + "&t=" + encodeURIComponent(msg); 	    
	var href = "http://www.facebook.com/sharer/sharer.php?t=" + encodeURIComponent(msg) + "&u=" + encodeURIComponent(url);
	var a = window.open(href, 'facebookPopup', '');
	if ( a ) {
		a.focus();
	}
}
function pstKakaoStory(msg, url) { 
    msg = document.title;
    url = document.location.href;
    try{
    	Kakao.init('key');
    }catch(e){console.log('kakao story initialize error');}
	Kakao.Story.share({
		url: url,
		text: msg
	});
}
function pstKakaoTalk(msg, url) { 
    msg = document.title;
    url = document.location.href;
    try{
    	Kakao.init('key');
    }catch(e){console.log('kakao talk initialize error');}
	Kakao.Link.sendDefault({
		objectType: 'feed',
		content: {
		    title: msg,
		    description: '',
		    imageUrl: '이미지 경로',
		    link: {
		        mobileWebUrl: url,
		        webUrl: url
		    }
		}
	});
}
*/

//비밀번호 조합 체크하기
function fnCheckPassWord(pw, maxlen){
	if(maxlen=='') maxlen = 8;

	pw = pw.split(" ").join("");
	
	if(pw.length < maxlen) {
		alert("비밀번호는 "+maxlen+"자리 이상 입력하세요.");
		return false;
	}
	
	var engB_Cnt = 0;
	var engS_Cnt = 0;
	var spcW_Cnt = 0;
	var numW_Cnt = 0;
	var word_Cnt = 0;
	var engB = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var engS = "abcdefghijklmnopqrstuvwxyz";
	var spcW = "-_!@#$%^&*";
	var numW = "0123456789";
	var checkWord = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_!@#$%^&*";
	var pwLen = pw.length;
  
	for(i=0;i<pwLen;i++) {
		if(checkWord.indexOf(pw.substring(i,i+1))<0) 
		{
		  alert("비밀번호의 허용된 문자가 아닙니다. 다시 입력해 주십시오.");
		  return false;
		} else {
		  if(engB.indexOf(pw.substring(i,i+1)) != -1) {
			engB_Cnt = 1;
		  }
		  if(engS.indexOf(pw.substring(i,i+1)) != -1) {
			engS_Cnt = 1;
		  }
		  if(spcW.indexOf(pw.substring(i,i+1)) != -1) {
			spcW_Cnt = 1;
		  }
		  if(numW.indexOf(pw.substring(i,i+1)) != -1) {
			numW_Cnt = 1;
		  }
		}
	}

	word_Cnt = parseInt(engB_Cnt) + parseInt(engS_Cnt) + parseInt(spcW_Cnt) + parseInt(numW_Cnt);
	/*
	if(word_Cnt == 1) {
	  alert("비밀번호의 조합을 확인하세요.");
	  return false;
	} else if(word_Cnt == 2 && pw.length < 10) {
	  alert("비밀번호가 2조합일때는 10자리 이상 입력하세요.");
	  return false;
	} else if(word_Cnt == 3 && pw.length < 8) {
	  alert("비밀번호가 3조합일때는 8자리 이상 입력하세요.");
	  return false;
	} 
	*/
	if(word_Cnt == 1) {
	  alert("비밀번호의 조합을 확인하세요.");
	  return false;
	} 
	
	var SamePass_0 = 0; //동일문자 카운트
	var SamePass_1 = 0; //연속성(+) 카운드
	var SamePass_2 = 0; //연속성(-) 카운드
   
	for(var i=0; i < pw.length; i++) {
		var chr_pass_0 = pw.charAt(i);
		var chr_pass_1 = pw.charAt(i+1);

		//동일문자 카운트
		if(chr_pass_0 == chr_pass_1) {
		  SamePass_0 = SamePass_0 + 1
		} else {
		  if (SamePass_0 < 2) {
			  SamePass_0 = 0;
		  }
		}
		
		var chr_pass_2 = pw.charAt(i+2);

		//연속성(+) 카운드
		if(chr_pass_0.charCodeAt(0) - chr_pass_1.charCodeAt(0) == 1 && chr_pass_1.charCodeAt(0) - chr_pass_2.charCodeAt(0) == 1) {
		  SamePass_1 = SamePass_1 + 1
		}
		
		//연속성(-) 카운드
		if(chr_pass_0.charCodeAt(0) - chr_pass_1.charCodeAt(0) == -1 && chr_pass_1.charCodeAt(0) - chr_pass_2.charCodeAt(0) == -1) {
		  SamePass_2 = SamePass_2 + 1
		}
	}
	if(SamePass_0 > 1) {
	  alert("비밀번호는 동일문자를 3번 이상 사용할 수 없습니다.");
	  return false;
	}
   
	if(SamePass_1 > 1 || SamePass_2 > 1 ) {
	  alert("비밀번호는 연속된 숫자열 3자 이상 사용 할 수 없습니다.");
	  return false;
	}
	return true;
}







// 현재 위치정보         // SSL 인증서가 설치되어있어야만 동작
var getPosition = function (options) {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

var autoHyphen = (target) => {
 target.value = target.value
   .replace(/[^0-9]/, '')
   .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

// 이전 또는 다음 div 클릭시 href 가 있는 a 태그가 있는 경우 페이지 이동
$(document).on('click','.prev, .next',function(){
	const href = $(this).find('a').attr('href');
	if(href != undefined && href != '') {
		location.href=href;
	}
})


$(document).ready(function(){
	// $('#cont table') 선택자를 사용하여 모든 table 요소를 선택
	$('#cont table').each(function() {
		// 현재 table 요소를 변수에 저장
		var $table = $(this);
		// 이미 감싸져 있는지 확인 (부모 요소가 .tbl_wrap 클래스인지 확인)
		if (!$table.parent().hasClass('tbl_wrap')) {
			// 새 div 요소를 생성하고 table 요소를 감쌈
			$table.wrap('<div class="tbl_wrap"></div>');
		}
	});
})