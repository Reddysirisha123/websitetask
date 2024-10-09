// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Flashy effect: Animate the header text
    const header = document.querySelector('h1');
    if (header) {
        header.innerHTML = header.textContent.split('').map(char =>
            `<span style="display: inline-block">${char}</span>`
        ).join('');

        anime({
            targets: 'h1 span',
            translateY: [-20, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1500,
            delay: anime.stagger(100)
        });
    }

    // Interactive effect: Highlight current section in navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Add a subtle parallax effect to the background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxBg = document.querySelector('#particles-js');
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
});

// Function to initialize particles background
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#3498db' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#3498db', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
}

// Call initParticles when the window loads
window.addEventListener('load', initParticles);