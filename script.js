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

    // Timeline animation
    const timeline = document.querySelector('.experience-timeline');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-timeline');
            }
        });
    }, { threshold: 0.3 });

    if (timeline) {
        timelineObserver.observe(timeline);
    }

    // Optimized parallax background effect with throttling
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.3; // Reduced speed
            parallaxBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // Section header animations
    const headerObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const headerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, headerObserverOptions);

    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        headerObserver.observe(header);
    });

    // Project card animations
    const projectCardObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const projectCardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, projectCardObserverOptions);

    const projectCards = document.querySelectorAll('.animate-project-card');
    projectCards.forEach(card => {
        projectCardObserver.observe(card);
    });

    // Simple smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
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

    // Paper plane animation for submit button
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission for demo
            
            // Add sending class to trigger animation
            submitBtn.classList.add('sending');
            
            // Reset the animation after completion
            setTimeout(() => {
                submitBtn.classList.remove('sending');
                // You can add actual form submission logic here
                alert('Message sent! (This is a demo)');
            }, 1500);
        });
    }
});