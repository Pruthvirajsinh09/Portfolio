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
