// Scroll Animation for Experience Section
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all experience items
    const experienceItems = document.querySelectorAll('.animate-slide-up');
    experienceItems.forEach(item => {
        observer.observe(item);
    });
});