/*
 * File    : jt-strap.js
 * Author  : STUDIO-JT
 *
 * SUMMARY :
 * JT FUNCTIONS INIT
 * ON LOAD
 * ON RESIZE
 * JT FUNCTIONS
 * HELPERS
 */



(function(){

    

/* **************************************** *
 * JT FUNCTIONS INIT
 * **************************************** */
// INPUT
JT.ui.add( select_init, true );
JT.ui.add( custom_input_email, true );

// LAZYLOAD
JT.ui.add( lazyload_init, true );

// SHARE
JT.ui.add( share_clipboard, true );



/* **************************************** *
 * ON LOAD
 * **************************************** */
window.addEventListener('load', function(){

    // add

});



/* **************************************** *
 * ON RESIZE
 * **************************************** */
// INITIALIZE RESIZE
function handleResize(){

    // setTimeout to fix IOS animation on rotate issue
    setTimeout(function(){

    }, 100);

}

// Init resize on reisize
if( JT.browser('mobile') ) {
    screen.orientation.addEventListener('change', handleResize);
} else {
    window.addEventListener('resize', handleResize);
}



/* **************************************** *
 * JT FUNCTIONS
 * **************************************** */
/**
 * select 커스텀 스타일을 설정합니다.
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 * @see {@link https://github.com/Choices-js/Choices|Choices API}
 * @requires choices.min.js
 * @requires choices.min.css
 * @requires jt-strap.css
 * @requires rwd-strap.css
 *
 * @example
 * <div class="av-jtx-chcx-wr">
 *     <select class="av-jtx-chcx2">
 *         <option value="op1">OP1</option>
 *         <option value="op2">OP2</option>
 *         <option value="op3">OP3</option>
 *     </select>
 * </div>
 */
function select_init() {

    if( !JT.browser('mobile') ) {

        document.querySelectorAll('.av-jtx-chcx2').forEach((select) => {

            new Choices(select, {
                searchEnabled  : false,
                itemSelectText : '',
                shouldSort     : false,
                callbackOnInit: () => {
                    const list = select.closest('.av-chcx').querySelector('.av-chcx-ls-drpx');
                    const inner = list.querySelector('.av-chcx-ls');
                    
                    let thumb;
                    let showTimer;

                    list.addEventListener('mouseenter', () => {
                        if( ( list.offsetHeight < list.querySelector('.av-chcx-ls').scrollHeight ) && JT.smoothscroll.enabled ){
                            JT.smoothscroll.destroy();
                        }
                    });

                    list.addEventListener('mouseleave', () => {
                        if( !JT.smoothscroll.enabled ) JT.smoothscroll.init();
                    });

                    if( list.offsetHeight < inner.scrollHeight ){


                        const scrollbar = document.createElement('div');
                        scrollbar.classList.add('av-jtx-chcx-scrx');
    
                        thumb = document.createElement('span');
                        thumb.classList.add('av-jtx-chcx-scrx-th');
                        thumb.style.height = `${ list.offsetHeight / inner.scrollHeight * 100 }%`;
    
                        scrollbar.appendChild( thumb );
                        list.appendChild( scrollbar );
    
                        inner.addEventListener('scroll', () => {
                            let scrollRange = Math.abs( scrollbar.offsetHeight - inner.scrollHeight );
                            let scrollbarRange = scrollbar.offsetHeight - thumb.offsetHeight;
                            let scrollY = inner.scrollTop;
    
                            gsap.set(thumb, { y: scrollbarRange * scrollY / scrollRange });
                            gsap.to(thumb, { opacity: 1, duration: .3 });

                            clearTimeout( showTimer );
                            showTimer = setTimeout(() => {
                                gsap.to(thumb, { opacity: 0, duration: .3 });
                            }, 1000);
                        });

                    }

                    select.addEventListener('showDropdown', () => {
                        
                        let selected = list.querySelector('.av-chcx-it.av-isx-slcx');

                        if( !selected ) return;
                        
                        gsap.set(inner, { scrollTo: Math.abs( list.getBoundingClientRect().top - selected.getBoundingClientRect().top - inner.scrollTop ), onComplete: () => {
                            gsap.to(thumb, { opacity: 1, duration: .3 });

                            clearTimeout( showTimer );
                            showTimer = setTimeout(() => {
                                gsap.to(thumb, { opacity: 0, duration: .3 });
                            }, 1000);
                        }});

                    });

                    select.addEventListener('hideDropdown', () => {
                        clearTimeout( showTimer );
                        gsap.set(thumb, { opacity: 0 });
                    });
                }
            });

        });

    }

}



/**
 * Image Lazyload
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 * @requires jt-unveil.js
 * @description masonry UI의 경우 jt-lazyload 컨테이너에 jt-lazyload--masonry class를 추가로 붙여서 사용하는 것을 권장합니다.
 *
 * @example
 * <figure class="av-jtx-lzyx">
 * 	 <span class="av-jtx-lzyx-clrx-prvx"></span>
 * 	 <img width="120" height="120" data-unveil="some_img_url.jpg" src="blank.gif" alt="" />
 * 	 <noscript><img src="some_img_url.jpg" alt="" /></noscript>
 * </figure>
 */
function lazyload_init(){
 
    // lazyload
    document.querySelectorAll('[data-unveil]').forEach(( image ) => { 
        new JtLazyload( image, 300, function(){
            image.addEventListener('load', function(){
                if( image.closest('.av-jtx-lzyx') != null ) {
                    image.closest('.av-jtx-lzyx').classList.add('av-jtx-lzyx-lddx');
                } else {
                    image.classList.add('av-jtx-lzyx-lddx');
                }
            });
        });
    });

}



/**
 * URL 클립보드
 * 
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 */
function share_clipboard(){

    if( navigator.clipboard && document.getElementsByClassName('av-jtx-shrx-rlx').length > 0 ){

        let shareTimeline = gsap.timeline();
        let isLoading = false;

        document.querySelector('.av-jtx-shrx-rlx').addEventListener('click', ( e ) => {
            e.preventDefault();
            e.stopPropagation();

            if( isLoading ) return;
            isLoading = true;

            const _this = e.currentTarget;

            if ( 'share' in navigator && JT.browser('mobile') ) {
                const title = document.querySelector('meta[property="og:title"]').getAttribute('content');
                const url = document.querySelector('link[rel="canonical"]').getAttribute('href');

                navigator.share({
                    title: title,
                    url: url,
                }).then(() => { isLoading = false; }).catch(() => { isLoading = false; });
            } else {
                navigator.clipboard.writeText(_this.getAttribute('href')).then(() => {
        
                    if ( !!!document.querySelector('.av-jtx-shrx-tltx') ) {
                        let tooltip = document.createElement('div');
                            tooltip.setAttribute('class', 'av-jtx-shrx-tltx');
                            tooltip.innerHTML = `<p class="av-jtx-typx-15">${ _this.getAttribute('data-tooltip') }</p>`;
            
                        document.body.appendChild( tooltip );
            
                        gsap.set('.av-jtx-shrx-tltx', { autoAlpha: 0 });
                    }
            
                    shareTimeline.kill();
                    shareTimeline = gsap.timeline();
                    shareTimeline.to('.av-jtx-shrx-tltx', { autoAlpha: 1, duration: .7 });
                    shareTimeline.to('.av-jtx-shrx-tltx', { autoAlpha: 0, duration: .7, delay: 2, onComplete: () => { document.querySelector('.av-jtx-shrx-tltx')?.remove(); } });

                    isLoading = false;
                }).catch(() => {
                    isLoading = false;
                });
            }
        });

    }

}



/**
 * Email타입 Input의 자동완성 기능을 설정합니다.
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 * @requires jt-autocomplete.js
 * @requires jt-strap.css
 * @requires rwd-strap.css
 *
 * @example
 * <input id="av-i-mlx" type="av-i-mlx" placeholder="이메일을 입력하세요." />
 */
function custom_input_email(){

    document.querySelectorAll('input[type="email"]').forEach((input) => {

        new JtAutocomplete(input);
        
    });

}



/* **************************************** *
 * HELPERS
 * **************************************** */
/**
 * Vimeo script on demand
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 */
JT.globals.jt_vimeo_ready = function( callback ){

	if( typeof callback != 'function' ) return;

	if( typeof Vimeo == 'undefined' ){

        const prior = document.getElementsByTagName('script')[0];
        
        let script = document.createElement('script');
        script.async = 1;

        script.onload = script.onreadystatechange = function( _, isAbort ) {
            if( isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
                script.onload = script.onreadystatechange = null;
                script = undefined;

                if( !isAbort ) return callback();
            }
        };

        script.src = 'https://player.vimeo.com/api/player.js';
        prior.parentNode.insertBefore(script, prior);
        
	} else {

		return callback();
        
	}

}



})();