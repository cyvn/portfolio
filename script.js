
document.addEventListener('DOMContentLoaded', function() {
    // Particle system initialization
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 10);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.2 - 0.1;
            this.speedY = Math.random() * 0.2 - 0.1;
            this.opacity = Math.random() * 0.2 + 0.05;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();
    
    // Initialize ambient audio
    const ambientAudio = document.getElementById('ambientAudio');
// Function to handle audio play with user interaction
    function enableAudio() {
        ambientAudio.volume = 0.3;
        ambientAudio.play().catch(e => console.log('Audio play failed:', e));
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('touchstart', enableAudio);
    }
    
    // Wait for user interaction before playing audio
    document.addEventListener('click', enableAudio);
    document.addEventListener('touchstart', enableAudio);
    
    // Ambient animation initialization
    gsap.to(".ambient-shape-1", {
        x: 100,
        y: 100,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    gsap.to(".ambient-shape-2", {
        x: -100,
        y: -100,
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // Mouse move parallax effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        gsap.to("main", {
            x: (x - 0.5) * 10,
            y: (y - 0.5) * 10,
            duration: 2,
            ease: "power1.out"
        });
    });
});
