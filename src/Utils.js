const MENU_ITEMS = [{
    id: 'home',
    link: '/',
    text: 'Home'
}, {
    id: 'todo',
    link: '/todo',
    text: 'TODO'
}]

const FAKE_AUTH = {
    isAuthenticated: false,
    authenticate(cb) {
        FAKE_AUTH.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        FAKE_AUTH.isAuthenticated = false;
        setTimeout(cb, 100);
    }
}

function onSuccessfullLogin(data) {
    this.userData = {
        username: data.username,
        userRole: data.role
    }
}

export {MENU_ITEMS, FAKE_AUTH}