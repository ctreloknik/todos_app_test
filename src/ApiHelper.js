import axios from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

axiosCookieJarSupport(axios);
const cookieJar = new CookieJar();

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
    return axios({
        method: method,
        baseURL: `http://localhost:3000/api/v1/`,
        url: url,
        withCredentials: true,
        // credentials: 'include',
        // jar: cookieJar,
        headers: {
            'accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
        },
        data: data
    })
}