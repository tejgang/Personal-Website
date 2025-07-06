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

    // Skill card animations
    const skillCardObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillCardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, skillCardObserverOptions);

    const skillCards = document.querySelectorAll('.animate-skill-card');
    skillCards.forEach(card => {
        skillCardObserver.observe(card);
    });

    // Contact section animations
    const contactObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const contactObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, contactObserverOptions);

    const contactItems = document.querySelectorAll('.animate-contact-item');
    contactItems.forEach(item => {
        contactObserver.observe(item);
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

    // Initialize EmailJS
    emailjs.init('vgRr7rMZBv_4OI6KH'); // Replace with your actual public key

    // Contact form submission with EmailJS
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const templateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                to_email: 'tejgangupantula@gmail.com'
            };
            
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Send email using EmailJS
            emailjs.send('service_ckxe5g7', 'template_atvc8n3', templateParams)
                .then(function(response) {
                    // Success - trigger confetti and show success message
                    setTimeout(() => {
                        alert('Message sent successfully! Thank you for reaching out! 🎉');
                        contactForm.reset(); // Clear the form
                    }, 500);
                }, function(error) {
                    // Error handling
                    alert('Failed to send message. Please try again or contact me directly at tejgangupantula@gmail.com');
                    console.error('EmailJS error:', error);
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });
        });
    }

    // Email button click functionality
    const emailButton = document.querySelector('.email-clickable');
    const nameInput = document.querySelector('#name');
    
    if (emailButton && nameInput) {
        emailButton.addEventListener('click', function() {
            // Scroll to the form section smoothly
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Focus on the name input after a short delay
                setTimeout(() => {
                    nameInput.focus();
                }, 100);
            }
        });
        
        // Add cursor pointer style
        emailButton.style.cursor = 'pointer';
    }
});