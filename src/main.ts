import { createApp } from 'vue'
import App from './App.vue'
import { store, key} from './store'
import VueJSModal from 'vue-js-modal'
createApp(App).use(store, key).mount('#app')
