/*
 * P4「影像日记」14 页画册内容。
 * 后续替换照片、剧照、奖项名称时，只修改本文件即可。
 */
window.P4_ALBUM = {
  title: '李乔英的创作画册',
  subtitle: 'From Sparks to Stories',
  author: '李乔英 | Qiaoying Li',
  assets: {
    introVideo: 'assets/videos/visual-diary.mp4',
    // 视频封面可单独替换；保持 16:9 横图会得到最自然的预览比例。
    introVideoPoster: 'assets/images/p4-album/visual-diary-poster.jpg',
    fireworkMain: 'assets/images/p4-album/firework-main.png',
    fireworkScatter: 'assets/images/p4-album/firework-scatter.png',
    // 从原图去除纸张白底后的透明版，画布已按真实内容收边，便于在纸页中准确居中。
    fireworkHaze: 'assets/images/p4-album/firework-haze-centered.png',
    leafNotes: 'assets/images/p4-album/leaf-notes-centered.png',
    bareTree: 'assets/images/p4-album/bare-tree-centered.png',
    seaSilhouette: 'assets/images/p4-album/sea-silhouette.png',
    groupSilhouette: 'assets/images/p4-album/group-silhouette.png',
    portraitNight: 'assets/images/p4-album/portrait-night.png',
    portraitSign: 'assets/images/p4-album/portrait-sign.png',
    portraitPose: 'assets/images/p4-album/portrait-pose.png'
  },
  // 翻页画册逐页文字。只修改这里即可替换文案；页面位置由 styles.css 中的同名版式类控制。
  pageCopy: {
    videoHeading: ['关于我自己', '我想说：'],
    fireworkLeft: {
      lead: '我的脑海里总有一个又一个的奇思妙想',
      paragraphs: [
        '那些零散的、鲜活的、转瞬即逝的想法，像烟花一样在夜空中绽放——有的明亮耀眼，有的温柔细腻，有的还没来得及看清，就已经消失在黑暗中。',
        '但我知道，这些烟花不是无意义的闪烁。',
        '每一个想法，无论多么微小，都是我观察世界的独特视角。每一次感动，无论多么短暂，都是我创作的原始素材。'
      ]
    },
    fireworkRight: [
      '那些烟花，并没有消失。繁花如烟花四散的灵感，不会无序散落。',
      '我用文字把它们梳理、归纳、延展——让零散的想法扎根，长成系统的思考。',
      '每一片叶子，都是一段思绪；每一条脉络，都是一次推敲。'
    ],
    treeTop: ['直到有一天，', '它们破土而出，', '长成一棵叫做「思考」的树。'],
    treeBottom: ['它们化作种子，落入心底的土壤，', '在无人看见的地方，悄悄生根。'],
    growth: [
      ['成长是缓慢向上的攀登，', '文字搭建好思考的框架，', '我开始走向现实，用镜头去捕捉世界。'],
      ['每一次按下快门，都是一次练习；', '每一段拍摄素材，都是一次成长。'],
      ['从生涩到熟练，从模仿到创造，', '我用阶梯般的积累，', '让自己离理想的创作者更近一步。']
    ]
  },
  intro: [
    '我是李乔英。04 年生的狮子座，天生就带着一团火，走到哪里都想把光分给别人。',
    '他们说 ENFP 像风，我偏觉得自己是风里的镜头——不只是为了路过，是为了停下来，把此刻留住。',
    '相机不是我的工具，是我延长的感官。别人用眼睛看世界，我用快门把瞬间翻译成永恒。',
    '我擅长把别人没注意到的美好变成画面，把别人说不出口的感受变成故事。',
    '迷茫的时候，焦虑的时候，我没有停下，而是拍得更多。因为镜头从不评判你，它只帮你记住：你曾经认真活过。',
    '故事还在继续。下一页，翻给你看。'
  ],
  fireworks: [
    '我是一个高敏感的人，脑海里总有一场又一场的烟花秀。',
    '那些零散的、鲜活的、转瞬即逝的想法，像烟花一样在夜空中绽放——有的明亮耀眼，有的温柔细腻，有的还没来得及看清，就已经消失在黑暗中。',
    '但我知道，这些烟花不是无意义的闪烁。每一个想法、每一次感动，都是我观察世界的独特视角，也是创作的原始素材。',
    '我要做的，是主动去捕捉那些转瞬即逝的烟花，把它们从脑海中提取出来，变成可以被看见、被感受的作品。'
  ],
  writingWorks: [
    { title: '《被讨厌的勇气》', tag: '#文案 #AI短片 #心理' },
    { title: '《妍途花开》', tag: '#微电影 #文案 #剧本' },
    { title: '《呵护她的 29 天》', tag: '#公众号 #系列策划' }
  ],
  photoWorks: [
    { image: 'assets/images/p3-work-03.png', label: '校园纪实 · 把善意留在傍晚' },
    { image: 'assets/images/p3-work-04.png', label: '人物记录 · 声音被看见' },
    { image: 'assets/images/p4-spring-campus-layout.jpg', label: '图文视觉 · 春日正在发芽' },
    { image: 'assets/images/experience-studio.jpg', label: '创作现场 · 与光同框' },
    { image: 'assets/images/lqy-profile-photo.jpg', label: '影像自述 · 手持相机的人' }
  ],
  films: [
    {
      eyebrow: 'FILM 01 · 微电影', title: '《妍途花开》',
      summary: '四位来自不同起点的女孩，在追梦途中相互照亮。故事不把成长写成一场竞争，而是写成彼此扶持、各自抵达的旅程。',
      role: '剧本撰写 · 人物设定 · 现场创作',
      stills: ['assets/images/p3-work-03.png', 'assets/images/experience-school.jpg', 'assets/images/lqy-profile-photo.jpg']
    },
    {
      eyebrow: 'FILM 02 · AI 短片', title: '《被讨厌的勇气》',
      summary: '以一颗不迎合世界的榴莲为主角，讲述独特并非缺陷。它安静坚守自己，最终遇见真正理解它的人。',
      role: '创意策划 · 叙事文案 · 概念表达',
      stills: ['assets/images/p4-spring-campus-layout.jpg', 'assets/images/p3-work-04.png', 'assets/images/experience-camera.jpg']
    }
  ],
  awards: [
    { year: '2025', title: '文创大赛一等奖', detail: '《蓝染韶华·叶书青春》' },
    { year: '2024', title: '微电影短视频大赛三等奖', detail: '湖南信息学院第十届赛事' },
    { year: '2024', title: '思政课公开课展示三等奖', detail: '大学生讲思政课公开课展示活动' },
    { year: '2025', title: '思政理论课研究成果三等奖', detail: '研究性学习成果展示竞赛' },
    { year: '2025', title: '“华中杯”数模挑战赛三等奖', detail: '校园共享单车调度与维护问题' },
    { year: '待补充', title: '下一枚正在生长的奖章', detail: '奖项资料待补充' }
  ]
};
