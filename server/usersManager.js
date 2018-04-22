const localStorage = require('localStorage');
const initUsers = {
    '87125782' : { id: '87125782',
        token: '87125782-xUgvxoSJ3OaFqLZBjdVJhm2yZGcpGYVYxvEwYmAw8',
        tokenSecret: 'PnKqP3ZrOJ7lVGJDHZFUoyDk3wzjHaZgnCeZaFVlGHj47' }
};

const UsersManager = {

    getAllUsers: () => {
        return JSON.parse(localStorage.getItem('users')) || initUsers;
    },

    getUser: (userId) => {
        return new Promise((resolve, reject) => {
            const allUsers = UsersManager.getAllUsers();
            const user = allUsers[userId];
            if (user !== undefined) {
                resolve(user);
            } else {
                reject('user not found');
            }
        });
    },

    saveUser: (user) => {
        user = Object.assign({}, user);
        return new Promise((resolve, reject) => {
            const allUsers = UsersManager.getAllUsers();
            allUsers[user.id] = user;
            localStorage.setItem('users', JSON.stringify(allUsers));
            resolve(user);
        });
    },

    getVerification: (req, res) => {
        res.json({ 'id': req.user.id });
    }
};

module.exports = UsersManager;
