/*
 * 页面交互区。个人资料、文案、图片、运营内容都集中在 content/site-content.js，
 * 此文件只负责轮播、翻页和页面内导航，不需要改动它即可替换作品内容。
 */
(() => {
  const data = window.portfolioContent;
  if (!data) return;
  const $ = (selector) => document.querySelector(selector);
  const html = (value) => String(value ?? '');

  // 移动端导航与滚动中的当前章节提示。
  const nav = $('.main-nav');
  const navToggle = $('.nav-toggle');
  if (nav && navToggle) navToggle.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(opened));
  });
  document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => nav?.classList.remove('open')));
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  if ('IntersectionObserver' in window) {
    const sections = navLinks.map((link) => $(link.getAttribute('href'))).filter(Boolean);
    const navObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }), { rootMargin: '-40% 0px -52% 0px', threshold: 0 });
    sections.forEach((section) => navObserver.observe(section));
  }

  const profilePhoto = $('#profile-photo');
  if (profilePhoto) profilePhoto.src = data.profilePhoto || profilePhoto.src;

  const skillLines = $('#skill-lines');
  if (skillLines) skillLines.innerHTML = data.skills.map((skill, index) => `<article><span>0${index + 1}</span><b>${html(skill.title)}</b><p>${html(skill.text)}</p></article>`).join('');

  // 扇形时间轴：点其他卡片切换位置，点当前卡片翻到背面。
  const experienceStage = $('#experience-stage');
  const experienceTimeline = $('#experience-timeline');
  const experiencePrev = $('#experience-prev');
  const experienceNext = $('#experience-next');
  if (experienceStage && experienceTimeline && experiencePrev && experienceNext) {
    const items = data.experience?.length ? data.experience : data.education.map((item, index) => ({ ...item, year: item.time, subtitle: '教育经历', image: data.gallery[index]?.image || data.profilePhoto }));
    let activeExperience = 0;
    const relativePosition = (index) => {
      let relative = index - activeExperience;
      if (relative > items.length / 2) relative -= items.length;
      if (relative < -items.length / 2) relative += items.length;
      return relative;
    };
    experienceStage.innerHTML = items.map((item, index) => `<button class="experience-card" type="button" data-index="${index}" aria-label="查看 ${html(item.title)}"><span class="experience-card-inner"><span class="experience-card-face experience-front"><img src="${html(item.image)}" alt="${html(item.title)}"><span><small>${html(item.year)} / ${html(item.subtitle)}</small><b>${html(item.title)}</b></span></span><span class="experience-card-face experience-back"><small>${html(item.year)} / ${html(item.subtitle)}</small><b>${html(item.title)}</b><p>${html(item.description)}</p><em>点击返回正面</em></span></span></button>`).join('');
    experienceTimeline.innerHTML = `<span class="timeline-arc"></span><span class="timeline-hand"></span>${items.map((item, index) => `<button type="button" data-index="${index}"><i></i><span>${html(item.year)}</span></button>`).join('')}`;
    const updateExperience = () => {
      experienceStage.querySelectorAll('.experience-card').forEach((card, index) => {
        const relative = relativePosition(index);
        card.className = `experience-card position-${relative} ${relative === 0 ? 'active' : ''}`;
        if (relative !== 0) card.classList.remove('flipped');
      });
      experienceTimeline.style.setProperty('--timeline-left', `${17 + activeExperience * (66 / Math.max(items.length - 1, 1))}%`);
      experienceTimeline.querySelectorAll('button').forEach((tick, index) => tick.classList.toggle('active', index === activeExperience));
    };
    const moveExperience = (step) => { activeExperience = (activeExperience + step + items.length) % items.length; updateExperience(); };
    experienceStage.querySelectorAll('[data-index]').forEach((card) => card.addEventListener('click', () => {
      const index = Number(card.dataset.index);
      if (index === activeExperience) card.classList.toggle('flipped');
      else { activeExperience = index; updateExperience(); }
    }));
    experienceTimeline.querySelectorAll('button').forEach((tick) => tick.addEventListener('click', () => { activeExperience = Number(tick.dataset.index); updateExperience(); }));
    experiencePrev.addEventListener('click', () => moveExperience(-1));
    experienceNext.addEventListener('click', () => moveExperience(1));
    updateExperience();
  }

  // 文案作品：像翻开一张安静的稿纸，而不是悬浮卡片。
  const writingList = $('#writing-list');
  const writingDetail = $('#writing-detail');
  if (writingList && writingDetail) {
    let activeWriting = 0;
    const showWriting = (index) => {
      activeWriting = index;
      const work = data.works[index];
      writingList.querySelectorAll('button').forEach((button, buttonIndex) => button.classList.toggle('active', buttonIndex === index));
      writingDetail.classList.remove('is-open');
      window.setTimeout(() => {
        writingDetail.innerHTML = `<p class="detail-code">WORK / ${String(index + 1).padStart(2, '0')} · ${html(work.category)}</p><h3>${html(work.title)}</h3><p class="detail-label">${html(work.label)}</p><p class="detail-summary">${html(work.summary)}</p><div class="detail-bottom"><p><b>完成内容</b>${html(work.stats)}</p><p><b>项目注记</b>${html(work.award)}</p><div class="video-slot"><span>▶</span>${html(work.video)}</div></div>`;
        writingDetail.classList.add('is-open');
      }, 80);
    };
    writingList.innerHTML = data.works.map((work, index) => `<button class="${index === 0 ? 'active' : ''}" type="button"><span>${String(index + 1).padStart(2, '0')}</span><b>${html(work.category)}</b><i>↗</i></button>`).join('');
    writingList.querySelectorAll('button').forEach((button, index) => button.addEventListener('click', () => showWriting(index)));
    showWriting(activeWriting);
  }

  // 影像书：包含封面和每一张作品页。左右按钮会触发真实的 3D 翻页过渡。
  const visualBook = $('#visual-book');
  const bookPrev = $('#book-prev');
  const bookNext = $('#book-next');
  const bookDots = $('#book-dots');
  const bookCount = $('#book-count');
  if (visualBook && bookPrev && bookNext && bookDots && bookCount) {
    const pages = [{ cover: true, title: 'Visual\nDiary.', note: '把光、人物和路过的时刻，装订成一本可以慢慢翻的笔记。' }, ...data.gallery];
    let bookPage = 0;
    let bookDirection = 'next';
    const showBook = () => {
      const page = pages[bookPage];
      visualBook.classList.remove('turn-next', 'turn-prev');
      void visualBook.offsetWidth;
      visualBook.classList.add(bookDirection === 'next' ? 'turn-next' : 'turn-prev');
      if (page.cover) {
        visualBook.innerHTML = `<article class="book-cover-page"><p>PORTFOLIO / 2026</p><h3>${page.title.replace('\n', '<br>')}</h3><span>LI QIAOYING</span><i>01</i></article>`;
      } else {
        visualBook.innerHTML = `<article class="book-spread"><div class="book-text-page"><p>PAGE / ${String(bookPage).padStart(2, '0')} · ${html(page.category)}</p><h3>${html(page.title)}</h3><div class="book-rule"></div><p class="book-note">${html(page.note)}</p></div><div class="book-media-page"><img src="${html(page.image)}" alt="${html(page.title)}（可替换图片）"><div class="book-video-slot"><b>▶</b><span>VIDEO SLOT<br />替换为作品视频链接</span></div></div></article>`;
      }
      bookDots.innerHTML = pages.map((_, index) => `<button class="${index === bookPage ? 'active' : ''}" type="button" aria-label="第 ${index + 1} 页" data-page="${index}"></button>`).join('');
      bookDots.querySelectorAll('button').forEach((dot) => dot.addEventListener('click', () => { const target = Number(dot.dataset.page); bookDirection = target > bookPage ? 'next' : 'prev'; bookPage = target; showBook(); }));
      bookCount.textContent = `${String(bookPage + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`;
    };
    bookPrev.addEventListener('click', () => { bookDirection = 'prev'; bookPage = (bookPage - 1 + pages.length) % pages.length; showBook(); });
    bookNext.addEventListener('click', () => { bookDirection = 'next'; bookPage = (bookPage + 1) % pages.length; showBook(); });
    showBook();
  }

  // 运营页：以内容墙为主，指标只在页头保留一行。
  const metrics = $('#metric-strip');
  if (metrics) metrics.innerHTML = data.stats.map((stat) => `<span><b>${html(stat.value)}</b><small>${html(stat.platform)} · ${html(stat.unit)}</small></span>`).join('');
  const socialGrid = $('#social-grid');
  if (socialGrid) {
    const posts = data.socialPosts || [];
    socialGrid.innerHTML = posts.map((post, index) => `<a class="social-post post-${(index % 3) + 1}" href="${html(post.url || '#')}" ${post.url && post.url !== '#' ? 'target="_blank" rel="noreferrer"' : ''}><div class="post-image"><img src="${html(post.image)}" alt="${html(post.title)}（可替换图片）"><span>${html(post.platform)}</span></div><div class="post-copy"><h3>${html(post.title)}</h3><p>${html(post.meta)}</p><b>♥ ${html(post.likes)}</b></div></a>`).join('');
  }

  const honorTickets = $('#honor-tickets');
  if (honorTickets) honorTickets.innerHTML = data.honors.map((honor, index) => `<article><small>ARCHIVE / ${String(index + 1).padStart(2, '0')}</small><i>✦</i><p>${html(honor)}</p><span>LI QIAOYING / 2026</span></article>`).join('');
  const contactList = $('#contact-list');
  if (contactList) contactList.innerHTML = `<a href="tel:${html(data.contact.phone)}"><small>PHONE</small>${html(data.contact.phone)}</a><a href="mailto:${html(data.contact.email)}"><small>EMAIL</small>${html(data.contact.email)}</a><a href="${html(data.contact.github)}" target="_blank" rel="noreferrer"><small>GITHUB</small>查看网站源码 ↗</a><a class="resume" href="${html(data.contact.resumeUrl)}" download>下载简历 PDF ↓</a>`;
})();
