import Theme from 'vitepress/theme'
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import './index.css'


export default {
  ...Theme,
  enhanceApp({app}){
    // app.use(Antd)
  }
}

