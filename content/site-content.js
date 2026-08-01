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
    { year: '2023', title: '湖南信息学院\n会计学 · 本科', subtitle: '学习与创作的起点', description: '从这里开始把所学带进真实项目，也慢慢找到关于内容的方向。', image: 'assets/images/experience-school.jpg' },
    { year: '2024', title: '智媒运营与传播', subtitle: '开始用镜头表达', description: '系统学习短视频制作、新媒体传播与数字内容创作，把“想讲什么”落到镜头里。微专业成绩排名前 10%，获学校全额修读费用奖励。', image: 'assets/images/experience-studio.jpg' },
    { year: '2025', title: '内容运营与项目实践', subtitle: '让内容走向真实的人', description: '项目一：AI 内容创作与视觉制作\n项目二：短视频创作与竞赛项目\n项目三：社会实践全媒体宣传', image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=900&q=85' },
    { year: '2026', title: '个人技能介绍', subtitle: '下一段故事，正在开始', description: '文案编辑、现场拍摄、视频剪辑与平台运营，也在持续扩展新的表达方式。', image: 'assets/images/experience-camera.jpg' }
  ],
  skills: [
    { icon: '✍️', title: '文案编辑', text: '把模糊情绪拆成可共鸣的标题、口播与叙事线。' },
    { icon: '◉', title: '现场拍摄', text: '在真实场景中捕捉人、光和情绪，完成镜头调度与执行。' },
    { icon: '✂', title: '视频剪辑', text: '用节奏、声音和留白，把素材剪成真正能抵达人的成片。' },
    { icon: '⌁', title: '平台运营', text: '根据平台反馈复盘选题、标题与内容节奏，让作品被看见。' }
  ],
  works: [
    {
      category: 'AI 短视频制作',
      title: '《被讨厌的勇气》',
      label: '不为了满足别人的期待而活，只有你是你自己的时候，才能吸引真正喜欢你的人。',
      summary: '本片以一颗“自带独特气味、不被大众接纳”的榴莲作为主角，讲述它生来自带与众不同的特质，因气味特殊而被周遭排斥、误解、甚至被讨厌。但它从未刻意迎合世界、也没有为了合群而改变自己原本的模样。它安静坚守自我、坦然接受自己的独特与不完美。在漫长的等待中，它最终遇见了真正懂得欣赏它、接纳它、偏爱它独一无二特质的同频之人。',
      idea: '本短片灵感源自心理学著作《被讨厌的勇气》。书中提出：成长的本质，是拥有“被他人讨厌的勇气”。',
      stats: 'AI 短片创意 / 叙事文案 / 概念表达',
      award: '灵感来源：阿德勒心理学著作《被讨厌的勇气》',
      videoSrc: 'assets/videos/ai-short-video.mp4'
    },
    {
      category: '微电影制作',
      title: '《妍途花开》',
      label: '不必拥有一样的起点，并肩前行，沿途终会花开。',
      summary: '四位成长于截然不同家庭环境、拥有各异性格的女孩，怀揣着同一份炽热的理想奔赴前路。追梦途中，她们各自遭遇困顿与迷茫，没有相互攀比、彼此竞争，而是选择彼此扶持、惺惺相惜。她们一路结伴，接纳彼此的差异，分担各自的挣扎，最终守着共同的初心，各自收获属于自己的圆满结果。',
      idea: '很多人以为梦想是一场独自厮杀的竞赛，我希望打破这种叙事。每个人原生环境、起点各不相同，但向往远方的心没有高低之分。差异不是隔阂，反而能够互相支撑。真正的成长，不止抵达终点，更是学会在漫漫长路上珍惜同行的伙伴。',
      stats: '微电影脚本 / 人物设定 / 成长叙事',
      award: '以互相扶持的同行关系，重写“追梦”的竞争叙事',
      videoSrc: 'assets/videos/micro-film.mp4'
    },
    {
      category: '公众号推文',
      title: '《呵护她的 29 天》',
      label: '生命的意义，在于人与人之间的互相照亮。',
      summary: '“床铺的问题总算是解决了！”这一刻，党总支书记牵挂的心终于安定下来。',
      story: [
        '对于从小就与轮椅相伴的女孩吴淋妮来说，她的入学之路注定不平凡。在她还未踏入湖南信息学院的校门时，学校的各个部门就已经行动起来。他们实地考察，反复筛选，最终，一间充满爱与温暖的寝室成为吴淋妮的“新家”。',
        '解决了住的问题，学院的目光又转向了吴淋妮的日常生活。在本班党员的带领下，同学们自愿报名、两两组队，帮扶吴淋妮。为了能长期坚持下去，班里列出志愿者名单，将帮扶计划排满整个学期。这些志愿者中，有大学生退役军人，有入党积极分子，有团学干部等等。帮扶的志愿者每天早上七点就到吴淋妮宿舍，保障吴淋妮一天的课程学习和三餐饮食。'
      ],
      stats: '人物采访 / 纪实文案 / 公益传播',
      award: '记录校园里真实发生的善意与支持',
      video: '视频作品待补充'
    },
    {
      category: '省级报道新闻稿',
      title: '《青春在基层的回响》',
      label: '“每片苦瓜干都是婆婆亲手晾晒，清热解暑，还带甜香。”',
      summary: '农产带着香，爱心连着网。实践团精心筹备的云端助农直播间暖意融融，琥珀色的酸枣坨、玛瑙般的李子干、绛紫杨梅等农家特产在镜头前散发着阳光的味道。',
      story: [
        '“每片苦瓜干都是婆婆亲手晾晒，清热解暑，还带甜香。”主播们讲述着农产品背后的匠心故事。系列助农直播累计观看量超 1600 人次，点赞量超 12.5 万，酸枣坨、李子干等单品销量均表现亮眼。',
        '这场持续多日的助农行动，不仅用实实在在的数据证明了永和特色农产品的吸引力，更让每笔订单都成为城乡联结的纽带，在云端织就一张温情网——网住了农家货的质朴鲜香，也连起了城市里跨越山海的善意。'
      ],
      stats: '新闻稿撰写 / 助农直播传播 / 数据复盘',
      award: '直播累计观看 1600+ / 点赞 12.5w+',
      video: '报道作品待补充'
    }
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
