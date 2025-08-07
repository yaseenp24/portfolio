// Resume page functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebarBtns = document.querySelectorAll('.sidebar-btn');
    const contentSections = document.querySelectorAll('.content-section');

    // Function to switch sections
    function switchSection(sectionId) {
        // Remove active class from all buttons and sections
        sidebarBtns.forEach(btn => btn.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));

        // Add active class to clicked button
        const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Show corresponding section
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    }

    // Add click event listeners to sidebar buttons
    sidebarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            switchSection(sectionId);
        });
    });

    // Initialize with Experience section active
    switchSection('experience');
});

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

// Hire me button functionality
document.querySelector('.hire-btn').addEventListener('click', function() {
    // You can replace this with actual contact functionality
    alert('Contact functionality would be implemented here');
});

// Add some animation on page load
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.sidebar-btn, .experience-card, .skill-category');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add hover effects for experience cards
document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Add hover effects for skill items
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'scale(1.05)';
        skill.style.transition = 'transform 0.3s ease';
    });
    
    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'scale(1)';
    });
}); 