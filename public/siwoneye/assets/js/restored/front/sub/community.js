$(function(){

    // 링크 이동
    $('.notice .table_list tr').click(function(){
        let link = $(this).find('a');
        if(link.length){
            location.href = link.attr('href');
        }
    })

    // 게시물 0개 시 문구 노출
    $('.board_list').attr("id", "com_list");
    $('.table_list').attr('id', 'tableWr');


    function checkBoard() {
        const $board = $('#com_list');
        if ($board.find('li').length === 0) {
            const $message = $('<p>')
                .attr('id', 'emptyBoard')
                .text('검색 결과가 없습니다.');
            $board.after($message);
        }
    }
    function checkTable() {
        if ($('table tr').length === 0) {
            const $message = $('<p>')
                .attr('id', 'emptyBoard')
                .text('검색 결과가 없습니다.');
            $('table').after($message);
        }
    }

    // 페이지가 로드되었을 때와 테이블이 변경될 때마다 테이블을 확인합니다.
    $(document).ready(function() {
        // 공지사항
        checkTable();
        $('table').on('DOMSubtreeModified', checkTable);
        // 미디어/사회공헌/이벤트
        checkBoard();
        $('#com_list').on('DOMSubtreeModified', checkBoard);
    });
})