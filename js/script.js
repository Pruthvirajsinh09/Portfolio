// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('navHamburger');
  const isOpen = navLinks.classList.contains('mobile-open');
  if (isOpen) {
    navLinks.classList.remove('mobile-open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  } else {
    navLinks.classList.add('mobile-open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }
}

function closeMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('navHamburger');
  navLinks.classList.remove('mobile-open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (e) {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('navHamburger');
  if (navLinks && hamburger && navLinks.classList.contains('mobile-open')) {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  }
});

function switchExp(id) {
  document.querySelectorAll('.exp-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.exp-panel').forEach(p => p.classList.remove('active'));
  event.currentTarget.classList.add('active');
  const panel = document.getElementById('exp-' + id);
  if (panel) panel.classList.add('active');
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + id);
  if (el) { el.classList.add('active'); window.scrollTo(0,0); }
}

// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
});
function animRing() {
  rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform='translate(-50%,-50%) scale(2)'; ring.style.transform='translate(-50%,-50%) scale(1.5)'; ring.style.opacity='0.3'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform='translate(-50%,-50%) scale(1)'; ring.style.transform='translate(-50%,-50%) scale(1)'; ring.style.opacity='0.5'; });
});

// Intersection observer for fade-up and skill bars
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => bar.classList.add('animate'));
    }
  });
}, { threshold: 0.3 });
const skillSec = document.getElementById('skills');
if (skillSec) skillObserver.observe(skillSec);

// Contact Form Submission with Web3Forms
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const statusEl = document.getElementById('formStatus');
    const submitBtn = document.getElementById('formSubmitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    // Reset status
    statusEl.style.display = 'none';
    statusEl.className = 'form-status';
    statusEl.innerHTML = '';

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-flex';

    // Prepare form data
    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    
    // Prepare FormSubmit payload
    const payload = {
      name: object.name,
      email: object.email,
      message: object.message,
      _subject: 'New Portfolio Message from ' + object.name,
      _captcha: 'false'
    };

    const json = JSON.stringify(payload);

    // Send data to FormSubmit
    fetch('https://formsubmit.co/ajax/pruthvirajsinh1018@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
      .then(async (response) => {
        let jsonRes = await response.json();
        if (response.ok) {
          statusEl.classList.add('success');
          statusEl.innerHTML = '✨ Message sent successfully! (Note: The first message requires email activation).';
          contactForm.reset();
        } else {
          console.error(response);
          statusEl.classList.add('error');
          statusEl.innerHTML = '❌ ' + (jsonRes.message || 'Something went wrong. Please try again.');
        }
      })
      .catch((error) => {
        console.error(error);
        statusEl.classList.add('error');
        statusEl.innerHTML = '❌ Network error. Please check your connection and try again.';
      })
      .then(() => {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
      });
  });
}

