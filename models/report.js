const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const ReportSchema = mongoose.Schema({
    problem: String,
    description: String,
    explaination: String,
    reportedBy: {
        type: ObjectId,
        ref: 'Userdata'
    },
    errscreenshot: {
        type: String,
    },
    ticketsolution: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Reports', ReportSchema);