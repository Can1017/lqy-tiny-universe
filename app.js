/*
 * 页面交互区。个人资料、文案、图片、运营内容都集中在 content/site-content.js，
 * 此文件只负责轮播、翻页和页面内导航，不需要改动它即可替换作品内容。
 */
(() => {
  const data = window.portfolioContent;
  if (!data) return;
  const $ = (selector) => document.querySelector(selector);
  const html = (value) => String(value ?? '');
  // 内容区允许用换行分隔标题，例如学校名称与专业。
  const withBreaks = (value) => html(value).replace(/\n/g, '<br />');

  // P3 图片放大预览：点击背景、关闭按钮或按 Esc 均可退出。
  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.hidden = true;
  lightbox.innerHTML = '<button type="button" class="image-lightbox-close" aria-label="关闭图片预览">×</button><img class="image-lightbox-photo" alt="">';
  document.body.appendChild(lightbox);
  const lightboxPhoto = lightbox.querySelector('.image-lightbox-photo');
  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
  };
  const openLightbox = (src, alt) => {
    lightboxPhoto.src = src;
    lightboxPhoto.alt = alt;
    lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    lightbox.querySelector('.image-lightbox-close').focus();
  };
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target.closest('.image-lightbox-close')) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

  // 移动端导航与滚动中的当前章节提示。
  const nav = $('.main-nav');
  const navToggle = $('.nav-toggle');
  if (nav && navToggle) navToggle.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(opened));
  });
  const navLinks = [...document.querySelectorAll('.main-nav a')];
    const siteHeader = $('.site-header');
    const syncHeaderTransparency = () => siteHeader?.classList.toggle('is-scrolled', window.scrollY > 24);
    window.addEventListener('scroll', syncHeaderTransparency, { passive: true });
    syncHeaderTransparency();
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
    // 从扇形中间的卡开始；整组只向左/右顺序旋转，不循环跳回另一侧。
    let activeExperience = Math.min(2, items.length - 1);
    const relativePosition = (index) => {
      return index - activeExperience;
    };
    experienceStage.innerHTML = items.map((item, index) => `<button class="experience-card" type="button" data-index="${index}" aria-label="查看 ${html(item.title)}"><span class="experience-card-inner"><span class="experience-card-face experience-front"><img src="${html(item.image)}" alt="${html(item.title)}"><span><small>${html(item.year)} / ${html(item.subtitle)}</small><b>${withBreaks(item.title)}</b></span></span><span class="experience-card-face experience-back"><small>${html(item.year)} / ${html(item.subtitle)}</small><b>${withBreaks(item.title)}</b><p>${html(item.description).replace(/\n/g, '<br />')}</p></span></span></button>`).join('');
    // 每个年份都沿同一段圆弧等间距排布；切换时整组刻度绕固定指针移动。
    experienceTimeline.innerHTML = `<span class="timeline-arc"></span><span class="timeline-hand"></span><span class="timeline-track">${items.map((item, index) => `<button type="button" data-index="${index}"><i></i><span>${html(item.year)}</span></button>`).join('')}</span>`;
    const positionTimelineTicks = () => {
      const width = experienceTimeline.getBoundingClientRect().width;
      // 半径比容器宽一些，截出一段舒展的上圆弧（而非圆角矩形）。
        const radius = Math.max(width * 0.66, 390);
      const centerX = width / 2;
      // 固定间距的四个刻度像同一只转盘一起转动，不在切换时交换左右位置。
      const step = 13 * Math.PI / 180;
        const dialTop = width < 500 ? 30 : 48;
      experienceTimeline.style.setProperty('--dial-diameter', `${radius * 2}px`);
      experienceTimeline.style.setProperty('--dial-top', `${dialTop}px`);
      experienceTimeline.querySelectorAll('.timeline-track button').forEach((tick, index) => {
        const offset = index - activeExperience;
        const angle = offset * step;
        // angle=0 永远是指针正上方，其他年份以相等角度分布在弧线上。
        tick.style.setProperty('--tick-x', `${centerX + radius * Math.sin(angle)}px`);
        tick.style.setProperty('--tick-y', `${dialTop + radius - radius * Math.cos(angle)}px`);
      });
    };
    const updateExperience = () => {
      experienceStage.querySelectorAll('.experience-card').forEach((card, index) => {
        const relative = relativePosition(index);
        card.className = `experience-card position-${relative} ${relative === 0 ? 'active' : ''}`;
        if (relative !== 0) card.classList.remove('flipped');
      });
      positionTimelineTicks();
      experienceTimeline.querySelectorAll('.timeline-track button').forEach((tick, index) => tick.classList.toggle('active', index === activeExperience));
      experiencePrev.disabled = activeExperience === 0;
      experienceNext.disabled = activeExperience === items.length - 1;
    };
    const moveExperience = (step) => {
      activeExperience = Math.max(0, Math.min(items.length - 1, activeExperience + step));
      updateExperience();
    };
    experienceStage.querySelectorAll('[data-index]').forEach((card) => card.addEventListener('click', () => {
      const index = Number(card.dataset.index);
      if (index === activeExperience) card.classList.toggle('flipped');
      else { activeExperience = index; updateExperience(); }
    }));
    experienceTimeline.querySelectorAll('.timeline-track button').forEach((tick) => tick.addEventListener('click', () => { activeExperience = Number(tick.dataset.index); updateExperience(); }));
    experiencePrev.addEventListener('click', () => moveExperience(-1));
    experienceNext.addEventListener('click', () => moveExperience(1));
    window.addEventListener('resize', positionTimelineTicks);
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
        const story = Array.isArray(work.story) && work.story.length
          ? `<div class="detail-story">${work.story.map((paragraph) => `<p>${html(paragraph)}</p>`).join('')}</div>`
          : '';
        const idea = work.idea
          ? `<aside class="detail-note"><b>创作想法</b><p>${html(work.idea)}</p></aside>`
          : '';
        const workImage = window.p3WorkMedia?.[index];
        const videoPreviewTime = index === 1 ? 1 : .1;
        const media = work.videoSrc
          ? `<div class="work-media-card work-video-card"><video class="work-video-preview" data-preview-time="${videoPreviewTime}" preload="metadata" playsinline><source src="${html(work.videoSrc)}" type="video/mp4">当前浏览器暂不支持视频播放。</video><button class="work-video-play work-media-action" type="button" aria-label="播放${html(work.title)}"><i>▶</i><span>点击播放</span></button></div>`
          : workImage
            ? `<button class="work-media-card work-image-button" type="button" data-lightbox-src="${html(workImage.src)}" data-lightbox-alt="${html(workImage.alt)}" aria-label="放大查看${html(workImage.alt)}"><img src="${html(workImage.src)}" alt="${html(workImage.alt)}"><span class="work-media-action">点击放大 ↗</span></button>`
            : `<div class="video-slot"><span>▶</span>${html(work.video)}</div>`;
        writingDetail.innerHTML = `<p class="detail-code">WORK / ${String(index + 1).padStart(2, '0')} · ${html(work.category)}</p><h3>${html(work.title)}</h3><div class="detail-copy"><p class="detail-label">${html(work.label)}</p><p class="detail-summary">${html(work.summary)}</p>${story}${idea}</div><div class="detail-bottom"><div class="detail-meta"><p><b>完成内容</b>${html(work.stats)}</p><p><b>项目注记</b>${html(work.award)}</p></div>${media}</div>`;
        writingDetail.querySelector('.work-image-button')?.addEventListener('click', (event) => {
          const button = event.currentTarget;
          openLightbox(button.dataset.lightboxSrc, button.dataset.lightboxAlt);
        });
        writingDetail.querySelector('.work-video-play')?.addEventListener('click', async (event) => {
          const card = event.currentTarget.closest('.work-video-card');
          const video = card.querySelector('.work-video-preview');
          card.classList.add('is-playing');
          video.controls = true;
          video.currentTime = 0;
          try { await video.play(); }
          catch (_) { card.classList.remove('is-playing'); video.controls = false; }
        });
        const previewVideo = writingDetail.querySelector('.work-video-preview');
        if (previewVideo) {
          const seekToPreview = () => { previewVideo.currentTime = Number(previewVideo.dataset.previewTime || .1); };
          if (previewVideo.readyState >= 1) seekToPreview();
          else previewVideo.addEventListener('loadedmetadata', seekToPreview, { once: true });
        }
        writingDetail.classList.add('is-open');
      }, 80);
    };
    writingList.innerHTML = data.works.map((work, index) => `<button class="${index === 0 ? 'active' : ''}" type="button"><span>${String(index + 1).padStart(2, '0')}</span><b>${html(work.category)}</b><i>↗</i></button>`).join('');
    writingList.querySelectorAll('button').forEach((button, index) => button.addEventListener('click', () => showWriting(index)));
    showWriting(activeWriting);
  }

  // 影像书：StPageFlip 负责真实的双页、硬封面与纸页翻动。
  const visualBook = $('#visual-book');
  const bookPrev = $('#book-prev');
  const bookNext = $('#book-next');
  const bookDots = $('#book-dots');
  const bookCount = $('#book-count');
  if (visualBook && bookPrev && bookNext && bookDots && bookCount) {
    const galleryPages = data.gallery;
    const pages = [
      `<article class="flip-page flip-cover" data-density="hard"><p>PORTFOLIO / 2026</p><h3>Visual<br />Diary.</h3><span>一册关于光、镜头与正在发生的故事</span></article>`,
      ...galleryPages.flatMap((page, index) => {
        // 图片路径留在 content/site-content.js；没有图片时呈现不裁切的版式占位页。
        const artwork = page.image
          ? `<img src="${html(page.image)}" alt="${html(page.title)}（可替换图片）">`
          : `<div class="visual-placeholder" aria-label="${html(page.placeholder || '图文版式待补充')}"><small>VISUAL DIARY</small><strong>${html(page.placeholder || '图文版式待补充').replace(/\n/g, '<br />')}</strong><i>replace in content/site-content.js</i></div>`;
        return [
          `<article class="flip-page flip-copy-page"><p>PAGE / ${String(index + 1).padStart(2, '0')} · ${html(page.category)}</p><h3>${html(page.title)}</h3><div></div><b>${html(page.note)}</b></article>`,
          `<article class="flip-page flip-media-page">${artwork}<span>${html(page.mediaLabel || '图文长页 · 待补充链接')}</span></article>`
        ];
      }),
      `<article class="flip-page flip-back-cover" data-density="hard"><p>END OF VISUAL DIARY</p><span>LQY / 2026</span></article>`
    ];
    visualBook.innerHTML = pages.join('');
    const PageFlip = window.St?.PageFlip;
    if (PageFlip) {
      const bookStage = visualBook.closest('.book-stage');
      // 一页书的竖向比例，容器两侧为翻页按钮保留独立空间。
      // A4 竖版比例（1 : √2），电脑与手机缩放时都保持同一页型。
      const book = new PageFlip(visualBook, { width: 380, height: 537, size: 'stretch', minWidth: 240, maxWidth: 420, minHeight: 339, maxHeight: 594, showCover: true, maxShadowOpacity: .22, mobileScrollSupport: false, useMouseEvents: true, flippingTime: 980 });
      book.loadFromHTML(visualBook.querySelectorAll('.flip-page'));
      let bookOffset = null;
      let bookShiftFrame = null;
      const offsetForPage = (page) => {
        if (!window.matchMedia('(min-width: 761px)').matches) return 0;
        const quarterWidth = visualBook.clientWidth * .25;
        if (page === 0) return -quarterWidth;
        if (page === pages.length - 1) return quarterWidth;
        return 0;
      };
      const positionBook = (page, animate = false) => {
        const target = offsetForPage(page);
        const from = bookOffset ?? target;
        if (bookShiftFrame !== null) cancelAnimationFrame(bookShiftFrame);
        if (!animate || Math.abs(target - from) < 1) {
          bookOffset = target;
          visualBook.style.setProperty('transform', `translate3d(${target}px,0,0)`, 'important');
          return;
        }
        const startedAt = performance.now();
        const duration = 800;
        const step = (now) => {
          const progress = Math.min(1, (now - startedAt) / duration);
          // smoothstep：起步与收尾都柔和，中段保持连续移动，接近 PPT 平滑切换。
          const eased = progress * progress * (3 - 2 * progress);
          bookOffset = from + (target - from) * eased;
          visualBook.style.setProperty('transform', `translate3d(${bookOffset}px,0,0)`, 'important');
          if (progress < 1) bookShiftFrame = requestAnimationFrame(step);
          else bookShiftFrame = null;
        };
        bookShiftFrame = requestAnimationFrame(step);
      };
      const updateBookMode = (page, animate = false) => {
        if (!bookStage) return;
        bookStage.classList.toggle('is-front-cover', page === 0);
        bookStage.classList.toggle('is-back-cover', page === pages.length - 1);
        bookStage.classList.toggle('is-open-book', page > 0 && page < pages.length - 1);
        positionBook(page, animate);
      };
      const updateBookStatus = (page) => {
        bookCount.textContent = `${String(page + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`;
        bookDots.innerHTML = galleryPages.map((_, index) => `<i class="${page === index * 2 + 1 || page === index * 2 + 2 ? 'active' : ''}"></i>`).join('');
      };
      book.on('flip', (event) => updateBookStatus(event.data));
      book.on('changeState', (event) => {
        if (!bookStage) return;
        bookStage.classList.toggle('is-turning', event.data === 'flipping');
        if (event.data === 'read') updateBookMode(book.getCurrentPageIndex(), true);
      });
      bookPrev.addEventListener('click', () => book.flipPrev('top'));
      bookNext.addEventListener('click', () => book.flipNext('top'));
      updateBookStatus(0);
      updateBookMode(0);
      window.addEventListener('resize', () => {
        bookOffset = null;
        positionBook(book.getCurrentPageIndex());
      }, { passive: true });
    } else {
      visualBook.innerHTML = '<p class="book-fallback">影像书正在加载，请稍后刷新页面。</p>';
    }
  }

  // 运营页：以多平台手机样机呈现，文章链接与样机素材均在 content/p5-posts.js 中维护。
  const metrics = $('#metric-strip');
  if (metrics) metrics.innerHTML = data.stats.map((stat) => `<span><b>${html(stat.value)}</b><small>${html(stat.platform)} · ${html(stat.unit)}</small></span>`).join('');
  const socialGrid = $('#social-grid');
  if (socialGrid) {
    const screens = window.P5_PHONE_SCREENS || [];
    socialGrid.style.setProperty('--phone-count', String(screens.length));
    socialGrid.innerHTML = screens.map((screen, index) => `<button class="social-phone social-phone-${index + 1}" type="button" style="--phone-index:${index}" aria-label="放大查看：${html(screen.alt)}"><img src="${html(screen.image)}" alt="${html(screen.alt)}"></button>`).join('');
    socialGrid.querySelectorAll('.social-phone').forEach((phone) => phone.addEventListener('click', () => {
      const image = phone.querySelector('img');
      openLightbox(image.currentSrc || image.src, image.alt);
    }));
    // 样机数量增减后自动判断：放得下时居中，超出时从左侧横向滚动。
    const syncPhoneLayout = () => {
      const needsScroll = socialGrid.scrollWidth > socialGrid.clientWidth + 1;
      socialGrid.classList.toggle('is-scrollable', needsScroll);
      socialGrid.classList.toggle('is-centered', !needsScroll);
    };
    requestAnimationFrame(syncPhoneLayout);
    window.addEventListener('resize', syncPhoneLayout, { passive: true });
    const socialLinks = $('#social-links');
    const posts = window.P5_POSTS || [];
    if (socialLinks) socialLinks.innerHTML = posts.map((post) => `<a href="${html(post.url)}" target="_blank" rel="noreferrer"><span>${html(post.platform)}</span>${html(post.action || '阅读全文')} <b>↗</b></a>`).join('');
    if ('IntersectionObserver' in window) {
      const phoneObserver = new IntersectionObserver((entries, observer) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in-view');
        observer.unobserve(entry.target);
      }), { threshold: .18 });
      phoneObserver.observe(socialGrid);
    } else socialGrid.classList.add('is-in-view');
  }

  const honorTickets = $('#honor-tickets');
  if (honorTickets) honorTickets.innerHTML = data.honors.map((honor, index) => `<article><small>ARCHIVE / ${String(index + 1).padStart(2, '0')}</small><i>✦</i><p>${html(honor)}</p><span>LI QIAOYING / 2026</span></article>`).join('');
  const contactList = $('#contact-list');
  if (contactList) contactList.innerHTML = `<a href="tel:${html(data.contact.phone)}"><small>PHONE</small>${html(data.contact.phone)}</a><a href="mailto:${html(data.contact.email)}"><small>EMAIL</small>${html(data.contact.email)}</a><a href="${html(data.contact.github)}" target="_blank" rel="noreferrer"><small>GITHUB</small>查看网站源码 ↗</a><a class="resume" href="${html(data.contact.resumeUrl)}" download>下载简历 PDF ↓</a>`;
})();
