
            $(function() {
                var $loginForm = $("#loginForm");
                var $btnLogin = $("#btn-login"); // 버튼 선택자 변수화
                $loginForm.validate({
                    rules: {
                        user_id: {
                            required: true
                        },
                        user_pw: {
                            required: true,
                        }
                    },
                    messages: {
                        user_id: {
                            required: "아이디를 입력해주세요."
                        },
                        user_pw: {
                            required: "비밀번호를 입력해주세요."
                        }
                    }
                });
                $btnLogin.on("click", function(e) {
                    e.preventDefault();
                    if ($loginForm.valid()) {
						alert("계정 확인은 고객센터로 문의해 주세요.");
                    }
                });
                $loginForm.find("input").on("keydown", function(e) {
                    if (e.keyCode === 13) { // 13 = Enter Key
                        e.preventDefault(); // 기본 form submit 방지
                        $btnLogin.trigger("click"); // 버튼 클릭 이벤트를 강제로 발생시킴
                    }
                });
            });       
        