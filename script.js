// Manage showing only selected section via navbar clicks
const navLinks = document.querySelectorAll('.navbar a.nav-link');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
  link.addEventListener('click', evt => {
    evt.preventDefault();
    const targetId = link.getAttribute('href').substring(1);

    // Hide all sections, remove active class from all
    sections.forEach(sec => sec.classList.remove('active'));
    navLinks.forEach(nav => nav.classList.remove('active'));

    // Show selected section and highlight the nav link
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
      link.classList.add('active');
    }
  });
});

// Initially show About section and highlight About nav link
window.addEventListener('DOMContentLoaded', () => {
  sections.forEach((section, idx) => {
    section.classList.toggle('active', idx === 0);
  });
  navLinks.forEach((link, idx) => {
    link.classList.toggle('active', idx === 0);
  });
});
