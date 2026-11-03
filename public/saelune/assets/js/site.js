'use strict';
(() => {
    const nav = document.querySelector('#site-header #site-nav');
    const toggle = document.querySelector('.site-menu-toggle');
    if (!nav || !toggle) return;
    const desktop = window.matchMedia('(min-width: 901px)');
    const setOpen = (item, open) => {
        item.classList.toggle('is-open', open);
        item.querySelector(':scope > .menu-row > .menu-expand')?.setAttribute('aria-expanded', String(open));
    };
    const closeAll = () => {
        nav.querySelectorAll('.menu-item').forEach(item => setOpen(item, false));
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
        const open = !nav.classList.contains('is-open');
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.menu-item').forEach(item => {
        const button = item.querySelector(':scope > .menu-row > .menu-expand');
        if (!button) return;
        button.addEventListener('click', () => setOpen(item, !item.classList.contains('is-open')));
        item.addEventListener('pointerenter', event => {
            if (desktop.matches && event.pointerType === 'mouse') setOpen(item, true);
        });
        item.addEventListener('pointerleave', () => {
            if (desktop.matches && !item.contains(document.activeElement)) setOpen(item, false);
        });
        item.addEventListener('focusout', event => {
            if (!item.contains(event.relatedTarget)) setOpen(item, false);
        });
    });
    nav.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        event.preventDefault();
        const item = event.target.closest('.menu-item.is-open');
        if (item) {
            setOpen(item, false);
            item.querySelector(':scope > .menu-row > .menu-expand')?.focus();
        } else {
            closeAll();
            toggle.focus();
        }
    });
    document.addEventListener('click', event => {
        if (!nav.contains(event.target) && !toggle.contains(event.target)) closeAll();
    });
    desktop.addEventListener('change', closeAll);
})();
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', event => {
        const open = siteNav.classList.toggle('open');
        event.currentTarget.setAttribute('aria-expanded', String(open));
        if (open) siteNav.querySelector('a, button')?.focus({preventScroll:true});
        else menuToggle.focus({preventScroll:true});
    });
    siteNav.addEventListener('keydown', event => {
        if (event.key === 'Escape' && siteNav.classList.contains('open')) {
            siteNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.focus({preventScroll:true});
        }
    });
}
document.querySelectorAll('form[data-confirm]').forEach(form => form.addEventListener('submit', event => {
    if (!confirm(form.dataset.confirm)) event.preventDefault();
}));
document.querySelectorAll('form.consult-form').forEach(form => {
    const submit = form.querySelector('button[type="submit"]');
    if (!submit) return;
    let status = form.querySelector('[data-consult-status]');
    if (!status) {
        status = document.createElement('p');
        status.dataset.consultStatus = '';
        status.className = 'consult-submit-status';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        status.setAttribute('aria-atomic', 'true');
        status.hidden = true;
        form.insertBefore(status, submit);
    }
    form.addEventListener('submit', event => {
        event.preventDefault();
        status.hidden = false;
        status.textContent = '상담 접수는 전화 010-4894-4905로 문의해 주세요.';
        status.setAttribute('tabindex', '-1');
        status.focus({preventScroll:true});
    });
});
document.querySelectorAll('form.lookup-form').forEach(form => {
    const submit = form.querySelector('button[type="submit"]');
    if (!submit) return;
    let status = form.querySelector('[data-lookup-status]');
    if (!status) {
        status = document.createElement('p');
        status.dataset.lookupStatus = '';
        status.className = 'lookup-submit-status';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        status.setAttribute('aria-atomic', 'true');
        status.hidden = true;
        form.insertBefore(status, submit);
    }
    form.addEventListener('submit', event => {
        event.preventDefault();
        status.hidden = false;
        status.textContent = '온라인 조회가 연결되지 않습니다. 전화 010-4894-4905로 접수 내용을 문의해 주세요.';
        status.setAttribute('tabindex', '-1');
        status.focus({preventScroll:true});
    });
});
const bookingDate = document.querySelector('#booking-date');
if (bookingDate) {
    const branch = document.querySelector('#branch-select'),
        department = document.querySelector('#department-select'),
        doctor = document.querySelector('#doctor-select'),
        slots = document.querySelector('#slot-select'),
        feedback = document.querySelector('#slot-feedback');
    if (!branch || !department || !doctor || !slots || !feedback) {
        bookingDate.removeAttribute('aria-busy');
    } else {
    let data = [],
        controller;
    function populate(select, items, placeholder) {
        select.replaceChildren(new Option(placeholder, ''));
        for (const [value, label] of items) select.add(new Option(label, value));
    }
    function departments() {
        populate(department, [...new Map(data.map(s => [s.department_id, s.department]))], '진료과 선택');
        populate(doctor, [], '의료진 선택');
        populate(slots, [], '예약 시간 선택');
    }
    async function load() {
        controller?.abort();
        controller = new AbortController();
        data = [];
        departments();
        if (!bookingDate.value) return;
        feedback.textContent = '예약 시간을 확인하고 있습니다.';
        try {
            const response = await fetch('./assets/data/slots.json?date=' + encodeURIComponent(bookingDate.value) + '&branch=' + encodeURIComponent(branch.value), {
                signal: controller.signal
            });
            if (!response.ok) throw Error();
            const payload = await response.json();
            data = payload.slots;
            departments();
            feedback.textContent = data.length ? '진료과와 의료진을 선택해 주세요.' : '선택한 날짜에 예약 가능한 시간이 없습니다.';
        } catch (error) {
            if (error.name !== 'AbortError') feedback.textContent = '예약 시간을 불러오지 못했습니다. 다시 시도해 주세요.';
        }
    }
    bookingDate.addEventListener('change', load);
    branch.addEventListener('change', load);
    department.addEventListener('change', () => {
        populate(doctor, [...new Map(data.filter(s => String(s.department_id) === department.value).map(s => [s.doctor_id, s.doctor]))], '의료진 선택');
        populate(slots, [], '예약 시간 선택');
    });
    doctor.addEventListener('change', () => populate(slots, data.filter(s => String(s.doctor_id) === doctor.value && String(s.department_id) === department.value).map(s => [s.id, s.starts_at.slice(11, 16) + ' · 잔여 ' + s.remaining + '명']), '예약 시간 선택'));
    }
}
const consent = document.querySelector('.analytics-consent');
if (consent) {
    let started = false;
    function start() {
        if (started) return;
        started = true;
        const ga = consent.dataset.ga,
            meta = consent.dataset.meta;
        if (/^G-[A-Z0-9]+$/.test(ga)) {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() {
                dataLayer.push(arguments);
            };
            gtag('js', new Date());
            gtag('config', ga, {
                page_location: location.origin + location.pathname,
                page_referrer: '',
                send_page_view: true
            });
            const script = document.createElement('script');
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ga;
            script.async = true;
            document.head.append(script);
        }
        if (/^[0-9]{5,25}$/.test(meta)) {
            const fb = window.fbq = function() {
                fb.callMethod ? fb.callMethod.apply(fb, arguments) : fb.queue.push(arguments);
            };
            fb.queue = [];
            fb.loaded = true;
            fb.version = '2.0';
            fb('init', meta);
            fb('track', 'PageView');
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://connect.facebook.net/en_US/fbevents.js';
            document.head.append(script);
        }
    }
    let choice;
    try {
        choice = localStorage.getItem('medis:analytics');
    } catch {}
    if (choice) {
        consent.hidden = true;
        if (choice === 'yes') start();
    }
    consent.querySelectorAll('[data-analytics]').forEach(button => button.addEventListener('click', () => {
        const choice = button.dataset.analytics;
        try {
            localStorage.setItem('medis:analytics', choice);
        } catch {}
        consent.hidden = true;
        if (choice === 'yes') start();
        else if (started) location.reload();
    }));
    document.querySelector('[data-cookie-settings]')?.addEventListener('click', () => consent.hidden = false);
}
document.querySelectorAll('.submenu-toggle').forEach(button => button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    button.closest('.nav-group').classList.toggle('expanded', open);
}));
const contactDialog = document.querySelector('#quick-contact-dialog');
let contactTrigger = null;
const contactFocusable = () => contactDialog?.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') || [];
document.addEventListener('click', event => {
    if (event.target.closest('[data-open-contact]') && contactDialog) {
        event.preventDefault();
        contactTrigger = event.target.closest('[data-open-contact]');
        if (!contactDialog.open) {
            contactDialog.showModal();
            const firstControl = contactDialog.querySelector('input:not([type="hidden"]), textarea, select, button');
            firstControl?.focus({preventScroll:true});
        }
    }
});
document.querySelector('[data-close-contact]')?.addEventListener('click', () => contactDialog?.close());
contactDialog?.addEventListener('close', () => {
    contactTrigger?.focus({preventScroll:true});
    contactTrigger = null;
});
contactDialog?.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...contactFocusable()].filter(control => control.offsetParent !== null);
    if (!controls.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus({preventScroll:true});
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus({preventScroll:true});
    }
});
contactDialog?.addEventListener('click', event => {
    if (event.target === contactDialog) {
        const box = contactDialog.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) contactDialog.close();
    }
});
document.querySelectorAll('[data-map-placeholder]').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        const status = button.closest('[id="map-placeholder"], .footer-map')?.querySelector('#map-placeholder-status')
            || document.querySelector('#map-placeholder-status');
        if (status) {
            status.hidden = false;
            status.setAttribute('tabindex', '-1');
            status.setAttribute('aria-atomic', 'true');
            status.textContent = '현재 지도는 위치 안내용 미리보기입니다. 자세한 주소는 오시는 길 페이지에서 확인해 주세요.';
            status.focus({preventScroll:true});
        }
    });
});
'use strict';
(() => {
    const header = document.getElementById('saelune-header');
    if (!header || header.dataset.ready) return;
    header.dataset.ready = 'true';
    const nav = header.querySelector('.fh-nav');
    const language = header.querySelector('.fh-language');
    const languageToggle = language?.querySelector('.fh-language-toggle');
    const languages = language?.querySelector('.fh-languages');
    if (!nav || !language || !languageToggle || !languages) return;
    const desktop = matchMedia('(min-width:1001px) and (hover:hover)');
    const items = [...nav.querySelectorAll('.has-children')];
    const rowButton = item => item.querySelector(':scope > .fh-menu-row > .fh-expand');
    const panel = item => item.querySelector(':scope > .fh-dropdown');
    function setBranch(item, open) {
        item.classList.toggle('is-open', open);
        rowButton(item).setAttribute('aria-expanded', String(open));
        panel(item).hidden = !open;
        if (!open) item.querySelectorAll('.has-children').forEach(child => {
            child.classList.remove('is-open');
            rowButton(child).setAttribute('aria-expanded', 'false');
            panel(child).hidden = true;
        });
    }
    function closeMenus() { items.forEach(item => setBranch(item, false)); }
    function setLanguage(open, focus = false) {
        languageToggle.setAttribute('aria-expanded', String(open));
        languages.hidden = !open;
        if (open) {
            closeMenus();
            if (focus) languages.querySelector('a')?.focus();
        }
    }
    function openBranch(item) {
        setLanguage(false);
        [...item.parentElement.children].forEach(sibling => {
            if (sibling !== item && sibling.classList.contains('has-children')) setBranch(sibling, false);
        });
        setBranch(item, true);
    }
    items.forEach(item => {
        let leaveTimer;
        rowButton(item).addEventListener('click', () => {
            clearTimeout(leaveTimer);
            item.classList.contains('is-open') ? setBranch(item, false) : openBranch(item);
        });
        item.addEventListener('pointerenter', event => {
            clearTimeout(leaveTimer);
            if (desktop.matches && event.pointerType === 'mouse') openBranch(item);
        });
        item.addEventListener('pointerleave', () => {
            leaveTimer = setTimeout(() => {
                if (desktop.matches && !item.contains(document.activeElement)) setBranch(item, false);
            }, 140);
        });
        item.addEventListener('focusout', event => {
            if (!item.contains(event.relatedTarget)) setBranch(item, false);
        });
        item.querySelector('.fh-menu-row').addEventListener('keydown', event => {
            if (event.key !== 'ArrowDown') return;
            event.preventDefault();
            openBranch(item);
            panel(item).querySelector('a')?.focus();
        });
    });
    nav.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        const item = event.target.closest('.has-children.is-open');
        if (!item) return;
        event.preventDefault();
        setBranch(item, false);
        rowButton(item).focus();
    });
    languageToggle.addEventListener('click', () => setLanguage(languages.hidden));
    languageToggle.addEventListener('keydown', event => {
        if (event.key !== 'ArrowDown') return;
        event.preventDefault();
        setLanguage(true, true);
    });
    language.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            event.preventDefault();
            setLanguage(false);
            languageToggle.focus();
        }
    });
    language.addEventListener('focusout', event => {
        if (!language.contains(event.relatedTarget)) setLanguage(false);
    });
    document.addEventListener('pointerdown', event => {
        if (!header.contains(event.target)) { closeMenus(); setLanguage(false); }
    });
    desktop.addEventListener('change', () => { closeMenus(); setLanguage(false); });
    header.querySelectorAll('.fh-language img').forEach(img => {
        const hideBrokenFlag = () => { img.hidden = true; };
        img.addEventListener('error', hideBrokenFlag);
        if (img.complete && !img.naturalWidth) hideBrokenFlag();
    });
    const updateHeader = () => {
        const startsTransparent =
            header.dataset.home === 'true' ||
            header.dataset.transparent === 'true';
        header.classList.toggle(
            'is-solid',
            !startsTransparent || window.scrollY > 24
        );
    };
    let queued = false;
    window.addEventListener('scroll', () => {
        if (queued) {
            return;
        }
        queued = true;
        requestAnimationFrame(() => {
            updateHeader();
            queued = false;
        });
    }, { passive: true });
    window.addEventListener('pageshow', updateHeader);
    updateHeader();
})();
document.addEventListener('DOMContentLoaded', function () {
  var introEl = document.getElementById('intro');
  if (!introEl || typeof gsap === 'undefined') return;
  document.body.style.overflow = 'hidden';
  var word = 'SAELUNE';
  var wordEl = introEl.querySelector('[data-el="word"]');
  word.split('').forEach(function (ch) {
    var s = document.createElement('span');
    s.textContent = ch;
    wordEl.appendChild(s);
  });
  var letters = wordEl.querySelectorAll('span');
  var spread = [-90, -55, -28, 28, 55, 90];
  letters.forEach(function (l, i) {
    gsap.set(l, { x: spread[i] || 0 });
  });
  var introPin  = introEl.querySelector('.intro_pin');
  var frame1    = introEl.querySelector('[data-el="frame1"]');
  var sub       = introEl.querySelector('[data-el="sub"]');
  var frame2    = introEl.querySelector('[data-el="frame2"]');
  var logo      = introEl.querySelector('[data-el="logo"]');
  var taglineKr = introEl.querySelector('[data-el="taglineKr"]');
  var taglineEn = introEl.querySelector('[data-el="taglineEn"]');
  var enterBtn  = introEl.querySelector('[data-el="enter"]');
  var skipBtn   = introEl.querySelector('[data-el="skip"]');
  var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl
    .to(letters, {
      opacity: 1,
      filter: 'blur(0px)',
      x: 0,
      duration: 1.4,
      stagger: 0.07,
      ease: 'power4.out'
    })
    .to(sub, { opacity: 1, duration: 0.9 }, '-=0.6')
    .to({}, { duration: 0.6 }) // hold
    .to(frame1, { opacity: 0, y: -40, duration: 0.7, ease: 'power2.in' })
    .to(frame2, { opacity: 1, duration: 0.3 }, '-=0.1')
    .to(logo, { opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.4)' }, '<')
    .to(taglineKr, { opacity: 1, duration: 0.7 }, '-=0.2')
    .to(taglineEn, { opacity: 1, duration: 0.7 }, '-=0.25')
    .to(enterBtn, { opacity: 1, duration: 0.8 }, '-=0.2');
  var opened = false;
  function openIntro() {
    if (opened) return;
    opened = true;
    tl.progress(1); // 등장 시퀀스 남아있으면 즉시 완료
    introEl.style.display = 'none';   // 인트로는 애니메이션 없이 바로 제거
    document.body.style.overflow = '';
    document.dispatchEvent(new CustomEvent('introOpened'));
  }
  if (skipBtn)  skipBtn.addEventListener('click', openIntro);
  if (enterBtn) enterBtn.addEventListener('click', openIntro);
});
document.addEventListener('DOMContentLoaded', function () {
  var visualEl = document.getElementById('visual');
  if (!visualEl) return;
  function openVisual() {
    visualEl.classList.add('active');
  }
  if (document.getElementById('intro')) {
    document.addEventListener('introOpened', openVisual);
  } else {
    openVisual();
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var section = document.querySelector('.main01');
  if (!section) return;
  var video = section.querySelector('video');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        section.classList.add('active');
        if (video) {
          var playPromise = video.play();
          if (playPromise && playPromise.catch) playPromise.catch(function () {});
        }
        io.unobserve(section);
      }
    });
  }, { threshold: 0.3 });
  io.observe(section);
});
document.addEventListener('DOMContentLoaded', function () {
	var section = document.querySelector('.main02');
	if (!section) return;
	var io = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				section.classList.add('active');
				io.unobserve(section);
			}
		});
	}, { threshold: 0.25 });
	io.observe(section);
});
document.addEventListener('DOMContentLoaded', function () {
	var section = document.querySelector('.signature-section');
	if (!section) return;
	var io = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				section.classList.add('active');
				io.unobserve(section);
			}
		});
	}, { threshold: 0.15 });
	io.observe(section);
});
document.addEventListener('DOMContentLoaded', function () {
  var section = document.querySelector('.main03');
  if (!section) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        section.classList.add('active');
        io.unobserve(section);
      }
    });
  }, { threshold: 0.3 });
  io.observe(section);
});
document.addEventListener('DOMContentLoaded', function () {
  var section = document.querySelector('.main04');
  if (!section) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        section.classList.add('active');
        io.unobserve(section);
      }
    });
  }, { threshold: 0.3 });
  io.observe(section);
});
document.addEventListener('DOMContentLoaded', function () {
  var section = document.querySelector('.main05');
  if (!section) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        section.classList.add('active');
        io.unobserve(section);
      }
    });
  }, { threshold: 0.3 });
  io.observe(section);
});
document.addEventListener('DOMContentLoaded', function () {
  var section = document.querySelector('.main06');
  if (!section) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        section.classList.add('active');
        io.unobserve(section);
      }
    });
  }, { threshold: 0.3 });
  io.observe(section);
});
(() => {
    const page = document.querySelector('.contact-page');
    if (!page || page.dataset.contactReady) return;
    page.dataset.contactReady = 'true';
    const copyButton = page.querySelector('[data-contact-copy]');
    const status = page.querySelector('.contact-copy-status');
    const manual = page.querySelector('.contact-copy-manual');
    let copyTimer;
    copyButton?.addEventListener('click', async () => {
        clearTimeout(copyTimer);
        try {
            if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
            await navigator.clipboard.writeText(copyButton.dataset.copyText);
            manual.hidden = true;
            copyButton.textContent = '복사완료';
            status.textContent = '주소를 복사했습니다.';
            copyTimer = setTimeout(() => { copyButton.textContent = '복사'; status.textContent = ''; }, 2500);
        } catch {
            manual.hidden = false;
            const input = manual.querySelector('input');
            input.focus();
            input.select();
            status.textContent = '주소를 선택했어요. 직접 복사해 주세요.';
        }
    });
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set();
    let observer;
    if ('IntersectionObserver' in window && !reducedMotion.matches) {
        observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                if (!reducedMotion.matches && entry.target.animate) {
                    const animation = entry.target.animate([
                        { opacity:0, transform:'translateY(18px)' },
                        { opacity:1, transform:'translateY(0)' }
                    ], { duration:650, easing:'cubic-bezier(.22,1,.36,1)' });
                    animations.add(animation);
                    animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
                }
                observer.unobserve(entry.target);
            });
        }, { threshold:0.08 });
        page.querySelectorAll('[data-sub-reveal]').forEach(element => observer.observe(element));
    }
    reducedMotion.addEventListener('change', event => {
        if (!event.matches) return;
        observer?.disconnect();
        animations.forEach(animation => animation.cancel());
        animations.clear();
    });
})();
(() => {
    'use strict';
    const page = document.querySelector('[data-fr-page]');
    if (!page || page.dataset.frMotionReady) {
        return;
    }
    page.dataset.frMotionReady = 'true';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 600px)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const supportsMotion =
        'IntersectionObserver' in window &&
        typeof Element.prototype.animate === 'function';
    const activeAnimations = new Set();
    const observedGroups = new Map();
    const registeredElements = new Set();
    const ease = 'cubic-bezier(.22,1,.36,1)';
    const imageEase = 'cubic-bezier(.19,1,.22,1)';
    let observer = null;
    const select = selector => page.querySelector(selector);
    const selectAll = selector => [...page.querySelectorAll(selector)];
    const animate = (element, keyframes, options = {}) => {
        if (!element) {
            return;
        }
        element.classList.remove('fr-motion-pending');
        if (!supportsMotion || reducedMotion.matches) {
            return;
        }
        try {
            const animation = element.animate(keyframes, {
                easing: ease,
                fill: 'backwards',
                ...options,
                duration: (options.duration ?? 1100) * 1.25,
                delay: (options.delay ?? 0) * 1.25
            });
            activeAnimations.add(animation);
            animation.finished.then(
                () => {
                    activeAnimations.delete(animation);
                },
                () => {
                    activeAnimations.delete(animation);
                }
            );
        } catch {
            element.classList.remove('fr-motion-pending');
        }
    };
    const revealText = (element, delay = 0, distance = 24) => {
        animate(
            element,
            [
                {
                    opacity: 0,
                    transform: `translate3d(0, ${distance}px, 0)`
                },
                {
                    opacity: 1,
                    transform: 'translate3d(0, 0, 0)'
                }
            ],
            {
                duration: 1150,
                delay
            }
        );
    };
    const revealSoft = (element, delay = 0) => {
        animate(
            element,
            [
                {
                    opacity: 0,
                    transform: 'translate3d(0, 14px, 0)'
                },
                {
                    opacity: 1,
                    transform: 'translate3d(0, 0, 0)'
                }
            ],
            {
                duration: 1300,
                delay
            }
        );
    };
    const revealImage = (element, delay = 0, direction = 'bottom') => {
        if (!element) {
            return;
        }
        element.classList.add('fr-motion-frame');
        const startClip = direction === 'left'
            ? 'inset(0 100% 0 0)'
            : 'inset(12% 0 88% 0)';
        animate(
            element,
            [
                {
                    opacity: 0,
                    clipPath: startClip,
                    transform: 'translate3d(0, 24px, 0)'
                },
                {
                    opacity: 1,
                    clipPath: 'inset(0 0 0 0)',
                    transform: 'translate3d(0, 0, 0)'
                }
            ],
            {
                duration: 1550,
                easing: imageEase,
                delay
            }
        );
        const image = element.querySelector('img');
        if (image) {
            animate(
                image,
                [
                    {
                        transform: 'scale(1.075)'
                    },
                    {
                        transform: 'scale(1)'
                    }
                ],
                {
                    duration: 1900,
                    easing: imageEase,
                    delay
                }
            );
        }
    };
    const revealCapsule = (element, delay = 0, index = 0) => {
        const distance = [48, 30, 58, 24][index % 4];
        animate(
            element,
            [
                {
                    opacity: 0,
                    transform: `translate3d(0, ${distance}px, 0) scale(.94)`
                },
                {
                    opacity: 1,
                    transform: 'translate3d(0, 0, 0) scale(1)'
                }
            ],
            {
                duration: 1550,
                delay
            }
        );
    };
    if (supportsMotion) {
        observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    const group = observedGroups.get(entry.target);
                    if (!group) {
                        return;
                    }
                    observer.unobserve(entry.target);
                    observedGroups.delete(entry.target);
                    try {
                        group.run();
                    } catch {
                        group.elements.forEach(element => {
                            element.classList.remove('fr-motion-pending');
                        });
                    }
                });
            },
            {
                rootMargin: `0px 0px -${Math.round(window.innerHeight * 0.25)}px 0px`,
                threshold: 0
            }
        );
    }
    const register = (trigger, elements, run) => {
        const targets = elements.filter(Boolean);
        if (!trigger || !targets.length) {
            return;
        }
        if (!supportsMotion || reducedMotion.matches) {
            return;
        }
        const rect = trigger.getBoundingClientRect();
        if (rect.top < 0) {
            return;
        }
        targets.forEach(element => {
            element.classList.add('fr-motion-pending');
            registeredElements.add(element);
        });
        observedGroups.set(trigger, {
            elements: targets,
            run
        });
        observer.observe(trigger);
    };
    const registerCopy = container => {
        if (!container) {
            return;
        }
        const children = [...container.children].filter(element => {
            return element.matches('h2, h3, p');
        });
        register(container, children, () => {
            children.forEach((element, index) => {
                revealText(element, index * 180, index === 0 ? 28 : 18);
            });
        });
    };
    const hero = select('.fr-hero');
    const heroImage = select('.fr-hero-image');
    const heroCopy = select('.fr-hero-copy');
    const heroName = select('.fr-hero-name');
    if (
        supportsMotion &&
        !reducedMotion.matches &&
        hero &&
        window.scrollY < 80
    ) {
        const heroLines = heroCopy ? [...heroCopy.children] : [];
        animate(
            heroImage,
            [
                {
                    transform: 'scale(1.045)'
                },
                {
                    transform: 'scale(1)'
                }
            ],
            {
                duration: 2400,
                easing: 'cubic-bezier(.2,.65,.3,1)'
            }
        );
        heroLines.forEach((element, index) => {
            revealText(element, 180 + index * 220, index === 0 ? 30 : 20);
        });
        animate(
            heroName,
            [
                {
                    opacity: 0,
                    transform: 'translate3d(0, 30px, 0)'
                },
                {
                    opacity: 1,
                    transform: 'translate3d(0, 0, 0)'
                }
            ],
            {
                duration: 1500,
                delay: 720
            }
        );
    }
    selectAll('.fr-intro > .fr-copy').forEach(registerCopy);
    const portrait = select('.fr-portrait');
    register(portrait, [portrait], () => {
        revealImage(portrait);
    });
    const texture = select('.fr-texture-inner');
    const textureTitle = texture?.querySelector('p');
    register(texture, [texture, textureTitle], () => {
        animate(
            texture,
            [
                {
                    opacity: 1,
                    clipPath: 'inset(0 50% 0 50%)'
                },
                {
                    opacity: 1,
                    clipPath: 'inset(0 0% 0 0%)'
                }
            ],
            {
                duration: 1600,
                easing: imageEase
            }
        );
        revealSoft(textureTitle, 650);
    });
    registerCopy(select('.fr-definition .fr-copy'));
    const pillarsTitle = select('.fr-pillars > h2');
    register(pillarsTitle, [pillarsTitle], () => {
        animate(
            pillarsTitle,
            [
                { opacity: 0, transform: 'translateY(10px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ],
            {
                duration: 700,
                easing: 'cubic-bezier(.25,.1,.25,1)'
            }
        );
    });
    const pillarGrid = select('.fr-pillar-grid');
    const cards = selectAll('.fr-pillar-grid > div');
    const playCard = card => {
        animate(
            card,
            [
                { opacity: 0, transform: 'translateY(12px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ],
            {
                duration: 800,
                easing: 'cubic-bezier(.25,.1,.25,1)'
            }
        );
    };
    if (mobile.matches) {
        cards.forEach(card => {
            register(card, [card], () => {
                playCard(card);
            });
        });
    } else {
        register(pillarGrid, cards, () => {
            cards.forEach(card => {
                playCard(card);
            });
        });
    }
    const experience = select('.fr-experience');
    const experienceTitle = experience?.querySelector('h2');
    const experienceCopy = experience?.querySelector('.fr-copy');
    const experiencePhoto = experience?.querySelector('figure');
    register(experienceTitle, [experienceTitle], () => {
        revealText(experienceTitle);
    });
    registerCopy(experienceCopy);
    register(experiencePhoto, [experiencePhoto], () => {
        revealImage(experiencePhoto, mobile.matches ? 0 : 140, 'left');
    });
    const combinationHeading = select('.fr-combination-heading');
    const emblem = combinationHeading?.querySelector('.fr-emblem');
    const wordmark = combinationHeading?.querySelector('.fr-wordmark');
    const combinationTitle = combinationHeading?.querySelector('h2');
    register(
        combinationHeading,
        [emblem, wordmark, combinationTitle],
        () => {
            animate(
                emblem,
                [
                    {
                        opacity: 0,
                        transform: 'scale(.92)'
                    },
                    {
                        opacity: 1,
                        transform: 'scale(1)'
                    }
                ],
                {
                    duration: 1400
                }
            );
            revealSoft(wordmark, 220);
            revealText(combinationTitle, 400, 22);
        }
    );
    const combinationImage = select('.fr-combination-image');
    register(combinationImage, [combinationImage], () => {
        revealImage(combinationImage);
    });
    registerCopy(select('.fr-combination-copy'));
    selectAll('.fr-orbits figure').forEach((figure, index) => {
        register(figure, [figure], () => {
            revealCapsule(figure, (index % 2) * 130, index);
        });
    });
    const concernsTitle = select('.fr-concerns-copy h2');
    register(concernsTitle, [concernsTitle], () => {
        revealText(concernsTitle);
    });
    const concernsList = select('.fr-concerns-copy ul');
    const concernsItems = concernsList ? [...concernsList.children] : [];
    register(concernsList, concernsItems, () => {
        concernsItems.forEach((item, index) => {
            revealText(item, index * 125, 16);
        });
    });
    const processTitle = select('.fr-process > h2');
    register(processTitle, [processTitle], () => {
        revealText(processTitle);
    });
    const processGrid = select('.fr-process-grid');
    const steps = selectAll('.fr-process-grid > li');
    steps.forEach((step, index) => {
        step.style.setProperty('--fr-line-delay', `${index * 160}ms`);
    });
    if (mobile.matches) {
        steps.forEach(step => {
            const copy = step.querySelector('.fr-step-copy');
            register(step, [copy], () => {
                processGrid?.classList.add('is-fr-visible');
                revealText(copy, 0, 24);
            });
        });
    } else {
        const copies = steps.map(step => {
            return step.querySelector('.fr-step-copy');
        });
        register(processGrid, copies, () => {
            processGrid.classList.add('is-fr-visible');
            copies.forEach((copy, index) => {
                revealText(copy, 160 + index * 170, 28);
            });
        });
    }
    selectAll('.fr-balance > .fr-copy').forEach(registerCopy);
    const balanceImage = select('.fr-balance > figure');
    register(balanceImage, [balanceImage], () => {
        animate(
            balanceImage,
            [
                {
                    opacity: 0,
                    clipPath: 'inset(10% 0 10% 0)'
                },
                {
                    opacity: 1,
                    clipPath: 'inset(0 0 0 0)'
                }
            ],
            {
                duration: 1700,
                easing: imageEase
            }
        );
    });
    registerCopy(select('.fr-clinic > .fr-container'));
    const clinicImage = select('.fr-clinic > figure');
    register(clinicImage, [clinicImage], () => {
        revealImage(clinicImage);
    });
    registerCopy(select('.fr-ending > div:first-child'));
    const videoWrap = select('.fr-video-wrap');
    register(videoWrap, [videoWrap], () => {
        animate(
            videoWrap,
            [
                {
                    opacity: 0,
                    transform: 'translate3d(0, 28px, 0)'
                },
                {
                    opacity: 1,
                    transform: 'translate3d(0, 0, 0)'
                }
            ],
            {
                duration: 1400
            }
        );
    });
    const textureImage = texture?.querySelector('img');
    let textureVisible = false;
    let textureFrame = 0;
    const updateTexture = () => {
        textureFrame = 0;
        if (
            !texture ||
            !textureImage ||
            !textureVisible ||
            reducedMotion.matches ||
            !finePointer.matches
        ) {
            return;
        }
        const rect = texture.getBoundingClientRect();
        const range = window.innerHeight + rect.height;
        const progress = Math.max(
            0,
            Math.min(1, (window.innerHeight - rect.top) / range)
        );
        const offset = (progress - 0.5) * 24;
        textureImage.style.transform =
            `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.055)`;
    };
    const requestTextureUpdate = () => {
        if (textureFrame || !textureVisible) {
            return;
        }
        textureFrame = requestAnimationFrame(updateTexture);
    };
    if (supportsMotion && texture && textureImage) {
        const textureObserver = new IntersectionObserver(entries => {
            textureVisible = entries[0].isIntersecting;
            if (textureVisible) {
                requestTextureUpdate();
            }
        });
        textureObserver.observe(texture);
        window.addEventListener('scroll', requestTextureUpdate, {
            passive: true
        });
        window.addEventListener('resize', requestTextureUpdate, {
            passive: true
        });
    }
    const video = select('[data-fr-video]');
    const videoToggle = select('[data-fr-video-toggle]');
    let videoVisible = false;
    let manuallyPaused = false;
    const syncVideoLabel = () => {
        if (!video || !videoToggle) {
            return;
        }
        videoToggle.textContent = video.paused
            ? '영상 재생'
            : '영상 일시정지';
    };
    const playVideo = () => {
        if (!video) {
            return;
        }
        video.play().catch(syncVideoLabel);
    };
    const syncVideo = () => {
        if (!video) {
            return;
        }
        if (
            document.hidden ||
            !videoVisible ||
            reducedMotion.matches ||
            manuallyPaused
        ) {
            video.pause();
            return;
        }
        playVideo();
    };
    if (video && videoToggle) {
        video.autoplay = false;
        video.pause();
        videoToggle.hidden = false;
        syncVideoLabel();
        video.addEventListener('play', syncVideoLabel);
        video.addEventListener('pause', syncVideoLabel);
        videoToggle.addEventListener('click', () => {
            if (video.paused) {
                manuallyPaused = false;
                playVideo();
                return;
            }
            manuallyPaused = true;
            video.pause();
        });
        if ('IntersectionObserver' in window) {
            const videoObserver = new IntersectionObserver(
                entries => {
                    videoVisible = entries[0].isIntersecting;
                    syncVideo();
                },
                {
                    threshold: 0.2
                }
            );
            videoObserver.observe(video);
        } else {
            videoVisible = true;
            syncVideo();
        }
        document.addEventListener('visibilitychange', syncVideo);
    }
    const showAll = () => {
        observer?.disconnect();
        observedGroups.clear();
        registeredElements.forEach(element => {
            element.classList.remove('fr-motion-pending');
        });
        activeAnimations.forEach(animation => {
            animation.cancel();
        });
        activeAnimations.clear();
        processGrid?.classList.add('is-fr-visible');
        if (textureImage) {
            textureImage.style.removeProperty('transform');
        }
    };
    reducedMotion.addEventListener('change', () => {
        if (reducedMotion.matches) {
            showAll();
        }
        syncVideo();
        requestTextureUpdate();
    });
    window.addEventListener('pageshow', event => {
        if (event.persisted) {
            showAll();
            syncVideo();
        }
    });
    if (supportsMotion && !reducedMotion.matches) {
        page.classList.add('fr-motion-ready');
    }
})();
(() => {
    const initAbout = () => {
        const page = document.querySelector('[data-fa-about]');
        if (!page || page.dataset.faInitialized === 'true') return;
        page.dataset.faInitialized = 'true';
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const desktopMotion = window.matchMedia('(min-width:701px) and (pointer:fine)');
        const motionElements = [...page.querySelectorAll('[data-fa-motion]')];
        const driftElements = [...page.querySelectorAll('[data-fa-drift]')];
        const activeDrifts = new Set();
        let revealObserver = null;
        let driftObserver = null;
        let frame = 0;
        let resizeTimer = 0;
        const brand = page.querySelector('[data-fa-brand]');
        if (brand) {
            const text = brand.textContent.trim();
            brand.setAttribute('aria-label', text);
            brand.textContent = '';
            [...text].forEach((character, index) => {
                const wrapper = document.createElement('span');
                const letter = document.createElement('span');
                wrapper.className = 'fa-letter-wrap';
                wrapper.setAttribute('aria-hidden', 'true');
                letter.className = 'fa-letter';
                letter.textContent = character;
                letter.style.setProperty('--fa-letter-delay', `${150 + index * 95}ms`);
                wrapper.append(letter);
                brand.append(wrapper);
            });
        }
        page.querySelectorAll('[data-fa-group]').forEach(group => {
            const items = [...group.querySelectorAll('[data-fa-motion]')]
                .filter(item => item.closest('[data-fa-group]') === group);
            items.forEach((item, index) => {
                item.style.setProperty('--fa-delay', `${Math.min(index * 170, 510)}ms`);
            });
        });
        const heroMessage = page.querySelector('.fa-hero-message');
        if (heroMessage) heroMessage.style.setProperty('--fa-delay', '650ms');
        const showEverything = () => {
            revealObserver?.disconnect();
            motionElements.forEach(element => {
                element.classList.add('is-visible');
            });
        };
        const buildRevealObserver = () => {
            revealObserver?.disconnect();
            if (reducedMotion.matches || !('IntersectionObserver' in window)) {
                showEverything();
                return;
            }
            const bottomOffset = Math.round(window.innerHeight * 0.25);
            revealObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                });
            }, {
                rootMargin:`0px 0px -${bottomOffset}px 0px`,
                threshold:0
            });
            motionElements.forEach(element => {
                if (element.classList.contains('is-visible')) return;
                const rect = element.getBoundingClientRect();
                if (rect.bottom <= 0) {
                    element.classList.add('is-visible');
                    return;
                }
                element.classList.add('fa-ready');
                revealObserver.observe(element);
            });
        };
        const updateDrift = () => {
            frame = 0;
            if (document.hidden || reducedMotion.matches || !desktopMotion.matches) return;
            const viewportHeight = window.innerHeight;
            const updates = [];
            activeDrifts.forEach(element => {
                const frameElement = element.parentElement;
                const rect = frameElement.getBoundingClientRect();
                const distance = Number(element.dataset.faDrift) || 18;
                const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
                const offset = (progress - 0.5) * distance * 2;
                updates.push([element, offset]);
            });
            updates.forEach(([element, offset]) => {
                element.style.setProperty('--fa-drift-y', `${offset.toFixed(2)}px`);
            });
        };
        const requestDrift = () => {
            if (frame || !activeDrifts.size || document.hidden) return;
            frame = requestAnimationFrame(updateDrift);
        };
        const configureDrift = () => {
            driftObserver?.disconnect();
            activeDrifts.clear();
            if (frame) cancelAnimationFrame(frame);
            frame = 0;
            const enabled = !reducedMotion.matches && desktopMotion.matches && 'IntersectionObserver' in window;
            page.classList.toggle('fa-drift-enabled', enabled);
            driftElements.forEach(element => {
                element.style.removeProperty('--fa-drift-y');
            });
            if (!enabled) return;
            driftObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    const element = entry.target.querySelector('[data-fa-drift]');
                    if (!element) return;
                    if (entry.isIntersecting) {
                        activeDrifts.add(element);
                    } else {
                        activeDrifts.delete(element);
                    }
                });
                requestDrift();
            }, {
                rootMargin:'100px 0px',
                threshold:0
            });
            driftElements.forEach(element => {
                driftObserver.observe(element.parentElement);
            });
        };
        try {
            buildRevealObserver();
            configureDrift();
        } catch {
            showEverything();
            page.classList.remove('fa-drift-enabled');
        }
        window.addEventListener('scroll', requestDrift, { passive:true });
        window.addEventListener('resize', () => {
            requestDrift();
            clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(() => {
                buildRevealObserver();
                configureDrift();
            }, 160);
        });
        desktopMotion.addEventListener('change', configureDrift);
        reducedMotion.addEventListener('change', () => {
            if (reducedMotion.matches) showEverything();
            configureDrift();
        });
        window.addEventListener('pageshow', event => {
            if (event.persisted) showEverything();
            requestDrift();
        });
        document.addEventListener('visibilitychange', requestDrift);
        const video = page.querySelector('[data-fa-video]');
        const videoButton = page.querySelector('[data-fa-video-toggle]');
        if (!video || !videoButton) return;
        let videoVisible = false;
        let videoChoice = null;
        let videoPending = false;
        let videoFailed = false;
        video.muted = true;
        video.defaultMuted = true;
        videoButton.hidden = false;
        const updateVideoButton = () => {
            videoButton.textContent = video.paused ? '영상 재생' : '영상 일시정지';
        };
        const canPlayVideo = () => {
            const allowed = videoChoice === 'play' || (videoChoice !== 'pause' && !reducedMotion.matches);
            return allowed && videoVisible && !document.hidden && !videoFailed;
        };
        const syncVideo = async () => {
            if (!canPlayVideo()) {
                video.pause();
                updateVideoButton();
                return;
            }
            if (videoPending || !video.paused) return;
            videoPending = true;
            try {
                await video.play();
                if (!canPlayVideo()) video.pause();
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    videoChoice = 'pause';
                } else if (error.name !== 'AbortError') {
                    videoFailed = true;
                    videoButton.hidden = true;
                }
            } finally {
                videoPending = false;
                updateVideoButton();
            }
        };
        videoButton.addEventListener('click', () => {
            if (!video.paused || videoPending) {
                videoChoice = 'pause';
                video.pause();
                updateVideoButton();
                return;
            }
            videoChoice = 'play';
            syncVideo();
        });
        video.addEventListener('playing', () => {
            if (!canPlayVideo()) video.pause();
            updateVideoButton();
        });
        video.addEventListener('pause', updateVideoButton);
        const handleVideoError = () => {
            videoFailed = true;
            video.pause();
            videoButton.hidden = true;
        };
        video.addEventListener('error', handleVideoError);
        video.querySelector('source')?.addEventListener('error', handleVideoError);
        if ('IntersectionObserver' in window) {
            const videoObserver = new IntersectionObserver(([entry]) => {
                videoVisible = entry.isIntersecting;
                syncVideo();
            }, { threshold:0.2 });
            videoObserver.observe(video);
        } else {
            videoChoice = 'pause';
            videoVisible = true;
        }
        reducedMotion.addEventListener('change', () => {
            videoChoice = null;
            syncVideo();
        });
        document.addEventListener('visibilitychange', syncVideo);
        window.addEventListener('pagehide', () => video.pause());
        window.addEventListener('pageshow', syncVideo);
        updateVideoButton();
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAbout, { once:true });
    } else {
        initAbout();
    }
})();
(() => {
    const initAllMenu = () => {
        const trigger = document.querySelector('.fh-allmenu');
        const dialog = document.querySelector('#saelune-allmenu');
        const closeButton = dialog?.querySelector('.fm-close');
        if (!trigger || !dialog || !closeButton) return;
        if (dialog.dataset.fmInitialized === 'true') return;
        dialog.dataset.fmInitialized = 'true';
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let closing = false;
        let closeTimer = 0;
        let firstFrame = 0;
        let secondFrame = 0;
        let scrollX = 0;
        let scrollY = 0;
        let savedStyles = [];
        const rememberStyle = (element, property, value) => {
            savedStyles.push({
                element,
                property,
                value:element.style.getPropertyValue(property),
                priority:element.style.getPropertyPriority(property)
            });
            element.style.setProperty(property, value);
        };
        const lockPage = () => {
            scrollX = window.scrollX;
            scrollY = window.scrollY;
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            const currentPadding = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
            rememberStyle(document.documentElement, 'overflow', 'hidden');
            rememberStyle(document.body, 'position', 'fixed');
            rememberStyle(document.body, 'top', `-${scrollY}px`);
            rememberStyle(document.body, 'left', '0');
            rememberStyle(document.body, 'width', '100%');
            rememberStyle(document.body, 'overflow', 'hidden');
            if (scrollbarWidth > 0) {
                rememberStyle(document.body, 'padding-right', `${currentPadding + scrollbarWidth}px`);
            }
        };
        const unlockPage = () => {
            if (!savedStyles.length) return;
            savedStyles.reverse().forEach(record => {
                if (record.value) {
                    record.element.style.setProperty(record.property, record.value, record.priority);
                } else {
                    record.element.style.removeProperty(record.property);
                }
            });
            savedStyles = [];
            const root = document.documentElement;
            const originalBehavior = root.style.getPropertyValue('scroll-behavior');
            const originalPriority = root.style.getPropertyPriority('scroll-behavior');
            root.style.setProperty('scroll-behavior', 'auto', 'important');
            window.scrollTo(scrollX, scrollY);
            if (originalBehavior) {
                root.style.setProperty('scroll-behavior', originalBehavior, originalPriority);
            } else {
                root.style.removeProperty('scroll-behavior');
            }
        };
        const clearFrames = () => {
            cancelAnimationFrame(firstFrame);
            cancelAnimationFrame(secondFrame);
        };
        const cleanup = () => {
            clearTimeout(closeTimer);
            clearFrames();
            closing = false;
            dialog.classList.remove('is-open', 'is-closing');
            trigger.setAttribute('aria-expanded', 'false');
            unlockPage();
            if (trigger.isConnected) {
                trigger.focus({ preventScroll:true });
            }
        };
        const finishClose = () => {
            if (dialog.open) dialog.close();
        };
        const closeMenu = (immediate = false) => {
            if (!dialog.open) return;
            if (immediate) {
                clearTimeout(closeTimer);
                clearFrames();
                finishClose();
                return;
            }
            if (closing) return;
            closing = true;
            clearFrames();
            dialog.classList.add('is-closing');
            closeTimer = window.setTimeout(
                finishClose,
                reducedMotion.matches ? 0 : 480
            );
        };
        const openMenu = () => {
            if (dialog.open || closing) return;
            document.querySelectorAll('#saelune-header button[aria-expanded="true"]').forEach(button => {
                if (button !== trigger) button.click();
            });
            lockPage();
            try {
                dialog.showModal();
            } catch (error) {
                unlockPage();
                return;
            }
            trigger.setAttribute('aria-expanded', 'true');
            dialog.scrollTop = 0;
            closeButton.focus({ preventScroll:true });
            firstFrame = requestAnimationFrame(() => {
                secondFrame = requestAnimationFrame(() => {
                    if (dialog.open && !closing) {
                        dialog.classList.add('is-open');
                    }
                });
            });
        };
        trigger.addEventListener('click', () => {
            if (dialog.open) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        closeButton.addEventListener('click', () => closeMenu());
        dialog.addEventListener('cancel', event => {
            event.preventDefault();
            closeMenu();
        });
        dialog.addEventListener('close', cleanup);
        dialog.addEventListener('click', event => {
            const link = event.target.closest('a[href]');
            if (!link) return;
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            if (link.target === '_blank' || link.hasAttribute('download')) return;
            closeMenu(true);
        });
        reducedMotion.addEventListener('change', () => {
            if (closing && reducedMotion.matches) closeMenu(true);
        });
        window.addEventListener('pagehide', () => {
            if (dialog.open) closeMenu(true);
        });
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllMenu, { once:true });
    } else {
        initAllMenu();
    }
})();
(() => {
    const menu = document.querySelector('.saelune-quick');
    const trigger = menu?.querySelector('[data-quick-booking]');
    const panel = menu?.querySelector('#quick-booking-panel');
    if (!trigger || !panel) return;
    const close = (restore = false) => {
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        if (restore) trigger.focus({preventScroll:true});
    };
    trigger.addEventListener('click', () => {
        const open = panel.hidden;
        panel.hidden = !open;
        trigger.setAttribute('aria-expanded', String(open));
        if (open) {
            panel.querySelector('button:not([hidden]), input, select, textarea, a[href]')?.focus({preventScroll:true});
        }
    });
    panel.querySelector('[data-close-booking]')?.addEventListener('click', () => close(true));
    menu.querySelector('.saelune-quick-toggle').addEventListener('click', () => close());
    document.addEventListener('click', e => { if (!panel.contains(e.target) && !trigger.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { close(true); e.preventDefault(); } });
    menu.addEventListener('focusout', e => { if (!menu.contains(e.relatedTarget)) close(); });
})();
(() => {
    const menu = document.querySelector('.saelune-quick');
    if (!menu) return;
    const button = menu.querySelector('.saelune-quick-toggle');
    const items = menu.querySelector('.saelune-quick-items');
    const update = collapsed => {
        items.hidden = collapsed;
        button.setAttribute('aria-expanded', String(!collapsed));
        button.setAttribute('aria-label', collapsed ? '퀵메뉴 펼치기' : '퀵메뉴 접기');
        button.textContent = collapsed ? '퀵메뉴' : '×';
    };
    try { update(sessionStorage.getItem('saelune-quick-collapsed') === '1'); } catch (_) {}
    button.addEventListener('click', () => {
        const collapsed = !items.hidden;
        update(collapsed);
        try { sessionStorage.setItem('saelune-quick-collapsed', collapsed ? '1' : '0'); } catch (_) {}
    });
})();
(() => {
    const initHomePerspective = () => {
        const sections = document.querySelectorAll('.fa-home-perspective');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        const desktop = window.matchMedia('(min-width:761px) and (pointer:fine)');
        const ease = 'cubic-bezier(.22,1,.36,1)';
        sections.forEach(section => {
            if (section.dataset.fpReady === 'true') return;
            section.dataset.fpReady = 'true';
            const targets = [...section.querySelectorAll('[data-fa-motion]')];
            if (!reduced.matches && 'IntersectionObserver' in window) {
                targets.forEach(element => {
                    element.classList.add('fp-pending');
                });
            }
            const animations = new Set();
            const revealed = new WeakSet();
            let revealObserver;
            let driftObserver;
            let frame = 0;
            let driftVisible = false;
            const drift = section.querySelector('[data-fa-drift]');
            const driftFrame = drift?.closest('.fa-frame');
            const distance = Math.min(
                40,
                Math.max(0, Number(drift?.dataset.faDrift) || 24)
            );
            const play = (element, frames, options) => {
                if (!element || reduced.matches) return;
                const animation = element.animate(frames, {
                    duration:1400,
                    easing:ease,
                    fill:'backwards',
                    ...options
                });
                animations.add(animation);
                animation.onfinish = () => animations.delete(animation);
                animation.oncancel = () => animations.delete(animation);
            };
            const reveal = element => {
                if (revealed.has(element)) return;
                revealed.add(element);
                element.classList.remove('fp-pending');
                if (reduced.matches) return;
                const motion = element.dataset.faMotion;
                const group = element.closest('[data-fa-group]');
                const siblings = group
                    ? [...group.querySelectorAll('[data-fa-motion]')]
                    : [];
                const index = Math.max(0, siblings.indexOf(element));
                const delay = Math.min(index * 180, 540);
                if (motion === 'panorama') {
                    play(element, [
                        { clipPath:'inset(0 13% 0 13%)', opacity:.35 },
                        { clipPath:'inset(0 0% 0 0%)', opacity:1 }
                    ], {
                        duration:1900
                    });
                    play(element.querySelector('img'), [
                        { transform:'scale(1.12)' },
                        { transform:'scale(1)' }
                    ], {
                        duration:2400
                    });
                    return;
                }
                if (motion === 'principle') {
                    play(element, [
                        { opacity:0, transform:'translateY(30px)' },
                        { opacity:1, transform:'translateY(0)' }
                    ], {
                        duration:1400,
                        delay
                    });
                    play(element.querySelector('.fa-principle-copy'), [
                        { opacity:0, transform:'translateX(14px)' },
                        { opacity:1, transform:'translateX(0)' }
                    ], {
                        duration:1500,
                        delay:delay + 140
                    });
                    return;
                }
                const start = motion === 'left'
                    ? 'translateX(-36px)'
                    : motion === 'right'
                        ? 'translateX(36px)'
                        : 'translateY(28px)';
                play(element, [
                    { opacity:0, transform:start },
                    { opacity:1, transform:'translate(0,0)' }
                ], {
                    duration:1600,
                    delay
                });
            };
            const observeReveals = () => {
                revealObserver?.disconnect();
                if (reduced.matches || !('IntersectionObserver' in window)) {
                    targets.forEach(element => {
                        element.classList.remove('fp-pending');
                        revealed.add(element);
                    });
                    return;
                }
                revealObserver = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (!entry.isIntersecting) return;
                        reveal(entry.target);
                        revealObserver.unobserve(entry.target);
                    });
                }, {
                    rootMargin:`0px 0px -${Math.round(window.innerHeight * .25)}px 0px`,
                    threshold:0
                });
                targets.forEach(element => {
                    if (revealed.has(element)) return;
                    if (element.getBoundingClientRect().bottom <= 0) {
                        element.classList.remove('fp-pending');
                        revealed.add(element);
                    } else {
                        revealObserver.observe(element);
                    }
                });
            };
            const updateDrift = () => {
                frame = 0;
                if (!drift || !driftFrame) return;
                if (reduced.matches || !desktop.matches) {
                    drift.style.removeProperty('transform');
                    return;
                }
                if (!driftVisible) return;
                const rect = driftFrame.getBoundingClientRect();
                if (!rect.height) return;
                const progress = Math.max(-1, Math.min(
                    1,
                    (window.innerHeight / 2 - rect.top - rect.height / 2)
                    / ((window.innerHeight + rect.height) / 2)
                ));
                const scale = 1 + (distance * 2 + 4) / rect.height;
                drift.style.transform =
                    `translate3d(0,${progress * distance}px,0) scale(${scale})`;
            };
            const requestDrift = () => {
                if (frame) return;
                frame = requestAnimationFrame(updateDrift);
            };
            if (drift && driftFrame && 'IntersectionObserver' in window) {
                driftObserver = new IntersectionObserver(entries => {
                    driftVisible = entries[0].isIntersecting;
                    if (driftVisible) requestDrift();
                }, {
                    rootMargin:'100px 0px',
                    threshold:0
                });
                driftObserver.observe(driftFrame);
                window.addEventListener('scroll', () => {
                    if (driftVisible && desktop.matches && !reduced.matches) {
                        requestDrift();
                    }
                }, { passive:true });
            }
            let resizeTimer;
            window.addEventListener('resize', () => {
                requestDrift();
                clearTimeout(resizeTimer);
                resizeTimer = window.setTimeout(observeReveals, 160);
            }, { passive:true });
            reduced.addEventListener('change', () => {
                if (reduced.matches) {
                    animations.forEach(animation => animation.cancel());
                    animations.clear();
                }
                observeReveals();
                requestDrift();
            });
            desktop.addEventListener('change', requestDrift);
            window.addEventListener('pageshow', event => {
                if (!event.persisted) return;
                observeReveals();
                requestDrift();
            });
            observeReveals();
        });
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHomePerspective, {
            once:true
        });
    } else {
        initHomePerspective();
    }
})();
(() => {
    const initFinale = () => {
        const section = document.querySelector('[data-finale]');
        const copy = section?.querySelector('[data-finale-copy]');
        if (!section || !copy || section.dataset.finaleReady) return;
        section.dataset.finaleReady = 'true';
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        let observer;
        const show = () => {
            section.classList.add('is-finale-visible');
            observer?.disconnect();
        };
        if (reduced.matches || !('IntersectionObserver' in window)) {
            show();
            return;
        }
        try {
            observer = new IntersectionObserver(entries => {
                if (entries.some(entry => entry.isIntersecting)) show();
            }, {
                rootMargin: `0px 0px -${Math.round(window.innerHeight * 0.3)}px 0px`,
                threshold: 0
            });
            observer.observe(copy);
            reduced.addEventListener('change', event => {
                if (event.matches) show();
            });
        } catch {
            show();
        }
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFinale, { once:true });
    } else {
        initFinale();
    }
})();
(() => {
    const init = () => {
        if (window.saeluneTranslateOffsetReady) return;
        window.saeluneTranslateOffsetReady = true;
        let frame = 0;
        let previous = -1;
        const update = () => {
            frame = 0;
            const top = parseFloat(getComputedStyle(document.body).top);
            const offset = Number.isFinite(top) ? Math.max(0, top) : 0;
            if (offset === previous) return;
            previous = offset;
            document.documentElement.style.setProperty(
                '--fh-translate-offset',
                offset + 'px'
            );
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        const observer = new MutationObserver(schedule);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
        window.addEventListener('resize', schedule, { passive: true });
        window.addEventListener('pageshow', schedule);
        update();
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
document.querySelectorAll('form.board-search').forEach(form => {
    const board=form.closest('.medis-board');
    const cards=[...board.querySelectorAll('.board-gallery-card')];
    const input=form.querySelector('[name="q"]'),field=form.querySelector('[name="field"]');
    const bottom=board.querySelector('.board-list-bottom');
    const empty=document.createElement('p');
    empty.className='board-empty';empty.setAttribute('role','status');empty.hidden=true;
    empty.textContent='검색 조건에 맞는 게시물이 없습니다.';
    board.querySelector('.board-skin').append(empty);
    async function apply(updateUrl=false){
        const query=input.value.trim().toLocaleLowerCase('ko');let count=0;
        for(const card of cards){
            const title=card.querySelector('.board-gallery-title').textContent;
            if(field.value!=='title' && card.dataset.articleBody===undefined){
                const response=await fetch(card.querySelector('a').href);
                const article=new DOMParser().parseFromString(await response.text(),'text/html');
                card.dataset.articleBody=article.querySelector('.board-detail .prose')?.textContent||'';
            }
            const text=field.value==='title'?title:field.value==='body'?card.dataset.articleBody:title+' '+card.dataset.articleBody;
            const match=!query||text.toLocaleLowerCase('ko').includes(query);
            card.hidden=!match;card.style.display=match?'':'none';if(match)count++;
        }
        empty.hidden=count>0;if(bottom)bottom.hidden=count===0;
        if(updateUrl){const url=new URL(location.href);url.hash='';url.searchParams.set('page','1');url.searchParams.set('q',input.value.trim());url.searchParams.set('field',field.value);history.replaceState(null,'',url);}
    }
    form.addEventListener('submit',event=>{event.preventDefault();apply(true);});
    const params=new URLSearchParams(location.search);
    if(params.has('q'))input.value=params.get('q');
    if(['title','body','all'].includes(params.get('field')))field.value=params.get('field');
    if(input.value.trim())apply();
});
