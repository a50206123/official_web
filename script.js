/**
 * APEX Consulting & Firm Website
 * Core JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. Dark Mode / Light Mode Toggle
    // ==========================================================================
    const themeToggleBtn = document.getElementById('themeToggle');
    const bodyElement = document.body;

    // Check saved theme or user system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        bodyElement.classList.add('dark-theme');
    } else {
        bodyElement.classList.remove('dark-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        bodyElement.classList.toggle('dark-theme');
        
        // Save current choice in local storage
        if (bodyElement.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // ==========================================================================
    // 2. Navigation Scroll Effect (Sticky Header)
    // ==========================================================================
    const header = document.getElementById('home');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run on load in case page is refreshed halfway down

    // ==========================================================================
    // 3. Mobile Navigation Menu Toggle
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        mobileMenuBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
        // Prevent body scroll when menu is open on mobile
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // ==========================================================================
    // 4. FAQ Accordion Functionality
    // ==========================================================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all open FAQ items first for accordion behavior
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });

            // If the clicked item wasn't active, open it
            if (!isActive) {
                faqItem.classList.add('active');
                const answer = faqItem.querySelector('.faq-answer');
                // Set max-height to its scrollHeight dynamically
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ==========================================================================
    // 5. Consultation Notion Link Actions (If any future tracking is needed)
    // ==========================================================================
    // Direct link to Notion form is handled natively by HTML anchor elements.

    // ==========================================================================
    // 6. Intersection Observer for Scroll-Reveal Animations
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Once animate is done, unobserve the element
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12, // Trigger when 12% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point slightly above screen bottom
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});
