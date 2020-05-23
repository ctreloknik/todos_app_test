import axios from 'axios';
import { doLogout, isAuthenticated, redirectToPage } from './Utils';

const api = axios.create({
    baseURL: `http://localhost:3000/api/v1/`,
    timeout: 3600,
    withCredentials: true
});

api.defaults.withCredentials = true;
api.interceptors.response.use(function (response) {
    // console.log('200');
    return response;
}, function (error) {
    let errorText = '';

    if (isAuthenticated() && 401 === error.response.status) {
        console.log('401');
        doLogout();
        errorText = error.response.data.message;
        if (window.location.pathname !== '/login') {
            redirectToPage('login');
        }
    } else if (isAuthenticated() && 403 === error.response.status) {
        console.log('403');
        errorText = error.response.data.message;
        if (window.location.pathname !== '/home') {
            redirectToPage('home');
        }
    } else if (400 === error.response.status) {
        errorText = error.response.data.message;
        return Promise.reject({ ...error, errorText: errorText });
    } else if (500 === error.response.status) {
        return Promise.reject({ ...error, errorText: 'Server error. Please try again' });
    }
    return Promise.reject(error);
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