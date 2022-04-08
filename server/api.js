let { MongoClient } = require("mongodb");
let express = require("express");
let router = express.Router();

router.get("/loaddata", async (req, res) => {
    let data = await client()
    let posts = await data.find({}).toArray()

    res.send(posts)
})


router.post("/addpost", async (req, res) => {
    let doc = req.body
    // console.log(doc.body);
    let data = await client()
    // console.log(data)
    let response = await data.insertOne(doc)
    // console.log(`ID -> ${response.insertedId}`);
    // let posts = await data.find({}).toArray()

    res.send(`${response}`)
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