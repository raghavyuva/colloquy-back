const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const InterviewSchema = mongoose.Schema({
    postedBy: {
        type: ObjectId,
        ref: 'Userauth'
    },
    InterviewDate: {
        type: String,
        required: true
    },
    InterviewTime: {
        type: String,
        required: true
    },
    paymentrefid: {
        type: String,
        required: true
    },
    paymentattachment: {
        type: String,
        required: true
    },
    Branch:{
        type:String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Interview', InterviewSchema);