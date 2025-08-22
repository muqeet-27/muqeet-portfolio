// Portfolio Website JavaScript for Abdul Muqeet K B
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initBackToTop();
    initScrollEffects();
    initStatsCounter();
    addRevealAnimation();
    initProjectInteractions();
    initCertificationEffects();
    highlightPlaceholderLinks();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Handle "View My Work" button specifically
    const viewWorkButtons = document.querySelectorAll('a[href="#projects"]');
    viewWorkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Navbar background on scroll
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        }
    });
}

// Typing animation for hero section - Fixed to not interfere with navigation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const texts = [
        'Computer Science Engineering Student & Python Developer',
        'Data Science & Machine Learning Enthusiast',
        'Full-Stack Developer',
        'Problem Solver & Innovation Creator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let isAnimationRunning = false;

    function typeText() {
        if (!isAnimationRunning) return; // Stop if animation is disabled
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => {
                if (isAnimationRunning) isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        if (isAnimationRunning) {
            setTimeout(typeText, typingSpeed);
        }
    }

    // Start typing animation after a short delay
    setTimeout(() => {
        isAnimationRunning = true;
        typeText();
    }, 1000);

    // Stop typing animation when user interacts with navigation
    document.addEventListener('click', function(e) {
        if (e.target.closest('.nav-link') || e.target.closest('.btn')) {
            isAnimationRunning = false;
            // Reset to original text
            typingElement.textContent = 'Computer Science Engineering Student & Python Developer';
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Add fade-in animation to various elements
    const animateElements = document.querySelectorAll('.section-title, .about-content, .skill-category, .project-card, .timeline-item, .cert-card, .contact-content');
    
    animateElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });

    // Add slide animations to specific elements
    const slideLeftElements = document.querySelectorAll('.about-image, .contact-info, .education-timeline');
    const slideRightElements = document.querySelectorAll('.about-text, .contact-form, .certifications');

    slideLeftElements.forEach(element => {
        element.classList.add('slide-in-left');
        observer.observe(element);
    });

    slideRightElements.forEach(element => {
        element.classList.add('slide-in-right');
        observer.observe(element);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const progressBar = skillItem.querySelector('.skill-progress');
                const level = skillItem.getAttribute('data-level');
                
                if (progressBar && level) {
                    setTimeout(() => {
                        progressBar.style.width = level + '%';
                    }, 200);
                }
                
                skillObserver.unobserve(skillItem);
            }
        });
    }, {
        threshold: 0.5
    });

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully. I will get back to you soon!', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.pointerEvents = 'auto';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.pointerEvents = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Additional scroll effects
function initScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show navbar on scroll (less aggressive)
        if (navbar && scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else if (navbar) {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);
}

// Stats counter animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat h3');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalText = target.textContent;
                
                // Handle different types of stats
                if (finalText === '2nd') {
                    animateTextStat(target, '2nd');
                } else if (finalText === '3+') {
                    animateCounter(target, 0, 3, '+', 1500);
                } else if (finalText === '3') {
                    animateCounter(target, 0, 3, '', 1500);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.7
    });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element, start, end, suffix, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current + suffix;
        
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

function animateTextStat(element, finalText) {
    element.textContent = '0';
    setTimeout(() => {
        element.textContent = finalText;
    }, 500);
}

// Add smooth reveal animation for elements
function addRevealAnimation() {
    const revealElements = document.querySelectorAll('.hero-content, .about-stats .stat, .cert-card');
    
    revealElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
}

// Add interactive project card effects
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add click handler for project links with placeholder warnings
        const projectLinks = card.querySelectorAll('a[href*="PASTE"]');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('⚠️ Please update this placeholder link with the actual project URL!', 'warning');
            });
        });
    });
}

// Add certification card hover effects
function initCertificationEffects() {
    const certCards = document.querySelectorAll('.cert-card');
    
    certCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.cert-icon');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.1)';
                icon.style.background = 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)';
                icon.style.color = '#ffffff';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.cert-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
                icon.style.background = 'rgba(139, 92, 246, 0.1)';
                icon.style.color = '#8B5CF6';
            }
        });

        // Add click handler for cert links with placeholder warnings
        const certLinks = card.querySelectorAll('a[href*="PASTE"]');
        certLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('⚠️ Please update this placeholder link with the actual credential URL!', 'warning');
            });
        });
    });
}

// Highlight placeholder links for easy identification
function highlightPlaceholderLinks() {
    const placeholderLinks = document.querySelectorAll('a[href*="PASTE"]');
    
    placeholderLinks.forEach(link => {
        // Add pulsing animation to make them more visible
        link.style.animation = 'pulse-glow 2s ease-in-out infinite';
        
        // Add tooltip on hover
        link.addEventListener('mouseenter', function() {
            showTooltip(this, 'Click to see instructions for updating this link');
        });
        
        link.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });

    // Log instructions to console for developers
    if (placeholderLinks.length > 0) {
        console.log('🔗 PLACEHOLDER LINKS FOUND - UPDATE THESE:');
        console.log('========================================');
        placeholderLinks.forEach((link, index) => {
            console.log(`${index + 1}. ${link.textContent.trim()}`);
            console.log(`   Current href: ${link.href}`);
            console.log(`   Location: ${link.closest('.project-card, .cert-card') ? 'Project/Certification card' : 'Other'}`);
            console.log('');
        });
        console.log('Search for "[PASTE_" in your HTML file to find and replace these placeholders.');
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set styles directly based on type
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = '#10B981';
            break;
        case 'error':
            backgroundColor = '#EF4444';
            break;
        case 'warning':
            backgroundColor = '#F59E0B';
            break;
        default:
            backgroundColor = '#3B82F6';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
    `;
    
    // Create notification content
    let icon;
    switch(type) {
        case 'success':
            icon = '✓';
            break;
        case 'error':
            icon = '✗';
            break;
        case 'warning':
            icon = '⚠';
            break;
        default:
            icon = 'ⓘ';
    }
    
    notification.innerHTML = `
        <span style="font-size: 1.25rem;">${icon}</span>
        <span style="flex: 1;">${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            font-size: 1rem;
            line-height: 1;
        ">×</button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

function showTooltip(element, text) {
    hideTooltip(); // Remove any existing tooltip
    
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 0.5rem;
        border-radius: 6px;
        font-size: 0.8rem;
        white-space: nowrap;
        z-index: 1002;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 100);
}

function hideTooltip() {
    const tooltip = document.querySelector('.custom-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Add CSS animations and styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Typing cursor effect */
    .typing-text::after {
        content: '|';
        color: #8B5CF6;
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    /* Pulse glow animation for placeholder links */
    @keyframes pulse-glow {
        0%, 100% {
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
            transform: scale(1);
        }
        50% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
            transform: scale(1.02);
        }
    }
    
    /* Loading animation for buttons */
    .btn-loading {
        position: relative;
        pointer-events: none;
    }
    
    .btn-loading::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        margin: auto;
        border: 2px solid transparent;
        border-top-color: #ffffff;
        border-radius: 50%;
        animation: button-loading-spinner 1s ease infinite;
    }
    
    @keyframes button-loading-spinner {
        from {
            transform: rotate(0turn);
        }
        to {
            transform: rotate(1turn);
        }
    }
    
    /* Enhance navbar transition */
    .navbar {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }
    
    /* Project card hover enhancements */
    .project-card {
        position: relative;
        overflow: hidden;
    }
    
    .project-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s ease;
        z-index: 1;
    }
    
    .project-card:hover::before {
        left: 100%;
    }
    
    /* Certification card animations */
    .cert-card {
        transition: all 0.3s ease;
    }
    
    .cert-icon {
        transition: all 0.3s ease;
    }
    
    /* Notification hover effects */
    .notification button:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
    }
    
    /* Skill tag hover effects */
    .skill-tag {
        transition: all 0.3s ease;
        cursor: default;
    }
    
    .skill-tag:hover {
        background: rgba(139, 92, 246, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(139, 92, 246, 0.2);
    }
    
    /* Tech tag hover effects */
    .tech-tag {
        transition: all 0.3s ease;
        cursor: default;
    }
    
    .tech-tag:hover {
        background: rgba(139, 92, 246, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(139, 92, 246, 0.2);
    }
    
    /* Social links pulse animation */
    .social-links a {
        transition: all 0.3s ease;
    }
    
    .social-links a:hover {
        animation: pulse 0.6s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    /* Timeline item animations */
    .timeline-item {
        transition: all 0.3s ease;
    }
    
    .timeline-item:hover .timeline-content {
        transform: translateX(10px);
        box-shadow: 0 10px 25px rgba(139, 92, 246, 0.1);
    }
    
    .timeline-dot {
        transition: all 0.3s ease;
    }
    
    .timeline-item:hover .timeline-dot {
        transform: scale(1.2);
        box-shadow: 0 0 0 8px rgba(139, 92, 246, 0.2);
    }
    
    /* Enhanced mobile menu visibility */
    @media (max-width: 768px) {
        .nav-toggle {
            display: flex !important;
        }
        
        .nav-menu {
            display: flex !important;
        }
    }
    
    /* Custom tooltip styling */
    .custom-tooltip {
        font-family: 'Inter', sans-serif;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
`;

document.head.appendChild(style);
