const _protected = require("../middleware/protected")
const Status = require("../models/Status")

module.exports = (app) => {
    app.post('/status', _protected, (req, res) => {
        try {
            if (!req.body) {
                res.status(404).send({
                    message: 'please fill every details'
                })
            } else {
                const STATUS = new Status({
                    Image: req.body.image,
                    Vedio: req.body.video,
                    caption: req.body.caption,
                    postedBy:req.user._id
                })
                STATUS.save().then((data) => {
                    res.status(200).send(data);
                })
            }
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    })
    app.get('/status', _protected, (req, res) => {
        try {
            Status.find().populate("postedBy", "_id username userphoto notifytoken").sort("-createdAt").then((data) => {
                res.send(data);
            }).catch((err) => {
                return res.status(500).send({
                    message: err.message || "Something wrong while recieving the postss."
                })
            })
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    })

    app.put('/status/like/:statusId', _protected, (req, res) => {
        Status.findByIdAndUpdate(req.params.statusId, {
            $push: { likes: req.user._id }
        }, { new: true }).exec().then((pushed) => {
            res.status(200).send({
                message: "liked the status"
            })
        }).catch((errb) => {
            res.status(500).send({
                message: "something went wrong while liking Status" || errb
            })
        })
    })
    app.delete('/status/:StatusId', _protected, (req, res) => {
        Status.findByIdAndRemove(req.params.StatusId)
            .then(post => {
                if (!post) {
                    return res.status(404).send({
                        message: "status not found with id " + req.params.StatusId
                    });
                }
                res.send({ message: "status deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "status not found with id " + req.params.StatusId
                    });
                }
                return res.status(500).send({
                    message: "Could not delete status with id " + req.params.StatusId
                });
            });
    })
}















