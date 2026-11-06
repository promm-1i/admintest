$(function () {

    $('.del_btn').click(function(e){
        e.preventDefault();
        $('#upload_name').val('');
        $(this).addClass('dis-no');
    })  

    // 나이스셀럭티 내 직접입력 처리
    let niceSelects = document.querySelectorAll('.direct_select.nice-select');
    for(let niceSelect of niceSelects){
        let directInput = niceSelect.nextElementSibling;
        let niceSelectLis = niceSelect.children[1].children;

        for(let niceSelectLi of niceSelectLis){
            niceSelectLi.addEventListener('click', function(){
                if(this.innerText == "직접입력"){
                    directInput.classList.remove('dis-no')
                    niceSelect.classList.add('dis-no')
                } else {
                    directInput.classList.add('dis-no')
                    niceSelect.classList.remove('dis-no')
                }
            })
        }
    }

    // email
    let emailInput = document.querySelector('.form_box.email .direct_input');
    let emailNiceSelects = document.querySelectorAll('.form_box.email .nice-select li');
    emailNiceSelects.forEach(function(emailNiceSelect){
        emailNiceSelect.addEventListener('click', function(){
            let value = emailNiceSelect.innerText;
            if(value != '직접입력'){
                emailInput.value = value;
            } else {
                emailInput.value = '';
                setTimeout(() => {emailInput.focus();},10)
            }
        })
    })

    // input 포커스 아웃시 보더 변경
    let inputs = document.querySelectorAll('input, textarea, .nice-select');
    for(let input of inputs){
        input.addEventListener('blur', function(){
            if(this.classList.contains('nice-select')){
                let nowValue = this.children[0].innerText;
                if(nowValue != '선택하세요'){
                    this.classList.add('blur')
                }else {
                    this.classList.remove('blur')
                }
            } else {
                if(this.value != ''){
                    this.classList.add('blur')
                } else {
                    this.classList.remove('blur')
                }
            }
        })
    }

    // (-) 추가 : phone, birth
    $("#phone").on("keyup", function () {
        $(this).val($(this).val().replace(/[^0-9]/g, '').replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
        "$1-$2-$3"));
    });
    $("#birthday, #birth").on("keyup", function () {
        $(this).val($(this).val().replace(/[^0-9]/g, '').replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, "$1-$2-$3"));
    });
    // 숫자만 타이핑
    $('.only_number').on('keyup', function(){
        // $(this).val( $(this).val().replace(/[^0-9\-]*/gi, ''));
        $(this).val( $(this).val().replace(/[^0-9\-]*/gi, ''));
    })

    // 정규식
    const idReg = /^[A-Za-z]{1}[A-Za-z0-9_]{4,12}$/; // 영문 시작, 영문/숫자+_ 5~12자리
    const pwReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_$@$!%*#?&]{6,12}$/; // 문자, 숫자 1개이상 포함, 6~12자리
    const pwOnlineReg = /^(?=.*[A-Za-z0-9]).{4,}$/; // 영문 숫자 조합 4자리 이상
    const nameReg = /^([가-힣]{2,5}|[a-zA-Z]+)$/; // 한글 2~5자리 또는 영문 1자리 이상
    const birthReg = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const emailReg =  /^[^ㄱ-ㅎ][0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const email01Reg = /^\w([-_.]?\w)*$/i;
    const email02Reg = /\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/i;
    const phoneReg = /(^02.{0}|^01.{1})-([0-9]{3,4})-([0-9]{4})/;
    const phoneReg01 = /(^02.{0}|^01.{1})/;
    const phoneReg02 = /([0-9]{3,4})/;
    const phoneReg03 = /([0-9]{4})/;

    // 폼 제출
    $('form').submit(function(){
        const sctAnimate = 100;
        
        // 약관 체크 1
        if($("#agree_service").length){
            const agree = $("#agree_service").is(":checked");
            if (!agree) {
                alert('필수약관에 동의해주세요.');
                window.scrollTo({top: $('.agree_service_box').offset().top, behavior: 'smooth'});
                return false;
            }
        }
        // 약관 체크 2
        if($("#agree_privacy").length){
            const agree = $("#agree_privacy").is(":checked");
            if (!agree) {
                alert('필수약관에 동의해주세요.');
                window.scrollTo({top: $('.agree_privacy_box').offset().top, behavior: 'smooth'});
                return false;
            }
        }
        
        if($('#id').length){
            $('#id').val($('#id').val().trim()); 

            if ($('#id').val() == '') {
                alert('아이디를 입력해주세요.');
                $('#id').focus();
                window.scrollTo({top: $('#id').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else if(!idReg.test($('#id').val())){
                alert('아이디를 확인하세요. (영문/숫자 5~12자리 이내)');
                $('#id').focus();
                window.scrollTo({top: $('#id').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }

            // 회원가입 - 아이디 확인 체크
            if ($('.content_wrapper').hasClass('join')){
                const idchk = document.querySelector('#id').dataset.chk;
                if(document.getElementById("email_yn").checked) {
                    document.getElementById("email_yn_hidden").disabled = true;
                }
                if(idchk == 'false'){
                    alert('아이디 중복을 확인해주세요.');
                    $('#id').focus();
                    window.scrollTo({top: $('#id').offset().top - sctAnimate, behavior: 'smooth'});
                    return false;
                }
            }
        }

        if($('.general').length && $('#password').length){
            if ($("#password").val() == "") {
                alert('비밀번호를 입력해주세요.');
                $('#password').focus();
                window.scrollTo({top: $('#password').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else if(!pwReg.test($('#password').val())){
                alert('비밀번호를 확인하세요. (영문+숫자 6~12자리)');
                $('#password').focus();
                window.scrollTo({top: $('#password').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('.general').length && $('#password_chk').length){
            if ($("#password_chk").val() == "") {
                alert('비밀번호를 입력해주세요.');
                $('#password_chk').focus();
                window.scrollTo({top: $('#password_chk').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else {
                var pw1 = $("#password").val();
                var pw2 = $("#password_chk").val();
                if (pw1 != pw2) {
                    alert('입력한 두개의 비밀번호가 서로 일치하지 않습니다.');
                    $('#password_chk').focus();
                    window.scrollTo({top: $('#password_chk').offset().top - sctAnimate, behavior: 'smooth'});
                    return false;
                }
            }
        }

        if($('#company').length){
            $('#company').val($('#company').val().trim()); 
            if ($('#company').val() == '') {
                alert('회사명을 확인하세요.');
                $('#company').focus();
                window.scrollTo({top: $('#company').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#name').length){
            $('#name').val($('#name').val().trim()); 
            if ($('#name').val() == '') {
                alert('이름을 입력하세요.');
                $('#name').focus();
                window.scrollTo({top: $('#name').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else if(!nameReg.test($('#name').val())){
                alert('이름을 확인하세요. (한글 2~5자 이내 또는 영문)');
                $('#name').focus();
                window.scrollTo({top: $('#name').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#birthday').length){
            $('#birthday').val($('#birthday').val().trim()); 
            if ($('#birthday').val() == '') {
                alert('생년월일을 확인하세요.(ex)1991-01-02)');
                $('#birthday').focus();
                window.scrollTo({top: $('#birthday').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else if(!birthReg.test($('#birthday').val())){
                alert('생년월일을 확인하세요. 예시) 1998-01-02');
                $('#birthday').focus();
                window.scrollTo({top: $('#birthday').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('input[name="gender"]').length){
            let genderChk = $('input[name="gender"]').is(":checked");
            if(!genderChk){
                alert('성별을 체크해주세요.');
                window.scrollTo({top: $('.form_box.gender').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('input[name="time"]').length){
            let timeChk = $('input[name="time"]').is(":checked");
            if(!timeChk){
                alert('예약 선택시간을 체크해주세요.');
                window.scrollTo({top: $('.calendar_wr').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('input[name="consult_cate"]').length){
            let consultCateChk = $('input[name="consult_cate"]').is(":checked");
            if(!consultCateChk){
                alert('상담분야를 체크해주세요.');
                window.scrollTo({top: $('.consult_cate_wr').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('input[name="lens_state"]').length){
            let lensStateChk = $('input[name="lens_state"]').is(":checked");
            if(!lensStateChk){
                alert('렌즈 착용 여부를 체크해주세요.');
                window.scrollTo({top: $('.lens_state_wr').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('input[name="first_yn"]').length){
            let firstYnChk = $('input[name="first_yn"]').is(":checked");
            if(!firstYnChk){
                alert('초/재진 구분을 체크해주세요.');
                window.scrollTo({top: $('.first_yn_wr').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('input[name="reserve_cate"]').length){
            let reserveCateChk = $('input[name="reserve_cate"]').is(":checked");
            if(!reserveCateChk){
                alert('종류를 체크해주세요.');
                window.scrollTo({top: $('.reserve_cate_wr').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#nameDirect').length){
            $('#nameDirect').val($('#nameDirect').val().trim()); 
            if ($('#nameDirect').val() == '') {
                alert('이름을 입력하세요.');
                $('#nameDirect').focus();
                window.scrollTo({top: $('#nameDirect').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else if(!nameReg.test($('#nameDirect').val())){
                alert('이름을 확인하세요. (한글 2~4자 이내)');
                $('#nameDirect').focus();
                window.scrollTo({top: $('#nameDirect').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#birth').length){
            $('#birth').val($('#birth').val().trim()); 
            if ($('#birth').val() == '') {
                alert('생년월일을 확인하세요.(ex)1991-01-02)');
                $('#birth').focus();
                window.scrollTo({top: $('#birth').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else if(!birthReg.test($('#birth').val())){
                alert('생년월일을 확인하세요. 예시) 1998-01-02');
                $('#birth').focus();
                window.scrollTo({top: $('#birth').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#phone').length){
            $('#phone').val($('#phone').val().trim()); 
            if ($('#phone').val() == '') {
                alert('연락처를 확인하세요.');
                $('#phone').focus();
                window.scrollTo({top: $('#phone').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else if(!phoneReg.test($('#phone').val())){
                alert('연락처를 확인하세요.');
                $('#phone').focus();
                window.scrollTo({top: $('#phone').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#phone01').length){
            $('#phone01').val($('#phone01').val().trim()); 
            if ($('#phone01').val() == '') {
                alert('연락처를 확인하세요.');
                $('#phone01').focus();
                window.scrollTo({top: $('#phone01').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else if(!phoneReg01.test($('#phone01').val())){
                alert('연락처를 확인하세요.');
                $('#phone01').focus();
                window.scrollTo({top: $('#phone01').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#phone02').length){
            $('#phone02').val($('#phone02').val().trim()); 
            if ($('#phone02').val() == '') {
                alert('연락처를 확인하세요.');
                $('#phone02').focus();
                window.scrollTo({top: $('#phone02').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else if(!phoneReg02.test($('#phone02').val())){
                alert('연락처를 확인하세요.');
                $('#phone02').focus();
                window.scrollTo({top: $('#phone02').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#phone03').length){
            $('#phone03').val($('#phone03').val().trim()); 
            if ($('#phone03').val() == '') {
                alert('연락처를 확인하세요.');
                $('#phone03').focus();
                window.scrollTo({top: $('#phone03').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else if(!phoneReg03.test($('#phone03').val())){
                alert('연락처를 확인하세요.');
                $('#phone03').focus();
                window.scrollTo({top: $('#phone03').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#kind').length){
            const selected = $('#kind').siblings('.nice-select').find('ul li.selected');
            if(selected.text() === '선택하세요' || selected.length === 0){
                alert(`상담 종류를 선택하세요.`);
                $('#kind').focus();
                window.scrollTo({top: $('#kind').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#route').length){
            const selected = $('#route').siblings('.nice-select').find('ul li.selected');
            if(selected.text() === '선택하세요' || selected.length === 0){
                alert(`내원 경로를 선택하세요.`);
                $('#route').focus();
                window.scrollTo({top: $('#route').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#pw01').length){
            if($('#pw01').hasClass("online")){
                if ($("#pw01").val() == "") {
                    alert('비밀번호를 입력해주세요.');
                    $('#pw01').focus();
                    window.scrollTo({top: $('#pw01').offset().top - sctAnimate, behavior: 'smooth'});
                    return false;
                } else if(!pwOnlineReg.test($('#pw01').val())){
                    alert('비밀번호를 확인하세요. (영문 또는 숫자 4자리 이상)');
                    $('#pw01').focus();
                    window.scrollTo({top: $('#pw01').offset().top - sctAnimate, behavior: 'smooth'});
                    return false;
                }
            } else {
                if ($("#pw01").val() == "") {
                    alert('비밀번호를 입력해주세요.');
                    $('#pw01').focus();
                    window.scrollTo({top: $('#pw01').offset().top - sctAnimate, behavior: 'smooth'});
                    return false;
                } else if(!pwReg.test($('#pw01').val())){
                    alert('비밀번호를 확인하세요. (영문+숫자 6~12자리)');
                    $('#pw01').focus();
                    window.scrollTo({top: $('#pw01').offset().top - sctAnimate, behavior: 'smooth'});
                    return false;
                }
            }
        }

        if($('#pw02').length){
            if ($("#pw02").val() == "") {
                alert('비밀번호를 입력해주세요.');
                $('#pw02').focus();
                window.scrollTo({top: $('#pw02').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else {
                var pw1 = $("#pw01").val();
                var pw2 = $("#pw02").val();
                if (pw1 != pw2) {
                    alert('입력한 두개의 비밀번호가 서로 일치하지 않습니다.', pw1, pw2);
                    $('#pw02').focus();
                    window.scrollTo({top: $('#pw02').offset().top - sctAnimate, behavior: 'smooth'});
                    return false;
                }
            }
        }

        if($('#email').length && !$('#email').hasClass('no_test')){
            $('#email').val($('#email').val().trim()); 
            if ($('#email').val() == '') {
                alert('이메일을 확인하세요.');
                $('#email').focus();
                window.scrollTo({top: $('#email').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else if(!emailReg.test($('#email').val())){
                alert('이메일을 확인하세요.');
                $('#email').focus();
                window.scrollTo({top: $('#email').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#email01').length){
            $('#email01').val($('#email01').val().trim()); 
            if ($('#email01').val() == '') {
                alert('이메일을 확인하세요.');
                $('#email01').focus();
                window.scrollTo({top: $('#email01').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else if(!email01Reg.test($('#email01').val())){
                alert('이메일을 확인하세요.');
                $('#email01').focus();
                window.scrollTo({top: $('#email01').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#email02').length){
            $('#email02').val($('#email02').val().trim()); 
            if ($('#email02').val() == '') {
                alert('이메일 주소를 확인하세요.');
                $('#email02').focus();
                window.scrollTo({top: $('#email02').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else if(!email02Reg.test($('#email02').val())){
                alert('이메일 주소를 확인하세요.');
                $('#email02').focus();
                window.scrollTo({top: $('#email02').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#emailDirect').length && !$('#emailDirect').hasClass('dis-no')){
            $('#emailDirect').val($('#emailDirect').val().trim()); 
            if ($('#emailDirect').val() == '') {
                alert('이메일 주소를 확인하세요.');
                $('#emailDirect').focus();
                window.scrollTo({top: $('#emailDirect').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            } else if(!email02Reg.test($('#emailDirect').val())){
                alert('이메일 주소를 확인하세요.');
                $('#emailDirect').focus();
                window.scrollTo({top: $('#emailDirect').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        // if($('#address_zipcode').length){
        //     $('#address_zipcode').val($('#address_zipcode').val().trim()); 
        //     if ($('#address_zipcode').val() == '') {
        //         alert('우편번호를 확인하세요.');
        //         $('#address_zipcode').focus();
        //         window.scrollTo({top: $('#address_zipcode').offset().top - sctAnimate, behavior: 'smooth'});
        //         return false;
        //     }
        // }

        // if($('#address01').length){
        //     $('#address01').val($('#address01').val().trim()); 
        //     if ($('#address01').val() == '') {
        //         alert('주소를 확인하세요.');
        //         $('#address01').focus();
        //         window.scrollTo({top: $('#address01').offset().top - sctAnimate, behavior: 'smooth'});
        //         return false;
        //     }
        // }

        // if($('#address02').length){
        //     $('#address02').val($('#address02').val().trim()); 
        //     if ($('#address02').val() == '') {
        //         alert('상세 주소를 확인하세요.');
        //         $('#address02').focus();
        //         window.scrollTo({top: $('#address02').offset().top - sctAnimate, behavior: 'smooth'});
        //         return false;
        //     }
        // }

        if($('#subject').length){
            $('#subject').val($('#subject').val().trim()); 
            if ($('#subject').val() == '') {
                alert('문의 제목을 확인하세요.');
                $('#subject').focus();
                window.scrollTo({top: $('#subject').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($('#content').length){
            $('#content').val($('#content').val().trim()); 
            if ($('#content').val() == '') {
                alert('문의 내용을 확인하세요.');
                $('#content').focus();
                window.scrollTo({top: $('#content').offset().top - sctAnimate, behavior: 'smooth'});
                return false;
            }
        }

        if($("#agree_privacy_b").length){
            let agree = $("#agree_privacy_b").is(":checked");
            if (!agree) {
                alert('필수약관에 동의해주세요.');
                window.scrollTo({top: $('.agree_privacy_box').offset().top, behavior: 'smooth'});
                return false;
            }
        }

        if($("#agree_privacy_landing").length){
            let agree = $("#agree_privacy_landing").is(":checked");
            if (!agree) {
                alert('필수약관에 동의해주세요.');
                window.scrollTo({top: $('.agree_privacy_box').offset().top, behavior: 'smooth'});
                return false;
            }
        }
    })
})


// file 
function addfile(idx) {
    var temp = true;
    var maxUpload = 1024 * 1024 * 10;
    var fileSize = $("#upload")[0].files[0].size;
    var filename = $(idx).val().split('/').pop().split('\\').pop();

    if (fileSize > maxUpload) {
        alert("최대 10MB까지 첨부 가능합니다.");
        temp = false;
        return;
    }

    if (filename != "") {
        $('#upload_name').val(filename);
        $('.del_btn').removeClass('dis-no');
    }
}
