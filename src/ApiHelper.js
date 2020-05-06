import axios from 'axios';

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