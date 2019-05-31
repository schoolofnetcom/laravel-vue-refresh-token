import passport from './passport';
import Axios from 'axios';

require('./bootstrap');
window.Vue = require('vue');
Vue.component('auth-component', require('./components/AuthComponent.vue').default);

Vue.use(require('vue-cookies'));
Vue.use(passport);

const app = new Vue({
    el: '#app',
    data() {
        return {
            error_count: 0,
        }
    },
    beforeMount() {
        axios.interceptors.response.use(null, async (error) => {
            this.error_count ++;
            if (error.response.status === 401 && this.error_count < 10 && this.$passport.getRefreshToken()) {

                const data = await this.$passport.refreshToken();
                error.config.headers.Authorization = 'Bearer ' + data.access_token;

                return axios.request(error.config);
            } else {
                // pedir o login novamente
            }
            return Promise.reject(error);
        });
    }
});
