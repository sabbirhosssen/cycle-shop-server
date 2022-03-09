const express = require('express')
const cors =require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app =express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors())
app.use(express.json())
const uri = "mongodb+srv://<username>:<password>@cluster0.1zbsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req,res)=>{
    res.send('cycle server is running ');
});

app.listen(port ,(req,res)=>{
    console.log(`server running at port: ${port}`);
})