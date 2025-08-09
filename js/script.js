// General site-wide functionality

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');

  const links = [
    { id: 'play-clicker', href: 'clicker.html' },
    { id: 'back-home', href: 'index.html' }
  ];

  links.forEach(link => {
    const el = document.getElementById(link.id);
    if (el) {
      el.addEventListener('click', e => {
        e.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => {
          window.location.href = link.href;
        }, 500);
      });
    }
  });
});