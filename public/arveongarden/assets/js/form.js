/*
 * File    : form.js
 * Author  : STUDIO-JT
 *
 * SUMMARY :
 * GLOBAL VARIABLE
 * INIT
 * FUNCTIONS
 * HELPER
 */



(function(){



/* **************************************** *
 * GLOBAL VARIABLE
 * **************************************** */
JT.globals.validation = jt_validation;

JT.globals.datepicker = {
    locale: {
        ko: {
            days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
            daysShort: ['일', '월', '화', '수', '목', '금', '토'],
            daysMin: ['일', '월', '화', '수', '목', '금', '토'],
            months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            today: '오늘',
            clear: '초기화',
            dateFormat: 'yyyy-MM-dd',
            timeFormat: 'hh:mm aa',
            firstDay: 0
        },
        en: {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            today: 'Today',
            clear: 'Clear',
            dateFormat: 'yyyy-MM-dd',
            timeFormat: 'hh:mm aa',
            firstDay: 0
        },
        cn: {
            days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            daysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            daysMin: ['日', '一', '二', '三', '四', '五', '六'],
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            today: '今天',
            clear: '清除',
            dateFormat: 'yyyy-MM-dd',
            timeFormat: 'hh:mm aa',
            firstDay: 0
        },
        jp: {
            days: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
            daysShort: ['日', '月', '火', '水', '木', '金', '土'],
            daysMin: ['日', '月', '火', '水', '木', '金', '土'],
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            today: '今日',
            clear: 'クリア',
            dateFormat: 'yyyy-MM-dd',
            timeFormat: 'hh:mm aa',
            firstDay: 0,
        }
    },
    init: jt_datepicker
};



/* **************************************** *
 * INIT
 * **************************************** */
JT.ui.add( dayjs_init, true );
JT.ui.add( search_datepicker_init, true );



/* **************************************** *
 * FUNCTIONS
 * **************************************** */
// Dayjs init
function dayjs_init(){

    if( typeof dayjs !== 'undefined' ){

        let locale = document.documentElement.lang || 'ko';

        if( locale === 'jp' ) locale = 'ja';
        if( locale === 'cn' ) locale = 'zh';

        dayjs.locale( locale );
        dayjs.extend( window.dayjs_plugin_objectSupport );
        dayjs.extend( window.dayjs_plugin_customParseFormat );

    }

}



// Search date field init
function search_datepicker_init(){

    const fields = document.querySelectorAll('.av-jtx-sr-fldx[type="date"]');

    fields.forEach(( field ) => {
        jt_datepicker(field, {
            selectDate: field.value,
            toggleSelected: true
        });
        
        if( JT.browser('desktop') ){
            field.type = 'text';
            field.readOnly = true;
        }
    })

}



/* **************************************** *
 * HELPER
 * **************************************** */
/**
 * Form 유효성 처리
 * 
 * @version 1.0.0
 * @author STUDIO-JT (JSH)
 * @requires jt.js
 *
 * @example
 * jt_validation(form, {     // 폼 셀럭터 또는 엘리먼트
 *     disable: false        // 유효성 검사 활성화
 *     dynamic: true,        // 실시간 유효성 검사 여부
 *     on: {
 *         valid: () => {},  // 유효성 통과, 추가 유효성 처리 및 컨펌 처리, return false 처리시 success로 넘어가지 않음
 *         error: () => {},  // 유효성에 통과하지 못했을때 추가 처리
 *         success: () => {} // 유효성 통과 후 처리, submit 처리 수행
 *     }
 * });
 */
function jt_validation( target, args ){

    const form = ( target instanceof HTMLElement ) ? target : document.querySelector( target );

    if( !form ) return;
    const { disable = false, dynamic = true, on = { valid, error, success } } = args || {};

    // Submit 중복클릭 방지를 위한 loading 변수
    let isLoading = false;

    if( dynamic && !disable ){
        // Validation on typing
        form.querySelectorAll('.av-jtx-fm-fldx-vldx').forEach(( field ) => { // Default input fields

            let trigger;

            if( field instanceof HTMLSelectElement ){
                trigger = 'change';
            } else {
                trigger = 'input';
            }

            field.addEventListener(trigger, ( event ) => {
                JT.validation( event.currentTarget );
            });
        });

        // Checkbox
        form.querySelectorAll('.jt-checkbox--required').forEach(( checkbox ) => {
            const checkboxContainer = checkbox.closest('.av-jtx-fm-dtx');
            const checkboxValid     = checkboxContainer.querySelector('.av-jtx-fm-vldx');

            checkbox.querySelectorAll('input[type="checkbox"]').forEach(( check ) => {
                check.addEventListener('change', () => {
                    if( checkedCount( checkbox.querySelectorAll('input[type="checkbox"]') ) < 1 ) {
                        checkboxValid.textContent = '필수 항목을 선택해주세요.';
                        checkboxContainer.classList.add('jt-form__data--error');
                    } else {
                        checkboxValid.textContent = '';
                        checkboxContainer.classList.remove('jt-form__data--error');
                    }
                });
            });
        });

        // Radio
        form.querySelectorAll('.jt-radiobox--required').forEach(( radiobox ) => {
            const radioboxContainer = radiobox.closest('.av-jtx-fm-dtx');
            const radioboxValid     = radioboxContainer.querySelector('.av-jtx-fm-vldx');

            radiobox.querySelectorAll('input[type="radio"]').forEach(( radio ) => {
                radio.addEventListener('change', () => {
                    if( checkedCount( radiobox.querySelectorAll('input[type="radio"]') ) < 1 ) {
                        radioboxValid.textContent = '필수 항목을 선택해주세요.';
                        radioboxContainer.classList.add('jt-form__data--error');
                    } else {
                        radioboxValid.textContent = '';
                        radioboxContainer.classList.remove('jt-form__data--error');
                    }
                });
            });
        });

        // Automail
        form.querySelectorAll('.jt-automail__input').forEach(( input ) => {
            input.closest('.av-jtx-tmlx').addEventListener('click', ( e ) => {
                if( e.target.tagName === 'LI' && !!e.target.closest('.av-jtx-tmlx-ls') ) {
                    JT.validation( input );
                }
            });
        });
    }

    // Validation on submit
    form.addEventListener('submit', ( e ) => {

        e.preventDefault();
        e.stopPropagation();
    
        // Check loading
        if( isLoading ) return;
        isLoading = true;

        let isError = false;

        if( !disable ){
            // Input
            form.querySelectorAll('.av-jtx-fm-fldx-vldx').forEach((el) => {
                if( !JT.validation( el ) ) isError = true;
            });
    
            // Checkbox
            form.querySelectorAll('.jt-checkbox--required').forEach(( checkbox ) => {
                const checkboxContainer = checkbox.closest('.av-jtx-fm-dtx');
                const checkboxValid     = checkboxContainer.querySelector('.av-jtx-fm-vldx');
        
                if( checkedCount( checkbox.querySelectorAll('input[type="checkbox"]') ) < 1 ) {
                    checkboxValid.textContent = checkbox.dataset.msgRequired || '필수 항목을 선택해주세요.';
                    checkboxContainer.classList.add('jt-form__data--error');
        
                    isError = true;
                } else {
                    checkboxValid.textContent = '';
                    checkboxContainer.classList.remove('jt-form__data--error');
                }
            });
    
            // Radiobox
            form.querySelectorAll('.jt-radiobox--required').forEach(( radiobox ) => {
                const radioContainer = radiobox.closest('.av-jtx-fm-dtx');
                const radioboxValid  = radioContainer.querySelector('.av-jtx-fm-vldx');
    
                if( checkedCount( radiobox.querySelectorAll('input[type="radio"]') ) < 1 ){
                    radioboxValid.textContent = radiobox.dataset.msgRequired || '필수 항목을 선택해주세요.';
                    radioContainer.classList.add('jt-form__data--error');
                    
                    isError = true;
                } else {
                    radioboxValid.textContent = '';
                    radioContainer.classList.remove('jt-form__data--error');
                }
            });
        }

        if( ( typeof on.valid === 'function' ) && ( on.valid.call() === false ) ) isError = true;

        // Action
        if( isError ) {

            if( !!form.querySelector('.jt-form__data--error') ){
                gsap.to(window, { duration: .6, scrollTo: JT.offset.top('.jt-form__data--error') - ( document.getElementById('av-i-hd').offsetHeight * 2 ), ease: 'power3.out' });
            }

            if( typeof on.error === 'function' ) on.error.call();

            // loading update
            isLoading = false;

        } else {

            if( typeof on.success === 'function' ) on.success.call();

            // loading update
            isLoading = false;

        }
        
    });

    function checkedCount( node ){
        let count = 0;

        node.forEach((checkbox) => {
            if( checkbox.checked ) count++;
        });

        return count;
    }

}



/**
 * Datepicker
 * 
 * @version 1.0.0
 * @author STUDIO-JT (JSH)
 * @requires jt.js
 * @requires dayjs.min.js
 * @requires air-datepicker.min.js
 * @requires air-datepicker.min.css
 * @requires jt-strap.css
 *
 * @example
 * jt_datepicker(target, {     // 필드 설렉터 또는 엘리먼트
 *     selectDate: new Date(), // 최초 선택 날짜의 date 객체
 *     inline: false           // inline 여부
 *     toggleSelected: false   // 한번 더 클릭시 선택 해제 여부
 *     onRenderCell: () => {}  // 달력이 그려질때 마다 실행될 함수
 *     onSelect: () => {}      // 날짜 선택시 실행될 함수
 * });
 */
function jt_datepicker( target, args ){

    const field = ( target instanceof HTMLElement ) ? target : document.querySelector( target );

    const { selectDate, inline, toggleSelected, onRenderCell, onSelect } = args || {};

    if( ( !inline && JT.browser('mobile') ) || !field ) return;

    let datepicker;
    let locale = document.documentElement.lang || 'ko';

    const options = {
        locale: JT.globals.datepicker.locale[locale],
        classes: 'av-jtx-dtpx',
        autoClose: true,
        inline: inline,
        toggleSelected: toggleSelected,
        position({ $datepicker, $target }) {
            let coords = $target.getBoundingClientRect();
            let top = ( coords.y + coords.height + window.scrollY - 1 );
            let left = ( ( $datepicker.offsetWidth + coords.x ) > document.documentElement.clientWidth ) ? ( coords.x - ( ( $datepicker.offsetWidth + coords.x ) - document.documentElement.clientWidth ) ) : coords.x;
        
            $datepicker.style.left = `${ left }px`;
            $datepicker.style.top = `${ top }px`;
        },
        navTitles: {
            days: `<span class="jt-typo--${ inline ? '09' : '12' }">yyyy. MM</span>`,
            months: `<span class="jt-typo--${ inline ? '09' : '12' }">yyyy</span>`,
            years: `<span class="jt-typo--${ inline ? '09' : '12' }">yyyy1 ~ yyyy2</span>`,
        },
        prevHtml: '<div class="av-airx-dtpx-nv-in"><i class="av-jtx-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.91,12.05l4.3-4.35a1,1,0,0,0-1.42-1.4l-5,5.06a1,1,0,0,0-.29.71,1,1,0,0,0,.3.71l5,4.93a1,1,0,1,0,1.4-1.42Z"/></svg></i></div>',
        nextHtml: '<div class="av-airx-dtpx-nv-in"><i class="av-jtx-ic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.79,7.7l4.3,4.35L8.8,16.29a1,1,0,0,0,1.4,1.42l5-4.93a1,1,0,0,0,.3-.71,1,1,0,0,0-.29-.71l-5-5.06A1,1,0,0,0,8.79,7.7Z"/></svg></i></div>',
        onRenderCell: ({ date, cellType, datepicker }) => {
            if( typeof onRenderCell === 'function' ) onRenderCell( date, datepicker );

            return {
                html: `<div class="av-airx-dtpx-cllx-in"><span class="jt-typo--${ inline ? '15' : '16' }">${ ( cellType === 'day' ) ? dayjs(date).av-dt() : ( cellType === 'month' ) ? `${ dayjs(date).month() + 1 }월` : dayjs(date).year() }</span></div>`
            }
        },
        onShow: () => {
            if( !!datepicker ){
                datepicker.setCurrentView('days');
            }
        },
        onSelect: ({ date }) => {
            if( typeof onSelect === 'function' ) onSelect( date );
            field.dispatchEvent(new Event('change'));
        }
    }

    datepicker = new AirDatepicker(field, options);

    if( !!selectDate ){
        datepicker.selectDate( selectDate );
        datepicker.setViewDate( selectDate );
    }

}



})();