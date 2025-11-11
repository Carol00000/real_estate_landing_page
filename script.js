function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const sectionTop = section.offsetTop;
        
        // Simple offset from top accounting for fixed header
        const scrollPosition = sectionTop - headerHeight - 20; // 20px extra padding
        
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }
}

const galleryPhotos = [
    {
        title: 'Luxury Mountain Estate',
        price: '$2,500,000',
        url:   'assets/13.webp'
    },
    {
        title: 'Modern Contemporary Home',
        price: '$1,800,000',
        url:   'assets/15.webp'
    },
    {
        title: 'Beachfront Paradise',
        price: '$3,200,000',
        url:   'assets/14.webp'
    },
    {
        title: 'Urban Penthouse',
        price: '$4,500,000',
        url:   'assets/22.webp'
    },
    {
        title: 'Country Estate',
        price: '$2,100,000',
        url:   'assets/19.webp'
    },
    {
        title: 'Luxury Villa',
        price: '$2,750,000',
        url:   'assets/20.webp'
    }
];

let currentSlide = 0;
let currentLightboxIndex = 0;

function initCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDots = document.getElementById('carouselDots');
    const carouselThumbnails = document.getElementById('carouselThumbnails');
    
    // MAIN CAROUSEL
    galleryPhotos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.onclick = () => openLightbox(index);
        item.innerHTML = `
            <img src="${photo.url}" alt="${photo.title}">
            <div class="carousel-overlay">
                <div class="carousel-overlay-icon">🔍</div>
            </div>
            <div class="carousel-info">
                <div class="carousel-info-title">${photo.title}</div>
                <div class="carousel-info-price">${photo.price}</div>
            </div>
        `;
        carouselTrack.appendChild(item);
    });
    
    // THUMBNAILS
    galleryPhotos.forEach((photo, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail-item ${index === 0 ? 'active' : ''}`;
        thumbnail.onclick = () => goToSlide(index);
        thumbnail.innerHTML = `
            <img src="${photo.url}" alt="${photo.title}">
            <div class="thumbnail-overlay">
                <div>${photo.title}</div>
            </div>
        `;
        carouselThumbnails.appendChild(thumbnail);
    });
    
    // DOTS
    galleryPhotos.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        carouselDots.appendChild(dot);
    });
}

function updateCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const items = document.querySelectorAll('.carousel-item');
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    
    if (items.length > 0) {
        const itemWidth = items[0].offsetWidth;
        carouselTrack.style.transform = `translateX(-${currentSlide * itemWidth}px)`;
    }
    
    // Update dots
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Update thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % galleryPhotos.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + galleryPhotos.length) % galleryPhotos.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function openLightbox(index) {
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const image = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');
    
    image.src = galleryPhotos[index].url;
    caption.textContent = `${galleryPhotos[index].title} - ${galleryPhotos[index].price}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function nextLightboxPhoto() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryPhotos.length;
    openLightbox(currentLightboxIndex);
}

function prevLightboxPhoto() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    openLightbox(currentLightboxIndex);
}

// Mobile menu toggle function (must be global for onclick)
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (nav && toggle) {
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
    }
}

// DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize carousel
    initCarousel();
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const nav = document.getElementById('mainNav');
                const toggle = document.querySelector('.mobile-menu-toggle');
                
                if (nav) nav.classList.remove('active');
                if (toggle) toggle.classList.remove('active');
            });
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // Active nav link based on scroll position
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    const onclick = link.getAttribute('onclick');
                    if (onclick && onclick.includes(sectionId)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeLightbox();
        }
        if (event.key === 'ArrowRight') {
            nextLightboxPhoto();
        }
        if (event.key === 'ArrowLeft') {
            prevLightboxPhoto();
        }
    });
    
});

// Update carousel on window resize
window.addEventListener('resize', updateCarousel);