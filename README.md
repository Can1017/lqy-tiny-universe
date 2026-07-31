# 校招短视频编导作品集

纯 HTML、CSS、JavaScript 构建，可直接部署到 GitHub Pages。

## 如何修改内容

- 文案、经历、影像书、运营内容墙、数据、奖项与图片路径：`content/site-content.js`
- 个人照片与作品图片：`assets/images/`
- 简历 PDF：`assets/resume/`
- 页面布局：`index.html`
- 视觉样式：`styles.css`

当前使用网络图片作为占位图；正式投递前，请替换为真实的证件照与作品素材。

### 替换内容链接

在 `content/site-content.js` 的 `socialPosts` 中，替换每条内容的 `url`，即可让运营内容墙跳转到真实的公众号文章、小红书笔记或视频；把 `image` 改为本地图片路径或公开图片链接即可换图。影像书使用同一文件里的 `gallery` 数组，文字、图片与视频提示均可在该处修改。

## 本地预览与发布

本地访问 `http://127.0.0.1:4173` 预览。推送至 `main` 后，GitHub Pages 会自动更新线上网站。
