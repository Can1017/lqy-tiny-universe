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
    const album = window.P4_ALBUM;
    if (!album) return;
    const paragraphs = (items) => items.map((item) => `<p>${html(item)}</p>`).join('');
    const treeSvg = `<svg class="album-tree-svg" viewBox="0 0 420 520" aria-hidden="true"><path class="tree-root" d="M211 480C202 415 209 354 202 296M204 420c-43 20-78 36-111 45m115-20c39 18 78 27 117 30"/><path class="tree-trunk" d="M207 472c-6-78 14-131 5-199-5-45-18-86-7-136m8 171c-55-30-94-72-114-124m118 84c51-22 88-62 106-111m-98 39c-5-58 10-101 44-137"/><path class="tree-branch" d="M198 169c-47-10-82-33-107-70m120 74c34-32 70-46 112-46m-63-68c-4-22 7-42 24-58"/></svg>`;
    const awardCards = (start, end) => album.awards.slice(start, end).map((award, index) => `<article class="album-award award-${start + index + 1}"><span>${html(award.year)}</span><b>${html(award.title)}</b><small>${html(award.detail)}</small><i>✦</i></article>`).join('');
    const filmPage = (film) => `<article class="flip-page album-film-page"><div class="album-film-copy"><p>${html(film.eyebrow)}</p><h3>${html(film.title)}</h3><div class="album-film-rule"></div><b>${html(film.summary)}</b><small>${html(film.role)}</small></div><div class="album-film-stills">${film.stills.map((image, index) => `<figure class="still-${index + 1}"><img src="${html(image)}" alt="${html(film.title)}剧照占位 ${index + 1}"><figcaption>STILL / 0${index + 1}</figcaption></figure>`).join('')}</div></article>`;
    const tocItems = [
      { label: '序章 · 我是谁？', target: 1, page: 3 },
      { label: '烟花 · 我如何观察世界', target: 2, page: 4 },
      { label: '扎根 · 文字在心里生根', target: 4, page: 6 },
      { label: '攀登 · 每一步向上', target: 6, page: 8 }
    ];
    const tocButtons = tocItems.map(({ label, target, page }) => `<button type="button" class="album-toc-jump" data-page="${target}"><span>${label}</span><i>········</i><b>P${page}</b></button>`).join('');
    const coverToc = tocItems.map(({ label, page }) => `<p><span>${label}</span><b>P${page}</b></p>`).join('');
    const pages = [
      `<article class="flip-page album-contents-page album-pdf-contents"><p>目录</p><nav>${tocButtons}</nav></article>`,
      `<article class="flip-page album-video-page"><button type="button" class="album-video-frame" aria-label="播放李乔英作品视频"><video class="album-intro-video" poster="${html(album.assets.introVideoPoster)}" playsinline preload="metadata"><source src="${html(album.assets.introVideo)}" type="video/mp4">当前浏览器不支持视频播放。</video><span class="album-video-play" aria-hidden="true">▶</span></button></article>`,
      `<article class="flip-page album-firework-left-page"><img src="${html(album.assets.fireworkMain)}" alt="彩铅烟花"><span>烟花 · 我如何观察世界</span></article>`,
      `<article class="flip-page album-firework-right-page"><img class="firework-scatter" src="${html(album.assets.fireworkScatter)}" alt="散开的烟花"><img class="firework-haze" src="${html(album.assets.fireworkHaze)}" alt="淡色烟花光晕"></article>`,
      `<article class="flip-page album-leaves-page"><img src="${html(album.assets.leafNotes)}" alt="写着随笔的三片树叶"></article>`,
      `<article class="flip-page album-bare-tree-page"><img src="${html(album.assets.bareTree)}" alt="枯树与飞鸟"></article>`,
      `<article class="flip-page album-blank-page" aria-label="留白页"></article>`,
      `<article class="flip-page album-photo-pair-page"><div><img src="${html(album.assets.seaSilhouette)}" alt="海边张开双臂的人物剪影"><img src="${html(album.assets.groupSilhouette)}" alt="举起手的人群剪影"></div></article>`,
      `<article class="flip-page album-portrait-page"><img src="${html(album.assets.portraitNight)}" alt="夜景黑白人像"></article>`,
      `<article class="flip-page album-portraits-page"><img src="${html(album.assets.portraitSign)}" alt="黑白人像手势照"><img src="${html(album.assets.portraitPose)}" alt="黑白人像姿态照"></article>`
    ];
    visualBook.innerHTML = pages.join('');
    const PageFlip = window.St?.PageFlip;
    if (PageFlip) {
      const bookStage = visualBook.closest('.book-stage');
      // 内页只由 PageFlip 管理。正反封面另用原生双面硬封面，彻底避免库在封面动画时预绘相邻内容。
      const book = new PageFlip(visualBook, { width: 440, height: 622, size: 'stretch', minWidth: 240, maxWidth: 480, minHeight: 339, maxHeight: 678, showCover: false, maxShadowOpacity: .22, mobileScrollSupport: false, useMouseEvents: true, flippingTime: 960 });
      book.loadFromHTML(visualBook.querySelectorAll('.flip-page'));
      const totalBookPages = pages.length + 2;
      const lastInnerPage = pages.length - 2;
      // 封面比内页稍慢：先看到封面翻动，再自然露出左右两张真实内页。
      const coverDuration = 960;
      let coverState = 'front-closed';
      let coverTimer = null;
      let innerBookTimer = null;

      if (bookStage) {
        bookStage.querySelector('.book-cover-layer')?.remove();
        const coverLayer = document.createElement('div');
        coverLayer.className = 'book-cover-layer';
        coverLayer.setAttribute('aria-hidden', 'true');
        coverLayer.innerHTML = `
          <div class="book-cover-slab book-front-slab">
            <section class="book-cover-face book-cover-outer"><p>PORTFOLIO / 2026</p><h3>Visual<br />Diary.</h3><span>一册关于光、镜头与正在发生的故事</span></section>
            <section class="book-cover-face book-cover-inner book-cover-toc"><p>目录</p><div>${coverToc}</div></section>
          </div>
          <div class="book-cover-slab book-back-slab">
            <section class="book-cover-face book-cover-outer book-back-outer"><p>END OF VISUAL DIARY</p><span>LQY / 2026</span></section>
            <section class="book-cover-face book-cover-inner book-cover-last"><p>最后一页 · 仍在发生</p><div><img src="${html(album.assets.portraitSign)}" alt=""><img src="${html(album.assets.portraitPose)}" alt=""></div></section>
          </div>`;
        bookStage.appendChild(coverLayer);
      }

      const updateBookStatus = (page) => {
        bookCount.textContent = `${String(page + 2).padStart(2, '0')} / ${String(totalBookPages).padStart(2, '0')}`;
        bookDots.innerHTML = Array.from({ length: pages.length }, (_, index) => `<button type="button" data-page="${index}" class="${page === index ? 'active' : ''}" aria-label="跳至画册第 ${index + 2} 页"></button>`).join('');
        bookDots.querySelectorAll('button').forEach((dot) => dot.addEventListener('click', () => book.turnToPage(Number(dot.dataset.page))));
      };
      const updateClosedStatus = (side) => {
        bookDots.innerHTML = '';
        bookCount.textContent = side === 'front'
          ? `01 / ${String(totalBookPages).padStart(2, '0')}`
          : `${String(totalBookPages).padStart(2, '0')} / ${String(totalBookPages).padStart(2, '0')}`;
      };
      const showInnerBook = (delay = 0) => {
        window.clearTimeout(innerBookTimer);
        innerBookTimer = window.setTimeout(() => {
          visualBook.classList.remove('cover-book-hidden');
          visualBook.setAttribute('aria-hidden', 'false');
        }, delay);
      };
      const hideInnerBook = (delay = 0) => {
        window.clearTimeout(innerBookTimer);
        innerBookTimer = window.setTimeout(() => {
          visualBook.classList.add('cover-book-hidden');
          visualBook.setAttribute('aria-hidden', 'true');
        }, delay);
      };
      const setCoverState = (nextState) => {
        coverState = nextState;
        if (!bookStage) return;
        const classes = ['cover-front-closed', 'cover-front-opening', 'cover-front-closing-prepare', 'cover-front-closing', 'cover-back-closed', 'cover-back-opening', 'cover-back-closing-prepare', 'cover-back-closing', 'cover-open'];
        bookStage.classList.remove(...classes);
        bookStage.classList.add(`cover-${nextState}`);
        const isTransition = nextState.includes('opening') || nextState.includes('closing');
        bookPrev.disabled = isTransition || nextState === 'front-closed';
        bookNext.disabled = isTransition || nextState === 'back-closed';
        if (nextState === 'front-closed') updateClosedStatus('front');
        if (nextState === 'back-closed') updateClosedStatus('back');
      };
      const finishCoverTransition = (nextState, page) => {
        window.clearTimeout(coverTimer);
        coverTimer = window.setTimeout(() => {
          if (page !== null) book.turnToPage(page);
          setCoverState(nextState);
          if (nextState === 'open') updateBookStatus(book.getCurrentPageIndex());
        }, coverDuration);
      };
      const openFrontCover = () => {
        if (coverState !== 'front-closed') return;
        book.turnToPage(0);
        setCoverState('front-opening');
        // 翻到约三分之一时露出真实跨页，右页不会在封面落下后才突然出现。
        showInnerBook(Math.round(coverDuration * .34));
        finishCoverTransition('open', 0);
      };
      const closeFrontCover = () => {
        if (coverState !== 'open' || book.getCurrentPageIndex() !== 0) return;
        setCoverState('front-closing-prepare');
        requestAnimationFrame(() => setCoverState('front-closing'));
        // 保留内页到封面基本合拢，避免闭合时出现空白断层。
        hideInnerBook(Math.round(coverDuration * .82));
        finishCoverTransition('front-closed', null);
      };
      const openBackCover = () => {
        if (coverState !== 'back-closed') return;
        book.turnToPage(lastInnerPage);
        setCoverState('back-opening');
        showInnerBook(Math.round(coverDuration * .34));
        finishCoverTransition('open', lastInnerPage);
      };
      const closeBackCover = () => {
        if (coverState !== 'open' || book.getCurrentPageIndex() !== lastInnerPage) return;
        setCoverState('back-closing-prepare');
        requestAnimationFrame(() => setCoverState('back-closing'));
        hideInnerBook(Math.round(coverDuration * .82));
        finishCoverTransition('back-closed', null);
      };
      // 目录和视频属于页面内交互，不能把鼠标/触摸事件继续交给翻页器。
      const protectPageInteraction = (element) => {
        if (!element) return;
        ['pointerdown', 'mousedown', 'touchstart', 'pointerup', 'mouseup', 'touchend'].forEach((type) => {
          element.addEventListener(type, (event) => event.stopPropagation(), { passive: true });
        });
      };
      book.on('flip', (event) => updateBookStatus(event.data));
      book.on('changeState', (event) => {
        if (!bookStage) return;
        bookStage.classList.toggle('is-inner-turning', event.data === 'flipping');
      });
      bookPrev.addEventListener('click', () => {
        if (coverState === 'back-closed') return openBackCover();
        if (coverState !== 'open') return;
        if (book.getCurrentPageIndex() === 0) return closeFrontCover();
        book.flipPrev('top');
      });
      bookNext.addEventListener('click', () => {
        if (coverState === 'front-closed') return openFrontCover();
        if (coverState !== 'open') return;
        if (book.getCurrentPageIndex() === lastInnerPage) return closeBackCover();
        book.flipNext('top');
      });
      // 预览状态不显示浏览器控制条；点击后才播放并交给原生控件处理。
      const videoFrame = visualBook.querySelector('.album-video-frame');
      protectPageInteraction(videoFrame);
      videoFrame?.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const frame = event.currentTarget;
        const video = frame.querySelector('.album-intro-video');
        if (!video) return;
        frame.classList.add('is-playing');
        video.controls = true;
        try {
          await video.play();
        } catch (_) {
          // 浏览器若阻止播放，仍保留原生播放控件供用户再次操作。
        }
      });
      visualBook.querySelectorAll('.album-toc-jump').forEach((button) => {
        protectPageInteraction(button);
        button.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          // turnToPage 是无翻页动画的定位跳转；目录仅更新到目标页。
          book.turnToPage(Number(button.dataset.page));
        });
      });
      hideInnerBook();
      setCoverState('front-closed');
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
