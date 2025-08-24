// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background change on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(10, 17, 40, 0.98)';
        } else {
            header.style.backgroundColor = 'rgba(10, 17, 40, 0.95)';
        }
    });

    // Form submission handling
    const contactForm = document.querySelector('.form-card form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const service = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !service || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }

    // Button click handlers
    const quoteButtons = document.querySelectorAll('.btn-primary, .btn-white');
    
    quoteButtons.forEach(button => {
        if (button.textContent.toLowerCase().includes('quote')) {
            button.addEventListener('click', function() {
                // Scroll to contact form
                const heroSection = document.querySelector('#home');
                if (heroSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = heroSection.offsetTop + 400; // Scroll to form area
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animation
    const animatedElements = document.querySelectorAll('.service-card, .process-card, .testimonial-card, .work-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderTopColor = '#00D4FF';
            this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderTopColor = '#00D4FF';
            this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.1)';
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const spans = heroTitle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Mobile menu toggle (for future mobile menu implementation)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuToggle.style.display = 'none';
    
    const headerContainer = document.querySelector('.header .container');
    headerContainer.appendChild(mobileMenuToggle);
    
    // Show mobile menu toggle on small screens
    function checkMobile() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'block';
        } else {
            mobileMenuToggle.style.display = 'none';
        }
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Quote Modal Functionality
    const quoteModal = document.getElementById('quoteModal');
    const closeModal = document.getElementById('closeModal');
    const quoteForm = document.getElementById('quoteForm');
    
    // Show modal on page load with a slight delay
    setTimeout(() => {
        if (quoteModal) {
            quoteModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }, 2000); // 2 second delay
    
    // Close modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            quoteModal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Close modal when clicking outside
    if (quoteModal) {
        quoteModal.addEventListener('click', function(e) {
            if (e.target === quoteModal) {
                quoteModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && quoteModal.classList.contains('show')) {
            quoteModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Handle form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const packageType = formData.get('package');
            const fullName = formData.get('fullName');
            const workEmail = formData.get('workEmail');
            const company = formData.get('company');
            const website = formData.get('website');
            const problem = formData.get('problem');
            const timeline = formData.get('timeline');
            const budget = formData.get('budget');
            
            // Simple validation
            if (!fullName || !workEmail || !company || !problem || !timeline || !budget) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you! We\'ll get back to you within 24 hours.', 'success');
            
            // Close modal after successful submission
            setTimeout(() => {
                quoteModal.classList.remove('show');
                document.body.style.overflow = '';
            }, 2000);
            
            // Reset form
            this.reset();
            
            // Reset package selection to Basic
            const basicPackage = this.querySelector('input[value="basic"]');
            if (basicPackage) {
                basicPackage.checked = true;
            }
        });
    }
    
    // Add click handlers for all "Get a Quote" buttons to open modal
    const allQuoteButtons = document.querySelectorAll('.btn-primary, .btn-white');
    allQuoteButtons.forEach(button => {
        if (button.textContent.toLowerCase().includes('quote')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                if (quoteModal) {
                    quoteModal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });
    
    // Package selection visual feedback
    const packageOptions = document.querySelectorAll('.package-option input[type="radio"]');
    packageOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Update info panels based on selection
            updateInfoPanels(this.value);
        });
    });
    
    function updateInfoPanels(packageType) {
        const timelinePanel = document.querySelector('.info-panel:last-child ul');
        if (timelinePanel) {
            const timelineItems = timelinePanel.querySelectorAll('li');
            
            timelineItems.forEach((item, index) => {
                if (packageType === 'basic' && index === 0) {
                    item.style.color = '#00D4FF';
                    item.style.fontWeight = '600';
                } else if (packageType === 'intermediate' && index === 1) {
                    item.style.color = '#00D4FF';
                    item.style.fontWeight = '600';
                } else if (packageType === 'advanced' && index === 2) {
                    item.style.color = '#00D4FF';
                    item.style.fontWeight = '600';
                } else {
                    item.style.color = '#B8C5D6';
                    item.style.fontWeight = '400';
                }
            });
        }
    }
    
    // Initialize info panels
    updateInfoPanels('basic');
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#00D4FF';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ff4757';
    } else {
        notification.style.backgroundColor = '#3742fa';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
    
    // Add counter animation to process numbers
    const processNumbers = document.querySelectorAll('.process-number');
    
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const finalNumber = number.textContent;
                let currentNumber = 0;
                
                const counter = setInterval(() => {
                    currentNumber++;
                    number.textContent = currentNumber;
                    
                    if (currentNumber >= parseInt(finalNumber)) {
                        clearInterval(counter);
                        number.textContent = finalNumber;
                    }
                }, 100);
                
                numberObserver.unobserve(number);
            }
        });
    }, { threshold: 0.5 });
    
    processNumbers.forEach(number => {
        numberObserver.observe(number);
    });
});
