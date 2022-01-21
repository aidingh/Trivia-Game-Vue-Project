import { createApp } from 'vue'
import App from './App.vue'
import StartScreen from './components/StartScreen.vue'
import QuestionScreen from './components/QuestionScreen.vue'
import { createRouter, createWebHistory } from 'vue-router';

//import * as Vue from 'vue'
//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
//Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin)

/*new Vue({
    render: (h) => h(App),
}).$mount("#app");*/

//createApp(App).mount('#app')

/*const routes = [

{
path: '/',
component: StartScreen
},
{
path: '/question-screen',
component: QuestionScreen
},
];*/

const routes = [
    { path: '/', component: StartScreen},
    { path: '/question', component: QuestionScreen}
  ]


const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    linkActiveClass: 'active',
});

const app = createApp(App);
app.use(router);
app.mount('#app');


