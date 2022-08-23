import Theme from 'vitepress/theme'
import Mermaid from 'vitepress-plugin-mermaid/Mermaid.vue'
import Bili from './Bili.vue'
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import './index.css'

export default {
  ...Theme,
  enhanceApp({ app }) {
    // app.use(Antd)
    app.component('Mermaid', Mermaid)
    app.component('Bili', Bili)
  },
}
