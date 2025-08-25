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

    // Lead form (hero) submission handling
    const leadForm = document.querySelector('.form-card form');
    
    if (leadForm) {
        leadForm.addEventListener('submit', async function(e) {
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
            try {
                const resp = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'lead', name, email, service, message })
                });
                const data = await resp.json();
                if (!resp.ok || !data.ok) throw new Error(data.error || 'Failed');
                showNotification('Thanks! We\'ll get back to you soon.', 'success');
                this.reset();
            } catch (err) {
                showNotification('Could not send. Please try again later.', 'error');
            }
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
    
    // Disable auto-opening of quote modal on page load
    
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
        quoteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const packageType = formData.get('package') || 'unspecified';
            const fullName = formData.get('fullName') || '';
            const workEmail = formData.get('workEmail') || '';
            const company = formData.get('company') || '';
            const website = formData.get('website') || '';
            const problem = formData.get('problem') || '';
            const timeline = formData.get('timeline') || '';
            const budget = formData.get('budget') || '';

            if (!fullName || !workEmail || !problem) {
                showNotification('Please complete name, email, and problem.', 'error');
                return;
            }
            try {
                const resp = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'quote', packageType, fullName, workEmail, company, website, problem, timeline, budget })
                });
                const data = await resp.json();
                if (!resp.ok || !data.ok) throw new Error(data.error || 'Failed');
                showNotification('Sent! We\'ll reply within 24 hours.', 'success');
                if (quoteModal) {
                    quoteModal.classList.remove('show');
                    document.body.style.overflow = '';
                }
                this.reset();
            } catch (err) {
                showNotification('Could not send. Please try again later.', 'error');
            }
        });
    }
    
    // Global: Any button/link mentioning quote or contact opens Contact modal
    function attachGlobalContactOpeners() {
        const candidates = document.querySelectorAll('a, button');
        candidates.forEach(el => {
            const text = (el.textContent || '').toLowerCase();
            if (text.includes('quote') || text.includes('contact')) {
                el.addEventListener('click', function(e) {
                    e.preventDefault();
                    openContact();
                });
            }
        });
    }
    attachGlobalContactOpeners();
    
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

    // Contact Modal Functionality (shared across pages)
    const contactModal = document.getElementById('contactModal');
    const contactClose = document.getElementById('contactClose');
    const contactBack = document.getElementById('contactBack');
    const contactForm = document.getElementById('contactForm');

    function openContact() {
        if (!contactModal) return;
        // Ensure quote modal is closed if it was auto-opened elsewhere
        if (quoteModal && quoteModal.classList && quoteModal.classList.contains('show')) {
            quoteModal.classList.remove('show');
        }
        contactModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    function closeContact() {
        if (!contactModal) return;
        contactModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Openers
    const contactOpeners = document.querySelectorAll('[data-open-contact]');
    contactOpeners.forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            openContact();
        });
    });

    // Close handlers
    if (contactClose) contactClose.addEventListener('click', function(e){ e.preventDefault(); closeContact(); });
    if (contactBack) contactBack.addEventListener('click', function(e){ e.preventDefault(); closeContact(); });
    if (contactModal) {
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) closeContact();
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal && contactModal.classList.contains('show')) {
            closeContact();
        }
    });

    // Basic contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const fullName = formData.get('fullName') || '';
            const email = formData.get('email') || '';
            const company = formData.get('company') || '';
            const phone = formData.get('phone') || '';
            const topic = formData.get('topic') || 'project';
            const message = formData.get('message') || '';
            if (!fullName || !email || !message) {
                showNotification('Please complete name, email, and message.', 'error');
                return;
            }
            try {
                const resp = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'contact', fullName, email, company, phone, topic, message })
                });
                const data = await resp.json();
                if (!resp.ok || !data.ok) throw new Error(data.error || 'Failed');
                showNotification('Thanks! We\'ll get back within one business day.', 'success');
                closeContact();
                contactForm.reset();
            } catch (err) {
                showNotification('Could not send. Please try again later.', 'error');
            }
        });
    }
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

    // Recent Work: click/keyboard to open embedded links
    const workItems = document.querySelectorAll('.work-item[data-link]');
    function openWorkLink(el){
        const url = el.getAttribute('data-link');
        if (url) window.open(url, '_blank', 'noopener');
    }
    workItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => openWorkLink(item));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openWorkLink(item);
            }
        });
    });
});
