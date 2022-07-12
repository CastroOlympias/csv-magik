const jwt = require('jsonwebtoken');

// need to setup secret as a hidden variable
const secret = 'mysecretsshhhhh';
const expiration = '48h';

module.exports = {
  authMiddleware: function({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function({ userName, eMail, _id }) {
    const payload = { userName, eMail, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};