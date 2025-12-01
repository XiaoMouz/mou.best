# Vue 转换 Todo List

## 项目概述
将 xiaomouz-portfolio React 项目完美复刻为 Vue 3 版本

---

## 阶段 1: 项目配置

- [ ] **配置 Vue 项目基础架构**
  - 更新 package.json（Vue 3 + Vite + TypeScript + lucide-vue-next）
  - 修改 vite.config.ts 使用 @vitejs/plugin-vue
  - 更新 tsconfig.json 为 Vue 配置

- [ ] **转换 index.html**
  - 更新为 Vue 挂载方式
  - 移除 React importmap
  - 保持 Tailwind CDN 和样式配置

- [ ] **创建 Vue 入口文件**
  - 创建 main.ts 替代 index.tsx
  - 配置 Vue 应用挂载

---

## 阶段 2: 数据层

- [ ] **转换类型定义**
  - types.ts 转为 Vue 兼容版本
  - 确保所有接口和类型定义正确

- [ ] **转换数据文件**
  - data/content.tsx → data/content.ts（移除 JSX）
  - data/games.ts 保持不变
  - data/translations.ts 保持不变

- [ ] **创建 Composables**
  - 创建 composables/useArticle.ts 替代 ArticleContext
  - 创建 composables/useLanguage.ts 替代 LanguageContext
  - 使用 Vue 的 provide/inject 或 reactive

---

## 阶段 3: 核心应用

- [ ] **转换 App.vue 组件**
  - 路由逻辑（currentView, activeArticleId）
  - 状态管理（unlockedIds, navbarTheme）
  - 主题切换（isDark, toggleTheme）
  - 导航处理（handleNavigate, handleViewArticle, handleUnlock）
  - 页面渲染逻辑

- [ ] **转换 BackgroundGlow.vue 组件**
  - 背景动画效果
  - 响应式样式

- [ ] **转换 Navbar.vue 组件**
  - 导航菜单
  - 主题切换按钮
  - 响应式导航栏
  - Props: currentView, onNavigate, themeOverride, isDark, toggleTheme

---

## 阶段 4: 主要页面组件

- [ ] **转换 Hero.vue 组件**
  - 首页 Hero 区域
  - 动画效果
  - Typewriter 组件集成（保持不变）

- [ ] **转换 About.vue 组件**
  - 关于区块组件

- [ ] **转换 AboutPage.vue 组件**
  - 完整关于页面
  - 个人简介展示

- [ ] **转换 Articles.vue 组件**
  - 文章列表展示
  - Props: onViewArticle, unlockedIds
  - 文章卡片布局

- [ ] **转换 ArticleView.vue 组件**
  - 文章详情页面
  - Props: item, onBack, isUnlocked, onUnlock
  - 解锁功能

- [ ] **转换 Resume.vue 组件**
  - 简历页面
  - Props: onBack
  - PDF 或在线简历展示

- [ ] **转换 FriendsPage.vue 组件**
  - 朋友展示页面
  - 集成所有 friends 子组件

- [ ] **转换 Games.vue 组件**
  - 游戏展示页面
  - Props: onThemeChange, targetGameId
  - 主题切换功能

- [ ] **转换 Media.vue 组件**
  - 媒体展示页面
  - Props: onThemeChange, targetMediaId
  - 主题切换功能

---

## 阶段 5: 子组件

### 评论组件
- [ ] **转换 CommentDrawer.vue**
  - 评论抽屉组件
  - 滑动效果

- [ ] **转换 CommentableBlock.vue**
  - 可评论区块组件
  - 评论触发器

### Friends 子组件（4个）
- [ ] **转换 GamingBuddy.vue**
  - 游戏好友卡片

- [ ] **转换 HometownGroup.vue**
  - 老乡群组卡片

- [ ] **转换 SoulmateCard.vue**
  - 知己卡片

- [ ] **转换 LinkExchange.vue**
  - 友链交换组件

### Games 子组件（4个）
- [ ] **转换 WarThunder.vue**
  - 战争雷霆游戏卡片
  - 自定义主题

- [ ] **转换 EveOnline.vue**
  - EVE Online 游戏卡片
  - 自定义主题

- [ ] **转换 TheDivision.vue**
  - 全境封锁游戏卡片
  - 自定义主题

- [ ] **转换 GTAV.vue**
  - GTA5 游戏卡片
  - 自定义主题

### Media 子组件（5个）
- [ ] **转换 NoGameNoLife.vue**
  - 游戏人生动漫卡片
  - 自定义主题

- [ ] **转换 SevenNationArmy.vue**
  - 七国军音乐卡片
  - 自定义主题

- [ ] **转换 JohnWick.vue**
  - 疾速追杀电影卡片
  - 自定义主题

- [ ] **转换 SwordArtOnline.vue**
  - 刀剑神域动漫卡片
  - 自定义主题

- [ ] **转换 HouseOfCards.vue**
  - 纸牌屋剧集卡片
  - 自定义主题

---

## 阶段 6: 测试与验证

- [ ] **测试所有页面和组件功能**
  - 首页导航
  - 文章列表和详情
  - 游戏和媒体展示
  - 朋友页面
  - 简历页面
  - 关于页面

- [ ] **验证主题切换功能**
  - 深色模式 ↔ 浅色模式
  - localStorage 持久化
  - 游戏/媒体页面自定义主题
  - 主题过渡动画

- [ ] **验证响应式布局**
  - 桌面端（>1024px）
  - 平板端（768px-1024px）
  - 移动端（<768px）
  - 触摸交互

---

## 注意事项

### ✅ 保持不变
- **Typewriter 组件** - 不需要重写
- **Material Design 3 样式系统** - 保持一致
- **Tailwind CSS 配置** - 保持一致
- **自定义 CSS 变量** - 保持一致

### 🚫 除外组件
- **Social Button** - 不需要转换

### 🔑 关键转换点
- React Hooks → Vue Composition API
  - `useState` → `ref` / `reactive`
  - `useEffect` → `watch` / `onMounted` / `watchEffect`
  - `useContext` → `provide` / `inject`
- JSX → Vue Template (或保留 JSX)
- Props 传递 → `defineProps` / `withDefaults`
- 事件处理 → `defineEmits`
- 图标库：`lucide-react` → `lucide-vue-next`

---

## 项目文件结构（Vue 版本）

```
xiaomouz-portfolio-vue/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── comments/
│   │   │   ├── CommentDrawer.vue
│   │   │   └── CommentableBlock.vue
│   │   ├── friends/
│   │   │   ├── GamingBuddy.vue
│   │   │   ├── HometownGroup.vue
│   │   │   ├── SoulmateCard.vue
│   │   │   └── LinkExchange.vue
│   │   ├── games/
│   │   │   ├── WarThunder.vue
│   │   │   ├── EveOnline.vue
│   │   │   ├── TheDivision.vue
│   │   │   └── GTAV.vue
│   │   ├── media/
│   │   │   ├── NoGameNoLife.vue
│   │   │   ├── SevenNationArmy.vue
│   │   │   ├── JohnWick.vue
│   │   │   ├── SwordArtOnline.vue
│   │   │   └── HouseOfCards.vue
│   │   ├── About.vue
│   │   ├── AboutPage.vue
│   │   ├── Articles.vue
│   │   ├── ArticleView.vue
│   │   ├── BackgroundGlow.vue
│   │   ├── FriendsPage.vue
│   │   ├── Games.vue
│   │   ├── Hero.vue
│   │   ├── Media.vue
│   │   ├── Navbar.vue
│   │   ├── Resume.vue
│   │   └── Typewriter.vue (保持不变)
│   ├── composables/
│   │   ├── useArticle.ts
│   │   └── useLanguage.ts
│   ├── data/
│   │   ├── content.ts
│   │   ├── games.ts
│   │   └── translations.ts
│   ├── types.ts
│   ├── App.vue
│   └── main.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 完成标准

✅ 所有组件功能与 React 版本一致
✅ 主题切换正常工作
✅ 响应式布局完美适配
✅ TypeScript 类型检查通过
✅ 无 console 错误
✅ 动画效果流畅
✅ 代码风格统一

---

**预计组件数量**: 约 30+ 个 Vue 组件
**预计工作量**: 中大型转换项目
**技术栈**: Vue 3 + TypeScript + Vite + Tailwind CSS + Composition API
