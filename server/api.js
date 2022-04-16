let { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
let express = require("express");
let router = express.Router();

router.get("/loaddata", async (req, res) => {
    // console.log("Called loaddata")
    let data = await client()
    let posts = await data.find({}).toArray()

    res.send(posts)
})

router.delete("/deletepost", async (req, res) => {
    // console.log("Called loaddata")
    let doc = req.body
    console.log("delete 1", doc)
    let data = await client()
    let posts = await data.deleteOne({ _id: ObjectId(doc._id) })
    console.log("delete 2", posts)
    res.send("Deleted")
})


router.post("/addpost", async (req, res) => {
    let doc = req.body
    console.log(doc.body);
    let data = await client()
    // console.log(data);
    let response = await data.insertOne(doc)
    console.log(`ID -> ${response.insertedId}`);
    // console.log(`ID -> ${response}`);
    // let posts = await data.find({}).toArray()

    res.send(`${response.insertedId}`)
})


let url = "mongodb+srv://vueapp:123vueapp@cluster0.5eplp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


async function client() {

    let client = await MongoClient.connect(url)
    let db = client.db("portfolio")
    let collection = db.collection("posts")
    // let allposts = collection.find({})

    // console.log(client)
    // console.log(db)
    // console.log(collection)
    // console.log(allposts)
    return collection

}

module.exports = router