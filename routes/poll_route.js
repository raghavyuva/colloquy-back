const _protected = require("../middleware/protected");
const polls = require("../models/polls");
module.exports = (app) => {
    app.post('/poll', _protected, (req, res) => {
        if (!req.body) {
            return res.status(500).send({
                message: "the fields cannot be empty"
            })
        }
        else {
            const Poll = new polls({
                question: req.body.question,
                option1: req.body.option1,
                option2: req.body.option2,
                option3: req.body.option3,
                option4: req.body.option4,
                backgroundcolor: req.body.backgroundcolor,
                postedBy: req.user._id
            })
            Poll.save().then((data) => {
                res.status(200).send(data);
                console.log(data);
            }).catch((errr) => {
                return res.status(500).send({
                    message: "something went wrong while creating poll" || errr
                })
            })
        }
    })
    app.get('/poll', _protected, (req, res) => {
        polls.find().populate("polledBy", "_id username userphoto").sort("-createdAt").then((data) => {
            res.send(data);
            console.log(data);
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || "Something wrong while recieving the polls."
            })
        })
    })
    app.delete('/poll/:PollId', _protected, (req, res) => {
        polls.findByIdAndRemove(req.params.PollId)
            .then(poll => {
                if (!poll) {
                    return res.status(404).send({
                        message: "poll not found with id " + req.params.PollId
                    });
                }
                res.send({ message: "poll deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "poll not found with id " + req.params.PollId
                    });
                }
                return res.status(500).send({
                    message: "Could not delete poll with id " + req.params.pollId
                });
            });
    })
    app.put('/poll/update/:pollId',_protected, (req, res) => {
        if (!req.body) {
            res.status(500).send({
                message: "fields cannot be empty fill up your problem to update your polls"
            })
        } else {
            polls.findByIdAndUpdate(req.params.pollId, {
                question: req.body.question,
                option1: req.body.option1,
                option2: req.body.option2,
                option3: req.body.option3,
                option4: req.body.option4,
                backgroundcolor: req.body.backgroundcolor,
            }, { new: true })
                .then(poll => { 
                    if (!poll) {
                        return res.status(404).send({
                            message: "poll not found with id " + req.params.pollId
                        });
                    }
                    res.send(poll);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "poll not found with id " + req.params.pollId
                        });
                    }
                    return res.status(500).send({
                        message: "Something wrong updating poll with id " + req.params.pollId
                    });
                });
        }
    })
}