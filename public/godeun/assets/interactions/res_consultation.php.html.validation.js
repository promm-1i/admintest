
            $(function() {
                var $form = $('#online-reservation-form'); // 폼 ID (기존 ID 유지)
                var $btnConsult = $('#btn-consultation');  // 상담신청 버튼 ID
                $form.validate({
                    rules: {
                        medical_subject: { required: true }, // 진료과목
                        applicant_type: { required: true },  // 신청자 구분
                        consult_title: { required: true },   // 제목
                        user_symptom: { required: true },    // 문의사항 (내용)
                        user_name: { required: true },
                        user_password: { required: true, minlength: 4, digits: true}, // 비밀번호 (최소 4자리)
                        userPwConfirm: { required: true, equalTo: "#user_password", minlength: 4, digits: true}, 
                        user_phone: { required: true, digits: true, minlength: 10, maxlength: 11 },
                        user_email: { required: true, email: true },     // 이메일 형식 체크
                        policy: { required: true }           // 약관 동의
                    },
                    messages: {
                        medical_subject: "진료 과목을 선택해주세요.",
                        applicant_type: "신청자 구분을 선택해주세요.",
                        consult_title: "제목을 입력해주세요.",
                        user_symptom: "문의사항을 입력해주세요.",
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
                        if(!confirm('상담을 신청하시겠습니까?')) return false;
                        alert("입력 내용을 확인했습니다. 접수와 처리 결과는 고객센터로 문의해 주세요.");
                    }
                });
                $btnConsult.on('click', function(e) {
                    e.preventDefault();
                    $form.submit(); // 유효성 검사 시작
                });
				$('#user_password').on('input', function() {
					$form.validate().element(this);
				});
                $('#btn-kakao-chat').on('click', function() {
                    alert("카카오 상담은 고객센터로 문의해 주세요.");
                });
            });        
        