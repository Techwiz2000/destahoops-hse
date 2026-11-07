// Sticky nav
const header = document.getElementById('header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 40));

// Mobile menu
const nav = document.getElementById('nav');
document.getElementById('hamburger').addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Animated counters
const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.target, suffix = el.dataset.suffix || '+';
    let cur = 0;
    const step = () => {
      cur += Math.max(1, target / 40);
      if (cur >= target) { el.textContent = target + suffix; return; }
      el.textContent = Math.floor(cur) + suffix;
      requestAnimationFrame(step);
    };
    step(); cio.unobserve(el);
  });
}, { threshold: .5 });
document.querySelectorAll('.counter').forEach(el => cio.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    document.querySelectorAll('.faq-item').forEach(i => { if (i !== item) i.classList.remove('open'); });
    item.classList.toggle('open');
  });
});

// Booking form
document.getElementById('bookingForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    program: document.getElementById('program').value,
    plan: document.getElementById('plan').value,
    message: document.getElementById('message').value,
    date: new Date().toISOString()
  };
  try {
    const bookings = JSON.parse(localStorage.getItem('destahoops_bookings') || '[]');
    bookings.push(data);
    localStorage.setItem('destahoops_bookings', JSON.stringify(bookings));
  } catch (_) { /* storage unavailable */ }
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
  e.target.reset();
});