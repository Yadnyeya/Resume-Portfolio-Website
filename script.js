// script.js

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // --- Navbar Shrink Function ---
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);


    // --- Activate Bootstrap scrollspy on the main nav element ---
    const mainNav = document.body.querySelector('#mainNav');
    // Define the offset based on the navbar height + a little extra padding
    const scrollSpyOffset = 90; // Increased offset slightly more
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav', // The navigation element containing the links
            offset: scrollSpyOffset, // Use the defined offset
        });
    };

    // --- Collapse responsive navbar when toggler is visible ---
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // --- Smooth Scrolling for internal links ---
    // Define the offset for smooth scrolling (should match or be close to ScrollSpy offset)
    const smoothScrollOffset = 85; // Adjusted offset slightly less than scrollspy
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.pathname === window.location.pathname &&
            anchor.hostname === window.location.hostname) {

            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                var hash = this.hash;
                var targetElement = document.querySelector(hash);

                if (targetElement) {
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    // Use the defined offset for calculation
                    const offsetPosition = elementPosition + window.pageYOffset - smoothScrollOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            });
        }
    });


    // --- Fade-in Animation on Scroll ---
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Optional: uncomment to animate only once
            } else {
                // entry.target.classList.remove('visible'); // Optional: uncomment to re-animate
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

}); // End of DOMContentLoaded listener
