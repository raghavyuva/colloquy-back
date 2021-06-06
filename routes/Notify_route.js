const _protected = require("../middleware/protected")
const Notify = require("../models/Notify")

module.exports = (app) => {
    app.post('/savenotification/:To', _protected, (req, res) => {
        if (!req.body) {
            return res.status(500).send({
                message: "the fields cannot be empty"
            })
        }
        else {
            const Notification = new Notify({
                ToUser: req.params.To,
                caption: req.body.caption,
                Title: req.body.Title,
                url: req.body.url,
                postedBy: req.user._id
            })
            Notification.save().then((data) => {
                res.status(200).send(data);
                // console.log(data);
            }).catch((errr) => {
                return res.status(500).send({
                    message: "something went wrong while creating Event" || errr
                })
            })
        }
    })
   
    app.get('/savednotification', _protected, (req, res) => {
        Notify.find({ToUser:req.user._id}).populate("postedBy", "_id username userphoto notifytoken").populate("ToUser", "_id username userphoto notifytoken ").sort("-createdAt").then((data) => {
            res.send(data);
            // console.log(data);
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || "Something wrong while recieving the notifications."
            })
        })
    })

    app.delete('/deletenotification/:notificationId', _protected, (req, res) => {
        Notify.findOneAndRemove({_id:req.params.notificationId}).exec().then(data => {
            res.status(200).send({ mess: "deleted Notification" })
        }).catch(err => {
            return res.status(422).send({
                error: 'error deleting notification'
            })
        })
    })
}