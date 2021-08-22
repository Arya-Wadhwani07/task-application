const express = require('express')
const Task = require("../models/task")
const router = new express.Router()

// POST route for creating new tasks and saving in the database
router.post('/tasks',async (req,res)=>{
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch(e){
        res.status(400).send(e)
    }
    
})

// GET route for getting all tasks
router.get('/tasks',async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e){
        res.status(500).send()
    }
})

// GET route for getting a paticular task
router.get('/tasks/:id',async(req,res)=>{
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

// PATCH route for updating a particular task
router.patch('/tasks/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:"Invalid Update!"})
    }
    try{
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{ new:true, runValidators: true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(400).send()
    }
})

// DELETE route for deleting a particular task
router.delete('/tasks/:id',async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    } catch(e){
        res.status(500).send()
    }
})

module.exports=router