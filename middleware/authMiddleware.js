const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler');
const Admin = require('../models/adminModel');

const protect = asynchandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.admin = await Admin.findById(decoded.id)

            next()
        }
        catch (err) {
            return res.status(401).json({ msg: 'Invalid token' })
        }
    }
    else {
        return res.status(401).json({ msg: 'Unauthorized' })
    }
    if (!token) {
        return res.status(401).json({ msg: 'Unauthorized (no token)' })
    }
});

module.exports = protect;