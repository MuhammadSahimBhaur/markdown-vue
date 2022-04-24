let express = require("express");
let cors = require("cors");
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session')

let app = express();
let path = __dirname + "/../markdown/dist"

// app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days

}))

const api = require("./api");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static(path));
const port = 5000;
app.listen(port, console.log(`starting server:${port}`));

