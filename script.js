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

    // Typewriter effect for name
    const nameElement = document.getElementById('typewriter-name');
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    setTimeout(() => {
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove the typing cursor after completion
                setTimeout(() => {
                    nameElement.style.setProperty('--hide-cursor', 'true');
                    nameElement.classList.add('hide-cursor');
                }, 1000);
            }
        }
        typeWriter();
    }, 500); // Start typing after 500ms
});