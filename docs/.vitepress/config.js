
export default {
  title: '项目实战课',
  description: '全栈应用如何做出亮点',
  head: [
    ['link', { rel: 'icon', href: 'https://cdn.jsdelivr.net/gh/shengxinjing/static/element3.ico', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: 'https://cdn.jsdelivr.net/gh/shengxinjing/static/element3.png', type: 'image/png', sizes: '16x16' }],
  ],
  // base:"/src/"
  themeConfig: {
    logo: 'https://cdn.jsdelivr.net/gh/shengxinjing/static/woniu.png',
    nav: [
      { text: '开始', link: '/basic/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'React', link: '/react/' },
      { text: 'Nodejs', link: '/node/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/course-dasheng/fullstack' },
    ],
    sidebar: {
      '/': [
        {
          text: '通用技能',
          items: [
            { text: '开发环境', link: '/basic/' },
          ],
        },
        {
          text: '项目需求',
          items: [
            { text: '需求介绍', link: '/project/' },
          ],
        },
        {
          text: 'Vue',
          items: [
            { text: 'Vue框架介绍', link: '/vue/' },

          ],
        },
        {
          text: 'React',
          items: [
            { text: 'React框架介绍', link: '/react/' },

          ],
        },
        {
          text: '数据展示组件',
          items: [
            { text: 'Nodejs介绍', link: '/node/' },
          ],
        },
      ],
    },
  }
}
