const _protected = require("../middleware/protected")
const Interview = require("../models/Interviewslots")

module.exports = (app) => {
    app.post('/applyforinterview', _protected, (req, res) => {
        if (!req.body) {
            return res.status(500).send({
                message: "the fields cannot be empty"
            })
        }
        else {
            const interview = new Interview({
                postedBy: req.user._id,
                InterviewDate: req.body.InterviewDate,
                InterviewTime: req.body.InterviewTime,
                paymentrefid: req.body.paymentrefid,
                paymentattachment: req.body.paymentattachment,
                Branch:req.body.Branch
            })
            interview.save().then((data) => {
                res.status(200).send(data);
                // console.log(data);
            }).catch((errr) => {
                return res.status(500).send({
                    message: "something went wrong while creating Event" || errr
                })
            })
        }
    })
    app.get('/Interview', _protected, (req, res) => {
        Interview.find().populate("postedBy", "_id username userphoto").sort("-createdAt").then((data) => {
            res.send(data);
            // console.log(data);
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || "Something wrong while recieving the Interview Details."
            })
        })
    })
}