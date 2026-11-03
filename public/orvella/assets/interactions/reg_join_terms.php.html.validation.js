
            $(function() {
                var $agreeForm = $("#agreeForm");
                var $btnNext = $("#btn-next");
                $agreeForm.validate({
                    rules: {
                        terms: { required: true },  // 필수
                        policy: { required: true }, // 필수
                        "third-party": { required: false } // 선택 (체크 안 해도 통과)
                    },
                    messages: {
                        terms: { required: "이용약관에 동의해주세요." },
                        policy: { required: "개인정보 수집 및 이용에 동의해주세요." }
                    },
                    errorPlacement: function(error, element) {
                        error.appendTo(element.closest(".group-items"));
                    }
                });
                var $chkGroup = $("input[name='terms'], input[name='policy'], input[name='third-party']"); // 개별 약관들
                var $chkAll = $("#all_terms"); // 전체 동의
                $chkAll.on("click", function() {
                    var isChecked = $(this).is(":checked");
                    $chkGroup.prop("checked", isChecked).trigger("change");
                });
                $chkGroup.on("change", function() {
                    var $this = $(this);
                    var $targetBox = $this.closest(".group").find(".box-view");
                    if ($this.is(":checked")) {
                        $targetBox.slideUp(300);
                    } else {
                        $targetBox.slideDown(300);
                    }
                    var totalCount = $chkGroup.length;
                    var checkedCount = $chkGroup.filter(":checked").length;
                    $chkAll.prop("checked", totalCount === checkedCount);
                });
                $btnNext.on("click", function(e) {
                    e.preventDefault();
                    if ($agreeForm.valid()) {
                        alert("약관 동의를 확인했습니다. 회원가입을 위한 본인 확인은 고객센터로 문의해 주세요.");
                    } else {
                        alert("필수 약관에 동의해주세요.");
                    }
                });
            });            
        