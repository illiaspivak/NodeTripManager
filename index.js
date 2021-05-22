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

app.use(function (req, res, next) {
    /*var err = new Error('Not Found');
     err.status = 404;
     next(err);*/
  
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
   
    // Pass to next layer of middleware
    next();
  });

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
    res.setHeader('Access-Control-Allow-Origin', '*');
    MongoClient.connect(connectionURL, (error, client) =>{
        if(error){
            return console.log('Unable to connect to database')
        
        }
        const db = client.db('tripplanner');
        const data = req.body;
        console.log(data)
        const title = data.title;
        const place = data.place;
        const distance = data.distance;
        const difficultyLevel = data.difficultyLevel;
        console.log(title)
        const placeVisited = false;
        let trip = {"title": title, "place": place,"distance":distance,"placeVisited":placeVisited,"difficultyLevel":difficultyLevel};
           
        
        db.collection('trips').insertOne(trip, function(err, result){
            
            if(err){ 
                return console.log(err);
            }
            console.log(result.ops);
        });
    })
    
})


app.put('/trip/visit', (req,res)=>{
    const name = req.query.title
    if(!name){
        res.status(400).send({"error":"missing title parameter"})
    }
    console.log(name)
    MongoClient.connect(connectionURL, (error, client) =>{
        if(error){
            console.log('Unable to connect to database')
            res.status(400).send({"error":"Unable to connect to database"})
        
        }
        const db = client.db('tripplanner');
        const col = db.collection("trips");
        
        let filter = {title: name};

        col.find(filter).toArray( (err, result) =>{
            if(err){
                res.status(400).send({"error":"Unable to connect to database"})
            }
            console.log(result)
        })

        col.findOneAndUpdate(
            {title: name}, // selection criteria
            { $set: {placeVisited: true}}, // update parameter
            function(err, result){
                if(err){
                    res.status(400).send({"error":"Invalid data"})
                }else{
                    res.status(200).send({"result":"ok"})
                }
                console.log(result);
                client.close();
            }
        );
       
    })
})


app.delete('/trip/delete', (req,res)=>{
    const name = req.query.title
    if(!name){
        res.status(400).send({"error":"missing title paarameter"})
    }
    console.log(name)
    MongoClient.connect(connectionURL, (error, client) =>{
        if(error){
            console.log('Unable to connect to database')
            res.status(400).send({"error":"Unable to connect to database"})
        
        }
        const db = client.db('tripplanner');
        const col = db.collection("trips");
    
        col.deleteOne({title: name}, function(err, result){
            console.log(result);
            client.close();
            res.status(200).send({"result":"ok"})
        });
    })
})





app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})

