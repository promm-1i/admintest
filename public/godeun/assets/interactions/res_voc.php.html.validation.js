
            $(function() {
                var $form = $('#voc-form');      // 폼 ID
                var $btnSubmit = $('#btn-submit'); // 등록 버튼 ID
                $form.validate({
                    rules: {
                        voc_type: { required: true },    // 구분 (칭찬, 불만 등)
                        writer_type: { required: true }, // 작성자 (환자, 보호자 등)
                        voc_title: { required: true },   // 제목
                        voc_content: { required: true }, // 내용
                        user_name: { required: true },
                        user_password: { required: true, minlength: 4, digits: true}, // 비밀번호 (최소 4자리)
                        userPwConfirm: { required: true, equalTo: "#user_password", minlength: 4, digits: true}, 
                        user_phone: { required: true, digits: true, minlength: 10, maxlength: 11 },
                        user_email: { required: true, email: true },     // 이메일 형식
                        policy: { required: true }       // 약관 동의
                    },
                    messages: {
                        voc_type: "구분을 선택해주세요.",
                        writer_type: "작성자를 선택해주세요.",
                        voc_title: "제목을 입력해주세요.",
                        voc_content: "내용을 입력해주세요.",
                        user_name: "이름을 입력해주세요.",
						user_password: {
                            required: "비밀번호는 숫자로 4자리만 입력하실 수 있습니다. ",
                            minlength: "비밀번호는 숫자로 4자리만 입력하실 수 있습니다. ",
							digits: "비밀번호는 숫자로 4자리만 입력하실 수 있습니다. "
                        },
                        userPwConfirm: {
							required: "비밀번호 재입력을 해주세요.",
							equalTo: "비밀번호가 일치하지 않습니다.",
							minlength: "비밀번호는 숫자로 4자리만 입력하실 수 있습니다.",
							digits: "비밀번호는 숫자로 4자리만 입력하실 수 있습니다."
                        },
                        user_phone: {
                            required: "휴대폰번호를 입력해주세요.",
                            digits: "숫자만 입력 가능합니다.",
                            minlength: "올바른 번호를 입력해주세요.",
                            maxlength: "올바른 번호를 입력해주세요."
                        },
                        user_email: {
                            required: "이메일을 입력해주세요.",
                            email: "올바른 이메일 형식이 아닙니다."
                        },
                        policy: "개인정보 취급방침에 동의해주세요."
                    },
                    errorPlacement: function(error, element) {
                        if (element.is(":radio") || element.is(":checkbox")) {
                            error.insertAfter(element.closest('.group-items'));
                        } 
                        else {
                            error.insertAfter(element);
                        }
                    },
                    submitHandler: function(form) {
                        if(!confirm('작성하신 내용을 등록하시겠습니까?')) return false;
                        alert("입력 내용을 확인했습니다. 접수와 처리 결과는 고객센터로 문의해 주세요.");
                    }
                });
				$('#user_password').on('input', function() {
					$form.validate().element(this);
				});
                $btnSubmit.on('click', function(e) {
                    e.preventDefault();
                    $form.submit(); // 유효성 검사 시작
                });
            });        
        