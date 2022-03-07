const mongooose = require('mongoose');

const postSchema = new mongooose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    });


module.exports = mongooose.model('Post', postSchema);