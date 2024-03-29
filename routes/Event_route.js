const _protected = require("../middleware/protected");
const Events = require('../models/events');
module.exports = (app) => {
    app.post('/Event', _protected, (req, res) => {
        if (!req.body) {
            return res.status(500).send({
                message: "the fields cannot be empty"
            })
        }
        else {
            const Event = new Events({
                caption: req.body.caption,
                photo: req.body.photo,
                Title:req.body.Title,
                postedBy: req.user._id,
                EventLink:req.user.Link
            })
            Event.save().then((data) => {
                res.status(200).send(data);
                // console.log(data);
            }).catch((errr) => {
                return res.status(500).send({
                    message: "something went wrong while creating Event" || errr
                })
            })
        }
    })
    app.get('/Event', _protected, (req, res) => {
        Events.find().populate("postedBy", "_id username userphoto").sort("-createdAt").then((data) => {
            res.send(data);
            // console.log(data);
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || "Something wrong while recieving the Events."
            })
        })
    })
    app.delete('/Event/:EventId', _protected, (req, res) => {
        Events.findByIdAndRemove(req.params.EventId)
            .then(Event => {
                if (!Event) {
                    return res.status(404).send({
                        message: "Event not found with id " + req.params.EventId
                    });
                }
                res.send({ message: "Event deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Event not found with id " + req.params.EventId
                    });
                }
                return res.status(500).send({
                    message: "Could not delete Event with id " + req.params.EventId
                });
            });
    })
    app.put('/Event/update/:EventId',_protected, (req, res) => {
        if (!req.body) {
            res.status(500).send({
                message: "fields cannot be empty fill up your problem to update your Events"
            })
        } else {
            Events.findByIdAndUpdate(req.params.EventId, {
                caption: req.body.caption,
                photo: req.body.photo,
                Title:req.body.Title,
                postedBy: req.user._id,
                EventLink:req.user.Link
            }, { new: true })
                .then(Event => { 
                    if (!Event) {
                        return res.status(404).send({
                            message: "Event not found with id " + req.params.EventId
                        });
                    }
                    res.send(Event);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Event not found with id " + req.params.EventId
                        });
                    }
                    return res.status(500).send({
                        message: "Something wrong updating Event with id " + req.params.EventId
                    });
                });
        }
    })

    app.put('/Event/like/:EventId', _protected, (req, res) => {
        Events.findByIdAndUpdate(req.params.EventId, {
            $push: { likes: req.user._id }
        }, { new: true }).exec().then((pushed) => {
            // console.log(pushed);
            res.status(200).send({   
                message: "liked the Event"
            })
        }).catch((errb) => {
            res.status(500).send({
                message: "something went wrong while liking Event" || errb
            })
        })
    })

    app.put('/Event/unlike/:EventId', _protected, (req, res) => {
       Events.findByIdAndUpdate(req.params.EventId, {
            $pull: { likes: req.user._id }
        }, { new: true }).exec().then((pulled) => {
            // console.log(pulled);
            res.status(200).send({
                message: "unliked the Event"
            })
        }).catch((errb) => {
            res.status(500).send({
                message: "something went wrong while unliking Event" || errb
            })
        })
    })

    app.put('/Event/comment/:PostsId', _protected, (req, res) => {
        const comment = {
            text: req.body.text,
            postedBy: req.user._id
        };
        Events.findByIdAndUpdate(req.params.PostsId, {
            $push: { comments: comment }
        }, {
            new: true
        }).populate("comments.postedBy"," username userphoto text").populate("text")
            .exec((err, result) => {
                if (err) {
                    return res.json({ error: err });
                }
                res.json(result);
            })
    })
}