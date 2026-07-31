const labels = document.querySelectorAll('.drawer-label');
const cards = document.querySelectorAll('.photo-card');

labels.forEach((label) => label.addEventListener('click', () => {
  labels.forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
  label.classList.add('active'); label.setAttribute('aria-selected', 'true');
  const category = label.dataset.filter;
  cards.forEach((card) => card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category));
}));

const lightbox = document.querySelector('.lightbox');
const preview = lightbox.querySelector('img');
const caption = lightbox.querySelector('p');
cards.forEach((card) => card.addEventListener('click', () => {
  const image = card.querySelector('img');
  preview.src = image.currentSrc || image.src;
  preview.alt = image.alt;
  caption.textContent = card.dataset.title;
  lightbox.showModal();
}));
lightbox.querySelector('.close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
