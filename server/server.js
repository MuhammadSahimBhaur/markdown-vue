let express = require("express");
let cors = require("cors");

let app = express();
let path = __dirname + "/../markdown/dist"

const api = require("./api");
app.use(cors())
app.use(express.json())
app.use('/api', api);
app.use(express.static(path))
const port = 5000;
app.listen(port, console.log(`starting server:${port}`))

