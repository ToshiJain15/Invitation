// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.visibility = 'hidden';
    }, 500);
});

// Open Invitation Scroll
function openInvitation() {
    const overlay = document.getElementById('intro-overlay');
    overlay.classList.add('open');
    
    // Play music automatically when opened if possible
    const music = document.getElementById('bg-music');
    if(music) {
        music.play().catch(e => console.log('Audio autoplay blocked'));
        document.getElementById('music-icon').classList.remove('fa-music');
        document.getElementById('music-icon').classList.add('fa-volume-up');
    }
    
    setTimeout(() => {
        overlay.style.display = 'none';
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        createPetals(); // Start petals after opening
    }, 1500);
}

// Music Toggle
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const icon = document.getElementById('music-icon');
    
    if (music.paused) {
        music.play();
        icon.classList.remove('fa-music', 'fa-volume-mute');
        icon.classList.add('fa-volume-up');
    } else {
        music.pause();
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    }
}

// Falling Petals
function createPetals() {
    const petalsContainer = document.getElementById('petals-container');
    if(!petalsContainer) return;
    
    const colors = ['#e7525b', '#ffb6c1', '#cdb071']; // Rose, Pink, Gold
    
    setInterval(() => {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Randomize properties
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        petal.style.animationDuration = Math.random() * 3 + 5 + 's'; // 5 to 8 seconds
        petal.style.opacity = Math.random() * 0.5 + 0.3; // 0.3 to 0.8
        
        petalsContainer.appendChild(petal);
        
        // Remove petal after animation
        setTimeout(() => {
            petal.remove();
        }, 8000);
    }, 800); // New petal every 800ms
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Countdown Timer
const weddingDate = new Date('December 21, 2026 10:00:00').getTime();

const updateTimer = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById('timer').innerHTML = "<h3>The Celebration has Begun!</h3>";
    }
};

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();

// RSVP Form Submission (Mockup)
const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(rsvpForm);
        const name = formData.get('name');
        
        // In a real app, you'd send this to the server
        alert(`Thank you, ${name}! Your RSVP has been received.`);
        rsvpForm.reset();
    });
}

// Sparkle Effect for Gold Text
function createSparkle() {
    const goldText = document.querySelectorAll('.main-title, .sub-title, .section-title, .text-gold');
    
    goldText.forEach(el => {
        if (Math.random() > 0.8) { // Only sparkle occasionally
            const sparkle = document.createElement('span');
            sparkle.classList.add('sparkle');
            
            // Random position within the element
            const rect = el.getBoundingClientRect();
            const top = Math.random() * rect.height;
            const left = Math.random() * rect.width;
            
            sparkle.style.top = top + 'px';
            sparkle.style.left = left + 'px';
            
            el.style.position = 'relative';
            el.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    });
}

setInterval(createSparkle, 500);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
