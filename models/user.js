const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const UserdataSchema = mongoose.Schema({
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
        default: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fd%2Fd8%2FAntu_system-switch-user.svg%2F768px-Antu_system-switch-user.svg.png&f=1&nofb=1"
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
    phoneNumber: {
        type: String,
        unique: true,
    },
    tagline: String,
    notifytoken: String,
    verified: {
        type: Boolean,
        default: false
    },
    Online:{
        type:Boolean,

    },
    
}, {
    timestamps: true
})
module.exports = mongoose.model('Userauth', UserdataSchema);