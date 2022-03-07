const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const register = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
        return res.status(400).json({ msg: 'Admin already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.create({
        username,
        password: hashedPassword,
        email
    });
    if (!admin) {
        return res.status(400).json({ msg: 'Something went wrong' });
    }
    res.status(201).json({ token: generateToken(admin._id) });

})

// @desc Auhenticate a admin 
// @route POST /api/admin/login
// @access Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email })
    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.status(201).json({
            token: generateToken(admin._id)
        });
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

module.exports = { register, login };
