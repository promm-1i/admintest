
(() => {
    if (window.parent !== window) document.body.classList.add('member-embedded');
    const form = document.querySelector('[data-member-form]'),
        page = document.body.dataset.memberPage;
    let dirty = false,
        checked = '',
        confirmed = false,
        step = 1;
    const dialog = document.querySelector('.member-confirm');
    const confirm = (title, copy, accept) => {
        dialog.querySelector('[data-confirm-cancel]').textContent = title.includes('중단') ? '계속 작성하기' : '취소';
        dialog.querySelector('[data-confirm-ok]').textContent = title.includes('중단') ? '내용 지우고 닫기' : title.includes('탈퇴') ? '회원탈퇴' : '변경하기';
        dialog.querySelector('h2').textContent = title;
        dialog.querySelector('[data-confirm-copy]').textContent = copy;
        dialog.querySelector('[data-confirm-ok]').onclick = () => {
            dialog.close();
            accept()
        };
        dialog.querySelector('[data-confirm-cancel]').onclick = () => dialog.close();
        dialog.showModal();
        dialog.querySelector('[data-confirm-cancel]').focus();
    };
    const feedback = (input, text, ok = false) => {
        const out = document.getElementById('feedback-' + input.name);
        if (out) {
            out.textContent = text;
            out.classList.toggle('success', ok);
            input.setAttribute('aria-describedby', out.id)
        }
        input.setAttribute('aria-invalid', String(!ok && !!text))
    };
    document.querySelectorAll('.visibility').forEach(button => button.onclick = () => {
        const input = button.previousElementSibling;
        input.type = input.type === 'password' ? 'text' : 'password';
        button.setAttribute('aria-pressed', String(input.type === 'text'));
        button.setAttribute('aria-label', input.type === 'text' ? '숨김, 비밀번호 숨기기' : '보기, 비밀번호 표시')
    });
    const steps = [...document.querySelectorAll('[data-join-step]')];
    const showStep = n => {
        step = n;
        steps.forEach(section => {
            section.hidden = Number(section.dataset.joinStep) !== n;
            section.querySelectorAll('input').forEach(i => {
                if (i.type !== 'checkbox') i.disabled = section.hidden
            })
        });
        document.querySelectorAll('.member-steps li').forEach((li, i) => {
            li.removeAttribute('aria-current');
            if (i + 1 === n) li.setAttribute('aria-current', 'step');
            li.classList.toggle('complete', i + 1 < n);
            li.querySelector('b').textContent = i + 1 < n ? '✓' : i + 1
        });
        document.querySelector('h1').textContent = n === 1 ? '회원가입' : '회원정보 입력';
        document.querySelector('.member-card').scrollTop = 0;
        window.scrollTo(0, 0);
    };
    if (steps.length) {
        const all = document.querySelector('[data-agree-all]'),
            checks = [...steps[0].querySelectorAll('input[required]')];
        all.onchange = () => {
            checks.forEach(c => c.checked = all.checked);
            all.indeterminate = false
        };
        checks.forEach(c => c.onchange = () => {
            all.checked = checks.every(x => x.checked);
            all.indeterminate = !all.checked && checks.some(x => x.checked)
        });
        const next = document.querySelector('.js-next');
        next.hidden = false;
        next.onclick = () => {
            if (checks.every(c => c.reportValidity())) {
                showStep(2);
                steps[1].querySelector('input')?.focus()
            }
        };
        const back = document.querySelector('[data-join-back]');
        back.hidden = false;
        back.onclick = () => showStep(1);
        showStep(document.querySelector('.member-error') ? 2 : 1);
    }
    form?.addEventListener('input', e => {
        dirty = true;
        confirmed = false;
        if (e.target.name === 'username') {
            checked = '';
            feedback(e.target, '')
        }
        if (e.target.name) feedback(e.target, '')
    });
    form?.addEventListener('invalid', e => feedback(e.target, e.target.validationMessage), true);
    form?.querySelectorAll('input:not([type=checkbox])').forEach(input => input.addEventListener('blur', () => {
        if (input.value) feedback(input, input.validity.valid ? '' : input.validationMessage)
    }));
    document.querySelector('[data-duplicate]')?.addEventListener('click', async e => {
        const input = form.elements.username;
        if (!input.reportValidity()) return;
        const button = e.currentTarget,
            value = input.value.toLowerCase();
        button.disabled = true;
        try {
            const data = new FormData();
            data.set('_csrf', form.elements._csrf.value);
            data.set('username', value);
            const response = await fetch('/api/member/username', {
                method: 'POST',
                body: data
            });
            if (!response.ok) throw Error();
            const result = await response.json();
            if (input.value.toLowerCase() !== value) return;
            checked = result.available ? value : '';
            feedback(input, result.available ? '사용 가능한 아이디입니다.' : result.valid ? '이미 사용 중인 아이디입니다.' : '아이디 형식을 확인해 주세요.', result.available)
        } catch {
            feedback(input, '확인하지 못했습니다. 잠시 후 다시 시도해 주세요.')
        } finally {
            button.disabled = false
        }
    });
    form?.addEventListener('submit', e => {
        if (steps.length && step === 1) {
            e.preventDefault();
            document.querySelector('.js-next').click();
            return
        }
        const pw = form.elements.password,
            repeat = form.elements.password_confirm;
        if (repeat && pw.value !== repeat.value) {
            e.preventDefault();
            feedback(repeat, '비밀번호가 일치하지 않습니다.');
            repeat.focus();
            return
        }
        if (form.elements.username && checked !== form.elements.username.value.toLowerCase()) {
            e.preventDefault();
            feedback(form.elements.username, '아이디 중복확인을 해 주세요.');
            document.querySelector('[data-duplicate]').focus();
            return
        }
        if (!confirmed && (page === '/account/withdraw' || page === '/account' && pw?.value)) {
            e.preventDefault();
            confirm(page === '/account/withdraw' ? '회원탈퇴를 진행할까요?' : '비밀번호를 변경할까요?', page === '/account/withdraw' ? '탈퇴한 계정은 복구할 수 없습니다.' : '변경하면 다른 기기의 로그인도 만료됩니다.', () => {
                confirmed = true;
                form.requestSubmit()
            });
            return
        }
        dirty = false;
        form.querySelector('[type=submit]').disabled = true;
    });
    document.querySelector('.member-close')?.addEventListener('click', e => {
        e.preventDefault();
        const close = () => {
            dirty = false;
            if (window.parent !== window) window.parent.postMessage({
                type: 'medis-member-close'
            }, location.origin);
            else {
                let previous = null;
                try { previous = new URL(document.referrer); } catch (_) {}
                if (previous && previous.origin === location.origin && previous.href !== location.href && history.length > 1) {
                    history.back();
                } else {
                    location.href = './index.html';
                }
            }
        };
        if (dirty) confirm('작성을 중단할까요?', '닫으면 입력한 정보가 초기화됩니다.', close);
        else close()
    });
    addEventListener('beforeunload', e => {
        if (dirty) {
            e.preventDefault();
            e.returnValue = ''
        }
    });
})();
if(window.parent!==window)document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!document.querySelector('dialog[open]')){event.preventDefault();document.querySelector('.member-close')?.click();}});