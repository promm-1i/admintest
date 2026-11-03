/* =================================================================
   [Config] Modal Configuration (jQuery Ver)
   ================================================================= */
const modalMatch = {
    "terms_modal": {//이용약관
        url: "/modal/terms_modal.php",
        style: "max-width: 600px" 
    },
    "policy_modal": {// 개인정보취급방침
        url: "/modal/policy_modal.php",
        style: "max-width: 600px" 
    },
    "third_party_modal": {//3자정보제공동의
        url: "/modal/third_party_modal.php",
        style: "max-width: 600px" 
    },
    "register_modal": {// 사전접수
        url: "/modal/register_modal.php",
        style: "max-width: 580px" 
    },
    "reservation-modal": {// 진료일정
        url: "/modal/reservation-modal.php",
        style: "max-width: 710px" 
    },
    "alumni-modal": {
        url: "/modal/alumni_modal.php",
        style: "max-width: 720px"
    },
    "main-modal": {
        url: "/modal/main_modal.php",
        style: "max-width: 792px"
    }
    // ... 추가
};

let baseZIndex = 2000;


/* =================================================================
   [Core] Modal Logic
   ================================================================= */
const Modal = {
    // 1. 모달 열기
    open: function(modalId, data = {}) {
        const config = modalMatch[modalId];
        
        if (!config) {
            console.error('[Modal] 설정을 찾을 수 없습니다:', modalId);
            return;
        }
		
        // AJAX 호출
        $.ajax({
            url: config.url,
            type: "GET",
            data: data, // 필요시 서버로 데이터 전송
            dataType: "html",
            success: function(html) {
                // (1) 현재 열린 모달 개수로 Z-Index 계산
                let openCount = $('.modal-dim.is-active').length;
                let zIndex = baseZIndex + openCount;

                // (2) DOM 구조 생성 (SCSS 클래스명 일치: modal-dim > modal-layer)
                let $modal = $(`
                    <div class="modal-dim" id="${modalId}" style="z-index: ${zIndex};">
                        <div class="modal-layer" style="${config.style || ''}">
                            ${html}
                        </div>
                    </div>
                `);

                // (3) Body에 추가
                $('body').append($modal).addClass('no-scroll');

                // (4) 애니메이션 트리거 (DOM 렌더링 후 is-active 추가)
                // requestAnimationFrame 대신 setTimeout 10ms도 jQuery에선 흔히 씀
                setTimeout(function() {
                    $modal.addClass('is-active');
                }, 10);
            },
            error: function(err) {
                console.error('[Modal] 로드 실패:', err);
                alert('모달을 불러올 수 없습니다.');
            }
        });
    },

    // 2. 모달 닫기
    close: function($target) {
        // $target은 .modal-dim 자체이거나 내부의 버튼일 수 있음
        let $dim = $target.closest('.modal-dim');
        
        if ($dim.length === 0) return;

        // (1) 애니메이션 시작 (is-active 제거)
        $dim.removeClass('is-active');

        // (2) 트랜지션 시간(0.3s) 후 DOM 제거
        setTimeout(function() {
            $dim.remove();

            // (3) 남은 모달이 없으면 스크롤 잠금 해제
            if ($('.modal-dim').length === 0) {
                $('body').removeClass('no-scroll');
            }
        }, 300);
    }
};


/* =================================================================
   [Event] Global Event Listeners
   ================================================================= */
$(function() {
    
    // 1. 열기 버튼 클릭 (이벤트 위임)
    $(document).on('click', '.btn-modal', function(e) {
        e.preventDefault();
        let modalId = $(this).data('modal');
		let modalParam = $(this).data('param');
		
        if(modalId) {
            Modal.open(modalId, modalQueryStringToJson(modalParam));
        }
    });

    // 2. 닫기 버튼 클릭 (X 버튼, 취소 버튼)
    $(document).on('click', '.btn-close-modal', function() {
        Modal.close($(this));
    });

    // 3. 배경(Dim) 클릭 시 닫기
    $(document).on('click', '.modal-dim', function(e) {
        // 클릭한 대상(e.target)이 정확히 배경(.modal-dim)일 때만 닫기
        // 내부 컨텐츠(.modal-layer) 클릭 시엔 닫히지 않음
        if ($(e.target).hasClass('modal-dim')) {
            Modal.close($(this));
        }
    });

    // 4. ESC 키 입력 시 최상단 모달 닫기
    $(window).on('keyup', function(e) {
        if (e.key === "Escape") {
            let $openModals = $('.modal-dim.is-active');
            
            if ($openModals.length > 0) {
                // z-index가 가장 높은(마지막에 뜬) 모달 찾기
                let $topModal = $openModals.eq(0);
                let maxZ = 0;

                $openModals.each(function() {
                    let z = parseInt($(this).css('z-index')) || 0;
                    if (z > maxZ) {
                        maxZ = z;
                        $topModal = $(this);
                    }
                });

                Modal.close($topModal);
            }
        }
    });

});

function modalQueryStringToJson( queryString ){
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