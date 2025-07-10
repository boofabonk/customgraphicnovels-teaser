// Alex Fisher-inspired animations and interactions

// DOM Elements
const loader = document.getElementById('loader');
const heroBack = document.getElementById('heroBack');
const heroFront = document.getElementById('heroFront');
const heroTitle = document.getElementById('heroTitle');
const circularContainer = document.getElementById('circularContainer');

// Loader Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hide');
        initAnimations();
    }, 1500);
});

// Initialize animations after loader
function initAnimations() {
    // Start parallax scrolling
    initParallax();
    
    // Initialize scroll-triggered animations
    initScrollAnimations();
    
    // Mouse movement effects
    initMouseEffects();
    
    // Initialize back to top and form
    initBackToTop();
    
    // Initialize email capture
    initEmailCapture();
    initContactForm();
    
    // Initialize luxury buttons
    initLuxuryButtons();
}

// Parallax Scrolling Effect
function initParallax() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Background image parallax - moves up max 50px
        if (heroBack) {
            const parallaxSpeed = Math.min(scrolled * 0.1, 50);
            heroBack.style.transform = `translateY(-${parallaxSpeed}px)`;
        }
        
        // Text elements fade out on scroll
        if (circularContainer) {
            const opacity = Math.max(0, 1 - (scrolled / (windowHeight * 0.5)));
            circularContainer.style.opacity = opacity;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.section-title, .section-text, .service-card, .package-card, .process-step, .testimonial-card, .cta-content, .submissions-section');
    animatableElements.forEach(el => observer.observe(el));
    
    // Special observer for flower animation
    const flowerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('flower-visible');
            }
        });
    }, { threshold: 0.3 });
    
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        flowerObserver.observe(aboutSection);
    }
}

// Mouse movement effects with sparkle trail
function initMouseEffects() {
    let sparkles = [];
    const colors = ['#c7bd89', '#a36d61', '#928333'];
    
    // Create sparkle element
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'cursor-sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(sparkle);
        sparkles.push(sparkle);
        
        // Animate sparkle
        setTimeout(() => {
            sparkle.style.transform = `translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px) scale(0)`;
            sparkle.style.opacity = '0';
        }, 10);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
            sparkles = sparkles.filter(s => s !== sparkle);
        }, 600);
    }
    
    // Track mouse movement
    let lastSparkleTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkleTime > 50) { // Create sparkle every 50ms
            createSparkle(e.clientX, e.clientY);
            lastSparkleTime = now;
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header appearance on scroll
let lastScroll = 0;
const header = document.querySelector('.luxury-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(250, 244, 220, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(250, 244, 220, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Text splitting for animation (if needed)
function splitText(element) {
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = '';
    
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `all 0.8s ease ${index * 0.1}s`;
        element.appendChild(span);
        
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Performance optimization - throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Preload images for smooth animation
function preloadImages() {
    const images = [
        '../images/hero-back image.png',
        '../images/hero-front image.png',
        '../images/Hero-page crown assets.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would normally send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message (you can customize this)
            alert('Thank you for your message! We\'ll be in touch soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Initialize Luxury Buttons
function initLuxuryButtons() {
    const buttons = document.querySelectorAll('.luxury-button');
    
    buttons.forEach(button => {
        // Ensure button has required inner elements
        if (!button.querySelector('.button-text')) {
            const text = button.textContent;
            button.innerHTML = `
                <span class="button-text">${text}</span>
                <span class="loading-text">Loading</span>
                <span class="loading-progress"></span>
                <span class="sparkle-1"></span>
                <span class="sparkle-2"></span>
                <span class="sparkle-3"></span>
            `;
        }
        
        // Add click event listener
        button.addEventListener('click', function(e) {
            // Don't trigger loading for disabled buttons
            if (this.disabled || this.classList.contains('disabled')) return;
            
            // Don't trigger loading for links with href (navigation)
            if (this.tagName === 'A' && this.getAttribute('href') && this.getAttribute('href') !== '#') {
                // Allow normal navigation
                return;
            }
            
            // Prevent default for # links
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // Add loading state
            this.classList.add('loading');
            
            // Simulate loading (replace with actual navigation/form submission)
            setTimeout(() => {
                this.classList.remove('loading');
                this.classList.add('success');
                
                // Reset after showing success
                setTimeout(() => {
                    this.classList.remove('success');
                    // Navigate or submit form here if needed
                }, 800);
            }, 1500);
        });
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', initLuxuryButtons);

// Material Modal Functionality
function initMaterialModal() {
    const modal = document.getElementById('materialModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalMaterialName = document.getElementById('modalMaterialName');
    const modalMaterialType = document.getElementById('modalMaterialType');
    const modalDescription = document.getElementById('modalDescription');
    const clickableMaterials = document.querySelectorAll('.clickable-material');
    
    // Open modal when material is clicked
    clickableMaterials.forEach(material => {
        material.addEventListener('click', function() {
            const img = this.querySelector('.material-image');
            const materialName = this.getAttribute('data-material');
            const materialType = this.getAttribute('data-type');
            const description = this.getAttribute('data-description');
            
            // Set modal content
            modalImage.src = img.src;
            modalImage.alt = materialName;
            modalMaterialName.textContent = materialName;
            modalMaterialType.textContent = materialType;
            modalDescription.textContent = description;
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closeModal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize material modal on DOM load
document.addEventListener('DOMContentLoaded', initMaterialModal);

// Email Capture Functionality
function initEmailCapture() {
    const emailBar = document.getElementById('emailCaptureBar');
    const emailForm = document.getElementById('emailCaptureForm');
    const closeBtn = document.getElementById('emailCaptureClose');
    const submitBtn = emailForm.querySelector('.email-capture-button');
    
    // Email bar is now visible by default (no animation needed)
    
    // Close functionality
    closeBtn.addEventListener('click', () => {
        emailBar.style.display = 'none';
        // Note: Removed sessionStorage so bar shows again on reload
    });
    
    // Form submission with Formspree
    emailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailForm.querySelector('.email-capture-input').value;
        
        if (email) {
            // Show loading state
            submitBtn.classList.add('loading');
            
            try {
                // Submit to Formspree
                const response = await fetch(emailForm.action, {
                    method: 'POST',
                    body: new FormData(emailForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success state
                    submitBtn.classList.remove('loading');
                    emailForm.querySelector('.email-capture-input').value = '';
                    
                    // Change button text briefly
                    const originalText = submitBtn.querySelector('.button-text').textContent;
                    submitBtn.querySelector('.button-text').textContent = 'Joined!';
                    
                    setTimeout(() => {
                        submitBtn.querySelector('.button-text').textContent = originalText;
                        emailBar.style.display = 'none';
                    }, 1500);
                } else {
                    throw new Error('Network response was not ok');
                }
                
            } catch (error) {
                // Error state
                submitBtn.classList.remove('loading');
                const originalText = submitBtn.querySelector('.button-text').textContent;
                submitBtn.querySelector('.button-text').textContent = 'Error - Try Again';
                
                setTimeout(() => {
                    submitBtn.querySelector('.button-text').textContent = originalText;
                }, 2000);
                
                console.error('Form submission error:', error);
            }
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && emailBar.style.display !== 'none') {
            emailBar.style.display = 'none';
            // Note: Removed sessionStorage so bar shows again on reload
        }
    });
}