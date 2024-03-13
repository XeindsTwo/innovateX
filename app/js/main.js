const body = document.body;
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav__mobile');
const anchors = document.querySelectorAll('a[href*="#"]');

menuBtn.addEventListener('click', (event) => {
  event.preventDefault();
  body.classList.toggle('body--active');
  nav.classList.toggle('active');
  menuBtn.classList.toggle('active');
  menuBtn.blur();
});

function scrollToTarget(targetId) {
  const targetSection = document.querySelector(targetId);
  if (targetSection) {
    setTimeout(() => {
      let targetOffset;
      if (targetId.includes('#testimonials')) {
        targetOffset = targetSection.offsetTop;
      } else {
        targetOffset = targetSection.offsetTop - 30;
      }
      window.scrollTo({top: targetOffset, behavior: 'smooth'});
    }, 400);
  }
}

function scrollToTargetMobile(targetId) {
  const targetSection = document.querySelector(targetId);
  if (targetSection) {
    body.classList.remove('body--active');
    nav.classList.remove('active');
    menuBtn.classList.remove('active');
    setTimeout(() => {
      const targetOffset = targetSection.offsetTop;
      window.scrollTo({top: targetOffset, behavior: 'smooth'});
    }, 400);
  }
}

function handleAnchorClick(event) {
  event.preventDefault();
  const targetId = this.getAttribute('href');
  scrollToTarget(targetId);
}

function handleAnchorClickMobile(event) {
  event.preventDefault();
  const targetId = this.getAttribute('href');
  scrollToTargetMobile(targetId);
}

for (const anchor of anchors) {
  anchor.addEventListener('click', handleAnchorClick);
  anchor.addEventListener('touchstart', handleAnchorClick, {passive: true});
}

for (const anchor of anchors) {
  anchor.addEventListener('click', handleAnchorClickMobile);
  anchor.addEventListener('touchstart', handleAnchorClickMobile, {passive: true});
}

const menuLinks = document.querySelectorAll('.nav__link');
menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', handleAnchorClickMobile);
  menuLink.addEventListener('touchstart', handleAnchorClickMobile, {passive: true});
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const visibleRatio = visibleHeight / section.clientHeight;
    if (visibleRatio >= 0.3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});