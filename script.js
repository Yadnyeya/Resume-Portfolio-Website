// script.js

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // --- Navbar Shrink Function ---
    // Adds/removes a class to the navbar when scrolling
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        // Exit if navbar element doesn't exist
        if (!navbarCollapsible) {
            return;
        }
        // If page is scrolled to the top
        if (window.scrollY === 0) {
            // Remove the 'navbar-shrink' class (optional: define styles for this class in CSS)
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            // Add the 'navbar-shrink' class when scrolled down
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Call the function initially to set the state on page load
    navbarShrink();

    // Add a scroll event listener to call the function whenever the user scrolls
    document.addEventListener('scroll', navbarShrink);


    // --- Activate Bootstrap scrollspy on the main nav element ---
    // Highlights the nav link corresponding to the currently viewed section
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        // Initialize Bootstrap ScrollSpy
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav', // The navigation element containing the links
            offset: 74,       // Pixels to offset from top when calculating position (adjust based on navbar height and desired trigger point)
        });
    };

    // --- Collapse responsive navbar when a nav link is clicked ---
    // Closes the mobile menu automatically after clicking a link
    const navbarToggler = document.body.querySelector('.navbar-toggler'); // The hamburger button
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link') // All links within the collapsible part
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            // Check if the toggler button is currently visible (indicating mobile view)
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                // Simulate a click on the toggler button to close the menu
                navbarToggler.click();
            }
        });
    });

    // --- Smooth Scrolling for internal links ---
    // Overrides default jump behavior for links starting with '#'
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Check if the link points to an element on the *current* page
        if (anchor.pathname === window.location.pathname &&
            anchor.hostname === window.location.hostname) {

            anchor.addEventListener('click', function (e) {
                // Prevent the default anchor click behavior (jumping)
                e.preventDefault();

                // Get the target element's ID from the href attribute
                var hash = this.hash;
                var targetElement = document.querySelector(hash);

                // If the target element exists
                if (targetElement) {
                    // Calculate the position of the target element relative to the viewport
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    // Calculate the final scroll position, accounting for the fixed navbar height
                    // Adjust the '70' if your navbar height + desired offset is different
                    const offsetPosition = elementPosition + window.pageYOffset - 70;

                    // Use the browser's smooth scroll feature
                    window.scrollTo({
                        top: offsetPosition, // Scroll to the calculated position
                        behavior: "smooth"   // Animate the scroll
                    });

                    // Optional: Update the URL hash in the address bar without causing a jump
                    // Useful for bookmarking, but can sometimes interfere with scrollspy
                    // history.pushState(null, null, hash);
                }
            });
        }
    });


    // --- Fade-in Animation on Scroll ---
    // Select all elements that should fade in
    const fadeInElements = document.querySelectorAll('.fade-in');

    // Configure the Intersection Observer
    const observerOptions = {
        root: null, // Observe intersections relative to the viewport
        rootMargin: '0px', // No margin around the viewport
        threshold: 0.1 // Trigger the callback when 10% of the element is visible
    };

    // This function is called when an observed element intersects with the viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger the CSS animation
                entry.target.classList.add('visible');
                // Optional: Stop observing the element after it has faded in once
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove the class if you want the animation to repeat
                // every time the element scrolls out and back in
                // entry.target.classList.remove('visible');
            }
        });
    };

    // Create a new Intersection Observer instance
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Start observing each fade-in element
    fadeInElements.forEach(el => {
        observer.observe(el);
    });

}); // End of DOMContentLoaded listener
