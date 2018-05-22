const express = require('express')

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'meta-api'
});


console.log("in1")

connection.connect((err) => {


 

  if (err){
    console.log(err);
    
  } 
  console.log('Connected!');
});

console.log("in3")








const app = express()
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.urlencoded(({ extended: true })));
app.use(bodyParser.json());




var data = [{
    id: 1,
    text: "breakfast",
    done: false
},{
    id:2,
    text: "lunch",
    done: false
}];

app.get('/', (req, res) => {
    res.send("hello world");
})

app.get('/todos', (req, res) => {
    connection.query("SELECT * from todos", function (err, result) {
    console.log("in2")
    if (err) throw err;
    console.log("Result: " + result[0].id);
    res.send(result);
  });
    
})

app.get('/todos/:id', (req, res) => {

    var record = data.find((obj)=>{ 
        return obj.id == req.params.id
    })

    res.send(record);
})

app.post("/todos", (req, res)=>{
    
    data.push(req.body);
    res.send("done");
})

app.put("/todos/:id", function(req, res){
    var id = req.params.id;

    console.log(id);



    var record = data.find((obj)=>{ 
        console.log(obj, req.params.id)
        return obj.id == req.params.id
    })

    console.log(record);    
    record.text = req.body.text;
    res.send("done");
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))


