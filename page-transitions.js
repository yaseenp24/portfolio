// Page Transition Handler
class PageTransition {
    constructor() {
        this.isTransitioning = false;
        this.init();
    }

    init() {
        // Add transition event listeners to all navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Only handle internal links (not external links)
                if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
                    e.preventDefault();
                    this.transitionToPage(href);
                }
            });
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.loadPage(e.state.page, false);
            }
        });

        // Add page load animation
        this.addPageLoadAnimation();
    }

    transitionToPage(url) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Add fade out animation to current page
        document.body.classList.add('page-transition');
        
        setTimeout(() => {
            this.loadPage(url, true);
        }, 300);
    }

    loadPage(url, updateHistory = true) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                // Parse the HTML
                const parser = new DOMParser();
                const newDoc = parser.parseFromString(html, 'text/html');
                
                // Sync stylesheets so page-specific CSS is applied
                const newStylesheetHrefs = Array.from(newDoc.querySelectorAll('link[rel="stylesheet"]'))
                    .map(link => link.getAttribute('href'))
                    .filter(Boolean);
                this.syncStylesheets(newStylesheetHrefs);

                // Extract the main content
                const newMain = newDoc.querySelector('main');
                const currentMain = document.querySelector('main');
                
                if (newMain && currentMain) {
                    // Replace the main content
                    currentMain.innerHTML = newMain.innerHTML;
                    
                    // Update the page title
                    const newTitle = newDoc.querySelector('title');
                    if (newTitle) {
                        document.title = newTitle.textContent;
                    }
                    
                    // Update active navigation state
                    this.updateActiveNav(url);
                    
                    // Update browser history
                    if (updateHistory) {
                        window.history.pushState({ page: url }, '', url);
                    }
                    
                    // Add page load animation
                    this.addPageLoadAnimation();
                    
                    // Reinitialize page-specific scripts
                    this.reinitializeScripts(url);
                }
            })
            .catch(error => {
                console.error('Error loading page:', error);
                // Fallback to normal navigation
                window.location.href = url;
            })
            .finally(() => {
                this.isTransitioning = false;
            });
    }

    // Ensure per-page styles (like resume-styles.css, work-styles.css) are loaded
    // when swapping content via AJAX, and remove styles no longer needed.
    syncStylesheets(newHrefs) {
        const head = document.head;
        const currentLinks = Array.from(head.querySelectorAll('link[rel="stylesheet"]'));
        const currentHrefs = currentLinks.map(l => l.getAttribute('href'));

        // Add any missing stylesheets from the target page
        newHrefs.forEach(href => {
            if (!currentHrefs.includes(href)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                link.setAttribute('data-dynamic-style', 'true');
                head.appendChild(link);
            }
        });

        // Remove previously added page-specific styles not required on the new page
        Array.from(head.querySelectorAll('link[rel="stylesheet"][data-dynamic-style="true"]'))
            .forEach(link => {
                const href = link.getAttribute('href');
                if (!newHrefs.includes(href)) {
                    head.removeChild(link);
                }
            });
    }

    updateActiveNav(url) {
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page link
        const currentLink = document.querySelector(`[href="${url}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
    }

    addPageLoadAnimation() {
        // Remove any existing animation classes
        document.body.classList.remove('page-transition', 'page-loading');
        
        // Add loading animation
        document.body.classList.add('page-loading');
        
        // Remove loading class after animation completes
        setTimeout(() => {
            document.body.classList.remove('page-loading');
        }, 600);
    }

    reinitializeScripts(url) {
        // Reinitialize page-specific functionality based on URL
        if (url.includes('resume.html')) {
            this.initResumeScripts();
        } else if (url.includes('work.html')) {
            this.initWorkScripts();
        } else if (url.includes('contact.html')) {
            this.initContactScripts();
        } else {
            this.initHomeScripts();
        }
    }

    initResumeScripts() {
        // Reinitialize resume page functionality
        const sidebarBtns = document.querySelectorAll('.sidebar-btn');
        const contentSections = document.querySelectorAll('.content-section');
        
        sidebarBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetSection = this.getAttribute('data-section');
                
                // Update active button
                sidebarBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Show target section
                contentSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetSection) {
                        section.classList.add('active');
                    }
                });
            });
        });
    }

    initWorkScripts() {
        // Reinitialize work page functionality
        const interfaces = ['chatbot-interface', 'fantasy-interface', 'portfolio-interface'];
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;

        function showInterface(index) {
            interfaces.forEach((id, i) => {
                const element = document.getElementById(id);
                if (element) {
                    element.style.display = i === index ? 'block' : 'none';
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + interfaces.length) % interfaces.length;
                showInterface(currentIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % interfaces.length;
                showInterface(currentIndex);
            });
        }
    }

    initContactScripts() {
        // Reinitialize contact page functionality
        const contactForm = document.querySelector('.contact-form');
        const submitBtn = document.querySelector('.submit-btn');

        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Show success message
                    showNotification('Message sent successfully!', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    submitBtn.disabled = false;
                }, 2000);
            });
        }

        // Form validation
        const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });
    }

    initHomeScripts() {
        // Reinitialize home page functionality
        const downloadBtn = document.querySelector('.download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function() {
                // Create a link element to trigger download
                const link = document.createElement('a');
                link.href = 'PatelYaseenResume.pdf';
                link.download = 'PatelYaseenResume.pdf';
                link.style.display = 'none';
                
                // Add to document and trigger download
                document.body.appendChild(link);
                link.click();
                
                // Clean up
                document.body.removeChild(link);
            });
        }
    }
}

// Notification system for contact form
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : '#ff6b6b'};
        color: ${type === 'success' ? '#0a0a0a' : '#ffffff'};
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Initialize page transitions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new PageTransition();
}); 