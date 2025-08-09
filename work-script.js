// Work page functionality
(function() {
    function initWorkPage() {
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
        const projectDetails = document.querySelector('.project-details');
        const projectNumber = document.querySelector('.project-number');
        const projectTitle = document.querySelector('.project-title');
        const projectDescription = document.querySelector('.project-description');
        const projectTech = document.querySelector('.project-tech');

        // Replace existing listeners by cloning buttons to avoid duplicates across re-inits
        let prevBtn = document.querySelector('.prev-btn');
        let nextBtn = document.querySelector('.next-btn');
        if (prevBtn) {
            const clone = prevBtn.cloneNode(true);
            prevBtn.replaceWith(clone);
            prevBtn = clone;
        }
        if (nextBtn) {
            const clone = nextBtn.cloneNode(true);
            nextBtn.replaceWith(clone);
            nextBtn = clone;
        }

        function updateVisualInterface(visualType) {
            // Hide all interfaces
            const ids = ['chatbot-interface', 'fantasy-interface', 'portfolio-interface'];
            ids.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });

            // Show the appropriate interface
            switch(visualType) {
                case 'chatbot': {
                    const el = document.getElementById('chatbot-interface');
                    if (el) el.style.display = 'block';
                    break;
                }
                case 'fantasy': {
                    const el = document.getElementById('fantasy-interface');
                    if (el) el.style.display = 'block';
                    break;
                }
                case 'portfolio': {
                    const el = document.getElementById('portfolio-interface');
                    if (el) el.style.display = 'block';
                    break;
                }
            }
        }

        function updateActionButtons(project) {
            const actionBtns = document.querySelectorAll('.project-actions .action-btn');
            if (actionBtns.length >= 2) {
                const liveBtn = actionBtns[0];
                const ghBtn = actionBtns[1];
                if (liveBtn && liveBtn.tagName === 'A') {
                    liveBtn.href = project.demo;
                    liveBtn.title = project.demo !== '#' ? 'Live Demo' : 'Demo Coming Soon';
                }
                if (ghBtn && ghBtn.tagName === 'A') {
                    ghBtn.href = project.github;
                    ghBtn.title = project.github !== '#' ? 'GitHub Repository' : 'Repository Private';
                }
            }
        }

        function updateProject(index) {
            const project = projects[index];
            if (!project || !projectDetails) return;

            projectDetails.style.opacity = '0';
            projectDetails.style.transform = 'translateX(-20px)';

            setTimeout(() => {
                projectNumber.textContent = project.number;
                projectTitle.textContent = project.title;
                projectDescription.textContent = project.description;

                projectTech.innerHTML = '';
                project.technologies.forEach(tech => {
                    const techItem = document.createElement('span');
                    techItem.className = 'tech-item';
                    techItem.textContent = tech;
                    projectTech.appendChild(techItem);
                });

                updateVisualInterface(project.visual);
                updateActionButtons(project);

                projectDetails.style.opacity = '1';
                projectDetails.style.transform = 'translateX(0)';

                currentProjectIndex = index;
            }, 200);
        }

        // Navigation button event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
                updateProject(currentProjectIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentProjectIndex = (currentProjectIndex + 1) % projects.length;
                updateProject(currentProjectIndex);
            });
        }

        // Action button functionality
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.tagName === 'A' && this.href && this.href !== '#') {
                    return;
                }
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-external-link-alt')) {
                    alert('Live project link would be implemented here');
                } else if (icon.classList.contains('fa-github')) {
                    alert('GitHub repository link would be implemented here');
                }
            });
        });

        // Hire me button functionality
        const hireBtn = document.querySelector('.hire-btn');
        if (hireBtn) {
            hireBtn.addEventListener('click', function() {
                alert('Contact functionality would be implemented here');
            });
        }

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
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        if (sendBtn && messageInput) {
            sendBtn.addEventListener('click', function() {
                const message = messageInput.value.trim();
                if (message) {
                    addMessage(message, true);
                    messageInput.value = '';
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
        }

        // Page load animations (safe to run each time)
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

        // Hover effects for action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px) scale(1.05)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Hover effects for navigation buttons
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

        // Initialize view
        updateProject(currentProjectIndex);
    }

    // Expose and auto-run depending on load state
    window.initWorkPage = initWorkPage;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWorkPage);
    } else {
        // If script is included on an already loaded document (direct open of work.html), run immediately
        initWorkPage();
    }
})(); 