/*
 * 交互脚本。所有可替换文字、图片、链接都仍然放在 content/site-content.js。
 * 这里仅负责把内容变成可翻卡片、可翻页作品集与可拖动的数据弹珠。
 */
(() => {
  const data = window.portfolioContent;
  if (!data) return;
  const $ = (selector) => document.querySelector(selector);
  const html = (value) => String(value ?? '');

  // 统一移动端导航
  const nav = $('.main-nav');
  const toggle = $('.nav-toggle');
  if (nav && toggle) toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // 首页：教育经历做成可翻转的扇形纸牌。
  const profilePhoto = $('#profile-photo');
  if (profilePhoto) profilePhoto.src = data.profilePhoto || profilePhoto.src;
  const deck = $('#journey-deck');
  if (deck) {
    const cards = [
      ...data.education.map((item, index) => ({ ...item, no: `0${index + 1}`, note: index === 0 ? '数字感与执行力' : '内容感与表达力' })),
      { no: '03', time: 'NOW', title: '短视频编导 · 校招', description: '把脚本、镜头、视觉与复盘串成一次完整的内容实践。', note: '正在发生' }
    ];
    deck.innerHTML = cards.map((item, index) => `<button class="journey-card card-${index + 1}" type="button" aria-label="翻转 ${html(item.title)}"><span class="card-face card-front"><i>${html(item.no)}</i><small>${html(item.time)}</small><strong>${html(item.title)}</strong><em>tap to turn ↗</em></span><span class="card-face card-back"><i>${html(item.note)}</i><p>${html(item.description)}</p><em>点击返回</em></span></button>`).join('');
    deck.querySelectorAll('.journey-card').forEach((card) => card.addEventListener('click', () => card.classList.toggle('is-turned')));
  }

  const stamps = $('#skills-stamps');
  if (stamps) stamps.innerHTML = data.skills.map((skill, index) => `<article class="skill-stamp stamp-${index + 1}"><span>${html(skill.icon)}</span><h3>${html(skill.title)}</h3><p>${html(skill.text)}</p><i>0${index + 1}</i></article>`).join('');

  // 文案页：左侧索引抽屉 + 右侧打开的一页脚本。
  const workTabs = $('#work-tabs');
  const scriptDetail = $('#script-detail');
  if (workTabs && scriptDetail) {
    const renderWork = (index) => {
      const work = data.works[index];
      workTabs.querySelectorAll('button').forEach((button, buttonIndex) => button.classList.toggle('active', buttonIndex === index));
      scriptDetail.classList.remove('page-in');
      window.setTimeout(() => {
        scriptDetail.innerHTML = `<div class="script-meta"><span>${html(work.category)}</span><span>${html(work.award)}</span></div><p class="script-number">SCRIPT / 0${index + 1}</p><h2>${html(work.title)}</h2><p class="script-label">${html(work.label)}</p><div class="script-rule"></div><p class="script-summary">${html(work.summary)}</p><dl><div><dt>完成内容</dt><dd>${html(work.stats)}</dd></div><div><dt>影像留位</dt><dd><span class="clip-box">▶ ${html(work.video)}</span></dd></div></dl><p class="script-end">END OF PAGE / 点击左侧继续翻阅</p>`;
        scriptDetail.classList.add('page-in');
      }, 80);
    };
    workTabs.innerHTML = data.works.map((work, index) => `<button class="${index === 0 ? 'active' : ''}" type="button"><span>0${index + 1}</span>${html(work.category)}<i>↗</i></button>`).join('');
    workTabs.querySelectorAll('button').forEach((button, index) => button.addEventListener('click', () => renderWork(index)));
    renderWork(0);
  }

  // 影像页：一个可翻的影像笔记本。图片、文字与视频提示都来自内容文件。
  const flipbook = $('#flipbook');
  const thumbs = $('#book-thumbs');
  const count = $('#book-count');
  const prev = $('#book-prev');
  const next = $('#book-next');
  if (flipbook && thumbs && count && prev && next) {
    let pageIndex = 0;
    let direction = 'next';
    const renderBook = () => {
      const item = data.gallery[pageIndex];
      flipbook.classList.remove('turn-next', 'turn-prev');
      void flipbook.offsetWidth;
      flipbook.classList.add(direction === 'next' ? 'turn-next' : 'turn-prev');
      flipbook.innerHTML = `<div class="book-cover"><span>VISUAL<br />NOTEBOOK</span><i>0${pageIndex + 1}</i></div><article class="book-page"><div class="book-photo"><img src="${html(item.image)}" alt="${html(item.title)}（可替换图片）"><span>${html(item.category)}</span></div><div class="book-copy"><p class="book-page-no">PAGE ${String(pageIndex + 1).padStart(2, '0')}</p><h2>${html(item.title)}</h2><p>${html(item.note)}</p><div class="book-video"><b>▶</b><span>VIDEO SLOT<br />可替换视频链接或文件</span></div><small>IMAGE PATH / content/site-content.js</small></div></article>`;
      count.textContent = `${String(pageIndex + 1).padStart(2, '0')} / ${String(data.gallery.length).padStart(2, '0')}`;
      thumbs.innerHTML = data.gallery.map((gallery, index) => `<button class="${index === pageIndex ? 'active' : ''}" type="button" aria-label="翻到 ${html(gallery.title)}"><img src="${html(gallery.image)}" alt=""></button>`).join('');
      thumbs.querySelectorAll('button').forEach((button, index) => button.addEventListener('click', () => { direction = index > pageIndex ? 'next' : 'prev'; pageIndex = index; renderBook(); }));
    };
    prev.addEventListener('click', () => { direction = 'prev'; pageIndex = (pageIndex - 1 + data.gallery.length) % data.gallery.length; renderBook(); });
    next.addEventListener('click', () => { direction = 'next'; pageIndex = (pageIndex + 1) % data.gallery.length; renderBook(); });
    renderBook();
  }

  // 数据页：轻量的“弹珠池”。可拖动、可点击，不依赖任何第三方库。
  const signalBoard = $('#signal-board');
  const signalDetail = $('#signal-detail');
  if (signalBoard && signalDetail) {
    signalBoard.innerHTML = `<p class="board-caption">DRAG / CLICK A SIGNAL</p>${data.stats.map((stat, index) => `<button class="signal-ball ball-${index + 1}" style="--ball:${html(stat.color)}" type="button" data-index="${index}"><small>${html(stat.platform)}</small><strong>${html(stat.value)}</strong><em>${html(stat.unit)}</em></button>`).join('')}<i class="board-line line-a"></i><i class="board-line line-b"></i><i class="board-dot dot-a"></i><i class="board-dot dot-b"></i>`;
    const showSignal = (index) => {
      const stat = data.stats[index];
      signalBoard.querySelectorAll('.signal-ball').forEach((ball, ballIndex) => ball.classList.toggle('selected', ballIndex === index));
      signalDetail.innerHTML = `<p class="eyebrow">${html(stat.platform)} / CONTENT SIGNAL</p><h2>${html(stat.value)}<small>${html(stat.unit)}</small></h2><p>这组数据提醒我：内容的有效性不只在播放量，也在于它有没有获得继续被讨论、被转发的机会。</p><div class="signal-meter"><span style="width:${html(stat.percent)}%;background:${html(stat.color)}"></span></div><p class="signal-tip">复盘切口：先确认标题与开头钩子，再对照平台用户的停留与互动反馈。</p>`;
    };
    signalBoard.querySelectorAll('.signal-ball').forEach((ball, index) => {
      ball.addEventListener('click', () => showSignal(index));
      let moving = false; let offsetX = 0; let offsetY = 0;
      ball.addEventListener('pointerdown', (event) => { moving = true; ball.setPointerCapture(event.pointerId); const rect = ball.getBoundingClientRect(); offsetX = event.clientX - rect.left; offsetY = event.clientY - rect.top; ball.classList.add('dragging'); });
      ball.addEventListener('pointermove', (event) => { if (!moving) return; const boardRect = signalBoard.getBoundingClientRect(); const left = Math.min(Math.max(0, event.clientX - boardRect.left - offsetX), boardRect.width - ball.offsetWidth); const top = Math.min(Math.max(26, event.clientY - boardRect.top - offsetY), boardRect.height - ball.offsetHeight); ball.style.left = `${left}px`; ball.style.top = `${top}px`; ball.style.transform = 'none'; });
      ball.addEventListener('pointerup', () => { moving = false; ball.classList.remove('dragging'); });
    });
    showSignal(0);
  }

  const tickets = $('#honor-tickets');
  if (tickets) tickets.innerHTML = data.honors.map((honor, index) => `<article class="honor-ticket ticket-${index + 1}"><span>ARCHIVE<br />NO. 0${index + 1}</span><b>✦</b><p>${html(honor)}</p><i>LI QIAOYING / 2026</i></article>`).join('');

  const contacts = $('#contact-list');
  if (contacts) contacts.innerHTML = `<a href="tel:${html(data.contact.phone)}"><small>PHONE</small>${html(data.contact.phone)}</a><a href="mailto:${html(data.contact.email)}"><small>EMAIL</small>${html(data.contact.email)}</a><a href="${html(data.contact.github)}" target="_blank" rel="noreferrer"><small>GITHUB</small>查看作品源码 ↗</a><a class="resume-button" href="${html(data.contact.resumeUrl)}" download>下载简历 PDF ↓</a>`;
})();
