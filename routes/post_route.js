const multer = require('multer');
const Posts = require('../models/post');
const _protected = require('../middleware/protected');

const storage = multer.diskStorage({
    destination: ((req, res, cb) => {
        cb(null, './uploads');
    }),
    filename: ((req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    })
})

const upload = multer({ storage: storage })

module.exports = (app) => {
    app.post('/post', upload.single('photo'), _protected, (req, res, file) => {
        if (!req.body) {
            return res.status(400).send({
                message: "Please fill every fields"
            });
        }
        console.log(req.user);
        const post = new Posts({
            description: req.body.description,
            caption: req.body.caption,
            photo: req.file.path,
            postedBy: req.user._id
        })
        post.save()
            .then(data => {
                res.send(data);
                console.log(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while creating the ticket."
                });
            });
    });

    app.get('/post', _protected, (req, res) => {
        Posts.find().then((data) => {
            res.send(data);
            console.log(data);
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || "Something wrong while recieving the tickets."
            })
        })
    })


    app.delete('/post/:PostId', _protected, (req, res) => {
        Posts.findByIdAndRemove(req.params.PostId)
            .then(post => {
                if (!post) {
                    return res.status(404).send({
                        message: "post not found with id " + req.params.PostId
                    });
                }
                res.send({ message: "post deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "post not found with id " + req.params.PostId
                    });
                }
                return res.status(500).send({
                    message: "Could not delete post with id " + req.params.posttId
                });
            });
    })

    app.put('/post/update/:PostId', upload.single('photo'), _protected, (req, res) => {
        if (!req.body) {
            res.status(500).send({
                message: "fields cannot be empty fill up your problem to update your ticket"
            })
        } else {
            Posts.findByIdAndUpdate(req.params.PostId, {
                description: req.body.description,
                caption: req.body.caption,
                photo: req.file.path
            }, { new: true })
                .then(post => {
                    if (!post) {
                        return res.status(404).send({
                            message: "post not found with id " + req.params.PostId
                        });
                    }
                    res.send(post);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "post not found with id " + req.params.PostId
                        });
                    }
                    return res.status(500).send({
                        message: "Something wrong updating post with id " + req.params.PostId
                    });
                });
        }
    })

    app.put('/posts/like/:PostId', _protected, (req, res) => {
        Posts.findByIdAndUpdate(req.params.PostId, {
            $push: { likes: req.user._id }
        }, { new: true }).exec().then((pushed) => {
            console.log(pushed);
            res.status(200).send({
                message: "liked the Post"
            })
        }).catch((errb) => {
            res.status(500).send({
                message: "something went wrong while liking Post" || errb
            })
        })
    })

    app.put('/posts/unlike/:PostId', _protected, (req, res) => {
        Posts.findByIdAndUpdate(req.params.PostId, {
            $pull: { likes: req.user._id }
        }, { new: true }).exec().then((pulled) => {
            console.log(pulled);
            res.status(200).send({
                message: "unliked the Post"
            })
        }).catch((errb) => {
            res.status(500).send({
                message: "something went wrong while unliking Post" || errb
            })
        })
    })

    app.put('/posts/comments/:PostsId', _protected, (req, res) => {
        const comment = {
            text: req.body.text,
            postedBy: req.user._id
        };
        Posts.findByIdAndUpdate(req.params.PostsId, {
            $push: { comments: comment }
        }, {
            new: true
        })
            .exec((err, result) => {
                if (err) {
                    return res.json({ error: err });
                }
                res.json(result);
            })
    })

    app.get('/myposts', _protected, (req, res) => {
        Posts.find({ postedBy: req.user._id }).populate('postedBy', 'id username')
            .then((postres) => {
                res.status(200).send(postres);
            }).catch((errb) => {
                return res.send(404).send({
                    message: "nothing here"
                })
            })
    })
    app.get('/subscription', _protected, (req, res) => {
        Posts.find({postedBy:{$in:req.user.following}}).populate("postedBy","_id username").populate("comments.postedBy","_id username").then((data) => {
            res.send(data);
            console.log(data);
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || "Something wrong while recieving the tickets."
            })
        })
    })
}
