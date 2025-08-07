// Work page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Project data array
    const projects = [
        {
            id: 1,
            number: '01',
            title: 'Full-Stack AI Project',
            description: 'Created a full-stack AI Customer Support Chatbot that responds to all types of messages and inquires. Leverages OpenAI\'s API to provide intuitive responses. Project delivered using an AWS EC2 instance.',
            technologies: ['Next.js', 'React', 'OpenAI', 'AWS EC2'],
            visual: 'chatbot',
            github: 'https://github.com/yaseenp24/AI-chatbot',
            demo: '#'
        },
        {
            id: 2,
            number: '02',
            title: 'UFA Fantasy App',
            description: 'Designed and developed a Fantasy Football App that allows users to track stats for a local 80-player league (UFA). Used React for the frontend, Flask and MySQL for the backend, and hand-coded responsive layouts with HTML and CSS.',
            technologies: ['Python', 'HTML', 'CSS', 'SQL', 'Flask', 'React'],
            visual: 'fantasy',
            github: 'https://github.com/yaseenp24/Fantasy_Football_App',
            demo: 'https://fantasy-football-app-rho.vercel.app'
        },
        {
            id: 3,
            number: '03',
            title: 'Portfolio Website',
            description: 'A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features dark theme with green accents, smooth animations, and professional layout.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
            visual: 'portfolio',
            github: '#',
            demo: '#'
        }
    ];

    let currentProjectIndex = 0;

    // DOM elements
    const projectNumber = document.querySelector('.project-number');
    const projectTitle = document.querySelector('.project-title');
    const projectDescription = document.querySelector('.project-description');
    const projectTech = document.querySelector('.project-tech');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Function to update project display
    function updateProject(index) {
        const project = projects[index];
        
        // Animate out
        document.querySelector('.project-details').style.opacity = '0';
        document.querySelector('.project-details').style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            // Update content
            projectNumber.textContent = project.number;
            projectTitle.textContent = project.title;
            projectDescription.textContent = project.description;
            
            // Update technologies
            projectTech.innerHTML = '';
            project.technologies.forEach(tech => {
                const techItem = document.createElement('span');
                techItem.className = 'tech-item';
                techItem.textContent = tech;
                projectTech.appendChild(techItem);
            });
            
            // Update visual interface
            updateVisualInterface(project.visual);
            
            // Update action buttons
            updateActionButtons(project);
            
            // Animate in
            document.querySelector('.project-details').style.opacity = '1';
            document.querySelector('.project-details').style.transform = 'translateX(0)';
        }, 300);
    }
    
    // Function to update visual interface
    function updateVisualInterface(visualType) {
        // Hide all interfaces
        document.getElementById('chatbot-interface').style.display = 'none';
        document.getElementById('fantasy-interface').style.display = 'none';
        document.getElementById('portfolio-interface').style.display = 'none';
        
        // Show the appropriate interface
        switch(visualType) {
            case 'chatbot':
                document.getElementById('chatbot-interface').style.display = 'block';
                break;
            case 'fantasy':
                document.getElementById('fantasy-interface').style.display = 'block';
                break;
            case 'portfolio':
                document.getElementById('portfolio-interface').style.display = 'block';
                break;
        }
    }
    
    // Function to update action buttons
    function updateActionButtons(project) {
        const demoBtn = document.querySelector('.action-btn[title="Live Demo"]');
        const githubBtn = document.querySelector('.action-btn[title="GitHub Repository"]');
        
        if (demoBtn) {
            demoBtn.href = project.demo;
            demoBtn.title = project.demo !== '#' ? 'Live Demo' : 'Demo Coming Soon';
        }
        
        if (githubBtn) {
            githubBtn.href = project.github;
            githubBtn.title = project.github !== '#' ? 'GitHub Repository' : 'Repository Private';
        }
    }

    // Navigation button event listeners
    prevBtn.addEventListener('click', function() {
        currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
        updateProject(currentProjectIndex);
    });

    nextBtn.addEventListener('click', function() {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        updateProject(currentProjectIndex);
    });

    // Action button functionality
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // If it's already an anchor tag with href, let it work naturally
            if (this.tagName === 'A' && this.href && this.href !== '#') {
                return; // Let the link work normally
            }
            
            // For buttons without href, show alerts
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-external-link-alt')) {
                // Live project link
                alert('Live project link would be implemented here');
            } else if (icon.classList.contains('fa-github')) {
                // GitHub link
                alert('GitHub repository link would be implemented here');
            }
        });
    });

    // Hire me button functionality
    document.querySelector('.hire-btn').addEventListener('click', function() {
        alert('Contact functionality would be implemented here');
    });

    // Chat input functionality
    const messageInput = document.querySelector('.message-input');
    const sendBtn = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'agent'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendBtn.addEventListener('click', function() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, true);
            messageInput.value = '';
            
            // Simulate AI response
            setTimeout(() => {
                addMessage('Thank you for your message! This is a demo interface.');
            }, 1000);
        }
    });

    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });

    // Page load animations
    window.addEventListener('load', () => {
        const elements = document.querySelectorAll('.project-details, .project-visual, .project-nav');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Add hover effects for action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add hover effects for navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1)';
            btn.style.boxShadow = '0 5px 15px rgba(0, 255, 136, 0.3)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = 'none';
        });
    });
}); 