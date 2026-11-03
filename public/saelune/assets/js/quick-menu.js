(() => {
    const rail = document.querySelector('.saelune-rail');
    if (!rail) return;
    document.querySelector('[data-rail-top]')?.addEventListener('click', () => {
        closePanels();
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
        });
    });
    const items = rail.querySelector('.saelune-rail-items');
    const toggle = rail.querySelector('.saelune-rail-toggle');
    const faq = rail.querySelector('#rail-faq');
    const faqButton = rail.querySelector('[data-rail-faq]');
    const booking = rail.querySelector('#rail-booking-panel');
    const bookingButton = rail.querySelector('[data-rail-booking]');
    const schedule = rail.querySelector('#rail-schedule');
    const scheduleButton = rail.querySelector('[data-rail-schedule]');
    let lastTrigger = null;
    function closePanels(restore = false) {
        if (faq) faq.hidden = true;
        if (schedule) schedule.hidden = true;
        scheduleButton?.setAttribute('aria-expanded', 'false');
        if (booking) booking.hidden = true;
        faqButton?.setAttribute('aria-expanded', 'false');
        bookingButton?.setAttribute('aria-expanded', 'false');
        if (restore) lastTrigger?.focus({preventScroll:true});
    }
    function openPanel(panel, button) {
        if (!panel || !button) return;
        const opening = panel.hidden;
        closePanels();
        if (opening) {
            panel.hidden = false;
            button.setAttribute('aria-expanded', 'true');
            lastTrigger = button;
            const firstControl = panel.querySelector('button:not([hidden]), input, a[href], select, textarea');
            firstControl?.focus({preventScroll:true});
        }
    }
    function collapse(value) {
        items.hidden = value;
        toggle.textContent = value ? 'QUICK' : '×';
        toggle.setAttribute('aria-expanded', String(!value));
        toggle.setAttribute('aria-label', value ? '퀵메뉴 펼치기' : '퀵메뉴 접기');
        if (value) closePanels();
        try { sessionStorage.setItem('saelune-quick-collapsed', value ? '1' : '0'); } catch (_) {}
    }
    Array.from(items.children).forEach((item, index) => item.style.setProperty('--order', index));
    let collapsed = false;
    try { collapsed = sessionStorage.getItem('saelune-quick-collapsed') === '1'; } catch (_) {}
    collapse(collapsed);
    toggle.addEventListener('click', () => collapse(!items.hidden));
    faqButton?.addEventListener('click', () => openPanel(faq, faqButton));
    scheduleButton?.addEventListener('click', () => openPanel(schedule, scheduleButton));
    rail.querySelector('[data-schedule-close]')?.addEventListener('click', () => closePanels(true));
    bookingButton?.addEventListener('click', () => openPanel(booking, bookingButton));
    rail.querySelector('[data-faq-close]')?.addEventListener('click', () => closePanels(true));
    rail.querySelector('[data-rail-close]')?.addEventListener('click', () => closePanels(true));
    document.addEventListener('click', event => { if (!rail.contains(event.target)) closePanels(); });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && ((faq && !faq.hidden) || (booking && !booking.hidden) || (schedule && !schedule.hidden))) {
            closePanels(true);
            event.preventDefault();
        }
    });
    rail.addEventListener('click', event => {
        if (event.target.closest('[data-open-contact]')) closePanels();
    });
    if (schedule) {
        const snapshot = JSON.parse(schedule.querySelector('[data-schedule-data]').textContent);
        const dateKey=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
        const now=new Date(), known=new Map(snapshot.months.flatMap(month=>month.days).map(day=>[day.date,day]));
        const data={today:dateKey(now),months:Array.from({length:7},(_,offset)=>{
            const first=new Date(now.getFullYear(),now.getMonth()+offset,1),year=first.getFullYear(),month=first.getMonth();
            const days=Array.from({length:new Date(year,month+1,0).getDate()},(_,index)=>{
                const date=new Date(year,month,index+1),key=dateKey(date);
                if(known.has(key))return known.get(key);
                const weekday=date.getDay(),closed=weekday===0||weekday===1;
                return {date:key,day:index+1,status:closed?'closed':'open',lines:closed?[]:[weekday===3?'10:00 ~ 20:30':weekday===6?'10:00 ~ 17:00':'10:00 ~ 18:30']};
            });
            return {label:`${year}.${String(month+1).padStart(2,'0')}`,weekday:first.getDay(),days};
        })};
        let month = 0;
        const grid = schedule.querySelector('.rail-calendar-days');
        const info = schedule.querySelector('.rail-day-info');
        const prev = schedule.querySelector('[data-month-prev]');
        const next = schedule.querySelector('[data-month-next]');
        function selectDay(day, button) {
            grid.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
            info.replaceChildren();
            const title = document.createElement('strong');
            title.textContent = day.date + (day.date === data.today ? ' · 오늘' : '');
            info.append(title);
            const lines = day.lines.length ? day.lines : [day.status === 'closed' ? '휴진입니다.' : '등록된 일정이 없습니다. 병원에 확인해 주세요.'];
            lines.forEach(text => {
                const line = document.createElement('p');
                line.textContent = text;
                info.append(line);
            });
        }
        function renderMonth() {
            const item = data.months[month];
            schedule.querySelector('[data-month-label]').textContent = item.label;
            prev.disabled = month === 0;
            next.disabled = month === data.months.length - 1;
            grid.replaceChildren();
            for (let i = 0; i < item.weekday; i++) grid.append(document.createElement('span'));
            let initial;
            item.days.forEach(day => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'rail-date ' + day.status;
                const number = document.createElement('span');
                number.textContent = day.day;
                const label = document.createElement('small');
                label.textContent = day.status === 'closed' ? '휴진' : day.status === 'special' ? '정상진료' : '';
                button.append(number, label);
                button.setAttribute('aria-label', day.date + ' ' + (day.status === 'closed' ? '휴진' : day.status === 'unknown' ? '일정 확인 필요' : '진료'));
                if (day.date === data.today) button.setAttribute('aria-current', 'date');
                button.addEventListener('click', () => selectDay(day, button));
                grid.append(button);
                if (!initial || day.date === data.today) initial = [day, button];
            });
            selectDay(...initial);
        }
        prev.addEventListener('click', () => { if (month > 0) { month--; renderMonth(); } });
        next.addEventListener('click', () => { if (month < data.months.length - 1) { month++; renderMonth(); } });
        renderMonth();
    }
    if (!faq) return;
    const topics = faq.querySelector('.rail-topics');
    const showTopics = document.createElement('button');
    showTopics.type = 'button';
    showTopics.textContent = '다른 질문 보기';
    showTopics.hidden = true;
    showTopics.style.cssText = 'margin:0 16px 12px;padding:9px 12px;border:1px solid #e5ddd3;border-radius:11px;background:transparent;color:inherit;font:inherit;font-size:12px;cursor:pointer';
    showTopics.setAttribute('aria-expanded', 'false');
    topics.after(showTopics);
    showTopics.addEventListener('click', () => {
        topics.style.display = '';
        showTopics.hidden = true;
        showTopics.setAttribute('aria-expanded', 'true');
        topics.querySelector('button')?.focus({preventScroll:true});
    });
    const chat = faq.querySelector('.rail-chat');
    const kakao = faq.querySelector('[data-faq-kakao]').href;
    function answer(question) {
        question = question.trim().slice(0, 200);
        if (!question) return;
        const fromTopic = topics.contains(document.activeElement);
        topics.style.display = 'none';
        showTopics.hidden = false;
        showTopics.setAttribute('aria-expanded', 'false');
        if (fromTopic) showTopics.focus({preventScroll:true});
        const user = document.createElement('p');
        user.className = 'rail-user';
        user.textContent = question;
        chat.append(user);
        const response = document.createElement('div');
        response.className = 'rail-answer';
        let message;
        let links;
        if (/예약|네이버/.test(question)) {
            message = '네이버 예약은 준비 중입니다. 카카오톡 또는 간편상담으로 문의를 남겨주세요. 상담 접수만으로 예약이 확정되지는 않습니다.';
            links = [['카카오톡으로 문의', kakao], ['간편상담 열기', './consult.html', true]];
        } else if (/시간|요일|휴무|휴진|위치|주소|주차|오시는/.test(question)) {
            message = '진료시간과 위치는 오시는 길 페이지에서 확인해 주세요. 방문 전 문의가 필요하면 카카오톡으로 안내받으실 수 있습니다.';
            links = [['진료시간·오시는 길 확인', './contact.html'], ['카카오톡으로 문의', kakao]];
        } else if (/프로그램|시술|종류/.test(question)) {
            message = '상단 Body Restoration · Face Restoration 메뉴에서 프로그램을 확인하실 수 있습니다. 원하시는 상담 내용을 남겨주시면 담당자가 안내해 드립니다.';
            links = [['간편상담 열기', './consult.html', true]];
        } else {
            message = '이 창은 예약·진료시간·프로그램을 안내하는 자동 FAQ입니다. 개별 증상, 비용 및 자세한 상담은 담당자에게 문의해 주세요.';
            links = [['간편상담 열기', './consult.html', true], ['카카오톡으로 문의', kakao]];
        }
        response.textContent = message;
        links.forEach(([label, href, contact]) => {
            const a = document.createElement('a');
            a.textContent = label;
            a.href = href;
            if (contact) a.setAttribute('data-open-contact', '');
            if (href.startsWith('https://')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
            response.append(a);
        });
        chat.append(response);
        while (chat.children.length > 21) chat.firstElementChild.remove();
        chat.scrollTop = chat.scrollHeight;
    }
    faq.querySelectorAll('[data-topic]').forEach(button => button.addEventListener('click', () => answer(button.dataset.topic)));
    faq.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();
        const input = event.currentTarget.elements.question;
        answer(input.value);
        input.value = '';
    });
})();
