/*
 * 内容编辑区：后续只需修改这个文件，就能替换个人信息、图片、作品和奖项。
 * 图片路径可以是本地路径（例如 assets/images/profile.jpg）或网络图片链接。
 */
window.portfolioContent = {
    // 首页右侧个人照片：替换此路径即可更新。
    profilePhoto: 'assets/images/lqy-profile-photo.jpg',
  education: [
    { time: '2022 — 2026', title: '会计学 · 本科', description: '打下扎实的商业理解、数据敏感度与项目执行基础。' },
    { time: '2024 — 2026', title: '智能媒体技术 · 微专业', description: '系统学习短视频制作、新媒体传播与数字内容创作。' }
  ],
  // 首页经历时间轴：可替换图片、年份和说明。
  experience: [
    { year: '2023', title: '湖南信息学院', subtitle: '学习与创作的起点', description: '从这里开始把所学带进真实项目，也慢慢找到关于内容的方向。', image: 'assets/images/experience-school.jpg' },
    { year: '2024', title: '智能媒体技术 · 微专业', subtitle: '开始用镜头表达', description: '系统学习短视频制作、新媒体传播与数字内容创作，把“想讲什么”落到镜头里。微专业成绩排名前 10%，获学校全额修读费用奖励。', image: 'assets/images/experience-studio.jpg' },
    { year: '2025', title: '内容运营与项目实践', subtitle: '让内容走向真实的人', description: '项目一：AI 内容创作与视觉制作\n项目二：短视频创作与竞赛项目\n项目三：社会实践全媒体宣传。', image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=900&q=85' },
    { year: '2026', title: '个人技能介绍', subtitle: '下一段故事，正在开始', description: '文案编辑、现场拍摄、视频剪辑与平台运营，也在持续扩展新的表达方式。', image: 'assets/images/experience-camera.jpg' }
  ],
  skills: [
    { icon: '✍️', title: '文案编辑', text: '把模糊情绪拆成可共鸣的标题、口播与叙事线。' },
    { icon: '◉', title: '现场拍摄', text: '在真实场景中捕捉人、光和情绪，完成镜头调度与执行。' },
    { icon: '✂', title: '视频剪辑', text: '用节奏、声音和留白，把素材剪成真正能抵达人的成片。' },
    { icon: '⌁', title: '平台运营', text: '根据平台反馈复盘选题、标题与内容节奏，让作品被看见。' }
  ],
  works: [
    { category: 'Ai短视频制作', title: '《一分钟，看见非遗的新表情》', label: 'AIGC 创意 · 短视频制作', summary: '以“传统纹样进入当代生活”为创意核心，设计快节奏镜头与 AI 视觉转场。', stats: '60 秒脚本 / 8 个镜头段落 / 多版本标题', award: '作品信息待补充', videoSrc: 'assets/videos/ai-short-video.mp4' },
    { category: '微电影制作', title: '《把晚风寄给你》', label: '情感叙事 · 微电影制作', summary: '我总会记住告别时没有说出口的话。于是用一段未寄出的语音，串联毕业季里三位好友的告别与成长。', stats: '完整剧本 / 分镜脚本 / 角色小传', award: '作品信息待补充', videoSrc: 'assets/videos/micro-film.mp4' },
    { category: '公众号推文', title: '《把校园的春天装进一封信》', label: '校园传播 · 公众号推文', summary: '春天不是一个抽象的词：是树影落在信纸上、是路过的人停了一秒。围绕这些细节，写成一封可以被打开的校园来信。', stats: '选题策划 / 图文排版 / 标题 AB 测试', award: '阅读数据待补充', video: '图文长页占位框' },
    { category: '省级报道新闻稿', title: '《青春在基层的回响》', label: '三下乡 · 省级报道新闻稿', summary: '以团队服务故事为主线，完成采访梳理、文字撰写与对外传播素材整理。', stats: '采访整理 / 新闻稿撰写 / 多平台分发', award: '省级发布信息待补充', video: '新闻稿页面占位框' }
  ],
  gallery: [
    { category: '公众号排版', title: '春日校园专题排版', note: '用奶油白、浅绿与留白营造轻盈阅读节奏。', image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=85' },
    { category: '公众号排版', title: '活动回顾视觉模板', note: '以清晰的信息层级，让活动内容更易于被快速浏览。', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=85' },
    { category: '人像实拍', title: '傍晚的人像练习', note: '利用窗边自然光和低饱和色彩，记录放松而真实的状态。', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85' },
    { category: '人像实拍', title: '校园人物采访肖像', note: '让人物在熟悉的场景中说话，画面也成为故事的一部分。', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85' },
    { category: '风景文创二创', title: '城市散步视觉二创', note: '提取城市色块和建筑线条，延展为适合社媒传播的视觉素材。', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=900&q=85' },
    { category: '风景文创二创', title: '山野主题海报实验', note: '用远景留白承托标题，使风景成为情绪而非单纯背景。', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85' }
  ],
  stats: [
    { platform: '抖音', value: '9,999', unit: '单条播放', percent: 100, color: '#4298E0' },
    { platform: '视频号', value: '8,000+', unit: '总播放', percent: 80, color: '#8CC7F4' },
    { platform: '公众号', value: '11.7w', unit: '总阅读', percent: 92, color: '#A9A0E8' },
    { platform: '三下乡', value: '10.2w', unit: '总曝光', percent: 86, color: '#F3A7BD' }
  ],
  // 运营页内容墙。替换 url 后，卡片会跳转到对应的真实笔记、文章或视频。
  socialPosts: [
    { platform: '抖音', title: '一分钟，看见非遗的新表情', meta: 'AI 短视频脚本 · 单条 9,999 播放', likes: '9,999 播放', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=85', url: '#' },
    { platform: '公众号', title: '把校园的春天装进一封信', meta: '校园传播 · 专题推文', likes: '11.7w 阅读', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=85', url: '#' },
    { platform: '视频号', title: '毕业季，留给镜头的一句话', meta: '人物采访 · 视频号内容', likes: '8,000+ 播放', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85', url: '#' },
    { platform: '省级官媒', title: '青春在基层的回响', meta: '三下乡 · 宣传稿与多平台分发', likes: '10.2w 曝光', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85', url: '#' },
    { platform: '小红书', title: '在镜头里收集校园的光', meta: '图片创意 · 日常视觉记录', likes: '内容链接待替换', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85', url: '#' },
    { platform: '公众号', title: '活动回顾，不只是一篇总结', meta: '图文排版 · 信息层级设计', likes: '作品链接待替换', image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=85', url: '#' }
  ],
  honors: [
    '短视频竞赛｜奖项名称待补充 01', '短视频竞赛｜奖项名称待补充 02', '短视频竞赛｜奖项名称待补充 03',
    '短视频竞赛｜奖项名称待补充 04', '省级三下乡｜奖项名称待补充 01', '省级三下乡｜奖项名称待补充 02'
  ],
  contact: { phone: '15115983171', email: '2898642795@qq.com', github: 'https://github.com/Can1017/lqy-tiny-universe', resumeUrl: 'assets/resume/李乔英-校招短视频编导-简历.pdf' }
};
