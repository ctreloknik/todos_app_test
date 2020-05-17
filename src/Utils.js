export const MENU_ITEMS = [{
    id: 'home',
    link: '/',
    text: 'Home'
}, {
    id: 'users',
    link: '/users',
    text: 'Users',
    hiddenFor: ['user']
}, {
    id: 'todo',
    link: '/todo',
    text: 'TODO'
}]

const LOCAL_AUTH = {
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
    },
    signout(cb) {
        localStorage.removeItem('user');
        localStorage.removeItem('role');

        this.login = this.name = this.role = '';
    },
    isAuthenticated() {
        return !!localStorage.getItem('user');
    }
}

const SecurityCfg = {
    PAGES: {
        HOME: ['admin', 'user'],
        USERS: ['admin'],
        TODO: ['admin', 'user']
    }
}

export const SecurityCfgCheck = {
    isPageEnabled(page, role) {
        const checkingRole = role || LOCAL_AUTH.role;
        return SecurityCfg.PAGES[page].includes(checkingRole);
    },

    canUserEditTodoElement(createdBy) {
        if (LOCAL_AUTH.role === 'admin') {
            return true;
        }

        return (LOCAL_AUTH.name === 'NOTASUPERUSER' && createdBy === 'user'); // TODO ????
    },

    canUserRemoveTodoElement(createdBy) {
        if (LOCAL_AUTH.role === 'admin') {
            return true;
        }

        return (LOCAL_AUTH.name === 'NOTASUPERUSER' && createdBy === 'user'); // TODO ????
    }
}

export function onSuccessfullLogin(data, callback) {
    LOCAL_AUTH.authenticate(data);
    if (callback) {
        callback();
    };
}

export function onSuccessfullLogout(callback) {
    LOCAL_AUTH.signout();
    if (callback) {
        callback();
    };
}

export function doLogout() {
    LOCAL_AUTH.signout();
}

export function isAuthenticated() {
    return LOCAL_AUTH.isAuthenticated();
}