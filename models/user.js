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
    phoneNumber:{
        type: String,
        unique: true,
    },
    tagline: String,
    notifytoken: String,
    verified:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Userauth', UserdataSchema);