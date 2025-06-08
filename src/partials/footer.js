// Footer Partial
export function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="footer bg-light text-center py-3 mt-4">
      <span class="footer__copyright">&copy; ${year} BlogApp. All rights reserved.</span>
    </footer>
  `;
}
