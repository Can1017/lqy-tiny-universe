/*
 * 内容编辑区：后续只需修改这个文件，就能替换个人信息、图片、作品和奖项。
 * 图片路径可以是本地路径（例如 assets/images/profile.jpg）或网络图片链接。
 */
window.portfolioContent = {
  profilePhoto: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85',
  education: [
    { time: '2022 — 2026', title: '会计学 · 本科', description: '打下扎实的商业理解、数据敏感度与项目执行基础。' },
    { time: '2024 — 2026', title: '智能媒体技术 · 微专业', description: '系统学习短视频制作、新媒体传播与数字内容创作。' }
  ],
  skills: [
    { icon: '🎬', title: '视频摄制', text: '选题、分镜、现场执行、剪辑节奏与成片把控。' },
    { icon: '✍️', title: '脚本文案', text: '从传播目标出发，完成创意、脚本、标题与口播文案。' },
    { icon: '🎨', title: '视觉设计', text: '公众号排版、封面设计、图片二创与内容视觉统一。' },
    { icon: '📈', title: '数据运营', text: '多平台发布、数据追踪、内容复盘与迭代优化。' }
  ],
  works: [
    { category: '微电影脚本', title: '《把晚风寄给你》', label: '情感叙事 · 微电影脚本', summary: '以一段未寄出的语音为线索，串联毕业季里三位好友的告别与成长。', stats: '完整剧本 / 分镜脚本 / 角色小传', award: '作品信息待补充', video: '视频作品占位框' },
    { category: 'AI短视频脚本', title: '《一分钟，看见非遗的新表情》', label: 'AIGC 创意 · 短视频脚本', summary: '以“传统纹样进入当代生活”为创意核心，设计快节奏镜头与 AI 视觉转场。', stats: '60 秒脚本 / 8 个镜头段落 / 多版本标题', award: '作品信息待补充', video: '视频作品占位框' },
    { category: '公众号推文', title: '《把校园的春天装进一封信》', label: '校园传播 · 公众号推文', summary: '围绕校园春日活动策划专题推文，用人物细节与轻量互动提升阅读停留。', stats: '选题策划 / 图文排版 / 标题 AB 测试', award: '阅读数据待补充', video: '图文长页占位框' },
    { category: '省级官媒宣传稿', title: '《青春在基层的回响》', label: '三下乡 · 省级官媒宣传稿', summary: '以团队服务故事为主线，完成采访梳理、文字撰写与对外传播素材整理。', stats: '采访整理 / 宣传稿撰写 / 多平台分发', award: '省级发布信息待补充', video: '新闻稿页面占位框' }
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
  honors: [
    '短视频竞赛｜奖项名称待补充 01', '短视频竞赛｜奖项名称待补充 02', '短视频竞赛｜奖项名称待补充 03',
    '短视频竞赛｜奖项名称待补充 04', '省级三下乡｜奖项名称待补充 01', '省级三下乡｜奖项名称待补充 02'
  ],
  contact: { phone: '15115983171', email: '2898642795@qq.com', github: 'https://github.com/Can1017/lqy-tiny-universe', resumeUrl: 'assets/resume/李乔英-校招短视频编导-简历.pdf' }
};
