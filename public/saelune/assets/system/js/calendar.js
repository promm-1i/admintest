'use strict';
document.querySelectorAll('input[type="date"], input[type="datetime-local"]').forEach(input => {
    const dateTime = input.type === 'datetime-local';
    const required = input.required;
    input.hidden = true;
    input.required = false;
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'medis-date-trigger';
    trigger.setAttribute('aria-haspopup', 'dialog');
    const renderLabel = () => trigger.textContent = input.value ? input.value.replace('T', ' · ') : '날짜' + (dateTime ? '와 시간' : '') + ' 선택';
    input.after(trigger);
    input.addEventListener('change', renderLabel);
    renderLabel();
    input.form?.addEventListener('submit', event => {
        if (required && !input.value && !input.disabled) {
            event.preventDefault();
            trigger.focus();
            trigger.setCustomValidity?.('날짜를 선택해 주세요.');
            trigger.click();
        }
    });
    const branch = document.querySelector('#branch-select');
    if (input.id === 'booking-date') branch?.addEventListener('change', () => {
        input.value = '';
        input.dispatchEvent(new Event('change', {
            bubbles: true
        }));
    });
    trigger.addEventListener('click', () => {
        if (document.querySelector('.medis-calendar[open]')) return;
        const today = new Date();
        const initial = input.value ? new Date(input.value.substring(0, 10) + 'T12:00:00') : today;
        let month = new Date(initial.getFullYear(), initial.getMonth(), 1);
        let chosen = input.value.slice(0, 10);
        let request;
        const dialog = document.createElement('dialog');
        dialog.className = 'medis-calendar';
        dialog.setAttribute('aria-label', dateTime ? '날짜와 시간 선택' : '날짜 선택');
        dialog.innerHTML = '<div class="medis-calendar-heading"><button type="button" data-prev aria-label="이전 달">‹</button><strong></strong><button type="button" data-next aria-label="다음 달">›</button></div><div class="medis-calendar-week"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div><div class="medis-calendar-days"></div><p role="status"></p>' + (dateTime ? '<div class="medis-calendar-time"><label>시 (24시간)<input type="number" min="0" max="23" value="0" data-hour></label><label>분<input type="number" min="0" max="59" value="0" data-minute></label></div>' : '') + '<div class="medis-calendar-actions"><button type="button" data-clear>비우기</button><button type="button" data-cancel>닫기</button><button type="button" data-apply>선택 완료</button></div>';
        const grid = dialog.querySelector('.medis-calendar-days');
        const status = dialog.querySelector('[role=status]');
        const apply = dialog.querySelector('[data-apply]');
        const dateKey = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        if (dateTime && input.value) {
            dialog.querySelector('[data-hour]').value = input.value.slice(11, 13);
            dialog.querySelector('[data-minute]').value = input.value.slice(14, 16);
        }
        async function render() {
            request?.abort();
            request = new AbortController();
            const signal = request.signal;
            grid.replaceChildren();
            apply.disabled = !chosen;
            dialog.querySelector('strong').textContent = `${month.getFullYear()}년 ${month.getMonth()+1}월`;
            const booking = input.id === 'booking-date';
            const monthKey = dateKey(month).slice(0, 7);
            dialog.querySelector('[data-prev]').disabled = booking && monthKey <= input.min.slice(0, 7);
            dialog.querySelector('[data-next]').disabled = booking && monthKey >= input.max.slice(0, 7);
            let allowed = null;
            if (booking) {
                status.textContent = '예약 가능한 날짜를 확인하고 있습니다.';
                try {
                    const response = await fetch('./assets/data/availability.json?branch=' + encodeURIComponent(branch.value) + '&month=' + monthKey, {
                        signal
                    });
                    if (!response.ok) throw new Error();
                    allowed = new Set((await response.json()).dates);
                    if (signal.aborted) return;
                    status.textContent = allowed.size ? '예약 가능한 날짜만 선택할 수 있습니다.' : '이번 달에 예약 가능한 날짜가 없습니다.';
                    if (chosen.startsWith(monthKey) && !allowed.has(chosen)) {
                        chosen = '';
                        apply.disabled = true;
                    }
                } catch (error) {
                    if (!signal.aborted) status.textContent = '일정을 불러오지 못했습니다. 창을 닫고 다시 시도해 주세요.';
                    return;
                }
            }
            for (let i = 0; i < month.getDay(); i++) grid.append(document.createElement('span'));
            for (let day = 1; day <= new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate(); day++) {
                const date = dateKey(new Date(month.getFullYear(), month.getMonth(), day));
                const button = document.createElement('button');
                button.type = 'button';
                button.textContent = day;
                button.setAttribute('aria-label', date);
                button.setAttribute('aria-pressed', String(date === chosen));
                if (date === dateKey(today)) button.dataset.today = 'true';
                button.disabled = (input.min && date < input.min.slice(0, 10)) || (input.max && date > input.max.slice(0, 10)) || (allowed && !allowed.has(date));
                button.onclick = () => {
                    chosen = date;
                    grid.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
                    apply.disabled = false;
                    if (!dateTime) apply.click();
                };
                grid.append(button);
            }
        }
        dialog.querySelector('[data-prev]').onclick = () => {
            month.setMonth(month.getMonth() - 1);
            render();
        };
        dialog.querySelector('[data-next]').onclick = () => {
            month.setMonth(month.getMonth() + 1);
            render();
        };
        dialog.querySelector('[data-cancel]').onclick = () => dialog.close();
        dialog.querySelector('[data-clear]').onclick = () => {
            input.value = '';
            input.dispatchEvent(new Event('change', {
                bubbles: true
            }));
            dialog.close();
        };
        apply.onclick = () => {
            if (!chosen) return;
            let value = chosen;
            if (dateTime) {
                const h = dialog.querySelector('[data-hour]'),
                    m = dialog.querySelector('[data-minute]');
                if (h.value === '' || m.value === '' || !h.reportValidity() || !m.reportValidity()) return;
                value += 'T' + String(Number(h.value)).padStart(2, '0') + ':' + String(Number(m.value)).padStart(2, '0');
            }
            input.value = value;
            input.dispatchEvent(new Event('change', {
                bubbles: true
            }));
            input.dispatchEvent(new Event('input', {
                bubbles: true
            }));
            dialog.close();
        };
        dialog.addEventListener('close', () => {
            request?.abort();
            dialog.remove();
            trigger.focus();
        });
        document.body.append(dialog);
        dialog.showModal();
        render();
    });
});
