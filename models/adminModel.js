const mongooose = require('mongoose');

const adminSchema = new mongooose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    });

module.exports = mongooose.model('Admin', adminSchema);