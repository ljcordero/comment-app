import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// @ts-ignore: Unreachable code error
import VueQuillEditor from 'vue-quill-editor';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import 'quill/dist/quill.core.css'; // import styles
import 'quill/dist/quill.snow.css'; // for snow theme
import 'quill/dist/quill.bubble.css'; // for bubble theme

Vue.config.productionTip = false;

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(VueQuillEditor, {
  modules: {
    toolbar: ['bold', 'italic', 'underline', 'strike'],
  },
  placeholder: 'Tu comentario',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
