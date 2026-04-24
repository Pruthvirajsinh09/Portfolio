// ScrollTrigger blocky reveal animations
gsap.registerPlugin(ScrollTrigger);

// Initial Load Animation Timeline
window.addEventListener("load", () => {
    
    // Ensure scroll is at top for proper staggered intro
    window.scrollTo(0, 0);

    const tl = gsap.timeline();

    // Aggressive, bouncy intro
    tl.from(".navbar", { y: -100, opacity: 0, duration: 0.8, ease: "bounce.out" })
      .from(".hero-title", { 
          x: -100, opacity: 0, duration: 0.7, ease: "back.out(2)" 
      }, "-=0.4")
      .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.4 }, "-=0.3")
      .from(".hero-actions", { scale: 0.5, opacity:0, duration: 0.5, ease: "back.out(2.5)" }, "-=0.2")
      .from(".shape", {
          scale: 0,
          rotation: 90,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "elastic.out(1, 0.4)"
      }, "-=0.4");
});

// Animate Cards dynamically on scroll
const animatedCards = document.querySelectorAll('.animated-card');

animatedCards.forEach(card => {
    gsap.from(card, {
        y: 80,
        x: (index) => index % 2 === 0 ? -30 : 30, // Alter direction slightly
        rotation: (index) => index % 2 === 0 ? -5 : 5, // Extra dramatic spin
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.8)",
        scrollTrigger: {
            trigger: card,
            start: "top 85%", // Trigger when 85% down viewport
            toggleActions: "play none none reverse" // Rewinds when you scroll up for continuous animated feeling
        }
    });
});

// Duplicating marquee text continuously for perfectly smooth flow
const marquees = document.querySelectorAll('.marquee h2, .marquee-2 h2');
marquees.forEach(m => {
    const text = m.innerHTML;
    // Repeat enough times to cover any width
    m.innerHTML = text + text + text + text; 
});

// Springy Button Interactions added programmatically to bypass CSS conflicts
const interactiveBtns = document.querySelectorAll('.bounce-btn, .btn');

interactiveBtns.forEach(btn => {
    btn.addEventListener('mousedown', () => {
        gsap.to(btn, { scaleX: 0.9, scaleY: 0.9, duration: 0.1 });
    });
    btn.addEventListener('mouseup', () => {
        gsap.to(btn, { scaleX: 1, scaleY: 1, duration: 0.6, ease: "elastic.out(1.2, 0.3)" });
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Little bounce interaction on click for brutalist theme
        gsap.fromTo(mobileMenuBtn, {scale: 0.8}, {scale: 1, duration: 0.4, ease: "back.out(3)"});
    });
    
    // Close menu when clicking a link on mobile
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });
}
