/*
 * 页面交互。每个页面只渲染自己需要的模块；这样即使某个页面没有某个容器，
 * 也不会导致整页脚本报错或显示空白。
 */
(() => {
  const data = window.portfolioContent;
  if (!data) return;
  const byId = (id) => document.getElementById(id);
  const html = (value) => String(value ?? '');

  const profilePhoto = byId('profile-photo');
  if (profilePhoto) profilePhoto.src = data.profilePhoto || profilePhoto.src;

  const timeline = byId('education-timeline');
  if (timeline) timeline.innerHTML = data.education.map((item) => `
    <li><time>${html(item.time)}</time><h3>${html(item.title)}</h3><p>${html(item.description)}</p></li>`).join('');

  const skillsGrid = byId('skills-grid');
  if (skillsGrid) skillsGrid.innerHTML = data.skills.map((skill) => `
    <article class="skill-card reveal"><div class="skill-icon">${html(skill.icon)}</div><h3>${html(skill.title)}</h3><p>${html(skill.text)}</p></article>`).join('');

  const worksGrid = byId('works-grid');
  const renderWorks = (filter = 'all') => {
    if (!worksGrid) return;
    worksGrid.innerHTML = data.works.filter((work) => filter === 'all' || work.category === filter).map((work) => `
      <article class="work-card reveal"><div class="work-main"><div class="work-top"><span class="work-category">${html(work.category)}</span><span class="work-badge">${html(work.award)}</span></div><h3>${html(work.title)}</h3><p class="work-label">${html(work.label)}</p><p class="work-summary">${html(work.summary)}</p></div><div class="work-extra"><p><b>项目资料：</b><br>${html(work.stats)}</p><div class="video-placeholder">▶<br>${html(work.video)}</div></div></article>`).join('');
    observeReveals();
  };
  if (worksGrid) renderWorks();
  document.querySelectorAll('[data-work-filter]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-work-filter]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active'); renderWorks(button.dataset.workFilter);
  }));

  const galleryGrid = byId('gallery-grid');
  const lightbox = byId('lightbox');
  const addGalleryEvents = () => {
    if (!lightbox) return;
    document.querySelectorAll('.gallery-card').forEach((card) => card.addEventListener('click', () => {
      const image = card.querySelector('img');
      lightbox.querySelector('img').src = image.currentSrc || image.src;
      lightbox.querySelector('img').alt = image.alt;
      lightbox.querySelector('.lightbox-type').textContent = card.dataset.type;
      lightbox.querySelector('h3').textContent = card.dataset.title;
      lightbox.querySelector('p').textContent = card.dataset.note;
      lightbox.showModal();
    }));
  };
  const renderGallery = (filter = 'all') => {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = data.gallery.filter((item) => filter === 'all' || item.category === filter).map((item) => `
      <figure class="gallery-card reveal" data-title="${html(item.title)}" data-type="${html(item.category)}" data-note="${html(item.note)}"><img src="${html(item.image)}" alt="${html(item.title)}（可替换图片占位）" loading="lazy"><figcaption><span class="gallery-type">${html(item.category)}</span><h3>${html(item.title)}</h3><p>${html(item.note)}</p></figcaption></figure>`).join('');
    addGalleryEvents(); observeReveals();
  };
  if (galleryGrid) renderGallery();
  document.querySelectorAll('[data-gallery-filter]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-gallery-filter]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active'); renderGallery(button.dataset.galleryFilter);
  }));
  if (lightbox) {
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
  }

  const statGrid = byId('stat-grid');
  if (statGrid) statGrid.innerHTML = data.stats.map((stat) => `<article class="stat-card reveal"><p class="stat-platform">${html(stat.platform)}</p><p class="stat-value">${html(stat.value)}</p><p class="stat-unit">${html(stat.unit)}</p><div class="stat-progress"><span style="background:${html(stat.color)}" data-progress="${html(stat.percent)}"></span></div></article>`).join('');
  const barChart = byId('bar-chart');
  if (barChart) barChart.innerHTML = data.stats.map((stat) => `<div class="bar-item"><b>${html(stat.value)}</b><i style="background:${html(stat.color)}" data-bar="${html(stat.percent)}"></i><span>${html(stat.platform)}</span></div>`).join('');
  const dataSection = byId('data');
  if (dataSection && 'IntersectionObserver' in window) {
    const chartObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('[data-progress]').forEach((bar) => { bar.style.width = `${bar.dataset.progress}%`; });
      entry.target.querySelectorAll('[data-bar]').forEach((bar) => { bar.style.height = `${bar.dataset.bar}%`; });
      chartObserver.unobserve(entry.target);
    }), { threshold: 0.2 });
    chartObserver.observe(dataSection);
  } else if (dataSection) {
    dataSection.querySelectorAll('[data-progress]').forEach((bar) => { bar.style.width = `${bar.dataset.progress}%`; });
    dataSection.querySelectorAll('[data-bar]').forEach((bar) => { bar.style.height = `${bar.dataset.bar}%`; });
  }

  const honorWall = byId('honor-wall');
  if (honorWall) honorWall.innerHTML = data.honors.map((honor) => `<span class="honor-tag reveal">🏆 ${html(honor)}</span>`).join('');
  const contactList = byId('contact-list');
  if (contactList) contactList.innerHTML = `<a href="tel:${html(data.contact.phone)}"><strong>电话</strong>${html(data.contact.phone)}</a><a href="mailto:${html(data.contact.email)}"><strong>邮箱</strong>${html(data.contact.email)}</a><a href="${html(data.contact.github)}" target="_blank" rel="noreferrer"><strong>GitHub</strong>查看网站源码 ↗</a><a class="resume-button" href="${html(data.contact.resumeUrl)}" download>下载简历 PDF ↓</a>`;

  let observer;
  function observeReveals() {
    const cards = document.querySelectorAll('.reveal:not(.visible)');
    if (!('IntersectionObserver' in window)) { cards.forEach((card) => card.classList.add('visible')); return; }
    if (!observer) observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.1 });
    cards.forEach((card) => observer.observe(card));
  }
  observeReveals();

  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(isOpen));
  });
})();
