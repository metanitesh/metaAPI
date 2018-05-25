const express = require('express')
const app = express()
var mongoose = require('mongoose');

var bodyParser = require('body-parser')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/mountblueMongoose');


var Schema = mongoose.Schema;

var todoSchema = new Schema({
    val: String,
    done: Boolean
});

var Todo = mongoose.model('Todo', todoSchema);

app.get("/todos", function (req, res) {

    Todo.find(function (err, result) {
        res.send(result)
    })

})


app.get("/todos/:id", function (req, res) {


    Todo.findById({ _id: req.params.id }, function (err, result) {
        if (err) console.log(err);
        res.send(result)
    })

})


app.post("/todos", function (req, res) {

    var todo = new Todo(req.body)
    todo.save();
    res.send(todo);
})


app.delete("/todos/:id", function (req, res) {


    Todo.findOneAndRemove({ _id: req.params.id }, function (err, result) {
        if (err) console.log(err);
        res.send(result)
    })

})

app.put("/todos/:id", function (req, res) {

    Todo.findByIdAndUpdate(req.params.id, { val: req.body.val }, function (err, result) {
        if (err) console.log(err);
        res.send(result)
    })

})



app.listen(4000, () => console.log('Example app listening on port 4000!'))


