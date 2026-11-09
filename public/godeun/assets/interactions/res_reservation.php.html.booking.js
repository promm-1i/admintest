var ovBookingDisplay={"B-treat1": [{"idx": 3, "name": "윤지안", "position_name": "원장", "schedule": "BTB,BTB,BTB,BTB,BTB,BTB,BTB,BTB,BTB,BTB,BTB,NNB"}], "B-treat2": [{"idx": 10, "name": "정유찬", "position_name": "원장", "schedule": "PTB,PTB,PTB,PTB,BTB,PTB,PTB,PTB,PTB,PTB,BTB,NNB"}, {"idx": 7, "name": "서하린", "position_name": "원장", "schedule": "BTB,BTB,NNB,BTB,PTB,BTB,NNB,BTB,NNB,BTB,NNB,NNB"}], "B-treat3": [{"idx": 10, "name": "정유찬", "position_name": "원장", "schedule": "PTB,PTB,PTB,PTB,BTB,PTB,PTB,PTB,PTB,PTB,BTB,NNB"}, {"idx": 7, "name": "서하린", "position_name": "원장", "schedule": "BTB,BTB,NNB,BTB,PTB,BTB,NNB,BTB,NNB,BTB,NNB,NNB"}], "B-treat4": [{"idx": 6, "name": "박시우", "position_name": "원장", "schedule": "PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,NNB"}], "B-treat5": [{"idx": 6, "name": "박시우", "position_name": "원장", "schedule": "PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,NNB"}, {"idx": 3, "name": "윤지안", "position_name": "원장", "schedule": "BTB,BTB,BTB,BTB,BTB,BTB,BTB,BTB,BTB,BTB,BTB,NNB"}], "B-treat6": [], "B-treat7": [], "P-treat1": [{"idx": 1, "name": "김도윤", "position_name": "원장", "schedule": "ETB,PTB,PTB,PTB,PTB,PTB,ETB,PTB,PTB,PTB,PTB,NNB"}], "P-treat2": [{"idx": 10, "name": "정유찬", "position_name": "원장", "schedule": "PTB,PTB,PTB,PTB,BTB,PTB,PTB,PTB,PTB,PTB,BTB,NNB"}, {"idx": 7, "name": "서하린", "position_name": "원장", "schedule": "BTB,BTB,NNB,BTB,PTB,BTB,NNB,BTB,NNB,BTB,NNB,NNB"}], "P-treat3": [{"idx": 10, "name": "정유찬", "position_name": "원장", "schedule": "PTB,PTB,PTB,PTB,BTB,PTB,PTB,PTB,PTB,PTB,BTB,NNB"}, {"idx": 7, "name": "서하린", "position_name": "원장", "schedule": "BTB,BTB,NNB,BTB,PTB,BTB,NNB,BTB,NNB,BTB,NNB,NNB"}], "P-treat4": [{"idx": 6, "name": "박시우", "position_name": "원장", "schedule": "PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,NNB"}], "P-treat5": [{"idx": 6, "name": "박시우", "position_name": "원장", "schedule": "PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,PTB,NNB"}], "P-treat6": [{"idx": 4, "name": "이준서", "position_name": "원장", "schedule": "PTB,PTB,PTB,PTB,NNB,NNB,PTB,PTB,NNB,PTB,NNB,NNB"}], "P-treat7": []};

			var datepicker;
			$("input[name=hospital_loc],input[name=medical_subject]").change(function(){
				clear_calendar();
				get_doctor_list();
			});
			function booking_init(){
				get_doctor_list();
				clear_calendar();
				setTimeout(function(){
					var didx = $("input[name=didx]").val();
					$("input[name=doctor_id][value=" + didx + "]").prop("checked", true );
					if( didx ){
						set_calendar( $("input[name=doctor_id]:checked")[0] );
					}	
				}, 1000);
			}
			function get_doctor_list(){
var param={hospital_id:$('input[name=hospital_loc]:checked').val(),treat_id:$('input[name=medical_subject]:checked').val()};
var resultData={list:ovBookingDisplay[(param.hospital_id||'')+'-'+(param.treat_id||'')]||[]};
 $('#doctor_list').empty();
 $.each(resultData.list,function(i,v){
  var box=$('<div class="radio-box"><label><input type="radio" name="doctor_id"><span></span></label></div>');
  box.find('input').val(v.idx).attr('data-schedule',v.schedule).on('click',function(){set_calendar(this);});
  box.find('span').text(v.name+' '+v.position_name);$('#doctor_list').append(box);
 });
}
			function set_time_table( date ){
				if( !date ) return false;
				var hospital_id			= $("input[name=hospital_loc]:checked").val();
				var current_schedule	= $("input[name=doctor_id]:checked").data("schedule");
				var schedule_arr		= current_schedule.split(",");
				var current_day			= new Date( date );
				var w_day				= current_day.getDay() - 1; //설계상 월요일부터 시작이라 1 빼줌
				var am = schedule_arr[w_day] || "";
				var pm = schedule_arr[w_day + 6] || "";
				$("#btn_am").removeClass("active");
				$("#btn_pm").removeClass("active");
				if( am.indexOf( hospital_id ) === 0 ){
					$("#btn_am").prop("disabled", false);
				}else{
					$("#btn_am").prop("disabled", true);
				}
				if( pm.indexOf( hospital_id ) === 0 ){
					$("#btn_pm").prop("disabled", false);
				}else{
					$("#btn_pm").prop("disabled", true);
				}
			}
			function set_calendar( input ){
				clear_calendar();
				if(!input)return;var schedule = $(input).data("schedule");
				if( schedule ){
					var schedule_arr = schedule.split(",");
					var week_flag = [0,0,0,0,0,0];
					var hospital_id = $("input[name=hospital_loc]:checked").val();
					for( var i = 0; i < 6; ++i ){
						if( schedule_arr[i].indexOf(hospital_id) == 0 || schedule_arr[i + 6].indexOf(hospital_id) == 0 ){
							week_flag[i] = 1;
						}else{
							week_flag[i] = 0;
						}
					}
					var disable_data = getDatesByWeekFlags( week_flag, 0 );
					var enable_data = getDatesByWeekFlags( week_flag, 1 );
					datepicker.disableDate(disable_data);
					datepicker.enableDate(enable_data);
				}
			}
			function clear_calendar(){
				$("#btn_am").prop("disabled", true);
				$("#btn_pm").prop("disabled", true);
				$("#btn_am").removeClass("active");
				$("#btn_pm").removeClass("active");
				datepicker.clear();
				var week_flag = [1,1,1,1,1,1];
				var enable_data = getDatesByWeekFlags( week_flag, 1 );
				datepicker.disableDate(enable_data);
			}
			function getDatesByWeekFlags(weekFlags, flag) {
				if (!Array.isArray(weekFlags) || weekFlags.length !== 6) {
					throw new Error("입력은 [월~토] 6개의 요소를 가진 배열이어야 합니다.");
				}	
				const result = [];
				const today = new Date();
				const endDate = new Date(today);
				endDate.setMonth(endDate.getMonth() + 3);
				const current = new Date(today);
				while (current <= endDate) {
					const jsDay = current.getDay(); 
					if (jsDay !== 0) { // 일요일 제외
						const weekIndex = jsDay - 1; // 월=0, 화=1, ..., 토=5
						if (weekFlags[weekIndex] === flag) {
							const yyyy = current.getFullYear();
							const mm = String(current.getMonth() + 1).padStart(2, "0");
							const dd = String(current.getDate()).padStart(2, "0");
							result.push(`${yyyy}-${mm}-${dd}`);
						}
					}
					current.setDate(current.getDate() + 1);
				}
			  return result;
			}
            var swiper_best = new Swiper(".reservation-top-swiper", {
                slidesPerView: 1,
                watchOverflow: true,
                speed: 800,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                },
            });
            $(function() {
                function selectHospitalAndScroll(hospitalValue) {
                    var $targetRadio = $('input[name="hospital_loc"][value="' + hospitalValue + '"]');
                    $targetRadio.prop('checked', true).trigger('change');
                    var $targetSection = $targetRadio.closest('.form-row');
                    if ($targetSection.length > 0) {
                        $('html, body').animate({
                            scrollTop: $targetSection.offset().top - 120 
                        }, 500); // 0.5초 동안 부드럽게 이동
                    }
                }
                $('#btn-pangyo').on('click', function(e) {
                    e.preventDefault(); // a 태그의 # 이동 방지
                    selectHospitalAndScroll('P');
                });
                $('#btn-bundang').on('click', function(e) {
                    e.preventDefault(); // a 태그의 # 이동 방지
                    selectHospitalAndScroll('B');
                });  
                $('.btn-time').on('click', function() {
                    var $this = $(this);
                    var val = $this.data('value');
                    $('.btn-time').removeClass('active');
                    $this.addClass('active');
                    $('#time_slot').val(val);
                    $('#time_slot-error').hide(); 
                });
                var $form = $('#online-reservation-form');
                var $btnReserve = $('#btn-reserve');
                $form.validate({
                     rules: {
                        hospital_loc:       { required: true },
                        visit_type:         { required: true },
                        medical_subject:    { required: true },
                        doctor_id:          { required: true },
                        request_date:       { required: true },
                        time_slot:          { required: true },
                        user_name:          { required: true },
                        user_phone:         { required: true, digits: true, minlength: 10, maxlength: 11 },
                        user_birth:         { required: true, digits: true, minlength: 8, maxlength: 8 },
                        userPw:             { required: true, minlength: 6, digits: true}, 
                        userPwConfirm:      { required: true, equalTo: "#userPw", minlength: 6, digits: true}, // #userPw 값과 같은지 확인
                        userZip:            { required: true },
                        userAddress1:       { required: true },
                        userAddress2:       { required: true },
                        user_symptom:       { required: true },
                        gender:             { required: true },
                        policy:             { required: true }
                    },
                    messages: {
                        hospital_loc: "병원을 선택해주세요.",
                        visit_type: "진료 유형(초진/재진)을 선택해주세요.",
                        medical_subject: "진료 과목을 선택해주세요.",
                        doctor_id: "진료 의료진을 선택해주세요.",
                        request_date: "진료 희망일을 선택해주세요.",
                        time_slot: "예약 시간대(오전/오후)를 선택해주세요.",
                        user_name: "환자 성함을 입력해주세요.",
                        gender: "성별을 선택해주세요.",
                        user_phone: {
                            required: "휴대폰번호를 입력해주세요.",
                            digits: "숫자만 입력 가능합니다.",
                            minlength: "올바른 번호를 입력해주세요.",
                            maxlength: "올바른 번호를 입력해주세요."
                        },
                        user_birth: {
                            required: "생년월일 8자리를 입력해주세요.",
                            digits: "숫자만 입력 가능합니다.",
                            minlength: "8자리로 입력해주세요 (예: 19900101).",
                            maxlength: "8자리로 입력해주세요 (예: 19900101)."
                        },
						userPw: {
                            required: "비밀번호는 숫자로 6자리만 입력하실 수 있습니다. ",
                            minlength: "비밀번호는 숫자로 6자리만 입력하실 수 있습니다. ",
							digits: "비밀번호는 숫자로 6자리만 입력하실 수 있습니다. "
                        },
                        userPwConfirm: {
							required: "비밀번호 재입력을 해주세요.",
							equalTo: "비밀번호가 일치하지 않습니다.",
							minlength: "비밀번호는 숫자로 6자리만 입력하실 수 있습니다.",
							digits: "비밀번호는 숫자로 6자리만 입력하실 수 있습니다."
                        },
                        userZip: "우편번호 검색을 해주세요.",
                        userAddress1: "주소를 입력해주세요.",
                        userAddress2: "상세주소를 입력해주세요.",
                        user_symptom: "증상 및 문의사항을 입력해주세요.",
                        policy: "개인정보 취급방침에 동의해주세요."
                    },
                    errorPlacement: function(error, element) {
                        if (element.attr("name") == "request_date") {
                            error.insertAfter(element.closest('.datepicker-box'));
                        }
                        else if (element.is(":radio") || element.is(":checkbox")) {
                            error.insertAfter(element.closest('.group-items'));
                        } 
                        else if (element.attr("name") == "time_slot") {
                            error.insertAfter(element.closest('.time-row'));
                        }
                        else if (element.attr("name") == "userZip") {
                            error.insertAfter(element.siblings('button'));
                        }
                        else {
                            error.insertAfter(element);
                        }
                    },
                    submitHandler: function(form) {
                        if(!confirm('예약을 신청하시겠습니까?')) return false;
						alert("온라인 접수는 준비 중입니다. 문의는 010-4894-4905로 전화 주세요.");
                    }
                });
                $btnReserve.on('click', function(e) {
                    e.preventDefault();
                    $form.submit(); // 유효성 검사 시작
                });
				$('#userPw, #userPwConfirm').on('input', function() {
					$form.validate().element(this);
				});
                function formatDate(date) {
                    const yyyy = date.getFullYear();
                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                    const dd = String(date.getDate()).padStart(2, '0');
                    return `${yyyy}-${mm}-${dd}`;
                }
				const max = new Date();
				const day = max.getDate();
				max.setMonth(max.getMonth() + 3);
				if (max.getDate() !== day) {
				  max.setDate(0); // 이전 달 말일로 보정
				}
                datepicker = new AirDatepicker('#request_date', {
                    inline: false,
                    autoClose: true,
                    locale: {
                        days: ['일', '월', '화', '수', '목', '금', '토'],
                        daysShort: ['일', '월', '화', '수', '목', '금', '토'],
                        daysMin: ['일', '월', '화', '수', '목', '금', '토'],
                        months: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
                        monthsShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
                        today: '오늘',
                        clear: '초기화',
                        dateFormat: 'yyyy-MM-dd',
                        timeFormat: 'hh:mm aa',
                        firstDay: 0,
                    },
					maxDate : max,
					minDate : new Date(),
                    navTitles: {
                        days: function(dp) {
                            const d = dp.viewDate;
                            return `${d.getFullYear()}년 ${d.getMonth() + 1}월`;
                        }
                    },
                    onSelect({formattedDate, date}) {
						set_time_table( date );
                        $('#request_date').valid();
                    },
					onRenderCell({ date, cellType }) {
						if (cellType === 'day' && date.getDay() === 0) {
							return { disabled: true };
						}
					}
                }); 
				booking_init();
            });           
        
function openPostcode() {
    kakao.postcode.load(function() {
        new kakao.Postcode({
            oncomplete: function(data) {
                var addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
                document.getElementById('userZip').value = data.zonecode;
                document.getElementById('userAddress1').value = addr;
                document.getElementById('userAddress2').value = ''; 
                document.getElementById('userAddress2').focus();
                var $currentForm = $("#infoedit-Form").length > 0 ? $("#infoedit-Form") : $("#infoForm");
                if ($currentForm.length > 0 && $currentForm.data('validator')) {
                    $currentForm.validate().element("#userZip");
                    $currentForm.validate().element("#userAddress1");
                }
            }
        }).open();
    });
}

$(function(){$('#btn-zip-search').off('click.ovPostcode').on('click.ovPostcode',function(e){e.preventDefault();openPostcode();});});