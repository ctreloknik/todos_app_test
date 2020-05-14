import axios from 'axios';
import { doLogout } from './Utils';

const api = axios.create({
    baseURL: `http://localhost:3000/api/v1/`,
    timeout: 3600,
    withCredentials: true
    // headers: {
    //     'accept': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Credentials': true,
    //     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    //     'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
    // }
});

api.defaults.withCredentials = true;
api.interceptors.response.use(function (response) {
    console.log('200');
    return response;
}, function (error) {
    if (401 === error.response.status) {
        console.log('401');
        if (window.location.pathname !== '/login') {
            doLogout();
            window.history.replaceState({}, null, '/login');
            document.location.reload();
        }
    } else {
        return Promise.reject(error);
    }
});

const ApiHelper = {
    login(data) {
        return doRequest('login', 'POST', data);
    },

    logout() {
        return doRequest('logout', 'POST');
    },

    getInfoAboutMe() {
        return doRequest('me', 'GET');
    }
}

export default ApiHelper;

function doRequest(url, method, data) {
    return api({
        method: method,
        url: url,
        data: data
    })
}