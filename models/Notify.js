const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const  NotifySchema = mongoose.Schema({
    ToUser: {
        type: ObjectId,
        ref: 'Userauth' 
    },
    caption: {
        type: String,
    },
    Title: {
        type: String,
    },
    url:{
        type: String,
    },
    postedBy: {
        type: ObjectId,
        ref: 'Userauth'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Notify', NotifySchema);