import passport from './passport';

require('./bootstrap');
window.Vue = require('vue');
Vue.component('auth-component', require('./components/AuthComponent.vue').default);

Vue.use(require('vue-cookies'));
Vue.use(passport, {
    client_id: '2',
    client_secret: 'PqFvDapAoL0GY1Sr03kqhOaalSZIAB3EqZCm0UPE',
    refresh_fail_callback() {
        console.log('refresh token falhou');
    }
});

const app = new Vue({
    el: '#app',
});
