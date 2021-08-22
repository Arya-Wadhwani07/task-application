const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// POST route for creating new users and saving in the database
app.post('/users',async(req,res)=>{
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }

})

// GET route for getting all the existing users
app.get("/users",async (req,res)=>{

    try{
        const users = await User.find({})
        res.status(500).send(users)
    } catch(e){
        res.status(500).send()
    }
    
})

// GET dynamic route for getting one user
app.get('/users/:id',async (req,res)=>{
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(400).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send()
    }
})

// POST route for creating new tasks and saving in the database
app.post('/tasks',async (req,res)=>{
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch(e){
        res.status(400).send(e)
    }
    
})

// GET route for getting all tasks
app.get('/tasks',async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e){
        res.status(500).send()
    }
})

// GET route for getting a paticular task
app.get('/tasks/:id',async(req,res)=>{
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(401).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send()
    }
})

app.listen(port,()=>{
    console.log("Server is up at port ",port)
})