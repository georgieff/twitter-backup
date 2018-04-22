const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const tokenManager = {

    createToken: (auth) => {
        return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
    },

    generateToken: (req, res, next) => {
        req.token = tokenManager.createToken(req.auth);
        return next();
    },

    sendToken: (req, res) => {
        res.setHeader('x-auth-token', req.token);
        return res.status(200).send(JSON.stringify(req.user));
    },

    authenticate: expressJwt({
        secret: 'my-secret',
        requestProperty: 'auth',
        getToken: function(req) {
          if (req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
          }
          return null;
        }
    })
};

module.exports = tokenManager;
