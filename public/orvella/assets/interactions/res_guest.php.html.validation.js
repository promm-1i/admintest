
            $(function() {
                var $form = $('#guest-form');    // 폼 ID
                var $btnSearch = $('#btn-search'); // 조회 버튼 ID
                $form.validate({
                    rules: {
                        search_type: { required: true }, // 조회 구분 필수
                        user_name: { required: true },
                        user_password: { required: true, minlength: 4 }, // 비밀번호 최소 4자리
                        user_phone: { required: true, digits: true, minlength: 10, maxlength: 11 }
                    },
                    messages: {
                        search_type: "조회할 구분을 선택해주세요.",
                        user_name: "이름을 입력해주세요.",
                        user_password: {
                            required: "비밀번호를 입력해주세요.",
                            minlength: "비밀번호를 정확히 입력해주세요."
                        },
                        user_phone: {
                            required: "휴대폰번호를 입력해주세요.",
                            digits: "숫자만 입력 가능합니다.",
                            minlength: "올바른 번호를 입력해주세요.",
                            maxlength: "올바른 번호를 입력해주세요."
                        }
                    },
                    errorPlacement: function(error, element) {
                        if (element.is(":radio")) {
                            error.insertAfter(element.closest('.group-items'));
                        } 
                        else {
                            error.insertAfter(element);
                        }
                    },
                    submitHandler: function(form) {
                        alert("입력 내용을 확인했습니다. 접수와 처리 결과는 고객센터로 문의해 주세요.");
                    }
                });
                $btnSearch.on('click', function(e) {
                    e.preventDefault();
                    $form.submit(); // 유효성 검사 시작
                });
            });           
        