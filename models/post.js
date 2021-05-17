const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const PostSchema = mongoose.Schema({
    postedBy: {
        type: ObjectId,
        ref: 'Userauth'
    },
    caption: {
        type: String,
    },
    photo: {
      type:String,
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
    location:{
        type:Array,
    },
    category: {
        type:Array,
    },
    Tags:{
        type:Array,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Posts', PostSchema);