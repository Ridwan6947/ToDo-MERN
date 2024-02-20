const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/todo'); // Assuming you have a Todo model defined

const mongoDBURL = 'mongodb+srv://root:root@todo-mern.fcooqqc.mongodb.net/todoDB?retryWrites=true&w=majority';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected");
        app.listen(3001, () => {
            console.log("Server is Running");
        });
    })
    .catch((err) => {
        console.log(err);
    });



app.post('/add', async (req, res) => {
    try {
        const newItem = new Todo({
            task:req.body.task
        });
        const result = await newItem.save();
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/get' , async (req , res) =>{
    Todo.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id' , async (req , res) =>{
    const {id} = req.params;
    Todo.findByIdAndUpdate({_id: id} , {done : true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id' , async (req , res) =>{
    const{id} = req.params;
    Todo.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})