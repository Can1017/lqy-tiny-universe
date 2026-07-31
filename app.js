/* 页面交互：内容均来自 content/site-content.js，便于不改 HTML 地替换。 */
const data = window.portfolioContent;
const byId = (id) => document.getElementById(id);

byId('profile-photo').src = data.profilePhoto;

byId('education-timeline').innerHTML = data.education.map((item) => `
  <li><time>${item.time}</time><h3>${item.title}</h3><p>${item.description}</p></li>`).join('');

byId('skills-grid').innerHTML = data.skills.map((skill) => `
  <article class="skill-card reveal"><div class="skill-icon">${skill.icon}</div><h3>${skill.title}</h3><p>${skill.text}</p></article>`).join('');

const worksGrid = byId('works-grid');
function renderWorks(filter = 'all') {
  worksGrid.innerHTML = data.works.filter((work) => filter === 'all' || work.category === filter).map((work) => `
    <article class="work-card reveal">
      <div class="work-main"><div class="work-top"><span class="work-category">${work.category}</span><span class="work-badge">${work.award}</span></div>
      <h3>${work.title}</h3><p class="work-label">${work.label}</p><p class="work-summary">${work.summary}</p></div>
      <div class="work-extra"><p><b>项目资料：</b><br>${work.stats}</p><div class="video-placeholder">▶<br>${work.video}</div></div>
    </article>`).join('');
  observeReveals();
}
renderWorks();

const galleryGrid = byId('gallery-grid');
function renderGallery(filter = 'all') {
  galleryGrid.innerHTML = data.gallery.filter((item) => filter === 'all' || item.category === filter).map((item) => `
    <figure class="gallery-card reveal" data-title="${item.title}" data-type="${item.category}" data-note="${item.note}">
      <img src="${item.image}" alt="${item.title}（可替换图片占位）" loading="lazy"><figcaption><span class="gallery-type">${item.category}</span><h3>${item.title}</h3><p>${item.note}</p></figcaption>
    </figure>`).join('');
  addGalleryEvents(); observeReveals();
}
renderGallery();

byId('stat-grid').innerHTML = data.stats.map((stat) => `
  <article class="stat-card reveal"><p class="stat-platform">${stat.platform}</p><p class="stat-value">${stat.value}</p><p class="stat-unit">${stat.unit}</p><div class="stat-progress"><span style="background:${stat.color}" data-progress="${stat.percent}"></span></div></article>`).join('');

byId('bar-chart').innerHTML = data.stats.map((stat) => `
  <div class="bar-item"><b>${stat.value}</b><i style="background:${stat.color}" data-bar="${stat.percent}"></i><span>${stat.platform}</span></div>`).join('');

byId('honor-wall').innerHTML = data.honors.map((honor) => `<span class="honor-tag reveal">🏆 ${honor}</span>`).join('');
byId('contact-list').innerHTML = `
  <a href="tel:${data.contact.phone}"><strong>电话</strong>${data.contact.phone}</a>
  <a href="mailto:${data.contact.email}"><strong>邮箱</strong>${data.contact.email}</a>
  <a href="${data.contact.github}" target="_blank" rel="noreferrer"><strong>GitHub</strong>查看网站源码 ↗</a>
  <a class="resume-button" href="${data.contact.resumeUrl}" download>下载简历 PDF ↓</a>`;

document.querySelectorAll('[data-work-filter]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-work-filter]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active'); renderWorks(button.dataset.workFilter);
}));
document.querySelectorAll('[data-gallery-filter]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-gallery-filter]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active'); renderGallery(button.dataset.galleryFilter);
}));

const lightbox = byId('lightbox');
function addGalleryEvents() {
  document.querySelectorAll('.gallery-card').forEach((card) => card.addEventListener('click', () => {
    const image = card.querySelector('img');
    lightbox.querySelector('img').src = image.currentSrc || image.src;
    lightbox.querySelector('img').alt = image.alt;
    lightbox.querySelector('.lightbox-type').textContent = card.dataset.type;
    lightbox.querySelector('h3').textContent = card.dataset.title;
    lightbox.querySelector('p').textContent = card.dataset.note;
    lightbox.showModal();
  }));
}
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
function observeReveals() { document.querySelectorAll('.reveal:not(.visible)').forEach((item) => observer.observe(item)); }
observeReveals();

const dataObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  entry.target.querySelectorAll('[data-progress]').forEach((bar) => { bar.style.width = `${bar.dataset.progress}%`; });
  entry.target.querySelectorAll('[data-bar]').forEach((bar) => { bar.style.height = `${bar.dataset.bar}%`; });
  dataObserver.unobserve(entry.target);
}), { threshold: 0.35 });
dataObserver.observe(byId('data'));

const nav = document.querySelector('.main-nav');
const toggle = document.querySelector('.nav-toggle');
toggle.addEventListener('click', () => { const isOpen = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', isOpen); });
document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];
const navObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
}), { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => navObserver.observe(section));
