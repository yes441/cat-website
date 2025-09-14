// This file contains general JavaScript functionality that may be shared across multiple pages.

// Populate version badges from updatelogging.txt
document.addEventListener('DOMContentLoaded', () => {
  const badges = document.querySelectorAll('.version-badge');
  if (!badges.length) return;
  fetch('updatelogging.txt')
    .then(r => r.text())
    .then(txt => {
      // Try 'last recorded version: vX' first, fallback to first 'Update vX'
      let match = txt.match(/last\s+recorded\s+version:\s*(v[^\s)\]]+)/i);
      if (!match) match = txt.match(/Update\s+(v[^\s)\]]+)/i);
      const version = match ? match[1] : 'v1.0.0';
      badges.forEach(b => (b.textContent = version));
    })
    .catch(() => badges.forEach(b => (b.textContent = 'v?')));
});
