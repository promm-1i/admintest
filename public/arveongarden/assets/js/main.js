/*
 * File    : main.js
 * Author  : STUDIO-JT
 *
 * SUMMARY :
 * GLOBAL VARIABLE
 * RUN
 * INIT
 * ON LOAD
 * ON RESIZE
 * JT DEFAULT FUNCTIONS
 * OTHER FUNCTIONS
 * HELPER
 */



(function(){



/* **************************************** *
 * GLOBAL VARIABLE
 * **************************************** */
// Slider autoplay progress timeline
let sliderProgress = null;

// Slider observer list
let globalObserver = [];

// Marquee list
let marqueeList = [];

// Sound variable
let globalSound = null;
let globalSoundVol = 0;

// Global gsap clear style list ( prevent lost background image )
JT.globals.clearPropsList = ['transform', 'visibility', 'clip-path', 'opacity', 'width', 'height', 'max-width', 'max-height', 'padding', 'margin', 'top', 'left', 'display', 'position'];

// Global resize func list
JT.globals.resizes = {};

// Global visibility change func list
JT.globals.visibilityChanges = {};

// JT Popup global function
JT.globals.popup = jt_popup;

// Window open popup function
JT.globals.popupWin = jt_popup_win;

// Reservation result scroll function ( use react page )
JT.ui.add(reservation_result_scroll);



/* **************************************** *
 * RUN
 * **************************************** */
init( true );



/* **************************************** *
 * INIT
 * **************************************** */
function init( loadonce ){

    const body = document.body;

    if( is_orientation('portrait') ){
        body.classList.add('av-jtx-rntx-prtx');
    } else {
        body.classList.add('jt-orientation--landscape');
    }

    if( typeof loadonce !== 'undefined' && loadonce === true ) {
        scroll_disable_helper();
    }

    if( !JT.smoothscroll.enabled ){
        JT.smoothscroll.init();
    }

    // Main functions
    if( body.classList.contains('av-hmx') ){

        main_visual_header();
        main_visual_slider();
        main_visual_resize();
        main_visual_motion();
        main_connect_motion();
        main_preview_popup();
        main_garden_motion();
        main_construct_motion();
        main_director_motion();
        main_scenery_slider();

    } else { // Sub functions

        sub_visual_slider();

        garden_intro_motion();
        garden_korea_scroll_motion();
        garden_modern_scroll_motion();
        garden_gallery_tab();

        introduce_about_visual();
        introduce_about_identity();

        introduce_people_gallery_tab();
        introduce_people_popup();
        introduce_people_appeal();

        introduce_history_scroll();
        introduce_history_hover();

        construct_visual_scroll();

        construct_seongok_seowon_intro();
        construct_seongok_seowon_director();

        google_map_init();

        manual_location_traffic_tab();
        manual_service_gallery();

        jt_category();
        jt_accordion();
        jt_anchor();
        jt_search_filter();
        jt_single_select();
        jt_single_scale();

        jt_agreement();
        jt_agreement_popup();

        reservation_result_scroll();
        reservation_useable_popup();
        reservation_receipt_popup();
        reservation_qrcode();

        jt_scenery_popup();

    }

    autoplay_inview();
    footer_float_motion();
    footer_active();

    // First load
    if( typeof loadonce !== 'undefined' && loadonce === true ) {

        // Default functions
        gsap_config();
        minimize_header();
        header_nav();
        skip_nav();
        global_sound_init();
        jt_embed_video();
        header_language();
        footer_float_sticky();
        full_height();
        disable_contextmenu();

        // Barba
        barba_init();

        // Intro set session
        sessionStorage.setItem('intro', 1);

    // >=2nd load
    } else {

        // Init UI
        JT.ui.init();

        // Init onload
        init_onload();

        // Init resize on reisize
        if( JT.browser('mobile') ) {
            screen.orientation.addEventListener('change', init_resize);
        } else {
            window.addEventListener('resize', init_resize);
        }

    }

    // Visibility change event mount
    Object.keys( JT.globals.visibilityChanges ).map(( key ) => {
        document.addEventListener('visibilitychange', JT.globals.visibilityChanges[ key ]);
    });

}



/* **************************************** *
 * ON LOAD
 * **************************************** */
// INITIALIZE ONLOAD
function init_onload(){

    document.body.classList.add('av-jtx-lddx');

}

window.addEventListener('load', init_onload);



/* **************************************** *
 * ON RESIZE
 * **************************************** */
// INITIALIZE RESIZE
function init_resize(){

    // setTimeout to fix IOS animation on rotate issue
    setTimeout(() => {

        if( is_orientation('portrait') ){
            document.body.classList.remove('jt-orientation--landscape');
            document.body.classList.add('av-jtx-rntx-prtx');
        } else {
            document.body.classList.remove('av-jtx-rntx-prtx');
            document.body.classList.add('jt-orientation--landscape');
        }

        // Resize event
        Promise.all(Object.keys( JT.globals.resizes ).map(( key ) => { return JT.globals.resizes[ key ].call() })).then(() => {
            ScrollTrigger.refresh();
        })

    }, 100);

}

// Init resize on reisize
if( JT.browser('mobile') ) {
    screen.orientation.addEventListener('change', init_resize);
} else {
    window.addEventListener('resize', init_resize);
}



/* **************************************** *
 * BARBA
 * **************************************** */
function barba_init(){

    // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
	if( 'scrollRestoration' in history ) {
		history.scrollRestoration = 'manual';
	}

	if( 'history' in window && 'pushState' in history ){

		if( typeof barba === 'undefined' ) return;

		// Prevent current url to reload page
        document.body.addEventListener('click', ( e ) => {

            if( !e.target.closest('a') ) return;

            if( ( e.target.closest('a').href.split('#')[0] === ( location.origin + location.pathname ) ) && !e.target.closest('#av-i-lg') && !( 'barbaPrevent' in e.target.closest('a').dataset ) ){
                e.preventDefault();
                e.stopPropagation();
            }

            if( document.body.classList.contains('av-hmx') && e.target.closest('#av-i-lg') ){
                e.preventDefault();
                e.stopPropagation();

                location.href = e.target.closest('a').href.split('#')[0];
            }

        });

		// track bodyclass to update them a the right time
		let bodyClassesTracker = '';

		// barba init
		barba.init({
            prevent: () => {
                let list = ['reservation-form'];
                let isPrevent = false;

                list.forEach(( bodyClass ) => {
                    if( document.body.classList.contains( bodyClass ) ){
                        isPrevent = true;
                    }
                });

                if( document.querySelector('form.av-jtx-fm') ){
                    isPrevent = true;
                }

                return isPrevent;
            },
            transitions: [
                {
                    name: 'default-transition',
                    leave( data ) {

                        // start Promise
                        return new Promise(( resolve ) => {
                            if( String( data.trigger ).split(' ')[0] !== 'filter' ){
                                gsap.to('#av-i-brbx-wr', { duration: .2, autoAlpha: 0, onComplete: () => resolve() });
                            } else {
                                resolve();
                            }
                        });
                    },
                    enter( data ) {

                        const newDom = data.next.container;

                        if( String( data.trigger ).split(' ')[0] !== 'filter' ){

                            gsap.set(newDom, { autoAlpha: 0 });

                            const parser = new DOMParser();

                            // Update menu (refresh current class)
                            const response = parser.parseFromString( data.next.html, 'text/html' );

                            // Update canonical
                            document.querySelector('link[rel="canonical"').setAttribute('href', data.next.url.href.split('?')[0]);

                            // Update seo
                            document.querySelector('meta[name="description"]').content = response.querySelector('meta[name="description"]').content;
                            document.querySelector('meta[name="keywords"]').content = response.querySelector('meta[name="keywords"]').content;

                            // Update og
                            document.querySelector('meta[property="og:title"]').content = response.querySelector('meta[property="og:title"]').content;
                            document.querySelector('meta[property="og:description"]').content = response.querySelector('meta[property="og:description"]').content;
                            document.querySelector('meta[property="og:url"]').content = response.querySelector('meta[property="og:url"]').content;
                            document.querySelector('meta[property="og:image"]').content = response.querySelector('meta[property="og:image"]').content;

                            // Update body class
                            bodyClassesTracker = response.querySelector('body').getAttribute('class');
                            document.body.setAttribute('class', bodyClassesTracker);

                            // Update logo tag
                            document.querySelector('#av-i-lg').replaceWith( response.querySelector('#av-i-lg') );

                            // Update menu
                            document.querySelector('#av-i-mn').replaceWith( response.querySelector('#av-i-mn') );

                            // Update popup
                            document.querySelectorAll('.av-jtx-pp').forEach(( popup ) => { popup.remove(); });
                            response.querySelectorAll('.av-jtx-pp').forEach(( popup ) => { document.body.appendChild( popup ); });

                            if( data.trigger === 'back' ){
                                // History back
                            } else {
                                gsap.set(window, { scrollTo: 0 });
                            }

                            // Prevent memory leak
                            clean_memory( data.current.container );

                        }

                        // After images are full loaded process the transition
                        imagesLoaded(newDom, () => {
                            gsap.set(newDom, { clearProps: 'all' });
                            gsap.to('#av-i-brbx-wr', { duration: .3, autoAlpha: 1 });

                            init();

                            if( String( data.trigger ).split(' ')[0] === 'filter' ){

                                if( !!document.querySelector('.av-rtcx-bdyx') || !!document.querySelector('.av-jtx-sngx-in') ){
                                    JT.scroll.destroy( true );
                                    gsap.to(window, { duration: .4, scrollTo: ( window.scrollY + ( document.querySelector('.av-rtcx-bdyx') || document.querySelector('.av-jtx-sngx-in') ).getBoundingClientRect().top - document.querySelector('#av-i-hd').offsetHeight ), onComplete: () => {
                                        JT.scroll.restore( true );
                                        JT.globals.minimizeHeader( true );
                                    } });
                                }

                            }
                        });
                    }
                },
                {
                    name: 'self',
                    enter( data ) { // Query string back/forward not working fix (https://barba.js.org/docs/advanced/transitions/#Self)
                        const newDom = data.next.container;

                        imagesLoaded(newDom, () => {
                            gsap.set(newDom, { clearProps: 'all' });
                            gsap.to('#av-i-brbx-wr', { duration: .3, autoAlpha: 1 });

                            init();
                        });
                    }
                }
            ]
        });

    }
}



// CLEAN THE MEMORY
function clean_memory( old ){

	if(typeof gsap.killTweensOf !== "undefined"){
        // killtween
	    JT.killChildTweensOf( gsap.utils.toArray('#av-i-brbx-wr *')[0] );
	}

    if( ScrollTrigger.getAll().length > 0 ) {
		// kill scrolltrigger
        ScrollTrigger.getAll().forEach(( st ) => {
            st.kill();
        });
	}

    // Slider autoplay timeline kill
    sliderProgress?.kill();

    // Disconnect observer
    globalObserver.forEach(( observer ) => { observer.disconnect(); });
    marqueeList.forEach(( marquee ) => { marquee.observer.disconnect(); });

    globalObserver = [];
    marqueeList = [];

	// Clean video memory (http://stackoverflow.com/a/28060352/4780961)
    old.querySelectorAll('video').forEach(( vid ) => {
        if( !vid.paused ) vid.pause();
        vid.src = '';
        vid.querySelector('source').src = '';
        vid.remove();
    });

    // kill all swiper instance
    document.querySelectorAll('.swiper').forEach(( slider ) => { slider.swiper?.destroy() } );

    // Clean body style
    document.body.classList.remove('jt-minimize-layout');
    document.body.removeAttribute('style');

    // Ally : focus clear
    document.querySelector('#av-i-skpx').tabIndex = 0;
    document.querySelector('#av-i-skpx').focus();
    document.querySelector('#av-i-skpx').removeAttribute('tabIndex');

    // Header reset
    document.querySelector('#av-i-hd').classList.remove('minimize', 'av-nbrx');
    document.querySelector('#av-i-hd').removeAttribute('style');

    // Footer reset
    document.querySelector('#av-i-ft').classList.remove('av-ft-ctvx');

    // Float sticky style reset
    document.querySelector('.av-ft-fltx-stcx')?.classList.remove('av-ft-fltx-stcx-fx', 'av-ft-fltx-stcx-shwx');

    // Sound state reset
    if( !globalSound.playing() && globalSoundVol > 0 ){
        globalSound.volume( globalSoundVol );
        globalSound.play();
    }

    // Close menu close
    JT.globals.close_menu( true );

    // Scroll restore
    JT.scroll.restore( true );

    // Resize func reset
    JT.globals.resizes = {}

    // Visibility change func reset
    Object.keys( JT.globals.visibilityChanges ).map(( key ) => {
        document.removeEventListener('visibilitychange', JT.globals.visibilityChanges[ key ]);
        delete JT.globals.visibilityChanges[ key ];
    });

    // Resize event reset
    if( JT.browser('mobile') ){
        screen.orientation.removeEventListener('change', init_resize);
    } else {
        window.removeEventListener('resize', init_resize);
    }

}



/* **************************************** *
 * JT DEFAULT FUNCTIONS
 * **************************************** */
/**
 * CUSTOM GSAP CONFIG ( Remove gsap warning from console )
 *
 * @version 1.0.0
 * @author STUDIO-JT (Nico)
 * @requires gsap.min.js
 */
function gsap_config(){

    gsap.config({
        nullTargetWarn: false,
        trialWarn: false
    });

    // Mobile scroll layout shift fix
    if( typeof ScrollTrigger !== 'undefined' ){

        ScrollTrigger.config({
            autoRefreshEvents: 'visibilitychange, DOMContentloaded, load'
        });

    }

}



/**
 * FIX HEADER ANIMATION
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS, Nico)
 * @requires gsap.min.js
 */
function minimize_header(){

    const header      = document.getElementById('av-i-hd');
    const body        = document.body;
    let currentScroll = 0
    let lastScroll    = 0
    let moveScroll    = 10
    let didScroll     = null;

    if( !header ) return;

    window.addEventListener('scroll', () => {

        didScroll = true;

    });

    setInterval(() => {

        if( didScroll && !body.classList.contains('av-scr-fx') ) {
            has_scrolled();
            didScroll = false;
        }

    }, 50);

    function has_scrolled(){

        currentScroll = window.scrollY;

        // Make sure they scroll more than move scroll
        if( ( Math.abs(lastScroll - currentScroll) <= moveScroll ) || document.body.classList.contains('.av-hm-kv-rnnx') ) return;

        if( currentScroll > lastScroll ){ // ScrollDown or Minimize fixed
            if( currentScroll > header.offsetHeight ){
                set_minimize( true );
            }
        }
        else { // ScrollUp
            set_minimize( false );
        }

        lastScroll = currentScroll;

    }

    function set_minimize( enable = true ){

        if( enable ){
            gsap.to(header, { duration: .4, autoAlpha: 0, y: -header.offsetHeight, ease: 'power3.out', onStart: () => {
                body.classList.add('jt-minimize-layout');
                header.classList.add('minimize');
            }});
        } else {
            gsap.to(header, {duration: .4, autoAlpha: 1, y: 0, ease: 'power3.out', onComplete: () => {
                body.classList.remove('jt-minimize-layout');
                header.classList.remove('minimize');
            }});
        }

    }

    JT.globals.minimizeHeader = set_minimize;

}



/**
 * small screen navigation
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 * @requires gsap.min.js
 * @requires jt.js
 */
function header_nav(){

    const body          = document.body,
          menuBtn       = document.querySelector('.av-mn-cntx'),
          menuBtnLine01 = document.querySelector('.av-mn-cntx-rl-01'),
          menuBtnLine02 = document.querySelector('.av-mn-cntx-rl-02'),
          menuContainer = document.querySelector('#av-i-mn-cont'),
          menuOverlay   = document.querySelector('.av-mn-cont-vrlx');
    let   isLoading     = false;
          isRun         = false;

    if( !menuContainer ) return;

    // 2댑스 메뉴 아코디언 기능 추가
    menuContainer.addEventListener('click', ( e ) => {

        if( !!e.target.closest('#av-i-mn > li.av-mn-it-hsx-chlx > a') && JT.isScreen(1023) ){
            e.preventDefault();
            e.stopPropagation();

            if( isRun ) return;
            isRun = true;

            const item = e.target;
            const currList = item.closest('li');
            const currChild = currList.querySelector(':scope > ul');

            if( window.getComputedStyle(currChild).display === 'none' ) {

                menuContainer.querySelectorAll('#av-i-mn > li').forEach( ( item ) => item.classList.remove('av-mn-it-pnx') );
                currList.classList.add('av-mn-it-pnx');

                menuContainer.querySelectorAll('#av-i-mn > li:not(.av-mn-it-pnx) ul.av-sb-mn').forEach( ( item ) => JT.slide.up(item) );
                JT.slide.down(currChild, 500, () => { isRun = false });

            } else {

                currList.classList.remove('av-mn-it-pnx');
                JT.slide.up(currChild, 500, () => { isRun = false });

            }
        }

    });

    menuBtn.addEventListener('click', ( e ) => {
        e.preventDefault();
        e.stopPropagation();

        if( isLoading ) return;
        isLoading = true;

        if( !body.classList.contains('av-pnx-mn') ){
            open_menu();
        } else {
            close_menu();
        }
    });

    menuOverlay.addEventListener('click', () => {

        if( isLoading ) return;
        isLoading = true;

        close_menu();

    });

    // 메뉴 열기
    function open_menu(){

        body.classList.add('av-pnx-mn');

        // Active menu check
        menuContainer.querySelectorAll('#av-i-mn > li').forEach(( item ) => {
			if( item.classList.contains('av-crrx-mn-ncsx') || item.classList.contains('av-crrx-mn-it') ){
                item.classList.add('av-mn-it-pnx');

				if( !!item.querySelector(':scope > ul') ) {
                    item.querySelector(':scope > ul').style.display = 'block';
				}

				return false;
			}
        });

        // Show
		gsap.fromTo(menuContainer, {
		    autoAlpha: 0,
		}, {
		    autoAlpha: 1,
		    duration: .3,
		    ease: 'power3.out',
		    onStart: () => {
                // Scroll
                scroll_fixed( false );
		        menuContainer.style.display = 'block';
                gsap.to('.av-mn-cntx-tx-trcx', { duration: .3, y: -( document.querySelector('.av-mn-cntx-tx').offsetHeight ), ease: 'none' });
                gsap.set('#av-i-mn', { scrollTo: menuContainer.querySelector('#av-i-mn > li.av-crrx-mn-ncsx')?.offsetTop || 0 })
		    },
            onComplete: () => {
                isLoading = false;
            }
		});

        const positionY = menuBtn.querySelector('.av-mn-cntx-bx').getBoundingClientRect().width / 5.3; // Rem fix
		gsap.to(menuBtnLine01, { y: positionY, rotation: 45, duration: .3, ease: 'power4.inOut' });
		gsap.to(menuBtnLine02, { y: -positionY, rotation: -45, duration: .3, ease: 'power4.inOut' });

    }

    // 메뉴 닫기
    function close_menu( reset ){

		gsap.to(menuContainer, {
			autoAlpha: 0,
            duration: .3,
			ease: 'power3.out',
            onStart: () => {
                gsap.to('.av-mn-cntx-tx-trcx', { duration: .3, y: 0, ease: 'none' });
                if( !reset ) scroll_fixed( true );
            },
            onComplete: () => {
                menuContainer.style.display = 'none';

				menuContainer.querySelectorAll('#av-i-mn > li').forEach( ( item ) => item.classList.remove('av-mn-it-pnx') );
                menuContainer.querySelectorAll('#av-i-mn > li > ul').forEach( ( item ) => gsap.set(item, { clearProps: 'display' }) );

                body.classList.remove('av-pnx-mn');

                isLoading = false;
            }
        });
		gsap.to(menuBtnLine01, { y: 0, rotation: 0, duration: .3, ease: 'power4.inOut' });
		gsap.to(menuBtnLine02, { y: 0, rotation: 0, duration: .3, ease: 'power4.inOut' });

    }

	// Device rotation fix
    function header_nav_resize(){

        menuContainer.querySelectorAll('li.av-mn-it-pnx').forEach(( li ) => { li.classList.remove('av-mn-it-pnx'); });
        menuContainer.querySelectorAll('#av-i-mn > li > ul').forEach(( ul ) => { ul.removeAttribute('style'); });

        if( body.classList.contains('av-pnx-mn') ){
            menuContainer.style.display = 'none';
            close_menu();
        }

    }

    if( JT.browser('mobile') ) {
        screen.orientation.addEventListener('change', header_nav_resize);
    } else {
        window.addEventListener('resize', header_nav_resize);
    }

    JT.globals.close_menu = close_menu;

}



/* **************************************** *
 * OTHER FUNCTIONS
 * **************************************** */
// Skip nav event
function skip_nav(){

    const skip = document.querySelector('#av-i-skpx a');

    if( !skip ) return;

    skip.addEventListener('click', ( e ) => {

        e.preventDefault();
        e.stopPropagation();

        const container = document.querySelector( skip.getAttribute('href') );

        if( !container ) return;

        gsap.set(window, { scrollTo: ( container.getBoundingClientRect().top + window.scrollY ), onComplete: () => {
            container.setAttribute('tabIndex', '0');
            container.focus();
            container.removeAttribute('tabIndex');
        } });

    });

}



// Global sound init
function global_sound_init(){

    const sound     = document.querySelector('.av-hd-tlsx-sndx');
    const equalizer = document.querySelector('.av-hd-tlsx-sndx-qlzx path');

    if( !sound ) return;

    globalSound = new Howl({
        src: [ sound.dataset.sound ],
        volume: 0,
        loop: true,
        preload: false,
        html5: true
    });

    globalSound.once('load', () => {
        globalSound.play();
    });

    let soundLinear = gsap.to('.av-hd-tlsx-sndx .av-jtx-ic svg', { duration: 5, repeat: -1, x: -( document.querySelector('.av-hd-tlsx-sndx .av-jtx-ic svg').getBoundingClientRect().width - document.querySelector('.av-hd-tlsx-sndx-qlzx .av-jtx-ic').offsetWidth ), ease: 'none' });

    sound.addEventListener('click', ( e ) => {

        e.preventDefault();
        e.stopPropagation();

        if( sound.classList.contains('header__utils-sound--running') ) return;
        sound.classList.add('header__utils-sound--running');

        if( sound.classList.contains('header__utils-sound--played') ){ // Off

            let volume = { val: 1 };

            globalSoundVol = 0;

            gsap.to(volume, {
                duration: 1,
                val: globalSoundVol,
                ease: 'circ.out',
                onUpdate: () => {
                    globalSound.volume( volume.val.toFixed(2) );
                },
                onStart: () => {
                    sound.classList.add('header__utils-sound--paused');
                    sound.classList.remove('header__utils-sound--played');
                    sound_pause();
                },
                onComplete: () => {
                    globalSound.pause();
                    sound.classList.remove('header__utils-sound--running');
                }
            });

        } else { // On

            let volume = { val: 0 };

            globalSoundVol = 1;

            gsap.to(volume, {
                duration: 1,
                val: globalSoundVol,
                ease: 'circ.out',
                onUpdate: () => {
                    globalSound.volume( volume.val.toFixed(2) );
                },
                onStart: () => {
                    sound.classList.add('header__utils-sound--played');
                    sound.classList.remove('header__utils-sound--paused');
                    sound_play();
                },
                onComplete: () => {
                    sound.classList.remove('header__utils-sound--running');
                }
            });

        }

    });

    function sound_play(){
        if( globalSound._state !== 'loaded' ){
            globalSound.load();
        } else {
            globalSound.play();
        }
        gsap.to(equalizer, { duration: .3, ease: 'none', morphSVG: 'M0,5c5,0,5,11,10,11S15,5,20,5s5,11,10,11S35,5,40,5s5,11,10,11S55,5,60,5s5,11,10,11S75,5,80,5c5,0,5,11,10,11c5,0,5-11,10-11s5,11,10,11c5,0,5-11,10-11' });
    }

    function sound_pause( now ){
        gsap.to(equalizer, { duration: .3, ease: 'none', morphSVG: equalizer.dataset.original });
        if( now ) {
            globalSound.pause();
        }
    }

    function global_sound_resize(){
        soundLinear?.kill();
        gsap.set('.av-hd-tlsx-sndx *', { clearProps: 'all' });
        soundLinear = gsap.to('.av-hd-tlsx-sndx .av-jtx-ic svg', { duration: 5, repeat: -1, x: -( document.querySelector('.av-hd-tlsx-sndx .av-jtx-ic svg').getBoundingClientRect().width - document.querySelector('.av-hd-tlsx-sndx-qlzx .av-jtx-ic').offsetWidth ), ease: 'none' });
    }

    document.addEventListener('visibilitychange', () => {
        if( document.visibilityState === 'visible' ){
            if( sound.classList.contains('header__utils-sound--played') ) sound_play();
        } else {
            if( sound.classList.contains('header__utils-sound--played') ) sound_pause( true );
        }
    });

    if( JT.browser('mobile') ){
        screen.orientation.addEventListener('chnage', global_sound_resize);
    } else {
        window.addEventListener('resize', global_sound_resize);
    }

}



// Header language event
function header_language(){

    const languages = document.querySelectorAll('.av-hd-tlsx-lngx');

    languages.forEach(( language ) => {

        language.querySelector('.av-hd-tlsx-lngx-bt')?.addEventListener('click', ( e ) => {
            
            e.preventDefault();
            e.stopPropagation();
            language.classList.toggle('av-hd-tlsx-lngx-pnx');

        });
        
    });

}



// Footer float motion
function footer_float_motion(){

    const float = document.querySelector('.av-ft-fltx');

    if( !float ) return;

    footer_float_motion_init();

    function footer_float_motion_init(){

        if( !JT.isScreen(540) ){
            const floatTimeline = gsap.timeline({
                scrollTrigger: {
                    id: 'st-footer-float',
                    trigger: '#av-i-ft',
                    scrub: true,
                    start: 'center bottom',
                    end: 'bottom bottom',
                }
            });

            floatTimeline.fromTo('.av-ft-fltx-mgsx', { scale: .3, opacity: 0 }, { scale: 1, opacity: 1 });
            floatTimeline.fromTo('.av-ft-fltx-bt > a', { autoAlpha: 0 }, { autoAlpha: 1 }, '<=');
        }
    }

    JT.globals.resizes['footer_float_resize'] = () => {
        ScrollTrigger.getById('st-footer-float')?.kill();
        gsap.set('#av-i-ft, #av-i-ft *', { clearProps: JT.globals.clearPropsList.join(',') });

        footer_float_motion_init();
    }

}



// Footer float sticky scrolltrigger
function footer_float_sticky(){

    const footer = document.querySelector('#av-i-ft');
    const sticky = document.querySelector('.av-ft-fltx-stcx');

    if( !sticky ) return;

    window.addEventListener('scroll', () => {
        if( JT.isScreen(1023) ){
            let scrollPoint =  window.innerHeight;

            if( window.scrollY < ( document.documentElement.scrollHeight - window.innerHeight - footer.offsetHeight ) ){
                sticky.classList.add('av-ft-fltx-stcx-fx');
            } else {
                sticky.classList.remove('av-ft-fltx-stcx-fx');
                sticky.classList.remove('av-ft-fltx-stcx-shwx');
            }

            if( document.body.classList.contains('av-ntrx-ab') ) scrollPoint = ( document.querySelector('.av-ntrx-ab-kv').scrollHeight - window.innerHeight );

            if( window.scrollY < ( scrollPoint || window.innerHeight ) ){
                sticky.classList.remove('av-ft-fltx-stcx-shwx');
            } else {
                if( sticky.classList.contains('av-ft-fltx-stcx-fx') ){
                    sticky.classList.add('av-ft-fltx-stcx-shwx');
                }
            }

        }
    });

}



// Footer pull up background fix
function footer_active(){

    footer_active_init();

    function footer_active_init(){

        if( JT.browser('ios') ){
            gsap.timeline({
                scrollTrigger: {
                    id: 'st-footer-active',
                    trigger: '#av-i-ft',
                    start:'center bottom',
                    toggleClass: 'av-ft-ctvx'
                }
            });
        }

    }

    JT.globals.resizes['footer_active_resize'] = () => {
        ScrollTrigger.getById('st-footer-active')?.kill();
        footer_active_init();
    }

}



// Embed video poster click event
function jt_embed_video(){

    document.body.addEventListener('click', ( e ) => {

        const poster = e.target.closest('.av-jtx-mbdx-mv-pstx');

        if( !poster ) return;

        const iframe = poster.closest('.av-jtx-mbdx-mv').querySelector('iframe');
        poster.closest('.av-jtx-mbdx-mv').classList.add('av-jtx-mbdx-mv-ldnx');

        JT.globals.jt_vimeo_ready(() => {
            const video = new Vimeo.Player( iframe );

            video.on('play', () => {
                gsap.to(poster, { duration: .2, autoAlpha: 0, onComplete: () => {
                    poster.closest('.av-jtx-mbdx-mv').classList.remove('av-jtx-mbdx-mv-ldnx');
                }});
            });

            video.play().catch(() => {
                poster.closest('.av-jtx-mbdx-mv').classList.remove('av-jtx-mbdx-mv-ldnx');
            });
        });

    });

}



// Tab global event
function jt_tab( target, args ){

    const tab = ( target instanceof HTMLElement ) ? target : document.querySelector( target );

    if( !tab ) return;

    const btns = tab.querySelectorAll('.av-jtx-tb-bt');
    const { scrollTarget = '.av-jtx-tb-bt', speed = 0, callback } = args || {};

    btns.forEach(( btn ) => {

        btn.addEventListener('click', ( e ) => {

            e.preventDefault();
            e.stopPropagation();

            const current = tab.querySelector( btn.getAttribute('href') );

            if( !current || btn.classList.contains('av-jtx-tb-ctvx') ) return;

            tab.querySelector('.av-jtx-tb-bt.av-jtx-tb-ctvx')?.classList.remove('av-jtx-tb-ctvx');

            btn.classList.add('av-jtx-tb-ctvx');

            gsap.to(window, { duration: .4, scrollTo: ( window.scrollY + (( scrollTarget instanceof HTMLElement ) ? scrollTarget : document.querySelector( scrollTarget )).getBoundingClientRect().top - document.querySelector('#av-i-hd').offsetHeight ), onStart: () => {
                JT.scroll.destroy( true );
            }, onComplete: () => {
                JT.scroll.restore( true );
                JT.globals.minimizeHeader( true );
            } });
            gsap.to(tab.querySelector('.av-jtx-tb-ct.av-jtx-tb-ctvx'), { duration: speed, opacity: 0, onComplete: () => {

                tab.querySelector('.av-jtx-tb-ct.av-jtx-tb-ctvx .swiper')?.swiper?.destroy();
                tab.querySelector('.av-jtx-tb-ct.av-jtx-tb-ctvx').classList.remove('av-jtx-tb-ctvx');

                gsap.set(current, { opacity: 0 });
                current.classList.add('av-jtx-tb-ctvx');

                current.querySelectorAll('[data-unveil]').forEach(( unveil ) => {
                    if( !( unveil instanceof HTMLImageElement ) ){
                        unveil.setAttribute('style', `background-image:url(${ unveil.dataset.unveil });`);
                        unveil.classList.add('av-jtx-lzyx-lddx');
                    } else {
                        unveil.setAttribute('src', unveil.dataset.unveil);
                        unveil.closest('.av-jtx-lzyx').classList.add('av-jtx-lzyx-lddx');
                    }
                });

                imagesLoaded(current, () => {

                    gsap.to(current, { duration: speed, opacity: 1, ease: 'power3.out' });

                    ScrollTrigger.refresh();

                    if( typeof callback === 'function' ) callback.call();

                });

            } });

        });

    });

}



// Popup single/multiple and today close
function jt_popup( target, args ){

    const popup = ( target instanceof HTMLElement ) ? target : document.querySelector( target );

    let isOpen = false;

    if( !popup || isOpen ) return;
    isOpen = true;

    const { beforeOpen,  beforeClose, afterOpen, afterClose } = args || {};

    popup.addEventListener('click', close);

    show();

    async function show(){
        scroll_fixed( false );
        
        if( typeof beforeOpen === 'function' ) await beforeOpen( popup );

        popup.querySelectorAll('[data-unveil]').forEach(( unveil ) => {
            if( !( unveil instanceof HTMLImageElement ) ){
                unveil.setAttribute('style', `background-image:url(${ unveil.dataset.unveil });`);
                unveil.classList.add('av-jtx-lzyx-lddx');
            } else {
                unveil.setAttribute('src', unveil.dataset.unveil);
                unveil.closest('.av-jtx-lzyx').classList.add('av-jtx-lzyx-lddx');
            }
        });

        imagesLoaded(popup, async () => {
            gsap.to(popup, { autoAlpha: 1, duration: .3, ease: 'power3.out', onStart: async () => {

                if( typeof afterOpen === 'function' ) await afterOpen( popup );
            }});
        });

    }

    async function close( e ){

        if( e.target.classList.contains('av-jtx-pp') || !!e.target.closest('.av-jtx-pp-cls') ){

            if( typeof beforeClose === 'function' ) await beforeClose( popup, e.target );

            gsap.to(popup, { autoAlpha: 0, duration: .2, ease: 'power3.out', onComplete: () => complete() });

        }
    }

    async function complete(){

        gsap.set([ popup, popup.querySelectorAll('*') ], { clearProps: JT.globals.clearPropsList.join(',') });

        popup.querySelectorAll('*').forEach(( child ) => {
            child.scrollTop = 0;
        });

        if( !globalSound.playing() && ( globalSoundVol > 0 ) ) globalSound.play();

        if( typeof afterClose === 'function' ) await afterClose( popup );

        scroll_fixed( true );

        isOpen = false;

    }
}



// Main popup
function main_popup(){

    const popup = JT.isScreen(860) ? document.querySelector('.av-hm-pp-mo') : document.querySelector('.av-hm-pp');

    if( !popup ) return;

    if( !!JT.cookies.read(`${ popup.id }-today-hide`) ) return;

    init_popup();

    function init_popup(){

        jt_popup(popup, {
            beforeOpen: () => init_slider(),
            afterOpen: () => {
                if( JT.isScreen(860) ){
                    gsap.fromTo(popup.querySelector('.av-jtx-pp-cont'), { y: popup.querySelector('.av-jtx-pp-cont').offsetHeight }, { y: 0, ease: 'power3.out' });
                }
            },
            beforeClose: ( popup, target ) => {
                
                if( !!target.closest('.av-jtx-pp-tdyx') ){
                    JT.cookies.create(`${ popup.id }-today-hide`, 'Y', 1);
                }

                if( JT.isScreen(860) ){
                    gsap.to(popup.querySelector('.av-jtx-pp-cont'), { duration: .2, y: popup.querySelector('.av-jtx-pp-cont').offsetHeight, ease: 'power3.out' });

                }
            },
            afterClose: () => {
                popup.querySelector('.av-jtx-pp-sl2')?.swiper?.destroy();
            }
        });

    }

    function init_slider(){
        return new Promise(( resolve ) => {
            const slider = popup.querySelector('.av-jtx-pp-sl2');

            if( ( slider?.querySelectorAll('.swiper-slide').length || 0 ) <= 1 ){
                resolve();
                return;
            };

            const swiper = new Swiper(slider, {
                init: false,
                loop: true,
                speed: 500,
                preventInteractionOnTransition: true,
                preloadImages: false,
                allowTouchMove: true,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                lazy: {
                    loadPrevNext: true,
                    loadOnTransitionStart: true
                },
                navigation: {
                    nextEl: slider.querySelector('.swiper-button-next'),
                    prevEl: slider.querySelector('.swiper-button-prev')
                },
                autoplay: {
                    delay: 2000,
                },
                pagination: {
                    el: slider.querySelector('.swiper-pagination'),
                    type: 'fraction',
                    renderFraction: ( currentClass, totalClass ) => {
                        return `<span class="${ currentClass } av-jtx-typx-17"></span>
                                    <span class="swiper-pagination-slug av-jtx-typx-17">/</span>
                                <span class="${ totalClass } av-jtx-typx-17"></span>`;
                    }
                },
                on: {
                    init: () => {
                        resolve();
                    }
                }
            });

            swiper.init();
        });

    }

}



// Main visual header class
function main_visual_header(){

    const visual = document.querySelector('.av-hm-kv');
    const header = document.querySelector('#av-i-hd');

    if( !visual ) return;

    ScrollTrigger.create({
        id: 'st-main-visual-header',
        trigger: visual,
        start: '-1rem top',
        end: 'bottom top',
        onToggle: ( self ) => {
            if( self.isActive ){
                header.classList.add('av-nbrx');
            } else {
                header.classList.remove('av-nbrx');
            }
        }
    });

}



// Main visual intro motion
function main_visual_motion(){

    const visual = document.querySelector('.av-hm-kv-sl2');
    const header = document.querySelector('#av-i-hd');

    if( !visual ) return;

    if( !!sessionStorage.getItem('intro') ){

        gsap.set(header, { y: 0, autoAlpha: 1 });

        slider_first_play();

        if( !!document.querySelector('.av-hm-pp') ){
            main_popup();
        }

        return;

    }

    document.body.classList.add('av-hm-kv-rnnx');

    scroll_fixed( false );

    const visualTimeline = gsap.timeline();

    visualTimeline.set(header, { y: -header.offsetHeight, autoAlpha: 0 });
    visualTimeline.fromTo('.av-hm-kv-dntx', { autoAlpha: 1 }, { delay: 2, autoAlpha: 0, duration: 1, scale: 0.9, ease: 'power3.out' });
    if( !JT.isScreen(540) ) visualTimeline.fromTo(visual, { borderWidth: '0rem' }, { duration: 1, borderWidth: '20rem', ease: 'power3.out', onComplete: () => { gsap.set('.av-hm-kv-sl2', { clearProps: 'borderWidth' }); } }, '<=');
    visualTimeline.fromTo('.av-hm-kv .swiper-controls, .av-hm-kv-vrlx, .av-hm-kv-wthx', { autoAlpha: 0 }, { duration: 1, autoAlpha: 1, ease: 'power3.out' }, '<=');
    visualTimeline.fromTo(header, { y: -header.offsetHeight, autoAlpha: 0 },{ duration: 1, y: 0, autoAlpha: 1, ease: 'power3.out', onStart: () => {

        document.body.classList.remove('av-hm-kv-rnnx');

        slider_first_play();
        scroll_fixed( true );

        if( !!document.querySelector('.av-hm-pp') ){
            main_popup();
        }

    }}, '<=');

    function slider_first_play(){

        if( !visual.swiper || visual.classList.contains('main-visual__slider--single') ){
            slider_video_play( visual );
        } else {
            main_visual_transition( visual );
        }

    }

}



// Main visual slider
function main_visual_slider(){

    const slider = document.querySelector('.av-hm-kv-sl2');

    if( !slider ) return;

    if( slider.querySelectorAll('.swiper-slide').length <= 1 ){
        slider.querySelectorAll('.swiper-lazy').forEach(( el ) => { el.style.backgroundImage = 'url(' + el.getAttribute('data-background') + ')'; });

        slider_visibility_observer(slider, 'main-visual-slider');

        slider.querySelectorAll('.av-jtx-bckx-mv-rrrx').forEach(( error ) => {
            error.addEventListener('click', () => {
                slider_video_play( slider );
            });
        });

        slider.classList.add('main-visual__slider--single');

        return;
    }

    let options = {
        init: false,
        loop: false,
        rewind: true, // Video sync fix, only fade mode and disabled loop options required
        speed: 1500,
        preventInteractionOnTransition: true,
        preloadImages: false,
        allowTouchMove: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true
        },
        navigation: {
            nextEl: slider.querySelector('.swiper-button-next'),
            prevEl: slider.querySelector('.swiper-button-prev')
        },
        pagination: {
            el: slider.querySelector('.swiper-pagination'),
            type: 'fraction',
            renderFraction: ( currentClass, totalClass ) => {
                return `<span class="${ currentClass } av-jtx-typx-16"></span>
                            <i class="swiper-pagination-slug av-jtx-ic">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 12">
                                    <path d="M4.54.81l-4,10a.5.5,0,1,0,.92.38l4-10A.5.5,0,1,0,4.54.81"/>
                                </svg>
                            </i>
                        <span class="${ totalClass } av-jtx-typx-16"></span>`;
            }
        },
        on: {
            init: () => {

                slider_visibility_observer(slider, 'main-visual-slider');

                slider.querySelectorAll('.av-jtx-bckx-mv-rrrx').forEach(( error ) => {
                    error.addEventListener('click', () => { main_visual_transition( slider ); });
                });

            },
            realIndexChange: () => {

                main_visual_transition( slider );

            }
        }
    }

    let swiper = new Swiper(slider, options);

    swiper.init();

}



// Main visual resize
function main_visual_resize(){

    const slider = document.querySelector('.av-hm-kv-sl2');

    if( !slider ) return;

    let resizePoint = JT.isScreen(540) ? 540 : JT.isScreen(860) ? 860 : 0;
    let canResize = false;

    JT.globals.resizes['main_visual_resize'] = () => {

        if( JT.isScreen(540) && ( resizePoint !== 540 ) ){
            resizePoint = 540;
            canResize = true;
        }

        if( JT.isScreen(860) && ( resizePoint !== 860 ) ){
            resizePoint = 860;
            canResize = true;
        }

        if( !JT.isScreen(860) && ( resizePoint !== 0 ) ){
            resizePoint = 0;
            canResize = true;
        }

        if( canResize ){
            if( slider?.swiper ){
                main_visual_transition( slider );
            } else {
                slider_video_play( slider );
            }

            canResize = false;
        }

    }

}



// Main visual transition
function main_visual_transition( slider ){

    slider_video_play(slider, {
        isAutoplay: true,
        changeSpeed: 1500,
        changeDelay: 5000
    });

}



// Main connect motion
function main_connect_motion(){

    const connect = document.querySelector('.av-hm-cnnx');

    if( !connect ) return;

    let items = gsap.utils.toArray('.av-hm-cnnx .av-hm-sec-tt, .av-hm-cnnx .av-hm-sec-ds > *, .av-hm-cnnx .av-hm-sec-mr');

    // Init
    main_connect_init();

    function main_connect_init(){

        items.map(( item, idx ) => {
            gsap.set(item, { opacity: 0, rotation: 0.1, y: ( JT.isScreen(860) ? 20 : 40 ) });
            ScrollTrigger.create({
                id: `st-main-connect-${ idx }`,
                trigger: item,
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    gsap.to(item, { duration: 1, opacity: 1, rotation: 0, y: 0, force3D: true, ease: 'power1.out' });
                },
            });
        });

    }

    JT.globals.resizes['main_connect_resize'] = () => {
        items.map(( _, idx ) => {
            ScrollTrigger.getById(`st-main-connect-${ idx }`)?.kill();
        });
        gsap.set('.av-hm-cnnx *', { clearProps: 'all' });
        main_connect_init();
    }

}



// Gallery preview popup init
function main_preview_popup(){

    const trigger = document.querySelector('.av-hm-grdx-prvx');

    if( !trigger ) return;

    trigger.addEventListener('click', ( e ) => {
        e.preventDefault();
        e.stopPropagation();

        jt_popup('.av-hm-krx-prvx-pp', {
            afterOpen: ( popup ) => {
                const src = popup.querySelector('.av-jtx-pp-mbdx').dataset.src;
                const video = document.createElement('video');
                const poster = popup.querySelector('.av-jtx-mbdx-mv-pstx');

                // 사이트 안의 영상 파일을 바로 튼다. 배경 소리는 원본처럼 영상이 도는 동안 멈춘다.
                video.src = src;
                video.controls = true;
                video.playsInline = true;
                video.setAttribute('av-tt2', '');
                video.style.cssText = 'width:100%;height:100%;position:absolute;top:0;left:0;background:#000';
                popup.querySelector('.av-jtx-mbdx-mv-in').append( video );

                video.addEventListener('play', () => {
                    gsap.to(poster, { duration: .2, autoAlpha: 0 });
                    if( globalSound.playing() && globalSoundVol > 0 ){
                        globalSoundVol = globalSound._volume;
                        globalSound.pause();
                    }
                });

                video.addEventListener('pause', () => {
                    if( !globalSound.playing() && globalSoundVol > 0 ){
                        globalSound.play();
                    }
                });

                video.play().catch(() => {});
            },
            afterClose: ( popup ) => {
                const video = popup.querySelector('.av-jtx-mbdx-mv-in video');

                if( video ) video.pause();
                gsap.set(popup.querySelector('.av-jtx-mbdx-mv-pstx'), { autoAlpha: 1 });
                popup.querySelector('.av-jtx-mbdx-mv-in').innerHTML = '';
            }
        });
    });

}



// Main garden motion
function main_garden_motion(){

    const garden = document.querySelector('.av-hm-grdx');

    if( !garden || JT.browser('mobile') ) return;

    garden_scroll_motion_init();

    function garden_scroll_motion_init(){

        garden.querySelectorAll('.av-hm-grdx-sec').forEach(( section, idx ) => {
            let gardenTimeline = gsap.timeline({
                scrollTrigger: {
                    id: `st-main-garden-${ idx }`,
                    trigger: section,
                    pin: true,
                    scrub: true,
                    start: 'top top',
                    end: '50%',
                }
            });
            gardenTimeline.to({}, { duration: .5 });
        });

    }

    JT.globals.resizes['main_garden_resize'] = () => {
        garden.querySelectorAll('.av-hm-grdx-sec').forEach(( _, idx ) => ScrollTrigger.getById(`st-main-garden-${ idx }`)?.kill());
        gsap.set('.av-hm-grdx, .av-hm-grdx *', { clearProps: JT.globals.clearPropsList.join(',') });

        garden_scroll_motion_init();
    }

}



// Main construct motion
function main_construct_motion(){

    const construct = document.querySelector('.av-hm-cnsx');

    if( !construct ) return;

    document.querySelectorAll('.av-hm-cnsx-nchx').forEach(( anchor ) => {

        anchor.addEventListener('click', ( e ) => {

            e.preventDefault();
            e.stopPropagation();

        });

        anchor.addEventListener('mouseenter', () => {

            const image = document.querySelector( anchor.getAttribute('href') );

            if( !image ) return;

            document.querySelector('.av-hm-cnsx-nchx-ctvx')?.classList.remove('av-hm-cnsx-nchx-ctvx');
            anchor.classList.add('av-hm-cnsx-nchx-ctvx');

            document.querySelector('.av-hm-cnsx-pic-ctvx')?.classList.remove('av-hm-cnsx-pic-ctvx');
            image.classList.add('av-hm-cnsx-pic-ctvx');

        });

    });

}



// Main director motion
function main_director_motion(){

    const director = document.querySelector('.av-hm-drcx');
    const container = document.querySelector('.av-hm-drcx-cont');

    if( !director ) return;

    director_scroll_motion_init();

    function director_scroll_motion_init(){

        gsap.set(container, { height: container.scrollHeight });

        gsap.timeline({
            scrollTrigger: {
                id: 'st-main-director',
                trigger: director,
                pin: '.av-hm-drcx-stcx',
                start: 'top top',
                end: 'bottom bottom',
                onLeave: () => {
                    if( !JT.isScreen(860) ) gsap.to('.av-hm-drcx-stcx', { duration: .3, autoAlpha: 0 });
                },
                onEnterBack: () => {
                    if( !JT.isScreen(860) ) gsap.to('.av-hm-drcx-stcx', { duration: .3, autoAlpha: 1 });
                },
                onUpdate: ( self ) => {
                    if( JT.isScreen(860) ){
                        if( self.progress < 1 ){
                            gsap.to(director.querySelector('.av-hm-sec-mr'), { duration: .3, autoAlpha: 0 });
                        } else {
                            gsap.to(director.querySelector('.av-hm-sec-mr'), { duration: .3, autoAlpha: 1 });
                        }
                    }
                }
            }
        });

    }

    JT.globals.resizes['main_director_resize'] = () => {
        ScrollTrigger.getById('st-main-director')?.kill();
        gsap.set('.av-hm-drcx, .av-hm-drcx *', { clearProps: JT.globals.clearPropsList.join(',') });

        director_scroll_motion_init();
    }

}



// Sub visual slider
function sub_visual_slider(){

    const slider = document.querySelector('.av-jtx-sb-kv');

    if( !slider ) return;

    if( slider.querySelectorAll('.swiper-slide').length <= 1 ){
        slider.querySelectorAll('.swiper-lazy').forEach((el) => { el.style.backgroundImage = 'url(' + el.getAttribute('data-background') + ')'; });
        return;
    }

    const swiper = new Swiper(slider, {
        init: false,
        loop: true,
        speed: 1500,
        preloadImages: false,
        centeredSlides: true,
        allowTouchMove: false,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true
        },
        autoplay: {
            delay: 3000,
        },
        on: {
            init: () => {

            },
        }
    });

    swiper.init();


}



// Garden intro motion
function garden_intro_motion(){

    const intro = document.querySelector('.av-grdx-ntrx');

    if( !intro ) return;

    let items = gsap.utils.toArray('.av-grdx-ntrx-tt, .av-grdx-ntrx-ds > *');

    // Init
    garden_intro_init();

    function garden_intro_init(){

        items.map(( item, idx ) => {
            gsap.set(item, { opacity: 0, rotation: 0.1, y: ( JT.isScreen(860) ? 20 : 40 ) });
            ScrollTrigger.create({
                id: `st-main-connect-${ idx }`,
                trigger: item,
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    gsap.to(item, { duration: 1, opacity: 1, rotation: 0, y: 0, force3D: true, ease: 'power1.out' });
                },
            });
        });

    }

    JT.globals.resizes['garden_intro_resize'] = () => {
        items.map(( _, idx ) => {
            ScrollTrigger.getById(`st-garden-intro-${ idx }`)?.kill();
        });
        gsap.set('.av-grdx-ntrx *', { clearProps: 'all' });
        garden_intro_init();
    }

}



// Garden korea scroll motion
function garden_korea_scroll_motion(){

    const section = document.querySelector('.av-grdx-krx-mtnx');

    if( !section ) return;

    garden_korea_scroll_init();

    function garden_korea_scroll_init(){
        gsap.timeline({
            scrollTrigger: {
                id: 'st-garden-korea-scroll',
                trigger: section,
                pin: '.av-grdx-krx-mtnx-stcx',
                scrub: true,
                start: 'top top',
            }
        });
    }

    JT.globals.resizes['garden_korea_scroll_resize'] = () => {
        ScrollTrigger.getById('st-garden-korea-scroll')?.kill();
        gsap.set('.av-grdx-krx-mtnx, .av-grdx-krx-mtnx *', { clearProps: JT.globals.clearPropsList.join(',') });

       garden_korea_scroll_init();
    }

}



// Garden modern scroll motion
function garden_modern_scroll_motion(){

    const visual = document.querySelector('.av-grdx-mdrx-mtnx');

    if( !visual ) return;

    garden_modern_scroll_init();

    function garden_modern_scroll_init(){

        let visualTimeline = gsap.timeline({
            scrollTrigger: {
                id: 'st-garden-modern-motion',
                trigger: '.av-grdx-mdrx-mtnx-stcx',
                pin: true,
                scrub: true,
                start: 'top top',
                end: `+=200%`,
                onUpdate: ( self ) => {
                    const backgrounds = Array.from( document.querySelectorAll('.av-grdx-mdrx-mtnx-bk') ).filter(( background ) => {
                        return is_visible( background );
                    });
                    gsap.set(backgrounds[0], { y: -( ( backgrounds[0]?.scrollHeight - window.innerHeight ) * self.progress ) });
                }
            }
        });

        visualTimeline.to('.av-grdx-mdrx-mtnx-sec', { opacity: 1, ease: 'none' }, '<=');
        visualTimeline.to('.av-grdx-mdrx-mtnx-sec', { opacity: 0, ease: 'none' }, '+=200%' );

    }

    JT.globals.resizes['garden_modern_scroll_resize'] = () => {
        ScrollTrigger.getById('st-garden-modern-motion')?.kill();
        gsap.set('.av-grdx-mdrx-mtnx, .av-grdx-mdrx-mtnx *', { clearProps: JT.globals.clearPropsList.join(',') });

        garden_modern_scroll_init();
    }

}



// Gallery tab event
function garden_gallery_tab(){

    const gallery = document.querySelector('.av-grdx-gllx');

    if( !gallery ) return;

    let slider = gallery.querySelector('.av-jtx-tb-ct.av-jtx-tb-ctvx .av-grdx-gllx-sl2');
    let resizePoint = JT.isScreen(540) ? 540 : 0;
    let canResize = false;

    garden_gallery_slider( slider );

    jt_tab(gallery, {
        callback: () => {
            const tab = gallery.querySelector('.av-grdx-gllx-tb');
            const currentTab = gallery.querySelector('.av-jtx-tb-bt.av-jtx-tb-ctvx');
            const currentContent = gallery.querySelector('.av-jtx-tb-ct.av-jtx-tb-ctvx');

            let moveX = ( currentTab.getBoundingClientRect().left + ( currentTab.offsetWidth / 2 ) + tab.scrollLeft - ( window.innerWidth / 2 ) );

            gsap.to(tab, { duration: .4, scrollTo: { x: ( moveX || 0 ) }, ease: 'power3.out' });

            gallery.querySelectorAll('video').forEach(( video ) => {

                if( !video.paused ){
                    video.pause();
                    video.currentTime = 0;
                }

            });

            slider = currentContent.querySelector('.av-grdx-gllx-sl2');

            garden_gallery_slider( slider );
        }
    });

    JT.globals.resizes['garden_gallery_resize'] = () => {

        if( JT.isScreen(540) && ( resizePoint !== 540 ) ){
            resizePoint = 540;
            canResize = true;
        }

        if( !JT.isScreen(540) && ( resizePoint !== 0 ) ){
            resizePoint = 0;
            canResize = true;
        }

        if( canResize ){
            slider = gallery.querySelector('.av-jtx-tb-ct.av-jtx-tb-ctvx .av-grdx-gllx-sl2');
            slider?.swiper?.destroy();

            garden_gallery_slider( slider );

            canResize = false;
        }
    }

}



// Gallery slider
function garden_gallery_slider( slider ){

    if( !slider || slider?.swiper ) return;

    let changeSpeed = JT.isScreen(540) ? 1000 : 1500;

    gsap.set(slider, { opacity: 0 });

    if( slider.querySelectorAll('.swiper-slide').length <= 1 ){

        slider.querySelectorAll('.swiper-lazy').forEach(( el ) => { el.style.backgroundImage = 'url(' + el.getAttribute('data-background') + ')'; });

        slider_visibility_observer(slider, 'garden-gallery-slider');
        slider_video_play( slider );

        slider.querySelectorAll('.av-jtx-bckx-mv-rrrx').forEach(( error ) => {
            error.addEventListener('click', () => {
                slider_video_play( slider );
            });
        });

        gsap.set(slider, { duration: .3, opacity: 1 });

        return;
    }

    const swiper = new Swiper(slider, {
        init: false,
        loop: true,
        speed: changeSpeed,
        preventInteractionOnTransition: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true
        },
        navigation: {
            nextEl: slider.querySelector('.swiper-button-next'),
            prevEl: slider.querySelector('.swiper-button-prev')
        },
        on: {
            init: () => {

                slider_visibility_observer(slider, 'garden-gallery-slider');
                slider_video_play(slider);

                slider.querySelectorAll('.av-jtx-bckx-mv-rrrx').forEach(( error ) => {
                    error.addEventListener('click', () => {
                        slider_video_play(slider);
                    });
                });

                gsap.to(slider, { duration: .3, opacity: 1 });
            },
            realIndexChange: () => {
                slider_video_play(slider, { changeSpeed: changeSpeed });
            },
        }
    });

    swiper.init();

}



// Introduce about visual scroll motion
function introduce_about_visual(){

    const visual = document.querySelector('.av-ntrx-ab-kv');

    if( !visual ) return;

    introduce_about_visual_init();

    function introduce_about_visual_init(){

        let visualTimeline = gsap.timeline({
            scrollTrigger: {
                id: 'st-introduce-about-visual',
                trigger: '.av-ntrx-ab-kv-stcx',
                pin: true,
                scrub: true,
                start: 'top top',
                end: `+=500%`,
                onUpdate: ( self ) => {
                    const backgrounds = Array.from( document.querySelectorAll('.av-ntrx-ab-kv-bk') ).filter(( background ) => {
                        return is_visible( background );
                    });
                    gsap.set(backgrounds[0], { y: -( ( backgrounds[0]?.scrollHeight - window.innerHeight ) * self.progress ) });
                }
            }
        });

        visualTimeline.addLabel('step1');
        visualTimeline.to('.av-ntrx-ab-kv-sec-01', { opacity: 0, y: '-100%', ease: 'none' }, 'step1');
        visualTimeline.to('.av-ntrx-ab-kv-scrx', { duration: .2, opacity: 0, ease: 'none' }, 'step1');
        visualTimeline.fromTo('.av-ntrx-ab-kv-sec-02', { opacity: 0 }, { opacity: 1, y: '-100%', ease: 'none' }, 'step1');

        visualTimeline.addLabel('step2');
        visualTimeline.to('.av-ntrx-ab-kv-sec-02', { opacity: 0, y: '-200%', ease: 'none' }, 'step2');
        visualTimeline.fromTo('.av-ntrx-ab-kv-sec-03', { opacity: 0 }, { opacity: 1, y: '-100%', ease: 'none' }, 'step2');

        visualTimeline.addLabel('step3');
        visualTimeline.to('.av-ntrx-ab-kv-sec-03', { opacity: 0, y: '-200%', ease: 'none' }, 'step3');
        visualTimeline.fromTo('.av-ntrx-ab-kv-plgx', { opacity: 0 }, { opacity: 1, duration: .2, ease: 'none' }, 'step3');

        visualTimeline.addLabel('step4');
        visualTimeline.fromTo('.av-ntrx-ab-kv-tt', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .2, ease: 'none' }, 'step4');
        visualTimeline.fromTo('.av-ntrx-ab-kv-plgx-bckx', { opacity: 0 }, { opacity: 1, duration: .2, ease: 'none' }, 'step4');
        visualTimeline.to('.av-ntrx-ab-kv-plgx', { delay: .1 }, 'step4');

    }

    JT.globals.resizes['introduce_about_visual_resize'] = () => {
        ScrollTrigger.getById('st-introduce-about-visual')?.kill();
        gsap.set('.av-ntrx-ab-kv, .av-ntrx-ab-kv *', { clearProps: JT.globals.clearPropsList.join(',') });

        introduce_about_visual_init();
    }

}



// Introduce about identity scroll motion
function introduce_about_identity(){

    const identity = document.querySelector('.av-ntrx-ab-dntx');

    if( !identity ) return;

    introduce_about_identity_init();

    function introduce_about_identity_init(){

        const backgrounds = Array.from( document.querySelectorAll('.av-ntrx-ab-dntx-bk') ).filter(( background ) => {
            return is_visible( background );
        });

        let identityTimeline = gsap.timeline({
            scrollTrigger: {
                id: 'st-introduce-about-indentity',
                trigger: identity,
                start: 'top 25%',
                toggleActions: 'play none none reverse'
            }
        });

        identityTimeline.fromTo('.av-ntrx-ab-dntx-bckx', { opacity: 0 }, { duration: .7, opacity: 1, ease: 'power3.out' });
        identityTimeline.fromTo('.av-ntrx-ab-dntx-in', { opacity: 0, y: 40 }, { duration: .7, opacity: 1, y: 0, ease: 'power3.out' }, '<=');

        gsap.to(backgrounds[0], {
            y: -( ( backgrounds[0]?.scrollHeight - identity.offsetHeight ) > 0 ? ( backgrounds[0]?.scrollHeight - identity.offsetHeight ) : 0 ),
            scrollTrigger: {
                id: 'st-introduce-about-indentity-bg',
                trigger: backgrounds[0],
                scrub: true,
                start: 'top bottom',
                ease: 'none',
                end: `bottom+=${ identity.offsetHeight }`
            }
        });

    }

    JT.globals.resizes['introduce_about_identity_resize'] = () => {
        ScrollTrigger.getById('st-introduce-about-indentity')?.kill();
        ScrollTrigger.getById('st-introduce-about-indentity-bg')?.kill();
        gsap.set('.av-ntrx-ab-dntx, .av-ntrx-ab-dntx *', { clearProps: JT.globals.clearPropsList.join(',') });

        introduce_about_identity_init();
    }

}



// Introduce people gallery tab event
function introduce_people_gallery_tab(){

    const gallery = document.querySelector('.av-ntrx-pplx-gllx');

    if( !gallery ) return;

    jt_tab(gallery, {
        callback: () => {
            const tab = gallery.querySelector('.av-ntrx-pplx-gllx-tb');
            const currentTab = gallery.querySelector('.av-jtx-tb-bt.av-jtx-tb-ctvx');

            let moveX = ( currentTab.getBoundingClientRect().left + ( currentTab.offsetWidth / 2 ) + tab.scrollLeft - ( window.innerWidth / 2 ) );

            gsap.to(tab, { duration: .4, scrollTo: { x: ( moveX || 0 ) }, ease: 'power3.out' });
        }
    });

}



// Introduce people appeal motion
function introduce_people_appeal(){

    const appeal = document.querySelector('.av-ntrx-pplx-pplx');

    if( !appeal ) return;

    let appealTimeline = gsap.timeline({
        scrollTrigger: {
            id: 'st-introduce-people-appeal',
            trigger: appeal,
            start: 'top 30%',
            toggleActions: 'play none none reverse'
        }
    });

    appealTimeline.fromTo('.av-ntrx-pplx-pplx-ct', { opacity: 0 }, { opacity: 1, duration: .7 });
    appealTimeline.fromTo('.av-ntrx-pplx-pplx-ct > *', { y: 40 }, { y: 0, duration: .7 }, '<=');

}



// Introduce people popup
function introduce_people_popup(){

    const gallery = document.querySelector('.av-ntrx-pplx-gllx');
    const inner   = document.querySelector('.av-ntrx-pplx-pp .av-jtx-pp-cont-in');

    if( !gallery ) return;

    gallery.addEventListener('click', async ( e ) => {

        if( e.target.closest('.av-ntrx-pplx-gllx-it') ){
            e.preventDefault();
            e.stopPropagation();

            const res = await fetch( e.target.closest('.av-ntrx-pplx-gllx-it > a').href );

            if( res.status === 200 ){

                const html = await res.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.querySelector('.av-ntrx-pplx-pp-dtx');

                inner.innerHTML = content.innerHTML;

                jt_popup('.av-ntrx-pplx-pp', {
                    afterOpen: ( popup ) => {
                        const iframe = popup.querySelector('iframe');
                        sound_with_iframe( iframe );
                    },
                    afterClose: () => {
                        inner.innerHTML = '';
                    }
                });

                return;

            }
        }

    });

}



// Introduce history scroll motion
function introduce_history_scroll(){

    const history = document.querySelector('.av-ntrx-hs-lngx');
    const stickys = document.querySelectorAll('.av-ntrx-hs-lngx-stcx-it');
    const lists   = document.querySelectorAll('.av-ntrx-hs-lngx-ls');

    if( !history ) return;

    introduce_history_scroll_init();

    function introduce_history_scroll_init(){

        if( !JT.isScreen(860) ){
            stickys.forEach(( sticky, idx ) => {
                gsap.to(sticky, { duration: .01, autoAlpha: ( idx > 0 ) ? 1 : 0, scrollTrigger: {
                    st: `st-introduce-history-lounge-${ idx }`,
                    trigger: ( idx > 0 ) ? lists[ idx ] : lists[ idx + 1 ],
                    start: 'top 30%',
                    end: ( idx > 0 && idx < ( stickys.length - 1 ) ) ? 'top 30%' : 'bottom top',
                    endTrigger: ( idx > 0 && idx < ( stickys.length - 1 ) ) ? lists[ idx + 1 ] : lists[ idx ],
                    toggleActions: `play ${ ( idx > 0 && idx < ( stickys.length - 1 ) ) ? 'reverse play' : 'none none' } reverse`,
                }});
            });
        }

    }

    JT.globals.resizes['introduce_history_scroll_resize'] = () => {
        stickys.forEach(( _, idx ) => {
            ScrollTrigger.getById(`st-introduce-history-lounge-${ idx }`)?.kill();
        });

        gsap.set('.av-ntrx-hs-lngx, .av-ntrx-hs-lngx *', { clearProps: JT.globals.clearPropsList.join(',') });

        introduce_history_scroll_init();
    }

}



// Introduce history hover effect
function introduce_history_hover(){

    const items = document.querySelectorAll('.av-ntrx-hs-lngx-sblx > li');
    const image =  document.querySelector('.av-ntrx-hs-lngx-stcx-pic-in');

    let clone = null;

    items.forEach(( item ) => {

        item.addEventListener('mouseenter', () => {
            if( !JT.isScreen(860) ){
                if( item.querySelector('img') ){

                    clone = item.querySelector('img').cloneNode();
                    clone.src = clone.dataset.unveil;

                    image.innerHTML = '';
                    image.appendChild( clone );

                    clone.onload = () => {
                        gsap.set(image, { top: `calc(50% - ${ clone.height / 2 }rem)`, onComplete: () => {
                            gsap.to(clone, { opacity: 1, duration: .3, ease: 'power3.out' });
                        }});
                    }
                }
            }
        });

        item.addEventListener('mouseleave', () => {
            if( !JT.isScreen(860) ){
                if( clone ){
                    gsap.to(clone, { opacity: 0, duration: .3, ease: 'power3.out' });
                }
            }
        });

    });

}



// Construct visual scroll motion
function construct_visual_scroll(){

    const visual = document.querySelector('.av-cnsx-kv');

    if( !visual ) return;

    const sections = visual.querySelectorAll('.av-cnsx-kv-sec');

    if( sections.length <= 1 ) return;

    construct_visual_init();

    function construct_visual_init(){

        let visualTimeline = gsap.timeline({
            scrollTrigger: {
                id: 'st-construct-visual',
                trigger: visual,
                pin: true,
                scrub: true,
                start: 'top top',
                end: `${ 100 * sections.length * 1.2 }%`,
            }
        });

        sections.forEach(( section, idx ) => {

            // Iphone 15 pro Safari address bar top position issue fix
            gsap.set(section, { height: section.getBoundingClientRect().height });

            if( idx > 0 ){
                visualTimeline.to(sections, { delay: .5 });
                visualTimeline.to(sections[ idx - 1 ], { y: `-=${ section.getBoundingClientRect().height / 2 }`, duration: 1 });
                visualTimeline.to(section, { y: -( section.getBoundingClientRect().height ), duration: 1 }, '<=');
                visualTimeline.fromTo(section.querySelector('.av-cnsx-kv-ct'), { opacity: 0 }, { opacity: 1 });
            }

        });

    }

    JT.globals.resizes['construct_visual_resize'] = () => {
        ScrollTrigger.getById('st-construct-visual')?.kill();
        gsap.set('.av-cnsx-kv, .av-cnsx-kv *', { clearProps: JT.globals.clearPropsList.join(',') });

        construct_visual_init();
    }

}



// Construct seongok seowon intro scroll motion
function construct_seongok_seowon_intro(){

    const intro = document.querySelector('.av-cnsx-sngx-swnx-ntrx');

    if( !intro ) return;

    construct_seongok_seowon_intro_init();

    function construct_seongok_seowon_intro_init(){

        gsap.fromTo('.av-cnsx-sngx-swnx-ntrx-bk', { clipPath: 'inset(0% 36.83%)' }, {
            clipPath: 'inset(0% 0%)',
            ease: 'none',
            scrollTrigger: {
                id: 'st-construct-seongok-seowon-intro',
                trigger: '.av-cnsx-sngx-swnx-ntrx-bk',
                scrub: true,
                start: 'top bottom',
                end: 'center center',
            }
        });

    }

    JT.globals.resizes['construct_seongok_seowon_intro_resize'] = () => {
        ScrollTrigger.getById('st-construct-seongok-seowon-intro')?.kill();
        gsap.set('.av-cnsx-sngx-swnx-ntrx, .av-cnsx-sngx-swnx-ntrx *', { clearProps: JT.globals.clearPropsList.join(',') });

        construct_seongok_seowon_intro_init();
    }

}



// Contruct seongok seowon director image loaded and marquee init
function construct_seongok_seowon_director(){

    const gallery = document.querySelector('.av-cnsx-sngx-swnx-drcx-gllx');

    if( !gallery ) return;

    jt_marquee('.construct-seongok-seowon__director-marquee');

    JT.globals.resizes['construct_seongok_seowon_director_resize'] = () => {
        jt_marquee_destroy('.construct-seongok-seowon__director-marquee');
        jt_marquee('.construct-seongok-seowon__director-marquee');
    }

}



// Google map init
function google_map_init(){

    const mapEl = document.querySelector('.av-jtx-mp');

    if( !mapEl ) return;

    // 바깥 지도 서비스 대신 그린 약도 한 장. 표지가 가운데라 휴대폰 칸에서도 가운데를 잘라 보여 준다.
    const img = document.createElement('img');

    img.src = './assets/img/location-map.png';
    img.alt = '아르베온정원 주변 약도';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block';
    mapEl.append( img );

    imagesLoaded(mapEl, () => {
        setTimeout(() => {
            mapEl.classList.add('av-jtx-mp-ntx');
        }, 700);
    });

}



// Manual location traffig tab init
function manual_location_traffic_tab(){

    const traffic = document.querySelector('.av-mnlx-lctx-trfx');

    if( !traffic ) return;

    jt_tab(traffic, {
        scrollTarget: '.av-mnlx-lctx-trfx-cont',
        callback: () => {
            const tab = traffic.querySelector('.av-mnlx-lctx-trfx-tb');
            const currentTab = traffic.querySelector('.av-jtx-tb-bt.av-jtx-tb-ctvx');

            let moveX = ( currentTab.getBoundingClientRect().left + ( currentTab.offsetWidth / 2 ) + tab.scrollLeft - ( window.innerWidth / 2 ) );

            gsap.to(tab, { duration: .4, scrollTo: { x: ( moveX || 0 ) }, ease: 'power3.out' });
        }
    });

}



// Manual service gallery mobile marquee
function manual_service_gallery(){

    const gallery = document.querySelector('.av-mnlx-sv-gllx') ;

    if( !gallery ) return;

    if( JT.isScreen(860) ){
        jt_marquee('.av-mnlx-sv-gllx-ls');
    }

    JT.globals.resizes['manual_service_gallery_resize'] = () => {
        jt_marquee_destroy('.av-mnlx-sv-gllx-ls');

        if( JT.isScreen(860) ){
            jt_marquee('.av-mnlx-sv-gllx-ls');
        }
    }

}



// Category event init
function jt_category(){

    const category = document.querySelector('.av-jtx-ctgx');

    if( !category ) return;

    const current = category.querySelector('.av-jtx-ctgx-crrx');
    let moveX = ( current.getBoundingClientRect().left + ( current.offsetWidth / 2 ) + current.scrollLeft - ( window.innerWidth / 2 ) );
    gsap.set(category, { opacity: 0, scrollTo: { x: ( moveX || 0 ) }, ease: 'power3.out', onComplete: () => {
        gsap.set(category, { opacity: 1 });
    }});

    category.querySelectorAll('a').forEach(( category ) => {

        category.addEventListener('click', ( e ) => {
            e.preventDefault();
            e.stopPropagation();

            try {
                barba.go( e.currentTarget.href, `filter ${ document.body.classList[0] || '' }` );
            } catch ( e ) {
                location.href = e.currentTarget.href;
            }
        });

    });

}



// Accordion init
function jt_accordion() {

    const accordion = document.querySelector('.av-jtx-ccrx');
    let isRun = false;

    if( !accordion ) return;

    accordion.addEventListener('click', ( e ) => {

        if( e.target.closest('.av-jtx-ccrx-hd') ) {

            e.preventDefault();
            e.stopPropagation();

            const item = e.target.closest('.av-jtx-ccrx-it');

            if( isRun ) return;
            isRun = true;

            if( !e.target.closest('.av-jtx-ccrx-ctvx') && accordion.querySelector('.av-jtx-ccrx-ctvx') ){
                JT.slide.up(accordion.querySelector('.av-jtx-ccrx-ctvx .av-jtx-ccrx-ct-in'), 500, () => { isRun = false; });
                accordion.querySelector('.av-jtx-ccrx-ctvx').classList.remove('av-jtx-ccrx-ctvx');
            }

            item.classList.toggle('av-jtx-ccrx-ctvx');

            JT.slide.toggle( item.querySelector('.av-jtx-ccrx-ct-in'), 500, () => { isRun = false; });

        }

    });

}



// Anchor scroll move
function jt_anchor(){

    const anchor = document.querySelector('.av-jtx-nchx');

    if( !anchor ) return;

    const btns  = document.querySelectorAll('.av-jtx-nchx-bt');
    const items = document.querySelectorAll('.av-jtx-nchx-it');

    let currentClass = 'av-jtx-nchx-crrx';
    let isRun = false;

    items.forEach(( item, idx ) => {

        gsap.timeline({
            scrollTrigger: {
                id: `st-sub-anchor-${ idx + 1 }`,
                trigger: item,
                start: 'top 5rem',
                end: 'bottom 5rem',
                onToggle: ( self ) => {

                    if( isRun ) return;

                    if( self.isActive ){
                        const curr = Array.from( btns ).find(( btn ) => {
                            return btn.getAttribute('href') === `#${ self.trigger.id }`;
                        });
                        curr.classList.add( currentClass );
                    } else {
                        if( ( ( idx === 0 ) && ( self.direction < 0 ) ) || ( ( idx === ( items.length - 1 ) ) && ( self.direction > 0 ) ) ) return;

                        const curr = Array.from( btns ).find(( btn ) => {
                            return btn.getAttribute('href') === `#${ self.trigger.id }`;
                        });
                        curr.classList.remove( currentClass );
                    }
                }
            }
        });

    });

    if( !anchor.classList.contains('jt-anchor--init') ){

        btns.forEach(( btn ) => {

            btn.addEventListener('click', ( e ) => {
                e.preventDefault();
                e.stopPropagation();

                if( btn.getAttribute('href') !== '#' ){
                    const curr = document.querySelector( btn.getAttribute('href') );

                    if( curr ){
                        gsap.to(window, { duration: .4, scrollTo: curr.getBoundingClientRect().top + window.scrollY, ease: 'power3.out', onStart: () => {
                            JT.scroll.destroy( true );
                            anchor.querySelector(`.${ currentClass }`)?.classList.remove( currentClass );
                            btn.classList.add( currentClass );
                            isRun = true;
                        }, onComplete: () => {
                            JT.scroll.restore( true );
                            JT.globals.minimizeHeader( true );
                            isRun = false;
                        }});

                        return;
                    }
                }
            });

        });

        anchor.classList.add('jt-anchor--init');

    }

}



// Marquee init
function jt_marquee( target, args ){

    const selectors = document.querySelectorAll( target );

    const { speed = 50 } = args || {};

    selectors.forEach(( selector, idx ) => {

        let marqueeEndpoint = null;
        let originHtml      = selector.outerHTML;

        // Init class
        selector.classList.add('av-jtx-mrqx');

        if( !selector.querySelectorAll('.av-jtx-mrqx-tmsx').length ){
            selector.innerHTML = `<div class="av-jtx-mrqx-tmsx">${ selector.innerHTML }</div>`;
        }

        const item         = selector.querySelector('.av-jtx-mrqx-tmsx');
        const selectorSize = selector.offsetWidth;
        const itemSize     = item.offsetWidth;
        const itemLength   = Math.ceil( selectorSize / itemSize ) + 1;
        const loopDuration = ( itemSize / speed ) - ( idx * 2 );

        if( isNaN( itemSize ) || ( itemSize === 0 ) ) return;

        item.querySelectorAll('.av-jtx-lzyx').forEach(( lazy ) => {
            const img = lazy.querySelector('img');

            img.setAttribute('src', img.dataset.unveil);
            img.classList.add('av-jtx-lzyx-lddx');
            lazy.classList.add('av-jtx-lzyx-lddx');
        });

        if( !selector.querySelectorAll('.av-jtx-mrqx-in').length ){
            selector.innerHTML = `<div class="av-jtx-mrqx-in">${ selector.innerHTML }</div>`;
        }

        const marquee = selector.querySelector('.av-jtx-mrqx-in');

        if( selector.querySelectorAll('.av-jtx-mrqx-tmsx').length < itemLength ){
            let limit = ( itemLength - ( selector.querySelectorAll('.av-jtx-mrqx-tmsx').length - 1 ) );
            for( let i = 0; i < limit; i++ ){
                let clone = item.cloneNode( true );
                marquee.appendChild( clone );
            }
        }

        if( ( idx % 2 == 0 ) ) {
            gsap.set( marquee, { x: -itemSize } );
            marqueeEndpoint = -( itemSize * 2 );
        } else {
            gsap.set( marquee, { x: -( itemSize * 2 ) } );
            marqueeEndpoint = 0;
        }

        // Kill animation
        let currIndex = marqueeList.findIndex(( obj ) => ( obj.selector === selector ));

        if( currIndex >= 0 ){
            if( marqueeList[currIndex] ) {
                marqueeList[currIndex].timeline.kill();
                marqueeList[currIndex].observer.unobserve( selector );
                gsap.set( marquee, { clearProps: 'all' } );
            }
        } else {
            currIndex = marqueeList.length;
            marqueeList[currIndex] = { selector: selector, originHtml: originHtml }
        }

        // Init animation
        marqueeList[currIndex] = { ...marqueeList[currIndex], timeline: gsap.timeline({ repeat: -1, paused: true }) };

        marqueeList[currIndex].timeline.to( marquee, { duration: 0, x: -itemSize, ease: 'none' });
        marqueeList[currIndex].timeline.to( marquee, { duration: loopDuration, x: marqueeEndpoint, ease: 'none' });

        if( selector.classList.contains('jt-marquee--play') ){
            marqueeList[currIndex].timeline.play();
        }

        marqueeList[currIndex].observer = new IntersectionObserver(( entries ) => {
            entries.forEach(( entry ) => {
                if( entry.isIntersecting ){
                    entry.target.classList.add('jt-marquee--play');
                    entry.target.classList.remove('jt-marquee--pause');
                    marqueeList[currIndex].timeline.play();
                } else {
                    entry.target.classList.add('jt-marquee--pause');
                    entry.target.classList.remove('jt-marquee--play');
                    marqueeList[currIndex].timeline.pause();
                }
            });
        });

        marqueeList[currIndex].observer.observe( selector );

    });

}



// MARQUEE DESTROY
function jt_marquee_destroy( target ){

    const selectors = document.querySelectorAll( target );

    selectors.forEach(async ( selector, idx ) => {

        const marquee = selector.querySelector('.av-jtx-mrqx-in');

        if( !marquee ) return;

        // Clear class
        selector.classList.remove('av-jtx-mrqx');

        // Kill animation
        let currIndex = marqueeList.findIndex(( obj ) => ( obj.selector === selector ));

        if( currIndex >= 0 ){
            if( marqueeList[currIndex] ) {
                await reset().then(() => {
                    document.querySelectorAll( target )[idx].querySelectorAll('[data-unveil]').forEach(( image ) => {
                        new JtLazyload(image, 300, () => {
                            image.addEventListener('load', () => {
                                if( image.closest('.av-jtx-lzyx') != null ) {
                                    image.closest('.av-jtx-lzyx').classList.add('av-jtx-lzyx-lddx');
                                } else {
                                    image.classList.add('av-jtx-lzyx-lddx');
                                }
                            });
                        });
                    });
                });
            }
        }

        function reset(){
            return new Promise(( resolve ) => {
                selector.outerHTML = marqueeList[currIndex].originHtml;

                marqueeList[currIndex].timeline.kill();
                marqueeList[currIndex].observer.disconnect();
                marqueeList.splice(currIndex, 1);

                resolve();
            });
        }

    });
}



// Search filter select change event
function jt_search_filter(){

    const filters = document.querySelectorAll('.av-jtx-fltx-srtx select');
    const checkboxs = document.querySelectorAll('.av-jtx-fltx input[type="checkbox"]');
    const pickers = document.querySelectorAll('.av-jtx-fltx-pckx a');

    filters.forEach(( select ) => {
        select.addEventListener('change', ( e ) => {
            try {
                barba.go( e.currentTarget.value, `filter ${ document.body.classList[0] || '' }` );
            } catch ( e ) {
                location.href = e.currentTarget.value;
            }
        });
    });

    checkboxs.forEach(( checkbox ) => {

        checkbox.addEventListener('change', () => {

            const url = new URL(location.href);
            const search = new URLSearchParams();

            let searchUrl = ( url.origin + url.pathname );
            let parames = {};

            for( const [key, value] of url.searchParams.entries() ){
                if( key !== 'page' ){
                    parames[key] = value;
                    search.append(key, value);
                }
            }

            if( checkbox.checked ){
                parames[checkbox.name] = checkbox.value;
                search.append(checkbox.name, checkbox.value);
            } else {
                search.delete(checkbox.name);
            }

            searchUrl += ((search.size > 0) ? `?${search.toString()}` : '');

            try {
                barba.go( searchUrl, `filter ${ document.body.classList[0] || '' }` );
            } catch ( e ) {
                location.href = searchUrl;
            }


        });

    });

    pickers.forEach(( picker ) => {

        picker.addEventListener('click', ( e ) => {
            e.preventDefault();
            e.stopPropagation();

            try {
                barba.go( e.currentTarget.href, `filter ${ document.body.classList[0] || '' }` );
            } catch ( e ) {
                location.href = e.currentTarget.href;
            }
        });

    });

}



// Policy vercion select change event
function jt_single_select(){

    const selects = document.querySelectorAll('.av-jtx-sngx-slcx select');

    selects.forEach(( select ) => {
        select.addEventListener('change', ( e ) => {
            try {
                barba.go( e.currentTarget.value, `filter ${ document.body.classList[0] || '' }` );
            } catch ( e ) {
                location.href = e.currentTarget.value;
            }
        });
    });

}



// Single table mobile scroll
function jt_single_scale(){

    const tables = document.querySelectorAll('.av-jtx-sngx-ct table');

    tables.forEach(( table, idx ) => {

        let width;

        if( document.body.classList.contains('av-mnlx-vstx-gdx') ){
            return;
        }

        if( document.body.classList.contains('av-mnlx-plcx-prvx') ){
            width = 860;
        }

        table_horizontal_scroll( table, width, idx );

    });

}



// Register agreement
function jt_agreement(){

    const agreement = document.querySelector('.av-jtx-grmx');

    if( !agreement ) return;

    agreement.querySelector('.av-jtx-grmx-llx input[type="checkbox"]').addEventListener('click', ( e ) => {

        if( e.currentTarget.checked ){

            agreement.querySelectorAll('input[type="checkbox"]').forEach(( checkbox ) => {
                checkbox.checked = true;
            });

        } else {

            agreement.querySelectorAll('input[type="checkbox"]').forEach(( checkbox ) => {
                checkbox.checked = false;
            });

        }

    });

    agreement.querySelectorAll('input[type="checkbox"]').forEach(( checkbox ) => {

        checkbox.addEventListener('change', () => {

            let allChecked = true;

            agreement.querySelectorAll('input[type="checkbox"]').forEach(( check ) => {
                if( !check.closest('.av-jtx-grmx-llx') && !check.checked ) allChecked = false;
            });

            agreement.querySelector('.av-jtx-grmx-llx input[type="checkbox"]').checked = allChecked;

        });

    });


}



// Register agreement popup
function jt_agreement_popup(){

    const agreements = document.querySelectorAll('.av-jtx-grmx-mr');

    agreements.forEach(( agreement ) => {

        agreement.addEventListener('click', async ( e ) => {
            e.preventDefault();
            e.stopPropagation();

            const res = await fetch( agreement.href );

            if( res.status === 200 ){

                const html = await res.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const title = doc.querySelector('.av-jtx-sngx-tt');
                const content = doc.querySelector('.av-jtx-sngx-bdyx');
                const inner = document.querySelector('.av-jtx-grmx-pp .av-jtx-pp-cont-in');

                const resultHtml = `<h2 class="jt-agreement-popup__title av-jtx-typx-03">${ title.innerText }</h2>\n
                                ${ content.innerHTML }`;

                inner.innerHTML = resultHtml;

                inner.querySelectorAll('table').forEach(( table, idx ) => {
                    table_horizontal_scroll(table, 860, idx);
                });

                jt_popup('.av-jtx-grmx-pp', {
                    afterOpen: () => {
                        JT.globals.minimizeHeader( true );
                    },
                    afterClose: () => {
                        inner.innerHTML = '';

                        Object.keys( JT.globals.resizes ).map(( key ) => {
                            if( key.startsWith('table_horizontal_scroll_resize') ){
                                delete JT.globals.resizes[ key ];
                            }
                        });

                        JT.globals.minimizeHeader( false );
                    }
                });

                return;

            }
        });

    });

}



// Resercation result scroll mode
function reservation_result_scroll(){

    const result = document.querySelector('.av-jtx-rsrx .av-jtx-rsrx-rslx');

    if( !result ) return;

    result.addEventListener('mouseenter', () => {
        if( ( result.querySelector('.av-jtx-rsrx-rslx-ct-in').offsetHeight < result.querySelector('.av-jtx-rsrx-rslx-ct-in').scrollHeight ) && JT.smoothscroll.enabled ){
            JT.smoothscroll.destroy();
        }
    });

    result.addEventListener('mouseleave', () => {
        if( !JT.smoothscroll.enabled ) JT.smoothscroll.init();
    });

}



// Reservation useable qr code popup
function reservation_useable_popup(){

    const triggers = document.querySelectorAll('.jt-reservation__action--useable');

    let qrcode;
    let popup = document.querySelector('.av-rsrx-qrcx-pp');

    if( !popup ) return;

    if( !!triggers.length ){
        popup.querySelector('.av-rsrx-qrcx-pic').innerHTML = '';
        qrcode = new QRCode('qr-code', {
            width: 90 * ( window.devicePixelRatio || 1 ),
            height: 90 * ( window.devicePixelRatio || 1 ),
            correctLevel: QRCode.CorrectLevel.L
        });
    }

    triggers.forEach(( trigger ) => {
        trigger.addEventListener('click', async ( e ) => {
            e.preventDefault();
            e.stopPropagation();

            const code = trigger.dataset.code || '';
            const make = () => new Promise(( resolve ) => {
                qrcode?.makeCode( code );

                popup.querySelector('.reservation-qrcode--code span').innerText = code;
                popup.querySelector('.reservation-qrcode--date span').innerText = trigger.closest('.av-jtx-rsrx-rslx').querySelector('.jt-reservation__result--date span').innerText;
                popup.querySelector('.reservation-qrcode--time span').innerText = trigger.closest('.av-jtx-rsrx-rslx').querySelector('.jt-reservation__result--time span').innerText;
                popup.querySelector('.reservation-qrcode--visitor span').innerText = trigger.closest('.av-jtx-rsrx-rslx').querySelector('.jt-reservation__result--visitor span').innerText;

                if (trigger.closest('.av-jtx-rsrx-rslx').querySelector('.jt-reservation__result--membership')) {
                    popup.querySelector('.reservation-qrcode--membership span').innerText = trigger.closest('.av-jtx-rsrx-rslx').querySelector('.jt-reservation__result--membership span').innerText;
                    popup.querySelector('.reservation-qrcode--membership').style.display = 'block';
                } else {
                    popup.querySelector('.reservation-qrcode--membership').style.display = 'none';
                }

                resolve();
            });

            if( qrcode ){
                await make();
                jt_popup( popup );
            }

        });
    });

}



// Reservation receipt popup
function reservation_receipt_popup(){

    const triggers = document.querySelectorAll('.av-jtx-rsrx-rslx-rcpx > a');

    let popup = document.querySelector('.av-rsrx-rcpx-pp');

    if( !popup ) return;

    triggers.forEach(( trigger ) => {

        trigger.addEventListener('click', ( e ) => {

            e.preventDefault();

            const url = trigger.getAttribute('href');

            if( !url ) return;

            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.style.frameBorder = '0';
            popup.querySelector('.av-rsrx-rcpx-frmx').appendChild(iframe);

            iframe.addEventListener('load', () => {
                jt_popup(popup, {
                    afterClose: () => {
                        iframe.remove();
                    }
                });
            });


        });

    });

}



// Reservation QR Code maker
function reservation_qrcode(){

    const el = document.querySelector('.av-rsrx-qrcx-pic');

    if( !el || el.closest('.av-rsrx-qrcx-pp') ) return;

    const code = el.dataset.code || '';
    const qrcode = new QRCode('qr-code', {
        width: 90 * ( window.devicePixelRatio || 1 ),
        height: 90 * ( window.devicePixelRatio || 1 ),
        correctLevel: QRCode.CorrectLevel.L
    });

    qrcode.makeCode( code );

}



// Main scenery slider init
function main_scenery_slider(){

    const slider = document.querySelector('.av-hm-scnx-sl');
    const pagination = document.querySelector('.av-hm-scnx-pgnx');

    if( !slider || !pagination ) return;
    if( slider.querySelectorAll('.swiper-slide').length <= 1 ){
        slider.querySelectorAll('.swiper-lazy').forEach(( el ) => { el.style.backgroundImage = 'url(' + el.getAttribute('data-background') + ')'; });
        jt_scenery_popup();
        return;
    }

    const swiperPagination = new Swiper(pagination, {
        init: false,
        loop: true,
        speed: 750,
        preventInteractionOnTransition: true,
        slidesPerView: 5,
        centeredSlides: true,
        allowTouchMove: false,
        on: {
            init: () => {
                pagination.querySelectorAll('.swiper-slide').forEach(( slide ) => {
                    slide.addEventListener('click', () => {
                        if( swiperSlider.animating ) return;

                        if( slide.classList.contains('swiper-slide-next') ){
                            swiperPagination.slideNext();
                            swiperSlider.slideNext();
                        } else if( slide.classList.contains('swiper-slide-prev') ){
                            swiperPagination.slidePrev();
                            swiperSlider.slidePrev();
                        }
                    });
                });
            }
        }
    });

    const swiperSlider = new Swiper(slider, {
        init: false,
        rewind: true,
        speed: 1000,
        preventInteractionOnTransition: true,
        preloadImages: false,
        effect: 'fade',
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false
        },
        fadeEffect: {
            crossFade: true
        },
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true
        },
        on: {
            init: () => {
                jt_scenery_popup();
            },
            realIndexChange: ( swiper ) => {
                if( swiper.swipeDirection === 'next' ){
                    swiperPagination.slideNext();
                } else if( swiper.swipeDirection === 'prev' ) {
                    swiperPagination.slidePrev();
                }
            },
        }
    });

    swiperPagination.init();
    swiperSlider.init();
}



// Board scenery popup init
function jt_scenery_popup(){

    const triggers = document.querySelectorAll('.av-jtx-bd-scnx-pp');
    const slider = document.querySelector('.av-jtx-scnx-pp-sl');
    const images = [];

    triggers.forEach(( trigger, index ) => {

        images.push( trigger.href );

        trigger.addEventListener('click', ( e ) => {
            e.preventDefault();
            e.stopPropagation();

            jt_popup('.av-jtx-scnx-pp', {
                afterOpen: () => {
                    JT.globals.minimizeHeader( true );
                    popup_slider_change( images, index );
                },
                afterClose: () => {
                    JT.globals.minimizeHeader( false );
                }
            });

            return;

        });

    });

    function popup_slider_change( images, index = 0 ){

        if( !slider ) return;

        // Reset
        slider.swiper?.destroy();
        slider.querySelector('.swiper-wrapper').innerHTML = '';

        images.forEach(( image ) => {

            const slide = document.createElement('div');
            slide.classList.add('av-jtx-scnx-pp-it', 'swiper-slide');
            slide.innerHTML = `<div class="av-jtx-scnx-pp-pic">
                                  <img src="${ image }" alt="" />
                              </div>`;

            slider.querySelector('.swiper-wrapper').appendChild( slide );

        });

        if( slider.querySelectorAll('.swiper-slide').length <= 1 ){
            slider.querySelectorAll('.swiper-lazy').forEach(( el ) => { el.style.backgroundImage = 'url(' + el.getAttribute('data-background') + ')'; });
            gsap.set(slider, { opacity: 1 });
            return;
        }

        const swiper = new Swiper(slider, {
            init: false,
            rewind: true,
            speed: 1500,
            autoHeight: true,
            preventInteractionOnTransition: true,
            preloadImages: false,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            lazy: {
                loadPrevNext: true,
                loadOnTransitionStart: true
            },
            navigation: {
                nextEl: slider.querySelector('.swiper-button-next'),
                prevEl: slider.querySelector('.swiper-button-prev')
            },
            on: {
                init: () => {
                    slider.swiper.slideTo(index, 0);
                }
            }
        });

        imagesLoaded(slider, () => {
            swiper.init();
        });

    }

}



// Disable context menu
function disable_contextmenu(){

    document.addEventListener('contextmenu', ( e ) => e.preventDefault());

}



/* **************************************** *
 * HELPER
 * **************************************** */
/**
 * 스크롤 방지 처리
 *
 * @version 1.0.0
 * @author STUDIO-JT (JSH)
 * @requires jt.js
 * @requires layout.css
 * @description 스크롤트리거 disable/enable 함께 처리되어야함
 */
function scroll_fixed( enable ) {

    let scrollStorage = Math.abs( parseInt( getComputedStyle( document.body ).top ) || window.scrollY );

    if( enable ){
        document.body.classList.remove('av-scr-fx');
        JT.scroll.restore( true );

        if( JT.browser('ios') ){
            ScrollTrigger.getAll().forEach(( st ) => {
                st.enable( false );
            });

            ScrollTrigger.refresh();

            gsap.set(window, { scrollTo: scrollStorage, onComplete: () => { gsap.set('body', { clearProps: 'top' }) }});
        }

    } else {

        if( JT.browser('ios') ){
            scrollStorage = window.scrollY;
            gsap.set('body', { top: `-${ scrollStorage }px` })

            ScrollTrigger.getAll().forEach(( st ) => {
                st.disable( false, true );
            });
        }

        document.body.classList.add('av-scr-fx');
        JT.scroll.destroy( true );
    }
}



/**
 * JT.scroll.disalbedEvent 오버라이드
 *
 * @version 1.0.0
 * @author STUDIO-JT (JSH)
 * @requires jt.js
 * @requires jt-strap.css
 * @requires layout.css
 * @description 스크롤이 필요한 모달의 경우, 스크롤이 가능하도록 처리
 */
function scroll_disable_helper(){

    JT.scroll.disabledEvent = ( event ) => {
        if( !event.target.closest('.av-jtx-pp') && !event.target.closest('#av-i-mn') ){
            event.preventDefault();
        } else {
            let scrollHeight = ( event.target.closest('.av-jtx-pp') || event.target.closest('#av-i-mn') ).scrollHeight;
            let maxHeight = window.innerHeight;

            if( !!event.target.closest('.av-jtx-pp-cont-in') ){
                scrollHeight = event.target.closest('.av-jtx-pp-cont-in').scrollHeight;
                maxHeight = event.target.closest('.av-jtx-pp-cont').offsetHeight;
            }

            if( !!event.target.closest('#av-i-mn') ){
                maxHeight = event.target.closest('#av-i-mn').offsetHeight;
            }

            if( scrollHeight <= maxHeight ){
                event.preventDefault();
            }
        }
    }

}



/**
 * 뷰포트 높이 체크 (카카오 웹뷰)
 *
 * @version 1.0.0
 * @author STUDIO-JT (JSH)
 */
function full_height(){

    // Kakao browser scrolltrigger pin issue fix
    if( JT.browser('kakao') ){
        document.documentElement.style.setProperty('--fit-height', `${ window.innerHeight }px`);
        document.documentElement.style.setProperty('--full-height', `${ screen.height }px`);
    }

}



/**
 * Video lazyload + inview autoplay
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 * @requires gsap.min.js
 * @requires ScrollTrigger.min.js
 * @see {@link https://greensock.com/docs/|GreenSock Docs}
 */
function autoplay_inview(){

    const targets = document.querySelectorAll('.av-jtx-tplx-nvwx');

    let observers = [];

    targets.forEach( ( target, idx ) => {

        // Autoplay trigger
        const observer = new IntersectionObserver(( entries ) => {

            entries.forEach(( entry ) => {

                let videos = [];

                if( entry.isIntersecting ){
                    videos = Array.from( target.querySelectorAll('video') ).filter(( video ) => {
                        return is_visible( video );
                    });

                    videos.forEach(( video ) => {
                        let poster = video.closest('.av-jtx-tplx-nvwx').querySelector('.av-jtx-bckx-mv-pstx');

                        if( video.readyState === 4 && video.paused && target.classList.contains('av-jtx-tplx-lddx') ) {
                            video.play().then(() => {
                                target.classList.remove('jt-autoplay-inview--paused');
                                target.classList.add('jt-autoplay-inview--play');

                                if( !!poster ) gsap.to(poster, { delay: ( JT.browser('kakao') ? .4 : 0 ), duration: .2, autoAlpha: 0, onComplete: () => { poster.style.display = 'none'; } });
                            });
                        } else {
                            video.load();
                            video.play().then(() => {

                                target.classList.remove('jt-autoplay-inview--paused');
                                target.classList.add('jt-autoplay-inview--play');

                                if( !!poster ) gsap.to(poster, { delay: ( JT.browser('kakao') ? .4 : 0 ), duration: .2, autoAlpha: 0, onComplete: () => { poster.style.display = 'none'; } });
                            }).catch(() => {
                                if( !!poster ){
                                    const error = poster.querySelector('.av-jtx-bckx-mv-rrrx');
                                    gsap.to(error, { autoAlpha: 1, duration: .2 });

                                    if( !!error ){
                                        error.addEventListener('click', () => {
                                            if( video.readyState === 4 && video.paused && target.classList.contains('av-jtx-tplx-lddx') ) {
                                                video.play().then(() => {
                                                    target.classList.remove('jt-autoplay-inview--paused');
                                                    target.classList.add('jt-autoplay-inview--play');

                                                    if( !!poster ) gsap.to(poster, { duration: .2, autoAlpha: 0, onComplete: () => { poster.style.display = 'none'; } });
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                            target.classList.add('av-jtx-tplx-lddx');
                        }
                    });
                } else {
                    videos = target.querySelectorAll('video');

                    videos.forEach(( video ) => {
                        if( video.readyState === 4 && !video.paused && target.classList.contains('av-jtx-tplx-lddx') ) {
                            target.classList.remove('jt-autoplay-inview--play');
                            target.classList.add('jt-autoplay-inview--paused');
                            video.pause();
                        }
                    });
                }
            });

        });

        observer.observe( target );
        observers.push( observer );

        function visibility_change(){
            let videos = Array.from( target.querySelectorAll('video') ).filter(( video ) => {
                return is_visible( video );
            });

            if( document.visibilityState === 'visible' ){
                videos.forEach(( vid ) => {
                    if( vid.readyState === 4 && vid.paused && target.classList.contains('jt-autoplay-inview--play') ) {
                        vid.play();
                    }
                });
            } else {
                videos.forEach(( vid ) => {
                    if( vid.readyState === 4 && !vid.paused && target.classList.contains('jt-autoplay-inview--play') ) {
                        vid.pause();
                    }
                });
            }
        }

        globalObserver.push( observer );
        JT.globals.visibilityChanges[`autoplay_inview_visibility_change_${ idx }`] = visibility_change;

    });

    JT.globals.resizes[`autoplay_inview_resize`] = () => {

        observers.forEach(( observer ) => {
            globalObserver = globalObserver.filter(item => item !== observer);
        });

        for( let idx = 0; idx < targets.length; idx++ ){
            document.removeEventListener('visibilitychange', JT.globals.visibilityChanges[`autoplay_inview_visibility_change_${ idx }`]);
            delete JT.globals.visibilityChanges[`autoplay_inview_visibility_change_${ idx }`];
        }

        autoplay_inview();

    }

}



/**
 * 슬라이더 비디오 재생/일시정지 뷰포트 옵저버
 *
 * @version 1.0.0
 * @author STUDIO-JT (JSH)
 * @requires swiper-bundle.min.js
 * @requires swiper-bundle.min.css
 * @requires jt-strap.css
 *
 * @example
 * slider_visibility_observer(
 *     slider, // 슬라이더 엘리먼트
 *     id      // 고유 아이디
 * )
 */
function slider_visibility_observer( slider, id = '' ){

    if( slider.classList.contains('jt-observer--enable') ) return;

    slider.classList.add('jt-observer--enable');

    const observer = new IntersectionObserver(( entries ) => {
        entries.forEach(( entry ) => {

            let videos = [];

            if( entry.isIntersecting ){
                if( !!entry.target?.swiper ){
                    videos = Array.from( entry.target.querySelectorAll('.swiper-slide-active video, .swiper-slide-duplicate-active video') ).filter(( video ) => {
                        return is_visible( video );
                    });
                } else {
                    videos = Array.from( entry.target.querySelectorAll('video') ).filter(( video ) => {
                        return is_visible( video );
                    });
                }
                videos.forEach(( video ) => {
                    if( video.readyState === 4 && video.paused && video.closest('.av-jtx-bckx-mv').classList.contains('av-jtx-bckx-mv-lddx') ) {
                        video.play().then(() => {
                            video.closest('.av-jtx-bckx-mv').classList.remove('jt-background-video--paused');
                            video.closest('.av-jtx-bckx-mv').classList.add('jt-background-video--played');
                        });
                    }
                });
            } else {
                videos = entry.target.querySelectorAll('video');

                videos.forEach(( video ) => {
                    if( video.readyState === 4 && !video.paused && video.closest('.av-jtx-bckx-mv').classList.contains('av-jtx-bckx-mv-lddx') ) {
                        video.closest('.av-jtx-bckx-mv').classList.remove('jt-background-video--played');
                        video.closest('.av-jtx-bckx-mv').classList.add('jt-background-video--paused');
                        video.pause();
                    }
                });
            }
        });
    });

    observer.observe( slider );

    function visibility_change(){

        let videos = [];

        if( !!slider?.swiper ){
            videos = Array.from( slider.querySelectorAll('.swiper-slide-active video') ).filter(( video ) => {
                return is_visible( video );
            });
        } else {
            videos = Array.from( slider.querySelectorAll('video') ).filter(( video ) => {
                return is_visible( video );
            });
        }

        if( document.visibilityState === 'visible' ){
            videos.forEach(( video ) => {
                if( video.readyState === 4 && video.paused && video.closest('.av-jtx-bckx-mv').classList.contains('jt-background-video--played') ) {
                    video.play();
                }
            });
        } else {
            videos.forEach(( video ) => {
                if( video.readyState === 4 && !video.paused && video.closest('.av-jtx-bckx-mv').classList.contains('jt-background-video--played') ) {
                    video.pause();
                }
            });
        }
    }

    globalObserver.push( observer );
    JT.globals.visibilityChanges[`slider_visibility_change_${ id }`] = visibility_change;
}



/**
 * 슬라이더 비디오 플레이/정지/싱크로 헬퍼
 *
 * @version 1.0.0
 * @author STUDIO-JT (JSH)
 * @requires gsap.min.js
 * @requires swiper-bundle.min.js
 * @requires swiper-bundle.min.css
 * @requires jt-strap.css
 *
 * @example
 * slider_video_play(slider, { // 슬라이더 엘리먼트
 *     isAutoplay: true,  // 오토플레이 여부
 *     changeSpeed: 1000, // 슬라이드 트렌지션 속도 Millisecond
 *     changeDelay: 5000  // 슬라이드 잔류 시간 Millisecond
 * })
 */
function slider_video_play( slider, args ){

    const swiper = slider.swiper;
    const { isAutoplay, changeSpeed, changeDelay } = args || {};

    let curr = null;
    let prev = null;
    let isSingle = false;

    if( !swiper ){
        curr = slider.querySelector('.swiper-slide');
        isSingle = true;
    } else {
	    curr = swiper.slides[swiper.activeIndex];
	    prev = swiper.slides[swiper.previousIndex];
    }

    if( prev?.querySelector('video') && !!Array.from( prev.querySelectorAll('video') ).filter(( video ) => { return is_visible( video ); }).length ){

        let prevIndex = prev.dataset.swiperSlideIndex;
        let prevSlides = !isNaN( prevIndex ) ? slider.querySelectorAll(`.swiper-slide[data-swiper-slide-index='${ prevIndex }']`) : [ prev ];

        prevSlides.forEach(( slide ) => {

            const prevVideo = Array.from( slide.querySelectorAll('video') ).filter(( video ) => {
                if( !video.paused ) video.pause();
                return is_visible( video );
            });

            const prevPoster = Array.from( slide.querySelectorAll('.swiper-lazy') ).filter(( poster ) => {
                return is_visible( poster );
            });

            if( !!prevVideo.length ){
                prevVideo[0].closest('.av-jtx-bckx-mv').classList.add('jt-background-video--paused');
                prevVideo[0].closest('.av-jtx-bckx-mv').classList.remove('jt-background-video--played');

                if( !prevVideo[0].paused ) prevVideo[0].pause();

                if( changeSpeed ){
                    const progress = { counter: 0 };

                    gsap.fromTo(progress, {
                        counter: 0
                    }, {
                        counter: 1,
                        duration: parseFloat( changeSpeed / 1000 ),
                        ease: 'none',
                        onComplete: () => {
                            if( !!prevPoster.length ){
                                gsap.to(prevPoster[0], { duration: .2, autoAlpha: 1, onComplete: () => {
                                    prevVideo[0].currentTime = 0;
                                }});
                            } else {
                                prevVideo[0].currentTime = 0;
                            }
                        }
                    });
                }
            }
        });
    }

    if( curr?.querySelector('video') && !!Array.from( curr.querySelectorAll('video') ).filter(( video ) => { return is_visible( video ); }).length ){
        let currIndex = curr.dataset.swiperSlideIndex;
        let currSlides = isSingle ? slider.querySelectorAll('.swiper-slide') : ( !isNaN( currIndex ) ? slider.querySelectorAll(`.swiper-slide[data-swiper-slide-index='${ currIndex }']`) : [ curr ] );

        // Once run
        if( swiper && isAutoplay && !isSingle ){
            slider_progress( swiper, changeDelay );
        }

        currSlides.forEach(( slide ) => {

            const currVideo = Array.from( slide.querySelectorAll('video') ).filter(( video ) => {
                if( !video.paused ) video.pause();
                return is_visible( video );
            });

            const currPoster = Array.from( slide.querySelectorAll('.swiper-lazy') ).filter(( poster ) => {
                return is_visible( poster );
            });

            if( !!currVideo.length ){
                if( currVideo[0].readyState !== 4 ){
                    currVideo[0].load();
                    currVideo[0].addEventListener('load', video_canplay);
                    currVideo[0].addEventListener('canplaythrough', video_canplay);
                } else {
                    video_canplay();
                }
            }

            function video_canplay(){
                currVideo[0].removeEventListener('load', video_canplay);
                currVideo[0].removeEventListener('canplaythrough', video_canplay);

                currVideo[0].currentTime = 0;
                currVideo[0].play().then(() => {

                    currVideo[0].closest('.av-jtx-bckx-mv').classList.add('jt-background-video--played');
                    currVideo[0].closest('.av-jtx-bckx-mv').classList.remove('jt-background-video--paused');

                    if( !!currPoster[0] ){
                        gsap.to(currPoster[0], { duration: .2, autoAlpha: 0 });
                    }

                    // Overwrite run
                    if( swiper && isAutoplay && !isSingle ){
                        if( curr === swiper.slides[swiper.activeIndex] ){
                            slider_progress(swiper, ( currVideo[0].duration - currVideo[0].currentTime ) * 1000);
                        } else {
                            currVideo[0].currentTime = 0;
                            currVideo[0].pause();
                        }
                    }

                    if( isSingle ){
                        currVideo[0].addEventListener('ended', () => {
                            currVideo[0].currentTime = 0;
                            currVideo[0].play();
                        });
                    }
                }).catch(() => {
                    if( !!currPoster[0] ){
                        const error = currPoster[0].querySelector('.av-jtx-bckx-mv-rrrx');
                        gsap.to(error, { autoAlpha: 1, duration: .2 });
                    }
                });

                currVideo[0].closest('.av-jtx-bckx-mv').classList.add('av-jtx-bckx-mv-lddx');
            }
        });

    } else {

        if( swiper && isAutoplay && !isSingle ){
            slider_progress( swiper, changeDelay );
        }

    }

}



/**
 * 슬라이더 오토플레이 프로그레스
 *
 * @version 1.0.0
 * @author STUDIO-JT (JSH)
 * @requires gsap.min.js
 * @requires swiper-bundle.min.js
 * @requires swiper-bundle.min.css
 *
 * @example
 * slider_progress(
 *     swiper,  // Swiper 객체
 *     duration // Millisecond
 * )
 */
function slider_progress( swiper, duration = 5000 ){
    const progress = { counter: 0 };

    sliderProgress?.kill();

    sliderProgress = gsap.fromTo(progress, {
        counter: 0
    }, {
        counter: 1,
        duration: parseFloat( duration / 1000 ),
        ease: 'none',
        onComplete: () => {
            if( !swiper.destroyed ) swiper.slideNext();
        }
    });

}



/**
 * 비메오 플레이어와 백그라운드 사운드 상호작용
 *
 * @version 1.0.0
 * @author STUDIO-JT (JSH)
 * @requires jt.js
 * @requires howler.core.js
 *
 * @example
 * sound_with_iframe( iframe ) // Iframe 엘리먼트
 */
function sound_with_iframe( iframe ){

    if( !iframe ) return;

    JT.globals.jt_vimeo_ready(() => {
        const video = new Vimeo.Player( iframe );

        if( video ){
            video.on('play', () => {
                if( globalSound.playing() && globalSoundVol > 0 ){
                    globalSoundVol = globalSound._volume;
                    globalSound.pause();
                }
            });

            video.on('pause', () => {
                if( !globalSound.playing() && globalSoundVol > 0 ){
                    globalSound.play();
                }
            });
        }
    });

}



/**
 * 요소가 보여지고 있는지 체크 ( element.checkVisibility 대용 )
 *
 * @version 1.0.0
 * @author STUDIO-JT (JSH)
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility|Element: checkVisibility() method}
 *
 * @example
 * is_visible( element ) // 체크할 엘리먼트
 */
function is_visible( element ){

    return !!( element.offsetWidth || element.offsetHeight || element.getClientRects().length );

}



/**
 * 디바이스 가로/세로 체크
 *
 * @version 1.0.0
 * @author STUDIO-JT (JSH)
 * @requires jt.js
 *
 * @example
 * is_orientation( type ) // 'portrait' 또는 'landscape'
 */
function is_orientation( type ){
    let isPortrait = JT.browser('mobile') ? ( screen.orientation.type.startsWith('portrait') ) : ( window.innerWidth <= window.innerHeight );

    if( type === 'portrait' ){
        return isPortrait;
    } else if( type === 'landscape' ){
        return !isPortrait;
    }

    return false;
}



/**
 * 모바일 테이블 스크롤러
 *
 * @version 1.0.0
 * @author STUDIO-JT (JSH)
 * @requires jt.js
 * @requires rwd-strap.css
 *
 * @example
 * table_horizontal_scroll(
 *     table, // 테이블 엘리먼트
 *     width, // 테이블 가로 크기
 *     idx    // 고유 번호
 * )
 */
function table_horizontal_scroll( table, width, idx ){

    if( !table ) return;

    let isInit = false;

    load();

    function init(){
        const wrapper = document.createElement('div');

        wrapper.classList.add('av-jtx-sngx-tbl-scrx', `jt-single__table-scroller--${ idx }`);

        table.parentElement.insertBefore(wrapper, table);
        table.style.width = `${ !!width ? width : 468 }rem`;

        wrapper.appendChild(table);
    }

    function load(){

        if( JT.isScreen(540) && !isInit ){
            init();
            isInit = true;
        } else if( !JT.isScreen(540) && isInit ){
            destroy();
        }

    }

    function destroy(){

        table.removeAttribute('style');

        if( !!table.closest('.av-jtx-sngx-tbl-scrx') ){
            table.closest('.av-jtx-sngx-tbl-scrx').replaceWith(...table.closest('.av-jtx-sngx-tbl-scrx').childNodes);
        }

        isInit = false;

    }

    function resize(){
        setTimeout(load, 100);
    }

    JT.globals.resizes[`table_horizontal_scroll_resize_${ idx }`] = resize;

    if( JT.browser('mobile') ){
        screen.orientation.addEventListener('change', resize);
    } else {
        window.addEventListener('resize', resize);
    }

}



/**
 * 윈도우 팝업
 *
 * @version 1.0.0
 * @author STUDIO-JT (JSH)
 * @requires jt.js
 *
 * @example
 * jt_popup_win(url, {
 *     title:  string, // 팝업 타이틀
 *     width:  number, // 팝업 가로 사이즈
 *     height: number, // 팝업 세로 사이즈
 *     left:   number, // 팝업 x 좌표
 *     top:    number, // 팝업 y 좌표
 * })
 */
function jt_popup_win( url, args ){

    const {
        title = '',
        width = 480,
        height = 800,
        left = (screen.availLeft + ((screen.availWidth - width) / 2)),
        top = (screen.availTop + ((screen.availHeight - height) / 2)),
    } = args || {};

    const option = `status=no, menubar=no, toolbar=no, resizable=no, width=${width}, height=${height}, left=${left}, top=${top}`;

    const popup = window.open(url, title, option);

    if( !popup ){
        JT.confirm({
            message: '팝업 차단 기능이 설정되어 있습니다. <br />해제 후 이용하시기 바랍니다.'
        });

        return;
    }

    return popup;

}

// 자주 묻는 질문 분류 탭: 원본은 서버가 분류별 목록을 따로 내줬다. 여기서는 같은 쪽 안에서 골라 보여 준다(바바 전환 뒤에도 듣도록 문서에 한 번).
document.addEventListener('click', ( e ) => {
    const tab = e.target.closest('.av-jtx-ctgx a[data-faq]');

    if( !tab ) return;

    e.preventDefault();
    e.stopPropagation();   // 원본 분류 탭(바바로 같은 쪽 다시 부르기)보다 먼저 받는다

    const cat = tab.dataset.faq;

    tab.parentElement.querySelectorAll('a[data-faq]').forEach(( t ) => t.classList.toggle('av-jtx-ctgx-crrx', t === tab));
    document.querySelectorAll('li[data-faq-cat]').forEach(( li ) => {
        li.style.display = ( cat === '전체' || li.dataset.faqCat === cat ) ? '' : 'none';
    });
}, true);

// 프로그램 진행 상태 탭: 카드의 시작 · 끝 날짜를 오늘과 견줘 진행중 · 진행예정 · 종료를 가른다.
document.addEventListener('click', ( e ) => {
    const tab = e.target.closest('.av-jtx-ctgx a[data-prog]');

    if( !tab ) return;

    e.preventDefault();
    e.stopPropagation();   // 원본 분류 탭(바바로 같은 쪽 다시 부르기)보다 먼저 받는다

    const state = tab.dataset.prog;
    const now = Date.now();

    tab.parentElement.querySelectorAll('a[data-prog]').forEach(( t ) => t.classList.toggle('av-jtx-ctgx-crrx', t === tab));
    document.querySelectorAll('.av-jtx-bd-gd > li').forEach(( li ) => {
        const times = li.querySelectorAll('time[datetime]');

        if( times.length < 2 ) return;

        const start = new Date( times[0].getAttribute('datetime').replace(' ', 'T') ).getTime();
        const end = new Date( times[1].getAttribute('datetime').replace(' ', 'T') ).getTime();
        const now_state = ( now < start ) ? '진행예정' : ( now > end ) ? '종료' : '진행중';

        li.style.display = ( state === '전체' || state === now_state ) ? '' : 'none';
    });
}, true);

})();
