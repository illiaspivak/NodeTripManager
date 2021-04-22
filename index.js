const express = require('express')
const mongodb = require('mongodb')

const connectionURL = 'mongodb://localhost:27017'

const app = express()
const MongoClient = mongodb.MongoClient

app.get('', (req,res)=> {
    res.send('Hello! I am your NoteJS server!')
})

app.get('/about', (req,res)=>{
    res.send('<h1>Server trip manager<\h1>')
})

app.get('/author', (req,res)=>{
    res.send('"author": "Ilya"')
})

app.get('/trip', (req,res)=>{
    MongoClient.connect(connectionURL, (error, client) =>{
        if(error){
            return console.log('Unable to connect to database')
        
        }
        console.log('Connection succesfully')
        let filter = {};
        if(req.query.placeVisited == 'true'){
            filter = {placeVisited:true}
        }else{
            filter = {placeVisited:false}
        }

        const db = client.db('tripplanner');

        db.collection('trips').find(filter).toArray( (err, result) =>{
            if(err) throw err;
            console.log(result)
            res.send(result);
        })

       // const result = db.collection('trip').find()
       // console.log(result)
       // res.send(result)
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})