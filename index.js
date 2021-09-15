const express = require('express');
const bodyParser = require('body-parser');
const PORT = 5000
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./uploads'))
const url = 'mongodb://127.0.0.1:27017';
const config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('./routes/auth')(app);
require('./routes/post_route')(app);
require('./routes/poll_route')(app);
require('./routes/report_routes')(app);
require('./routes/Event_route')(app);
require('./routes/Notify_route')(app);
require('./routes/Faqs')(app);
require('./routes/InterView')(app);
require('./routes/Status_route')(app);
require('./routes/Notes_route')(app);
mongoose.connect(config.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
}).then(() => {
console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.get('/', (req, res) => {
    res.json({ "message": "Welcome" });
});
app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});
