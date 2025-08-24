// Process Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all process navigation items and phase sections
    const navItems = document.querySelectorAll('.process-nav-item');
    const phaseSections = document.querySelectorAll('.phase-section');
    
    // Function to show a specific phase
    function showPhase(phaseNumber) {
        // Hide all phase sections
        phaseSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav items
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Show the selected phase
        const targetSection = document.getElementById(`phase${phaseNumber}`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Activate the corresponding nav item
        const targetNavItem = document.querySelector(`[data-phase="${phaseNumber}"]`);
        if (targetNavItem) {
            targetNavItem.classList.add('active');
        }
    }
    
    // Add click event listeners to navigation items
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const phaseNumber = this.getAttribute('data-phase');
            showPhase(phaseNumber);
            
            // Smooth scroll to the process details section on mobile
            if (window.innerWidth <= 768) {
                const processDetails = document.querySelector('.process-details');
                if (processDetails) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = processDetails.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Handle URL hash changes for direct linking
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash) {
            const phaseNumber = hash.replace('#phase', '');
            if (phaseNumber && !isNaN(phaseNumber)) {
                showPhase(phaseNumber);
            }
        }
    }
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Handle initial hash on page load
    handleHashChange();
    
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#phase')) {
                return; // Let the process navigation handle this
            }
            
            e.preventDefault();
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to phase sections when they become visible
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const phaseObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all phase sections for animation
    phaseSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        phaseObserver.observe(section);
    });
    
    // Add hover effects to process navigation items
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(5px) scale(1.02)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(0) scale(1)';
            }
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        const currentActive = document.querySelector('.process-nav-item.active');
        if (!currentActive) return;
        
        const currentPhase = parseInt(currentActive.getAttribute('data-phase'));
        let nextPhase = currentPhase;
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            nextPhase = Math.min(5, currentPhase + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            nextPhase = Math.max(1, currentPhase - 1);
        }
        
        if (nextPhase !== currentPhase) {
            showPhase(nextPhase);
            // Update URL hash
            window.location.hash = `#phase${nextPhase}`;
        }
    });
    
    // Add progress indicator
    function updateProgressIndicator() {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }
    }
    
    // Create progress bar if it doesn't exist
    if (!document.querySelector('.progress-bar')) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = '<div class="progress-bar"></div>';
        document.body.appendChild(progressContainer);
        
        // Add progress bar styles
        const style = document.createElement('style');
        style.textContent = `
            .progress-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(255, 255, 255, 0.1);
                z-index: 1001;
            }
            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #00D4FF, #0099CC);
                width: 0%;
                transition: width 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Update progress on scroll
    window.addEventListener('scroll', updateProgressIndicator);
    
    // Initialize progress bar
    updateProgressIndicator();
    
    // Add smooth reveal animation for metrics tables
    const metricsTables = document.querySelectorAll('.metrics-table');
    metricsTables.forEach(table => {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });
        
        table.style.opacity = '0';
        table.style.transform = 'translateY(20px)';
        table.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(table);
    });
    
    // Add click handlers for action buttons
    const downloadBtn = document.querySelector('.process-actions .btn-white');
    const bookCallBtn = document.querySelector('.process-actions .btn-primary');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Simulate download action
            showNotification('Sample SOW download started!', 'success');
        });
    }
    
    if (bookCallBtn) {
        bookCallBtn.addEventListener('click', function() {
            // Scroll to contact form or show booking modal
            showNotification('Redirecting to calendar...', 'info');
        });
    }
    
    // Add smooth transitions between phases
    function addPhaseTransitions() {
        phaseSections.forEach(section => {
            section.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });
    }
    
    addPhaseTransitions();
    
    // Add mobile touch support for process navigation
    let touchStartX = 0;
    let touchEndX = 0;
    
    const processDetails = document.querySelector('.process-details');
    if (processDetails && window.innerWidth <= 768) {
        processDetails.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        processDetails.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const currentActive = document.querySelector('.process-nav-item.active');
        if (!currentActive) return;
        
        const currentPhase = parseInt(currentActive.getAttribute('data-phase'));
        let nextPhase = currentPhase;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next phase
            nextPhase = Math.min(5, currentPhase + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous phase
            nextPhase = Math.max(1, currentPhase - 1);
        }
        
        if (nextPhase !== currentPhase) {
            showPhase(nextPhase);
            window.location.hash = `#phase${nextPhase}`;
        }
    }
});

// Notification system (reused from main script)
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
