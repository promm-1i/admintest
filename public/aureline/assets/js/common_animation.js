const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        } else {
            // entry.target.classList.remove('active');
        }
    });
}, observerOptions);

document.querySelectorAll('[class*="reveal-"]').forEach(el => observer.observe(el));