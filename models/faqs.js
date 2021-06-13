const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const FaqSchema = mongoose.Schema({
    postedBy: {
        type: ObjectId,
        ref: 'Userauth'
    },
    Question:{
        type:String,
        required:true,

    },
    Answer:{
        type:String,
        required:true,
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('faqs', FaqSchema);