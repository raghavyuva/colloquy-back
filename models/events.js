const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const EventSchema = mongoose.Schema({
    postedBy: {
        type: ObjectId,
        ref: 'Userauth'
    },
    caption: {
        type: String,
    },
    Title: {
        type: String
    },
    photo: {
        type: String,
        default: "no photo"
    },
    likes: [{
        type: ObjectId,
        ref: 'Userauth'
    }],
    votes: [{
        type: ObjectId,
        ref: 'Userauth'
    }],
    comments: [{
        text: String, 
        postedBy: { type: ObjectId, ref: 'Userauth' }
    }],
    EventDate:{
        type:String,
        Date:new Date(),
    },
    EventLink:{
        type:String,
        required:true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Events', EventSchema);