const multer = require('multer');
const _protected = require('../middleware/protected');
const Notes = require('../models/Notes');
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
let upload = multer({ storage, limits: { fileSize: 10000 * 100 } }).single(
  "myfile"
);
module.exports = (app) => {
    app.post('/upload_notes', _protected, (req, res, file) => {
        upload(req, res, async (err) => {
        if (!req.body) {
            return res.status(400).send({
                message: "Please fill every fields"
            });
        }
        const Note = new Notes({
            postedBy: req.user._id,
            Url: req.file.path,
            title: req.body.title,
            type: req.body.type,
            branch: req.body.branch,
            foryear: req.body.foryear,
        })
        Note.save()
            .then(data => {
                res.send(data);
                // console.log(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while creating the notes."
                });
            });
        })
    });
    app.get('/get_notes', _protected, (req, res) => {
        Notes.find().populate("postedBy", "_id username userphoto notifytoken").populate("Reviews.postedBy", "_id username userphoto notifytoken ").populate("text").sort("-createdAt").then((data) => {
            res.send(data);
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || "Something wrong while recieving the Notes."
            })
        })
    })
    app.delete('/Notes_remove/:NotesId', _protected, (req, res) => {
        Notes.findByIdAndRemove(req.params.NotesId)
            .then(post => {
                if (!post) {
                    return res.status(404).send({
                        message: "notes not found with id " + req.params.NotesId
                    });
                }
                res.send({ message: "notes deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "notes not found with id " + req.params.PostId
                    });
                }
                return res.status(500).send({
                    message: "Could not delete notes with id " + req.params.posttId
                });
            });
    })
    app.put('/Notes/Rate/:NotesId', _protected, (req, res) => {
        if (!req.body) {
            res.status(500).send({
                message: "fields cannot be empty fill up your problem to update your notes"
            })
        } else {
            Notes.findByIdAndUpdate(req.params.NotesId, {
                Rating: req.body.Rating,
            }, { new: true })
                .then(post => {
                    if (!post) {
                        return res.status(404).send({
                            message: "post not found with id " + req.params.NotesId
                        });
                    }
                    res.send(post);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "post not found with id " + req.params.NotesId
                        });
                    }
                    return res.status(500).send({
                        message: "Something wrong updating post with id " + req.params.NotesId
                    });
                });
        }
    })

    app.put('/posts/clicks/:NotesId', _protected, (req, res) => {
        Notes.findByIdAndUpdate(req.params.NotesId, {
            $push: { clicks: req.user._id }
        }, { new: true }).exec().then((pushed) => {
            Notes.find().populate("postedBy", "_id username userphoto notifytoken").populate("Reviews.postedBy", "_id username userphoto notifytoken ").populate("text").sort("-createdAt").then((data) => {
                res.send(data);
            })
        }).catch((errb) => {
            res.status(500).send({
                message: "something went wrong while clicking Notes" || errb
            })
        })
    })

    app.put('/Notes/review/:NotesId', _protected, (req, res) => {
        const comment = {
            text: req.body.text,
            postedBy: req.user._id
        };
        Posts.findByIdAndUpdate(req.params.NotesId, {
            $push: { Reviews: comment }
        }, {
            new: true
        }).populate("Reviews.postedBy", " username userphoto text").populate("text")
            .exec((err, result) => {
                if (err) {
                    return res.json({ error: err });
                }
                res.json(result);
            })
    })
    app.get('/mynotes', _protected, (req, res) => {
        Notes.find({ postedBy: req.user._id }).populate('postedBy', 'id username userphoto').sort("-createdAt")
            .then((postres) => {
                res.status(200).send(postres);
            }).catch((errb) => {
                return res.send(404).send({
                    message: "nothing here"
                })
            })
    })
    app.get('/lastopened', _protected, (req, res) => {
        Notes.find({ clicks: req.user._id }).populate('postedBy', 'id username userphoto').sort("-createdAt")
            .then((postres) => {
                res.status(200).send(postres);
            }).catch((errb) => {
                return res.send(404).send({
                    message: "nothing here"
                })
            })
    })
}

