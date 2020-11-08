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
    /*  userphoto: {
           type: String,
           required: true
       },
       */
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
        max: 60,
        required: true
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
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Userauth', UserdataSchema);