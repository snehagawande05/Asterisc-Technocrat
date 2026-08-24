 // Asterics Technocart — script.js

const NAV_MAP = {
  'what-we-do':    'ni-do',
  'what-we-think': 'ni-think',
  'about':         'ni-about',
  'career':        'ni-career',
  'internship':    'ni-career',
  'contact':       'ni-contact',
};

function showPage(name) {
  const target = document.getElementById('page-' + name);
  if (!target) return;

  const current = document.querySelector('.page.active');

  if (current && current !== target) {
    current.classList.remove('active');
    current.classList.add('fade-out');

    setTimeout(() => {
      current.classList.remove('fade-out');
    }, 400); // matches CSS transition duration
  }

  // slide-in entrance for the incoming page
  target.classList.add('page-enter');
  requestAnimationFrame(() => {
    target.classList.add('active');
    requestAnimationFrame(() => target.classList.remove('page-enter'));
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  setActiveNav(name);
  closeNavs();
  revealPageTitle(target);
}

function setActiveNav(pageName) {
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('nav-active'));
  if (pageName === 'home') return;
  const navItemId = NAV_MAP[pageName];
  if (navItemId) {
    const navItem = document.getElementById(navItemId);
    if (navItem) {
      const navLink = navItem.querySelector('.nav-link');
      if (navLink) navLink.classList.add('nav-active');
    }
  }
}

/* ============================================================
   PAGE TITLE — text-reveal transition
   Splits the page's <h2 class="page-title"> into per-word spans
   (once) and replays a slide-up + fade stagger every time that
   page is shown.
   ============================================================ */
function revealPageTitle(pageEl) {
  const title = pageEl.querySelector('.page-title');
  if (!title) return;

  if (!title.dataset.split) {
    const words = title.textContent.trim().split(' ');
    title.innerHTML = words
      .map(w => `<span class="ptw"><span class="ptw-inner">${w}</span></span>`)
      .join(' ');
    title.dataset.split = '1';
  }

  const spans = title.querySelectorAll('.ptw-inner');
  spans.forEach((s, i) => {
    s.style.transition = 'none';
    s.style.transform = 'translateY(110%)';
    s.style.opacity = '0';
    void s.offsetWidth; // force reflow so the reset applies before re-animating
    s.style.transition = `transform .55s cubic-bezier(.22,1,.36,1) ${i * 0.05}s, opacity .4s ease ${i * 0.05}s`;
    s.style.transform = 'translateY(0)';
    s.style.opacity = '1';
  });
}

function toggleAcc(trigger) {
  const isOpen = trigger.getAttribute('aria-expanded') === 'true';
  const body = trigger.nextElementSibling;
  if (!isOpen) {
    trigger.setAttribute('aria-expanded', 'true');
    body.classList.add('open');
  } else {
    trigger.setAttribute('aria-expanded', 'false');
    body.classList.remove('open');
  }
}
function toggleAcc(trigger) {
  const isOpen = trigger.getAttribute('aria-expanded') === 'true';
  const body = trigger.nextElementSibling;
  if (!isOpen) {
    trigger.setAttribute('aria-expanded', 'true');
    body.classList.add('open');
  } else {
    trigger.setAttribute('aria-expanded', 'false');
    body.classList.remove('open');
  }
}

// 👇 YAHAN ADD KARO 👇
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const body = item.querySelector('.faq-body');
  const isOpen = item.classList.contains('open');

  // close all other FAQs
  document.querySelectorAll('.faq-item.open').forEach(openItem => {
    if (openItem !== item) {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-body').classList.remove('open');
    }
  });

  item.classList.toggle('open', !isOpen);
  body.classList.toggle('open', !isOpen);
}
// 👆 YAHAN TAK 👆

function toggleNav(id) {
  const item = document.getElementById(id);
  const isOpen = item.classList.contains('open');
  closeNavs();
  if (!isOpen) item.classList.add('open');
}

function toggleNav(id) {
  const item = document.getElementById(id);
  const isOpen = item.classList.contains('open');
  closeNavs();
  if (!isOpen) item.classList.add('open');
}

function closeNavs() {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('open'));
}

document.addEventListener('click', function (e) {
  if (!e.target.closest('.nav-item')) closeNavs();
});

function openModal(type) {
  document.getElementById('modal-overlay').classList.add('open');
  switchTab(type || 'login');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

function switchTab(type) {
  document.getElementById('modal-login').style.display  = type === 'login'  ? 'block' : 'none';
  document.getElementById('modal-signup').style.display = type === 'signup' ? 'block' : 'none';
  document.getElementById('tab-login').classList.toggle('active',  type === 'login');
  document.getElementById('tab-signup').classList.toggle('active', type === 'signup');
}

 const CONTACT_FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbw8yilq4TDueE5DqQmUqHBjj6_3bjFotymWn4SyIk4bHEgpeHLjP_BAQpKTRcYJlghm/exec";

function handleSubmit() {
  const firstName = document.getElementById('cf-first-name').value.trim();
  const lastName  = document.getElementById('cf-last-name').value.trim();
  const email     = document.getElementById('contact-email').value.trim();
  const phone     = document.getElementById('cf-phone').value.trim();
  const subject   = document.getElementById('cf-subject').value;
  const message   = document.getElementById('cf-message').value.trim();
  const btn       = document.getElementById('cf-submit-btn');

  if (!firstName || !email || !message) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  btn.disabled = true;
  const originalText = btn.innerHTML;
  btn.innerHTML = 'Sending...';

  fetch(CONTACT_FORM_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, phone, subject, message }),
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }
  })
    .then(() => {
      alert("Thank you! We've received your message and sent you a confirmation email.");
      document.getElementById('cf-first-name').value = '';
      document.getElementById('cf-last-name').value = '';
      document.getElementById('contact-email').value = '';
      document.getElementById('cf-phone').value = '';
      document.getElementById('cf-message').value = '';
    })
    .catch(() => {
      alert("Something went wrong. Please try again or email us directly at hello@asterisc.in.");
    })
    .finally(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
    });
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ============================================================
   GALLERY LIGHTBOX
   ============================================================ */
function handleLightboxTilt(e) {
  const frame = document.querySelector('.lightbox-frame');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!frame || !lightboxImg) return;
  const rect = frame.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  lightboxImg.style.transform = `perspective(1000px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.04)`;
  lightboxImg.style.boxShadow = `${-x * 40}px ${-y * 40 + 25}px 70px rgba(0,0,0,0.55)`;
}

function resetLightboxTilt() {
  const lightboxImg = document.getElementById('lightbox-img');
  if (!lightboxImg) return;
  lightboxImg.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
  lightboxImg.style.boxShadow = '';
}

function openGalleryLightbox(slotEl) {
  const img = slotEl.querySelector('img');
  if (!img) return; // placeholder slot — nothing to preview yet
  const overlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const frame = document.querySelector('.lightbox-frame');
  if (!overlay || !lightboxImg) return;
  lightboxImg.src = img.currentSrc || img.src;
  lightboxImg.alt = img.alt || '';
  if (caption) caption.textContent = img.alt || '';
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (frame && !isTouch) {
    frame.addEventListener('mousemove', handleLightboxTilt);
    frame.addEventListener('mouseleave', resetLightboxTilt);
  }
}

function closeLightbox(e) {
  if (e && e.target && e.target.closest && e.target.closest('.lightbox-frame') && !e.target.closest('.lightbox-close')) return;
  const overlay = document.getElementById('lightbox-overlay');
  const frame = document.querySelector('.lightbox-frame');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  if (frame) {
    frame.removeEventListener('mousemove', handleLightboxTilt);
    frame.removeEventListener('mouseleave', resetLightboxTilt);
  }
  resetLightboxTilt();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ============================================================
   LOGO POPUP
   ============================================================ */
function openLogoPopup() {
  const overlay = document.getElementById('logo-popup-overlay');
  if (!overlay) return;
  const img = overlay.querySelector('.logo-popup-img');
  if (img) { img.style.animation = 'none'; void img.offsetWidth; img.style.animation = ''; }
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLogoPopup(e) {
  if (e && e.target && e.target.closest && e.target.closest('.logo-popup-frame') && !e.target.closest('.logo-popup-close')) return;
  const overlay = document.getElementById('logo-popup-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLogoPopup(); });

/* ============================================================
   HERO — "Ask me anything" search card + mic button
   ============================================================ */
function toggleHeroMic() {
  const btn = document.getElementById('hero-mic-btn');
  const input = document.getElementById('hero-ask-input');
  if (!btn) return;
  const isListening = btn.classList.toggle('listening');
  if (isListening && input) {
    input.placeholder = 'Listening…';
    input.focus();
    setTimeout(() => {
      btn.classList.remove('listening');
      if (input) input.placeholder = 'Ask me anything';
    }, 2200);
  } else if (input) {
    input.placeholder = 'Ask me anything';
  }
}

function handleHeroAsk() {
  const input = document.getElementById('hero-ask-input');
  const query = input ? input.value.trim() : '';
  if (!query) {
    if (input) input.focus();
    return;
  }
  alert('Searching for: "' + query + '"');
}

/* ============================================================
   HERO HEADING LOOP
   ============================================================ */
const HERO_INTRO_SENTENCES = [
  "Asterics Technocrat",
  "Websites Built To Work For You",
  "Mobile Apps, Designed To Delight",
  "E-Commerce That Turns Browsers Into Buyers",
  "Digital Marketing That Reaches The Right Audience",
  "Software Built To Scale With Your Business",
  "ISO 9001:2015 Certified. Trusted Worldwide",
  "Where Ideas Become Digital Reality"
];

const HERO_INTRO_HOLD_MS = 1600;
const HERO_INTRO_FADE_MS = 350;

function startHeroIntroLoop() {
  const textEl = document.getElementById('hero-heading-text');
  const revealGroup = document.getElementById('hero-reveal-group');
  const micWrap = document.getElementById('hero-mic-wrap');
  if (!textEl) return;

  let index = 0;
  let revealed = false;

    
   function showSentence() {
    const words = HERO_INTRO_SENTENCES[index].split(' ');
    textEl.innerHTML = words
      .map((w, i) => {
        const side = i % 2 === 0 ? 'from-left' : 'from-right';
        return `<span class="hw ${side}" style="transition-delay:${(i * 0.03).toFixed(3)}s">${w}</span>`;
      })
      .join(' ');

    textEl.classList.remove('fade-out');
    void textEl.offsetWidth;
    textEl.classList.add('fade-in');

    setTimeout(() => {
      textEl.classList.remove('fade-in');
      textEl.classList.add('fade-out');

      setTimeout(() => {
        index = (index + 1) % HERO_INTRO_SENTENCES.length;

        if (index === 0 && !revealed) {
          revealed = true;
          if (revealGroup) revealGroup.classList.add('revealed');
          if (micWrap) micWrap.classList.add('mic-revealed');
          animateStatCounters();
        }

        showSentence();
      }, HERO_INTRO_FADE_MS);
    }, HERO_INTRO_HOLD_MS);
  }      

  showSentence();
}

function animateStatCounters() {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  counters.forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      const current = Math.floor(eased * target);
      el.textContent = current + '+';
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + '+';
      }
    }
    requestAnimationFrame(tick);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startHeroIntroLoop);
} else {
  startHeroIntroLoop();
}

function toggleMobileMenu() {
  const btn = document.getElementById('hamburger-btn');
  const overlay = document.getElementById('mobile-menu-overlay');
  const isOpen = overlay.classList.contains('open');
  if (isOpen) { closeMobileMenu(); } else {
    overlay.classList.add('open');
    btn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  document.getElementById('mobile-menu-overlay').classList.remove('open');
  document.getElementById('hamburger-btn').classList.remove('open');
  document.body.style.overflow = '';
}

function closeMobileMenuOutside(e) {
  if (e.target === document.getElementById('mobile-menu-overlay')) closeMobileMenu();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });

// Close mobile menu automatically if the viewport is resized back to desktop width
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMobileMenu();
});
function initGalleryReveal() {
  const slots = document.querySelectorAll('.work-gallery .gallery-slot');
  if (!slots.length) return;
  if (!('IntersectionObserver' in window)) {
    slots.forEach(s => s.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = Array.from(slots).indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('in-view'), idx * 90);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  slots.forEach(s => observer.observe(s));
}

document.addEventListener('DOMContentLoaded', initGalleryReveal);
 function initGalleryAutoScroll() {
  const track = document.getElementById('work-gallery-track');
  if (!track) return;
  let paused = false;

  track.addEventListener('mouseenter', () => { paused = true; });
  track.addEventListener('mouseleave', () => { paused = false; });

  function step() {
    if (!paused) {
      track.scrollLeft += 1;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 1) {
        track.scrollLeft = 0;
      }
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', initGalleryAutoScroll);
/* ============================================================
   WHAT WE THINK — Category filter
   ============================================================ */
function filterThink(category, btnEl) {
  document.querySelectorAll('.think-filter').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');

  const featured = document.querySelector('.think-featured');
  const cards = document.querySelectorAll('#think-grid .think-card');
  const empty = document.getElementById('think-empty');
  let visibleCount = 0;

  if (featured) {
    const match = category === 'all' || featured.dataset.category === category;
    featured.classList.toggle('think-hidden', !match);
    if (match) visibleCount++;
  }

  cards.forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    card.classList.toggle('think-hidden', !match);
    if (match) visibleCount++;
  });

  if (empty) empty.style.display = visibleCount === 0 ? 'block' : 'none';
}
function filterThink(category, btnEl) {
  document.querySelectorAll('.think-filter').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');

  const featured = document.querySelector('.think-featured');
  const cards = document.querySelectorAll('.think-bento-card[data-category]');

  if (featured) {
    const match = category === 'all' || featured.dataset.category === category;
    featured.classList.toggle('think-hidden', !match);
  }

  cards.forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    card.classList.toggle('think-hidden', !match);
  });
}
function handleThinkSubscribe(e) {
  e.preventDefault();
  const input = e.target.querySelector('.think-newsletter-input');
  const email = input ? input.value.trim() : '';
  if (!email) return;
  alert("Thanks for subscribing! We'll be in touch with our next update.");
  if (input) input.value = '';
}
function initBeforeAfterSlider() {
  const slider = document.getElementById('ba-slider');
  if (!slider) return;
  const afterImg = slider.querySelector('.ba-after');
  const handle = document.getElementById('ba-handle');
  let dragging = false;

  function setPosition(x) {
    const rect = slider.getBoundingClientRect();
    let pct = ((x - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    afterImg.style.clipPath = `inset(0 0 0 ${pct}%)`;
    handle.style.left = pct + '%';
  }

  slider.addEventListener('mousedown', e => { dragging = true; setPosition(e.clientX); });
  window.addEventListener('mousemove', e => { if (dragging) setPosition(e.clientX); });
  window.addEventListener('mouseup', () => { dragging = false; });

  slider.addEventListener('touchstart', e => { dragging = true; setPosition(e.touches[0].clientX); });
  slider.addEventListener('touchmove', e => { if (dragging) setPosition(e.touches[0].clientX); });
  slider.addEventListener('touchend', () => { dragging = false; });
}

 