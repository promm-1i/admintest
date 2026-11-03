
            $(document).ready(function() {
                $("#pwfindForm").validate({
                    rules: {
                        user_id: {
                            required: true
                        }
                    },
                    messages: {
                        user_id: {
                            required: "아이디를 입력해주세요."
                        }
                    },
                    errorPlacement: function(error, element) {
                        error.addClass('error-msg');
                        error.insertAfter(element);
                    }
                });
                $("#btn-ok").click(function() {
                    if ($("#pwfindForm").valid()) {
						alert("비밀번호 확인은 고객센터로 문의해 주세요.");
                    }
                });
            });
        