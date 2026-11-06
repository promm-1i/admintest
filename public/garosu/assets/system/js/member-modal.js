
(() => {
    let dialog, frame, trigger, previousOverflow;
    const close = () => {
        dialog.close();
        frame.src = 'about:blank';
        document.documentElement.style.overflow = previousOverflow;
        trigger?.focus({preventScroll: true})
    };
    document.addEventListener('click', e => {
        const link = e.target.closest('a[href]');
        if (!link || e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || link.hasAttribute('download')) return;
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin) return;
        const policy = /\/(?:terms|privacy|email-policy|consent)\.html$/.test(url.pathname);
        if (!policy && !link.hasAttribute('data-member-open')) return;
        e.preventDefault();
        trigger = link;
        if (!dialog) {
            dialog = document.createElement('dialog');
            dialog.setAttribute('aria-label', '약관 및 회원 서비스');
            dialog.style.cssText = 'padding:0;border:0;border-radius:24px;width:520px;max-width:100%;height:calc(100dvh - 40px);max-height:900px;background:white;overflow:hidden;';
            frame = document.createElement('iframe');
            frame.title = '회원 서비스';
            frame.style.cssText = 'width:100%;height:100%;border:0;display:block';
            dialog.append(frame);
            document.body.append(dialog);
            dialog.addEventListener('cancel', e => {
                e.preventDefault();
                try {
                    const button = frame.contentDocument.querySelector('.member-close');
                    if (button) button.click(); else close();
                } catch {
                    close()
                }
            })
        }
        url.searchParams.set('member_embed', '1');
        frame.src = url.href;
        previousOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        dialog.showModal();
    });
    addEventListener('message', e => {
        if (e.origin === location.origin && e.source === frame?.contentWindow && e.data?.type === 'medis-member-close') close()
    });
})();
