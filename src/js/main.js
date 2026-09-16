const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

const setNavbarState = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
};

const setActiveLink = () => {
    const navBottom = navbar.getBoundingClientRect().bottom;
    const pageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    let activeSection = sections[0];

    if (pageBottom) {
        activeSection = sections[sections.length - 1];
    } else {
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= navBottom + 8) {
                activeSection = section;
            }
        });
    }

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${activeSection.id}`);
    });
};

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

window.addEventListener('scroll', () => {
    setNavbarState();
    setActiveLink();
});

window.addEventListener('resize', setActiveLink);

setNavbarState();
setActiveLink();

const carouselTrack = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.slide'));
const previousButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');
const dotsContainer = document.querySelector('.carousel-dots');
let currentSlide = 0;

const updateCarousel = () => {
    carouselTrack.classList.remove('show-slide-0', 'show-slide-1', 'show-slide-2', 'show-slide-3');
    carouselTrack.classList.add(`show-slide-${currentSlide}`);
    Array.from(dotsContainer.children).forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
        dot.setAttribute('aria-current', index === currentSlide ? 'true' : 'false');
    });
};

slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show slide ${index + 1}`);
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
    dotsContainer.appendChild(dot);
});

previousButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
});

updateCarousel();

const openModal = (modal) => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const closeButton = modal.querySelector('.modal-close');
    closeButton.focus();
};

const closeModal = (modal) => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
};

document.querySelectorAll('.modal-trigger').forEach((button) => {
    button.addEventListener('click', () => {
        const modal = document.getElementById(button.dataset.modalTarget);
        if (modal) {
            openModal(modal);
        }
    });
});

document.querySelectorAll('[data-modal-close]').forEach((button) => {
    button.addEventListener('click', () => {
        closeModal(button.closest('.modal'));
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
        return;
    }

    const openDialog = document.querySelector('.modal.open');
    if (openDialog) {
        closeModal(openDialog);
    }
});

const profileVideo = document.querySelector('.profile-video');
if (profileVideo) {
    const source = document.createElement('source');
    source.src = 'assets/climb.mp4';
    source.type = 'video/mp4';
    profileVideo.prepend(source);
}
