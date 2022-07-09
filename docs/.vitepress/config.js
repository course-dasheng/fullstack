import MermaidPlugin from 'vitepress-plugin-mermaid'
export default {
  title: '项目实战课',
  description: '全栈应用如何做出亮点',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://cdn.jsdelivr.net/gh/shengxinjing/static/element3.ico',
        type: 'image/svg+xml',
      },
    ],
    [
      'link',
      {
        rel: 'alternate icon',
        href: 'https://cdn.jsdelivr.net/gh/shengxinjing/static/element3.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    [],
  ],
  markdown: {
    config: MermaidPlugin,
  },
  // base:"/src/"
  themeConfig: {
    logo: 'https://cdn.jsdelivr.net/gh/shengxinjing/static/woniu.png',
    nav: [
      { text: '开始', link: '/basic/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'React', link: '/react/' },
      { text: 'Nodejs', link: '/node/' },
      { text: '前端源码漫游记', link: 'https://fesource.netlify.app/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/course-dasheng/fullstack' },
    ],
    sidebar: {
      '/': [
        {
          text: 'Vue3 企业级实战',
          items: [
            { text: 'Vue3 框架介绍', link: '/vue/' },
            { text: 'Vue3 官网阅读', link: '/vue/website' },
            { text: 'Vue 技术选型', link: '/vue/select' },
            { text: 'Vue 路由', link: '/vue/router' },
            { text: 'Vue 权限系统', link: '/vue/auth' },
            { text: 'Vue Mock和联调', link: '/vue/mock' },
            { text: '登录注册', link: '/vue/login' },
            { text: 'Vue 项目组件封装', link: '/vue/component' },
            { text: 'Vue 性能优化', link: '/vue/perf' },
            { text: '构建和部署', link: '/react/build' },
            { text: '补充: Nuxt3和服务端渲染¡', link: '/vue/auth' },
          ],
        },
        {
          text: 'Vue3 组件库开发与实现',
          items: [
            { text: '组件库开发注意事项', link: '/element3/' },
            { text: '文档', link: '/element3/docs/' },
            { text: 'Vue中的JSX', link: '/element3/jsx' },
          ],
        },
        {
          text: 'React 18',
          items: [
            { text: 'React18 框架介绍', link: '/react/' },
            { text: 'React 官网阅读', link: '/react/website' },
            { text: 'React技术选型', link: '/react/select' },
            { text: 'React路由', link: '/react/router' },
            { text: 'React权限系统', link: '/react/auth' },
            { text: 'Mock和联调', link: '/vue/mock' },
            { text: 'React 项目组件封装', link: '/vue/mock' },
            { text: '构建和部署', link: '/vue/build' },

            { text: '补充:Umi', link: '/react/umi' },
            { text: '补充:Nextjs', link: '/react/next' },
          ],
        },
        {
          text: 'React组件库开发与实现',
          items: [
            { text: 'React', link: '/umaso/' },
            { text: '文档', link: '/umaso/docs' },
          ],
        },
        {
          text: '项目需求',
          items: [
            { text: '需求介绍', link: '/project/' },
            { text: '项目通用技能', link: '/project/basic' },
            { text: 'ESint代码规范', link: '/project/eslint' },
            { text: 'Git团队规范', link: '/project/git' },
            { text: 'Javascript增强', link: '/project/javascript' },
            { text: 'Typescript', link: '/project/typescript' },
            { text: 'CSS 解决方案', link: '/project/css' },
            { text: '前端工程化', link: '/project/fis' },
            { text: 'Vite进阶', link: '/project/vite' },
            { text: '组件设计', link: '/project/component' },
            { text: '大文件上传', link: '/project/upload' },
            { text: '数据大屏', link: '/project/chart' },
            { text: '一万数据量渲染优化', link: '/project/visual-list' },
            { text: '性能优化', link: '/project/perf' },
            { text: '前端监控', link: '/project/monitor' },
            { text: '图标', link: '/project/icon' },
            { text: '国际化(非必选)', link: '/project/i18n' },
            { text: '问题汇总', link: '/project/ques' },
          ],
        },

        {
          text: 'Nodejs',
          items: [{ text: 'Nodejs介绍', link: '/node/' }],
        },
        {
          text: '其他',
          items: [{ text: 'repo推荐', link: '/repo' }],
        },
      ],
    },
  },
}
