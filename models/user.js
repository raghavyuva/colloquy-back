const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const UserdataSchema = mongoose.Schema({
    //  _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userphoto: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: true,
    },
    usn: {
        type: String,
        unique: true,
    },
    resetToken: String,
    expireToken: Date,
    followers: [{
        type: ObjectId,
        ref: 'Userauth'
    }],
    following: [{
        type: ObjectId,
        ref: "Userauth"
    }],
    tagline: String,
    notifytoken: String,
}, {
    timestamps: true
})
module.exports = mongoose.model('Userauth', UserdataSchema);