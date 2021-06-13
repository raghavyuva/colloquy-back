const _protected = require("../middleware/protected")
const faqs = require("../models/faqs")

module.exports = (app) => {
    app.post('/faq', _protected, (req, res) => {
        if (!req.body) {
            return res.status(422).send({
                message: "Body Should Not Be empty"
            })
        } else {
            const Faqs = new faqs({
                postedBy: req.user._id,
                Question: req.body.Question,
                Answer: req.body.Answer
            })
            Faqs.save().then((data) => {
                res.status(200).send(data)
            }).catch((err) => {
                return res.status(522).send({
                    message: err
                })
            })
        }
    })
    app.get('/faq', _protected, (req, res) => {
        faqs.find().sort("-createdAt").then((data) => {
            res.send(data);
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || "Something wrong while recieving the faqs."
            })
        })
    })
}