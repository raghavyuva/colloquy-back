const multer = require('multer');
const Reports = require('../models/report');
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
    app.post('/report', upload.single('errscreenshot'), _protected, (req, res, file) => {
        if (!req.body) {
            return res.status(400).send({
                message: "Please fill every fields"
            });
        }
        console.log(req.user);
        const report = new Reports({
            problem: req.body.problem,
            description: req.body.description,
            explaination: req.body.explaination,
            errscreenshot: req.file.path,
            reportedBy: req.user._id
        })
        report.save()
            .then(data => {
                res.send(data);
                console.log(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while creating the ticket."
                });
            });
    });

    app.get('/report', _protected, (req, res) => {
        Reports.find().then((data) => {
            res.send(data);
            console.log(data);
        }).catch((err) => {
            return res.status(500).send({
                message: err.message || "Something wrong while recieving the tickets."
            })
        })
    })

    //admin can only be able to update the ticket once raised or he can just delete it
    app.put('/report/:reportId', _protected, (req, res) => {
        if (!req.body) {
            return res.status(400).send({
                message: "report content can not be empty"
            });
        }
        Reports.findByIdAndUpdate(req.params.reportId, {
            ticketsolution: req.body.ticketsolution
        }, { new: true })
            .then(report => {
                if (!report) {
                    return res.status(404).send({
                        message: "report not found with id " + req.params.reportId
                    });
                }
                res.send(report);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "report not found with id " + req.params.reportId
                    });
                }
                return res.status(500).send({
                    message: "Something wrong updating ticket with id " + req.params.reportId
                });
            });
    });

    app.delete('/report/:reportId', _protected, (req, res) => {
        Reports.findByIdAndRemove(req.params.reportId)
            .then(report => {
                if (!report) {
                    return res.status(404).send({
                        message: "REPORT not found with id " + req.params.reportId
                    });
                }
                res.send({ message: "report deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "report not found with id " + req.params.reportId
                    });
                }
                return res.status(500).send({
                    message: "Could not delete report with id " + req.params.reporttId
                });
            });
    })

    //this is for the user to modify the report or his ticket
    app.put('/report/update/:reportId', upload.single('errscreenshot'), _protected, (req, res) => {
        if (!req.body) {
            res.status(500).send({
                message: "fields cannot be empty fill up your problem to update your ticket"
            })
        } else {
            Reports.findByIdAndUpdate(req.params.reportId, {
                description: req.body.description,
                explaination: req.body.explaination,
                errscreenshot: req.file.path
            }, { new: true })
                .then(report => {
                    if (!report) {
                        return res.status(404).send({
                            message: "report not found with id " + req.params.reportId
                        });
                    }
                    res.send(report);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "report not found with id " + req.params.reportId
                        });
                    }
                    return res.status(500).send({
                        message: "Something wrong updating ticket with id " + req.params.reportId
                    });
                });
        }
    })
}
