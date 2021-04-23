const express = require('express')
const mongodb = require('mongodb')

const connectionURL = 'mongodb://localhost:27017'

const app = express()
const MongoClient = mongodb.MongoClient

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

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
        if(req.query.placeVisited){}
        if(req.query.placeVisited == 'true'){
            filter = {placeVisited:true}
        }
        if(req.query.placeVisited == 'false'){
            filter = {placeVisited:false}
        }

        if(req.query.difficultyLevel == '1'){
            filter = {difficultyLevel:1}
        }
        if(req.query.difficultyLevel == '2'){
            filter = {difficultyLevel:2}
        }
        if(req.query.difficultyLevel == '3'){
            filter = {difficultyLevel:3}
        }



        const db = client.db('tripplanner');

        db.collection('trips').find(filter).toArray( (err, result) =>{
            if(err) throw err;
            console.log(result)
            res.send(result);
        })
    })
})

app.post('/trip/new', (req,res)=>{
    const data = req.body;
    console.log(data)
    const title = data.title;
    const place = data.place;
    const distance = data.distance;
    const difficultyLevel = data.difficultyLevel;
    console.log(title)
})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})

