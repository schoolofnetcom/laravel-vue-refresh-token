const cookies = require('vue-cookies');
const passport = {};

passport.install = function (Vue, options) {
    const $passport = {};
    let error_count = 0;

    $passport.getRefreshToken = () => {
        return cookies.get('refresh_token');
    };

    $passport.getAccessToken = () => {
        return cookies.get('access_token');
    };

    $passport.refreshToken = () => {
        const data = {
            grant_type: 'refresh_token',
            client_id: options.client_id,
            client_secret: options.client_secret,
            refresh_token: $passport.getRefreshToken(),
            scope: ''
        };
        
        return axios.post('/oauth/token', data).then((res) => {
            cookies.set('access_token', res.data.access_token);
            cookies.set('refresh_token', res.data.refresh_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token;

            return res.data;
        });
    };

    $passport.accessToken = (user) => {
        const defaultData = {
            grant_type: 'password',
            client_id: options.client_id,
            client_secret: options.client_secret,
            scope: ''
        };
        const data = Object.assign(defaultData, user);
        
        return axios.post('/oauth/token', data).then((res) => {
            cookies.set('access_token', res.data.access_token);
            cookies.set('refresh_token', res.data.refresh_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token;

            return res.data;
        });
    };

    Vue.mixin({
        beforeMount: function () {
            axios.interceptors.response.use(null, async (error) => {
                const limit = options.refresh_limit || 10;

                error_count ++;
                if (error.response.status === 401 && error_count < limit && $passport.getRefreshToken()) {
    
                    const data = await this.$passport.refreshToken();
                    error.config.headers.Authorization = 'Bearer ' + data.access_token;
    
                    return axios.request(error.config);
                } else if (options.refresh_fail_callback) {
                    error_count = 0;
                    options.refreshFailCallback()
                }
                return Promise.reject(error);
            });
        }
    });

    const token = $passport.getAccessToken();

    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    Vue.prototype.$passport = $passport;
};

export default passport;
