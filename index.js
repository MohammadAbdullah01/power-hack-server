const express = require('express')
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
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
        app.get('/billing-list', async (req, res) => {
            const query = {};
            const bills = await powerBills.findOne(query);
            res.send(bills)
        })
    } finally {
        // await client.close();
    }
}




run().catch(console.dir);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})