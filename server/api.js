let { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
let express = require("express");
let bcrypt = require("bcrypt");
let router = express.Router();

router.get("/loaddata", async (req, res) => {
    let data = await client()
    let posts = await data.find({}).toArray()

    res.send(posts)
})

router.delete("/deletepost", async (req, res) => {
    let doc = req.body
    let data = await client()
    let posts = await data.deleteOne({ _id: ObjectId(doc._id) })
    res.send("Deleted")
})


router.post("/addpost", async (req, res) => {
    let doc = req.body
    let data = await client()
    let response = await data.insertOne(doc)

    res.send(`${response.insertedId}`)
})

router.post("/saveall", async (req, res) => {
    let posts = req.body.posts
    let data = await client()
    let response = "";
    if (posts.length === 0) {
        response = await data.deleteMany({})
    }
    else {
        await data.deleteMany({});
        response = await data.insertMany(posts);
    }

    res.send(response.acknowledged)
})

router.post("/login", async (req, res) => {
    console.log(req)
    let [username, password] = req.body.credentials
    let data = await client_user()
    let response = await data.findOne({ "username": username }) // findOne and compare
    // res.end(req.session.views + ' views')
    // console.log("Logged in? ->", req.session.loggedIn)
    if (response !== null) {
        let saved_password = response.password
        bcrypt.compare(password, saved_password, function (err, result) {
            if (result) {
                // console.log("logging in")
                req.session.loggedIn = true
            }
            else {
                // console.log("can't log in")
                req.session.loggedIn = false
            }

            res.send({ "message": result })
            if (err) {
                console.log(err)
            }
        });
    } else {
        res.status(400).send({ "message": "Cannot find user" })
    }
})


let url = "mongodb+srv://vueapp:123vueapp@cluster0.5eplp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


async function client() {

    let client = await MongoClient.connect(url)
    let db = client.db("portfolio")
    let collection = db.collection("posts")

    return collection
}

async function client_user() {

    let client = await MongoClient.connect(url)
    let db = client.db("portfolio")
    let collection = db.collection("users")

    return collection
}

module.exports = router