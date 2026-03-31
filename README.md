# Core-Zhe

知行合一 — AI赋能的平台产品经理个人作品集

## 概览

Core-Zhe 是马信哲（Maxwell Ma）的个人作品集网站，采用现代前端技术栈构建，以沉浸式滚动叙事的方式展示职业经历、项目成果与核心能力。支持中英双语切换、暗色/亮色主题、管理后台配置等功能。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 14.2 | React 全栈框架（App Router） |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 3.4 | 原子化样式系统 |
| Framer Motion | 12.x | 动画与交互 |

## 页面结构

```
01 / Hero              — 首屏，渐变动画姓名 + 座右铭
02 / Education         — 学历背景，课程知识图谱
03 / Career            — 工作经历时间线（滚动叙事 + 玻璃拟态卡片）
04 / Projects          — 项目复现，可交互演示入口
05 / Career Journey    — 职业旅程回放
06 / Cert & Honor      — 证书与荣誉展示
07 / Methodology       — 方法论体系
08 / Hobbies           — 兴趣爱好
09 / Footer            — 页脚联系方式
```

## 设计特性

- **中英双语** — 全站中英文自由切换，LanguageContext 统一管理
- **暗色/亮色双主题** — 一键切换，全局平滑过渡
- **自定义磁性光标** — 替换系统光标，hover 元素时膨胀跟随
- **玻璃拟态卡片** — `backdrop-filter` 毛玻璃 + SVG 噪点纹理模拟胶片质感
- **滚动叙事背景** — 华为经历浮现「总裁奖」勋章剪影，阿里经历切换全球网络拓扑
- **动态光晕** — 双色光球跟随鼠标移动，标签 hover 时光晕向中心收缩
- **数据发光组件** — 关键成果指标自带辉光 + hover 扩散动画
- **侧边导航栏** — 固定侧边 Navbar，快速定位各章节
- **管理后台** — AdminPanel 可实时配置站点参数
- **软吸附滚动** — useSoftSnap 自定义 Hook 实现章节吸附

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

打开 [http://localhost:3000](http://localhost:3000) 查看网站。

## 项目结构

```
src/
├── app/
│   ├── globals.css              # 全局样式（主题、玻璃卡片、辉光效果）
│   ├── layout.tsx               # 根布局 + ThemeProvider
│   └── page.tsx                 # 主页面组件编排
├── components/
│   ├── HeroSection.tsx          # 首屏
│   ├── EducationSection.tsx     # 学历
│   ├── CareerSection.tsx        # 工作经历（时间线 + 滚动叙事）
│   ├── ProjectShowcaseSection.tsx  # 项目复现
│   ├── CareerJourneySection.tsx # 职业旅程回放
│   ├── CertHonorSection.tsx     # 证书与荣誉
│   ├── MethodologySection.tsx   # 方法论体系
│   ├── HobbiesSection.tsx       # 兴趣爱好
│   ├── FooterSection.tsx        # 页脚
│   ├── Navbar.tsx               # 侧边导航栏
│   ├── MagneticCursor.tsx       # 磁性光标
│   ├── BrowserFrame.tsx         # 浏览器框架组件
│   ├── JourneyPlayer.tsx        # 旅程回放播放器
│   ├── AdminPanel.tsx           # 管理后台面板
│   ├── SiteConfigContext.tsx    # 站点配置上下文
│   ├── LanguageContext.tsx      # 中英双语上下文
│   ├── ThemeProvider.tsx        # 主题上下文
│   └── ThemeToggle.tsx          # 主题切换开关
├── hooks/
│   └── useSoftSnap.ts           # 软吸附滚动 Hook
└── i18n/                        # 国际化资源
```

## License

MIT
