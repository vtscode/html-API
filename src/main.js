import Vue from 'vue';
import App from './App.vue';
import {
  Layout,
  Button,
  Spin,
  Result,
  Card,
  Divider,
  Col,
  Row,
  Drawer,
  Table,
  Form,
  InputNumber,
  Tag,
  Select
} from 'ant-design-vue';
import router from './router';
import store from './store';
// import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

Vue.use(store);
Vue.use(Layout);
Vue.use(Button);
Vue.use(Spin);
Vue.use(Result);
Vue.use(Card);
Vue.use(Divider);
Vue.use(Col);
Vue.use(Row);
Vue.use(Drawer);
Vue.use(Table);
Vue.use(Form);
Vue.use(InputNumber);
Vue.use(Tag);
Vue.use(Select);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
