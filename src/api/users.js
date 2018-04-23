const LS_USER_PROPERTY = 'tb_user';

let user = JSON.parse(window.localStorage.getItem(LS_USER_PROPERTY)) || {};

class Users {
    static getUser() {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                if(user.id !== undefined) {
                    resolve(Object.assign({}, user));
                } else {
                    reject();
                }
            }, 1000);
        });
    }

    static authUser(newUser) {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                window.localStorage.setItem(LS_USER_PROPERTY, JSON.stringify(newUser));
                resolve(newUser);
            }, 800);
        });
    }

    static logoutUser() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                window.localStorage.setItem(LS_USER_PROPERTY, JSON.stringify({}));
                resolve(true);
            }, 500);
        });
    }
}

export default Users;
