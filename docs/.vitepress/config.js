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
      { text: '开始', link: '/project/basic' },
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
          text: '项目需求',
          items: [
            { text: '需求介绍', link: '/project/' },
            { text: '项目通用技能+规范', link: '/project/basic' },
            { text: 'Typescript', link: '/project/typescript' },
            { text: 'CSS 解决方案', link: '/project/css' },
            { text: 'Axios 封装', link: '/project/axios' },
            { text: '前端工程化', link: '/project/fis' },
            { text: 'Vite进阶(插件', link: '/project/vite' },
            { text: '组件设计', link: '/project/component' },
            { text: '大文件上传', link: '/project/upload' },
            { text: '数据大屏', link: '/project/chart' },
            { text: '一万数据量渲染优化', link: '/project/visual-list' },
            { text: '性能优化', link: '/project/perf' },
            { text: 'eslint团队规范', link: '/project/eslint' },
            { text: '前端监控', link: '/project/monitor' },
            { text: '发布部署', link: '/project/deploy' },
            { text: '原型链污染', link: '/project/protytype' },
            { text: '@todo(低代码', link: '/project/lowcode' },
            { text: '问题汇总', link: '/project/ques' },
          ],
        },

        // {
        //   text: 'Vue3 企业级实战',
        //   items: [
        //     { text: 'Vue3 框架介绍', link: '/vue/' },
        //     { text: 'Vue3 官网阅读', link: '/wvue/website' },
        //     { text: 'Vue 全家桶选型', link: '/vue/select' },
        //     { text: 'Vue 权限系统', link: '/vue/auth' },
        //     { text: '增删改查', link: '/vue/crud' },
        //     { text: 'Vue 项目组件封装', link: '/vue/component' },
        //     { text: 'Vue 性能优化', link: '/vue/perf' },
        //     { text: '构建和部署', link: '/react/build' },
        //     { text: '补充: Nuxt3和服务端渲染¡', link: '/vue/auth' },
        //   ],
        // },
        // {
        //   text: 'Element3 组件库开发与实现',
        //   items: [
        //     { text: '组件库开发注意事项', link: '/element3/' },
        //     { text: 'Vue中的JSX', link: '/element3/jsx' },
        //     { text: '通用组件', link: '/element3/common' },
        //     { text: '布局组件', link: '/element3/layout' },
        //     { text: '表单组件', link: '/element3/form' },
        //     { text: '弹窗组件', link: '/element3/modal' },
        //     { text: '树组件', link: '/element3/tree' },
        //     { text: '表格组件', link: '/element3/table' },
        //     { text: '其他组件', link: '/element3/other' },
        //   ],
        // },

        {
          text: 'React 18',
          items: [
            { text: 'React18 框架介绍', link: '/react/' },
            { text: 'React 官网阅读', link: '/react/website' },
            { text: 'React 全家桶选型', link: '/react/select' },
            { text: 'React 权限系统', link: '/react/auth' },
            { text: 'React 增删改查', link: '/react/crud' },
            { text: 'React 项目组件封装', link: '/react/component' },
            { text: 'React Hooks分装', link: '/react/hooks' },
            { text: '构建和部署', link: '/react/build' },
            { text: '补充:Umi', link: '/react/umi' },
            { text: '补充:Nextjs和SSR', link: '/react/next' },
          ],
        },
        {
          text: 'React组件库开发与实现',
          items: [
            { text: 'React', link: '/umaso/' },
            { text: '通用组件', link: '/umaso/common' },
            { text: '布局组件', link: '/umaso/layout' },
            { text: '表单组件', link: '/umaso/form' },
            { text: '弹窗组件', link: '/umaso/modal' },
            { text: '树组件', link: '/umaso/tree' },
            { text: '表格组件', link: '/umaso/table' },
            { text: '其他组件', link: '/umaso/other' },
          ],
        },
        

        // {
        //   text: 'Nodejs',
        //   items: [{ text: 'Nodejs介绍', link: '/node/' }],
        // },
        {
          text: '其他',
          items: [{ text: 'repo推荐', link: '/repo' }],
        },
      ],
    },
  },
}
