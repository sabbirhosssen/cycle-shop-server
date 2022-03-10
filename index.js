const express = require('express')
const ObjectId =require('mongodb').ObjectId
const cors =require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config() 
const app =express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1zbsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);

async function run() {
    console.log('hit the database');
    try{
        await client.connect();
        const database =client.db('CycleShop');
        const booksCollection = database.collection('allCycle')
        //Get api 
        app.get('/allCycle', async(req ,res)=>{
            const cursor= booksCollection.find({});
            const cycle = await cursor.toArray()
            res.send(cycle);
        })
        //Get single book 
        app.get('/allCycle/:id', async(req,res)=>{
            const id = req.params.id;
            const query ={_id: ObjectId(id)}
            const cycle=await booksCollection.findOne(query)
            res.json(cycle)
        })
 
 
     //    POST API
        app.post('/allCycle', async(req,res)=>{
            const cycle = req.body
            console.log("hit the post api " ,cycle);
         const result = await   booksCollection.insertOne(cycle)
         console.log(result);
        //  res.send('post hitted')
         res.json(result)
        })
 
    }
    finally{
        // await client.close();
    }
    
}
run().catch(console.dir)
app.get('/', (req,res)=>{
    res.send('cycle server is running ');
});

app.listen(port ,(req,res)=>{
    console.log(`server running at port: ${port}`);
})