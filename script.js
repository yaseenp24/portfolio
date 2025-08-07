// Smooth scrolling for navigation links
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

// Navigation highlighting based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Download resume button functionality
document.querySelector('.download-btn').addEventListener('click', function() {
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

// Hire me button functionality
document.querySelector('.hire-btn').addEventListener('click', function() {
    // Scroll to contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Social media links functionality - allow real links to work
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // If it's a real link with href, let it work naturally
        if (this.href && this.href !== '#') {
            return; // Let the link work normally
        }
        
        // For placeholder links, show alerts
        e.preventDefault();
        const platform = this.querySelector('i').classList[1].split('-')[1];
        alert(`${platform} link would open here`);
    });
});

// Add some animation on page load
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.title, .description, .cta-section, .profile-image');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Parallax effect for decorative circle
window.addEventListener('scroll', () => {
    const circle = document.querySelector('.decorative-circle');
    if (circle) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        circle.style.transform = `rotate(${rate}deg)`;
    }
});

// Add hover effects for profile image
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.addEventListener('mouseenter', () => {
        profileImage.style.transform = 'scale(1.05)';
        profileImage.style.transition = 'transform 0.3s ease';
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = 'scale(1)';
    });
}

// Statistics counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 30);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    observer.observe(statsContainer);
} 