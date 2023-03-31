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

        //shop data added
        const database =client.db('CycleShop');
        const booksCollection = database.collection('allCycle')
        //order data added
        const databases =client.db('CycleShop');
        const orderCollection = databases.collection('allOrder')
        //reviews data added
        const databasees =client.db('CycleShop');
        const  reviewCollection = databasees.collection('allReview')
        //-------------------- add json data cycle shop -----------------------
        //Get api 
        app.get('/allCycle', async(req ,res)=>{
            const cursor= booksCollection.find({});
            const cycle = await cursor.toArray()
            res.send(cycle);
        })
        //Get single book 
        app.get('/allCycle/:Id', async(req,res)=>{
            const id = req.params.Id;
            const query ={_id: ObjectId(id)}
            const cycle=await booksCollection.findOne(query)
            res.json(cycle)
        })
 
 
     //    POST API shop data add
        app.post('/allCycle', async(req,res)=>{
            const cycle = req.body
            // console.log("hit the post api " ,cycle);
         const result = await   booksCollection.insertOne(cycle)
        //  console.log(result);
        //  res.send('post hitted')
         res.json(result)
        });
        app.delete('/allCycle/:Id', async (req,res)=>{
            const id =req.params.Id;
            const query = {_id: ObjectId(id)}
            const cycle=await booksCollection.deleteOne(query)
            res.json(cycle) 
        })
        //--------------------End add json data cycle shop -----------------------
        // ------------------------- Add to All order data -------------------------
        // post api order
        app.post('/allOrder', async(req,res)=>{
            let order = req.body
            order.createdAt = new Date ();
            // console.log('hit the order database', order);

            const results = await orderCollection.insertOne(order)
            res.json(results)           
            // res.send('data hitted')
        } )
        app.get('/allOrder', async(req,res)=>{
            const cursor= orderCollection.find({});
            const order = await cursor.toArray()
            res.send(order);
        })
        app.delete('/allOrder/:Id', async (req,res)=>{
            const id =req.params.Id;
            const query = {_id: ObjectId(id)}
            const order=await orderCollection.deleteOne(query)
            res.json(order) 
        })
         // -------------------------End  Add to All order data -------------------------
         app.post('/allReview', async(req,res)=>{
            let review = req.body
            review.createdAt = new Date ();
            console.log('hit the order database', review);

            const results = await reviewCollection.insertOne(review)
            res.json(results)           
            res.send('data hitted')
        } )
        app.get('/allReview', async(req,res)=>{
            const cursor= reviewCollection.find({});
            const review = await cursor.toArray()
            res.send(review);
        })
        app.delete('/allReview/:Id', async (req,res)=>{
            const id =req.params.Id;
            const query = {_id: ObjectId(id)}
            const review=await reviewCollection.deleteOne(query)
            res.json(review) 
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