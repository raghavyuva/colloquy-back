const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const NotesSchema = mongoose.Schema({
    postedBy: {
        type: ObjectId,
        ref: 'Userauth'
    },
    Url: {
        type: String,
        required: true
    },
    clicks: {
        type: String,
    },
    Rating: {
        type: String,
    },
    lastopened: [],
    title: {
        type: String
    },
    type: {
        type: String
    },
    branch:{
        type:String,
    },
    foryear:{
        type:String,
    },
    Reviews: [{
        text: String,
        postedBy: { type: ObjectId, ref: 'Userauth' }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Notes', NotesSchema);