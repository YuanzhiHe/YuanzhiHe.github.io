# Yuanzhi He · Personal Website

A single-file, dark-tech personal site for an AI/Robotics PhD researcher.
Built in vanilla **HTML / CSS / JS** — no build tooling, no framework — so it deploys to GitHub Pages with one click and loads in milliseconds.

> Live target URL: **https://yuanzhihe.github.io**

---

## 1. 文件结构

```
mainpage/
├── index.html      # 整站全部代码（HTML + CSS + JS + i18n + 神经网络粒子动画）
└── README.md       # 你正在看的这份说明
```

只有一个 `index.html`，没有任何外部资源依赖（除了 Google Fonts，无所谓离线）。

---

## 2. 部署到 github.io（最快 5 分钟）

你的 GitHub 用户名是 **YuanzhiHe**，所以站点要部署到 **`YuanzhiHe.github.io`** 这个特殊仓库（用户级 Pages 仓库）。

### 2.1 在 GitHub 上创建仓库

1. 登录 https://github.com/YuanzhiHe
2. 点 **New repository**
3. **Repository name** 填：`YuanzhiHe.github.io`（必须严格等于你的用户名 + `.github.io`，注意大小写不敏感但建议保持一致）
4. 设置为 **Public**
5. **不要**勾选 "Add a README"，直接点 **Create repository**

### 2.2 把本地文件推上去

打开终端，进入这个文件夹（`mainpage/`）：

```bash
cd /Users/MartinHe/PycharmProjects/mainpage

# 第一次用的话先初始化
git init
git add index.html README.md
git commit -m "feat: launch personal site"

# 接到远端仓库
git branch -M main
git remote add origin https://github.com/YuanzhiHe/YuanzhiHe.github.io.git
git push -u origin main
```

如果你已经在用 SSH，把上面 `https://...` 那一行换成：
```
git remote add origin git@github.com:YuanzhiHe/YuanzhiHe.github.io.git
```

### 2.3 启用 GitHub Pages

1. 仓库页 → **Settings** → 左侧 **Pages**
2. **Source** 选 **Deploy from a branch**
3. **Branch** 选 `main` / `(root)`，点 **Save**
4. 等 1–2 分钟，刷新这个页面，会出现：
   > Your site is live at **https://yuanzhihe.github.io/**

完成。以后只要 `git push`，几十秒后页面自动更新。

---

## 3. 后续维护：常见改动

所有内容都集中在 `index.html` 里，按章节用 `<!-- ===== XXX ===== -->` 注释分隔。

### 3.1 新增/修改一篇论文

定位到 `<!-- ===== PUBLICATIONS ===== -->`，找到对应分类（例如 "Robotic Manipulation & Planning"），照着已有 `<article class="card">` 复制一份即可：

```html
<article class="card">
  <div class="meta">
    <span class="badge submitted" data-i18n="pub.submitted">Submitted</span>
    <span class="badge lead" data-i18n="pub.lead">1st Author</span>
  </div>
  <h3>Your paper title here</h3>
  <div class="venue">VenueName Year</div>
  <p>Short English description.</p>
  <div class="tags"><span class="tag">Topic1</span></div>
</article>
```

可用的 `badge` 类别：
- `published` — 已发表
- `submitted` — 在投
- `prep` — 撰写中
- `lead` — 第一作者
- `co1st` — 共一/共同第一作者
- `coauth` — 合作作者

如果你想让中文切换也显示翻译，在 `<p>` 上加 `data-i18n="pub.pXX"` 然后到 JS 顶部的 `I18N.en` 和 `I18N.zh` 字典里加上对应的键值。

### 3.2 新增审稿经历

定位到 `<!-- ===== REVIEWER ===== -->`，复制一个 `<div class="review">` 块即可：

```html
<div class="review">
  <div class="yr">2027</div>
  <div class="name">Conference</div>
  <div class="desc">Short description.</div>
</div>
```

### 3.3 新增/替换学术单位 Logo

定位到 `<!-- ===== AFFILIATIONS / SPONSORS ===== -->`。每个 `.sponsor` 里现在用的是内联 SVG 文字 Logo（不需要图片文件）。如果你想换成真正的官方 logo：

1. 把官方 logo 图（PNG / SVG）放到一个 `assets/` 目录，例如 `assets/cardiff.svg`
2. 把对应 `.sponsor` 里的 `<svg>...</svg>` 换成 `<img src="assets/cardiff.svg" alt="Cardiff">`，注意保留 `.logo` 的 flex 包裹，并在 CSS 里把 `.sponsor img{height:48px;width:auto}` 加进去
3. 注意大学/公司 Logo 通常有使用规范，建议用官方提供的「学生使用版」或者纯文字版，避免商标问题

### 3.4 双语：增加新文案

JS 里有一个 `I18N` 对象，结构是：
```js
const I18N = {
  en: { "key.path": "English text", ... },
  zh: { "key.path": "中文文本", ... }
};
```
HTML 元素加上 `data-i18n="key.path"` 即可被切换。已经有 127 个键值对，可以照搬扩展。

### 3.5 改主题色

CSS 顶部 `:root` 里集中了所有变量：

```css
--accent: #5cf2d6;     /* 主青绿色 */
--accent-2: #a884ff;   /* 紫色 */
--accent-3: #ff7a9c;   /* 粉色 */
--bg-0: #06080f;       /* 主背景 */
```
改这几个值整站颜色都会跟着变。

---

## 4. 自定义域名（可选）

如果你想用 `yuanzhihe.com` 之类的自有域名：

1. 仓库根目录加一个 `CNAME` 文件，里面只写一行 `yuanzhihe.com`
2. 在域名服务商把：
   - `A` 记录指向 `185.199.108.153 / 109 / 110 / 111`
   - 或者 `CNAME` 记录指向 `yuanzhihe.github.io`
3. GitHub Pages 设置里勾选 **Enforce HTTPS**

---

## 5. 本地预览

最简单：

```bash
cd /Users/MartinHe/PycharmProjects/mainpage
python3 -m http.server 8000
```

浏览器打开 http://localhost:8000 即可。

---

## 6. 这个网站包含什么

- **首页 Hero**：动态打字效果 + 神经网络粒子背景（鼠标会和粒子互动）
- **About**：研究方向卡片
- **Affiliations**：6 个学术单位 Logo 墙（Cardiff / Birmingham / NII / ETH / GienTech / 深圳大学 / PUMCH）
- **Education & Experience**：垂直时间轴
- **Publications**：按 4 类（机器人操作与规划 / 计算机视觉 / 生物医学 AI / 博弈 AI）展示 10 篇论文
- **Projects**：8 个项目卡片
- **Reviewer**：4 个审稿身份（TAROS 2024 / ICRA 2026 / ICANN 2026 / CBS 2026）
- **Skills**：编程 / 机器人 / ML / 语言 4 列技能条
- **Contact**：邮箱 / LinkedIn / GitHub / Google Scholar / 电话 / 地点
- **EN / 中** 一键切换，所有正文都同步翻译

---

Made with ☕ and a Franka FR3.
