# 李登佳 - 学术主页 | Academic Homepage

这是我的个人学术主页源代码，使用 GitHub Pages 托管。

## 🌐 访问地址

网站地址: `https://你的用户名.github.io`

## 📁 文件结构

```
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── main.js         # 交互脚本
├── images/
│   └── profile.jpg     # 个人照片
├── files/
│   └── CV_LiDengjia.pdf # 简历PDF（可选）
└── README.md           # 说明文档
```

## 🛠️ 如何使用

### 1. 修改个人信息

编辑 `index.html` 文件，替换以下内容：

- **姓名和职位**：搜索"李登佳"并替换
- **个人简介**：修改"关于我"部分
- **教育背景**：修改时间线内容
- **研究方向**：修改研究卡片
- **论文发表**：添加你的论文
- **项目经历**：添加你的项目
- **荣誉奖项**：添加你的奖项
- **联系方式**：修改邮箱、地址等

### 2. 替换照片

将你的照片重命名为 `profile.jpg`，放入 `images/` 文件夹。

建议照片规格：
- 尺寸：400x400 像素以上
- 格式：JPG 或 PNG
- 比例：1:1（正方形）

### 3. 修改社交链接

在 `index.html` 中找到 `social-links` 部分，修改：
- Email 地址
- GitHub 链接
- Google Scholar 链接
- ORCID 链接

### 4. 上传简历PDF（可选）

将你的简历PDF放入 `files/` 文件夹，并在 `index.html` 中更新链接。

## 📤 发布到 GitHub Pages

### 步骤 1：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 仓库名称填写：`你的用户名.github.io`
4. 选择 "Public"
5. 点击 "Create repository"

### 步骤 2：上传文件

**方法A：通过网页上传**
1. 进入仓库页面
2. 点击 "Add file" → "Upload files"
3. 拖拽所有文件到上传区域
4. 点击 "Commit changes"

**方法B：通过 Git 命令行**
```bash
# 初始化 Git 仓库
cd github-academic-site
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git

# 推送
git push -u origin main
```

### 步骤 3：启用 GitHub Pages

1. 进入仓库 "Settings"
2. 左侧菜单找到 "Pages"
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main"，文件夹选择 "/ (root)"
5. 点击 "Save"
6. 等待 1-2 分钟后刷新页面

### 步骤 4：访问网站

你的网站地址是：`https://你的用户名.github.io`

## 🎨 自定义样式

如果想修改颜色主题，编辑 `css/style.css` 文件开头的 CSS 变量：

```css
:root {
    --primary-color: #2c3e50;    /* 主色调 */
    --secondary-color: #3498db;  /* 次要色 */
    --accent-color: #e74c3c;     /* 强调色 */
    /* ... */
}
```

## 📱 响应式设计

本模板已适配：
- 💻 桌面端
- 📱 平板
- 📱 手机

## 📄 License

MIT License - 可自由使用和修改

## 📞 联系

如有问题，欢迎提 Issue 或联系我。

---

⭐ 如果这个模板对你有帮助，请给一个 Star！
