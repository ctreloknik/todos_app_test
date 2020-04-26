export const MENU_ITEMS = [{
    id: 'home',
    link: '/',
    text: 'Home'
}, {
    id: 'todo',
    link: '/todo',
    text: 'TODO'
}]

const LOCAL_AUTH = {
    isAuthenticated: false,
    login: '',
    name: '',
    role: '',
    authenticate(data) {
        localStorage.setItem('user', data.name);
        localStorage.setItem('role', data.role);

        this.login = data.login;
        this.name = data.name;
        this.role = data.role;

        console.log(LOCAL_AUTH);
        LOCAL_AUTH.isAuthenticated = true;
    },
    signout(cb) {
        localStorage.removeItem('user');
        localStorage.removeItem('role');

        this.login = this.name = this.role = '';
        LOCAL_AUTH.isAuthenticated = false;
    }
}

export function onSuccessfullLogin(data, callback) {
    LOCAL_AUTH.authenticate(data);
    callback();
}

export function onSuccessfullLogout(callback) {
    LOCAL_AUTH.signout();
    callback();
}

export function isAuthenticated() {
    return !!localStorage.getItem('user');
}