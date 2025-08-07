# Personal Portfolio Website

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript. This website features a dark theme with vibrant green accents, matching the design shown in the reference image.

## Features

- **Modern Design**: Dark theme with green accents (#00ff88)
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth animations and hover effects
- **Professional Navigation**: Fixed header with smooth scrolling
- **Statistics Section**: Animated counters for projects, technologies, and commits
- **Social Media Integration**: Links for GitHub, LinkedIn, and Instagram
- **Download Resume**: Button for resume download functionality

## File Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization Guide

### 1. Personal Information
Edit the following in `index.html`:
- Name: Change "Ibrahim Israr" to your name
- Role: Update "Software Engineer" to your profession
- Description: Modify the about me text
- Statistics: Update the numbers in the footer section

### 2. Profile Picture
Replace the placeholder image URL in `index.html`:
```html
<img src="your-image-url.jpg" alt="Your Name">
```

### 3. Social Media Links
Update the social media links in `index.html`:
```html
<a href="your-github-url" class="social-link">
    <i class="fab fa-github"></i>
</a>
<a href="your-linkedin-url" class="social-link">
    <i class="fab fa-linkedin-in"></i>
</a>
<a href="your-instagram-url" class="social-link">
    <i class="fab fa-instagram"></i>
</a>
```

### 4. Colors
To change the color scheme, modify the CSS variables in `styles.css`:
- Primary green: `#00ff88`
- Background: `#0a0a0a`
- Text: `#ffffff`

### 5. Resume Download
Implement actual resume download functionality in `script.js`:
```javascript
document.querySelector('.download-btn').addEventListener('click', function() {
    // Add your resume download logic here
    window.open('path-to-your-resume.pdf', '_blank');
});
```

## How to Use

1. **Open the website**: Double-click `index.html` or open it in a web browser
2. **Local development**: Use a local server for better development experience
3. **Deploy**: Upload all files to your web hosting service

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Features

- Optimized CSS with efficient selectors
- Smooth animations using CSS transitions
- Lazy loading for better performance
- Responsive images
- Minimal JavaScript for fast loading

## Future Enhancements

- Add more sections (About, Skills, Projects, Contact)
- Implement a contact form
- Add a blog section
- Integrate with a CMS
- Add dark/light theme toggle
- Implement portfolio project showcase

## Credits

- Fonts: Inter (Google Fonts)
- Icons: Font Awesome
- Placeholder Image: Unsplash

## License

This project is open source and available under the MIT License.

---

**Note**: This is a static website. For dynamic features like contact forms, you'll need to integrate with a backend service or use services like Netlify Forms, Formspree, or similar. 