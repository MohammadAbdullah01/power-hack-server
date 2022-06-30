const express = require('express')
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n5crp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect();
        const powerBills = client.db("powerHack").collection("bills");
        //get all bills
        app.get('/billing-list', async (req, res) => {
            const query = {};
            const cursor = powerBills.find(query);
            const bills = await cursor.toArray();
            res.send(bills)
        })
        //delete one bill
        app.delete('/delete-billing/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await powerBills.deleteOne(query)
            res.send(result)
        })
    } finally {
        // await client.close();
    }
}




run().catch(console.dir);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})