const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const StatusSchema = mongoose.Schema({
    expire_at: { type: Date, default: Date.now, expires: '1m' },
    Image: [{
        type: String,

    }],
    Video: {
        type: String,
    },
    postedBy: {
        type: ObjectId,
        ref: 'Userauth'
    },
    likes: [{
        type: ObjectId,
        ref: 'Userauth'
    }],
    caption: {
        type: String,
    }

}, {
    timestamps: true
})
module.exports = mongoose.model('Status', StatusSchema);