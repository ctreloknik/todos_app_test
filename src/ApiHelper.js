import axios from 'axios';
import { doLogout, isAuthenticated } from './Utils';

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
    if (isAuthenticated() && (401 === error.response.status)) {
        console.log('401');
        doLogout();
        if (window.location.pathname !== '/login') {
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
    },

    getAllUsers() {
        return doRequest('users', 'GET');
    },

    getAllTodos() {
        return doRequest('todos', 'GET');
    },

    createTodo(data) {
        return doRequest('todos', 'POST', data);
    },

    getTodoById(id) {
        return doRequest(`todos/${id}`, 'GET');
    },

    updateTodo(id, data) {
        return doRequest(`todos/${id}`, 'PUT', data);
    },

    deleteTodo(id) {
        return doRequest(`todos/${id}`, 'DELETE');
    },
}

export default ApiHelper;

function doRequest(url, method, data) {
    return api({
        method: method,
        url: url,
        data: data
    })
}