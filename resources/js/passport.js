const cookies = require('vue-cookies');
const passport = {};

passport.install = function (vue, options) {
    const $passport = {};

    $passport.getRefreshToken = () => {
        return cookies.get('refresh_token');
    };

    $passport.getAccessToken = () => {
        return cookies.get('access_token');
    };

    $passport.refreshToken = () => {
        const data = {
            grant_type: 'refresh_token',
            client_id: '2',
            client_secret: 'PqFvDapAoL0GY1Sr03kqhOaalSZIAB3EqZCm0UPE',
            refresh_token: $passport.getRefreshToken(),
            scope: ''
        };
        
        return axios.post('/oauth/token', data).then((res) => {
            console.log('token atualizado');
            cookies.set('access_token', res.data.access_token);
            cookies.set('refresh_token', res.data.refresh_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token;

            return res.data;
        });
    };

    $passport.accessToken = (user) => {
        const defaultData = {
            grant_type: 'password',
            client_id: '2',
            client_secret: 'PqFvDapAoL0GY1Sr03kqhOaalSZIAB3EqZCm0UPE',
            scope: ''
        };
        const data = Object.assign(defaultData, user);
        
        axios.post('/oauth/token', data).then((res) => {
            console.log('autenticado');
            cookies.set('access_token', res.data.access_token);
            cookies.set('refresh_token', res.data.refresh_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token;
        });
    };

    const token = $passport.getAccessToken();

    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    vue.prototype.$passport = $passport;
};

export default passport;
