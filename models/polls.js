const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const PollSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
    },
    option4: {
        type: String
    },
    postedBy: {
        type: ObjectId,
        ref: 'Userauth'
    },
    backgroundcolor: {
        type: String,
        required: true,
        default: "#5262"
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Poll', PollSchema);