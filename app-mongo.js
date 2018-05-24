const express = require('express')
const app = express()

var bodyParser = require('body-parser')
 
 
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({
  extended: true
})); 

const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 


const url = 'mongodb://localhost:27017';
const dbName = 'mountblue';


 app.get("/todos", function(req, res){
    
    MongoClient.connect(url, function(err, client) {

      client.db(dbName).collection('todos').find({}).toArray((err, docs) => {
        res.send(docs)
        client.close();

      })
    
    });

  })

  app.get("/todos/:id", function(req, res){
    

    MongoClient.connect(url, function(err, client) {

      client.db(dbName).collection('todos').find({'_id': ObjectId(req.params.id)}).toArray((err, docs) => {
        res.send(docs);
        client.close();
        
      })
    
    });

  })

  app.delete("/todos/:id", function(req, res){
    
    MongoClient.connect(url, function(err, client) {

      client.db(dbName).collection('todos').deleteOne({'_id': ObjectId(req.params.id)}, function(err, r){
        res.send("success");
        client.close();
      })
    });

  })

  app.post("/todos", function(req, res){
    
    MongoClient.connect(url, function(err, client) {

      client.db(dbName).collection('todos').insertOne({'val': req.body.val}, function(err, r){
        res.send(r);
        client.close();
      })
    });

  })

  app.put("/todos/:id", function(req, res){
    
    MongoClient.connect(url, function(err, client) {

      client.db(dbName).collection('todos').updateOne({'_id': ObjectId(req.params.id)}, {$set: {'val': req.body.val}}, function(err, r){
        res.send(r);
        client.close();
      })
    });

  })

app.listen(3000, () => console.log('Example app listening on port 3000!'))


