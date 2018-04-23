const localStorage = require('localStorage');
const initUsers = {};

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
