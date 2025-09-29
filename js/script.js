// Animasi Loading dan Masuk Website
window.addEventListener('load', function () {
    // Hilangkan preloader setelah 1.5 detik
    setTimeout(function () {
        document.querySelector('.preloader').classList.add('fade-out');

        // Baru kemudian tunjukkan konten utama
        setTimeout(function () {
            document.body.style.overflow = 'auto'; // Aktifkan scrolling
            // Aktifkan animasi reveal pada elemen yang terlihat
            revealElements();

            // Immediately show elements in viewport
            const immediateReveals = document.querySelectorAll('.reveal');
            immediateReveals.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    element.classList.add('active');
                }
            });
        }, 500);
    }, 300);
});

document.body.style.overflow = 'auto';

// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelector('.nav-links').classList.remove('active');

        // Set active state immediately on click dan prevent scroll detection
        isScrolling = true;
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');

        // Clear previous timeout
        if (clickTimeout) {
            clearTimeout(clickTimeout);
        }

        // Re-enable scroll detection after smooth scroll completes
        clickTimeout = setTimeout(() => {
            isScrolling = false;
        }, 1000);
    });
});

// Active link highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
let isScrolling = false;
let clickTimeout = null;

let scrollTimeout;
window.addEventListener('scroll', () => {
    // Skip scroll detection if user just clicked a nav link
    if (isScrolling) return;

    // Debounce scroll events
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Offset untuk header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Cek apakah posisi scroll berada dalam range section ini
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        // Fallback: jika tidak ada section yang terdeteksi, set ke section pertama
        if (!current && sections.length > 0) {
            current = sections[0].getAttribute('id');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }, 10); // Small debounce delay

    revealElements(); // opsional jika kamu punya animasi scroll
});



// Fungsi untuk animasi scroll reveal
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        // Posisi elemen relatif terhadap viewport
        const elementTop = element.getBoundingClientRect().top;

        // Viewport height
        const windowHeight = window.innerHeight;

        // Titik trigger animasi yang lebih agresif untuk konten yang langsung terlihat
        const revealPoint = windowHeight * 0.8; // 80% dari viewport height

        if (elementTop < revealPoint) {
            element.classList.add('active');
        }
    });
}

// Tambahkan smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Calculate proper offset
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Immediately reveal target section elements
            setTimeout(() => {
                const targetReveals = targetElement.querySelectorAll('.reveal');
                targetReveals.forEach(element => {
                    element.classList.add('active');
                });
                // Also reveal the target element itself if it has reveal class
                if (targetElement.classList.contains('reveal')) {
                    targetElement.classList.add('active');
                }
            }, 100);
        }
    });
});

const contactForm = document.getElementById("formKontak");
const loader = document.querySelector(".loader");


contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    loader.style.display = "block";
    const url = e.target.action;
    const formData = new FormData(contactForm);

    fetch(url, {
        method: "POST",
        body: formData,
        mode: "no-cors",
    })
        .then(() => {
            loader.style.display = "none";
            Swal.fire({
                title: 'Terima Kasih!',
                text: 'Email Anda telah berhasil dikirim.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#333333'
            }).then(() => {
                window.location.href = "index.html";
            });
        })
        .catch((e) => {
            loader.style.display = "none";
            Swal.fire({
                title: 'Error',
                text: 'Terjadi kesalahan saat mengirim email.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#333333'
            });
        });
});

const textList = [
    "I'm a Data Scientist",
    "I'm a Data Analyst",
    "I'm a Machine Learning Engineer",
    "I'm a Backend Developer",
    "I'm a Web Developer",
];

let index = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;
const typingElement = document.getElementById("typing");

function type() {
    if (index >= textList.length) index = 0;
    currentText = textList[index];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex--);
    } else {
        typingElement.textContent = currentText.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 1000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index++;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

document.addEventListener("DOMContentLoaded", type);



