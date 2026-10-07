$(document).ready(function() {

	
	var disabledDays = ["2017-1-28", "2017-1-30", "2017-1-31", "2017-3-1","2017-6-6"];

	
	jQuery(document).ready(function() {
        $("#today").text(new Date().toLocaleDateString());

        
        $.datepicker.setDefaults($.datepicker.regional['ko']);
        $('#date').datepicker({
            minDate: 0,
            maxDate: new Date(2017,5,31),
            beforeShowDay: noDisabledAndSundays
        });
	});

    
    function noDisabledAndSundays(date) {
        var noSundays = (date.getDay() != 0);
        var curYmd = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        var noDisabledDays = true;
        for (var i = 0; i < disabledDays.length; i++) {
            if (disabledDays[i] == curYmd) {
                noDisabledDays = false;
                break;
            }
        }
        return [noSundays && noDisabledDays];
    }

    $(".eb-js-calander").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1900:2014",
        showOn: "both",
        buttonImage: "../img/ico/calendar.gif",
        buttonImageOnly: true,
        dateFormat: 'yy-mm-dd',
        showOtherMonths: true,
        selectOtherMonths: true,
        showMonthAfterYear: true,
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNames: ['년 1월', '년 2월', '년 3월', '년 4월', '년 5월', '년 6월', '년 7월', '년 8월', '년 9월', '년 10월', '년 11월', '년 12월'],
        nextText: '다음 달',
        prevText: '이전 달',
        beforeShowDay: noDisabledAndSundays
    });

});