// ================================
// 1. SHOW TODAY'S DATE IN NAV
// ================================
const d = new Date();
document.getElementById('navDate').textContent =
  d.toLocaleDateString('en-GB', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric'
  });


// ================================
// 2. TYPING ANIMATION
// ================================
const words = ['Developer', 'Designer', 'Student', 'Creator'];
let wordIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
const typedEl  = document.getElementById('typed');

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    // remove one letter
    typedEl.textContent = currentWord.slice(0, charIndex--);
  } else {
    // add one letter
    typedEl.textContent = currentWord.slice(0, charIndex++);
  }

  // finished typing → pause then start deleting
  if (!isDeleting && charIndex > currentWord.length) {
    isDeleting = true;
    setTimeout(type, 1200);
    return;
  }

  // finished deleting → move to next word
  if (isDeleting && charIndex < 0) {
    isDeleting  = false;
    wordIndex   = (wordIndex + 1) % words.length;
    charIndex   = 0;
  }

  // deleting is faster than typing
  const speed = isDeleting ? 60 : 110;
  setTimeout(type, speed);
}

type(); // kick off the typing effect


// ================================
// 3. ACTIVE NAV LINK ON SCROLL
// ================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});


// ================================
// 4. CONTACT FORM SUBMIT
// ================================
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault(); // stop page from reloading

  // success state
  submitBtn.textContent        = '✅ Message Sent!';
  submitBtn.style.background   = '#1a9e8f';
  submitBtn.style.boxShadow    = '0 4px 20px rgba(26,158,143,0.4)';
  submitBtn.disabled           = true;

  // reset after 3 seconds
  setTimeout(() => {
    submitBtn.textContent      = 'Send Message ✉️';
    submitBtn.style.background = '';
    submitBtn.style.boxShadow  = '';
    submitBtn.disabled         = false;
    contactForm.reset();
  }, 3000);
});


// ================================
// 5. SCROLL REVEAL ANIMATION
// ================================
const revealEls = document.querySelectorAll(
  '.stat-card, .blog-card, .contact-info-item, .skill-tag'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});


// ================================
// 6. PHOTO ERROR FALLBACK
//    (shows initials if photo missing)
// ================================
const photoImg = document.querySelector('.avatar-photo img');

if (photoImg) {
  photoImg.addEventListener('error', function () {
    // hide the broken image
    this.style.display = 'none';

    // create initials fallback
    const fallback = document.createElement('div');
    fallback.textContent = 'VH';
    fallback.style.cssText = `
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 5rem;
      color: rgba(255,255,255,0.95);
      letter-spacing: -2px;
      text-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;

    // add fallback into avatar
    this.parentElement.appendChild(fallback);
  });
}