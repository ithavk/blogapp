// UI Enhancements: Popover for author, animations
export function enableAuthorPopover() {
  document.querySelectorAll('.post-card__profile').forEach(img => {
    const card = img.closest('.post-card');
    if (!card) return;
    const author = card.querySelector('.fw-bold').textContent;
    const email = card.querySelector('.fw-bold').parentElement.parentElement.querySelector('.text-muted').textContent;
    img.setAttribute('data-bs-toggle', 'popover');
    img.setAttribute('data-bs-trigger', 'hover focus');
    img.setAttribute('data-bs-placement', 'right');
    img.setAttribute('title', author);
    img.setAttribute('data-bs-content', `Email: ${email}`);
  });
  if (window.bootstrap) {
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
      new window.bootstrap.Popover(el);
    });
  }
}

export function animateCardEntry() {
  document.querySelectorAll('.post-card').forEach(card => {
    card.classList.add('fade-in');
    setTimeout(() => card.classList.remove('fade-in'), 800);
  });
}
