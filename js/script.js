        // Animasi Loading dan Masuk Website
        window.addEventListener('load', function() {
            // Hilangkan preloader setelah 1.5 detik
            setTimeout(function() {
                document.querySelector('.preloader').classList.add('fade-out');

                // Baru kemudian tunjukkan konten utama
                setTimeout(function() {
                    document.body.style.overflow = 'auto'; // Aktifkan scrolling
                    // Aktifkan animasi reveal pada elemen yang terlihat
                    revealElements();
                }, 500);
            }, 300);
        });
        
        document.body.style.overflow = 'auto';
        
        // Mobile Menu Toggle
        document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                document.querySelector('.nav-links').classList.remove('active');
            });
        });
        
        // Active link highlight
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });

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
                
                // Titik trigger animasi (elemen muncul ketika elemen berada 150px dari bawah viewport)
                const revealPoint = 150;
                
                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                } else {
                    //
                    //element.classList.remove('active');
                }
            });
        }
        
        // Tambahkan smooth scroll behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset untuk header
                        behavior: 'smooth'
                    });
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
        "I'm a Machine Learning Engineer",
        "I'm a Backend Developer",
        "I'm a Software Engineer",
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



