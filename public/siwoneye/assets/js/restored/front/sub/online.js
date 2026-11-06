$(function(){
    // datepicker
    $('.datepicker').each(function(){
        $(this).datepicker({
            dateFormat : 'yy-mm-dd',
            prevText: '이전 달',
            nextText: '다음 달',
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            showMonthAfterYear: true,
            yearSuffix: '년',
            minDate: 0
        });
    })
    // datepicker 예약 선택일
    $(".datepicker").on("change",function(){
        var selected = $(this).val();
        $('#date').val(selected)
    });

    // 링크 이동
    $('.reservation .table_list tr').click(function(){
        let link = $(this).find('a');
        if(link.length){
            location.href = link.attr('href');
        }
    })

})
