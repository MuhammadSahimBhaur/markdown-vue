let express = require("express");

let app = express();
let path = __dirname + "/../markdown/dist"

const api = require("./api");
app.use(express.json())
app.use('/api', api);
app.use(express.static(path))
app.listen(5000, console.log("starting server"))

